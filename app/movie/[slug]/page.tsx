
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { movies } from "@/app/lib/movies";

export default function MoviePage() {
  const params = useParams();
  const router = useRouter();
  const slug = String(params.slug);

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedMovies = JSON.parse(
      localStorage.getItem("nefix-my-list") || "[]"
    );

    setIsSaved(savedMovies.includes(slug));
  }, [slug]);

  const movie = movies.find((item) => item.id === slug);

  if (!movie) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-black mb-5">404</h1>
          <Link href="/" className="text-red-500">
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  const similarMovies = movies.filter(
    (item) => item.id !== movie.id
  );

  const toggleSaved = () => {
    const savedMovies: string[] = JSON.parse(
      localStorage.getItem("nefix-my-list") || "[]"
    );

    const updatedMovies = isSaved
      ? savedMovies.filter((id) => id !== slug)
      : [...savedMovies, slug];

    localStorage.setItem(
      "nefix-my-list",
      JSON.stringify(updatedMovies)
    );

    setIsSaved(!isSaved);
  };

  return (
    <main className="min-h-screen bg-[#141414] text-white">
      <section className="relative min-h-[85vh] flex items-end">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${movie.backdrop || movie.poster}')`,
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/30" />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pb-20 pt-40">
          <p className="text-red-500 font-bold tracking-[5px] text-xs mb-6">
            NEFIX ORIGINAL
          </p>

          <h1 className="text-5xl md:text-7xl font-black max-w-3xl mb-7">
            {movie.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-300 mb-7">
            <span className="text-green-400 font-bold">
              {movie.rating ? `${movie.rating}/10` : "NEFIX"}
            </span>
            <span>{movie.year}</span>
            <span>{movie.genre || "Movie"}</span>
          </div>

          <p className="max-w-2xl text-zinc-300 leading-8 mb-9">
            {movie.description}
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => router.push(`/watch/${movie.id}`)}
              className="bg-red-600 text-white hover:bg-red-700 px-9 py-4 rounded-lg font-black transition shadow-lg shadow-red-600/20"
            >
              ▶ PLAY
            </button>

            <button
              onClick={toggleSaved}
              className="bg-zinc-600/70 hover:bg-zinc-500 px-8 py-4 rounded-lg font-bold transition"
            >
              {isSaved ? "✓ Added to My List" : "+ My List"}
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-6">
          About {movie.title}
        </h2>

        <p className="text-zinc-400 leading-8 max-w-4xl mb-10">
          {movie.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-zinc-500 text-sm mb-3">Genre</p>
            <p>{movie.genre || "Not available"}</p>
          </div>

          <div>
            <p className="text-zinc-500 text-sm mb-3">Release Year</p>
            <p>{movie.year}</p>
          </div>

          <div>
            <p className="text-zinc-500 text-sm mb-3">Cast</p>
            <p>{movie.cast?.join(", ") || "Not available"}</p>
          </div>

          <div>
            <p className="text-zinc-500 text-sm mb-3">Rating</p>
            <p>{movie.rating || "Not rated"}</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-black mb-8">
          More Like This
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {similarMovies.map((item) => (
            <Link
              href={`/movie/${item.id}`}
              key={item.id}
              className="group"
            >
              <div className="overflow-hidden rounded-xl bg-zinc-900">
                <img
                  src={item.poster}
                  alt={item.title}
                  className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <h3 className="font-bold mt-3 group-hover:text-red-500 transition">
                {item.title}
              </h3>

              <p className="text-zinc-500 text-sm mt-1">
                {item.year}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-zinc-600 text-xs tracking-[4px]">
        NEFIX © 2026
      </footer>
    </main>
  );
}
