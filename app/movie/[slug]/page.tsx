import { MOVIES, movieSlug } from "@/data/movies";
import { notFound } from "next/navigation";
import MovieDetailClient from "@/components/MovieDetailClient";

export function generateStaticParams() {
  return MOVIES.map(m => ({ slug: movieSlug(m) }));
}

export default async function MoviePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const movie = MOVIES.find(m => movieSlug(m) === slug);

  if (!movie) notFound();

  return <MovieDetailClient movie={movie} />;
}