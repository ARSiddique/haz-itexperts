// app/uk/services/projects-consulting/page.js
import Link from "next/link";
import { site } from "@/lib/siteConfig";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Network,
  ShieldCheck,
  Workflow,
  Gauge,
  FileText,
} from "lucide-react";
import { BASE_URL, BUSINESS_ID } from "@/lib/seoIds";

export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || BASE_URL || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/uk/services/projects-consulting`;
  const ogImage = `${baseUrl}/og-image.png?v=7`;

  const title = `IT Projects & Consulting (UK) | ${brand}`;
  const description =
    "IT projects and consulting for UK SMEs: planning, delivery, documentation, security-first upgrades, migrations and practical roadmaps — done cleanly and predictably.";

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "en-GB": canonical,
        "en-US": `${baseUrl}/services/projects-consulting`,
      },
    },
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
      locale: "en_GB",
      alternateLocale: ["en_US"],
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${brand} — Projects & Consulting (UK)` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

export default function UKProjectsConsultingPage() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || BASE_URL || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/uk/services/projects-consulting`;

  const WEBSITE_ID = `${baseUrl}/#website`;
  const BREADCRUMB_ID = `${canonical}#breadcrumb`;
  const SERVICE_ID = `${canonical}#service`;
  const WEBPAGE_ID = `${canonical}#webpage`;
  const FAQ_ID = `${canonical}#faq`;

  const faqs = [
    {
      q: "Do you handle migrations and upgrades?",
      a: "Yes — we plan and deliver upgrades with clear steps, rollback awareness, and documentation.",
    },
    {
      q: "Can you support one-off projects for UK SMEs?",
      a: "Yes. Projects can be scoped as standalone work or integrated into ongoing support depending on your needs.",
    },
    {
      q: "How do you keep projects on track?",
      a: "Clear scope, milestones, risks, and ownership — plus documentation and handover notes at the end.",
    },
    {
      q: "Do you consider security during projects?",
      a: "Yes — we take a security-first approach and recommend safer defaults wherever practical.",
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
      { "@type": "ListItem", position: 4, name: "Projects & Consulting", item: canonical },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": SERVICE_ID,
    name: "IT Projects & Consulting (UK)",
    serviceType: "IT Consulting",
    provider: { "@id": BUSINESS_ID },
    areaServed: [{ "@type": "Country", name: "United Kingdom" }],
    url: canonical,
    description:
      "IT projects and consulting for UK SMEs: planning, delivery, documentation, security-first upgrades, migrations and practical roadmaps.",
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      price: "0",
      description: "Request a project quote (UK).",
      url: `${baseUrl}/uk/contact`,
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
    name: `IT Projects & Consulting (UK) | ${brand}`,
    description:
      "IT projects and consulting for UK SMEs: planning, delivery, documentation, and security-first upgrades.",
    isPartOf: { "@id": WEBSITE_ID },
    breadcrumb: { "@id": BREADCRUMB_ID },
    about: { "@id": BUSINESS_ID },
    mainEntity: { "@id": SERVICE_ID },
  };

  const outcomes = [
    "Clear project scope with realistic timelines and milestones",
    "Reduced risk with safer defaults and rollback awareness",
    "Documentation and handover notes that teams can reuse",
    "Less disruption for staff during upgrades and migrations",
    "Practical roadmaps that align with business goals",
  ];

  const included = [
    { icon: ClipboardList, title: "Scope + plan", desc: "Clear deliverables, timeline and ownership — no fuzzy scope." },
    { icon: Workflow, title: "Project delivery", desc: "Structured delivery with checkpoints and clear communications." },
    { icon: Network, title: "Migrations + upgrades", desc: "Planned upgrades and migrations with predictable steps." },
    { icon: ShieldCheck, title: "Security-first defaults", desc: "Safer configurations recommended during project work." },
    { icon: Gauge, title: "Performance hygiene", desc: "Reduce friction and improve stability where possible." },
    { icon: FileText, title: "Documentation", desc: "Handover notes and documentation to reduce future dependency." },
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
        title="IT Projects & Consulting (UK)"
        sub="Planned upgrades and migrations with clear deliverables, documentation, and security-first defaults — built for UK SMEs."
      />

      <section className="max-w-6xl mx-auto px-4 pb-24">
        <Reveal className="mt-6">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">
                UK coverage • Clear scope • Clean delivery
              </div>
              <p className="text-slate-300 mt-2 max-w-2xl">
                Deliver IT projects without chaos — with clear scope, milestones, documentation, and predictable handover.
              </p>
            </div>
            <div className="flex gap-3">
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
                Projects done right reduce future support cost — not increase it.
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
                href="/services/projects-consulting"
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
