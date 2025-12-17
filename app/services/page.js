// app/services/page.js
// SERVER COMPONENT

import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ServicesTabs from "@/components/ServicesTabs";
import PricingRoi from "@/components/PricingRoi";
import {
  Shield,
  Server,
  Cloud,
  Wrench,
  Smartphone,
  Users,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Building2,
  CloudCog,
  Network,
  LineChart,
} from "lucide-react";

// ---- SEO (static; no client code needed)
export async function generateMetadata() {
  const title = "Managed IT Services & Cybersecurity | Supreme IT Experts";
  const description =
    "Helpdesk, patching, monitoring, cybersecurity (EDR/XDR, backup/DR, email security), cloud and device management — fully managed or co-managed for SMBs in Allentown and the Lehigh Valley.";
  return {
    title,
    description,
    alternates: { canonical: "/services" },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      type: "website",
      url: "/services",
      images: ["/og-image.png?v=7"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png?v=7"],
    },
  };
}

/* small server-safe helper */
const Badge = ({ children, tone = "cyan" }) => (
  <span
    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium border
      ${
        tone === "cyan"
          ? "text-cyan-300 border-cyan-300/30 bg-cyan-400/10"
          : "text-fuchsia-300 border-fuchsia-300/30 bg-fuchsia-400/10"
      }`}
  >
    {children}
  </span>
);

export default async function ServicesPage() {
  // ── Source of truth for services (includes `href` for deep pages)
  const services = [
    {
      key: "managed",
      icon: Shield,
      title: "Managed IT",
      desc: "Helpdesk, patching, monitoring, and reporting with SLAs.",
      bullets: ["Helpdesk workflows", "Proactive maintenance", "Leadership KPIs"],
      deep: [
        ["Helpdesk", "Omni-channel (email/chat/portal), triage SOPs, and CSAT."],
        ["Patch Management", "OS and app updates with pilot rings and rollback plans."],
        ["Monitoring", "Endpoints, servers, network, and cloud signals."],
      ],
      href: "/services/managed-it",
    },
    {
      key: "security",
      icon: Server,
      title: "Cybersecurity",
      desc: "EDR/XDR, MFA/SSO, email security, backup/DR, and vCISO.",
      bullets: ["EDR/XDR coverage", "Identity hardening", "BCP/DR playbooks"],
      deep: [
        ["EDR/XDR", "Managed detections, isolation, and post-incident SOPs."],
        ["Identity", "MFA/SSO, conditional access, and least privilege."],
        ["Email", "Anti-spoofing/phishing plus impersonation protection."],
      ],
      href: "/services/cybersecurity",
    },
    {
      key: "cloud",
      icon: Cloud,
      title: "Cloud & 365/Workspace",
      desc: "Migrations, identity, MDM, and cost optimization.",
      bullets: ["Tenant security", "License hygiene", "Automation"],
      deep: [
        ["Migrations", "Cutover or hybrid with a comms plan and rollback."],
        ["Governance", "Secure baselines, DLP, retention, and logging."],
        ["FinOps", "License cleanup, storage policies, and rightsizing."],
      ],
      href: "/services/cloud-workspace",
    },
    {
      key: "projects",
      icon: Wrench,
      title: "Projects & Consulting",
      desc: "Audits, office moves, network refresh, and server/cloud projects.",
      bullets: ["Zero-trust rollout", "Network redesign", "Server refresh"],
      deep: [
        ["Audits", "Infrastructure, security, and process scorecards."],
        ["Moves", "ISP, cabling, Wi-Fi heat maps, and cutover plans."],
        ["Servers", "AD, file/print, virtualization, and backup/DR."],
      ],
      href: "/services/projects-consulting",
    },
    {
      key: "mdm",
      icon: Smartphone,
      title: "Device Management",
      desc: "Windows/Mac/iOS/Android baselines and app deployments.",
      bullets: ["Baseline config", "Compliance checks", "App catalogs"],
      deep: [
        ["Baselines", "CIS-aligned controls per platform."],
        ["Provisioning", "Autopilot/ABM zero-touch rollouts."],
        ["Health", "Drift detection, remediations, and reporting."],
      ],
      href: "/services/device-management",
    },
    {
      key: "vcio",
      icon: Users,
      title: "vCIO / Strategy",
      desc: "Quarterly roadmap, budget planning, and measurable KPIs.",
      bullets: ["Roadmaps", "Budgeting", "Risk register"],
      deep: [
        ["Roadmap", "Quarterly OKRs tied to business outcomes."],
        ["KPIs", "Board-friendly scorecards and action plans."],
        ["Vendors", "Stack review, contracts, and consolidation."],
      ],
      href: "/services/vcio-strategy",
    },
  ];

  // ── Plain JSON copy for client islands (includes `href`)
  const servicesForClient = services.map(({ key, title, desc, bullets, deep, href }) => ({
    key,
    title,
    desc,
    bullets,
    deep,
    href,
  }));

  return (
    <>
      {/* Breadcrumb JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://supremeitexperts.com/" },
              { "@type": "ListItem", position: 2, name: "Services", item: "https://supremeitexperts.com/services" },
            ],
          }),
        }}
      />

      {/* HERO */}
      <PageHero
        eyebrow="Services"
        title="Everything you need for reliable, secure IT"
        sub="Choose fully managed or co-managed. Start with SupremeCare™ Core and add security modules as you scale."
      />

      {/* Short intro with internal links */}
      <section className="max-w-6xl mx-auto px-4 pt-4 pb-6 text-sm text-slate-300 space-y-2">
        <p>
          This page gives you a high-level view of our{" "}
          <Link href="/services/managed-it" className="text-cyan-300 hover:underline">
            Managed IT
          </Link>{" "}
          and{" "}
          <Link href="/services/cybersecurity" className="text-cyan-300 hover:underline">
            Cybersecurity
          </Link>{" "}
          programs, plus cloud, device management, and vCIO strategy.
        </p>
        <p>
          To see where we can come onsite, visit{" "}
          <Link href="/areas" className="text-cyan-300 hover:underline">
            Areas we serve
          </Link>
          . For common questions, check the{" "}
          <Link href="/faqs" className="text-cyan-300 hover:underline">
            FAQs
          </Link>{" "}
          page, or go straight to{" "}
          <Link href="/get-quote" className="text-cyan-300 hover:underline">
            Get a Quote
          </Link>{" "}
          or{" "}
          <Link href="/contact" className="text-cyan-300 hover:underline">
            Contact
          </Link>
          .
        </p>
      </section>

      {/* STICKY IN-PAGE NAV */}
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
              Get a Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </span>
        </div>
      </nav>

      {/* ✅ semantic main */}
      <main className="max-w-6xl mx-auto px-4 pb-24">
        {/* OVERVIEW */}
        <section aria-labelledby="services-overview" className="mt-10">
          <h2 id="services-overview" className="text-2xl md:text-3xl font-semibold">
            Service overview
          </h2>
          <p className="mt-2 text-sm text-slate-300 max-w-3xl">
            Click any service to view full details, deliverables, and what’s included.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {services.map(({ key, icon: Icon, title, desc, bullets, href }) => (
              <Reveal key={key}>
                <div id={key}>
                  <Link
                    href={href}
                    className="block group p-6 rounded-2xl bg-gradient-to-br from-white/6 to-white/[0.03] border border-white/10 hover:border-cyan-300/30 transition relative overflow-hidden"
                    aria-label={`${title} details`}
                  >
                    <div className="absolute -right-10 -top-10 size-36 rounded-full bg-cyan-500/10 blur-2xl group-hover:scale-125 transition" />
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="grid place-items-center size-10 rounded-xl bg-cyan-400/10 border border-cyan-300/20">
                        <Icon className="h-5 w-5 text-cyan-300" />
                      </span>

                      {/* ✅ H3 under page H1 */}
                      <h3 className="font-semibold text-lg">{title}</h3>

                      <Badge>Included in SupremeCare™ Core</Badge>
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
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* DEEP-DIVES */}
        <section aria-labelledby="services-deepdives" className="mt-14">
          <h2 id="services-deepdives" className="text-2xl md:text-3xl font-semibold">
            Deep dives
          </h2>
          <p className="mt-2 text-sm text-slate-300 max-w-3xl">
            Compare service deliverables and see what changes as you add modules.
          </p>

          <Reveal className="mt-6">
            <ServicesTabs services={servicesForClient} />
          </Reveal>
        </section>

        {/* PRICING & ROI */}
        <section aria-labelledby="services-pricing" className="mt-14">
          <h2 id="services-pricing" className="text-2xl md:text-3xl font-semibold">
            Pricing & ROI
          </h2>
          <Reveal className="mt-6">
            <PricingRoi />
          </Reveal>
        </section>

        {/* PLAN MATRIX */}
        <section aria-labelledby="services-matrix" className="mt-14">
          <h2 id="services-matrix" className="text-2xl md:text-3xl font-semibold">
            What’s included
          </h2>

          <Reveal className="mt-6">
            <div className="rounded-2xl border border-white/10 overflow-x-auto">
              <table className="min-w-[720px] w-full text-sm">
                <thead className="bg-white/5">
                  <tr>
                    <th className="text-left p-3">Capability</th>
                    <th className="p-3">SupremeCare™</th>
                    <th className="p-3">Add-on</th>
                    <th className="p-3">Project</th>
                  </tr>
                </thead>
                <tbody className="[&>tr:nth-child(even)]:bg-white/[0.03]">
                  {[
                    ["Helpdesk & SLAs", true, false, false],
                    ["Patching & Monitoring", true, false, false],
                    ["EDR/XDR Baseline", true, false, false],
                    ["Email Security+", false, true, false],
                    ["Backup/DR (SaaS + endpoints)", false, true, false],
                    ["Identity Hardening / SSO", false, true, false],
                    ["Audits / Migrations / Moves", false, false, true],
                  ].map(([cap, a, b, c]) => (
                    <tr key={cap}>
                      <td className="p-3">{cap}</td>
                      <td className="text-center p-3">{a ? "✅" : ""}</td>
                      <td className="text-center p-3">{b ? "🧩" : ""}</td>
                      <td className="text-center p-3">{c ? "🛠️" : ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>

        {/* PROCESS */}
        <section aria-labelledby="services-process" className="mt-14">
          <h2 id="services-process" className="text-2xl md:text-3xl font-semibold">
            How we start
          </h2>

          <Reveal className="mt-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">
                Onboarding
              </div>
              <h3 className="text-xl font-semibold mt-1">Predictable onboarding</h3>

              <ol className="relative border-s border-white/10 ps-6 mt-4 space-y-6">
                {[
                  [Building2, "Assess", "Light discovery: users, devices, identity, and risks."],
                  [CloudCog, "Stabilize", "Patching, EDR/XDR, secure baselines, and backup/DR."],
                  [Network, "Optimize", "SLAs, workflows, reporting, and roadmap alignment."],
                  [LineChart, "Grow", "New hires, office moves, and projects — without chaos."],
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
        </section>

        {/* FAQs */}
        <section aria-labelledby="services-faq" className="mt-14">
          <h2 id="services-faq" className="text-2xl md:text-3xl font-semibold">
            Quick FAQs
          </h2>

          <Reveal className="mt-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mt-1 divide-y divide-white/10">
                {[
                  [
                    "Fully managed vs co-managed?",
                    "We can run IT end-to-end or augment your in-house team. Access, tooling, and SOPs are aligned either way.",
                  ],
                  [
                    "SLA details?",
                    "P1 ≤ 15 minutes, P2 ≤ 1 hour, P3 same business day. Monthly KPI reports for leadership.",
                  ],
                  [
                    "What tooling is included?",
                    "EDR/XDR, patching, monitoring, email security, backup/DR, and MDM baselines — with clear reporting.",
                  ],
                ].map(([q, a]) => (
                  <details key={q} className="py-3 group">
                    <summary className="cursor-pointer list-none flex items-center justify-between gap-2">
                      <span className="font-medium">{q}</span>
                      <svg
                        className="h-4 w-4 transition group-open:rotate-180"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 15.5 6.5 10l1.4-1.4L12 12.7l4.1-4.1L17.5 10z" />
                      </svg>
                    </summary>
                    <p className="text-sm text-slate-300 mt-2">{a}</p>
                  </details>
                ))}
              </div>

              <p className="mt-4 text-sm text-slate-400">
                For more questions, visit the{" "}
                <Link href="/faqs" className="text-cyan-300 hover:underline">
                  FAQs page
                </Link>{" "}
                or{" "}
                <Link href="/contact" className="text-cyan-300 hover:underline">
                  contact us
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </section>

        {/* CTA */}
        <section aria-labelledby="services-cta" className="mt-14">
          <h2 id="services-cta" className="text-2xl md:text-3xl font-semibold">
            Next step
          </h2>

          <Reveal className="mt-6">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/15 to-fuchsia-500/15 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">Ready for a no-pressure IT assessment?</h3>
                <p className="text-slate-300">
                  We’ll map gaps and share clear next steps for your business in Allentown, the Lehigh Valley, and beyond.
                </p>
              </div>

              <div className="flex gap-3">
                <Link
                  href="/get-quote"
                  className="rounded-lg px-5 py-3 font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
                >
                  Get a Quote
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
      </main>
    </>
  );
}
