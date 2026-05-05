"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useGSAP(() => {
    gsap.fromTo(
      ".about-card",
      { opacity: 0, y: 50, scale: 0.95, rotationX: -10 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-card",
          start: "top 85%",
        },
      }
    );
  }, { scope: containerRef });

  // Build the about description with highlighted spans
  const renderAboutDescription = () => {
    const desc = t("about.description");
    const university = t("about.university");
    
    // Replace placeholders with JSX
    const parts = desc.split(/(\{university\}|\{oracle\}|\{cisco\})/);
    return parts.map((part, idx) => {
      if (part === "{university}") {
        return <span key={idx} className="font-semibold text-white">{university}</span>;
      }
      if (part === "{oracle}") {
        return <span key={idx} className="text-[#58a6ff] font-semibold">Oracle</span>;
      }
      if (part === "{cisco}") {
        return <span key={idx} className="text-[#58a6ff] font-semibold">Cisco</span>;
      }
      return <React.Fragment key={idx}>{part}</React.Fragment>;
    });
  };

  return (
    <div ref={containerRef}>
      <section className="w-full py-16 md:py-24" id="about">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 gap-10 items-center perspective-1000">
            <div className="about-card bg-[#161b22] p-6 sm:p-8 md:p-12 rounded-3xl border border-gray-700/50 shadow-2xl hover:border-[#FF1CF7]/30 hover:shadow-[0_10px_40px_rgba(178,73,248,0.15)] transition-all duration-500">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#FF1CF7] to-[#b249f8] text-center tracking-tight">
                {t("about.title")}
              </h3>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-loose sm:leading-relaxed text-left sm:text-center font-light">
                {renderAboutDescription()}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutSection;
