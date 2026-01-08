// app/uk/services/device-management/page.js
import Link from "next/link";
import { site } from "@/lib/siteConfig";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import {
  ArrowRight,
  CheckCircle2,
  Laptop,
  ShieldCheck,
  Settings,
  RefreshCw,
  PackageCheck,
  Users,
} from "lucide-react";
import { BASE_URL, BUSINESS_ID } from "@/lib/seoIds";

export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || BASE_URL || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/uk/services/device-management`;
  const ogImage = `${baseUrl}/og-image.png?v=7`;

  const title = `Device Management (UK) | ${brand}`;
  const description =
    "Device management for UK SMEs: baseline hardening, patching routines, onboarding/offboarding checklists, and safer day-to-day device operations for hybrid teams.";

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "en-GB": canonical,
        "en-US": `${baseUrl}/services/device-management`,
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
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${brand} — Device Management (UK)` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function UKDeviceManagementPage() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || BASE_URL || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/uk/services/device-management`;

  const WEBSITE_ID = `${baseUrl}/#website`;
  const BREADCRUMB_ID = `${canonical}#breadcrumb`;
  const SERVICE_ID = `${canonical}#service`;
  const WEBPAGE_ID = `${canonical}#webpage`;
  const FAQ_ID = `${canonical}#faq`;

  const faqs = [
    {
      q: "Do you manage both laptops and desktops?",
      a: "Yes — the goal is consistent baselines and repeatable processes across employee devices.",
    },
    {
      q: "Can you help with onboarding and offboarding?",
      a: "Yes. We provide checklists and structured steps so access and devices are handled cleanly.",
    },
    {
      q: "Is patching included?",
      a: "Yes — we emphasise patching discipline and safer baselines as a core part of device hygiene.",
    },
    {
      q: "Do you support mixed environments?",
      a: "Yes. We design processes that work with hybrid teams and common SME setups.",
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
      { "@type": "ListItem", position: 4, name: "Device Management", item: canonical },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": SERVICE_ID,
    name: "Device Management (UK)",
    serviceType: "Device Management",
    provider: { "@id": BUSINESS_ID },
    areaServed: [{ "@type": "Country", name: "United Kingdom" }],
    url: canonical,
    description:
      "Device management for UK SMEs: baseline hardening, patching routines, onboarding/offboarding checklists, and safer device operations for hybrid teams.",
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      price: "0",
      description: "Request a quote for device management (UK).",
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
    name: `Device Management (UK) | ${brand}`,
    description:
      "Device management support for UK teams: baseline hardening, patching routines and onboarding/offboarding checklists.",
    isPartOf: { "@id": WEBSITE_ID },
    breadcrumb: { "@id": BREADCRUMB_ID },
    about: { "@id": BUSINESS_ID },
    mainEntity: { "@id": SERVICE_ID },
  };

  const outcomes = [
    "Consistent device baselines that reduce support noise",
    "Cleaner onboarding/offboarding with repeatable steps",
    "Patching discipline to reduce preventable incidents",
    "Better device posture for hybrid and remote teams",
    "Clear checklists for everyday operations",
  ];

  const included = [
    { icon: Laptop, title: "Baseline setup", desc: "Standardised device setup guidance to reduce chaos and drift." },
    { icon: ShieldCheck, title: "Security posture", desc: "Safer defaults and hardening recommendations where applicable." },
    { icon: RefreshCw, title: "Patching routines", desc: "Disciplined update routines for stability and risk reduction." },
    { icon: Users, title: "Onboarding/offboarding", desc: "Structured checklists for access and device handling." },
    { icon: PackageCheck, title: "Asset hygiene", desc: "Inventory habits and simple tracking patterns for SMEs." },
    { icon: Settings, title: "Operational playbooks", desc: "Repeatable steps for common device events and requests." },
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
        title="Device Management (UK)"
        sub="Standardised device baselines, patching routines, and onboarding/offboarding playbooks — built for UK hybrid teams."
      />

      <section className="max-w-6xl mx-auto px-4 pb-24">
        <Reveal className="mt-6">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">
                UK coverage • Cleaner operations • Safer devices
              </div>
              <p className="text-slate-300 mt-2 max-w-2xl">
                Reduce device chaos with clear standards — fewer surprises, fewer urgent fixes, and safer day-to-day operations.
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
                The goal is simple: consistent devices and fewer “mystery” problems.
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
                href="/services/device-management"
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
