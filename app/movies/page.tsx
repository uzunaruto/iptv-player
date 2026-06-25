"use client";

import { useState, useMemo } from "react";
import { MOVIES, MOVIE_GENRES, MOVIE_COUNTRIES, MOVIE_TYPES, type Movie } from "@/data/movies";
import MovieCard from "@/components/MovieCard";

export default function MoviesPage() {
  const [query, setQuery] = useState("");
  const [activeGenre, setActiveGenre] = useState<string>("all");
  const [activeType, setActiveType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"rating" | "year" | "title">("rating");

  const filtered = useMemo(() => {
    let list = [...MOVIES];

    // Type filter
    if (activeType !== "all") {
      list = list.filter(m => m.type === activeType);
    }

    // Genre filter
    if (activeGenre !== "all") {
      list = list.filter(m => m.genres.includes(activeGenre));
    }

    // Search
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      list = list.filter(
        m => m.title.toLowerCase().includes(q) ||
             m.overview.toLowerCase().includes(q) ||
             m.genres.some(g => g.toLowerCase().includes(q))
      );
    }

    // Sort
    list.sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "year") return b.year - a.year;
      return a.title.localeCompare(b.title);
    });

    return list;
  }, [query, activeGenre, activeType, sortBy]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-40 glass border-b border-white/5">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-3">
          {/* Search + Sort row */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[180px] max-w-xl">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="search" placeholder="Cari film, series, genre..."
                value={query} onChange={e => setQuery(e.target.value)}
                className="w-full bg-white/[0.06] border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder:text-white/35 outline-none focus:border-white/30 focus:bg-white/[0.1] transition"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy} onChange={e => setSortBy(e.target.value as any)}
              className="glass text-white px-3 py-2 rounded-full text-xs font-medium outline-none cursor-pointer"
            >
              <option value="rating">Rating</option>
              <option value="year">Tahun</option>
              <option value="title">A-Z</option>
            </select>
          </div>

          {/* Type tabs */}
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            {["all", "movie", "series"].map(t => (
              <button key={t} onClick={() => setActiveType(t)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition ${
                  activeType === t ? "bg-white text-black" : "bg-white/[0.06] text-white/70 hover:bg-white/[0.12]"
                }`}
              >
                {t === "all" ? `Semua (${MOVIES.length})` : t === "movie" ? "Film" : "Series"}
              </button>
            ))}
          </div>

          {/* Genre chips */}
          <div className="flex items-center gap-1.5 mt-2 overflow-x-auto no-scrollbar pb-1">
            <button onClick={() => setActiveGenre("all")}
              className={`flex-shrink-0 px-2.5 py-1 rounded-full text-[10px] font-medium transition ${
                activeGenre === "all" ? "bg-white/15 text-white" : "bg-white/[0.04] text-white/50 hover:bg-white/[0.08]"
              }`}
            >Semua</button>
            {MOVIE_GENRES.map(g => (
              <button key={g} onClick={() => setActiveGenre(g)}
                className={`flex-shrink-0 px-2.5 py-1 rounded-full text-[10px] font-medium transition whitespace-nowrap ${
                  activeGenre === g ? "bg-white/15 text-white" : "bg-white/[0.04] text-white/50 hover:bg-white/[0.08]"
                }`}
              >{g}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-lg font-bold">
            {query ? `Hasil: "${query}"` : activeGenre === "all" ? "Semua Film & Series" : activeGenre}
            <span className="text-white/40 font-normal ml-2 text-sm">({filtered.length})</span>
          </h2>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-white/50">
            <p className="text-sm">Tidak ada yang cocok.</p>
            <button onClick={() => { setQuery(""); setActiveGenre("all"); setActiveType("all"); }}
              className="mt-4 text-xs text-[#e50914] hover:underline">Reset filter</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {filtered.map(m => <MovieCard key={`${m.type}-${m.id}`} movie={m} />)}
          </div>
        )}
      </main>
    </div>
  );
}