"use client";

import React, { useRef } from "react";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const projectData = [
  {
    year: "2026",
    items: [
      "CMS Company Profile PT Tazar Sejahtera Mandiri",
      "Network Managent System Dealer PT Menara Agung",
      "Learning Management System PT Menara Agung",
      "Enterprise Resource Planning PT Menara Agung",
    ],
  },
  {
    year: "2024",
    items: [
      "Financial Information System for Fasibillilah Mosque, Padang",
      "Inventory Management Information System at Buddy Petshop",
      "Reservation Information System for The Z Barbershop, Padang",
      "Membership and Product Sales Information System at CafGym",
      "Asset and Inventory Management Information System",
      "Web-Based Stock Management Information System for Yessi Pharmacy",
      "Web-Based Car Workshop Information System for Hangkito Motor",
      "Photo Studio Booking Information System Integrated with Midtrans Payment Gateway",
      "Mobile Phone Repair Information System at Rendy Cell Integrated with WhatsApp Gateway",
      "Car Rental Information System at Salido RentCar",
    ],
  },
  {
    year: "2021",
    items: [
      "Point of Sales (POS) System for Bintang Pharmacy, Padang Pariaman",
    ],
  },
];

const ProjectSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useGSAP(() => {
    // Header animation
    gsap.fromTo(
      ".project-header",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );

    // Timeline line animation
    gsap.fromTo(
      ".timeline-line",
      { height: 0 },
      {
        height: "100%",
        duration: 2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 60%",
          end: "bottom 80%",
          scrub: 1,
        },
      }
    );

    // Timeline items staggered animation
    const items = gsap.utils.toArray(".timeline-item");
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
      <section className="w-full py-16 md:py-24 overflow-hidden" id="projects">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="project-header">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-4 md:mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#FF1CF7] to-[#b249f8] tracking-tight">
              {t("project.title")}
            </h2>
            <p className="text-center text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-16 md:mb-24">
              {t("project.subtitle")}
            </p>
          </div>

          <div className="relative timeline-container">
            <div className="flex items-center gap-3 mb-8 md:mb-12 justify-center project-header">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#FF1CF7]/20 to-[#b249f8]/20 border border-[#b249f8]/30 shadow-[0_0_20px_rgba(178,73,248,0.2)]">
                <Briefcase className="w-6 h-6 text-[#FF1CF7]" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white">{t("project.heading")}</h3>
            </div>

            <div className="relative ml-4 md:ml-6 space-y-10 md:space-y-14">
              {/* Animated line */}
              <div className="timeline-line absolute left-0 top-0 w-px bg-gradient-to-b from-[#FF1CF7] via-[#b249f8] to-transparent origin-top" />
              {/* Background line */}
              <div className="absolute left-0 top-0 w-px h-full bg-gray-700/60 -z-10" />

              {projectData.map((data, idx) => (
                <div key={idx} className="relative pl-8 md:pl-10 group timeline-item">
                  <div className="absolute -left-[17px] top-1 h-8 w-8 rounded-full bg-[#0d1117] border-2 border-[#b249f8] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-[0_0_15px_rgba(178,73,248,0.5)] z-10">
                    <Calendar className="w-4 h-4 text-[#FF1CF7]" />
                  </div>
                  <div className="flex flex-col mb-4">
                    <span className="text-sm font-bold tracking-widest text-[#FF1CF7] uppercase mb-1 inline-block">
                      {data.year}
                    </span>
                  </div>
                  <div className="bg-[#161b22] p-5 md:p-7 rounded-2xl border border-gray-700/50 shadow-xl transition-all duration-300 hover:border-[#b249f8]/50 hover:shadow-[0_8px_30px_rgba(178,73,248,0.15)] hover:bg-[#1c2128]">
                    <ul className="space-y-3">
                      {data.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#58a6ff] shrink-0 mt-0.5" />
                          <span className="text-gray-300 leading-relaxed text-sm md:text-base">{item}</span>
                        </li>
                      ))}
                    </ul>
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

export default ProjectSection;
