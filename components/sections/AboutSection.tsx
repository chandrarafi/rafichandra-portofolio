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

  const renderAboutDescription = () => {
    const desc = t("about.description");
    const university = t("about.university");

    const parts = desc.split(/(\{university\}|\{oracle\}|\{cisco\})/);
    return parts.map((part, idx) => {
      if (part === "{university}") {
        return <span key={idx} className="font-heading text-text">{university}</span>;
      }
      if (part === "{oracle}") {
        return <span key={idx} className="text-[#2b55ff] font-heading">Oracle</span>;
      }
      if (part === "{cisco}") {
        return <span key={idx} className="text-[#2b55ff] font-heading">Cisco</span>;
      }
      return <React.Fragment key={idx}>{part}</React.Fragment>;
    });
  };

  return (
    <div ref={containerRef}>
      <section className="w-full py-16 md:py-24 relative bg-white" id="about">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundSize: "20px 20px", backgroundImage: "linear-gradient(to right, #e4e4e7 1px, transparent 1px), linear-gradient(to bottom, #e4e4e7 1px, transparent 1px)" }} />
        <div className="pointer-events-none absolute inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="grid grid-cols-1 gap-10 items-center perspective-1000">
            <div className="about-card rounded-base border-2 border-border dark:border-darkBorder bg-white dark:bg-secondaryBlack shadow-light dark:shadow-dark p-6 sm:p-8 md:p-12 transition-all duration-500 hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading mb-4 sm:mb-6 md:mb-8 text-main text-center tracking-tight">
                {t("about.title")}
              </h3>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-text/70 dark:text-darkText/70 leading-loose sm:leading-relaxed text-left sm:text-center font-base">
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
