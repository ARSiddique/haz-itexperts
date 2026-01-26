"use client";

import Link from "next/link";
import { ArrowRight, Phone, Mail, MessageCircle } from "lucide-react";
import { site } from "@/lib/siteConfig";

function cx(...a) {
  return a.filter(Boolean).join(" ");
}

export default function ContactActionsRow({
  source = "cta-row",
  variant = "default", // future: "compact"
  className = "",
}) {
  const phoneRaw = site?.phone || "+1 610-500-9209";
  const email = site?.email || "support@supremeitexperts.com";
  const whatsappRaw = site?.whatsapp || phoneRaw;

  const phoneTel = `tel:${String(phoneRaw).replace(/[^\d+]/g, "")}`;
  const mailto = `mailto:${email}`;

  // digits only for wa.me
  const WA_DIGITS = String(whatsappRaw).replace(/[^\d]/g, "");
  const WA_MSG =
    "Hi! I’d like to get help with managed IT / cybersecurity.\n\n" +
    "Company:\nUsers:\nMain issue:\nLocation (Allentown/Macungie/Emmaus):";
  const waHref = `https://wa.me/${WA_DIGITS}?text=${encodeURIComponent(WA_MSG)}`;

  const assessmentHref = site?.assessmentHref || "/lp/allentown#claim";

  return (
    <div
      className={cx(
        "rounded-2xl border border-white/10 bg-white/[0.06] p-5 md:p-6",
        className
      )}
      data-source={source}
      data-variant={variant}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">
            Quick contact
          </div>
          <div className="mt-2 text-lg md:text-xl font-extrabold text-slate-100">
            {site?.cta || "Get a Free IT Assessment"}
          </div>
          <div className="mt-1 text-sm text-slate-300">
            Call, WhatsApp, or email — we’ll point you to the cleanest next step.
          </div>

          <div className="mt-3 text-xs text-slate-400">
            <span className="text-slate-200">{phoneRaw}</span> •{" "}
            <span className="text-slate-200">{email}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full md:w-auto">
          {/* Primary */}
          <Link
            href={assessmentHref}
            className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
          >
            Free IT Assessment <ArrowRight className="h-4 w-4" />
          </Link>

          {/* Call */}
          <a
            href={phoneTel}
            className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold border border-white/10 bg-white/5 hover:bg-white/10 transition"
          >
            <Phone className="h-4 w-4 text-cyan-300" />
            Call Now
          </a>

          {/* WhatsApp */}
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold border border-white/10 bg-white/5 hover:bg-white/10 transition"
          >
            <MessageCircle className="h-4 w-4 text-cyan-300" />
            WhatsApp
          </a>

          {/* Email */}
          <a
            href={mailto}
            className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold border border-white/10 bg-white/5 hover:bg-white/10 transition"
          >
            <Mail className="h-4 w-4 text-cyan-300" />
            Email Us
          </a>
        </div>
      </div>
    </div>
  );
}
