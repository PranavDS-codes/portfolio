import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050816",
        night: "#08111f",
        panel: "#0d1728",
        line: "rgba(148, 163, 184, 0.18)",
        slateSoft: "#94a3b8",
        teal: "#2dd4bf",
        violet: "#a78bfa",
        amber: "#fbbf24",
      },
      boxShadow: {
        glow: "0 0 80px rgba(45, 212, 191, 0.12)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
