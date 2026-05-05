"use client";

import React, { useRef } from "react";
import { Card, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { Download } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import foto from "@/public/image/me.jpg";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const HeroSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { t, lang } = useLanguage();

    const cvFile = lang === "en"
        ? "/file/CV.Rafi Chandra 2026 - English.pdf"
        : "/file/CV.Rafi Chandra 2026.pdf";

    useGSAP(() => {
        // Image card animation
        gsap.fromTo(
            ".hero-image-card",
            { opacity: 0, scale: 0.8, y: 50 },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 1.2,
                ease: "back.out(1.5)",
            }
        );

        // Text elements staggered animation
        gsap.fromTo(
            ".hero-text-element",
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                delay: 0.3,
            }
        );
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center gap-8 py-8 md:py-10 overflow-hidden">
            {/* Card Foto */}
            <div className="hero-image-card">
                <Card
                    isFooterBlurred
                    className="border-none w-[250px] md:w-[300px] hover:shadow-[0_0_30px_rgba(178,73,248,0.4)] transition-shadow duration-500"
                    radius="lg"
                >
                    <Image
                        alt={t("hero.profileAlt")}
                        className="object-cover w-full"
                        height={300}
                        src={foto.src}
                        width={300}
                    />
                    <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                        <p className="text-tiny text-white/80">{t("hero.downloadCv")}</p>
                        <a href={cvFile} download>
                            <Button
                                className="text-tiny text-white bg-black/20 hover:bg-[#b249f8]/80 transition-all duration-300 ease-in-out group overflow-hidden"
                                color="default"
                                radius="lg"
                                size="sm"
                                variant="flat"
                            >
                                <span className="group-hover:-translate-y-10 transition-transform duration-300 inline-block">
                                    <Download size={16} />
                                </span>
                                <span className="absolute translate-y-10 group-hover:translate-y-0 transition-transform duration-300 inline-flex items-center justify-center">
                                    <Download className="animate-bounce" size={16} />
                                </span>
                            </Button>
                        </a>
                    </CardFooter>
                </Card>
            </div>

            {/* Heading utama */}
            <div className="inline-block max-w-xl text-center justify-center px-4 mt-4">
                <span className="hero-text-element tracking-tight inline font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
                    {t("hero.greeting")}
                </span>
                <span className="hero-text-element tracking-tight inline font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight bg-clip-text text-transparent bg-gradient-to-b from-[#FF1CF7] to-[#b249f8]">
                    Rafi Chandra.
                </span>

                <div className="hero-text-element w-full my-6 text-base sm:text-lg lg:text-xl text-gray-400 block max-w-full leading-relaxed font-light">
                    {t("hero.description")}
                </div>
            </div>

            {/* Running Text/Marquee */}
            <div className="hero-text-element w-full mt-6 md:mt-10 overflow-hidden py-2 relative">
                <div className="inline-flex animate-marquee whitespace-nowrap">
                    <div className="flex items-center">
                        <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mx-4 font-bold text-gray-300 hover:text-white transition-colors">
                            {t("hero.role1")}
                        </span>
                        <span className="text-xl mx-4 text-[#FF1CF7]">•</span>
                        <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mx-4 bg-clip-text text-transparent bg-gradient-to-b from-[#FF1CF7] to-[#b249f8] font-bold">
                            {t("hero.role2")}
                        </span>
                        <span className="text-xl mx-4 text-[#FF1CF7]">•</span>
                        <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mx-4 font-bold text-gray-300 hover:text-white transition-colors">
                            {t("hero.role3")}
                        </span>
                        <span className="text-xl mx-4 text-[#58a6ff]">•</span>
                        <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mx-4 bg-clip-text text-transparent bg-gradient-to-b from-[#58a6ff] to-[#3b82f6] font-bold">
                            {t("hero.role4")}
                        </span>
                        <span className="text-xl mx-4 text-[#58a6ff]">•</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
