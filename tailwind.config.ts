import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#17130f",
        ivory: "#fffaf1",
        brass: "#b89657",
        graphite: "#63594e",
        smoke: "#eee6da",
        pearl: "#fbf7ef",
        linen: "#f3eadf",
        clay: "#9b7657"
      },
      boxShadow: {
        lounge: "0 24px 80px rgba(74, 55, 32, 0.12)",
        concierge: "0 28px 80px rgba(93, 72, 48, 0.14)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"]
      }
    }
  },
  plugins: []
};

export default config;
