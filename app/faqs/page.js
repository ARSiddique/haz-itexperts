// SERVER COMPONENT — FAQs (SSR with client islands for UX)
import Link from "next/link";
import Script from "next/script";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Search, ChevronDown, HelpCircle, ArrowRight, MessageSquareText } from "lucide-react";

/* ===== DATA (English only) ===== */
const FAQS = [
  { cat: "General", q: "What’s the difference between Fully-managed and Co-managed IT?", a: "Fully-managed means we run your end-to-end IT with tooling, SOPs, and SLAs. Co-managed means we augment your in-house team to improve workflows, coverage, and reporting. Roles and access are defined in the SOW." },
  { cat: "General", q: "How long does kickoff take?", a: "Discovery starts the same week. Baselines (patching, EDR/XDR, MDM, backup/DR) typically land in 7–10 business days. You’ll see quick wins in week one." },
  { cat: "General", q: "What company sizes do you support?", a: "We focus on SMB/SME teams from 10–500+ users across Wilmington, DE; Philadelphia, PA; and Allentown, PA." },

  { cat: "Managed IT", q: "Which helpdesk channels are available?", a: "Email, chat, and portal — all feed a central queue with triage SOPs and CSAT. Leadership KPIs are shared monthly." },
  { cat: "Managed IT", q: "What SLAs do you commit to?", a: "P1 ≤ 15 minutes first response, P2 ≤ 1 hour, P3 same business day. We track MTTR and reopen rate to keep quality high." },

  { cat: "Security", q: "What EDR/XDR coverage do you target?", a: "For managed endpoints we target 99.9% EDR/XDR coverage. Isolation, investigation, and post-incident SOPs are included." },
  { cat: "Security", q: "What’s included in email security?", a: "MFA/SSO, phishing/impersonation defense, DKIM/SPF/DMARC hygiene, quarantine workflows, and user-reported phishing handling." },
  { cat: "Security", q: "How do you handle backup and disaster recovery?", a: "We protect endpoints and SaaS (Microsoft 365/Google). Retention policies are set and quarterly restore drills are performed." },

  { cat: "Cloud", q: "Will our Microsoft 365/Google migration cause downtime?", a: "We use staged cutovers with rollback plans. Mail flow toggles during off-hours and user comms are templated to minimize disruption." },
  { cat: "Cloud", q: "Can you optimize our licensing costs?", a: "Yes — inactive user cleanup, SKU right-sizing, and storage policies. We review cost and security together each month." },

  { cat: "Billing", q: "How do you price managed services?", a: "Per-user managed plan (HaziCare™) plus à-la-carte security add-ons. Projects are fixed-bid or T&M. Yearly billing typically saves ~15%." },
  { cat: "Billing", q: "What does the contract and exit look like?", a: "Simple MSA/SOW. At exit we hand over documentation, admin access, and playbooks — no lock-in tooling." },
];

/* ===== helpers ===== */
const normalize = (s) => s.toLowerCase().replace(/\s+/g, " ").trim();
const slug = (s) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const cats = ["All", ...Array.from(new Set(FAQS.map((f) => f.cat)))];

export default function FaqsPage({ searchParams }) {
  const q = (searchParams?.q ?? "").toString();
  const cat = (searchParams?.cat ?? "All").toString();

  // server-side filtering
  const nq = normalize(q);
  const items = FAQS
    .map((f, i) => ({ ...f, _id: `q-${slug(f.q)}-${i}`, _nq: normalize(f.q), _na: normalize(f.a) }))
    .filter(
      (f) =>
        (cat === "All" || f.cat === cat) &&
        (nq === "" || f._nq.includes(nq) || f._na.includes(nq))
    );

  // JSON-LD for current filtered list
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  // convenience builders for links/forms
  const linkWith = (next) => {
    const params = new URLSearchParams();
    if (next.cat ?? cat) params.set("cat", next.cat ?? cat);
    if (typeof next.q === "string") {
      if (next.q) params.set("q", next.q);
    } else if (q) {
      params.set("q", q);
    }
    const qs = params.toString();
    return `/faqs${qs ? `?${qs}` : ""}`;
  };

  return (
    <>
      {/* ===== HERO ===== */}
      <PageHero
        eyebrow="FAQs"
        title="Quick answers, zero fluff"
        sub="Everything you need to know about our managed services, security, cloud, and billing."
      />

      {/* ===== CONTROLS (GET form for SSR) ===== */}
      <section className="max-w-6xl mx-auto px-4 pb-24">
        <Reveal>
          <form action="/faqs" method="get" className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-5 flex flex-col md:flex-row gap-3 md:items-center">
            {/* search (name=q) */}
            <label className="flex-1 flex items-center gap-2 rounded-lg border border-white/10 bg-slate-900/50 px-3 py-2">
              <Search className="h-4 w-4 text-cyan-300" aria-hidden="true" />
              <input
                defaultValue={q}
                name="q"
                placeholder="Search questions…"
                className="w-full bg-transparent outline-none text-sm"
                aria-label="Search FAQs"
              />
            </label>

            {/* categories (links that preserve q) */}
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="FAQ categories">
              {cats.map((c) => (
                <Link
                  key={c}
                  role="tab"
                  aria-selected={cat === c}
                  href={linkWith({ cat: c })}
                  className={`px-3 py-1.5 rounded-lg text-sm border transition ${
                    cat === c
                      ? "border-cyan-300/30 text-cyan-300 bg-cyan-400/10"
                      : "border-white/10 text-slate-300 hover:bg-white/5"
                  }`}
                >
                  {c}
                </Link>
              ))}
            </div>

            {/* submit for search when user typed */}
            <div className="ms-auto">
              <button
                type="submit"
                className="text-xs rounded-lg px-3 py-1.5 border border-white/10 bg-white/5 hover:bg-white/10"
              >
                Apply
              </button>
            </div>
          </form>
        </Reveal>

        {/* count */}
        <div className="mt-3 text-xs text-slate-400">
          {items.length} result{items.length === 1 ? "" : "s"}
        </div>

        {/* ===== LIST ===== */}
        <div className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5">
          {items.map((f) => (
            <Reveal key={f._id}>
              <details id={f._id} className="group px-4 md:px-6 py-4">
                <summary className="cursor-pointer list-none flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-medium tracking-[0.18em] text-cyan-300/80">{f.cat}</div>
                    <h3 className="font-medium leading-snug">{f.q}</h3>
                  </div>
                  <ChevronDown className="mt-1 h-4 w-4 shrink-0 transition group-open:rotate-180" />
                </summary>
                <p className="text-sm text-slate-300 mt-3">{f.a}</p>
                <a href={`#${f._id}`} className="mt-3 inline-flex items-center gap-2 text-xs text-cyan-300">
                  Link to this answer <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </details>
            </Reveal>
          ))}

          {items.length === 0 && (
            <div className="px-6 py-10 text-center text-slate-300">
              Nothing found. Try a different keyword or category.
            </div>
          )}
        </div>

        {/* ===== Still need help ===== */}
        <Reveal className="mt-10">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/15 to-fuchsia-500/15 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <HelpCircle className="h-6 w-6 text-cyan-300" />
              <div>
                <div className="text-lg font-semibold">Still have a question?</div>
                <p className="text-slate-300">We reply within business hours — usually ~15 minutes for priority questions.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link href="/contact" className="rounded-lg px-5 py-3 font-semibold bg-white/10 ring-1 ring-white/20 hover:bg-white/20 transition">Contact</Link>
              <Link href="/get-quote" className="rounded-lg px-5 py-3 font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition inline-flex items-center gap-2">
                Get Quote <MessageSquareText className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* SEO for current filtered list */}
      <Script id="faq-jsonld" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Small client helpers: expand/collapse & open deep-links */}
      <FaqClientHelpers />
    </>
  );
}

/* ===== Tiny client island ===== */
function FaqClientHelpers() {
  return (
    <script
      // inlined, tiny: expand/collapse + deep-link open
      dangerouslySetInnerHTML={{
        __html: `
(function(){
  // open deep-linked answer
  var hash = decodeURIComponent(location.hash||"");
  if (hash.startsWith("#q-")) {
    var el = document.getElementById(hash.slice(1));
    if (el && "open" in el) el.open = true;
  }
  // add keyboard shortcuts: [e]xpand / [c]ollapse (optional)
  document.addEventListener("keydown", function(e){
    if (!e.altKey && !e.ctrlKey && !e.metaKey) {
      if (e.key.toLowerCase()==="e") toggleAll(true);
      if (e.key.toLowerCase()==="c") toggleAll(false);
    }
  });
  function toggleAll(state){
    document.querySelectorAll("details").forEach(function(d){ d.open = state; });
  }
})();`,
      }}
    />
  );
}
