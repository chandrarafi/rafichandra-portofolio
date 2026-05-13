"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const starsContainerRef = useRef<HTMLDivElement>(null);
  const nameContainerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [phase, setPhase] = useState<"loading" | "ready">("loading");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // ── Phase 1: Stars stagger in ──
      const stars = starsContainerRef.current?.querySelectorAll(".loader-star");
      if (stars) {
        tl.fromTo(
          stars,
          { scale: 0, opacity: 0, rotation: -180 },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.6,
            stagger: 0.18,
            ease: "back.out(2)",
          },
          0.4
        );

        // Stars pulsing loop
        tl.to(stars, {
          scale: 1.2,
          duration: 0.4,
          stagger: 0.1,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut",
        });

        // Stars fade out
        tl.to(stars, {
          scale: 0,
          opacity: 0,
          rotation: 180,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.in",
        });
      }

      // ── Phase 2: Name reveal ──
      tl.add(() => setPhase("ready"), "-=0.1");

      // Subtitle fade in
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20, letterSpacing: "0.1em" },
        {
          opacity: 1,
          y: 0,
          letterSpacing: "0.35em",
          duration: 0.7,
          ease: "power2.out",
        },
        "nameReveal"
      );

      // Name characters stagger reveal
      const chars = nameContainerRef.current?.querySelectorAll(".name-char");
      if (chars) {
        tl.fromTo(
          chars,
          { y: 100, opacity: 0, rotateX: -90 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.04,
            ease: "back.out(1.7)",
          },
          "nameReveal"
        );
      }

      // Button pop in
      tl.fromTo(
        btnRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(2.5)",
        },
        "-=0.3"
      );
    }, containerRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, []);

  const handleStart = () => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsComplete(true);
          document.body.style.overflow = "";
        },
      });

      // Name chars exit
      const chars = nameContainerRef.current?.querySelectorAll(".name-char");
      if (chars) {
        tl.to(chars, {
          y: -80,
          opacity: 0,
          rotateX: 90,
          duration: 0.4,
          stagger: 0.02,
          ease: "power3.in",
        });
      }

      // Subtitle + button exit
      tl.to(
        [subtitleRef.current, btnRef.current],
        { opacity: 0, y: -30, duration: 0.3, ease: "power2.in" },
        "-=0.2"
      );

      // Circle clip-path shrink to reveal page
      tl.to(
        overlayRef.current,
        {
          clipPath: "circle(0% at 50% 50%)",
          duration: 1.2,
          ease: "expo.inOut",
        },
        "-=0.1"
      );

      tl.set(containerRef.current, { display: "none" });
    }, containerRef);
  };

  if (isComplete) return null;

  const firstName = "RAFI";
  const lastName = "CHANDRA";

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999]"
    >
      {/* Nunito (rounded geometric) + Poppins */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
      `}</style>

      {/* Red overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 w-full h-full flex items-center justify-center"
        style={{
          background: "#B91C1C",
          clipPath: "circle(150% at 50% 50%)",
        }}
      >
        {/* ── Stars Phase ── */}
        <div
          ref={starsContainerRef}
          className="absolute inset-0 flex items-center justify-center gap-6 md:gap-10 pointer-events-none"
          style={{ display: phase === "loading" ? "flex" : "none" }}
        >
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="loader-star"
              width={i === 2 ? "48" : "32"}
              height={i === 2 ? "48" : "32"}
              viewBox="0 0 24 24"
              fill="none"
              style={{ opacity: 0 }}
            >
              <path
                d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z"
                fill="white"
              />
            </svg>
          ))}
        </div>

        {/* ── Name + Button Phase ── */}
        <div
          className="flex flex-col items-center justify-center gap-8"
          style={{ display: phase === "ready" ? "flex" : "none" }}
        >
          {/* Name */}
          <div
            ref={nameContainerRef}
            className="flex flex-col items-center gap-0"
            style={{ perspective: "1200px" }}
          >
            {/* First name row */}
            <div className="flex overflow-hidden">
              {firstName.split("").map((char, i) => (
                <span
                  key={`f-${i}`}
                  className="name-char inline-block text-white select-none"
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(3rem, 10vw, 8rem)",
                    lineHeight: 1,
                    letterSpacing: "0.08em",
                    transformOrigin: "bottom center",
                    WebkitTextStroke: "2px #000",
                    paintOrder: "stroke fill",
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
            {/* Last name row */}
            <div className="flex overflow-hidden">
              {lastName.split("").map((char, i) => (
                <span
                  key={`l-${i}`}
                  className="name-char inline-block text-white select-none"
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(3rem, 10vw, 8rem)",
                    lineHeight: 1,
                    letterSpacing: "0.08em",
                    transformOrigin: "bottom center",
                    WebkitTextStroke: "2px #000",
                    paintOrder: "stroke fill",
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>

          {/* Subtitle */}
          <div
            ref={subtitleRef}
            className="text-white/70 text-xs md:text-sm uppercase tracking-[0.35em] select-none"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500,
              opacity: 0,
            }}
          >
            ✦ &nbsp; Fullstack Developer &nbsp; ✦
          </div>

          {/* Start Button */}
          <button
            ref={btnRef}
            onClick={handleStart}
            className="group relative mt-4 px-12 py-4 rounded-full border-2 border-white text-white text-base md:text-lg uppercase tracking-[0.2em] cursor-pointer transition-all duration-300 hover:bg-white hover:text-[#B91C1C] hover:scale-105 active:scale-95 pointer-events-auto"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              opacity: 0,
              background: "transparent",
            }}
          >
            <span className="relative z-10 flex items-center gap-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:rotate-90">
                <path
                  d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z"
                  fill="currentColor"
                />
              </svg>
              START
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:rotate-90">
                <path
                  d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </button>
        </div>

        {/* Bottom text */}
        <div
          className="absolute bottom-8 left-0 right-0 text-center text-white/40 text-xs tracking-[0.2em] uppercase select-none"
          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }}
        >
          Portfolio &copy; 2026
        </div>
      </div>
    </div>
  );
}
