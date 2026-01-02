"use client";

import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { site } from "@/lib/siteConfig";
import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import TrackedEmailLink from "@/components/TrackedEmailLink";
import TrackedWhatsAppLink from "@/components/TrackedWhatsAppLink";
import { FaWhatsapp } from "react-icons/fa";

function cleanTel(p) {
  const s = String(p || "").trim();
  if (!s) return "";
  const cleaned = s.replace(/[^\d+]/g, "").replace(/\++/g, "+");
  if (!cleaned) return "";
  return cleaned.startsWith("+") ? cleaned : `+${cleaned}`;
}

function digitsOnly(p) {
  return String(p || "").replace(/[^\d]/g, "");
}

export default function ContactActionsRow({
  source = "unknown",
  compact = false,
  className = "",
  title = "Prefer a quick call?",
  desc = "15-min no-pressure assessment — we’ll map gaps and next steps.",
}) {
  const email = site?.email ?? "supremeitexperts@gmail.com";
  const phone = site?.phone ?? "+1 610-500-9209";

  const telE164 = cleanTel(phone);

  // WhatsApp (prefer site.whatsapp, fallback phone)
  const waRaw = site?.whatsapp || telE164 || phone;
  const waDigits = digitsOnly(waRaw);

  const WA_MSG =
    "Hi! I need help with Managed IT / Cybersecurity.\n\n" +
    "Company: __\n" +
    "Users: __\n" +
    "Issue / Request: __\n" +
    "Best time to reach: __";

  const waHref = waDigits ? `https://wa.me/${waDigits}?text=${encodeURIComponent(WA_MSG)}` : "";

  return (
    <div
      className={[
        "rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/15 to-fuchsia-500/15",
        compact ? "p-4" : "p-6 md:p-8",
        className,
      ].join(" ")}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-slate-300">{desc}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          {/* Call */}
          {telE164 ? (
            <TrackedPhoneLink
              phone={telE164}
              source={source}
              className="rounded-lg px-5 py-3 font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 inline-flex items-center gap-2"
            >
              Call now <Phone className="h-4 w-4" />
            </TrackedPhoneLink>
          ) : null}

          {/* WhatsApp */}
          {waHref ? (
            <TrackedWhatsAppLink
              href={waHref}
              source={source}
              className="rounded-lg px-5 py-3 font-semibold border border-emerald-300/25 text-emerald-200 bg-emerald-400/10 hover:bg-emerald-400/15 inline-flex items-center gap-2"
            >
              WhatsApp <FaWhatsapp className="h-4 w-4" />
            </TrackedWhatsAppLink>
          ) : null}

          {/* Email */}
          <TrackedEmailLink
            email={email}
            source={source}
            className="rounded-lg px-5 py-3 font-semibold bg-white/10 ring-1 ring-white/20 hover:bg-white/20 inline-flex items-center gap-2"
          >
            Email <Mail className="h-4 w-4" />
          </TrackedEmailLink>

          {/* Get Quote */}
          <Link
            href="/get-quote"
            className="rounded-lg px-5 py-3 font-semibold bg-white/10 ring-1 ring-white/20 hover:bg-white/20 inline-flex items-center gap-2"
          >
            Get Quote <span aria-hidden>✨</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
