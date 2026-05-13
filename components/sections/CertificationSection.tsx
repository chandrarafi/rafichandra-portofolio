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

    const items = gsap.utils.toArray(".cert-timeline-item");
    items.forEach((item: any) => {
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
      <section className="w-full py-16 md:py-24 overflow-hidden relative bg-white" id="certifications">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundSize: "20px 20px", backgroundImage: "linear-gradient(to right, #e4e4e7 1px, transparent 1px), linear-gradient(to bottom, #e4e4e7 1px, transparent 1px)" }} />
        <div className="pointer-events-none absolute inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="cert-header">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading mb-4 md:mb-6 text-center text-mainAccent tracking-tight">
              {t("cert.title")}
            </h2>
            <p className="text-center text-base sm:text-lg text-text/60 dark:text-darkText/60 max-w-2xl mx-auto mb-16 md:mb-24">
              {t("cert.subtitle")}
            </p>
          </div>

          <div className="relative cert-timeline-container">
            <div className="flex items-center gap-3 mb-8 md:mb-12 justify-center cert-header">
              <div className="p-3 rounded-base border-2 border-border dark:border-darkBorder bg-mainAccent/20">
                <Award className="w-6 h-6 text-mainAccent" />
              </div>
              <h3 className="text-2xl md:text-3xl font-heading text-text dark:text-darkText">{t("cert.heading")}</h3>
            </div>

            <div className="relative ml-4 md:ml-6 space-y-8 md:space-y-10">
              <div className="cert-timeline-line absolute left-0 top-0 w-[3px] bg-mainAccent origin-top" />
              <div className="absolute left-0 top-0 w-[3px] h-full bg-border/20 dark:bg-darkBorder/20 -z-10" />

              {certificationData.map((cert, idx) => (
                <div key={idx} className="relative pl-8 md:pl-10 group cert-timeline-item">
                  <div className="absolute -left-[15px] top-1/2 -translate-y-1/2 h-8 w-8 rounded-base bg-bg dark:bg-darkBg border-2 border-border dark:border-darkBorder flex items-center justify-center transition-transform duration-300 group-hover:scale-110 z-10">
                    <div className="h-3 w-3 rounded-full bg-mainAccent" />
                  </div>
                  <div className="rounded-base border-2 border-border dark:border-darkBorder bg-white dark:bg-secondaryBlack shadow-light dark:shadow-dark p-5 md:p-6 transition-all duration-300 hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none">
                    <h4 className="text-lg md:text-xl font-heading text-text dark:text-darkText mb-2 leading-tight">
                      {cert.title}
                    </h4>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-3">
                      <span className="text-text/60 dark:text-darkText/60 font-base text-sm md:text-base">
                        {cert.issuer}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-base text-xs font-heading bg-mainAccent/10 text-mainAccent border-2 border-border dark:border-darkBorder">
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
