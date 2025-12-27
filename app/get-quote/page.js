// app/get-quote/page.js
import Link from "next/link";
import PageHero from "@/components/PageHero";
import QuoteFormClient from "./QuoteFormClient";
import { site } from "@/lib/siteConfig";
import { BASE_URL, BUSINESS_ID } from "@/lib/seoIds";

// --- SEO (server-side)
export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const canonical = `${BASE_URL}/get-quote`;

  const title = `Get a Quote — ${brand}`;
  const description =
    "See how our pricing works and request a tailored quote for your team, tools and risk profile.";

  const ogImage = new URL("/og-image.png?v=7", BASE_URL).toString();

  return {
    metadataBase: new URL(BASE_URL),
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
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${brand} — Get a Quote` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

const PLANS = [
  {
    name: "Essentials",
    priceNote: "Suitable for small teams",
    description: "Core managed IT for endpoints and standard office tools. Simple, reliable support.",
    includes: ["Day-to-day support for staff", "Patching and basic monitoring", "Help with email and account issues"],
  },
  {
    name: "Secure",
    priceNote: "For growing teams",
    description: "Everything in Essentials plus stronger security controls, backup guidance and reviews.",
    includes: [
      "Security-first configuration for users and devices",
      "Simple backup and recovery plan",
      "Regular review of alerts and incidents",
    ],
  },
  {
    name: "Plus",
    priceNote: "For multi-site or higher-risk teams",
    description: "More time for planning, reporting and working with your leadership on roadmap and risk.",
    includes: [
      "Scheduled check-ins with a senior engineer",
      "Higher-touch support for key systems",
      "Clear monthly summary of work completed",
    ],
  },
];

export default function GetQuotePage() {
  const brand = site?.name || "Supreme IT Experts";
  const canonical = `${BASE_URL}/get-quote`;

  // Must match layout.js IDs
  const WEBSITE_ID = `${BASE_URL}/#website`;
  const BREADCRUMB_ID = `${canonical}#breadcrumb`;
  const PAGE_ID = `${canonical}#webpage`;

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": BREADCRUMB_ID,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Get a Quote", item: canonical },
    ],
  };

  // ✅ Page schema only — DO NOT define BUSINESS_ID here (layout.js already does)
  const quotePageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": PAGE_ID,
    url: canonical,
    name: `Get a Quote — ${brand}`,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": BUSINESS_ID },
    breadcrumb: { "@id": BREADCRUMB_ID },
  };

  return (
    <>
      {/* JSON-LD: Breadcrumbs + WebPage (no org/business duplicates) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbsSchema, quotePageSchema]),
        }}
      />

      <PageHero
        eyebrow="Get quote"
        title="Simple, transparent pricing"
        sub="Share a few details and we’ll send a tailored proposal, not a generic price list."
      />

      <main className="max-w-5xl mx-auto px-4 pb-20 space-y-10">
        <section className="text-sm text-slate-300 leading-7">
          <p>
            Pricing is based mainly on the number of people we support, the tools you use and how critical your systems
            are. We keep the structure simple so it&apos;s easy to budget for.
          </p>
          <p className="mt-3">
            The examples below are guidelines only. We&apos;ll confirm an exact quote after a short conversation about
            your environment.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {PLANS.map((plan) => (
            <div key={plan.name} className="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col">
              <h2 className="text-lg font-semibold text-slate-100">{plan.name}</h2>
              <p className="mt-1 text-xs text-cyan-300/90">{plan.priceNote}</p>
              <p className="mt-3 text-sm text-slate-300">{plan.description}</p>
              <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
                {plan.includes.map((line) => (
                  <li key={line}>• {line}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-slate-100">Prefer to talk it through?</h2>
            <p className="mt-2 text-sm text-slate-300">
              If you&apos;re not sure which plan fits, we can walk through your current setup and give clear options.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/contact?type=assessment&source=get-quote"
              className="rounded-lg px-5 py-3 text-sm font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
            >
              Talk to us
            </Link>
          </div>
        </section>

        {/* Quote-only form (different from /contact) */}
        <div className="mt-4">
          <QuoteFormClient source="get-quote-page" />
        </div>
      </main>
    </>
  );
}
