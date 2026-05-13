"use client";

import React, { useRef } from "react";
import { Briefcase } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const experienceData = [
  {
    role: "Web Developer",
    company: "CV. Mediatama Web Indonesia",
    date: "27/12/2024 – 19/05/2025",
  },
  {
    role: "IT Programming",
    company: "PT. Menara Agung",
    date: "",
  },
];

const ExperienceSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useGSAP(() => {
    gsap.fromTo(
      ".exp-header",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      }
    );

    gsap.fromTo(
      ".exp-timeline-line",
      { height: 0 },
      {
        height: "100%",
        duration: 2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".exp-timeline-container",
          start: "top 60%",
          end: "bottom 80%",
          scrub: 1,
        },
      }
    );

    const items = gsap.utils.toArray(".exp-timeline-item");
    items.forEach((item: any) => {
      gsap.fromTo(
        item,
        { x: -50, opacity: 0, scale: 0.95 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      <section className="w-full py-16 md:py-24 overflow-hidden relative bg-white" id="experience">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundSize: "20px 20px", backgroundImage: "linear-gradient(to right, #e4e4e7 1px, transparent 1px), linear-gradient(to bottom, #e4e4e7 1px, transparent 1px)" }} />
        <div className="pointer-events-none absolute inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="exp-header">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading mb-4 md:mb-6 text-center text-black tracking-tight bg-yellow-300 border-[3px] border-black shadow-[8px_8px_0px_0px_#000000] px-6 py-4 sm:py-5 md:py-6 mx-auto w-fit">
              {t("exp.title")}
            </h2>
            <p className="text-center text-base sm:text-lg text-text/60 dark:text-darkText/60 max-w-2xl mx-auto mb-16 md:mb-24">
              {t("exp.subtitle")}
            </p>
          </div>

          <div className="relative exp-timeline-container">
           

            <div className="relative ml-4 md:ml-6 space-y-8 md:space-y-10">
              <div className="exp-timeline-line absolute left-0 top-0 w-[3px] bg-yellow-300 origin-top" />
              <div className="absolute left-0 top-0 w-[3px] h-full bg-border/20 dark:bg-darkBorder/20 -z-10" />

              {experienceData.map((exp, idx) => (
                <div key={idx} className="relative pl-8 md:pl-10 group exp-timeline-item">
                  <div className="absolute -left-[15px] top-1/2 -translate-y-1/2 h-8 w-8 rounded-base bg-bg dark:bg-darkBg border-2 border-border dark:border-darkBorder flex items-center justify-center transition-transform duration-300 group-hover:scale-110 z-10">
                    <div className="h-3 w-3 rounded-full bg-yellow-300" />
                  </div>
                  <div className="rounded-base border-2 sm:border-[3px] border-black bg-white shadow-[4px_4px_0px_0px_#000000] md:shadow-[12px_12px_0px_0px_#000000] p-5 md:p-6 transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px] md:hover:translate-x-[12px] md:hover:translate-y-[12px] hover:shadow-none">
                    <h4 className="text-lg md:text-xl font-heading text-text dark:text-darkText mb-2 leading-tight">
                      {exp.role}
                    </h4>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-3">
                      <span className="text-text/60 dark:text-darkText/60 font-base text-sm md:text-base">
                        {exp.company}
                      </span>
                      {exp.date && (
                        <span className="inline-flex items-center px-3 py-1 rounded-base text-xs font-heading bg-yellow-300/30 text-black border-2 border-black">
                          {exp.date}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExperienceSection;
