"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    Hls?: any;
    dashjs?: any;
  }
}

function isDashUrl(url: string) {
  return /\.mpd(\?|$)/i.test(url);
}

// Wrap a stream URL through our serverless CORS proxy.
// Uses base64url encoding so special chars (?, =, &) in upstream URLs don't
// conflict with the proxy query string after player template substitution.
function proxiedUrl(upstreamUrl: string): string {
  if (typeof window === "undefined") {
    // SSR fallback
    return `/api/stream?u=${encodeURIComponent(upstreamUrl)}`;
  }
  const b64 = btoa(unescape(encodeURIComponent(upstreamUrl)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  return `/api/stream?u=${b64}`;
}

export default function Player({
  src,
  poster,
  name,
}: {
  src: string;
  poster?: string;
  name: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    let hls: any = null;
    let dash: any = null;
    let cancelled = false;

    setError(null);
    setLoading(true);

    const onError = (msg?: string) => {
      setLoading(false);
      setError(msg || "Stream tidak bisa dimuat. Coba lagi nanti atau pilih channel lain.");
    };

    const isDash = isDashUrl(src);
    const playerTag = isDash ? "DASH" : "HLS";

    // Load script helper
    const loadScript = (path: string, attrName: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[data-${attrName}]`)) {
          // Already loaded
          resolve();
          return;
        }
        const s = document.createElement("script");
        s.src = path;
        s.async = true;
        s.dataset[attrName] = "1";
        s.onload = () => resolve();
        s.onerror = () => reject(new Error(`Failed to load ${path}`));
        document.head.appendChild(s);
      });
    };

    const startHls = async () => {
      try {
        if (typeof window.Hls === "undefined") {
          await loadScript("/vendor/hls.min.js", "hls");
        }
      } catch (e) {
        onError("Gagal load HLS player. Refresh halaman.");
        return;
      }
      if (cancelled) return;
      if (window.Hls && window.Hls.isSupported()) {
        try {
          hls = new window.Hls({
            enableWorker: true,
            lowLatencyMode: false,
            workerPath: "/vendor/hls.worker.js",
            xhrSetup: (xhr: XMLHttpRequest) => {
              // All manifest + segment fetches go through proxy → CORS safe
              xhr.withCredentials = false;
            },
          });
          hls.loadSource(proxiedUrl(src));
          hls.attachMedia(video);
          hls.on(window.Hls.Events.MANIFEST_PARSED, () => setLoading(false));
          hls.on(window.Hls.Events.ERROR, (_e: any, data: any) => {
            if (data.fatal) {
              switch (data.type) {
                case window.Hls.ErrorTypes.NETWORK_ERROR:
                  hls.startLoad();
                  break;
                case window.Hls.ErrorTypes.MEDIA_ERROR:
                  hls.recoverMediaError();
                  break;
                default:
                  onError();
              }
            }
          });
        } catch (err) {
          console.error("[Player] HLS setup failed:", err);
          onError("Browser tidak support HLS player.");
        }
      } else {
        // Native HLS (Safari)
        video.src = proxiedUrl(src);
        video.addEventListener("loadedmetadata", () => setLoading(false), { once: true });
        video.addEventListener("error", () => onError("Stream format tidak didukung."), { once: true });
      }
    };

    const startDash = async () => {
      try {
        if (typeof window.dashjs === "undefined") {
          await loadScript("/vendor/dash.all.min.js", "dash");
        }
      } catch (e) {
        onError("Gagal load DASH player. Refresh halaman.");
        return;
      }
      if (cancelled) return;
      if (window.dashjs) {
        try {
          dash = window.dashjs.MediaPlayer().create();
          dash.initialize(video, proxiedUrl(src), true);
          dash.on(window.dashjs.MediaPlayer.events["STREAM_INITIALIZED"], () => setLoading(false));
          dash.on(window.dashjs.MediaPlayer.events["ERROR"], (e: any) => {
            if (e?.error?.code) {
              onError(`Stream error (${e.error.code}).`);
            } else {
              onError();
            }
          });
        } catch (err) {
          console.error("[Player] DASH setup failed:", err);
          onError("Browser tidak support DASH player.");
        }
      } else {
        // Try native video (will probably fail for DASH in Chrome, but try)
        video.src = proxiedUrl(src);
        video.addEventListener("loadedmetadata", () => setLoading(false), { once: true });
        video.addEventListener("error", () => onError("DASH tidak didukung browser ini."), { once: true });
      }
    };

    if (isDash) {
      startDash();
    } else {
      startHls();
    }

    video.muted = true;
    video.play().catch(() => {});

    return () => {
      cancelled = true;
      if (hls) { try { hls.destroy(); } catch {} }
      if (dash) { try { dash.reset(); } catch {} }
    };
  }, [src]);

  return (
    <div className="relative w-full h-full bg-black group">
      <video
        ref={videoRef}
        poster={poster}
        controls
        muted={muted}
        playsInline
        className="w-full h-full object-contain"
        onClick={(e) => {
          const v = e.currentTarget;
          if (v.paused) v.play();
          else v.pause();
        }}
      />

      {loading && !error && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/30">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-2 border-white/20 border-t-[#e50914] rounded-full animate-spin" />
            <p className="text-xs text-white/60">Loading {name}...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 p-6">
          <div className="text-center max-w-md">
            <div className="text-5xl mb-3">📡</div>
            <p className="text-sm font-semibold mb-1">Stream unavailable</p>
            <p className="text-xs text-white/60">{error}</p>
            <p className="text-[10px] text-white/40 mt-3">
              Stream publik kadang down. Coba lagi nanti atau pilih channel lain.
            </p>
          </div>
        </div>
      )}

      {muted && !loading && !error && (
        <button
          onClick={() => {
            setMuted(false);
            if (videoRef.current) videoRef.current.muted = false;
          }}
          className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-semibold hover:bg-black/80 transition"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M15.54 8.46a5 5 0 010 7.07" fill="none" stroke="currentColor" strokeWidth="2" />
            <line x1="22" y1="9" x2="16" y2="15" stroke="currentColor" strokeWidth="2" />
            <line x1="16" y1="9" x2="22" y2="15" stroke="currentColor" strokeWidth="2" />
          </svg>
          Tap to unmute
        </button>
      )}
    </div>
  );
}
