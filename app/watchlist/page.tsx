"use client";

import { useWatchlist, getFullWatchlist } from "@/components/useWatchlist";
import MovieCard from "@/components/MovieCard";
import ChannelCard from "@/components/ChannelCard";
import Link from "next/link";

export default function WatchlistPage() {
  const { items, remove } = useWatchlist();
  const { movies, channels } = getFullWatchlist(items);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-40 glass border-b border-white/5">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Link href="/" className="text-lg font-black tracking-tighter hover:opacity-80 transition">
            NONTON<span className="text-[#e50914]">.</span>
          </Link>
          <span className="text-white/30 text-sm">/</span>
          <span className="text-sm text-white">Watchlist</span>
        </div>
      </div>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 py-8">
        {items.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">📋</div>
            <h2 className="text-xl font-bold mb-2">Watchlist kosong</h2>
            <p className="text-sm text-white/60 mb-6">
              Simpan film, series, atau channel TV favorit lo di sini.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link href="/movies/"
                className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold text-sm hover:bg-white/90 transition">
                Jelajahi Movies
              </Link>
              <Link href="/"
                className="inline-flex items-center gap-2 glass text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-white/15 transition">
                Live TV
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Movies section */}
            {movies.length > 0 && (
              <section className="mb-12">
                <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                  🎬 Film & Series
                  <span className="text-white/40 text-sm font-normal">({movies.length})</span>
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                  {movies.map(m => <MovieCard key={`movie-${m.id}`} movie={m} />)}
                </div>
              </section>
            )}

            {/* Channels section */}
            {channels.length > 0 && (
              <section className="mb-12">
                <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                  📺 Live TV
                  <span className="text-white/40 text-sm font-normal">({channels.length})</span>
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                  {channels.map(c => <ChannelCard key={`channel-${c.id}`} channel={c} />)}
                </div>
              </section>
            )}

            {/* Clear all */}
            <div className="text-center py-4">
              <button
                onClick={() => {
                  items.forEach(i => remove(i.id, i.type));
                }}
                className="text-xs text-white/40 hover:text-[#e50914] transition"
              >
                Hapus semua dari Watchlist
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}