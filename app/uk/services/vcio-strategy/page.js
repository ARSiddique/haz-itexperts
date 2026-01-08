import Link from "next/link";
import { site } from "@/lib/siteConfig";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import {
  ArrowRight,
  CheckCircle2,
  Target,
  LineChart,
  ShieldCheck,
  ClipboardCheck,
  Presentation,
  CalendarClock,
} from "lucide-react";
import { BASE_URL, BUSINESS_ID } from "@/lib/seoIds";

export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || BASE_URL || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/uk/services/vcio-strategy`;
  const ogImage = `${baseUrl}/og-image.png?v=7`;

  const title = `vCIO Strategy (UK) | ${brand}`;
  const description =
    "vCIO strategy for UK SMEs: IT roadmaps, budgeting and prioritisation, risk reduction, standards, vendor coordination, and executive-ready reporting — delivered remote-first across the UK.";

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    alternates: { canonical },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
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
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${brand} — vCIO Strategy (UK)` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function UKVCIOPage() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || BASE_URL || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/uk/services/vcio-strategy`;

  const WEBSITE_ID = `${baseUrl}/#website`;
  const BREADCRUMB_ID = `${canonical}#breadcrumb`;
  const SERVICE_ID = `${canonical}#service`;
  const WEBPAGE_ID = `${canonical}#webpage`;
  const FAQ_ID = `${canonical}#faq`;

  const faqs = [
    {
      q: "Is vCIO only for larger companies?",
      a: "No. UK SMEs benefit from a clear roadmap, sensible standards, and leadership-friendly reporting — without enterprise overhead.",
    },
    {
      q: "Do you help with budgets and prioritisation?",
      a: "Yes. We help you decide what to do now vs later, estimate effort/cost, and prioritise work based on risk and business impact.",
    },
    {
      q: "Do you coordinate vendors and suppliers?",
      a: "Yes. We can coordinate vendors, track ownership, keep documentation clean, and help avoid finger-pointing during changes.",
    },
    {
      q: "What does reporting look like?",
      a: "Simple, executive-ready updates: risks, progress, current priorities, and next steps — aligned to agreed objectives.",
    },
  ];

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": BREADCRUMB_ID,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
      { "@type": "ListItem", position: 2, name: "UK", item: `${baseUrl}/uk` },
      { "@type": "ListItem", position: 3, name: "UK Services", item: `${baseUrl}/uk/services` },
      { "@type": "ListItem", position: 4, name: "vCIO Strategy (UK)", item: canonical },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": SERVICE_ID,
    name: "vCIO Strategy (UK)",
    serviceType: "IT Strategy Consulting",
    category: ["IT Strategy", "Technology Planning", "Cyber Risk Reduction"],
    provider: { "@id": BUSINESS_ID },
    areaServed: [{ "@type": "Country", name: "United Kingdom" }],
    serviceArea: [{ "@type": "Country", name: "United Kingdom" }],
    audience: {
      "@type": "Audience",
      audienceType: "Small and medium-sized businesses (SMEs)",
      geographicArea: { "@type": "Country", name: "United Kingdom" },
    },
    url: canonical,
    inLanguage: ["en-GB", "en"],
    description:
      "vCIO strategy for UK SMEs: IT roadmaps, budgeting and prioritisation, risk reduction, standards, vendor coordination, and executive-ready reporting.",
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      // Keep it quote-based; leaving price as '0' can look odd in rich results.
      // If you want, we can remove 'price' completely.
      description: "Request a quote for vCIO strategy (UK).",
      url: `${baseUrl}/uk/contact`,
      availability: "https://schema.org/InStock",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": FAQ_ID,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": WEBPAGE_ID,
    url: canonical,
    name: `vCIO Strategy (UK) | ${brand}`,
    description:
      "vCIO strategy for UK SMEs: roadmaps, budgets, standards, risk reduction and executive reporting.",
    isPartOf: { "@id": WEBSITE_ID },
    breadcrumb: { "@id": BREADCRUMB_ID },
    about: { "@id": BUSINESS_ID },
    mainEntity: { "@id": SERVICE_ID },
    inLanguage: ["en-GB", "en"],
  };

  const outcomes = [
    "A clear IT roadmap aligned to business goals (quarter-by-quarter)",
    "Budget clarity: now vs later priorities with realistic sequencing",
    "Standards that reduce support load and security risk",
    "Vendor coordination without confusion or finger-pointing",
    "Executive-ready reporting with accountability and next steps",
  ];

  const included = [
    { icon: Target, title: "Roadmap", desc: "Practical roadmap with priorities, milestones, and ownership." },
    { icon: LineChart, title: "Planning", desc: "Budget planning + sequencing (what to do now vs later)." },
    { icon: ShieldCheck, title: "Risk reduction", desc: "High-impact risk reducers prioritised first (identity, backup, endpoints)." },
    { icon: ClipboardCheck, title: "Standards", desc: "Repeatable standards to reduce drift, chaos, and recurring issues." },
    { icon: Presentation, title: "Reporting", desc: "Leadership-friendly updates: risks, progress, priorities, and decisions." },
    { icon: CalendarClock, title: "Cadence", desc: "Monthly review rhythm to keep progress consistent and visible." },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbsSchema, serviceSchema, faqSchema, webPageSchema]),
        }}
      />

      <PageHero
        eyebrow="United Kingdom • Service"
        title="vCIO Strategy (UK)"
        sub="IT strategy for UK SMEs — roadmaps, budgets, standards, risk reduction and executive-ready reporting."
      />

      <section className="max-w-6xl mx-auto px-4 pb-24">
        <Reveal className="mt-6">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">
                UK coverage • Roadmap clarity • Executive reporting
              </div>
              <p className="text-slate-300 mt-2 max-w-2xl">
                Turn IT into a plan — not a fire drill. Build a roadmap, set standards, reduce risk, and track progress with a
                simple cadence that leadership can follow.
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/uk/contact"
                className="rounded-lg px-5 py-3 font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
              >
                Get a UK Quote
              </Link>
              <Link
                href="/uk/services"
                className="rounded-lg px-5 py-3 font-semibold bg-white/10 ring-1 ring-white/20 hover:bg-white/20"
              >
                View UK Services
              </Link>
              <Link
                href="/uk/faqs"
                className="rounded-lg px-5 py-3 font-semibold bg-white/5 border border-white/10 hover:bg-white/10"
              >
                UK FAQs
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-10">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-semibold">Outcomes you should expect</h2>
              <ul className="mt-4 space-y-2 text-slate-200">
                {outcomes.map((x) => (
                  <li key={x} className="flex gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-cyan-300 mt-0.5" />
                    {x}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-400">
                Strategy should reduce stress — not create endless meetings.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-semibold">Included components</h3>
              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                {included.map((it) => {
                  const Icon = it.icon;
                  return (
                    <div key={it.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-start gap-3">
                        <Icon className="h-5 w-5 text-cyan-300 mt-0.5" />
                        <div>
                          <div className="font-semibold">{it.title}</div>
                          <div className="text-sm text-slate-300 mt-1">{it.desc}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-10">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold">FAQs</h3>
            <div className="mt-4 space-y-4">
              {faqs.map((f) => (
                <div key={f.q} className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <div className="font-semibold">{f.q}</div>
                  <p className="mt-2 text-sm text-slate-300 leading-6">{f.a}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/uk/contact"
                className="inline-flex items-center gap-2 text-sm rounded-lg px-4 py-2 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
              >
                Book a UK Call <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/uk/areas"
                className="inline-flex items-center gap-2 text-sm rounded-lg px-4 py-2 border border-white/10 bg-white/5 hover:bg-white/10"
              >
                UK Coverage <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services/vcio-strategy"
                className="inline-flex items-center gap-2 text-sm rounded-lg px-4 py-2 border border-white/10 bg-white/5 hover:bg-white/10"
              >
                View US version <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
