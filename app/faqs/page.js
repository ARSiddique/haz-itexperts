// app/faqs/page.js
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/siteConfig";

// --- SEO (server-side)
export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/faqs`;

  // Keep brand out (layout template already adds it)
  const title = "FAQs — IT Support in Allentown, Macungie & Emmaus";
  const description =
    "Real-world IT answers for local small businesses in Allentown, Macungie & Emmaus — Wi-Fi drops, VoIP issues, M365 cleanup, phishing, backups, onboarding, and managed IT.";

  const ogImage = `${baseUrl}/og-image.png?v=7`;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
      siteName: brand,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${brand} — FAQs` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

// ✅ Local pain-point FAQs (Allentown / Macungie / Emmaus)
const FAQS = [
  {
    q: "Our Wi-Fi is slow or drops in parts of the office. What usually causes that?",
    a: "Most often it’s poor access point placement, channel interference, old Wi-Fi standards, or bad cabling/switch ports. We do a quick walkthrough + signal check, confirm AP settings, and fix the root cause (coverage, channels, VLANs, cabling, or a targeted refresh).",
  },
  {
    q: "Calls keep dropping (VoIP) or phones sound robotic. Is it the internet?",
    a: "Sometimes — but common causes are Wi-Fi congestion, jitter/packet loss, lack of QoS, or overloaded network gear. We measure latency/jitter, apply QoS, separate voice traffic, and stabilize the local network so calls stay clear.",
  },
  {
    q: "We have random internet outages. What can we do besides “calling the ISP”?",
    a: "We monitor the circuit to prove where the failure happens, check modem/router health, and add resilience (LTE/5G failover, dual-WAN, better DNS). You get outage logs that help the ISP fix the real issue faster — and you’re not fully down while waiting.",
  },
  {
    q: "Is onsite IT support available in Macungie and Emmaus?",
    a: "Yes. We support businesses across Allentown, Macungie, and Emmaus with remote helpdesk plus onsite visits when it makes sense (network issues, hardware swaps, installs, moves).",
  },
  {
    q: "Do you support small businesses without an internal IT person?",
    a: "Yes. That’s common. We handle helpdesk, monitoring, patching, onboarding/offboarding, backups, and security baselines — and provide leadership reporting so you always know what’s happening.",
  },
  {
    q: "We already have an internal IT person. Can you still help?",
    a: "Yes — co-managed IT. We can cover monitoring/patching, security tooling, documentation, and escalations so your internal IT has stronger coverage and fewer fires.",
  },
  {
    q: "How do you handle response times and urgent issues?",
    a: "We triage every ticket, prioritize business-impact issues first, and follow clear SLAs. Critical problems get fast response targets with continuous updates until resolved.",
  },
  {
    q: "We got a suspicious email / staff clicked something. What should we do first?",
    a: "Stop the chain quickly: disconnect the device if needed, reset passwords, revoke sessions, and check mailbox rules/forwarders. Then we investigate endpoints + email logs to contain impact and prevent repeat attempts.",
  },
  {
    q: "Is MFA enough to stop hacks?",
    a: "MFA is essential — but real protection is layered: admin hygiene, secure device posture, email protection, monitoring, and tested recovery. Most incidents are multi-step, so defense must be multi-layer too.",
  },
  {
    q: "Our Microsoft 365 got messy — too many admins, shared passwords, weird mailbox rules. Can you fix it?",
    a: "Yes. We clean up admin roles, enforce MFA, remove risky mailbox rules/forwarders, standardize access, and tighten security settings. Then we document standards so it stays clean long-term.",
  },
  {
    q: "Backups are running… but how do we know restores will work?",
    a: "We schedule restore tests and document the results (what was restored, how long it took, what’s missing). That turns backups into a predictable recovery plan instead of hope.",
  },
  {
    q: "Employees use personal phones (BYOD). Can we protect company data without spying on them?",
    a: "Yes. We use app protection + conditional access so company data stays inside approved apps, with the ability to wipe company data only — without taking over the person’s entire phone.",
  },
  {
    q: "New laptops take forever to set up. Can you standardize onboarding?",
    a: "Yes. We standardize builds using zero-touch enrollment (where possible) and a repeatable checklist: accounts, MFA, baseline security, apps, printers, and access — so new hires are productive faster.",
  },
  {
    q: "We’re in an older building and network issues keep coming back. What’s the right fix?",
    a: "Older cabling, weak switch ports, and patch-panel issues cause “recurring” problems. We validate cabling/switch health, document the network, and fix the weak links first (targeted cabling, switch refresh, better Wi-Fi placement).",
  },
  {
    q: "Can you help with office moves, network refresh, or migrations after-hours?",
    a: "Yes. We plan change windows (evenings/weekends), document rollback steps, and verify acceptance checks so business disruption stays low.",
  },
  {
    q: "Do you manage Windows, Mac, iOS, and Android devices?",
    a: "Yes. We manage enrollment, baseline security, patching, app deployment, and compliance reporting across Windows/macOS plus mobile device controls for iOS/Android.",
  },
  {
    q: "We have remote staff and shared tools. How do we keep access secure?",
    a: "We secure identity first: MFA, conditional access, least privilege, secure device posture, and shared access standards. We also lock down file sharing and monitor risky sign-ins.",
  },
  {
    q: "We’re a medical or dental office — how do you reduce downtime and security risk without slowing staff?",
    a: "We prioritize stability: reliable networking, fast support, predictable patch windows, backups with restore tests, and practical security baselines that don’t block daily workflow.",
  },
  {
    q: "We’re a law firm — how do you protect client data and stop account takeovers?",
    a: "We harden email/identity, tighten admin roles, enforce MFA, protect endpoints, and monitor suspicious sign-ins. We also secure file sharing and ensure recovery is tested.",
  },
  {
    q: "We run a warehouse/logistics operation — Wi-Fi scanners and devices keep disconnecting. Can you fix it?",
    a: "Yes. Warehouses often need proper AP density, roaming tuning, and interference control. We map coverage, tune AP settings, and stabilize roaming so scanners stay connected.",
  },
  {
    q: "How do we get started if we’re not sure what we need?",
    a: "Start with a quick call. We’ll ask a few practical questions (users/devices, pain points, risk) and recommend the best next step — assessment, cleanup, or onboarding.",
  },
];

// ✅ Small “boost” cards data
const POPULAR_SERVICES = [
  { title: "Managed IT Services", desc: "Helpdesk, monitoring, patching, and reporting.", href: "/services/managed-it" },
  { title: "Cybersecurity", desc: "MFA/identity, EDR/XDR, email protection, backup/DR.", href: "/services/cybersecurity" },
  { title: "Device Management (MDM)", desc: "Windows/Mac/iOS/Android enrollment + compliance.", href: "/services/device-management" },
  { title: "Projects & Consulting", desc: "Network refresh, migrations, audits, office moves.", href: "/services/projects-consulting" },
  { title: "vCIO / IT Strategy", desc: "Roadmaps, budgets, vendor reviews, KPIs.", href: "/services/vcio-strategy" },
  { title: "Cloud Workspace", desc: "Modern collaboration and secure remote work.", href: "/services/cloud-workspace" },
];

const AREAS_WE_SERVE = [
  { title: "Allentown, PA", desc: "Local IT support and managed services.", href: "/locations/allentown-pa" },
  { title: "Macungie, PA", desc: "Onsite + remote support options.", href: "/locations/macungie-pa" },
  { title: "Emmaus, PA", desc: "Security + stability for SMBs.", href: "/locations/emmaus-pa" },
  { title: "Lehigh Valley", desc: "Coverage across nearby towns.", href: "/areas" },
];

function BoostCard({ title, desc, href }) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/[0.07] transition flex items-start justify-between gap-3"
    >
      <div>
        <div className="font-semibold">{title}</div>
        <p className="mt-1 text-sm text-slate-300 leading-6">{desc}</p>
      </div>
      <span className="text-slate-400 group-hover:text-cyan-300 transition">→</span>
    </Link>
  );
}

export default function FaqsPage() {
  const baseUrl = (site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/faqs`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${canonical}#faq`,
    mainEntity: FAQS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
      { "@type": "ListItem", position: 2, name: "FAQs", item: canonical },
    ],
  };

  return (
    <>
      {/* Breadcrumbs JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }} />
      {/* FAQPage JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <PageHero
        eyebrow="FAQs"
        title="Local IT questions, answered"
        sub="Real-world answers for small businesses in Allentown, Macungie & Emmaus."
      />

      {/* ✅ Wider + more open layout */}
      <main className="max-w-6xl mx-auto px-4 pb-24">
        <section className="mt-6 grid gap-8 lg:grid-cols-[360px_1fr]">
          {/* LEFT: Boosts (sticky on desktop) */}
          <aside className="space-y-6 lg:sticky lg:top-24 self-start">
            {/* Boost #1 */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-300/80">
                Popular in Allentown area
              </div>
              <h2 className="mt-2 text-xl font-extrabold">Most requested services</h2>
              <p className="mt-2 text-sm text-slate-300 leading-6">
                Quick shortcuts to service pages businesses in Allentown, Macungie, and Emmaus ask about most.
              </p>

              <div className="mt-5 grid gap-3">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
                >
                  View all services →
                </Link>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  {POPULAR_SERVICES.map((s) => (
                    <BoostCard key={s.href} {...s} />
                  ))}
                </div>
              </div>
            </div>

            {/* Boost #2 */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-xs uppercase tracking-[0.18em] text-emerald-300/80">
                Service coverage
              </div>
              <h2 className="mt-2 text-xl font-extrabold">Areas we serve</h2>
              <p className="mt-2 text-sm text-slate-300 leading-6">
                Local coverage details, next steps, and what support looks like in your area.
              </p>

              <div className="mt-5 grid gap-3">
                {AREAS_WE_SERVE.map((a) => (
                  <BoostCard key={a.href} {...a} />
                ))}
                <Link
                  href="/areas"
                  className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm border border-emerald-300/30 text-emerald-300 bg-emerald-400/10 hover:bg-emerald-400/20 transition"
                >
                  View all areas →
                </Link>
              </div>
            </div>
          </aside>

          {/* RIGHT: FAQs */}
          <div>
            <div className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
              {FAQS.map((item) => (
                <details key={item.q} className="group border-b border-white/10 last:border-b-0">
                  <summary className="cursor-pointer list-none px-6 py-5 md:px-8 md:py-6 flex items-center justify-between gap-4">
                    <h3 className="font-semibold text-base md:text-lg leading-snug">{item.q}</h3>
                    <span className="text-xs text-slate-400 group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <div className="px-6 pb-6 md:px-8 md:pb-7 -mt-2">
                    <p className="text-sm md:text-base text-slate-300 leading-7">{item.a}</p>
                  </div>
                </details>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-7 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
              <div>
                <p className="text-base text-slate-200 font-semibold">Didn’t find your question?</p>
                <p className="text-sm text-slate-300 mt-1 leading-6">
                  Send us a message and we’ll point you to the right next step.
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  Fast reply during business hours — and emergency support is available.
                </p>
              </div>

              <div className="flex gap-3 flex-wrap">
                <Link
                  href="/get-quote"
                  className="rounded-xl px-5 py-3 font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
                >
                  Get a Quote
                </Link>
                <Link
                  href="/contact"
                  className="rounded-xl px-5 py-3 font-semibold bg-white/10 ring-1 ring-white/20 hover:bg-white/20 transition"
                >
                  Contact us
                </Link>
              </div>
            </div>

            {/* Small internal links for SEO */}
            <div className="mt-6 text-sm text-slate-300">
              Looking for pricing?{" "}
              <Link className="text-cyan-300 hover:underline" href="/get-quote">
                Request a quote
              </Link>
              {" "}or browse{" "}
              <Link className="text-cyan-300 hover:underline" href="/services">
                all services
              </Link>
              .
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
