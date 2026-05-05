"use client";

import React, { useRef } from "react";
import { Award } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const certificationData = [
  {
    title: "CCNAv7: Switching, Routing, and Wireless Essentials",
    issuer: "Cisco Networking Academy",
    date: "Sep 2023",
  },
  {
    title: "Database Programming with SQL",
    issuer: "Oracle",
    date: "Okt 2022",
  },
  {
    title: "CCNAv7: Introduction to Networks",
    issuer: "Cisco Networking Academy",
    date: "Feb 2022",
  },
  {
    title: "Java Programming",
    issuer: "Oracle Academy",
    date: "Des 2021",
  },
  {
    title: "Java Fundamentals",
    issuer: "Oracle Academy",
    date: "Apr 2021",
  },
];

const CertificationSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useGSAP(() => {
    // Header animation
    gsap.fromTo(
      ".cert-header",
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
      ".cert-timeline-line",
      { height: 0 },
      {
        height: "100%",
        duration: 2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".cert-timeline-container",
          start: "top 60%",
          end: "bottom 80%",
          scrub: 1,
        },
      }
    );

    // Timeline items staggered animation
    const items = gsap.utils.toArray(".cert-timeline-item");
    items.forEach((item: any, i) => {
      gsap.fromTo(
        item,
        { x: 50, opacity: 0, scale: 0.95 },
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
      <section className="w-full py-16 md:py-24 bg-[#0d1117] overflow-hidden" id="certifications">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="cert-header">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-4 md:mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#58a6ff] to-[#3b82f6] tracking-tight">
              {t("cert.title")}
            </h2>
            <p className="text-center text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-16 md:mb-24">
              {t("cert.subtitle")}
            </p>
          </div>

          <div className="relative cert-timeline-container">
            <div className="flex items-center gap-3 mb-8 md:mb-12 justify-center cert-header">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#58a6ff]/20 to-[#3b82f6]/20 border border-[#58a6ff]/30 shadow-[0_0_20px_rgba(88,166,255,0.2)]">
                <Award className="w-6 h-6 text-[#58a6ff]" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white">{t("cert.heading")}</h3>
            </div>

            <div className="relative ml-4 md:ml-6 space-y-8 md:space-y-10">
              {/* Animated line */}
              <div className="cert-timeline-line absolute left-0 top-0 w-px bg-gradient-to-b from-[#58a6ff] via-[#3b82f6] to-transparent origin-top" />
              {/* Background line */}
              <div className="absolute left-0 top-0 w-px h-full bg-gray-700/60 -z-10" />

              {certificationData.map((cert, idx) => (
                <div key={idx} className="relative pl-8 md:pl-10 group cert-timeline-item">
                  <div className="absolute -left-[17px] top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-[#0d1117] border-2 border-[#58a6ff] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-[0_0_15px_rgba(88,166,255,0.5)] z-10">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#58a6ff]" />
                  </div>
                  <div className="bg-[#161b22] p-5 md:p-6 rounded-2xl border border-gray-700/50 shadow-xl transition-all duration-300 hover:border-[#58a6ff]/50 hover:shadow-[0_8px_30px_rgba(88,166,255,0.15)] hover:bg-[#1c2128] group-hover:-translate-y-1">
                    <h4 className="text-lg md:text-xl font-bold text-gray-100 mb-2 leading-tight">
                      {cert.title}
                    </h4>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-3">
                      <span className="text-[#8b949e] font-medium text-sm md:text-base">
                        {cert.issuer}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#58a6ff]/10 text-[#58a6ff] border border-[#58a6ff]/20">
                        {t("cert.issued")}: {cert.date}
                      </span>
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

export default CertificationSection;
