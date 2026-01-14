// app/locations/[slug]/page.js
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/siteConfig";
import { LOCATIONS, getLocationBySlug } from "@/lib/locations";
import { SERVICES } from "@/lib/services";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Mail,
  Database,
  ShieldCheck,
} from "lucide-react";
import { BUSINESS_ID, BASE_URL } from "@/lib/seoIds";

export async function generateStaticParams() {
  return LOCATIONS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }) {
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;

  const loc = getLocationBySlug(slug);
  if (!loc) return {};

  const brand = site?.name || "Supreme IT Experts";

  // ✅ unified baseUrl (same pattern as Home/Services)
  const baseUrl = String(BASE_URL || site?.url || "https://supremeitexperts.com").replace(
    /\/$/,
    ""
  );

  const path = `/locations/${loc.slug}`;

  // ✅ CTR-focused title/desc (avoid layout title template duplication)
  const titleBase = `Managed IT Services in ${loc.city}, ${loc.state}`;
  const fullTitle = `${titleBase} | Cybersecurity-First IT Support | ${brand}`;

  const description =
    `Fast remote IT support for ${loc.city} businesses — helpdesk, cybersecurity, Microsoft 365, backups & disaster recovery. ` +
    `Book a free 20-min IT assessment.`;

  return {
    metadataBase: new URL(baseUrl),

    // ✅ prevent: "X | BRAND | BRAND"
    title: { absolute: fullTitle },

    description,

    keywords: [
      `managed IT services ${loc.city}`,
      `IT support ${loc.city} ${loc.state}`,
      `cybersecurity services ${loc.city}`,
      `Microsoft 365 support ${loc.city}`,
      `backup and disaster recovery ${loc.city}`,
      `managed service provider ${loc.city}`,
    ],

    // ✅ keep canonical RELATIVE (metadataBase makes it absolute)
    alternates: { canonical: path },

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
      title: fullTitle,
      description,
      type: "website",
      url: path, // ✅ relative
      siteName: brand,
      images: [
        {
          url: "/og-image.png?v=7", // ✅ relative
          width: 1200,
          height: 630,
          alt: `${brand} — Managed IT Services in ${loc.city}, ${loc.state}`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/og-image.png?v=7"],
    },
  };
}

export default async function LocationPage({ params }) {
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;

  const loc = getLocationBySlug(slug);
  if (!loc) notFound();

  const brand = site?.name || "Supreme IT Experts";

  // ✅ unified baseUrl
  const baseUrl = String(BASE_URL || site?.url || "https://supremeitexperts.com").replace(
    /\/$/,
    ""
  );

  const canonical = `${baseUrl}/locations/${loc.slug}`;

  // ✅ Stable IDs
  const WEBSITE_ID = `${baseUrl}/#website`;
  const WEBSITE_NODE_ID = `${baseUrl}/#website-node`;
  const BREADCRUMB_ID = `${canonical}#breadcrumb`;
  const SERVICE_ID = `${canonical}#service`;
  const WEBPAGE_ID = `${canonical}#webpage`;
  const FAQ_ID = `${canonical}#faq`;

  // FAQs (safe)
  const faqs = Array.isArray(loc.faqs) ? loc.faqs : [];

  // Local copy (optional)
  const localParas =
    Array.isArray(loc?.copy?.paragraphs) && loc.copy.paragraphs.length
      ? loc.copy.paragraphs
      : [];

  /**
   * ✅ IMPORTANT:
   * Location pages pe LocalBusiness/Organization node ADD nahi karna.
   * Only: WebPage + Service + Breadcrumb + FAQ (provider = BUSINESS_ID)
   */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // WebSite (safe + helps resolve WEBSITE_ID reference)
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: `${baseUrl}/`,
        name: brand,
        inLanguage: "en-US",
      },

      // Breadcrumbs
      {
        "@type": "BreadcrumbList",
        "@id": BREADCRUMB_ID,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
          { "@type": "ListItem", position: 2, name: "Areas we serve", item: `${baseUrl}/areas` },
          { "@type": "ListItem", position: 3, name: `${loc.city}, ${loc.state}`, item: canonical },
        ],
      },

      // Service
      {
        "@type": "Service",
        "@id": SERVICE_ID,
        name: `Managed IT Services in ${loc.city}, ${loc.state}`,
        serviceType: "Managed IT Services",
        description: loc.lede,
        url: canonical,
        provider: { "@id": BUSINESS_ID },
        areaServed: {
          "@type": "City",
          name: `${loc.city}, ${loc.state}`,
        },
      },

      // WebPage
      {
        "@type": "WebPage",
        "@id": WEBPAGE_ID,
        url: canonical,
        name: `Managed IT Services in ${loc.city}, ${loc.state} | ${brand}`,
        description: loc.lede,
        isPartOf: { "@id": WEBSITE_ID },
        breadcrumb: { "@id": BREADCRUMB_ID },
        about: { "@id": BUSINESS_ID },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: new URL("/og-image.png?v=7", baseUrl).toString(),
        },
        mainEntity: { "@id": SERVICE_ID },
      },

      // FAQPage (only if exists)
      ...(faqs.length
        ? [
            {
              "@type": "FAQPage",
              "@id": FAQ_ID,
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
              isPartOf: { "@id": WEBPAGE_ID },
            },
          ]
        : []),
    ],
  };

  // ✅ Intent blocks (safe links)
  const focusCards = [
    {
      icon: ShieldCheck,
      title: "Cybersecurity-first IT support",
      desc: "MFA/identity hardening, endpoint protection, patching, and monitoring to reduce risk and downtime.",
      link: "/services",
      cta: "View cybersecurity services",
    },
    {
      icon: Database,
      title: "Backups & disaster recovery",
      desc: "Backup + recovery planning with test restores so you can bounce back fast.",
      link: "/services",
      cta: "Explore backup/DR",
    },
    {
      icon: Mail,
      title: "Microsoft 365 & email support",
      desc: "Setup, troubleshooting, and security best practices for Microsoft 365 and email.",
      link: "/services",
      cta: "Microsoft 365 help",
    },
    {
      icon: CheckCircle2,
      title: "Managed IT & helpdesk",
      desc: "Clear ownership, predictable response times, and proactive IT management for your team.",
      link: "/services",
      cta: "Managed IT options",
    },
  ];

  return (
    <>
      {/* ✅ Clean JSON-LD (single script) */}
      <Script
        id={`location-jsonld-${loc.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow="Areas we serve"
        title={`${loc.city}, ${loc.state}`}
        sub={`Managed IT Services in ${loc.city}, ${loc.state} — cybersecurity-first support, backups & Microsoft 365.`}
      />

      <section className="max-w-6xl mx-auto px-4 pb-24">
        {/* Top CTA */}
        <Reveal className="mt-4">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80 flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Supporting teams in {loc.city} and nearby areas
              </div>

              <p className="text-slate-300 mt-2 max-w-2xl">{loc.lede}</p>

              {!!loc.nearby?.length && (
                <p className="mt-2 text-sm text-slate-400">
                  Nearby coverage focus: {loc.nearby.join(", ")}.
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <Link
                href={`/contact?type=assessment&source=location-${loc.slug}`}
                className="rounded-lg px-5 py-3 font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
              >
                Free 20-min assessment
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

        {/* Local copy (Allentown skeleton etc.) */}
        {localParas.length > 0 && (
          <Reveal className="mt-10">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-semibold">
                Local IT support for {loc.city}, {loc.state}
              </h2>
              <div className="mt-3 space-y-3 text-slate-300 leading-7">
                {localParas.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={`/contact?type=assessment&source=location-${loc.slug}`}
                  className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
                >
                  {loc?.copy?.primaryCtaText || "Free 20-min IT assessment"}{" "}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:bg-white/10"
                >
                  {loc?.copy?.secondaryCtaText || "Contact us"} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {!!loc?.copy?.microTrust && (
                <p className="mt-3 text-xs text-slate-400">{loc.copy.microTrust}</p>
              )}
            </div>
          </Reveal>
        )}

        {/* Intent-based focus blocks */}
        <Reveal className="mt-10">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold">Core IT services for {loc.city} businesses</h2>
            <p className="text-slate-300 mt-2 max-w-3xl">
              Based on what businesses typically search for in {loc.city}, these are the most requested
              support areas.
            </p>

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {focusCards.map((c) => (
                <div key={c.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-start gap-3">
                    <c.icon className="h-5 w-5 text-cyan-300 mt-0.5" />
                    <div>
                      <div className="font-extrabold">{c.title}</div>
                      <p className="mt-2 text-sm text-slate-300 leading-6">{c.desc}</p>
                      <Link
                        href={c.link}
                        className="mt-3 inline-flex items-center gap-2 text-sm text-cyan-300 hover:underline"
                      >
                        {c.cta} <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Common problems (query alignment) */}
        <Reveal className="mt-10">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold">Common issues we fix in {loc.city}</h3>
            <div className="mt-4 grid md:grid-cols-2 gap-3 text-slate-200">
              {[
                "Slow PCs, frequent crashes, and performance bottlenecks",
                "Downtime from patching gaps and outdated systems",
                "Wi-Fi / network instability and unreliable connectivity",
                "Microsoft 365 / email issues, access problems, and security risks",
                "Weak security posture (missing MFA, risky devices, poor baselines)",
                "Backup failures and unclear disaster recovery steps",
              ].map((x) => (
                <div key={x} className="flex gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-cyan-300 mt-0.5" />
                  {x}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Services list (keep) */}
        <Reveal className="mt-10">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <h3 className="text-xl font-semibold">Popular services</h3>
                <p className="text-slate-300 mt-2 max-w-3xl">
                  Browse deliverables, process, and what’s included — designed for fast comparison.
                </p>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm rounded-lg px-4 py-2 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
              >
                View all services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              {SERVICES.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm hover:border-cyan-300/30 hover:bg-cyan-400/10 hover:text-cyan-300 transition"
                >
                  {s.title}
                </Link>
              ))}
            </div>
          </div>
        </Reveal>

        {/* FAQs (visible) */}
        {faqs.length > 0 && (
          <Reveal className="mt-10">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-semibold">
                FAQs — {loc.city}, {loc.state}
              </h3>
              <div className="mt-4 space-y-3">
                {faqs.map((f) => (
                  <details key={f.q} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <summary className="cursor-pointer font-semibold text-slate-200">{f.q}</summary>
                    <p className="mt-2 text-sm text-slate-300 leading-6">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* Next steps */}
        <Reveal className="mt-10">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold">Next steps</h3>
            <p className="text-slate-300 mt-2">
              Compare options from our{" "}
              <Link href="/services" className="text-cyan-300 hover:underline">
                Services overview
              </Link>{" "}
              or review{" "}
              <Link href="/faqs" className="text-cyan-300 hover:underline">
                FAQs
              </Link>
              .
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:bg-white/10"
              >
                Explore services <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/areas"
                className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:bg-white/10"
              >
                Areas we serve <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={`/contact?type=assessment&source=location-${loc.slug}`}
                className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
              >
                Request an assessment <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
