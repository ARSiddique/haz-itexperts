// app/locations/[slug]/page.js
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/siteConfig";
import { LOCATIONS, getLocationBySlug } from "@/lib/locations";
import { SERVICES } from "@/lib/services";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { BUSINESS_ID } from "@/lib/seoIds";

export async function generateStaticParams() {
  return LOCATIONS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }) {
  const p = await params;
  const slug = Array.isArray(p?.slug) ? p.slug[0] : p?.slug;

  const loc = getLocationBySlug(slug);
  if (!loc) return {};

  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/locations/${loc.slug}`;
  const ogImage = `${baseUrl}/og-image.png?v=7`;

  const title = `${loc.title} | ${brand}`;
  const description = loc.lede;

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
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${brand} — ${loc.city}, ${loc.state}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function LocationPage({ params }) {
  const p = await params;
  const slug = Array.isArray(p?.slug) ? p.slug[0] : p?.slug;

  const loc = getLocationBySlug(slug);
  if (!loc) notFound();

  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const phone = site?.phone || "+1-610-500-9209";
  const canonical = `${baseUrl}/locations/${loc.slug}`;

  // ✅ Stable IDs for clean entity linking
  const WEBSITE_ID = `${baseUrl}/#website`;
  const BREADCRUMB_ID = `${canonical}#breadcrumb`;
  const LOCALBUSINESS_ID = `${canonical}#localbusiness`;
  const WEBPAGE_ID = `${canonical}#webpage`;

  // ✅ Address (dynamic) — fixes Allentown hardcode issue
  const address = {
    "@type": "PostalAddress",
    addressLocality: loc.city,
    addressRegion: loc.state,
    addressCountry: "US",
    ...(loc.postalCode ? { postalCode: loc.postalCode } : {}),
    ...(loc.streetAddress ? { streetAddress: loc.streetAddress } : {}),
  };

  // Breadcrumb schema
  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": BREADCRUMB_ID,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
      { "@type": "ListItem", position: 2, name: "Areas we serve", item: `${baseUrl}/areas` },
      { "@type": "ListItem", position: 3, name: `${loc.city}, ${loc.state}`, item: canonical },
    ],
  };

  // LocalBusiness (location landing page)
  // ✅ No Organization duplicates. We link to your central BUSINESS_ID entity.
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ITService"],
    "@id": LOCALBUSINESS_ID,
    name: brand,
    url: canonical,
    telephone: phone,
    address,
    areaServed: Array.from(
      new Set([
        `${loc.city}, ${loc.state}`,
        ...(loc.nearby?.map((x) => String(x)) || []),
      ])
    ),
    provider: { "@id": BUSINESS_ID },
    branchOf: { "@id": BUSINESS_ID },
    serviceType: [
      "Managed IT Services",
      "Cybersecurity",
      "Cloud Services",
      "Device Management",
      "IT Consulting",
    ],
  };

  // WebPage schema for the location landing page
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": WEBPAGE_ID,
    url: canonical,
    name: `${loc.city}, ${loc.state} — IT Support | ${brand}`,
    description: loc.lede,
    isPartOf: { "@id": WEBSITE_ID },
    breadcrumb: { "@id": BREADCRUMB_ID },
    about: { "@id": BUSINESS_ID },
    mainEntity: { "@id": LOCALBUSINESS_ID },
  };

  return (
    <>
      {/* Breadcrumbs + LocalBusiness + WebPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbsSchema, localBusinessSchema, webPageSchema]),
        }}
      />

      <PageHero eyebrow="Areas we serve" title={`${loc.city}, ${loc.state}`} sub={loc.lede} />

      <section className="max-w-6xl mx-auto px-4 pb-24">
        {/* quick CTA */}
        <Reveal className="mt-4">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80 flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Supporting teams in {loc.city} and nearby areas
              </div>
              <p className="text-slate-300 mt-2 max-w-2xl">
                We provide security-first IT support with proactive monitoring, patching, and clear communication — delivered
                remotely across the U.S.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/get-quote"
                className="rounded-lg px-5 py-3 font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
              >
                Get a Quote
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

        {/* what we do + services */}
        <Reveal className="mt-10">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-semibold">What we provide for {loc.city} businesses</h2>
              <ul className="mt-4 space-y-2 text-slate-200">
                {[
                  "Helpdesk with clear ownership and predictable response times",
                  "Patching + monitoring to reduce downtime and surprises",
                  "Identity hardening (MFA/SSO) and endpoint protection",
                  "Backup & disaster recovery with test restores",
                  "Executive-ready reporting and practical roadmaps",
                ].map((x) => (
                  <li key={x} className="flex gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-cyan-300 mt-0.5" />
                    {x}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-slate-400">
                Prefer local-style coverage without local complexity — we operate as your remote IT team, with optional partner
                coordination when needed.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-semibold">Popular services</h3>

              {/* ✅ Uses central service map */}
              <div className="mt-4 grid sm:grid-cols-2 gap-3">
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

              {!!loc.nearby?.length && (
                <p className="mt-4 text-sm text-slate-400">
                  Nearby coverage focus: {loc.nearby.join(", ")}.
                </p>
              )}
            </div>
          </div>
        </Reveal>

        {/* Services in this area (full internal linking block) */}
        <Reveal className="mt-10">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <h3 className="text-xl font-semibold">Services in {loc.city}</h3>
                <p className="text-slate-300 mt-2 max-w-3xl">
                  Browse deliverables, process, and what’s included. These pages are designed for fast comparison.
                </p>
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm rounded-lg px-4 py-2 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
              >
                View all services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-4">
              {SERVICES.map((s) => (
                <Link
                  key={s.key}
                  href={s.href}
                  className="group block rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-cyan-300/30 transition"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-extrabold">{s.title}</div>
                    <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-cyan-200 transition" />
                  </div>
                  <p className="mt-2 text-sm text-slate-300 leading-6">{s.blurb}</p>
                  <div className="mt-4 h-1 w-0 bg-cyan-400/70 group-hover:w-full transition-all rounded-full" />
                </Link>
              ))}
            </div>
          </div>
        </Reveal>

        {/* internal links block */}
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
