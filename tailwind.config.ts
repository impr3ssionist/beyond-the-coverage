import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-2)",
        secondary: "var(--color-5)",
        accent: "var(--color-4)",
        light: "var(--color-3)",
        background: "var(--color-1)",
      },
    },
  },
  plugins: [],
};

export default config;