"use client";

import React from "react";
import { useLanguage, Language } from "@/context/LanguageContext";

export const LanguageSwitcher = () => {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-[#161b22] rounded-full border border-gray-700/50 p-0.5">
      <button
        onClick={() => setLang("id")}
        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
          lang === "id"
            ? "bg-gradient-to-r from-[#FF1CF7] to-[#b249f8] text-white shadow-[0_0_12px_rgba(178,73,248,0.4)]"
            : "text-gray-400 hover:text-white"
        }`}
        aria-label="Bahasa Indonesia"
      >
        ID
      </button>
      <button
        onClick={() => setLang("en")}
        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
          lang === "en"
            ? "bg-gradient-to-r from-[#58a6ff] to-[#3b82f6] text-white shadow-[0_0_12px_rgba(88,166,255,0.4)]"
            : "text-gray-400 hover:text-white"
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
