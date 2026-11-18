
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { movies } from "@/app/lib/movies";

export default function MyListPage() {
  const [savedMovies, setSavedMovies] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("nefix-my-list") || "[]"
    );

    setSavedMovies(saved);
    setLoaded(true);
  }, []);

  function removeMovie(id: string) {
    const updated = savedMovies.filter(
      (movieId) => movieId !== id
    );

    localStorage.setItem(
      "nefix-my-list",
      JSON.stringify(updated)
    );

    setSavedMovies(updated);
  }

  const myMovies = movies.filter((movie) =>
    savedMovies.includes(String(movie.id))
  );

  return (
    <main className="min-h-screen bg-[#141414] text-white px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/"
          className="text-zinc-400 hover:text-white transition text-sm"
        >
          ← Back to Home
        </Link>

        <div className="mt-10 mb-12">
          <p className="text-red-500 text-xs font-bold tracking-[5px] mb-4">
            NEFIX COLLECTION
          </p>

          <h1 className="text-4xl md:text-6xl font-black">
            My List
          </h1>

          <p className="text-zinc-500 mt-4">
            Your personal movie collection
          </p>
        </div>

        {!loaded ? (
          <p className="text-zinc-400">Loading...</p>
        ) : myMovies.length === 0 ? (
          <div className="text-center py-24 border border-white/10 rounded-2xl">
            <div className="text-5xl mb-6">🎬</div>

            <h2 className="text-2xl font-bold mb-3">
              Your list is empty
            </h2>

            <p className="text-zinc-500 mb-8">
              Add movies to your list and enjoy them later.
            </p>

            <Link
              href="/"
              className="inline-block bg-red-600 hover:bg-red-700 px-8 py-3 rounded-lg font-bold transition"
            >
              Explore Movies
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {myMovies.map((movie) => (
              <div key={movie.id} className="group">
                <Link href={`/movie/${movie.id}`}>
                  <div className="overflow-hidden rounded-xl">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>

                  <h3 className="font-bold mt-3">
                    {movie.title}
                  </h3>
                </Link>

                <p className="text-zinc-500 text-sm mt-1">
                  {movie.year}
                </p>

                <button
                  onClick={() => removeMovie(String(movie.id))}
                  className="mt-3 text-sm text-red-500 hover:text-red-400 transition"
                >
                  ✕ Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
