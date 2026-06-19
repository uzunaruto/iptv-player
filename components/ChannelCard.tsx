import Link from "next/link";
import type { Channel } from "@/data/channels";

const FLAGS: Record<string, string> = {
  Indonesia: "🇮🇩",
  "South Korea": "🇰🇷",
  Japan: "🇯🇵",
  Thailand: "🇹🇭",
  Malaysia: "🇲🇾",
  Singapore: "🇸🇬",
  Philippines: "🇵🇭",
};

// Generate monogram dari nama channel (max 2 letters)
function getMonogram(name: string) {
  const clean = name.split(" (")[0].trim();
  const words = clean.split(/[\s\-_]+/).filter(Boolean);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return clean.slice(0, 2).toUpperCase();
}

// Country → color theme buat monogram
const COUNTRY_COLORS: Record<string, string> = {
  Indonesia: "from-red-600 to-red-900",
  "South Korea": "from-sky-500 to-blue-800",
  Japan: "from-rose-500 to-pink-900",
  Thailand: "from-indigo-500 to-purple-900",
  Malaysia: "from-amber-500 to-yellow-900",
  Singapore: "from-emerald-500 to-teal-900",
  Philippines: "from-blue-500 to-cyan-900",
};

export default function ChannelCard({ channel }: { channel: Channel }) {
  const flag = FLAGS[channel.country] ?? "📺";
  const monogram = getMonogram(channel.name);
  const gradient = COUNTRY_COLORS[channel.country] ?? "from-zinc-500 to-zinc-800";
  const isHD = channel.quality ? ["HD", "1080p", "720p", "4K"].some((q) => channel.quality!.includes(q)) : false;

  return (
    <Link
      href={`/watch/${encodeURIComponent(channel.id)}/`}
      className="channel-card relative group block aspect-[16/9] rounded-xl overflow-hidden bg-[#141414] ring-1 ring-white/[0.06]"
    >
      {/* Logo OR monogram */}
      {channel.logo ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#161616] to-[#0a0a0a]">
          <img
            src={channel.logo}
            alt={channel.name}
            loading="lazy"
            className="relative w-[58%] h-[58%] object-contain opacity-95 drop-shadow-[0_8px_18px_rgba(0,0,0,.55)] transition duration-300 group-hover:scale-110"
          />
        </div>
      ) : (
        <div
          className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${gradient}`}
        >
          <span className="text-4xl sm:text-5xl font-black text-white/90 drop-shadow-[0_4px_14px_rgba(0,0,0,.45)] tracking-tight">
            {monogram}
          </span>
          <span className="absolute bottom-2 right-2 text-xl opacity-30">{flag}</span>
        </div>
      )}

      {/* Country flag top-left (always shown) */}
      <div className="absolute top-1.5 left-1.5 z-10 text-[10px] glass px-1.5 py-0.5 rounded">
        <span className="mr-1">{flag}</span>
        <span className="text-white/85">{channel.country.split(" ")[0]}</span>
      </div>

      {/* Live badge - always top-right */}
      <div className="absolute top-1.5 right-1.5 z-10">
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/65 backdrop-blur-md text-[9px] font-semibold text-green-300 uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Live
        </span>
      </div>

      {/* Quality badge */}
      {isHD && (
        <div className="absolute bottom-1.5 right-1.5 z-10">
          <span className="px-1.5 py-0.5 rounded bg-[#e50914]/90 text-[9px] font-bold text-white uppercase tracking-wider">
            {channel.quality?.replace(/[()]/g, "")}
          </span>
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition duration-300" />
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/85 via-black/50 to-transparent opacity-90" />

      {/* Title at bottom — always visible, more prominent */}
      <div className="absolute left-2 right-2 bottom-1 z-10">
        <p className="text-xs font-semibold text-white line-clamp-1 drop-shadow">
          {channel.name.split(" (")[0]}
        </p>
      </div>
    </Link>
  );
}
