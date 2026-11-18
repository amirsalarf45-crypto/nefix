
"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export default function NefixIntro({
  children,
}: {
  children: ReactNode;
}) {
  const [showIntro, setShowIntro] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio("/sounds/nefix-intro.mp3");
    audio.volume = 0.85;
    audioRef.current = audio;

    const startSound = () => {
      if (startedRef.current) return;

      startedRef.current = true;

      audio.play().catch((error) => {
        console.error("NEFIX audio error:", error);
      });
    };

    document.addEventListener("pointerdown", startSound);

    const timer = setTimeout(() => {
      setShowIntro(false);
      audio.pause();
      audio.currentTime = 0;
    }, 10000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("pointerdown", startSound);
      audio.pause();
    };
  }, []);

  return (
    <>
      {children}

      {showIntro && (
        <div className="nefix-screen fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505]">
          <div className="relative flex items-center justify-center w-full h-40">
            <span className="letter n">N</span>
            <span className="letter e">E</span>
            <span className="letter f">F</span>
            <span className="letter i">I</span>
            <span className="letter x">X</span>

            <div className="nefix-line" />
          </div>

          <style jsx global>{`
            .letter {
              position: absolute;
              left: 50%;
              top: 50%;
              font-size: clamp(55px, 10vw, 105px);
              font-weight: 950;
              letter-spacing: -5px;
              opacity: 0;
              transform: translate(-50%, -50%) scale(.1);
              text-shadow: 0 0 30px currentColor;
              animation: letterGather 5s cubic-bezier(.16,1,.3,1) forwards;
            }

            .n {
              color: white;
              --offset: clamp(-116px, -18vw, -65px);
            }

            .e {
              color: white;
              --offset: clamp(-58px, -9vw, -32px);
              animation-delay: .15s;
            }

            .f {
              color: #ef2020;
              --offset: 0px;
              animation-delay: .3s;
            }

            .i {
              color: #ef2020;
              --offset: clamp(42px, 7vw, 50px);
              animation-delay: .45s;
            }

            .x {
              color: #ef2020;
              --offset: clamp(90px, 15vw, 105px);
              animation-delay: .6s;
            }

            @keyframes letterGather {
              0% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(.1);
                filter: blur(25px);
              }

              35% {
                opacity: 1;
                filter: blur(4px);
              }

              65% {
                transform: translate(calc(-50% + var(--offset)), -50%) scale(1.2);
                filter: blur(0);
              }

              100% {
                opacity: 1;
                transform: translate(calc(-50% + var(--offset)), -50%) scale(1);
                filter: blur(0);
              }
            }

            .nefix-line {
              position: absolute;
              top: calc(50% + 65px);
              left: 50%;
              width: 0;
              height: 3px;
              background: #ef2020;
              box-shadow: 0 0 15px #ef2020;
              transform: translateX(-50%);
              animation: lineAppear 2s ease 5s forwards;
            }

            @keyframes lineAppear {
              to {
                width: min(260px, 65vw);
              }
            }

            .nefix-screen {
              animation: screenFade 10s ease forwards;
            }

            @keyframes screenFade {
              0%, 88% {
                opacity: 1;
                visibility: visible;
              }

              100% {
                opacity: 0;
                visibility: hidden;
              }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
