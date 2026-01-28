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

function normalizeSlug(raw) {
  if (!raw) return "";
  return Array.isArray(raw) ? String(raw[0] || "") : String(raw || "");
}

export async function generateStaticParams() {
  return LOCATIONS.map((l) => ({ slug: l.slug }));
}

/**
 * ✅ Query-aligned snippets (based on your GSC screenshots)
 * Keep it natural — no stuffing.
 */
function getQueryPack(slug, city, state) {
  const packs = {
    "allentown-pa": {
      headline: `Popular searches in ${city}`,
      items: [
        {
          term: `Managed IT services ${city}`,
          desc: "Proactive monitoring, patching, and helpdesk support.",
          href: "/services/managed-it",
        },
        {
          term: `Cybersecurity near ${city}`,
          desc: "MFA, endpoint protection, and security baselines.",
          href: "/services/cybersecurity",
        },
        {
          term: `IT support ${city}`,
          desc: "Fast remote support for daily issues and outages.",
          href: "/services/managed-it",
        },
        {
          term: `Help desk solutions in ${city}`,
          desc: "Ticketing + response process designed for SMB teams.",
          href: "/services/managed-it",
        },
        {
          term: `Backup planning services ${city}`,
          desc: "Backup + test restores + disaster recovery planning.",
          href: "/services/projects-consulting",
        },
        {
          term: `Cybersecurity testing in ${city}, ${state}`,
          desc: "Security reviews, baselines, and risk reduction plan.",
          href: "/services/cybersecurity",
        },
      ],
      metaBoost:
        "Managed IT services, cybersecurity, help desk solutions, IT support, backup planning in Allentown, PA.",
    },

    "macungie-pa": {
      headline: `Popular searches in ${city}`,
      items: [
        {
          term: `Business IT support near ${city} ${state}`,
          desc: "Reliable helpdesk + proactive IT management.",
          href: "/services/managed-it",
        },
        {
          term: `Managed IT services ${city}`,
          desc: "Monthly managed support for SMBs.",
          href: "/services/managed-it",
        },
        {
          term: `Cybersecurity services ${city}`,
          desc: "Reduce risk with MFA + endpoint protection.",
          href: "/services/cybersecurity",
        },
        {
          term: `Microsoft 365 support ${city}`,
          desc: "Email issues, setup, security and troubleshooting.",
          href: "/services/cloud-workspace",
        },
      ],
      metaBoost: "Business IT support near Macungie, PA + managed IT and cybersecurity.",
    },

    "emmaus-pa": {
      headline: `Popular searches in ${city}`,
      items: [
        {
          term: `Tech support in ${city} ${state}`,
          desc: "Fast remote troubleshooting for teams.",
          href: "/services/managed-it",
        },
        {
          term: `IT support ${city}`,
          desc: "Helpdesk + proactive maintenance.",
          href: "/services/managed-it",
        },
        {
          term: `Cybersecurity near ${city}`,
          desc: "Identity + endpoint + patching to reduce downtime.",
          href: "/services/cybersecurity",
        },
        {
          term: `Business IT support near ${city}`,
          desc: "Small-business friendly managed support.",
          href: "/services/managed-it",
        },
      ],
      metaBoost: "Tech support in Emmaus, PA + managed IT and cybersecurity.",
    },
  };

  return (
    packs[slug] || {
      headline: `Popular searches in ${city}`,
      items: [
        {
          term: `Managed IT services ${city}`,
          desc: "Helpdesk, monitoring, patching, and proactive support.",
          href: "/services/managed-it",
        },
        {
          term: `Cybersecurity services ${city}`,
          desc: "MFA, endpoint protection, and security best practices.",
          href: "/services/cybersecurity",
        },
      ],
      metaBoost: `Managed IT services and cybersecurity in ${city}, ${state}.`,
    }
  );
}

export async function generateMetadata({ params }) {
  const awaitedParams = await params;
  const slug = normalizeSlug(awaitedParams?.slug);

  const loc = getLocationBySlug(slug);
  if (!loc) return {};

  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = String(BASE_URL || site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const path = `/locations/${loc.slug}`;

  const pack = getQueryPack(loc.slug, loc.city, loc.state);

  // ✅ CTR-friendly title (contains city + service + benefit)
  const title = `Managed IT Services ${loc.city}, ${loc.state} | Help Desk + Cybersecurity | ${brand}`;

  // ✅ Snippet-friendly meta (includes “business IT support” intent + CTA)
  const description =
    `Need business IT support in ${loc.city}, ${loc.state}? Managed IT, help desk, cybersecurity, Microsoft 365, backups & disaster recovery. ` +
    `Book a free 20-min IT assessment.`;

  return {
    metadataBase: new URL(baseUrl),
    title: { absolute: title },
    description,
    keywords: [
      `managed IT services ${loc.city}`,
      `business IT support ${loc.city}`,
      `IT support ${loc.city} ${loc.state}`,
      `help desk ${loc.city}`,
      `cybersecurity near ${loc.city}`,
      `Microsoft 365 support ${loc.city}`,
      `backup planning ${loc.city}`,
      `managed service provider ${loc.city}`,
    ],
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
      title,
      description: `${description} ${pack.metaBoost}`,
      type: "website",
      url: path,
      siteName: brand,
      images: [
        {
          url: "/og-image.png?v=7",
          width: 1200,
          height: 630,
          alt: `${brand} — Managed IT Services in ${loc.city}, ${loc.state}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: `${description} ${pack.metaBoost}`,
      images: ["/og-image.png?v=7"],
    },
  };
}

export default async function LocationPage({ params }) {
  const awaitedParams = await params;
  const slug = normalizeSlug(awaitedParams?.slug);

  const loc = getLocationBySlug(slug);
  if (!loc) notFound();

  const brand = site?.name || "Supreme IT Experts";

  const baseUrl = String(BASE_URL || site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/locations/${loc.slug}`;

  const WEBSITE_ID = `${baseUrl}/#website`;
  const BREADCRUMB_ID = `${canonical}#breadcrumb`;
  const SERVICE_ID = `${canonical}#service`;
  const WEBPAGE_ID = `${canonical}#webpage`;
  const FAQ_ID = `${canonical}#faq`;

  const faqs = Array.isArray(loc.faqs) ? loc.faqs : [];
  const localParas =
    Array.isArray(loc?.copy?.paragraphs) && loc.copy.paragraphs.length ? loc.copy.paragraphs : [];

  const pack = getQueryPack(loc.slug, loc.city, loc.state);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: `${baseUrl}/`,
        name: brand,
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        "@id": BREADCRUMB_ID,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
          { "@type": "ListItem", position: 2, name: "Areas we serve", item: `${baseUrl}/areas` },
          { "@type": "ListItem", position: 3, name: `${loc.city}, ${loc.state}`, item: canonical },
        ],
      },
      {
        "@type": "Service",
        "@id": SERVICE_ID,
        name: `Managed IT Services in ${loc.city}, ${loc.state}`,
        serviceType: "Managed IT Services",
        description: loc.lede,
        url: canonical,
        provider: { "@id": BUSINESS_ID },
        areaServed: { "@type": "City", name: `${loc.city}, ${loc.state}` },
      },
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

  const focusCards = [
    {
      icon: ShieldCheck,
      title: "Cybersecurity-first IT support",
      desc: "MFA/identity hardening, endpoint protection, patching, and monitoring to reduce risk and downtime.",
      link: "/services/cybersecurity",
      cta: "Cybersecurity options",
    },
    {
      icon: Database,
      title: "Backups & disaster recovery",
      desc: "Backup + recovery planning with test restores so you can bounce back fast.",
      link: "/services/projects-consulting",
      cta: "Backup/DR planning",
    },
    {
      icon: Mail,
      title: "Microsoft 365 & email support",
      desc: "Setup, troubleshooting, and security best practices for Microsoft 365 and email.",
      link: "/services/cloud-workspace",
      cta: "Microsoft 365 help",
    },
    {
      icon: CheckCircle2,
      title: "Managed IT & helpdesk",
      desc: "Clear ownership, predictable response times, and proactive IT management for your team.",
      link: "/services/managed-it",
      cta: "Managed IT services",
    },
  ];

  // ✅ Cross-link to the other 2 locations (extra strong internal links)
  const otherLocations = (LOCATIONS || []).filter((l) => l.slug !== loc.slug).slice(0, 2);

  return (
    <>
      <Script
        id={`location-jsonld-${loc.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow="Areas we serve"
        title={`${loc.city}, ${loc.state}`}
        sub={`Managed IT services, help desk & cybersecurity in ${loc.city}, ${loc.state} — plus backups & Microsoft 365 support.`}
      />

      <section className="max-w-6xl mx-auto px-4 pb-24">
        <Reveal className="mt-4">
          <p className="text-sm text-slate-300">
            Looking for{" "}
            <span className="text-slate-100 font-medium">
              business IT support near {loc.city}, {loc.state}
            </span>
            ? We provide{" "}
            <span className="text-slate-100 font-medium">managed IT services</span>,{" "}
            <span className="text-slate-100 font-medium">help desk support</span> and{" "}
            <span className="text-slate-100 font-medium">cybersecurity</span> for local teams.{" "}
            <Link
              href={`/contact?type=assessment&source=location-intent-${loc.slug}`}
              className="underline decoration-dotted underline-offset-2 hover:text-cyan-300"
            >
              Get a free 20-min assessment
            </Link>{" "}
            or browse{" "}
            <Link href="/services" className="underline decoration-dotted underline-offset-2 hover:text-cyan-300">
              service options
            </Link>
            .
          </p>
        </Reveal>

        {/* ✅ GSC query aligned block + links */}
        <Reveal className="mt-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-xl font-semibold">{pack.headline}</h2>
                <p className="mt-2 text-sm text-slate-300 max-w-3xl">
                  These are common “intent” searches we see for {loc.city}. If you’re searching any of these, this page is for you.
                </p>
              </div>

              <div className="flex gap-3">
                <Link
                  href={`/contact?type=assessment&source=location-queries-${loc.slug}`}
                  className="inline-flex items-center gap-2 text-sm rounded-lg px-4 py-2 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
                >
                  Free assessment <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/get-quote"
                  className="inline-flex items-center gap-2 text-sm rounded-lg px-4 py-2 border border-white/10 bg-white/5 hover:bg-white/10"
                >
                  Pricing & quote <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="mt-5 grid md:grid-cols-2 gap-3">
              {pack.items.map((it) => (
                <Link
                  key={it.term}
                  href={it.href}
                  className="rounded-xl border border-white/10 bg-black/15 p-4 hover:border-cyan-300/30 hover:bg-cyan-400/10 transition"
                >
                  <div className="font-semibold text-slate-100">{it.term}</div>
                  <div className="mt-1 text-sm text-slate-300">{it.desc}</div>
                  <div className="mt-2 text-sm text-cyan-300 inline-flex items-center gap-2">
                    Explore <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/services/managed-it" className="text-sm text-cyan-200/85 hover:text-cyan-200 hover:underline">
                Managed IT
              </Link>
              <Link href="/services/cybersecurity" className="text-sm text-cyan-200/85 hover:text-cyan-200 hover:underline">
                Cybersecurity
              </Link>
              <Link href="/services/cloud-workspace" className="text-sm text-cyan-200/85 hover:text-cyan-200 hover:underline">
                Microsoft 365
              </Link>
              <Link href="/services/projects-consulting" className="text-sm text-cyan-200/85 hover:text-cyan-200 hover:underline">
                Backup/DR Planning
              </Link>
              <Link href="/contact" className="text-sm text-cyan-200/85 hover:text-cyan-200 hover:underline">
                Contact
              </Link>
              <Link href="/areas" className="text-sm text-cyan-200/85 hover:text-cyan-200 hover:underline">
                Areas we serve
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-6">
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

        {localParas.length > 0 && (
          <Reveal className="mt-10">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-semibold">Local IT support for {loc.city}, {loc.state}</h2>

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
                  {loc?.copy?.primaryCtaText || "Free 20-min IT assessment"} <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/get-quote"
                  className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:bg-white/10"
                >
                  Pricing & quote <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:bg-white/10"
                >
                  {loc?.copy?.secondaryCtaText || "Contact us"} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {!!loc?.copy?.microTrust && <p className="mt-3 text-xs text-slate-400">{loc.copy.microTrust}</p>}
            </div>
          </Reveal>
        )}

        <Reveal className="mt-10">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold">Core IT services for {loc.city} businesses</h2>
            <p className="text-slate-300 mt-2 max-w-3xl">
              Based on what businesses typically search for in {loc.city}, these are the most requested support areas.
            </p>

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {focusCards.map((c) => (
                <div key={c.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-start gap-3">
                    <c.icon className="h-5 w-5 text-cyan-300 mt-0.5" />
                    <div>
                      <div className="font-extrabold">{c.title}</div>
                      <p className="mt-2 text-sm text-slate-300 leading-6">{c.desc}</p>
                      <Link href={c.link} className="mt-3 inline-flex items-center gap-2 text-sm text-cyan-300 hover:underline">
                        {c.cta} <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

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

        {/* ✅ Nearby locations links (extra internal links + cluster) */}
        {otherLocations.length ? (
          <Reveal className="mt-10">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-semibold">Nearby areas</h3>
              <p className="mt-2 text-slate-300">
                If you’re close to {loc.city}, these nearby locations are also covered:
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {otherLocations.map((l) => (
                  <Link
                    key={l.slug}
                    href={`/locations/${l.slug}`}
                    className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:bg-white/10"
                  >
                    {l.city}, {l.state} <ArrowRight className="h-4 w-4" />
                  </Link>
                ))}
                <Link
                  href="/areas"
                  className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
                >
                  View all areas <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        ) : null}

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

              <Link
                href="/get-quote"
                className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:bg-white/10"
              >
                Get a quote <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
