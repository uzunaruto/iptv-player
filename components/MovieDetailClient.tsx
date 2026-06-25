"use client";

import Link from "next/link";
import { MOVIES, movieSlug, posterUrl, backdropUrl } from "@/data/movies";
import type { Movie } from "@/data/movies";
import MovieCard from "@/components/MovieCard";
import WatchlistButton from "@/components/WatchlistButton";

export default function MovieDetailClient({ movie }: { movie: Movie }) {
  const related = MOVIES.filter(
    m => m.id !== movie.id && (
      m.genres.some(g => movie.genres.includes(g)) || m.country === movie.country
    )
  ).slice(0, 12);

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-white/5">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Link href="/" className="text-lg font-black tracking-tighter hover:opacity-80 transition">
            NONTON<span className="text-[#e50914]">.</span>
          </Link>
          <span className="text-white/30 text-sm">/</span>
          <Link href="/movies/" className="text-sm text-white/60 hover:text-white transition">Movies</Link>
          <span className="text-white/30 text-sm">/</span>
          <span className="text-sm text-white truncate">{movie.title}</span>
        </div>
      </header>

      <main>
        {/* Hero section with backdrop */}
        <section className="relative overflow-hidden">
          {movie.backdrop && (
            <>
              <div className="absolute inset-0">
                <img
                  src={backdropUrl(movie.backdrop, "original")}
                  alt=""
                  className="w-full h-full object-cover opacity-40"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
            </>
          )}

          <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 py-10 sm:py-16">
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-start">
              {/* Poster */}
              <div className="w-[200px] sm:w-[280px] flex-shrink-0 mx-auto sm:mx-0">
                <div className="aspect-[2/3] rounded-xl overflow-hidden ring-1 ring-white/10 shadow-[0_24px_60px_rgba(0,0,0,.6)]">
                  <img
                    src={posterUrl(movie.poster, "w342")}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 pt-2">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    movie.type === "series" ? "bg-purple-500/80" : "bg-[#e50914]/80"
                  }`}>
                    {movie.type === "series" ? "Series" : "Film"}
                  </span>
                  <span className="text-sm text-white/60">{movie.year}</span>
                  <span className="px-2 py-0.5 rounded bg-yellow-500/15 text-yellow-400 text-[10px] font-bold">
                    ★ {movie.rating.toFixed(1)}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                  {movie.title}
                </h1>

                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  {movie.genres.map(g => (
                    <span key={g} className="px-2.5 py-1 rounded-full bg-white/8 text-white/70 text-[10px] font-medium">
                      {g}
                    </span>
                  ))}
                  {movie.runtime && (
                    <span className="text-xs text-white/50">
                      {Math.floor(movie.runtime / 60)}j {movie.runtime % 60}m
                    </span>
                  )}
                </div>

                <p className="mt-4 text-sm sm:text-base text-white/80 leading-relaxed max-w-2xl">
                  {movie.overview}
                </p>

                <div className="flex items-center gap-3 mt-6 flex-wrap">
                  <WatchlistButton id={movieSlug(movie)} type="movie" title={movie.title} />
                  <Link href="/movies/"
                    className="inline-flex items-center gap-2 glass text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-white/15 transition">
                    ← Kembali
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="max-w-[1600px] mx-auto px-4 sm:px-6 py-10 sm:py-14">
            <h2 className="text-lg sm:text-xl font-bold mb-4">Film & Series Lainnya</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
              {related.map(m => <MovieCard key={`${m.type}-${m.id}`} movie={m} />)}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}