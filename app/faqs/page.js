"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Search, ChevronDown, HelpCircle, ArrowRight, MessageSquareText } from "lucide-react";

/* ---------- FAQ DATA ---------- */
const FAQS = [
  // General
  { cat: "General", q: "Fully-managed vs Co-managed — difference?", a: "Fully-managed me hum aapka end-to-end IT chalaate hain (tooling, SOPs, SLAs). Co-managed me aapki in-house team ke saath mil kar workflows aur coverage improve karte hain. Access & responsibilities clearly defined hote hain." },
  { cat: "General", q: "Kickoff kitna time leta hai?", a: "Assessment same week hota hai. Baselines (patching, EDR/XDR, MDM, backup/DR) 7–10 business din; quick wins week one me dikhte hain." },
  { cat: "General", q: "SMEs ke liye min/max user size?", a: "10 se 500+ users. Growth aur compliance needs dono me kaam karta stack aur process use karte hain." },

  // Managed IT
  { cat: "Managed IT", q: "Helpdesk channels kaun se hain?", a: "Email, chat, portal — sab central queue me aata hai. Triage SOPs, CSAT aur leadership KPIs month-end pe share hote hain." },
  { cat: "Managed IT", q: "SLAs kya hain?", a: "Priority-1 ≤ 15 min response, P2 ≤ 1 hr, P3 same business day. MTTR aur reopen rate monitor hota hai." },

  // Security
  { cat: "Security", q: "EDR/XDR coverage kitni hoti hai?", a: "HaziCare™ me 99.9% managed endpoint coverage target; isolation, investigation aur post-incident SOPs included." },
  { cat: "Security", q: "Email security me kya included hai?", a: "MFA/SSO, anti-phishing/impersonation, DKIM/SPF/DMARC hygiene, quarantine workflows, and user phishing reports." },
  { cat: "Security", q: "Backup/DR kaisay manage hota hai?", a: "Endpoints + SaaS (M365/Google) dono ka backup, retention policies aur quarterly restores drills." },

  // Cloud
  { cat: "Cloud", q: "M365/Google migration downtime?", a: "Staged cutover with rollback plan: mail flow toggle in off-hours, user comms templates, kal wapas ka option safe hota hai." },
  { cat: "Cloud", q: "License optimization?", a: "Inactive users cleanup, SKU right-sizing, storage policies — monthly review me cost & security dono optimize." },

  // Billing
  { cat: "Billing", q: "Pricing model?", a: "Per-user managed plan (HaziCare™) + à-la-carte security add-ons. Projects fixed-bid / T&M. Yearly billing par ~15% savings." },
  { cat: "Billing", q: "Contract & exit?", a: "Simple MSA/SOW. Documentation, admin handover aur playbooks export at termination — no lock-in tooling." },
];

/* ---------- Utilities ---------- */
const CATS = ["All", ...Array.from(new Set(FAQS.map(f => f.cat)))];

function normalize(s) {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}

export default function FaqsPage() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const openRefs = useRef({}); // id => HTMLDetailsElement

  // Filter + search
  const items = useMemo(() => {
    const q = normalize(query);
    return FAQS.filter(f =>
      (cat === "All" || f.cat === cat) &&
      (q === "" || normalize(f.q).includes(q) || normalize(f.a).includes(q))
    );
  }, [query, cat]);

  // Deep-link support: /faqs#q-some-slug
  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash || "");
    if (!hash.startsWith("#q-")) return;
    const id = hash.slice(1);
    const el = document.getElementById(id);
    if (el && "open" in el) {
      el.open = true;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Expand / Collapse all (current filter)
  const setAll = (open) => {
    items.forEach((f, i) => {
      const id = idFor(f, i);
      const el = openRefs.current[id];
      if (el) el.open = open;
    });
  };

  // Build JSON-LD for current list (good for SEO)
  const faqJsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  }), [items]);

  return (
    <>
      <PageHero
        eyebrow="FAQs"
        title="Quick answers, zero fluff"
        sub="Neeche frequently asked questions milengi. Agar aapka sawal yahan nahi, chat ya contact se pooch lein — 15 min me reply aim."
      />

      <section className="max-w-6xl mx-auto px-4 pb-24">
        {/* Controls */}
        <Reveal>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-5 flex flex-col md:flex-row gap-3 md:items-center">
            {/* Search */}
            <label className="flex-1 flex items-center gap-2 rounded-lg border border-white/10 bg-slate-900/50 px-3 py-2">
              <Search className="h-4 w-4 text-cyan-300" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search questions…"
                className="w-full bg-transparent outline-none text-sm"
              />
            </label>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {CATS.map(c => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`px-3 py-1.5 rounded-lg text-sm border transition
                    ${cat===c ? "border-cyan-300/30 text-cyan-300 bg-cyan-400/10"
                              : "border-white/10 text-slate-300 hover:bg-white/5"}`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Expand/Collapse */}
            <div className="ms-auto flex gap-2">
              <button onClick={() => setAll(true)} className="text-xs rounded-lg px-3 py-1.5 border border-white/10 bg-white/5 hover:bg-white/10">Expand all</button>
              <button onClick={() => setAll(false)} className="text-xs rounded-lg px-3 py-1.5 border border-white/10 bg-white/5 hover:bg-white/10">Collapse all</button>
            </div>
          </div>
        </Reveal>

        {/* Results count */}
        <div className="mt-3 text-xs text-slate-400">{items.length} result(s)</div>

        {/* List */}
        <div className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5">
          {items.map((f, i) => {
            const id = idFor(f, i);
            return (
              <Reveal key={id}>
                <details
                  id={id}
                  ref={(el) => (openRefs.current[id] = el)}
                  className="group px-4 md:px-6 py-4"
                >
                  <summary className="cursor-pointer list-none flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">{f.cat}</div>
                      <h3 className="font-medium leading-snug">{f.q}</h3>
                    </div>
                    <ChevronDown className="mt-1 h-4 w-4 shrink-0 transition group-open:rotate-180" />
                  </summary>
                  <p className="text-sm text-slate-300 mt-3">{f.a}</p>
                  <a
                    href={`#${id}`}
                    className="mt-3 inline-flex items-center gap-2 text-xs text-cyan-300"
                  >
                    Link to this answer <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </details>
              </Reveal>
            );
          })}

          {/* Empty state */}
          {items.length === 0 && (
            <div className="px-6 py-10 text-center text-slate-300">
              Nothing found. Try a different keyword or category.
            </div>
          )}
        </div>

        {/* Still need help */}
        <Reveal className="mt-10">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/15 to-fuchsia-500/15 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="h-6 w-6 text-cyan-300" />
              <div>
                <div className="text-lg font-semibold">Still got a question?</div>
                <p className="text-slate-300">We’ll answer within business hours — usually ~15 min for P1 queries.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link href="/contact" className="rounded-lg px-5 py-3 font-semibold bg-white/10 ring-1 ring-white/20 hover:bg-white/20 transition">
                Contact
              </Link>
              <Link href="/get-quote" className="rounded-lg px-5 py-3 font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition inline-flex items-center gap-2">
                Get Quote <MessageSquareText className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* JSON-LD for SEO (for current filtered list) */}
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}

/* make stable ids for deep-links */
function idFor(f, i) {
  return `q-${slug(f.q)}-${i}`;
}
function slug(s) {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
