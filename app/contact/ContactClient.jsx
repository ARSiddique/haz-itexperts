"use client";

import Link from "next/link";
import {
  ShieldCheck,
  Clock,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Lock,
  Wrench,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";
import LeadFormSimple from "@/components/LeadFormSimple";
import { site } from "@/lib/siteConfig";

function cx(...a) {
  return a.filter(Boolean).join(" ");
}

export default function ContactClient({ source = "contact-page", mode = "full" }) {
  const brand = site?.name || "Supreme IT Experts";
  const email = site?.email || "supremeitexperts@gmail.com";
  const phoneRaw = site?.phone || "+1 610-500-9209";
  const whatsappRaw = site?.whatsapp || phoneRaw;

  const phoneTel = `tel:${String(phoneRaw).replace(/[^\d+]/g, "")}`;
  const mailto = `mailto:${email}`;

  // ✅ WhatsApp link (digits only)
  const WA_DIGITS = String(whatsappRaw).replace(/[^\d]/g, "");
  const WA_MSG =
    "Hi! I need help with managed IT / cybersecurity.\n\n" +
    "Company:\nUsers:\nMain issue:\nLocation (Allentown/Macungie/Emmaus):";
  const waHref = `https://wa.me/${WA_DIGITS}?text=${encodeURIComponent(WA_MSG)}`;

  const primaryAssessmentHref = site?.assessmentHref || "/lp/allentown#claim";


  return (
    <main
      className={cx(
        "max-w-6xl mx-auto px-4 pb-24",
        mode === "full" ? "pt-12 md:pt-16" : "pt-10"
      )}
    >
      {/* HERO / STORY */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-10">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 size-72 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 size-80 rounded-full bg-fuchsia-500/15 blur-3xl" />
        </div>

        <div className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">Contact</div>

        <h1 className="mt-3 text-3xl md:text-5xl font-extrabold leading-[1.08]">
          When IT feels “fine”… until it doesn’t.
        </h1>

        <p className="mt-4 text-slate-200 max-w-[78ch]">
          A lot of teams reach out after the same chain reaction: a weird login prompt, one mailbox gets compromised,
          devices start drifting out of compliance, backups haven’t been tested, and suddenly you’re fighting fires.
          If that sounds familiar — it’s not “bad luck.” It’s usually a missing baseline.
        </p>

        <div className="mt-6 grid md:grid-cols-3 gap-4 text-sm">
          {[
            ["The small signals", "Slow devices, random sign-outs, users clicking suspicious links."],
            ["The real risk", "MFA gaps, weak mail security, untested backups, patch drift."],
            ["The fix", "Stabilize baseline fast → then a simple 30–90 day plan."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="font-semibold text-slate-100">{t}</div>
              <div className="mt-1 text-slate-300">{d}</div>
            </div>
          ))}
        </div>

        {/* ✅ Conversion-first action row (WhatsApp included) */}
        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          <Link
            href={primaryAssessmentHref}
            className="rounded-lg px-4 py-2.5 text-sm font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 inline-flex items-center justify-center gap-2"
          >
            {site?.cta || "Get a Free IT Assessment"} <ArrowRight className="h-4 w-4" />
          </Link>

          <a
            href={phoneTel}
            className="rounded-lg px-4 py-2.5 text-sm font-semibold border border-white/10 bg-white/5 hover:bg-white/10 inline-flex items-center justify-center gap-2"
          >
            <Phone className="h-4 w-4 text-cyan-300" />
            Call Now
          </a>

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg px-4 py-2.5 text-sm font-semibold border border-white/10 bg-white/5 hover:bg-white/10 inline-flex items-center justify-center gap-2"
          >
            <MessageCircle className="h-4 w-4 text-cyan-300" />
            WhatsApp
          </a>

          <a
            href={mailto}
            className="rounded-lg px-4 py-2.5 text-sm font-semibold border border-white/10 bg-white/5 hover:bg-white/10 inline-flex items-center justify-center gap-2"
          >
            <Mail className="h-4 w-4 text-cyan-300" />
            Email
          </a>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <div className="text-xs text-slate-400 inline-flex items-center gap-2 px-2">
            <ShieldCheck className="h-4 w-4 text-cyan-300" />
            Remote-first MSP • Clear next steps
          </div>

          <div className="text-xs text-slate-400 inline-flex items-center gap-2 px-2">
            <Clock className="h-4 w-4 text-cyan-300" />
            Reply during business hours
          </div>
        </div>

        <div className="mt-3 text-xs text-slate-400">
          Call: <span className="text-slate-200">{phoneRaw}</span> • WhatsApp:{" "}
          <span className="text-slate-200">{whatsappRaw}</span> • Email:{" "}
          <span className="text-slate-200">{email}</span>
        </div>
      </section>

      {/* FORM + NEXT STEPS */}
      <section className="mt-8 grid lg:grid-cols-[1.05fr_0.95fr] gap-6 items-start" id="contact-form">
        <LeadFormSimple
          source={source}
          title="Send a quick message"
          sub="Tell us what’s happening — we’ll reply with the cleanest next step."
          cta="Send"
          defaultSubject="Website Contact"
        />

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">What happens next</div>
          <h2 className="mt-2 text-xl font-bold">A calm, simple process</h2>

          <ol className="mt-3 space-y-3 text-sm text-slate-300">
            <li className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <span className="text-slate-100 font-medium">1)</span> We confirm scope in 2–3 questions.
            </li>
            <li className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <span className="text-slate-100 font-medium">2)</span> You get quick wins + risk hotspots.
            </li>
            <li className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <span className="text-slate-100 font-medium">3)</span> We share a practical 30–90 day plan.
            </li>
          </ol>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link
              href={primaryAssessmentHref}
              className="w-full text-center rounded-lg px-4 py-2.5 text-sm font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 inline-flex items-center justify-center gap-2"
            >
              Free Assessment <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center rounded-lg px-4 py-2.5 text-sm font-semibold border border-white/10 bg-white/5 hover:bg-white/10 inline-flex items-center justify-center gap-2"
            >
              WhatsApp Us <MessageCircle className="h-4 w-4 text-cyan-300" />
            </a>
          </div>
        </div>
      </section>

      {/* Bottom CTA strip */}
      <section className="mt-10">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-slate-100">
              Quick next step: {site?.cta || "Free IT Assessment"}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Call <span className="text-slate-200">{phoneRaw}</span> • WhatsApp{" "}
              <span className="text-slate-200">{whatsappRaw}</span> • Email{" "}
              <span className="text-slate-200">{email}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              href={primaryAssessmentHref}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
            >
              Free Assessment <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href={phoneTel}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold border border-white/10 bg-white/5 hover:bg-white/10 transition"
            >
              <Phone className="h-4 w-4 text-cyan-300" />
              Call Now
            </a>

            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold border border-white/10 bg-white/5 hover:bg-white/10 transition"
            >
              <MessageCircle className="h-4 w-4 text-cyan-300" />
              WhatsApp
            </a>

            <a
              href={mailto}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold border border-white/10 bg-white/5 hover:bg-white/10 transition"
            >
              <Mail className="h-4 w-4 text-cyan-300" />
              Email
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
