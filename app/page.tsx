
"use client";

import { useState } from "react";
import Link from "next/link";

const featuredMovies = [
  {
    id: "dune-part-two",
    title: "DUNE: PART TWO",
    genre: "SCI-FI · ADVENTURE",
    year: "2024",
    poster: "/movies/dune-2.jpg",
    number: "01",
  },
  {
    id: "the-batman",
    title: "THE BATMAN",
    genre: "ACTION · CRIME",
    year: "2022",
    poster: "/movies/the-batman.jpg",
    number: "02",
  },
  {
    id: "interstellar",
    title: "INTERSTELLAR",
    genre: "SCI-FI · DRAMA",
    year: "2014",
    poster: "/movies/interstellar.jpg",
    number: "03",
  },
  {
    id: "joker",
    title: "JOKER",
    genre: "THRILLER · DRAMA",
    year: "2019",
    poster: "/movies/joker.jpg",
    number: "04",
  },
];

export default function Home() {
  const [search, setSearch] = useState("");

  const filteredMovies = featuredMovies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <header className="relative z-20 border-b border-white/10">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-5 px-6 py-6 lg:px-12">
          <a href="#" className="text-3xl font-black tracking-[-2px]">
            NE<span className="text-red-600">FIX</span>
            <span className="ml-1 text-red-600">.</span>
          </a>

          <nav className="hidden items-center gap-10 text-xs font-medium tracking-[2px] text-zinc-400 md:flex">
            <a href="#" className="text-white">HOME</a>
            <a href="#movies" className="transition hover:text-red-500">MOVIES</a>
            <a href="#series" className="transition hover:text-red-500">SERIES</a>
            <a href="#about" className="transition hover:text-red-500">ABOUT</a>
          </nav>

          <div className="flex items-center gap-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  document.getElementById("movies")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }
              }}
              placeholder="Search movies..."
              className="w-36 rounded-full border border-white/20 bg-white/5 px-4 py-3 text-xs text-white outline-none transition focus:border-red-600 placeholder:text-zinc-500 sm:w-52"
            />

            <button className="rounded-full border border-white/20 px-5 py-3 text-xs tracking-widest transition hover:border-red-600 hover:bg-red-600">
              SIGN IN
            </button>
          </div>
        </div>
      </header>

      <section className="relative flex min-h-[680px] items-center overflow-hidden px-6 lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_50%,rgba(150,0,0,0.25),transparent_55%)]" />

        <div className="absolute right-[-100px] top-20 h-[500px] w-[500px] rounded-full border border-red-700/20 bg-gradient-to-br from-red-950/40 via-black to-black blur-[2px] shadow-[0_0_150px_rgba(180,0,0,0.15)]" />

        <div className="relative z-10 mx-auto w-full max-w-[1400px]">
          <p className="mb-7 text-xs tracking-[6px] text-red-500">
            THE WORLD OF CINEMA
          </p>

          <h1 className="max-w-4xl text-6xl font-black leading-[0.95] tracking-[-4px] sm:text-8xl lg:text-[110px]">
            BEYOND
            <br />
            <span className="text-red-600">IMAGINATION.</span>
          </h1>

          <p className="mt-8 max-w-lg text-sm leading-8 text-zinc-400">
            Enter a new dimension of entertainment. Discover the greatest
            movies and series, all in one cinematic universe.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#movies"
              className="rounded-full bg-red-600 px-9 py-4 text-xs font-bold tracking-[2px] transition hover:bg-red-700"
            >
              EXPLORE NOW →
            </a>

            <a
              href="#about"
              className="rounded-full border border-white/20 px-9 py-4 text-xs tracking-[2px] transition hover:border-white"
            >
              DISCOVER NEFIX
            </a>
          </div>

          <div className="mt-20 flex gap-12 border-t border-white/10 pt-7">
            <div>
              <p className="text-2xl font-bold">4K</p>
              <p className="mt-1 text-[10px] tracking-widest text-zinc-500">ULTRA HD</p>
            </div>
            <div>
              <p className="text-2xl font-bold">∞</p>
              <p className="mt-1 text-[10px] tracking-widest text-zinc-500">ENTERTAINMENT</p>
            </div>
            <div>
              <p className="text-2xl font-bold">24/7</p>
              <p className="mt-1 text-[10px] tracking-widest text-zinc-500">YOUR CINEMA</p>
            </div>
          </div>
        </div>
      </section>

      <section id="movies" className="mx-auto max-w-[1400px] px-6 py-24 lg:px-12">
        <div className="mb-12">
          <p className="mb-3 text-xs tracking-[5px] text-red-500">
            HANDPICKED FOR YOU
          </p>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            TRENDING <span className="text-red-600">NOW.</span>
          </h2>
        </div>

        {search && (
          <p className="mb-6 text-sm text-zinc-400">
            Search results for: <span className="text-red-500">{search}</span>
          </p>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredMovies.map((movie) => (
            <article key={movie.id} className="group">
              <Link
                href={`/movie/${movie.id}`}
                className="block cursor-pointer"
              >
                <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-zinc-900 shadow-xl transition duration-500 group-hover:-translate-y-2 group-hover:shadow-red-950/40">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/20" />

                  <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/40 px-3 py-2 text-xs tracking-widest text-white/80 backdrop-blur-sm">
                    N° {movie.number}
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <span className="mb-3 inline-block rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[9px] tracking-widest text-white/80 backdrop-blur-sm">
                      {movie.year}
                    </span>

                    <h3 className="text-2xl font-black drop-shadow-lg">
                      {movie.title}
                    </h3>

                    <p className="mt-2 text-[9px] tracking-[2px] text-zinc-300">
                      {movie.genre}
                    </p>

                    <div className="mt-5 inline-flex items-center gap-2 text-xs font-bold tracking-widest text-red-400 opacity-0 transition duration-300 group-hover:opacity-100">
                      VIEW DETAILS <span>→</span>
                    </div>
                  </div>

                  <div className="absolute inset-0 border border-white/0 transition duration-500 group-hover:border-red-600/60" />
                </div>
              </Link>
            </article>
          ))}
        </div>

        {filteredMovies.length === 0 && (
          <div className="py-20 text-center">
            <p className="mb-5 text-4xl">🎬</p>
            <h3 className="text-2xl font-bold">No movies found</h3>
            <p className="mt-3 text-sm text-zinc-500">
              Try another movie title.
            </p>
          </div>
        )}
      </section>

      <section id="series" className="border-y border-white/10 bg-[#0d0d0d] px-6 py-24 lg:px-12">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <div>
            <p className="mb-4 text-xs tracking-[5px] text-red-500">
              YOUR NEXT OBSESSION
            </p>
            <h2 className="text-5xl font-black leading-tight sm:text-7xl">
              ONE MORE
              <br />
              <span className="text-red-600">EPISODE.</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-sm leading-8 text-zinc-400">
              From unforgettable stories to extraordinary worlds.
              Your next favorite series is waiting for you.
            </p>
            <a
              href="#movies"
              className="mt-8 inline-block border-b border-red-600 pb-2 text-xs tracking-[3px] hover:text-red-500"
            >
              EXPLORE THE COLLECTION →
            </a>
          </div>
        </div>
      </section>

      <footer id="about" className="px-6 py-12 lg:px-12">
        <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-2xl font-black tracking-[-2px]">
            NE<span className="text-red-600">FIX</span>.
          </p>
          <p className="text-xs tracking-widest text-zinc-600">
            © 2026 NEFIX. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </main>
  );
}
