/**
 * Vercel serverless proxy — adds CORS headers and rewrites manifest URLs so
 * the browser can play streams from CORS-locked CDNs (CloudFront DASH, etc.).
 *
 * Strategy:
 *   1. Fetch upstream with browser-like User-Agent.
 *   2. Detect manifest type (HLS m3u8 vs DASH mpd).
 *   3. Rewrite relative segment/playlist URLs in the manifest to go through
 *      this proxy too — so every subsequent fetch carries CORS headers.
 *   4. Return with Access-Control-Allow-Origin: *.
 *
 * Usage: /api/stream?u=<encoded URL>
 *        /api/stream?u=<encoded URL>&seg=1  (force segment proxy mode)
 */

export const config = {
  api: {
    bodyParser: false,
  },
};

const UPSTREAM_TIMEOUT_MS = 12000;
const PROXY_PATH = "/api/stream";

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Max-Age", "86400");
}

// Encode the entire upstream URL as base64 so special chars (?, =, &) in the
// upstream URL don't conflict with the proxy query string.
function proxyWrap(absUrl) {
  // base64url — URL-safe, no padding (we trim it for cleaner URLs)
  const b64 = Buffer.from(absUrl, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  return `${PROXY_PATH}?u=${b64}`;
}

function proxyWrapLegacy(absUrl) {
  // Fallback for non-base64 aware callers
  return `${PROXY_PATH}?u=${encodeURIComponent(absUrl)}`;
}

function unwrapProxy(req) {
  const raw = req.query?.u;
  if (!raw) return null;
  // Try base64 first
  try {
    const padded = raw.replace(/-/g, "+").replace(/_/g, "/") +
      "=".repeat((4 - (raw.length % 4)) % 4);
    const decoded = Buffer.from(padded, "base64").toString("utf8");
    if (/^https?:\/\//.test(decoded)) return decoded;
  } catch {}
  // Fallback to URL decoding
  try {
    const decoded = decodeURIComponent(raw);
    if (/^https?:\/\//.test(decoded)) return decoded;
  } catch {}
  return null;
}

function toAbsoluteUrl(maybeRel, baseAbs, manifestAbs) {
  if (!maybeRel) return maybeRel;
  const trimmed = String(maybeRel).trim();
  if (!trimmed) return trimmed;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith("//")) return `https:${trimmed}`;
  try {
    const base = new URL(manifestAbs);
    if (trimmed.startsWith("/")) {
      // Absolute path: resolve against host + base directory
      const pathDir = base.pathname.split("/").slice(0, -1).join("/");
      return `${base.protocol}//${base.host}${pathDir}${trimmed}`;
    }
    if (trimmed.startsWith("?")) {
      return new URL(trimmed, manifestAbs).toString();
    }
    // Relative path: resolve against baseAbs (which already ends with /)
    return new URL(trimmed, baseAbs).toString();
  } catch {
    return trimmed;
  }
}

// Rewrite HLS m3u8 — every non-# line that's a URL or template
function rewriteM3U8(body, manifestAbs) {
  const baseAbs = manifestAbs.split("/").slice(0, -1).join("/") + "/";
  const lines = body.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const abs = toAbsoluteUrl(trimmed, baseAbs, manifestAbs);
    if (abs !== trimmed) {
      lines[i] = proxyWrap(abs);
    }
  }
  return lines.join("\n");
}

// Rewrite DASH mpd — <BaseURL>, SegmentTemplate URLs, xlink:href, etc.
function rewriteMPD(body, manifestAbs) {
  const baseAbs = manifestAbs.split("/").slice(0, -1).join("/") + "/";

  // <BaseURL>inner</BaseURL>
  body = body.replace(
    /<BaseURL>([^<]*)<\/BaseURL>/gi,
    (m, inner) => {
      const abs = toAbsoluteUrl(inner, baseAbs, manifestAbs);
      return `<BaseURL>${proxyWrap(abs)}</BaseURL>`;
    }
  );

  // Attributes that hold URLs: xlink:href, href, src, media, initialization
  body = body.replace(
    /\s(xlink:href|href|src|media|initialization|indexURL)=("([^"]*)"|'([^']*)')/gi,
    (m, attr, _full, dq, sq) => {
      const val = dq !== undefined ? dq : sq;
      const abs = toAbsoluteUrl(val, baseAbs, manifestAbs);
      const q = dq !== undefined ? `"` : `'`;
      return ` ${attr}=${q}${proxyWrap(abs)}${q}`;
    }
  );
  return body;
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    setCors(res);
    return res.status(204).end();
  }

  const url = unwrapProxy(req);
  if (!url || typeof url !== "string") {
    setCors(res);
    return res.status(400).json({ error: "Missing ?u=URL parameter" });
  }

  let target;
  try {
    target = new URL(url);
  } catch (e) {
    setCors(res);
    return res.status(400).json({ error: "Invalid URL" });
  }

  if (target.protocol !== "http:" && target.protocol !== "https:") {
    setCors(res);
    return res.status(400).json({ error: "Only http/https URLs allowed" });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

    const upstream = await fetch(target.toString(), {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
        Accept: "*/*",
        "Accept-Language": "en-US,en;q=0.9",
      },
      signal: controller.signal,
      redirect: "follow",
    });
    clearTimeout(timeout);

    if (!upstream.ok) {
      setCors(res);
      return res.status(upstream.status).json({
        error: `Upstream returned ${upstream.status}`,
        url: target.toString(),
      });
    }

    const contentType = upstream.headers.get("content-type") || "application/octet-stream";
    const isHls =
      contentType.includes("mpegurl") ||
      contentType.includes("vnd.apple.mpegurl") ||
      target.pathname.endsWith(".m3u8") ||
      target.pathname.endsWith(".m3u");
    const isDash =
      contentType.includes("dash") ||
      target.pathname.endsWith(".mpd");

    setCors(res);
    res.setHeader("Cache-Control", "no-store");

    if (isHls) {
      const body = await upstream.text();
      res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
      return res.status(200).send(rewriteM3U8(body, target.toString()));
    }

    if (isDash) {
      const body = await upstream.text();
      res.setHeader("Content-Type", "application/dash+xml");
      return res.status(200).send(rewriteMPD(body, target.toString()));
    }

    // Video segment / binary — stream through with CORS
    res.setHeader("Content-Type", contentType);
    const buf = await upstream.arrayBuffer();
    return res.status(200).send(Buffer.from(buf));
  } catch (err) {
    setCors(res);
    const msg =
      err.name === "AbortError"
        ? "Upstream timeout"
        : err.message || "Unknown error";
    return res.status(502).json({ error: msg, url: target.toString() });
  }
}
