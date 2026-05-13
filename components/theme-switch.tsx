"use client";

import { FC } from "react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export interface ThemeSwitchProps {
  className?: string;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "p-2 rounded-base border-2 border-border dark:border-darkBorder",
        "hover:bg-main hover:text-mtext transition-colors",
        "text-text dark:text-darkText",
        className
      )}
    >
      {isDark ? <SunFilledIcon size={20} /> : <MoonFilledIcon size={20} />}
    </button>
  );
};
