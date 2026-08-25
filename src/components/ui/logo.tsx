/**
 * SAHAJ logo components.
 *
 * NagaInfinityMark — the symbol mark: an infinity (∞) loop with a slender spike
 *   rising straight from the centre crossover, evoking the raised-hood naga of
 *   yogic tradition.
 *
 * SahajLogoFull — mark stacked above the SAHAJ wordmark, for hero / auth pages.
 */

interface NagaLogoProps {
  /** Height in px; width auto-calculated from viewBox aspect ratio (56:44) */
  size?: number;
  className?: string;
}

export function NagaInfinityMark({ size = 28, className }: NagaLogoProps) {
  const w = Math.round(size * (56 / 44));
  return (
    <svg
      width={w}
      height={size}
      viewBox="0 0 56 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* ── Infinity loops ── */}

      {/* Soft outer glow */}
      <path
        d="M28,33 C32,23 46,23 46,33 C46,43 32,43 28,33 C24,43 10,43 10,33 C10,23 24,23 28,33"
        stroke="#E8C07A"
        strokeWidth="10"
        strokeLinecap="round"
        opacity="0.25"
      />
      {/* Main amber stroke */}
      <path
        d="M28,33 C32,23 46,23 46,33 C46,43 32,43 28,33 C24,43 10,43 10,33 C10,23 24,23 28,33"
        stroke="#C8913A"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      {/* Sheen — top arc of right lobe */}
      <path
        d="M28,33 C32,23 46,23 46,33"
        stroke="#E8C07A"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.65"
      />

      {/* ── Spike: straight tapered needle rising from crossover ── */}

      {/* Spike glow halo */}
      <path
        d="M23.5,33 L28,5 L32.5,33"
        fill="#E8C07A"
        opacity="0.22"
      />
      {/* Spike body — solid tapered triangle */}
      <path
        d="M25.8,33 L28,7 L30.2,33"
        fill="#C8913A"
      />
      {/* Spike centre sheen */}
      <line
        x1="28" y1="12"
        x2="28" y2="30"
        stroke="#E8C07A"
        strokeWidth="1"
        opacity="0.5"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------

interface SahajLogoFullProps {
  /** Controls the height of the mark; text scales proportionally */
  size?: number;
  className?: string;
}

/**
 * Full SAHAJ logo lockup — mark stacked above the italic wordmark.
 * Use on hero sections, auth pages, and anywhere the brand needs to stand alone.
 */
export function SahajLogoFull({ size = 44, className }: SahajLogoFullProps) {
  return (
    <div
      className={`inline-flex flex-col items-center gap-2${
        className ? ` ${className}` : ""
      }`}
    >
      <NagaInfinityMark size={size} />
      <div className="flex flex-col items-center gap-[3px] text-center">
        <span
          className="font-heading italic tracking-[0.12em] leading-none"
          style={{ fontSize: Math.round(size * 0.48), color: "#6B4A2A" }}
        >
          SAHAJ
        </span>
        <span
          className="font-sans font-semibold tracking-[0.22em] uppercase leading-none"
          style={{
            fontSize: Math.round(size * 0.15),
            color: "rgba(62,53,48,0.38)",
          }}
        >
          Traditional Yoga
        </span>
      </div>
    </div>
  );
}
