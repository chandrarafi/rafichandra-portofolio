"use client";

import { useState, useEffect, useRef } from "react";
import NextLink from "next/link";
import { ExternalLink, X } from "lucide-react";

import { siteConfig } from "@/config/site";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.experience"), href: "#experience" },
    { label: t("nav.projects"), href: "#projects" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNav(false);
      } else if (currentScrollY < lastScrollY || currentScrollY <= 100) {
        setShowNav(true);
      }
      setLastScrollY(currentScrollY);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [lastScrollY]);

  const scrollToHash = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={menuRef}>
      <nav className="sticky top-0 z-50 w-full px-2 sm:px-4">
        <div
          className={cn(
            "mx-auto mt-2 sm:mt-4 flex h-[50px] sm:h-[60px] md:h-[70px] lg:h-[80px] w-full max-w-full",
            "items-center justify-between px-3 sm:px-6 transition-transform",
            "duration-300 ease-in-out bg-yellow-300",
            "border-2 sm:border-[3px] border-black",
            "shadow-[4px_4px_0px_0px_#000000] sm:shadow-[8px_8px_0px_0px_#000000]",
            showNav ? "translate-y-0" : "-translate-y-[calc(100%+40px)]"
          )}
        >
          {/* Logo */}
          <NextLink
            href="/"
            className="text-2xl sm:text-3xl lg:text-5xl font-black tracking-tight text-white transform -rotate-2 hover:rotate-0 transition-transform duration-300 font-japan [text-shadow:3px_3px_0px_#000]"
          >
            RC
          </NextLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center text-base lg:text-lg space-x-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-1 font-bold text-black hover:-translate-y-1 hover:rotate-2 transform transition-all duration-200"
                onClick={(e) => {
                  if (item.href.startsWith("#")) {
                    e.preventDefault();
                    scrollToHash(item.href.substring(1));
                  }
                }}
              >
                {item.label}
              </a>
            ))}
            <a
              className="px-3 py-1 font-bold text-black hover:-translate-y-1 hover:rotate-2 transform transition-all duration-200 inline-flex items-center gap-1"
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              Github <ExternalLink size={14} />
            </a>

            <div className="flex items-center gap-4">
              <a href={siteConfig.links.discord} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="default"
                  size="sm"
                  className="bg-main border-[2px] border-black text-black font-heading shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none"
                >
                  Get in Touch!
                </Button>
              </a>
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2 sm:gap-4">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1.5 sm:p-2 bg-main transform hover:-rotate-3 transition-transform border-2 border-black shadow-[3px_3px_0px_0px_#000000]"
            >
              {isMenuOpen ? (
                <X size={20} className="text-black" />
              ) : (
                <>
                  <div className="w-5 h-0.5 bg-black mb-1"></div>
                  <div className="w-5 h-0.5 bg-black mb-1"></div>
                  <div className="w-5 h-0.5 bg-black"></div>
                </>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - inside flow, not fixed */}
      {isMenuOpen && (
        <div className="md:hidden w-full px-2 sm:px-4 relative z-40">
          <div className="w-full bg-white p-3 sm:p-4 border-2 sm:border-[3px] border-black shadow-[4px_4px_0px_0px_#000000] sm:shadow-[8px_8px_0px_0px_#000000]">
            <div className="flex flex-col space-y-2 sm:space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="p-2 sm:p-3 text-center text-base sm:text-lg font-bold bg-yellow-300 border-2 border-black shadow-[3px_3px_0px_0px_#000000]"
                  onClick={(e) => {
                    if (item.href.startsWith("#")) {
                      e.preventDefault();
                      scrollToHash(item.href.substring(1));
                    }
                    setIsMenuOpen(false);
                  }}
                >
                  {item.label}
                </a>
              ))}
              <a
                className="p-2 sm:p-3 text-center text-base sm:text-lg font-bold bg-yellow-300 border-2 border-black shadow-[3px_3px_0px_0px_#000000] inline-flex items-center justify-center gap-2"
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
              >
                Github <ExternalLink size={14} />
              </a>
            </div>
            <div className="mt-3 sm:mt-4">
              <a href={siteConfig.links.discord} target="_blank" rel="noopener noreferrer" className="block">
                <Button
                  variant="default"
                  size="default"
                  className="w-full bg-main border-[2px] border-black text-black font-heading shadow-[3px_3px_0px_0px_#000000] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
                >
                  Get in Touch!
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
