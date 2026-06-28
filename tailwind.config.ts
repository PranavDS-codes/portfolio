import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--bg-primary)",
        night: "var(--bg-primary)",
        panel: "var(--bg-secondary)",
        line: "var(--border-line)",
        slateSoft: "var(--text-secondary)",
        teal: "var(--color-teal)",
        violet: "var(--color-violet)",
        amber: "var(--color-amber)",
        slate: {
          50: "var(--text-primary)",
          100: "var(--text-primary)",
          200: "var(--text-primary)",
          300: "var(--text-secondary)",
          400: "var(--text-muted)",
          500: "var(--text-light-muted)",
          600: "var(--text-border-muted)",
          700: "var(--text-border-muted)",
        },
        white: "rgb(var(--color-white-raw) / <alpha-value>)",
      },
      boxShadow: {
        glow: "var(--shadow-glow)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
