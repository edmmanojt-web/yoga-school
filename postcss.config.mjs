const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    // Strips `@layer X, Y, Z;` ordering declarations that Tailwind v4 emits
    // but Next.js 16.3.x's CSS parser does not accept.
    "./postcss-fix-layers": {},
  },
};

export default config;
