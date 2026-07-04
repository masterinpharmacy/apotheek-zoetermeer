import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pine: {
          DEFAULT: "#175C4C",
          light: "#238067",
          dark: "#0E3A30",
        },
        paper: "#FFFFFF",
        paperDark: "#F2F7F5",
        clay: {
          DEFAULT: "#1B5FA6",
          light: "#3E85CC",
          dark: "#12457C",
        },
        sage: {
          DEFAULT: "#A9D9CB",
          light: "#CFEBE1",
          dark: "#87BFAC",
        },
        ink: "#1B2422",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-public-sans)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      backgroundImage: {
        "perforation": "radial-gradient(circle, #F6F2E9 1.5px, transparent 1.5px)",
      },
    },
  },
  plugins: [],
};
export default config;
