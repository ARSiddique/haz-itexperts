// app/uk/page.js
import Link from "next/link";
import { site } from "@/lib/siteConfig";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Clock3,
  BadgeCheck,
  Shield,
  Lock,
  Cloud,
  Wrench,
  Laptop,
  LineChart,
  FileText,
  Layers,
  Users,
} from "lucide-react";
import { BASE_URL, BUSINESS_ID } from "@/lib/seoIds";

// ✅ Keep UK pages in "draft" until you finalize (internal links + content + QA)
// Flip to true when ready to index UK.
const UK_INDEX_READY = false;

export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || BASE_URL || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/uk`;
  const ogImage = `${baseUrl}/og-image.png?v=7`;

  const title = `Managed IT Support & Cybersecurity for UK Businesses | ${brand}`;
  const description =
    "Remote-first managed IT support and cybersecurity for UK SMEs — clear scope, fast response, security baselines, Microsoft 365 governance, and simple onboarding.";

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "en-GB": canonical,
        "en-US": `${baseUrl}/`,
      },
    },
    robots: {
      // ✅ Draft mode
      index: UK_INDEX_READY,
      follow: true,
      googleBot: {
        index: UK_INDEX_READY,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
      siteName: brand,
      locale: "en_GB",
      alternateLocale: ["en_US"],
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${brand} — UK` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

// ✅ Convert US service href -> UK service href
function toUkServiceHref(href) {
  if (!href) return "/uk/services";
  if (href.startsWith("/uk/")) return href;
  if (href.startsWith("/services/")) return href.replace("/services/", "/uk/services/");
  if (href === "/services") return "/uk/services";
  return `/uk${href.startsWith("/") ? href : `/${href}`}`;
}

const ICONS = {
  Shield,
  Lock,
  Cloud,
  Wrench,
  Laptop,
  LineChart,
};

function ServiceIcon({ name }) {
  const Ico = ICONS[name] || ShieldCheck;
  return <Ico className="h-5 w-5 text-cyan-300" />;
}

// ✅ Make UK services explicit (avoid accidental US copy)
const UK_SERVICES = [
  {
    key: "managed-it",
    title: "Managed IT Services",
    href: "/services/managed-it",
    icon: "Shield",
    blurb:
      "Monitoring, patching, helpdesk, and monthly reporting — designed for UK SMEs that want calm IT and predictable support.",
    tags: ["Helpdesk", "Patching", "Monitoring"],
  },
  {
    key: "cybersecurity",
    title: "Cybersecurity",
    href: "/services/cybersecurity",
    icon: "Lock",
    blurb:
      "Identity hardening, email security, endpoint protection, and backup/DR readiness — security-first habits that reduce risk.",
    tags: ["MFA", "EDR/XDR", "Backup/DR"],
  },
  {
    key: "cloud-workspace",
    title: "Cloud & Microsoft 365",
    href: "/services/cloud-workspace",
    icon: "Cloud",
    blurb:
      "Microsoft 365 governance, tenant baselines, migrations, and cost hygiene — built for Teams, SharePoint, and hybrid work.",
    tags: ["M365", "Migrations", "Governance"],
  },
  {
    key: "projects-consulting",
    title: "IT Projects & Consulting",
    href: "/services/projects-consulting",
    icon: "Wrench",
    blurb:
      "Planned upgrades, refresh projects, migrations, and documentation — delivered cleanly with clear milestones and handover.",
    tags: ["Audits", "Migrations", "Modernisation"],
  },
  {
    key: "device-management",
    title: "Device Management (MDM)",
    href: "/services/device-management",
    icon: "Laptop",
    blurb:
      "Zero-touch enrollment, hardening, patch/app management — a consistent baseline for Windows/macOS endpoints.",
    tags: ["Autopilot", "Jamf", "Compliance"],
  },
  {
    key: "vcio-strategy",
    title: "vCIO / IT Strategy",
    href: "/services/vcio-strategy",
    icon: "LineChart",
    blurb:
      "Roadmaps, budgets, standards, vendor coordination, and leadership reporting — strategy without enterprise fluff.",
    tags: ["Roadmaps", "Budgets", "KPIs"],
  },
];

export default function UKLandingPage() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || BASE_URL || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/uk`;

  // ✅ Stable IDs
  const WEBSITE_ID = `${baseUrl}/#website`;
  const BREADCRUMB_ID = `${canonical}#breadcrumb`;
  const WEBPAGE_ID = `${canonical}#webpage`;
  const SERVICES_LIST_ID = `${canonical}#services`;

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": BREADCRUMB_ID,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
      { "@type": "ListItem", position: 2, name: "UK", item: canonical },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": WEBPAGE_ID,
    url: canonical,
    name: `United Kingdom | ${brand}`,
    description:
      "Remote-first managed IT and cybersecurity for UK businesses — clear deliverables, security-first rollout, and simple onboarding.",
    isPartOf: { "@id": WEBSITE_ID },
    breadcrumb: { "@id": BREADCRUMB_ID },
    about: { "@id": BUSINESS_ID },
  };

  const servicesItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": SERVICES_LIST_ID,
    name: "UK Services",
    itemListElement: UK_SERVICES.map((s, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: s.title,
      url: `${baseUrl}${toUkServiceHref(s.href)}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbsSchema, webPageSchema, servicesItemListSchema]),
        }}
      />

      {/* marker to confirm correct route rendering */}
      <span data-page="uk-home" className="sr-only">
        uk-home
      </span>

      <PageHero
        eyebrow="United Kingdom"
        title="UK Managed IT & Cybersecurity"
        sub="Remote-first managed IT support and cybersecurity for UK businesses — clear scope, fast response, and a smooth onboarding process."
      />

      <section className="max-w-6xl mx-auto px-4 pb-24">
        {/* Premium hero card (split) */}
        <Reveal className="mt-6">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
            {/* background visuals */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
              <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />
              <div className="absolute inset-0 bg-[radial-gradient(700px_280px_at_20%_10%,rgba(56,189,248,0.10),transparent_60%),radial-gradient(700px_280px_at_80%_20%,rgba(232,121,249,0.08),transparent_60%),radial-gradient(700px_280px_at_70%_90%,rgba(56,189,248,0.06),transparent_60%)]" />
              <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:18px_18px]" />
            </div>

            <div className="relative grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
              {/* Left */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-cyan-300/80">
                  <Sparkles className="h-4 w-4" />
                  UK support — built for clarity & trust
                </div>

                <h2 className="mt-3 text-2xl md:text-3xl font-extrabold leading-tight">
                  Reliable, security-first IT support for UK teams —{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-cyan-300">
                    without confusion
                  </span>
                </h2>

                <p className="mt-3 text-slate-300 leading-7 max-w-2xl">
                  If your team is based in the UK (or expanding into the UK), we keep your IT reliable and secure — with
                  clear scope, fast response, and simple monthly support you can trust.
                </p>

                {/* Trust chips */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {[
                    { icon: <MapPin className="h-4 w-4" />, text: "UK coverage (remote-first)" },
                    { icon: <ShieldCheck className="h-4 w-4" />, text: "Security-first delivery" },
                    { icon: <BadgeCheck className="h-4 w-4" />, text: "Clear deliverables" },
                    { icon: <Clock3 className="h-4 w-4" />, text: "UK-friendly support hours" },
                  ].map((c) => (
                    <span
                      key={c.text}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200"
                    >
                      <span className="text-cyan-300">{c.icon}</span>
                      {c.text}
                    </span>
                  ))}
                </div>

                {/* CTAs */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/uk/services"
                    className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
                  >
                    View UK Services <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/uk/contact"
                    className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold bg-white/10 ring-1 ring-white/20 hover:bg-white/20 transition"
                  >
                    Book a Call <PhoneCall className="h-4 w-4" />
                  </Link>
                </div>

                <p className="mt-4 text-xs text-slate-400">
                  Quick call → we confirm your setup (Microsoft 365, endpoints, backups, security) and share a clear support plan.
                </p>
              </div>

              {/* Right visual panel */}
              <div className="lg:col-span-5">
                <div className="relative h-full rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-5 overflow-hidden">
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute top-6 left-6 h-32 w-32 rounded-full bg-cyan-400/10 blur-2xl" />
                    <div className="absolute bottom-6 right-6 h-32 w-32 rounded-full bg-fuchsia-400/10 blur-2xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(420px_220px_at_50%_0%,rgba(56,189,248,0.10),transparent_60%)]" />
                  </div>

                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-slate-100">Onboarding snapshot</div>
                      <span className="text-xs text-slate-400">first 30 days</span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {[
                        { title: "Response", value: "Fast", sub: "helpdesk + SLAs", ico: <Clock3 className="h-4 w-4" /> },
                        { title: "Baseline", value: "Secure", sub: "MFA + hardening", ico: <ShieldCheck className="h-4 w-4" /> },
                        { title: "Visibility", value: "Clear", sub: "reporting", ico: <BadgeCheck className="h-4 w-4" /> },
                        { title: "Delivery", value: "Scoped", sub: "no surprises", ico: <Sparkles className="h-4 w-4" /> },
                      ].map((k) => (
                        <div key={k.title} className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                          <div className="flex items-center justify-between text-xs text-slate-400">
                            <span className="inline-flex items-center gap-2">
                              <span className="text-cyan-300">{k.ico}</span>
                              {k.title}
                            </span>
                          </div>
                          <div className="mt-1 text-lg font-extrabold text-slate-100">{k.value}</div>
                          <div className="text-xs text-slate-400">{k.sub}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] p-4">
                      <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">What’s included</div>
                      <ul className="mt-3 space-y-2 text-sm text-slate-200">
                        {[
                          "Security-first onboarding and baseline hardening",
                          "Clear support scope, response times, and reporting",
                          "Microsoft 365 governance and endpoint best-practice setup",
                        ].map((x) => (
                          <li key={x} className="flex gap-2">
                            <CheckCircle2 className="h-4 w-4 text-cyan-300 mt-0.5" />
                            <span>{x}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Link
                        href="/uk/services"
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold border border-white/10 bg-white/5 hover:bg-white/10 transition"
                      >
                        Browse <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href="/uk/contact"
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
                      >
                        Book <PhoneCall className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* /right */}
            </div>
          </div>
        </Reveal>

        {/* Why UK teams choose us (NEW - longer content + UK-specific) */}
        <Reveal className="mt-10">
          <div className="grid lg:grid-cols-3 gap-4">
            {[
              {
                title: "Clarity over chaos",
                sub: "Clear scope, owners, and outcomes — so you know what’s included (and what’s not).",
                ico: <Layers className="h-5 w-5" />,
              },
              {
                title: "Security-first by default",
                sub: "Identity + device baselines, MFA-first guidance, and safer configurations wherever practical.",
                ico: <ShieldCheck className="h-5 w-5" />,
              },
              {
                title: "UK-friendly delivery",
                sub: "Remote-first support for UK SMEs — built around simple onboarding, documentation, and cadence.",
                ico: <Users className="h-5 w-5" />,
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 hover:border-cyan-300/20 transition"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-cyan-300">
                  {f.ico}
                </div>
                <div className="mt-3 font-extrabold text-slate-100">{f.title}</div>
                <div className="mt-1 text-sm text-slate-300 leading-6">{f.sub}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* What we manage (NEW - internal linking hooks) */}
        <Reveal className="mt-10">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">What we manage</div>
                <h3 className="mt-2 text-2xl font-extrabold">The UK SME stack — covered</h3>
                <p className="text-slate-300 mt-2 max-w-3xl leading-7">
                  Most UK businesses run Microsoft 365, a mix of Windows/macOS endpoints, cloud storage, and remote workers.
                  We help you standardise the basics, reduce risk, and keep support predictable.
                </p>
              </div>

              <Link
                href="/uk/contact"
                className="inline-flex items-center gap-2 text-sm rounded-xl px-4 py-2 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
              >
                Get recommendations <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-4">
              {[
                {
                  t: "Microsoft 365 governance",
                  d: "Tenant baselines, identity hygiene, mailbox security, Teams/SharePoint governance.",
                  link: "/uk/services/cloud-workspace",
                },
                {
                  t: "Endpoints & device standards",
                  d: "Enrollment, hardening, patching, and consistent device policy across users.",
                  link: "/uk/services/device-management",
                },
                {
                  t: "Security baseline & risk reducers",
                  d: "MFA-first guidance, safer defaults, practical controls (no enterprise fluff).",
                  link: "/uk/services/cybersecurity",
                },
                {
                  t: "Ongoing support & reporting",
                  d: "Helpdesk workflows, monitoring, response expectations, and reporting you can use.",
                  link: "/uk/services/managed-it",
                },
              ].map((x) => (
                <div key={x.t} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-extrabold text-slate-100">{x.t}</div>
                      <p className="mt-1 text-sm text-slate-300 leading-6">{x.d}</p>
                    </div>
                    <Link
                      href={x.link}
                      className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:bg-white/10"
                    >
                      View <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-cyan-300 mt-0.5" />
                <p className="text-sm text-slate-300 leading-6">
                  UK note: we keep documentation + ownership clear, and apply a “security-first, practical” approach that
                  supports common UK expectations (e.g., GDPR/UK DPA awareness and Cyber Essentials readiness where relevant).
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* UK Services preview */}
        <Reveal className="mt-10">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">UK Services</div>
                <h3 className="mt-2 text-2xl font-extrabold">Six core services for UK businesses</h3>
                <p className="text-slate-300 mt-2 max-w-3xl leading-7">
                  Choose what you need — from fully managed support to security hardening and Microsoft 365 governance.
                  Clear outcomes, predictable delivery, and simple onboarding.
                </p>
              </div>

              <Link
                href="/uk/services"
                className="inline-flex items-center gap-2 text-sm rounded-xl px-4 py-2 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-4">
              {UK_SERVICES.map((s) => {
                const href = toUkServiceHref(s.href);
                return (
                  <Link
                    key={s.key || s.href}
                    href={href}
                    className="group block rounded-2xl border border-white/10 bg-white/[0.04] p-5 hover:border-cyan-300/30 transition"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                          <ServiceIcon name={s.icon} />
                        </span>
                        <div>
                          <div className="font-extrabold text-slate-100">{s.title}</div>
                          <p className="mt-1 text-sm text-slate-300 leading-6">{s.blurb}</p>
                        </div>
                      </div>

                      <ArrowRight className="h-4 w-4 mt-1 text-slate-300 group-hover:text-cyan-200 transition" />
                    </div>

                    {Array.isArray(s.tags) && s.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {s.tags.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="text-xs rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-slate-200"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-5 h-1 w-0 bg-cyan-400/70 group-hover:w-full transition-all rounded-full" />
                  </Link>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* First 30 days plan */}
        <Reveal className="mt-10">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-xl font-extrabold">What you get in the first 30 days</h3>
              <p className="mt-2 text-slate-300 leading-7">
                A simple rollout that gives you stability, visibility, and a clear improvement plan — not a never-ending audit.
              </p>

              <ol className="mt-5 space-y-3">
                {[
                  { t: "Day 1–3", d: "Access + baseline checks (accounts, endpoints, backups)." },
                  { t: "Week 1", d: "Monitoring + alerting + ticket workflow setup." },
                  { t: "Week 2", d: "Security hardening (MFA, email security, device policy)." },
                  { t: "Week 3–4", d: "Reporting + roadmap (quick wins + next steps)." },
                ].map((x) => (
                  <li key={x.t} className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs font-bold text-cyan-300">
                      ✓
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-slate-100">{x.t}</div>
                      <div className="text-sm text-slate-300">{x.d}</div>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/uk/contact"
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
                >
                  Book a Call <PhoneCall className="h-4 w-4" />
                </Link>
                <Link
                  href="/uk/services"
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold bg-white/10 ring-1 ring-white/20 hover:bg-white/20 transition"
                >
                  Explore services <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-xl font-extrabold">How we support UK teams</h3>
              <ul className="mt-4 space-y-3 text-slate-200">
                {[
                  "Fast helpdesk support with clear response expectations",
                  "Security-first setup (MFA, device policies, email protection)",
                  "Backup and recovery planning to reduce downtime risk",
                  "Microsoft 365 governance and cost optimisation",
                  "Documentation + handover notes that reduce dependency",
                ].map((x) => (
                  <li key={x} className="flex gap-2 text-sm leading-6">
                    <CheckCircle2 className="h-4 w-4 text-cyan-300 mt-0.5" />
                    {x}
                  </li>
                ))}
              </ul>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-slate-300">UK coverage note</div>
                <p className="mt-2 text-sm text-slate-300 leading-6">
                  We support UK businesses remotely (UK-wide). Once the base pages are final and ranking, we can expand with targeted UK
                  location pages — without duplicating thin content.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/uk/areas"
                  className="inline-flex items-center gap-2 text-sm rounded-xl px-4 py-2 border border-white/10 bg-white/5 hover:bg-white/10"
                >
                  UK coverage <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/uk/faqs"
                  className="inline-flex items-center gap-2 text-sm rounded-xl px-4 py-2 border border-white/10 bg-white/5 hover:bg-white/10"
                >
                  UK FAQs <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/uk/contact"
                  className="inline-flex items-center gap-2 text-sm rounded-xl px-4 py-2 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
                >
                  Contact <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Next steps */}
        <Reveal className="mt-10">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-xl font-extrabold">Ready to get started?</h3>
            <p className="text-slate-300 mt-2 leading-7">
              Tell us what you’re running today (Microsoft 365, endpoints, backups, security) and we’ll recommend the quickest, safest next steps.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/uk/contact"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
              >
                Book a Call <PhoneCall className="h-4 w-4" />
              </Link>
              <Link
                href="/uk/services"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold bg-white/10 ring-1 ring-white/20 hover:bg-white/20 transition"
              >
                View services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {!UK_INDEX_READY && (
              <p className="mt-4 text-xs text-slate-400">
                SEO note: UK pages are currently set to <span className="text-slate-200">noindex</span> until final QA (content + internal links + canonical checks).
              </p>
            )}
          </div>
        </Reveal>
      </section>
    </>
  );
}
