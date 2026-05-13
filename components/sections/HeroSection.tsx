"use client";

import React, { useRef, useEffect, useState } from "react";
import { Download, Github, Linkedin } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import foto from "@/public/image/me.png";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const greetings = ["Halo!", "Hello!", "Bonjour!", "Hola!", "Namaste!"];

// Skill icons for marquee
const skillIcons = [
  { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
  { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "TailwindCSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
];

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLanguage();
  const [currentGreeting, setCurrentGreeting] = useState("");
  const greetingIndex = useRef(0);
  const charIndex = useRef(0);
  const isDeleting = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const cvFile =
    lang === "en"
      ? "/file/CV.Rafi Chandra 2026 - English.pdf"
      : "/file/CV.Rafi Chandra 2026.pdf";

  // Typewriter effect
  useEffect(() => {
    const typeWriter = () => {
      const current = greetings[greetingIndex.current];

      if (!isDeleting.current) {
        charIndex.current++;
        setCurrentGreeting(current.substring(0, charIndex.current));

        if (charIndex.current === current.length) {
          timeoutRef.current = setTimeout(() => {
            isDeleting.current = true;
            typeWriter();
          }, 2000);
          return;
        }
        timeoutRef.current = setTimeout(typeWriter, 100);
      } else {
        charIndex.current--;
        setCurrentGreeting(current.substring(0, charIndex.current));

        if (charIndex.current === 0) {
          isDeleting.current = false;
          greetingIndex.current =
            (greetingIndex.current + 1) % greetings.length;
          timeoutRef.current = setTimeout(typeWriter, 500);
          return;
        }
        timeoutRef.current = setTimeout(typeWriter, 50);
      }
    };

    timeoutRef.current = setTimeout(typeWriter, 1000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // GSAP animations
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-greeting",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 }
      )
        .fromTo(
          ".hero-name",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.2"
        )
        .fromTo(
          ".hero-desc",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.2"
        )
        .fromTo(
          ".hero-socials",
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" },
          "-=0.2"
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" },
          "-=0.1"
        )
        .fromTo(
          ".hero-image",
          { opacity: 0, scale: 0.7 },
          { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
          "-=0.6"
        )
        .fromTo(
          ".hero-element",
          { opacity: 0, scale: 0, rotation: -20 },
          { opacity: 1, scale: 1, rotation: 0, duration: 0.5, stagger: 0.15, ease: "back.out(2.5)" },
          "-=0.3"
        )
        .fromTo(
          ".hero-marquee",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.3"
        );

      // Floating animation for elements (standby)
      gsap.utils.toArray(".hero-element").forEach((el: any, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -6 : 6,
          rotation: i % 2 === 0 ? 3 : -3,
          duration: 2 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2,
        });
      });

      // Cursor blink
      gsap.to(".typewriter-cursor", {
        opacity: 0,
        duration: 0.53,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative flex min-h-[600px] sm:min-h-[700px] h-screen w-full flex-col items-center justify-center bg-white overflow-hidden pt-[80px] sm:pt-[100px] md:pt-[110px] lg:pt-[120px] pb-[140px] sm:pb-[160px] md:pb-[180px]"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundSize: "20px 20px",
          backgroundImage:
            "linear-gradient(to right, #e4e4e7 1px, transparent 1px), linear-gradient(to bottom, #e4e4e7 1px, transparent 1px)",
        }}
      />
      {/* Radial fade */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      {/* Main content */}
      <div className="mx-auto max-w-full px-4 sm:px-6 md:px-10 lg:px-16 py-2 sm:py-4 md:py-8 lg:py-4 text-left flex flex-col lg:flex-row items-center justify-between relative z-10 flex-1">
        {/* Left - Text Content */}
        <div className="w-full lg:w-[55%] flex flex-col items-center lg:items-start lg:pl-8 order-2 lg:order-1">
          {/* Typewriter greeting */}
          <div className="hero-greeting">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2b55ff]">
              {currentGreeting}
              <span className="typewriter-cursor inline-block w-[2px] h-[0.85em] bg-[#2b55ff] ml-0.5 align-middle" />
            </span>
          </div>

          {/* Name */}
          <h1 className="hero-name text-xl sm:text-2xl font-heading md:text-3xl lg:text-5xl mt-2 sm:mt-3 md:mt-5 text-center lg:text-left">
            {t("hero.greeting")}Rafi Chandra.
          </h1>

          {/* Description */}
          <p className="hero-desc my-3 sm:my-5 md:my-6 lg:my-8 text-sm sm:text-base md:text-lg lg:text-xl font-normal leading-relaxed lg:leading-relaxed text-center lg:text-left max-w-2xl lg:max-w-xl">
            {t("hero.description")}
          </p>

          {/* Social icons */}
          <div className="flex flex-col items-center lg:items-start mb-6 md:mb-8 w-full">
            <div className="hero-socials flex space-x-4 sm:space-x-6 mb-4 sm:mb-5 md:mb-6">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:scale-110 hover:rotate-[-10deg] transition-all duration-300"
              >
                <Github className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9" strokeWidth={1.5} />
              </a>
              <a
                href={siteConfig.links.linked}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:scale-110 hover:rotate-[10deg] transition-all duration-300"
              >
                <Linkedin className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9" strokeWidth={1.5} />
              </a>
            </div>

            {/* CTA Button */}
            <div className="hero-cta">
              <a href={cvFile} download>
                <Button
                  variant="default"
                  size="lg"
                  className="bg-main border-[2px] border-black text-black font-heading shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all h-10 text-base md:h-12 md:text-lg lg:h-14 lg:text-xl"
                >
                  Get in Touch!
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Right - Profile Image */}
        <div className="w-full lg:w-[45%] mt-2 lg:mt-0 flex justify-center lg:justify-end order-1 lg:order-2">
          <div className="hero-image relative max-w-[180px] sm:max-w-[200px] md:max-w-[240px] lg:max-w-[280px]">
            {/* Photo */}
            <div className="relative z-[2]">
              <Image
                alt={t("hero.profileAlt")}
                src={foto}
                width={380}
                height={380}
                priority
                className="w-full h-auto"
              />
              {/* Fade shadow at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            </div>

            {/* Code bracket - mid left */}
            <div className="hero-element absolute top-1/2 -left-3 sm:-left-5 z-[3] bg-yellow-300 border-2 border-black rounded-md px-2 py-1 shadow-[3px_3px_0px_0px_#000] rotate-[-8deg]">
              <span className="font-mono font-bold text-sm sm:text-base">&lt;/&gt;</span>
            </div>

            {/* Terminal - mid right */}
            <div className="hero-element absolute top-1/2 -right-3 sm:-right-5 z-[3] bg-black border-2 border-black rounded-md px-2 py-1 shadow-[3px_3px_0px_0px_#76fbd9] rotate-[6deg]">
              <span className="font-mono font-bold text-sm sm:text-base text-main">$_</span>
            </div>

            {/* Git branch - bottom left */}
            <div className="hero-element absolute bottom-8 -left-4 sm:bottom-12 sm:-left-6 z-[3] bg-white border-2 border-black rounded-md px-2 py-1 shadow-[3px_3px_0px_0px_#000] rotate-[5deg]">
              <span className="font-mono font-bold text-xs sm:text-sm">git ⎇</span>
            </div>

            {/* Developer tag - bottom right */}
            <div className="hero-element absolute bottom-8 -right-3 sm:bottom-12 sm:-right-5 z-[3] bg-main border-2 border-black rounded-md px-2 py-1 shadow-[3px_3px_0px_0px_#000] rotate-[-4deg]">
              <span className="font-mono font-bold text-xs sm:text-sm">{`{dev}`}</span>
            </div>

            {/* API badge - bottom center */}
            <div className="hero-element absolute -bottom-2 left-1/2 -translate-x-1/2 z-[3] bg-white border-2 border-black rounded-md px-2 py-1 shadow-[3px_3px_0px_0px_#000]">
              <span className="font-mono font-bold text-xs sm:text-sm">API</span>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Skills - Bottom - X cross */}
      <div className="hero-marquee absolute bottom-0 left-0 w-full z-20 h-[110px] sm:h-[130px] md:h-[150px] overflow-hidden">
        {/* Row 1 - tilted \ direction, scroll left */}
        <div className="absolute top-[5px] sm:top-[8px] left-0 w-[105%] -ml-[2.5%] border-y-[2px] border-black bg-white py-1.5 sm:py-2 -rotate-[2deg] origin-center">
          <div className="flex animate-scroll-left-slow w-max">
            {[...skillIcons, ...skillIcons, ...skillIcons].map((skill, index) => (
              <div className="flex items-center mx-4 sm:mx-6 lg:mx-8" key={`row1-${index}`}>
                <img src={skill.icon} alt={skill.name} className="w-5 h-5 sm:w-7 sm:h-7 lg:w-8 lg:h-8 mr-2" />
                <span className="text-base sm:text-lg lg:text-xl font-heading whitespace-nowrap">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Row 2 - tilted / direction, scroll right */}
        <div className="absolute bottom-[5px] sm:bottom-[8px] left-0 w-[105%] -ml-[2.5%] border-y-[2px] border-black bg-white py-1.5 sm:py-2 rotate-[2deg] origin-center">
          <div className="flex animate-scroll-right-slow w-max">
            {[...skillIcons].reverse().concat([...skillIcons].reverse(), [...skillIcons].reverse()).map((skill, index) => (
              <div className="flex items-center mx-4 sm:mx-6 lg:mx-8" key={`row2-${index}`}>
                <img src={skill.icon} alt={skill.name} className="w-5 h-5 sm:w-7 sm:h-7 lg:w-8 lg:h-8 mr-2" />
                <span className="text-base sm:text-lg lg:text-xl font-heading whitespace-nowrap">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
