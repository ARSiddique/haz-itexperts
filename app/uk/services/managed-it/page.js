// app/uk/services/managed-it/page.js
import Link from "next/link";
import { site } from "@/lib/siteConfig";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import {
  ArrowRight,
  CheckCircle2,
  Headphones,
  ShieldCheck,
  Wrench,
  BarChart3,
  Clock,
  Server,
} from "lucide-react";
import { BASE_URL, BUSINESS_ID } from "@/lib/seoIds";

export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || BASE_URL || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/uk/services/managed-it`;
  const ogImage = `${baseUrl}/og-image.png?v=7`;

  const title = `Managed IT Services (UK) | ${brand}`;
  const description =
    "Managed IT for UK SMEs: proactive monitoring, patching, helpdesk, security-first device management, backups, and clear reporting — built for reliability and predictable costs.";

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "en-GB": canonical,
        "en-US": `${baseUrl}/services/managed-it`,
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
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${brand} — Managed IT (UK)` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function UKManagedITPage() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || BASE_URL || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/uk/services/managed-it`;

  const WEBSITE_ID = `${baseUrl}/#website`;
  const BREADCRUMB_ID = `${canonical}#breadcrumb`;
  const SERVICE_ID = `${canonical}#service`;
  const WEBPAGE_ID = `${canonical}#webpage`;
  const FAQ_ID = `${canonical}#faq`;

  const faqs = [
    {
      q: "What’s included in Managed IT (UK)?",
      a: "Proactive monitoring, patching discipline, helpdesk support, security-first device management guidance, backup readiness, and clear reporting to keep UK teams stable.",
    },
    {
      q: "Do you offer fixed monthly pricing?",
      a: "Yes — packages are structured to keep costs predictable. Final pricing depends on users, devices, and requirements.",
    },
    {
      q: "Can you support remote and hybrid UK teams?",
      a: "Yes. Our approach is remote-first and designed for hybrid workflows, with documentation and predictable support processes.",
    },
    {
      q: "Do you provide onboarding and documentation?",
      a: "Yes — we start with a baseline review, then standardise device setup, access, and support workflows with clear documentation.",
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
      { "@type": "ListItem", position: 4, name: "Managed IT", item: canonical },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": SERVICE_ID,
    name: "Managed IT Services (UK)",
    serviceType: "Managed IT Services",
    provider: { "@id": BUSINESS_ID },
    areaServed: [{ "@type": "Country", name: "United Kingdom" }],
    url: canonical,
    description:
      "Managed IT for UK SMEs: proactive monitoring, patching, helpdesk, security-first device management, backups, and clear reporting.",
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      price: "0",
      description: "Request a quote for managed IT services (UK).",
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
    name: `Managed IT Services (UK) | ${brand}`,
    description:
      "Managed IT for UK SMEs: proactive monitoring, patching, helpdesk, security-first device management, backups and reporting.",
    isPartOf: { "@id": WEBSITE_ID },
    breadcrumb: { "@id": BREADCRUMB_ID },
    about: { "@id": BUSINESS_ID },
    mainEntity: { "@id": SERVICE_ID },
  };

  const highlights = [
    "Proactive monitoring to detect issues before they become downtime",
    "Patching discipline and baseline hardening for safer devices",
    "Helpdesk support with clear ownership and predictable processes",
    "Backup readiness and recovery planning to reduce business risk",
    "Executive-ready reporting and practical IT roadmaps",
  ];

  const included = [
    {
      icon: Headphones,
      title: "Helpdesk support",
      desc: "Clear ownership, structured ticketing, and dependable support workflows.",
    },
    {
      icon: ShieldCheck,
      title: "Security-first baseline",
      desc: "MFA guidance, safer device setups, and identity-focused best practices.",
    },
    {
      icon: Wrench,
      title: "Monitoring + patching",
      desc: "Proactive checks and disciplined patching to keep systems stable.",
    },
    {
      icon: Server,
      title: "Backup readiness",
      desc: "Backup hygiene and restore readiness for business continuity.",
    },
    {
      icon: BarChart3,
      title: "Reporting",
      desc: "Monthly summaries, risk notes, and practical next-step recommendations.",
    },
    {
      icon: Clock,
      title: "Predictable operations",
      desc: "Repeatable processes designed for UK SMEs that want calm IT.",
    },
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
        title="Managed IT Services (UK)"
        sub="Proactive managed IT for UK SMEs — monitoring, patching, helpdesk, security-first device management and reporting."
      />

      <section className="max-w-6xl mx-auto px-4 pb-24">
        <Reveal className="mt-6">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">
                UK coverage • Remote-first • Predictable support
              </div>
              <p className="text-slate-300 mt-2 max-w-2xl">
                Keep your systems stable and your team productive — with proactive maintenance, clear support processes, and
                reporting you can actually use.
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
              <h2 className="text-xl font-semibold">What you get (UK)</h2>
              <ul className="mt-4 space-y-2 text-slate-200">
                {highlights.map((x) => (
                  <li key={x} className="flex gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-cyan-300 mt-0.5" />
                    {x}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-400">
                Built for UK teams that want calm operations, predictable costs, and security-first habits.
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
                href="/services/managed-it"
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
