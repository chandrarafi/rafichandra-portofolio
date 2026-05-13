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

    const items = gsap.utils.toArray(".timeline-item");
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
      <section className="w-full py-16 md:py-24 overflow-hidden relative bg-white" id="projects">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundSize: "20px 20px", backgroundImage: "linear-gradient(to right, #e4e4e7 1px, transparent 1px), linear-gradient(to bottom, #e4e4e7 1px, transparent 1px)" }} />
        <div className="pointer-events-none absolute inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="project-header">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading mb-4 md:mb-6 text-center text-black tracking-tight bg-yellow-300 border-[3px] border-black shadow-[8px_8px_0px_0px_#000000] px-6 py-4 sm:py-5 md:py-6 mx-auto w-fit">
              {t("project.title")}
            </h2>
            <p className="text-center text-base sm:text-lg text-text/60 dark:text-darkText/60 max-w-2xl mx-auto mb-16 md:mb-24">
              {t("project.subtitle")}
            </p>
          </div>

          <div className="relative timeline-container">
            

            <div className="relative ml-4 md:ml-6 space-y-10 md:space-y-14">
              <div className="timeline-line absolute left-0 top-0 w-[3px] bg-yellow-300 origin-top" />
              <div className="absolute left-0 top-0 w-[3px] h-full bg-border/20 dark:bg-darkBorder/20 -z-10" />

              {projectData.map((data, idx) => (
                <div key={idx} className="relative pl-8 md:pl-10 group timeline-item">
                  <div className="absolute -left-[15px] top-1 h-8 w-8 rounded-base bg-bg dark:bg-darkBg border-2 border-border dark:border-darkBorder flex items-center justify-center transition-transform duration-300 group-hover:scale-110 z-10">
                    <Calendar className="w-4 h-4 text-yellow-500" />
                  </div>
                  <div className="flex flex-col mb-4">
                    <span className="text-sm font-heading tracking-widest text-yellow-600 uppercase mb-1 inline-block">
                      {data.year}
                    </span>
                  </div>
                  <div className="rounded-base border-2 sm:border-[3px] border-black bg-white shadow-[4px_4px_0px_0px_#000000] md:shadow-[12px_12px_0px_0px_#000000] p-5 md:p-7 transition-all duration-300 hover:translate-x-[4px] hover:translate-y-[4px] md:hover:translate-x-[12px] md:hover:translate-y-[12px] hover:shadow-none">
                    <ul className="space-y-3">
                      {data.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                          <span className="text-text/80 dark:text-darkText/80 leading-relaxed text-sm md:text-base">{item}</span>
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
