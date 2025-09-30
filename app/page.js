"use client";
/**
 * HaziTExperts — Home
 * Local images expected:
 * /public/media/hero-1.jpg
 * /public/media/hero-2.jpg
 * /public/media/rack.jpg
 * /public/media/dashboard.jpg
 */
import { useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Shield, Server, Cloud, Wrench, Smartphone, Users, ArrowRight,
} from "lucide-react";
import { site } from "@/lib/siteConfig";
import BackToTop from "@/components/BackToTop";
import AutoBot from "@/components/AutoBot";

gsap.registerPlugin(ScrollTrigger);

/* Local <img> with guaranteed fallback SVG (no broken icons) */
function Img({ src, alt, className }) {
  const fallback =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'>
         <defs>
           <linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
             <stop offset='0' stop-color='#22d3ee'/>
             <stop offset='1' stop-color='#a855f7'/>
           </linearGradient>
         </defs>
         <rect width='1200' height='800' fill='url(#g)'/>
         <circle cx='260' cy='260' r='150' fill='rgba(255,255,255,0.12)'/>
         <rect x='640' y='430' width='420' height='220' rx='24' fill='rgba(0,0,0,0.15)'/>
       </svg>`
    );
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
      }}
      loading="lazy"
      decoding="async"
    />
  );
}

export default function HomePage() {
  useEffect(() => {
    // Hero entrance
    try {
      gsap.from(".hero-fx", {
        y: 24,
        opacity: 0,
        stagger: 0.06,
        duration: 0.7,
        ease: "power3.out",
      });
      // Section reveals
      gsap.utils.toArray(".reveal").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 80%" },
          y: 18,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      });
    } catch {}
  }, []);

  const areas =
    site.areas ?? ["Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad"];

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        {/* ambient blobs */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-20">
          <div className="absolute -top-24 -left-24 size-72 rounded-full bg-cyan-500/25 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 size-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid lg:grid-cols-2 gap-10 items-center">
          {/* Copy */}
          <div>
            <span className="hero-fx inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs md:text-sm bg-white/10 ring-1 ring-white/20">
              Next-gen Managed IT for SMEs
            </span>
            <h1 className="hero-fx text-3xl md:text-5xl font-extrabold mt-3">
              {site.tagline}
            </h1>
            <p className="hero-fx mt-4 text-base md:text-lg text-slate-200 max-w-2xl">
              24/7 helpdesk, proactive monitoring, and real security — at a fixed monthly fee.
            </p>

            <div className="hero-fx mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/get-quote"
                className="rounded-lg px-5 py-3 font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
              >
                Get a Quote
              </Link>
              <a
                href="#services"
                className="rounded-lg px-5 py-3 font-semibold bg-white/5 ring-1 ring-white/10 hover:bg-white/10 inline-flex items-center gap-2 group"
              >
                Explore services{" "}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Stats */}
            <div className="hero-fx grid md:grid-cols-3 gap-4 mt-10">
              {[
                ["<15 min", "P1 response target"],
                ["99.9%", "EDR/XDR coverage"],
                ["24/7", "Helpdesk & monitoring"],
              ].map(([k, v]) => (
                <div
                  key={v}
                  className="rounded-xl border border-white/10 bg-white/[0.06] p-4 text-center hover:border-cyan-300/30 transition"
                >
                  <div className="text-xl font-bold text-cyan-300">{k}</div>
                  <div className="text-slate-300 text-xs">{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Images (simple, stable grid) */}
          <div className="grid gap-4">
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Img
                src="/media/hero-1.jpg"
                alt="Cyber network"
                className="w-full h-56 md:h-72 object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl">
              <Img
                src="/media/hero-2.jpg"
                alt="Devices & cloud"
                className="w-full h-40 md:h-48 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="reveal max-w-6xl mx-auto px-4 mt-14">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-semibold">
              We keep your business running — and secure
            </h2>
            <p className="text-slate-300 mt-2 text-sm">
              From helpdesk to cyber, our team acts as your IT department or augments your in-house
              team with real SLAs and transparent reporting.
            </p>

            <div className="grid grid-cols-3 gap-3 mt-6">
              {[
                ["Playbooks", "Documented SOPs for repeatable results"],
                ["Visibility", "Monthly KPIs leadership actually reads"],
                ["Security-first", "Baseline hardening + EDR/XDR + backup/DR"],
              ].map(([t, d]) => (
                <div
                  key={t}
                  className="group rounded-xl border border-white/10 bg-white/5 p-4 hover:border-cyan-300/30 transition"
                >
                  <div className="font-medium text-sm">{t}</div>
                  <p className="text-slate-300 text-xs mt-1">{d}</p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:border-cyan-300/30 hover:bg-cyan-400/10 hover:text-cyan-300 transition"
              >
                Read more <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-2xl overflow-hidden border border-white/10">
              <Img
                src="/media/rack.jpg"
                alt="Rack & cabling"
                className="w-full h-56 md:h-72 object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10">
              <Img
                src="/media/dashboard.jpg"
                alt="Monitoring dashboard"
                className="w-full h-40 md:h-48 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section id="services" className="reveal max-w-6xl mx-auto px-4 mt-20">
        <h2 className="text-2xl font-semibold">
          Everything an SME needs (and nothing you don’t)
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {[
            {
              Icon: Shield,
              t: "Managed IT",
              d: "Fully-managed & co-managed helpdesk, patching, monitoring, reporting.",
              href: "/services#managed-it",
            },
            {
              Icon: Server,
              t: "Cybersecurity",
              d: "EDR/XDR, MFA/SSO, email security, backup/DR, vCISO, SOC-ready posture.",
              href: "/services#security",
            },
            {
              Icon: Cloud,
              t: "Cloud & 365/Workspace",
              d: "Migrations, identity & MDM, admin & optimization for Microsoft 365/Google.",
              href: "/services#cloud",
            },
            {
              Icon: Wrench,
              t: "Projects & Consulting",
              d: "Audits, office moves, network refresh, server/cloud work.",
              href: "/services#projects",
            },
            {
              Icon: Smartphone,
              t: "Device Management",
              d: "Windows/Mac/iOS/Android MDM, baseline hardening, app deploys.",
              href: "/services#mdm",
            },
            {
              Icon: Users,
              t: "vCIO / Strategy",
              d: "Quarterly roadmap, budget planning, measurable KPIs.",
              href: "/services#vcio",
            },
          ].map(({ Icon, t, d, href }) => (
            <div
              key={t}
              className="group p-6 rounded-2xl bg-white/[0.06] border border-white/10 hover:border-cyan-300/30 transition hover:-translate-y-1"
            >
              <div className="flex items-center gap-2">
                <span className="grid place-items-center size-9 rounded-xl bg-cyan-400/10 border border-cyan-300/20">
                  <Icon className="h-5 w-5 text-cyan-300" />
                </span>
                <h3 className="font-semibold text-lg">{t}</h3>
              </div>
              <p className="text-sm text-slate-300 mt-2">{d}</p>
              <Link
                href={href}
                className="mt-3 inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:border-cyan-300/30 hover:bg-cyan-400/10 hover:text-cyan-300 transition"
              >
                Read more{" "}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PLAN ================= */}
      <section id="plan" className="reveal max-w-6xl mx-auto px-4 mt-16">
        <h2 className="text-2xl font-semibold">HaziCare™ Managed IT Plan</h2>
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-6">
          <ul className="grid md:grid-cols-2 gap-x-8 gap-y-2 text-sm text-slate-300">
            {[
              "24/7 Helpdesk (P1 ≤ 15 min response)",
              "Patch & Update Management (OS & apps)",
              "Endpoint Security (EDR/XDR + Ransomware protection)",
              "Email Security (MFA/SSO, phishing defense)",
              "Device & MDM (Windows/Mac/Android/iOS)",
              "Microsoft 365/Google Workspace Admin",
              "Backup & Disaster Recovery (endpoints + M365/Google)",
              "Network Monitoring (Wi-Fi, switches, firewalls)",
              "vCIO: Quarterly IT strategy & roadmap",
            ].map((x) => (
              <li key={x} className="flex gap-2">
                <span>•</span>
                <span>{x}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Link
              href="/services#plan"
              className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:border-cyan-300/30 hover:bg-cyan-400/10 hover:text-cyan-300 transition"
            >
              Read more <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FAQs (preview) ================= */}
      <section id="faqs" className="reveal max-w-6xl mx-auto px-4 mt-16">
        <h2 className="text-2xl font-semibold">FAQs</h2>
        <div className="mt-4 grid md:grid-cols-3 gap-4">
          {[
            ["Fully-managed vs Co-managed?", "We can run end-to-end or augment your IT."],
            ["SLAs?", "P1 ≤ 15 min, P2 ≤ 1 hr, P3 same business day."],
            ["Tooling included?", "EDR/XDR, patching, monitoring, email security, backup/DR."],
          ].map(([q, a]) => (
            <div
              key={q}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-cyan-300/30 transition"
            >
              <div className="font-medium">{q}</div>
              <p className="text-sm text-slate-300 mt-1">{a}</p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:border-cyan-300/30 hover:bg-cyan-400/10 hover:text-cyan-300 transition"
          >
            Still confused? Ask us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ================= AREAS ================= */}
      <section id="areas" className="reveal max-w-6xl mx-auto px-4 mt-16">
        <h2 className="text-2xl font-semibold">Areas we serve</h2>
        <p className="text-slate-300 mt-2 text-sm">
          Onsite & remote support across major Pakistani cities.
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {areas.map((a) => (
            <div
              key={a}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center hover:border-cyan-300/30 transition"
            >
              {a}
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:border-cyan-300/30 hover:bg-cyan-400/10 hover:text-cyan-300 transition"
          >
            See our gallery <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section id="contact" className="reveal max-w-6xl mx-auto px-4 mt-16 mb-24">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">Ready for a no-pressure IT assessment?</h3>
            <p className="text-slate-200/80">We’ll map gaps and give you clear next steps — free.</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/get-quote"
              className="rounded-lg px-5 py-3 font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
            >
              Get Quote
            </Link>
            <Link
              href="/contact"
              className="rounded-lg px-5 py-3 font-semibold bg-white/10 ring-1 ring-white/20 hover:bg-white/20 transition"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>

      {/* Floating helpers */}
      <BackToTop />
      <AutoBot />
    </>
  );
}
