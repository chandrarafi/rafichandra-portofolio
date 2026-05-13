// Styles import
import "@/styles/globals.css";

// Third-party libraries
import { Metadata, Viewport } from "next";
import clsx from "clsx";

// Local components and utils
import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans, fontJapan } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import ScrollAnimation from "@/components/ScrollAnimation";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-bg dark:bg-darkBg font-sans antialiased",
          fontSans.variable,
          fontJapan.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light", forcedTheme: "light" }}>
          <div className="relative z-10 mx-auto max-w-[1400px] bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] min-h-screen my-4 sm:my-6 md:my-8 overflow-hidden" style={{ width: "calc(100% - 6rem)" }}>
            <Navbar />
            <main className="flex min-h-full flex-col">
              <div className="flex-grow">
                {children}
              </div>
            </main>
            <footer className="w-full bg-white p-4 sm:p-6 md:p-8 border-t-4 sm:border-t-6 md:border-t-8 border-black">
              <div className="max-w-full mx-auto px-2 sm:px-5">
                <div className="border-t-2 sm:border-t-4 border-black pt-4 sm:pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
                  <p className="text-text font-bold text-sm sm:text-base md:text-lg">© 2026 Rafi Chandra | Built with ❤ & ☕</p>
                  <div className="bg-black text-white px-3 sm:px-4 py-1.5 sm:py-2 font-mono text-xs sm:text-sm">&lt;/&gt; with Next.js + Tailwind</div>
                </div>
              </div>
            </footer>
            <ScrollAnimation />
          </div>
        </Providers>
      </body>
    </html>
  );
}
