"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const skillIcons = [
  {
    name: "HTML",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    color: "#E34F26",
  },
  {
    name: "CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    color: "#1572B6",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    color: "#F7DF1E",
  },
  {
    name: "PHP",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    color: "#777BB4",
  },
  {
    name: "Laravel",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
    color: "#FF2D20",
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "#61DAFB",
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    color: "#339933",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    color: "#3178C6",
  },
  {
    name: "TailwindCSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    color: "#06B6D4",
  },
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    color: "#47A248",
  },
  {
    name: "MySQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    color: "#4169E1",
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    color: "#336791",
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    color: "#F05032",
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    color: "#000000",
  },
  {
    name: "React Native",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "#61DAFB",
  },
  {
    name: "Vb.net",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/visualbasic/visualbasic-original.svg",
    color: "#61DAFB",
  },
];

export const SkillsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useGSAP(() => {
    gsap.fromTo(
      ".skills-title",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      ".skill-item-1",
      { opacity: 0, scale: 0.5, rotation: -15 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ".skills-container",
          start: "top 75%",
        },
      }
    );
    gsap.fromTo(
      ".skill-item-2",
      { opacity: 0, scale: 0.5, rotation: 15 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.6,
        stagger: -0.05,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ".skills-container",
          start: "top 75%",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      <section className="w-full py-16 md:py-24 overflow-hidden relative bg-white" id="skills">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundSize: "20px 20px", backgroundImage: "linear-gradient(to right, #e4e4e7 1px, transparent 1px), linear-gradient(to bottom, #e4e4e7 1px, transparent 1px)" }} />
        <div className="pointer-events-none absolute inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="skills-title text-2xl sm:text-3xl md:text-5xl font-heading mb-10 md:mb-16 text-center text-main tracking-tight">
            {t("skills.title")}
          </h2>

          {/* Skill Icons Scrolling Container */}
          <div className="skills-container relative overflow-hidden py-6 md:py-10 mb-6 md:mb-10 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-12 sm:before:w-24 before:bg-gradient-to-r before:from-bg dark:before:from-darkBg before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-12 sm:after:w-24 after:bg-gradient-to-l after:from-bg dark:after:from-darkBg after:to-transparent">
            {/* First row - moving left */}
            <div className="flex space-x-6 md:space-x-12 mb-8 md:mb-12 animate-scroll-left w-max">
              {[...skillIcons, ...skillIcons].map((skill, index) => (
                <div
                  key={`skill-1-${index}`}
                  className="skill-item-1 flex flex-col items-center shrink-0 group"
                >
                  <div
                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center rounded-base mb-3 border-2 border-border dark:border-darkBorder bg-white dark:bg-secondaryBlack shadow-light dark:shadow-dark group-hover:-translate-y-2 group-hover:translate-x-boxShadowX group-hover:shadow-none transition-all duration-300 p-4 md:p-5"
                  >
                    <img
                      alt={skill.name}
                      className="w-full h-full object-contain"
                      src={skill.icon}
                    />
                  </div>
                  <span className="text-sm sm:text-base font-heading text-text/60 dark:text-darkText/60 group-hover:text-text dark:group-hover:text-darkText transition-colors">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Second row - moving right */}
            <div className="flex space-x-6 md:space-x-12 animate-scroll-right w-max">
              {[...skillIcons].reverse().concat([...skillIcons].reverse()).map((skill, index) => (
                <div
                  key={`skill-2-${index}`}
                  className="skill-item-2 flex flex-col items-center shrink-0 group"
                >
                  <div
                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center rounded-base mb-3 border-2 border-border dark:border-darkBorder bg-white dark:bg-secondaryBlack shadow-light dark:shadow-dark group-hover:-translate-y-2 group-hover:translate-x-boxShadowX group-hover:shadow-none transition-all duration-300 p-4 md:p-5"
                  >
                    <img
                      alt={skill.name}
                      className="w-full h-full object-contain"
                      src={skill.icon}
                    />
                  </div>
                  <span className="text-sm sm:text-base font-heading text-text/60 dark:text-darkText/60 group-hover:text-text dark:group-hover:text-darkText transition-colors">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SkillsSection;
