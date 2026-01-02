"use client";

import { Phone } from "lucide-react";
import { site } from "@/lib/siteConfig";
import { FaWhatsapp } from "react-icons/fa";
import { track } from "@/lib/track";

function digitsOnly(p) {
  return String(p || "").replace(/[^\d]/g, "");
}

export default function FABs({
  size = 48,
  gap = 10,
  bottom = 16,
  source = "fab",
}) {
  const phoneRaw = site?.phone || "+1 610-500-9209";
  const tel = `tel:${String(phoneRaw).replace(/[^\d+]/g, "")}`;

  const waRaw = site?.whatsapp || phoneRaw;
  const waDigits = digitsOnly(waRaw);
  const wa = waDigits
    ? `https://wa.me/${waDigits}?text=${encodeURIComponent(
        "Hi! I’d like to discuss Managed IT / Cybersecurity."
      )}`
    : "";

  const btnBase =
    "grid place-items-center rounded-full shadow-lg focus:outline-none " +
    "focus-visible:ring-2 focus-visible:ring-white/40 transition " +
    "will-change-transform hover:-translate-y-0.5";

  return (
    <div
      className="fixed right-4 z-[70] flex flex-col"
      style={{
        gap,
        bottom: `calc(${bottom}px + env(safe-area-inset-bottom, 0px))`,
      }}
    >
      {/* WhatsApp */}
      {wa ? (
        <a
          href={wa}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp us"
          className={btnBase}
          style={{ width: size, height: size, background: "#22c55e" }}
          onClick={() => track("whatsapp_click", { source, placement: "fab" })}
        >
          <FaWhatsapp size={22} color="#fff" />
        </a>
      ) : null}

      {/* Call */}
      <a
        href={tel}
        aria-label="Call us"
        className={btnBase}
        style={{ width: size, height: size, background: "#06b6d4" }}
        onClick={() => track("call_click", { source, placement: "fab" })}
      >
        <Phone className="w-[18px] h-[18px] text-white" />
      </a>
    </div>
  );
}
