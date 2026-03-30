import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAF8F5",
        surface: "#F2EDE8",
        "border-soft": "#E0D8D0",
        "text-primary": "#1C1917",
        "text-secondary": "#78716C",
        accent: "#C8956C",
        "accent-hover": "#B07D56",
        success: "#4CAF7D",
        error: "#E05C5C",
      },
      fontFamily: {
        heading: ['"Playfair Display"', "serif"],
        body: ["Inter", "sans-serif"],
      },
      fontSize: {
        display: ["56px", { lineHeight: "1.1", fontWeight: "600" }],
        h1: ["40px", { lineHeight: "1.2", fontWeight: "600" }],
        h2: ["32px", { lineHeight: "1.3", fontWeight: "600" }],
        h3: ["24px", { lineHeight: "1.4", fontWeight: "500" }],
        body: ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        small: ["14px", { lineHeight: "1.5", fontWeight: "400" }],
      },
      boxShadow: {
        soft: "0 4px 24px rgba(0,0,0,0.06)",
        card: "0 2px 12px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
