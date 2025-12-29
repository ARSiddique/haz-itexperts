// app/about/page.js
import Link from "next/link";
import Script from "next/script";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/siteConfig";
import { BUSINESS_ID } from "@/lib/seoIds";


// ─────────────────────────────────────────────────────────────────────────────
// SEO (server-side)
// ─────────────────────────────────────────────────────────────────────────────
export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || "https://supremeitexperts.com").replace(/\/$/, "");

  const title = "About";
  const description =
    "Learn who we are, how we work, and how we support SMBs with reliable managed IT and cybersecurity across Allentown, Macungie & Emmaus."

  const ogImage = `/og-image.png?v=7`;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    alternates: { canonical: "/about" }, // ✅ relative canonical (best w/ metadataBase)
    robots: { index: true, follow: true },

    openGraph: {
      title: `${title} | ${brand}`,
      description,
      type: "website",
      url: "/about", // ✅ relative (metadataBase handles absolute)
      siteName: brand,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${brand} — About`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${title} | ${brand}`,
      description,
      images: [ogImage],
    },
  };
}

export default function AboutPage() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/about`;

  // JSON-LD (BreadcrumbList + WebPage) — clean and valid
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
          { "@type": "ListItem", position: 2, name: "About", item: canonical },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: `About | ${brand}`,
        description:
          "Learn who we are, how we work, and how we support SMBs with reliable managed IT and cybersecurity across Allentown, Macungie & Emmaus, PA",
        isPartOf: { "@id": `${baseUrl}/#website` },
        about: { "@id": BUSINESS_ID },
        breadcrumb: { "@id": `${canonical}#breadcrumb` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${baseUrl}/og-image.png?v=7`,
        },
      },
    ],
  };

  return (
    <>
      {/* ✅ JSON-LD (best practice via next/script) */}
      <Script
        id="about-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow="About us"
        title="We treat your IT like mission-critical"
        sub="A small senior team focused on reliability, security and clear communication."
        className="sm:px-5 md:px-6"
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-5 md:px-6 pb-20 space-y-10">
        <section>
          <h2 className="text-xl font-semibold">Who we are</h2>
          <p className="mt-3 text-slate-300 leading-7">
            {brand} is a small, senior-led team helping small and mid-sized
            businesses keep IT stable, secure and predictable. We serve teams in
            Allentown, Macungie & Emmaus with clear processes,
            documentation and reporting—so owners always know what’s happening.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">How we work</h2>
          <ul className="mt-3 space-y-2 text-slate-300 text-sm list-disc pl-5">
            <li>Security-first configuration for devices, email and accounts.</li>
            <li>Planned changes with communication before and after work.</li>
            <li>Simple, fixed-fee support for day-to-day issues.</li>
          </ul>

          <p className="mt-4 text-slate-300 text-sm leading-7">
            If you want details on what’s included, see our{" "}
            <Link
              href="/services"
              className="underline decoration-dotted underline-offset-2 hover:text-cyan-300"
            >
              IT services
            </Link>{" "}
            and how we structure{" "}
            <Link
              href="/services/managed-it"
              className="underline decoration-dotted underline-offset-2 hover:text-cyan-300"
            >
              managed IT
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">What you can expect</h2>
          <p className="mt-3 text-slate-300 text-sm leading-7">
            Our goal is that your IT “just works” so your team can focus on
            customers and growth. When something breaks, you get a clear
            response, a simple explanation and a fix—with real accountability
            behind it.
          </p>
        </section>

        {/* ✅ CTA block */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.06] p-6">
          <h2 className="text-lg font-semibold">Talk to a real engineer</h2>
          <p className="mt-2 text-sm text-slate-300 leading-7 max-w-2xl">
            If you’re evaluating IT support or want a quick second opinion on
            security gaps, reach out—no pressure.
          </p>

          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <Link
              href="/get-quote"
              className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
            >
              Get a Quote
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-300/30 hover:text-cyan-300 transition"
            >
              Contact us
            </Link>

            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-300/30 hover:text-cyan-300 transition"
            >
              View services
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
