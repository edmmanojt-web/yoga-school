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
        // Design system tokens — warm, earthy, premium
        ivory: {
          50: "#FDFBF7",
          100: "#FAF7F0",
          200: "#F4EFE3",
          DEFAULT: "#FAF7F0",
        },
        beige: {
          100: "#F0EAD6",
          200: "#E8DFC8",
          300: "#D9CDB4",
          DEFAULT: "#E8DFC8",
        },
        sage: {
          50: "#F2F5F0",
          100: "#E0E8DB",
          200: "#C4D4BA",
          300: "#A3BC96",
          400: "#7D9F6E",
          500: "#5A7A4A",
          600: "#3D5C2E",
          700: "#2A4020",
          DEFAULT: "#5A7A4A",
        },
        forest: {
          50: "#EEF2EC",
          100: "#D4DDD0",
          200: "#A8B9A1",
          300: "#7D9575",
          400: "#536E4C",
          500: "#334B2C",
          600: "#233320",
          700: "#162016",
          DEFAULT: "#334B2C",
        },
        terracotta: {
          50: "#FBF3EE",
          100: "#F5E1D3",
          200: "#E8C0A3",
          300: "#D89E73",
          400: "#C47D49",
          500: "#A65E2E",
          600: "#7D4322",
          DEFAULT: "#C47D49",
        },
        charcoal: {
          50: "#F4F4F3",
          100: "#E3E2E0",
          200: "#C5C3BE",
          300: "#A3A09A",
          400: "#7D7970",
          500: "#57534A",
          600: "#3D3A33",
          700: "#26231E",
          800: "#1A1714",
          DEFAULT: "#3D3A33",
        },
        // Semantic aliases
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        border: "var(--border)",
        ring: "var(--ring)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
      },
      fontFamily: {
        sans: ["var(--font-body)", "Georgia", "serif"],
        heading: ["var(--font-heading)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.5rem, 6vw, 4rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2rem, 4.5vw, 3rem)", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      spacing: {
        "section": "5rem",
        "section-sm": "3rem",
      },
      borderRadius: {
        "xl": "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
      },
      backgroundImage: {
        "gradient-warm": "linear-gradient(135deg, var(--ivory) 0%, var(--beige) 100%)",
        "gradient-forest": "linear-gradient(135deg, #334B2C 0%, #1A1714 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
