"use client";

import { useWatchlist } from "./useWatchlist";

interface Props {
  id: string;
  type: "movie" | "channel";
  title: string;
  size?: "sm" | "md";
}

export default function WatchlistButton({ id, type, title, size = "sm" }: Props) {
  const { toggle, isSaved } = useWatchlist();
  const saved = isSaved(id, type);

  const sizeClasses = size === "sm" ? "px-2.5 py-1.5 text-[10px]" : "px-4 py-2.5 text-xs";

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(id, type);
      }}
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold transition ${
        saved
          ? "bg-[#e50914]/20 text-[#e50914] hover:bg-[#e50914]/30"
          : "glass text-white/70 hover:text-white hover:bg-white/15"
      } ${sizeClasses}`}
      title={saved ? "Hapus dari Watchlist" : "Tambah ke Watchlist"}
    >
      <svg viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"}
        stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
      </svg>
      {saved ? "Tersimpan" : "Simpan"}
    </button>
  );
}