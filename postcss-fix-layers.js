/**
 * PostCSS plugin: strip-multi-layer-ordering
 *
 * Removes `@layer X, Y, Z;` (multi-name cascade-layer ordering declarations)
 * from Tailwind v4's compiled output. Next.js 16.3.x's CSS parser rejects
 * this syntax. Individual `@layer { }` blocks still define the layers
 * correctly without the ordering hint.
 *
 * Uses PostCSS 8 object-style creator pattern (postcss = true on the creator).
 */
const creator = () => ({
  postcssPlugin: "strip-multi-layer-ordering",
  AtRule: {
    layer(rule) {
      // Remove @layer X, Y, Z; — no block body, comma-separated names
      if (!rule.nodes && rule.params && rule.params.includes(",")) {
        rule.remove();
      }
    },
  },
});
creator.postcss = true;

module.exports = creator;
