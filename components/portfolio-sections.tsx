import React from "react";
import NextLink from "next/link";

import { title as titleStyle } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
  titleText: string;
}

// Komponen Section dasar untuk semua bagian portofolio
export const PortfolioSection: React.FC<SectionProps> = ({
  id,
  className = "",
  children,
  titleText,
}) => {
  return (
    <section className={`py-20 w-full ${className}`} id={id}>
      <div className="container mx-auto px-4">
        <h2 className={cn(titleStyle({ size: "lg" }), "mb-12 text-center")}>
          {titleText}
        </h2>
        {children}
      </div>
    </section>
  );
};

// Bagian About
export const AboutSection = () => {
  return (
    <PortfolioSection id="about" titleText="Tentang Saya">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="rounded-base border-2 border-border dark:border-darkBorder bg-white dark:bg-secondaryBlack shadow-light dark:shadow-dark p-8">
          <h3 className={titleStyle({ size: "sm" })}>Rafi Chandra</h3>
          <p className="text-lg mt-4 text-text/70 dark:text-darkText/70">
            Saya adalah seorang pengembang web dengan pengalaman dalam membangun
            aplikasi modern dan responsif. Saya berkomitmen untuk membuat produk
            yang indah, fungsional, dan ramah pengguna.
          </p>
          <p className="mt-4 text-text/70 dark:text-darkText/70">
            Dengan latar belakang dalam desain dan pengembangan frontend, saya
            menggabungkan kreativitas dan keterampilan teknis untuk menciptakan
            solusi digital yang melampaui harapan.
          </p>
          <div className="flex gap-3 mt-6">
            <NextLink href="#contact">
              <Button variant="default">Hubungi Saya</Button>
            </NextLink>
            <NextLink href="#projects">
              <Button variant="neutral">Lihat Proyek</Button>
            </NextLink>
          </div>
        </div>

        <div className="relative h-[400px]">
          <div className="absolute inset-0 rounded-base bg-gradient-to-tr from-violet-600/30 to-blue-600/30 blur-xl animate-pulse-slow" />
          <div className="absolute inset-0 rounded-base overflow-hidden border-2 border-border dark:border-darkBorder">
            <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center" />
          </div>
        </div>
      </div>
    </PortfolioSection>
  );
};

// Bagian Skills
export const SkillsSection = () => {
  const skills = [
    { name: "HTML & CSS", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "React.js", level: 80 },
    { name: "Next.js", level: 75 },
    { name: "Tailwind CSS", level: 85 },
    { name: "TypeScript", level: 70 },
    { name: "Node.js", level: 65 },
    { name: "UI/UX Design", level: 75 },
  ];

  return (
    <PortfolioSection id="skills" titleText="Keterampilan">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="rounded-base border-2 border-border dark:border-darkBorder bg-white dark:bg-secondaryBlack shadow-light dark:shadow-dark p-6"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-heading">{skill.name}</h3>
              <span>{skill.level}%</span>
            </div>
            <div className="w-full h-3 bg-bg dark:bg-darkBg rounded-base overflow-hidden border-2 border-border dark:border-darkBorder">
              <div
                className="h-full bg-main rounded-base"
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </PortfolioSection>
  );
};

// Bagian Projects
export const ProjectsSection = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "Platform e-commerce modern yang dibangun dengan Next.js dan Tailwind CSS.",
      image:
        "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1932&auto=format&fit=crop",
      tags: ["Next.js", "React", "Tailwind"],
      link: "#",
    },
    {
      title: "Portfolio Website",
      description:
        "Website portofolio responsif dengan animasi dan efek modern.",
      image:
        "https://images.unsplash.com/photo-1539158026586-35e9e5c55f42?q=80&w=1972&auto=format&fit=crop",
      tags: ["React", "Framer Motion", "Styled Components"],
      link: "#",
    },
    {
      title: "Task Management App",
      description:
        "Aplikasi manajemen tugas dengan fitur drag-and-drop dan notifikasi.",
      image:
        "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?q=80&w=1932&auto=format&fit=crop",
      tags: ["TypeScript", "Redux", "Material UI"],
      link: "#",
    },
  ];

  return (
    <PortfolioSection id="projects" titleText="Proyek">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="rounded-base border-2 border-border dark:border-darkBorder bg-white dark:bg-secondaryBlack shadow-light dark:shadow-dark overflow-hidden"
          >
            <div className="relative w-full h-48 overflow-hidden border-b-2 border-border dark:border-darkBorder">
              <div className="absolute inset-0">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-heading mb-2">{project.title}</h3>
              <p className="text-text/70 dark:text-darkText/70 mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 bg-main/20 text-main text-xs rounded-base border-2 border-border dark:border-darkBorder font-base"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="px-6 pb-6">
              <NextLink href={project.link}>
                <Button variant="default" size="sm">
                  Lihat Detail
                </Button>
              </NextLink>
            </div>
          </div>
        ))}
      </div>
    </PortfolioSection>
  );
};

// Bagian Contact
export const ContactSection = () => {
  return (
    <PortfolioSection id="contact" titleText="Hubungi Saya">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="rounded-base border-2 border-border dark:border-darkBorder bg-white dark:bg-secondaryBlack shadow-light dark:shadow-dark p-8">
          <h3 className={titleStyle({ size: "sm" })}>Kirim Pesan</h3>
          <p className="text-text/70 dark:text-darkText/70 mt-2 mb-6">
            Tertarik untuk bekerja sama? Jangan ragu untuk menghubungi saya
            melalui form ini.
          </p>
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-base mb-1"
                  htmlFor="name"
                >
                  Nama
                </label>
                <input
                  className="w-full p-3 rounded-base border-2 border-border dark:border-darkBorder bg-bg dark:bg-darkBg focus:ring-2 focus:ring-main"
                  id="name"
                  placeholder="Nama Anda"
                  type="text"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-base mb-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full p-3 rounded-base border-2 border-border dark:border-darkBorder bg-bg dark:bg-darkBg focus:ring-2 focus:ring-main"
                  id="email"
                  placeholder="email@example.com"
                  type="email"
                />
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-base mb-1"
                htmlFor="subject"
              >
                Subjek
              </label>
              <input
                className="w-full p-3 rounded-base border-2 border-border dark:border-darkBorder bg-bg dark:bg-darkBg focus:ring-2 focus:ring-main"
                id="subject"
                placeholder="Subjek pesan"
                type="text"
              />
            </div>
            <div>
              <label
                className="block text-sm font-base mb-1"
                htmlFor="message"
              >
                Pesan
              </label>
              <textarea
                className="w-full p-3 rounded-base border-2 border-border dark:border-darkBorder bg-bg dark:bg-darkBg focus:ring-2 focus:ring-main"
                id="message"
                placeholder="Tulis pesan Anda di sini..."
                rows={4}
              />
            </div>
            <div>
              <Button type="submit" variant="default">
                Kirim Pesan
              </Button>
            </div>
          </form>
        </div>

        <div className="rounded-base border-2 border-border dark:border-darkBorder bg-white dark:bg-secondaryBlack shadow-light dark:shadow-dark p-8">
          <h3 className={titleStyle({ size: "sm" })}>Informasi Kontak</h3>
          <p className="text-text/70 dark:text-darkText/70 mt-2 mb-6">
            Anda juga dapat menghubungi saya melalui cara berikut:
          </p>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-base bg-main/20 border-2 border-border dark:border-darkBorder flex items-center justify-center">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-heading text-lg">Email</h4>
                <a className="text-main" href="mailto:email@example.com">
                  email@example.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-base bg-main/20 border-2 border-border dark:border-darkBorder flex items-center justify-center">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-heading text-lg">Telepon</h4>
                <a className="text-main" href="tel:+628123456789">
                  +62 812 3456 789
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-base bg-main/20 border-2 border-border dark:border-darkBorder flex items-center justify-center">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                  <path
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-heading text-lg">Lokasi</h4>
                <p className="text-text/70 dark:text-darkText/70">
                  Jakarta, Indonesia
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortfolioSection>
  );
};
