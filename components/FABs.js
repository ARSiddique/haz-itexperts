"use client";
import { Phone, MessageCircle } from "lucide-react";
import { site } from "@/lib/siteConfig";

export default function FABs() {
  const wa = `https://wa.me/${site.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
    "Hi! I’d like to discuss Managed IT / Cybersecurity."
  )}`;
  const tel = `tel:${site.phone.replace(/\s/g, "")}`;

  return (
    <div className="fixed left-4 bottom-4 z-50 flex flex-col gap-3">
      {/* WhatsApp (left) */}
      <a
        href={wa} target="_blank" rel="noreferrer"
        className="grid place-items-center w-12 h-12 rounded-full
                   bg-green-500/90 hover:bg-green-500 text-white shadow-lg
                   hover:shadow-[0_10px_30px_-8px_rgba(34,197,94,.7)]
                   transition will-change-transform hover:-translate-y-0.5"
        aria-label="WhatsApp us"
      >
        <MessageCircle className="w-5 h-5" />
      </a>

      {/* Call (left) */}
      <a
        href={tel}
        className="grid place-items-center w-12 h-12 rounded-full
                   bg-cyan-500/90 hover:bg-cyan-500 text-white shadow-lg
                   hover:shadow-[0_10px_30px_-8px_rgba(6,182,212,.7)]
                   transition will-change-transform hover:-translate-y-0.5"
        aria-label="Call us"
      >
        <Phone className="w-5 h-5" />
      </a>
    </div>
  );
}
