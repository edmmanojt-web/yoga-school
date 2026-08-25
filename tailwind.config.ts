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
        // Warm earth palette — Isha Foundation inspired (cream, gold, teak, sand)
        ivory: {
          50: "#FFFDF9",
          100: "#FBF7F2",
          200: "#F4EDE0",
          DEFAULT: "#FBF7F2",
        },
        beige: {
          100: "#F2EAD8",
          200: "#EAE0CC",
          300: "#DDD2BC",
          DEFAULT: "#F2E8DA",
        },
        // sage repurposed as amber-gold (primary accent colour)
        sage: {
          50: "#FBF5EC",
          100: "#F4E6CC",
          200: "#E6C99A",
          300: "#D4A868",
          400: "#C8913A",
          500: "#B87D3B",
          600: "#9A6730",
          700: "#7A5025",
          DEFAULT: "#B87D3B",
        },
        // forest repurposed as teak brown (deep accent / text)
        forest: {
          50: "#F5EFE8",
          100: "#E8D8C8",
          200: "#D0B094",
          300: "#B08860",
          400: "#8C6840",
          500: "#6B4A2A",
          600: "#52381F",
          700: "#3A2616",
          DEFAULT: "#6B4A2A",
        },
        // terracotta repurposed as rich amber
        terracotta: {
          50: "#FBF3E8",
          100: "#F4E2C4",
          200: "#E8C48A",
          300: "#D4A050",
          400: "#C8913A",
          500: "#B47A28",
          600: "#8C5E1E",
          DEFAULT: "#C8913A",
        },
        // charcoal stays but is warm stone
        charcoal: {
          50: "#F5F2F0",
          100: "#E8E2DC",
          200: "#CFC4BC",
          300: "#B0A298",
          400: "#8C7D74",
          500: "#5E514A",
          600: "#3E3530",
          700: "#2A231F",
          800: "#1C1612",
          DEFAULT: "#3E3530",
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
