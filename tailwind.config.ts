import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#7E1929",
          hover: "#661220",
          subtle: "#F7EDEE",
        },
        mustard: {
          DEFAULT: "#F5C542",
          dark: "#E5B532",
          subtle: "#FEF9E7",
        },
        paper: {
          DEFAULT: "#FAF8F5",
          bright: "#FBF8F1",
          card: "#FFFFFF",
          dim: "#ECE7E1",
          tape: "#F3EFEA",
        },
        ink: {
          DEFAULT: "#14110F",
          muted: "#52525B",
          faint: "#71717A",
        },
        stage: {
          green: "#2E6F40",
          purple: "#5B21B6",
          orange: "#E65C00",
        },
      },
      fontFamily: {
        display: ['"Archivo Black"', '"Plus Jakarta Sans"', "sans-serif"],
        sans: ['"Plus Jakarta Sans"', "-apple-system", "sans-serif"],
        mono: ['"Space Mono"', '"JetBrains Mono"', "monospace"],
      },
      boxShadow: {
        zine: "4px 4px 0px #14110F",
        "zine-sm": "2px 2px 0px #14110F",
        "zine-lg": "6px 6px 0px #14110F",
        washi: "0 1px 3px rgba(64,48,28,0.05), 0 9px 16px -10px rgba(58,43,33,0.29), 2px 1px 0 #c7b99f, 4px 2px 0 #f6f0e3, 5px 3px 0 #cbbda4",
      },
    },
  },
  plugins: [],
};

export default config;
