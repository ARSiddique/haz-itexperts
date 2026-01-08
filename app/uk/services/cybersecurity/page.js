// app/uk/services/cybersecurity/page.js
import Link from "next/link";
import { site } from "@/lib/siteConfig";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  Lock,
  KeyRound,
  Laptop,
  FileCheck2,
  Siren,
} from "lucide-react";
import { BASE_URL, BUSINESS_ID } from "@/lib/seoIds";

export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || BASE_URL || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/uk/services/cybersecurity`;
  const ogImage = `${baseUrl}/og-image.png?v=7`;

  const title = `Cybersecurity Services (UK) | ${brand}`;
  const description =
    "Cybersecurity for UK SMEs: identity hardening, endpoint protection guidance, email security, policy baselines, and practical risk reduction — built for real-world teams.";

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "en-GB": canonical,
        "en-US": `${baseUrl}/services/cybersecurity`,
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
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${brand} — Cybersecurity (UK)` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function UKCybersecurityPage() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || BASE_URL || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/uk/services/cybersecurity`;

  const WEBSITE_ID = `${baseUrl}/#website`;
  const BREADCRUMB_ID = `${canonical}#breadcrumb`;
  const SERVICE_ID = `${canonical}#service`;
  const WEBPAGE_ID = `${canonical}#webpage`;
  const FAQ_ID = `${canonical}#faq`;

  const faqs = [
    {
      q: "Is this only for large organisations?",
      a: "No. We focus on practical security for UK SMEs: identity, endpoints, email guardrails, and day-to-day risk reduction without heavy overhead.",
    },
    {
      q: "Do you help with MFA and account security?",
      a: "Yes. We prioritise identity hardening (MFA/SSO where appropriate), access hygiene, and safer admin practices.",
    },
    {
      q: "Can you help reduce phishing risk?",
      a: "Yes — we improve email security settings, add sensible guardrails, and advise on training and reporting workflows.",
    },
    {
      q: "Do you provide incident response?",
      a: "We can support response planning and fast triage. If specialised support is required, we can coordinate with partners depending on scope and requirements.",
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
      { "@type": "ListItem", position: 4, name: "Cybersecurity", item: canonical },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": SERVICE_ID,
    name: "Cybersecurity Services (UK)",
    serviceType: "Cybersecurity",
    provider: { "@id": BUSINESS_ID },
    areaServed: [{ "@type": "Country", name: "United Kingdom" }],
    url: canonical,
    description:
      "Cybersecurity for UK SMEs: identity hardening, endpoint protection guidance, email security, policy baselines, and practical risk reduction.",
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      price: "0",
      description: "Request a quote for cybersecurity services (UK).",
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
    name: `Cybersecurity Services (UK) | ${brand}`,
    description:
      "Cybersecurity for UK SMEs: identity hardening, endpoints, email security, and practical risk reduction.",
    isPartOf: { "@id": WEBSITE_ID },
    breadcrumb: { "@id": BREADCRUMB_ID },
    about: { "@id": BUSINESS_ID },
    mainEntity: { "@id": SERVICE_ID },
  };

  const outcomes = [
    "Stronger logins and safer access controls (MFA-first)",
    "Reduced phishing exposure and better email guardrails",
    "Cleaner device posture with secure baseline guidance",
    "Better visibility with simple controls and reporting",
    "Practical policies that teams can actually follow",
  ];

  const included = [
    { icon: Shield, title: "Risk baseline", desc: "A practical baseline review to prioritise the biggest risk reducers." },
    { icon: KeyRound, title: "Identity hardening", desc: "MFA, admin hygiene, access reviews, and safer sign-in practices." },
    { icon: Laptop, title: "Endpoint guidance", desc: "Baseline hardening and endpoint protection recommendations." },
    { icon: Lock, title: "Email security", desc: "Guardrails against phishing and account compromise patterns." },
    { icon: FileCheck2, title: "Policy essentials", desc: "Simple policies and checklists for repeatable security habits." },
    { icon: Siren, title: "Response readiness", desc: "Triage workflows and escalation paths if something goes wrong." },
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
        title="Cybersecurity Services (UK)"
        sub="Security-first controls for UK SMEs — identity hardening, endpoint posture, email guardrails, and practical risk reduction."
      />

      <section className="max-w-6xl mx-auto px-4 pb-24">
        <Reveal className="mt-6">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">
                UK coverage • Practical security • Reduced risk
              </div>
              <p className="text-slate-300 mt-2 max-w-2xl">
                Improve your security posture without slowing your team down — prioritise identity, endpoints, and email
                protection with clear steps and ownership.
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
                Focus on high-impact controls first — then build repeatable habits that scale.
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
                href="/services/cybersecurity"
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
