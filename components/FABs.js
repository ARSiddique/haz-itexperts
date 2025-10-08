// app/components/FABs.jsx
"use client";
import { Phone } from "lucide-react";
import { site } from "@/lib/siteConfig";

/** Solid WhatsApp glyph (white) so it’s always visible on green bg */
function WhatsAppIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M20.52 3.48A11.01 11.01 0 0 0 3.49 20.5L2 22l1.68-.43A11 11 0 1 0 20.52 3.48ZM12 4.8a7.2 7.2 0 0 1 6.06 10.97c-.24.35-.52.69-.83 1-1 .98-1.73.98-2.78.54-1.2-.49-2.68-1.17-4.48-2.55-1.67-1.32-2.76-2.63-3.35-3.76-.52-1-.36-1.77.54-2.43.3-.22.59-.45.88-.67.2-.14.44-.18.67-.12l1.18.31c.24.06.44.22.54.44l.45 1.03c.09.22.07.46-.05.66l-.55.9c.65 1.06 1.56 1.92 2.63 2.57l.9-.55c.2-.12.44-.14.66-.05l1.03.45c.22.1.38.3.44.54l.31 1.18c.06.23.02.47-.12.67-.22.29-.45.58-.67.88A7.2 7.2 0 0 1 12 4.8Z"
      />
    </svg>
  );
}

export default function FABs({
  size = 48,          // button diameter
  gap = 10,           // space between buttons
  bottom = 16,        // distance from bottom (will include safe-area)
}) {
  const wa = `https://wa.me/${site.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
    "Hi! I’d like to discuss Managed IT / Cybersecurity."
  )}`;
  const tel = `tel:${site.phone.replace(/\s/g, "")}`;

  const btnBase =
    "grid place-items-center rounded-full shadow-lg focus:outline-none " +
    "focus-visible:ring-2 focus-visible:ring-white/40 transition " +
    "will-change-transform hover:-translate-y-0.5";

  return (
    <div
      className="fixed left-4 z-[70] flex flex-col"
      style={{
        gap,
        bottom: `calc(${bottom}px + env(safe-area-inset-bottom, 0px))`,
      }}
    >
      {/* WhatsApp */}
      <a
        href={wa}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp us"
        className={`${btnBase}`}
        style={{ width: size, height: size, background: "#22c55e" }} // green-500
      >
        <WhatsAppIcon className="w-[18px] h-[18px] text-white" />
      </a>

      {/* Call */}
      <a
        href={tel}
        aria-label="Call us"
        className={`${btnBase}`}
        style={{ width: size, height: size, background: "#06b6d4" }} // cyan-500
      >
        <Phone className="w-[18px] h-[18px] text-white" />
      </a>
    </div>
  );
}
