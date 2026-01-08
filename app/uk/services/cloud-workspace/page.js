// app/uk/services/cloud-workspace/page.js
import Link from "next/link";
import { site } from "@/lib/siteConfig";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import {
  ArrowRight,
  CheckCircle2,
  Cloud,
  Users,
  ShieldCheck,
  Settings2,
  Mail,
  FolderKey,
} from "lucide-react";
import { BASE_URL, BUSINESS_ID } from "@/lib/seoIds";

export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || BASE_URL || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/uk/services/cloud-workspace`;
  const ogImage = `${baseUrl}/og-image.png?v=7`;

  const title = `Cloud Workspace for UK Teams | ${brand}`;
  const description =
    "Remote-first cloud workspace setup for UK teams: secure collaboration, identity controls, email best practices, shared files, and simple governance for hybrid work.";

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "en-GB": canonical,
        "en-US": `${baseUrl}/services/cloud-workspace`,
      },
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
      siteName: brand,
      locale: "en_GB",
      alternateLocale: ["en_US"],
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${brand} — Cloud Workspace (UK)` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

export default function UKCloudWorkspacePage() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || BASE_URL || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/uk/services/cloud-workspace`;
  const usVersion = `${baseUrl}/services/cloud-workspace`;

  const WEBSITE_ID = `${baseUrl}/#website`;
  const BREADCRUMB_ID = `${canonical}#breadcrumb`;
  const SERVICE_ID = `${canonical}#service`;
  const WEBPAGE_ID = `${canonical}#webpage`;
  const FAQ_ID = `${canonical}#faq`;

  const faqs = [
    {
      q: "Is Cloud Workspace only about storage?",
      a: "It’s broader — collaboration, identity controls, email and access governance, and keeping hybrid work predictable and secure.",
    },
    {
      q: "Can you support hybrid teams across the UK?",
      a: "Yes. We design setups for remote/hybrid workflows with clear permissions, onboarding patterns, and shared documentation.",
    },
    {
      q: "Do you help reduce data sprawl?",
      a: "Yes — we recommend folder structures, permissions, retention habits, and simple governance to keep things organised.",
    },
    {
      q: "Do you provide training for staff?",
      a: "We can provide short guidance and handover notes so teams understand access, sharing, and safe collaboration basics.",
    },
  ];

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": BREADCRUMB_ID,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
      { "@type": "ListItem", position: 2, name: "UK", item: `${baseUrl}/uk` },
      { "@type": "ListItem", position: 3, name: "Services", item: `${baseUrl}/uk/services` },
      { "@type": "ListItem", position: 4, name: "Cloud Workspace", item: canonical },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": SERVICE_ID,
    name: "Cloud Workspace",
    serviceType: "Cloud Workspace",
    provider: { "@id": BUSINESS_ID },
    areaServed: [{ "@type": "Country", name: "United Kingdom" }],
    url: canonical,
    description:
      "Remote-first cloud workspace setup for UK teams: secure collaboration, identity controls, email best practices, shared files, and simple governance for hybrid work.",
    offers: {
      "@type": "Offer",
      url: `${baseUrl}/uk/contact`,
      description: "Request a quote for cloud workspace support (UK).",
      priceCurrency: "GBP",
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
    name: `Cloud Workspace | ${brand} (UK)`,
    description:
      "Cloud workspace support for UK teams: collaboration setup, access controls, email best practices, shared files and governance.",
    isPartOf: { "@id": WEBSITE_ID },
    breadcrumb: { "@id": BREADCRUMB_ID },
    about: { "@id": BUSINESS_ID },
    mainEntity: { "@id": SERVICE_ID },
    relatedLink: [usVersion],
  };

  const outcomes = [
    "Cleaner collaboration with consistent access and sharing patterns",
    "Safer identity practices (MFA-first) and improved account hygiene",
    "Shared file structure that reduces chaos and duplication",
    "Hybrid-friendly onboarding patterns for new starters",
    "Practical governance for permissions and data access",
  ];

  const included = [
    {
      icon: Cloud,
      title: "Workspace setup",
      desc: "Baseline configuration to support secure and predictable collaboration.",
    },
    {
      icon: Users,
      title: "User onboarding",
      desc: "Repeatable onboarding steps with permission hygiene and clear access patterns.",
    },
    {
      icon: ShieldCheck,
      title: "Identity controls",
      desc: "MFA-first approach and safer access control recommendations.",
    },
    {
      icon: Mail,
      title: "Email best practices",
      desc: "Configuration checks and safer settings recommendations where applicable.",
    },
    {
      icon: FolderKey,
      title: "Shared files + permissions",
      desc: "Folder structures and permission practices to reduce sprawl and confusion.",
    },
    {
      icon: Settings2,
      title: "Governance habits",
      desc: "Simple processes for access requests, audits, and documentation.",
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
        title="Cloud Workspace"
        sub="Secure collaboration for UK teams — identity-first access, clean permissions, shared files and hybrid-ready workflows."
      />

      <section className="max-w-6xl mx-auto px-4 pb-24">
        <Reveal className="mt-6">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">
                UK coverage • Hybrid-ready • Clean collaboration
              </div>
              <p className="text-slate-300 mt-2 max-w-2xl">
                Build a workspace that stays organised as your team grows — with predictable access, safer sharing, and simple governance.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/uk/contact"
                className="rounded-lg px-5 py-3 font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
              >
                Book a Call
              </Link>
              <Link
                href="/uk/services"
                className="rounded-lg px-5 py-3 font-semibold bg-white/10 ring-1 ring-white/20 hover:bg-white/20"
              >
                View services
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
                Built to reduce mess: fewer duplicates, clearer permissions, and safer access patterns.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-semibold">What’s included</h3>
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
                href="/services/cloud-workspace"
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
