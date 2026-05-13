/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#76fbd9",
        mainAccent: "#76fbd9",
        overlay: "rgba(0,0,0,0.8)",

        // light mode
        bg: "#ffffff",
        text: "#000",
        border: "#000",

        // dark mode
        darkBg: "#212121",
        darkText: "#eeefe9",
        darkBorder: "#000",
        secondaryBlack: "#212121",
      },
      borderRadius: {
        base: "5px",
      },
      boxShadow: {
        light: "4px 4px 0px 0px #000",
        dark: "4px 4px 0px 0px #000",
      },
      translate: {
        boxShadowX: "4px",
        boxShadowY: "4px",
        reverseBoxShadowX: "-4px",
        reverseBoxShadowY: "-4px",
      },
      fontWeight: {
        base: "500",
        heading: "700",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Space Grotesk", "sans-serif"],
        mono: ["var(--font-mono)"],
        japan: ["var(--font-japan)", "sans-serif"],
      },
      screens: {
        xs: "480px",
      },
    },
  },
  darkMode: "class",
  plugins: [require("tailwindcss-animate")],
};
