import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 56 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Infinity — amber, thin strokes */}
          <path
            d="M28,36 C33,24 48,24 48,36 C48,48 33,48 28,36 C23,48 8,48 8,36 C8,24 23,24 28,36"
            stroke="#C8913A"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Spike — slim tapered needle */}
          <path d="M27,36 L28,8 L29,36" fill="#C8913A" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
