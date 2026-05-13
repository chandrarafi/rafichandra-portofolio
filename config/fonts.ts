import { Fira_Code as FontMono, Space_Grotesk as FontSans, Dela_Gothic_One as FontJapan } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontJapan = FontJapan({
  subsets: ["latin"],
  variable: "--font-japan",
  weight: "400",
});
