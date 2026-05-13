"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export const LanguageSwitcher = () => {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-0 border-2 border-black bg-white shadow-[2px_2px_0px_0px_#000000]">
      <button
        onClick={() => setLang("id")}
        className={cn(
          "px-3 py-1.5 text-xs font-heading transition-all duration-200",
          lang === "id"
            ? "bg-main text-black"
            : "text-black/60 hover:bg-yellow-100"
        )}
        aria-label="Bahasa Indonesia"
      >
        ID
      </button>
      <div className="w-[2px] h-full bg-black" />
      <button
        onClick={() => setLang("en")}
        className={cn(
          "px-3 py-1.5 text-xs font-heading transition-all duration-200",
          lang === "en"
            ? "bg-main text-black"
            : "text-black/60 hover:bg-yellow-100"
        )}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
