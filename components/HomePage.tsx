"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import type { Channel } from "@/data/channels";
import ChannelCard from "./ChannelCard";

interface Country {
  code: string;
  name: string;
  count: number;
  flag?: string;
}

export default function HomePage({
  channels,
  countries,
  featured,
}: {
  channels: Channel[];
  countries: Country[];
  featured: Channel[];
}) {
  const [query, setQuery] = useState("");
  const [activeCountry, setActiveCountry] = useState<string>("all");

  const filtered = useMemo(() => {
    let list = channels;
    if (activeCountry !== "all") {
      list = list.filter((c) => c.country === activeCountry);
    }
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.country.toLowerCase().includes(q) ||
          (c.group?.toLowerCase().includes(q) ?? false)
      );
    }
    return list;
  }, [channels, query, activeCountry]);

  const heroChannel = featured[0] ?? channels[0];
  const totalChannels = channels.length;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[72vh] min-h-[480px] max-h-[760px] overflow-hidden">
        {heroChannel && (
          <>
            <div className="absolute inset-0 logo-fallback">
              {heroChannel.logo && (
                <img
                  src={heroChannel.logo}
                  alt={heroChannel.name}
                  className="absolute right-[8vw] top-1/2 -translate-y-1/2 w-[36vw] max-w-[480px] min-w-[220px] aspect-square object-contain opacity-25 blur-[1px] scale-110"
                />
              )}
            </div>
            <div className="absolute inset-0 hero-gradient" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
          </>
        )}

        <div className="absolute bottom-12 sm:bottom-16 left-0 right-0 z-20 px-5 sm:px-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-[10px] uppercase tracking-[0.24em] text-white/70 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_14px_rgba(74,222,128,.8)] animate-pulse" />
            Live · {totalChannels}+ channel
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black leading-[0.9] drop-shadow-2xl max-w-[900px]">
            NONTON
          </h1>
          <p className="text-sm sm:text-base text-white/70 mt-4 max-w-xl">
            Live TV Indonesia, Korea, Thailand, Japan. Streaming gratis, tanpa buffering, tanpa login.
          </p>
          <div className="flex items-center gap-3 mt-7 flex-wrap">
            {heroChannel && (
              <Link
                href={`/watch/${encodeURIComponent(heroChannel.id)}/`}
                className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold text-sm hover:bg-white/90 transition shadow-[0_16px_50px_rgba(255,255,255,.18)]"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Tonton {heroChannel.name.split(" (")[0]}
              </Link>
            )}
            <a
              href="#channels"
              className="inline-flex items-center gap-2 glass text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-white/15 transition"
            >
              Browse Semua
            </a>
          </div>
        </div>
      </section>

      {/* Sticky search + filter bar */}
      <div className="sticky top-0 z-40 glass border-b border-white/5">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-3 flex items-center gap-3 flex-wrap">
          <Link href="/" className="flex-shrink-0">
            <span className="text-xl font-black tracking-tighter">
              NONTON<span className="text-[#e50914]">.</span>
            </span>
          </Link>

          <div className="relative flex-1 min-w-[180px] max-w-xl">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="search"
              placeholder="Cari channel, negara, kategori..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-white/[0.06] border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder:text-white/35 outline-none focus:border-white/30 focus:bg-white/[0.1] transition"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveCountry("all")}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition ${
                activeCountry === "all"
                  ? "bg-white text-black"
                  : "bg-white/[0.06] text-white/70 hover:bg-white/[0.12]"
              }`}
            >
              Semua ({channels.length})
            </button>
            {countries.map((c) => (
              <button
                key={c.code}
                onClick={() => setActiveCountry(c.name)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition ${
                  activeCountry === c.name
                    ? "bg-white text-black"
                    : "bg-white/[0.06] text-white/70 hover:bg-white/[0.12]"
                }`}
              >
                {c.name} ({c.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Channel grid */}
      <main id="channels" className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="text-lg sm:text-xl font-bold">
            {activeCountry === "all" ? "Semua Channel" : activeCountry}
            <span className="text-white/40 font-normal ml-2 text-sm">
              ({filtered.length})
            </span>
          </h2>
          {query && (
            <p className="text-xs text-white/50">
              Cari: <span className="text-white/80">"{query}"</span>
            </p>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-white/50">
            <p className="text-sm">Tidak ada channel yang cocok.</p>
            <button
              onClick={() => {
                setQuery("");
                setActiveCountry("all");
              }}
              className="mt-4 text-xs text-[#e50914] hover:underline"
            >
              Reset filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {filtered.map((ch) => (
              <ChannelCard key={ch.id} channel={ch} />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-white/5 py-8 text-center text-xs text-white/40">
        <p>
          NONTON · Powered by{" "}
          <a
            href="https://github.com/iptv-org/iptv"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/70 transition"
          >
            iptv-org/iptv
          </a>{" "}
          · {totalChannels} channel
        </p>
      </footer>
    </div>
  );
}
