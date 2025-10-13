// app/services/page.jsx
// ─────────────────────────────────────────────────────────────────────────────
// SERVER COMPONENT (SSR). Interactivity lives in small client islands:
// - <ServicesTabs /> for deep-dives
// - <PricingRoi /> for pricing/ROI
// We pass a plain JSON copy (servicesForClient) to client components.
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ServicesTabs from "@/components/ServicesTabs";
import PricingRoi from "@/components/PricingRoi";
import {
  Shield, Server, Cloud, Wrench, Smartphone, Users,
  ArrowRight, ChevronRight, Sparkles,
  Building2, CloudCog, Network, LineChart
} from "lucide-react";

/* small server-safe helper */
const Badge = ({ children, tone = "cyan" }) => (
  <span
    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium border
      ${tone==="cyan" ? "text-cyan-300 border-cyan-300/30 bg-cyan-400/10"
                      : "text-fuchsia-300 border-fuchsia-300/30 bg-fuchsia-400/10"}`}
  >
    {children}
  </span>
);

export default async function ServicesPage() {
  // ── Source of truth for services (now includes `href` for deep pages)
  const services = [
    {
      key: "managed",
      icon: Shield,
      title: "Managed IT",
      desc: "Helpdesk, patching, monitoring, reporting with SLAs.",
      bullets: ["Helpdesk workflows", "Proactive maintenance", "Leadership KPIs"],
      deep: [
        ["Helpdesk", "Omni-channel (email/chat/portal), triage SOPs, CSAT."],
        ["Patch Management", "OS & app updates with pilot rings and rollback."],
        ["Monitoring", "Endpoints, servers, network, and cloud signals."],
      ],
      href: "/services/managed-it",
    },
    {
      key: "security",
      icon: Server,
      title: "Cybersecurity",
      desc: "EDR/XDR, MFA/SSO, email security, backup/DR, vCISO.",
      bullets: ["EDR/XDR coverage", "Identity hardening", "BCP/DR playbooks"],
      deep: [
        ["EDR/XDR", "Managed detections, isolation, post-incident SOPs."],
        ["Identity", "MFA/SSO, conditional access, least-privilege."],
        ["Email", "Anti-spoofing/phishing, impersonation protection."],
      ],
      href: "/services/cybersecurity",
    },
    {
      key: "cloud",
      icon: Cloud,
      title: "Cloud & 365/Workspace",
      desc: "Migrations, identity, MDM, cost optimization.",
      bullets: ["Tenant security", "License hygiene", "Automation"],
      deep: [
        ["Migrations", "Cutover or hybrid with comms plan and rollback."],
        ["Governance", "Secure baselines, DLP, retention, logging."],
        ["FinOps", "License cleanup, storage policies, rightsizing."],
      ],
      href: "/services/cloud-workspace",
    },
    {
      key: "projects",
      icon: Wrench,
      title: "Projects & Consulting",
      desc: "Audits, office moves, network refresh, server/cloud.",
      bullets: ["Zero-trust rollout", "Network redesign", "Server refresh"],
      deep: [
        ["Audits", "Infrastructure, security & process scorecards."],
        ["Moves", "ISP, cabling, Wi-Fi heat maps, cutover plans."],
        ["Servers", "AD, file/print, virtualization, backup/DR."],
      ],
      href: "/services/projects-consulting",
    },
    {
      key: "mdm",
      icon: Smartphone,
      title: "Device Management",
      desc: "Windows/Mac/iOS/Android baselines and app deploys.",
      bullets: ["Baseline config", "Compliance checks", "App catalogs"],
      deep: [
        ["Baselines", "CIS-aligned controls per platform."],
        ["Provisioning", "Autopilot/ABM zero-touch rollouts."],
        ["Health", "Drift detection, remediations, reporting."],
      ],
      href: "/services/device-management",
    },
    {
      key: "vcio",
      icon: Users,
      title: "vCIO / Strategy",
      desc: "Quarterly roadmap, budget planning, measurable KPIs.",
      bullets: ["Roadmaps", "Budgeting", "Risk register"],
      deep: [
        ["Roadmap", "Quarterly OKRs tied to business outcomes."],
        ["KPIs", "Board-friendly scorecards and actions."],
        ["Vendors", "Stack review, contracts, consolidation."],
      ],
      href: "/services/vcio-strategy",
    },
  ];

  // ── Plain JSON copy for client islands (now includes `href`)
  const servicesForClient = services.map(({ key, title, desc, bullets, deep, href }) => ({
    key, title, desc, bullets, deep, href,
  }));

  return (
    <>
      {/* =====================================================================
         HERO
         ===================================================================== */}
      <PageHero
        eyebrow="Services"
        title="Everything you need for reliable, secure IT"
        sub="Choose fully-managed or co-managed. Start with HaziCare™ and plug security modules as you grow."
      />

      {/* =====================================================================
         STICKY IN-PAGE NAV
         ===================================================================== */}
      <nav className="sticky top-14 z-20 bg-gradient-to-b from-slate-950/90 to-slate-950/70 backdrop-blur border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-2 flex flex-wrap gap-2">
          {services.map((s) => (
            <a
              key={s.key}
              href={`#${s.key}`}
              className="text-xs md:text-sm rounded-lg px-3 py-1.5 border border-white/10 text-slate-300 hover:text-cyan-300 hover:border-cyan-300/30"
            >
              {s.title}
            </a>
          ))}
          <span className="ms-auto">
            <Link
              href="/get-quote"
              className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
            >
              Get Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </span>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-4 pb-24">
        {/* ===================================================================
           GRID OF SERVICES (overview cards) — now clickable to deep pages
           =================================================================== */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {services.map(({ key, icon: Icon, title, desc, bullets, href }) => (
            <Reveal key={key}>
              <Link
                id={key}
                href={href}
                className="block group p-6 rounded-2xl bg-gradient-to-br from-white/6 to-white/[0.03] border border-white/10 hover:border-cyan-300/30 transition relative overflow-hidden"
              >
                <div className="absolute -right-10 -top-10 size-36 rounded-full bg-cyan-500/10 blur-2xl group-hover:scale-125 transition" />
                <div className="flex items-center gap-3">
                  <span className="grid place-items-center size-10 rounded-xl bg-cyan-400/10 border border-cyan-300/20">
                    <Icon className="h-5 w-5 text-cyan-300" />
                  </span>
                  <h3 className="font-semibold text-lg">{title}</h3>
                  <Badge>Included in HaziCare™</Badge>
                </div>
                <p className="text-sm text-slate-300 mt-2">{desc}</p>
                <ul className="mt-3 space-y-1">
                  {bullets.map((b) => (
                    <li key={b} className="text-sm text-slate-300 flex gap-2">
                      <Sparkles className="h-4 w-4 text-cyan-300" /> {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 inline-flex items-center gap-2 text-sm text-cyan-300">
                  View details <ChevronRight className="h-4 w-4" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* ===================================================================
           DEEP-DIVES (client island tabs) — can also link out using href
           =================================================================== */}
        <Reveal className="mt-14">
          <ServicesTabs services={servicesForClient} />
        </Reveal>

        {/* ===================================================================
           PRICING & ROI (client island)
           =================================================================== */}
        <Reveal className="mt-14">
          <PricingRoi />
        </Reveal>

        {/* ===================================================================
           PLAN MATRIX
           =================================================================== */}
        <Reveal className="mt-14">
          <div className="rounded-2xl border border-white/10 overflow-x-auto">
            <table className="min-w-[720px] w-full text-sm">
              <thead className="bg-white/5">
                <tr>
                  <th className="text-left p-3">Capability</th>
                  <th className="p-3">HaziCare™</th>
                  <th className="p-3">Add-on</th>
                  <th className="p-3">Project</th>
                </tr>
              </thead>
              <tbody className="[&>tr:nth-child(even)]:bg-white/[0.03]">
                {[
                  ["Helpdesk & SLAs", "•", "", ""],
                  ["Patching & Monitoring", "•", "", ""],
                  ["EDR/XDR Baseline", "•", "", ""],
                  ["Email Security+", "", "•", ""],
                  ["Backup/DR (SaaS + endpoints)", "", "•", ""],
                  ["Identity Hardening / SSO", "", "•", ""],
                  ["Audits / Migrations / Moves", "", "", "•"],
                ].map(([cap, a, b, c]) => (
                  <tr key={cap}>
                    <td className="p-3">{cap}</td>
                    <td className="text-center p-3">{a && "✅"}</td>
                    <td className="text-center p-3">{b && "🧩"}</td>
                    <td className="text-center p-3">{c && "🛠️"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* ===================================================================
           PROCESS (compact)
           =================================================================== */}
        <Reveal className="mt-14">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">How we start</div>
            <h3 className="text-xl font-semibold mt-1">Predictable onboarding</h3>
            <ol className="relative border-s border-white/10 ps-6 mt-4 space-y-6">
              {[
                [Building2, "Assess", "Light discovery: users, devices, identity, risks."],
                [CloudCog, "Stabilize", "Patching, EDR/XDR, baselines, backup/DR."],
                [Network, "Optimize", "SLAs, workflows, reporting, roadmap alignment."],
                [LineChart, "Grow", "New hires, office moves, projects — no chaos."],
              ].map(([Icon, t, d]) => (
                <li key={t} className="ms-2">
                  <span className="absolute -start-3.5 mt-1 grid place-items-center size-6 rounded-full bg-cyan-400/20 border border-cyan-300/40">
                    <Icon className="h-3.5 w-3.5 text-cyan-300" />
                  </span>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="font-medium">{t}</div>
                    <p className="text-slate-300 text-sm mt-0.5">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        {/* ===================================================================
           FAQs
           =================================================================== */}
        <Reveal className="mt-14">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold">FAQs</h3>
            <div className="mt-4 divide-y divide-white/10">
              {[
                ["Fully-managed vs co-managed?", "We can run end-to-end or augment your in-house IT. Access, tooling, and SOPs are aligned either way."],
                ["SLA details?", "P1 ≤ 15 min, P2 ≤ 1 hr, P3 same business day. Monthly KPI reports for leadership."],
                ["What tooling is included?", "EDR/XDR, patching, monitoring, email security, backup/DR — plus MDM baselines."],
              ].map(([q, a]) => (
                <details key={q} className="py-3 group">
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-2">
                    <span className="font-medium">{q}</span>
                    <svg className="h-4 w-4 transition group-open:rotate-180" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 15.5 6.5 10l1.4-1.4L12 12.7l4.1-4.1L17.5 10z" />
                    </svg>
                  </summary>
                  <p className="text-sm text-slate-300 mt-2">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ===================================================================
           CTA
           =================================================================== */}
        <Reveal className="mt-14">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/15 to-fuchsia-500/15 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">Ready for a no-pressure IT assessment?</h3>
              <p className="text-slate-300">We’ll map gaps and give you clear next steps — free.</p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/get-quote"
                className="rounded-lg px-5 py-3 font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
              >
                Get Quote
              </Link>
              <Link
                href="/contact"
                className="rounded-lg px-5 py-3 font-semibold bg-white/10 ring-1 ring-white/20 hover:bg-white/20"
              >
                Contact us
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
