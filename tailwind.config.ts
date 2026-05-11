import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /** Dusty steel blue — labels, links, structure (softer than deep navy) */
        brand: {
          DEFAULT: "#3e5c82",
          muted: "#5a7394",
          foreground: "#eef2f7",
        },
        /** Muted terracotta — CTAs, highlights (less saturated than bright orange) */
        accent: {
          DEFAULT: "#b87542",
          muted: "#9e6540",
          soft: "#faf5f0",
        },
        surface: {
          DEFAULT: "#f7f5f2",
          elevated: "#ffffff",
        },
        ink: {
          DEFAULT: "#141413",
          muted: "#5c5b57",
        },
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        label: "0.28em",
        display: "-0.02em",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(62, 92, 130, 0.07)",
        "glass-lg": "0 24px 64px rgba(20, 20, 19, 0.12)",
        accent: "0 12px 36px rgba(184, 117, 66, 0.14)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to right, rgba(62,92,130,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(62,92,130,0.04) 1px, transparent 1px)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 45s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
