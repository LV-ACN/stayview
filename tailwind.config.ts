import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fdf8f0",
          100: "#f9eddb",
          200: "#f2d7b0",
          300: "#e8bc7e",
          400: "#dd9a4b",
          500: "#d4802a",
          600: "#b86520",
          700: "#994c1d",
          800: "#7d3e1f",
          900: "#67341c",
        },
        neutral: {
          850: "#1f2328",
        },
      },
      fontFamily: {
        heading: ["Georgia", "serif"],
        body: ["system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
