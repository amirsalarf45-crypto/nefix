
"use client";

import { useParams } from "next/navigation";
import { movies } from "@/app/lib/movies";
import { useEffect, useRef, useState } from "react";

export default function WatchPage() {
  const params = useParams();
  const slug = String(params.slug);
  const movie = movies.find((item) => item.id === slug);

  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration || 0);

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [slug]);

  if (!movie) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <h1 className="text-4xl font-black text-red-600">
          404 - MOVIE NOT FOUND
        </h1>
      </main>
    );
  }

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const toggleFullscreen = () => {
    const player = playerRef.current;
    if (!player) return;

    if (!document.fullscreenElement) {
      player.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const changeTime = (value: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value;
      setCurrentTime(value);
    }
  };

  const changeVolume = (value: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = value;
    setVolume(value);
    video.muted = value === 0;
    setMuted(value === 0);
  };

  const formatTime = (time: number) => {
    if (!Number.isFinite(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <main className="min-h-screen bg-[#070707] text-white">
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-6">
        <a href="/" className="text-3xl font-black tracking-[5px]">
          <span>NE</span>
          <span className="text-red-600">FIX</span>
        </a>

        <span className="text-xs tracking-[4px] text-zinc-500">
          PREMIUM CINEMA
        </span>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="mb-8">
          <p className="mb-2 text-xs tracking-[5px] text-red-500">
            NOW STREAMING
          </p>
          <h1 className="text-3xl font-black md:text-5xl">
            {movie.title}
          </h1>
        </div>

        <div
          ref={playerRef}
          className="group relative overflow-hidden rounded-2xl border border-red-900/40 bg-black shadow-[0_0_60px_rgba(220,38,38,0.12)]"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          <video
            ref={videoRef}
            className="aspect-video w-full object-contain"
            src={movie.videoUrl}
            poster={movie.poster}
            playsInline
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
          >
            {movie.subtitleUrl && (
              <track
                kind="subtitles"
                src={movie.subtitleUrl}
                srcLang="fa"
                label="فارسی"
                default
              />
            )}
          </video>

          {!playing && (
            <button
              onClick={togglePlay}
              className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-red-500 bg-red-600/90 text-3xl shadow-[0_0_40px_rgba(220,38,38,0.5)] transition hover:scale-110"
              aria-label="Play"
            >
              ▶
            </button>
          )}

          <div
            className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-5 pt-16 transition-opacity duration-300 ${
              showControls || !playing ? "opacity-100" : "opacity-0"
            }`}
          >
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={Math.min(currentTime, duration || 0)}
              onChange={(e) => changeTime(Number(e.target.value))}
              className="mb-4 h-1 w-full cursor-pointer accent-red-600"
              aria-label="Video progress"
            />

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  className="text-2xl transition hover:text-red-500"
                  aria-label={playing ? "Pause" : "Play"}
                >
                  {playing ? "Ⅱ" : "▶"}
                </button>

                <button
                  onClick={() => changeTime(Math.max(0, currentTime - 10))}
                  className="text-sm text-zinc-300 hover:text-white"
                >
                  -10s
                </button>

                <button
                  onClick={() =>
                    changeTime(Math.min(duration, currentTime + 10))
                  }
                  className="text-sm text-zinc-300 hover:text-white"
                >
                  +10s
                </button>

                <span className="text-xs tabular-nums text-zinc-300">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    const nextMuted = !muted;
                    setMuted(nextMuted);
                    if (videoRef.current) {
                      videoRef.current.muted = nextMuted;
                    }
                  }}
                  className="text-xl hover:text-red-500"
                  aria-label="Mute"
                >
                  {muted || volume === 0 ? "🔇" : "🔊"}
                </button>

                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={muted ? 0 : volume}
                  onChange={(e) => changeVolume(Number(e.target.value))}
                  className="w-20 cursor-pointer accent-red-600"
                  aria-label="Volume"
                />

                <button
                  onClick={toggleFullscreen}
                  className="text-xl transition hover:text-red-500"
                  aria-label="Fullscreen"
                >
                  ⛶
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <span className="rounded-lg bg-red-600 px-5 py-2 text-sm font-bold">
            {movie.year}
          </span>
          <span className="text-sm text-zinc-400">
            HIGH QUALITY STREAMING
          </span>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-zinc-950 p-6">
          <h2 className="mb-3 text-xl font-bold">ABOUT THIS MOVIE</h2>
          <p className="leading-8 text-zinc-400">{movie.description}</p>
        </div>

        <footer className="mt-12 border-t border-white/10 py-6 text-center text-xs tracking-[4px] text-zinc-600">
          NEFIX — PREMIUM CINEMA EXPERIENCE
        </footer>
      </section>
    </main>
  );
}
