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
    // Header animation
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

    // Timeline line animation
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

    // Timeline items staggered animation
    const items = gsap.utils.toArray(".exp-timeline-item");
    items.forEach((item: any, i) => {
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
      <section className="w-full py-16 md:py-24 overflow-hidden" id="experience">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="exp-header">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-4 md:mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#fb8500] to-[#ffb703] tracking-tight">
              {t("exp.title")}
            </h2>
            <p className="text-center text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-16 md:mb-24">
              {t("exp.subtitle")}
            </p>
          </div>

          <div className="relative exp-timeline-container">
            <div className="flex items-center gap-3 mb-8 md:mb-12 justify-center exp-header">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#fb8500]/20 to-[#ffb703]/20 border border-[#fb8500]/30 shadow-[0_0_20px_rgba(251,133,0,0.2)]">
                <Briefcase className="w-6 h-6 text-[#fb8500]" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white">{t("exp.heading")}</h3>
            </div>

            <div className="relative ml-4 md:ml-6 space-y-8 md:space-y-10">
              {/* Animated line */}
              <div className="exp-timeline-line absolute left-0 top-0 w-px bg-gradient-to-b from-[#fb8500] via-[#ffb703] to-transparent origin-top" />
              {/* Background line */}
              <div className="absolute left-0 top-0 w-px h-full bg-gray-700/60 -z-10" />

              {experienceData.map((exp, idx) => (
                <div key={idx} className="relative pl-8 md:pl-10 group exp-timeline-item">
                  <div className="absolute -left-[17px] top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-[#0d1117] border-2 border-[#fb8500] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-[0_0_15px_rgba(251,133,0,0.5)] z-10">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#fb8500]" />
                  </div>
                  <div className="bg-[#161b22] p-5 md:p-6 rounded-2xl border border-gray-700/50 shadow-xl transition-all duration-300 hover:border-[#fb8500]/50 hover:shadow-[0_8px_30px_rgba(251,133,0,0.15)] hover:bg-[#1c2128] group-hover:-translate-y-1">
                    <h4 className="text-lg md:text-xl font-bold text-gray-100 mb-2 leading-tight">
                      {exp.role}
                    </h4>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-3">
                      <span className="text-[#8b949e] font-medium text-sm md:text-base">
                        {exp.company}
                      </span>
                      {exp.date && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#fb8500]/10 text-[#fb8500] border border-[#fb8500]/20">
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
