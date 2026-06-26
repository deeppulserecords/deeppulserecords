import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#171411",
        charcoal: "#2a2824",
        ivory: "#fbf8f1",
        porcelain: "#fffdf8",
        sand: "#e8ddc8",
        mist: "#dfe8df",
        clay: "#b79172"
      },
      fontFamily: {
        sans: ["Inter", "Avenir Next", "ui-sans-serif", "system-ui"],
        display: ["Cormorant Garamond", "Georgia", "serif"]
      },
      boxShadow: {
        soft: "0 24px 80px rgba(63, 55, 45, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
