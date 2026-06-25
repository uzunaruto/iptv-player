import Link from "next/link";
import type { Movie } from "@/data/movies";
import { posterUrl, movieSlug } from "@/data/movies";
import WatchlistButton from "./WatchlistButton";

const COUNTRY_FLAGS: Record<string, string> = {
  ID: "🇮🇩", US: "🇺🇸", KR: "🇰🇷", JP: "🇯🇵", ES: "🇪🇸",
};

const COUNTRY_COLORS: Record<string, string> = {
  ID: "from-red-600 to-red-900",
  US: "from-blue-600 to-indigo-900",
  KR: "from-sky-500 to-blue-800",
  JP: "from-rose-500 to-pink-900",
  ES: "from-amber-500 to-yellow-900",
};

export default function MovieCard({ movie }: { movie: Movie }) {
  const flag = COUNTRY_FLAGS[movie.country] ?? "🎬";
  const fallbackColor = COUNTRY_COLORS[movie.country] ?? "from-zinc-500 to-zinc-800";
  const slug = movieSlug(movie);

  return (
    <Link
      href={`/movie/${slug}/`}
      className="movie-card relative group block aspect-[2/3] rounded-xl overflow-hidden bg-[#141414] ring-1 ring-white/[0.06]"
    >
      {/* Poster */}
      <img
        src={posterUrl(movie.poster, "w342")}
        alt={movie.title}
        loading="lazy"
        className={`absolute inset-0 w-full h-full object-cover transition duration-300 group-hover:scale-105 ${!movie.poster ? "hidden" : ""}`}
        onError={(e) => {
          (e.target as HTMLElement).style.display = "none";
        }}
      />

      {/* Fallback monogram */}
      {(!movie.poster) && (
        <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${fallbackColor}`}>
          <span className="text-4xl font-black text-white/90 drop-shadow tracking-tight">
            {movie.title.slice(0, 2).toUpperCase()}
          </span>
        </div>
      )}

      {/* Type badge */}
      <div className="absolute top-1.5 left-1.5 z-10">
        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
          movie.type === "series" ? "bg-purple-500/80 text-white" : "bg-[#e50914]/80 text-white"
        }`}>
          {movie.type === "series" ? "Series" : "Film"}
        </span>
      </div>

      {/* Rating badge */}
      <div className="absolute top-1.5 right-1.5 z-10">
        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-black/65 backdrop-blur-md text-[10px] font-bold text-yellow-400">
          ★ {movie.rating.toFixed(1)}
        </span>
      </div>

      {/* Country */}
      <div className="absolute bottom-1.5 left-1.5 z-10">
        <span className="text-[10px] glass px-1.5 py-0.5 rounded text-white/85">
          {flag} {movie.year}
        </span>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition duration-300" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

      {/* Watchlist button on hover */}
      <div className="absolute top-1.5 right-1.5 z-20 opacity-0 group-hover:opacity-100 transition duration-200">
        <WatchlistButton id={movieSlug(movie)} type="movie" title={movie.title} />
      </div>

      {/* Title */}
      <div className="absolute left-2 right-2 bottom-8 z-10 opacity-0 group-hover:opacity-100 transition duration-300">
        <p className="text-[10px] text-white/70 line-clamp-2 leading-tight">
          {movie.overview.slice(0, 80)}...
        </p>
      </div>
      <div className="absolute left-2 right-2 bottom-1 z-10">
        <p className="text-xs font-semibold text-white line-clamp-1 drop-shadow">
          {movie.title}
        </p>
      </div>
    </Link>
  );
}