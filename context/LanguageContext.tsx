"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "id" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// ===================== TRANSLATIONS =====================
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.github": "Github",
    "nav.certifications": "Certifications",

    // Hero
    "hero.greeting": "Hi, I'm ",
    "hero.description":
      "I'm a software engineer with a passion for building accessible and customizable web applications.",
    "hero.downloadCv": "Download CV",
    "hero.profileAlt": "Profile photo",
    "hero.role1": "Web Developer",
    "hero.role2": "Software Engineer",
    "hero.role3": "Frontend Developer",
    "hero.role4": "Backend Developer",

    // About
    "about.title": "About Me",
    "about.description":
      "A graduate of {university} majoring in Information Systems with expertise in web development, software engineering, database management, and computer networking as well as software and hardware capabilities. Certified by {oracle} and {cisco}, I excel at quickly learning new technologies and adapting to dynamic work environments. Focused on developing and optimizing user-friendly, secure, and reliable digital solutions, both on the frontend and backend.",
    "about.university": "Sekolah Tinggi Manajemen Informatika Dan Komputer Jayanusa",

    // Experience
    "exp.title": "Work Experience",
    "exp.subtitle": "My professional journey and career milestones.",
    "exp.heading": "Experience",

    // Skills
    "skills.title": "My Skills",

    // GitHub Activity
    "github.title": "GitHub Activity",
    "github.subtitle":
      "See my latest activity on GitHub and contributions to open source projects",
    "github.activityTitle": "GitHub Activity",
    "github.seeFullProfile": "See my full GitHub contributions on",
    "github.profileLink": "GitHub profile",
    "github.recentRepos": "Recent Repositories",
    "github.noRepos": "No repositories found.",
    "github.noDescription": "No description provided.",
    "github.updatedOn": "Updated on",
    "github.statsTitle": "GitHub Statistics",
    "github.totalRepos": "Total Repositories",
    "github.recentActivity": "Recent Activity",
    "github.active": "Active",
    "github.topLangs": "Top Languages",

    // Projects
    "project.title": "Project Experience",
    "project.subtitle": "A comprehensive timeline of my professional projects.",
    "project.heading": "Project Portfolio",

    // Certifications
    "cert.title": "Licenses",
    "cert.subtitle": "My industry-recognized certifications and licenses.",
    "cert.heading": "Certifications & Licenses",
    "cert.issued": "Issued",
  },
  id: {
    // Navbar
    "nav.home": "Beranda",
    "nav.about": "Tentang",
    "nav.experience": "Pengalaman",
    "nav.skills": "Keahlian",
    "nav.projects": "Proyek",
    "nav.github": "Github",
    "nav.certifications": "Sertifikasi",

    // Hero
    "hero.greeting": "Halo, Saya ",
    "hero.description":
      "Saya seorang software engineer dengan semangat untuk membangun aplikasi web yang aksesibel dan dapat dikustomisasi.",
    "hero.downloadCv": "Unduh CV",
    "hero.profileAlt": "Foto profil",
    "hero.role1": "Web Developer",
    "hero.role2": "Software Engineer",
    "hero.role3": "Frontend Developer",
    "hero.role4": "Backend Developer",

    // About
    "about.title": "Tentang Saya",
    "about.description":
      "Lulusan dari {university} Jurusan Sistem Informasi dengan keahlian dalam pengembangan web, rekayasa perangkat lunak, manajemen basis data, dan jaringan komputer serta kemampuan dalam software dan hardware. Bersertifikat dari {oracle} dan {cisco}, saya unggul dalam mempelajari teknologi baru dengan cepat dan beradaptasi di lingkungan kerja yang dinamis. Berfokus pada mengembangkan dan mengoptimalkan solusi digital yang ramah pengguna, aman, serta andal, baik dari sisi frontend maupun backend.",
    "about.university": "Sekolah Tinggi Manajemen Informatika Dan Komputer Jayanusa",

    // Experience
    "exp.title": "Pengalaman Kerja",
    "exp.subtitle": "Perjalanan profesional dan pencapaian karier saya.",
    "exp.heading": "Pengalaman",

    // Skills
    "skills.title": "Keahlian Saya",

    // GitHub Activity
    "github.title": "Aktivitas GitHub",
    "github.subtitle":
      "Lihat aktivitas terbaru saya di GitHub dan kontribusi pada proyek open source",
    "github.activityTitle": "Aktivitas GitHub",
    "github.seeFullProfile": "Lihat kontribusi GitHub saya secara lengkap di",
    "github.profileLink": "profil GitHub",
    "github.recentRepos": "Repository Terbaru",
    "github.noRepos": "Tidak ada repository yang ditemukan.",
    "github.noDescription": "Tidak ada deskripsi.",
    "github.updatedOn": "Diperbarui pada",
    "github.statsTitle": "Statistik GitHub",
    "github.totalRepos": "Total Repository",
    "github.recentActivity": "Aktivitas Terbaru",
    "github.active": "Aktif",
    "github.topLangs": "Bahasa Teratas",

    // Projects
    "project.title": "Pengalaman Proyek",
    "project.subtitle": "Rangkuman lengkap proyek profesional saya.",
    "project.heading": "Portofolio Proyek",

    // Certifications
    "cert.title": "Lisensi",
    "cert.subtitle": "Sertifikasi dan lisensi yang diakui industri.",
    "cert.heading": "Sertifikasi & Lisensi",
    "cert.issued": "Diterbitkan",
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Language>("id");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-lang") as Language;
    if (saved && (saved === "en" || saved === "id")) {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("portfolio-lang", newLang);
  };

  const t = (key: string): string => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
