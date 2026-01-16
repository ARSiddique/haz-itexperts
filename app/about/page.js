// app/about/page.js
import Link from "next/link";
import Script from "next/script";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/siteConfig";
import { BUSINESS_ID, BASE_URL } from "@/lib/seoIds";

// ─────────────────────────────────────────────────────────────────────────────
// SEO (server-side)
// ─────────────────────────────────────────────────────────────────────────────
export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";

  const baseUrl = String(BASE_URL || site?.url || "https://supremeitexperts.com").replace(
    /\/$/,
    ""
  );

  const titleBase = "About Supreme IT Experts";
  const fullTitle = `${titleBase} | Managed IT & Cybersecurity`;

  const description =
    "Meet the team behind Supreme IT Experts. Senior-led managed IT and cybersecurity for SMBs across Allentown, Macungie & Emmaus — with clear processes, fast response, and accountability.";

  const ogImage = "/og-image.png?v=7";

  return {
    metadataBase: new URL(baseUrl),
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: "/about" },
    robots: { index: true, follow: true },

    openGraph: {
      title: fullTitle,
      description,
      type: "website",
      url: "/about",
      siteName: brand,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${brand} — About` }],
    },

    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}

export default function AboutPage() {
  const brand = site?.name || "Supreme IT Experts";

  const baseUrl = String(BASE_URL || site?.url || "https://supremeitexperts.com").replace(
    /\/$/,
    ""
  );
  const canonical = `${baseUrl}/about`;

  // JSON-LD (WebSite + BreadcrumbList + WebPage) — clean + resolves #website reference
  const WEBSITE_ID = `${baseUrl}/#website`;
  const BREADCRUMB_ID = `${canonical}#breadcrumb`;
  const WEBPAGE_ID = `${canonical}#webpage`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: `${baseUrl}/`,
        name: brand,
        publisher: { "@id": BUSINESS_ID },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        "@id": BREADCRUMB_ID,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
          { "@type": "ListItem", position: 2, name: "About", item: canonical },
        ],
      },
      {
        "@type": "WebPage",
        "@id": WEBPAGE_ID,
        url: canonical,
        name: `About | ${brand}`,
        description:
          "Meet the team behind Supreme IT Experts. Senior-led managed IT and cybersecurity for SMBs across Allentown, Macungie & Emmaus.",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": BUSINESS_ID },
        breadcrumb: { "@id": BREADCRUMB_ID },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: new URL("/og-image.png?v=7", baseUrl).toString(),
        },
      },
    ],
  };

  return (
    <>
      {/* ✅ JSON-LD */}
      <Script
        id="about-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow="About us"
        title="We treat your IT like mission-critical"
        sub="A senior-led team focused on reliability, security-first standards, and clear communication."
        className="sm:px-5 md:px-6"
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-5 md:px-6 pb-20 space-y-10">
        {/* ✅ Intent paragraph (SEO + internal linking) */}
        <Reveal className="mt-2">
          <p className="text-sm text-slate-300 leading-7">
            Looking for{" "}
            <span className="text-slate-100 font-medium">
              business IT support near Allentown, Macungie, or Emmaus
            </span>
            ? We deliver{" "}
            <span className="text-slate-100 font-medium">managed IT services</span>,{" "}
            <span className="text-slate-100 font-medium">24/7 helpdesk support</span>, and{" "}
            <span className="text-slate-100 font-medium">cybersecurity</span> for SMB teams.{" "}
            <Link
              href="/contact?type=assessment&source=about-intent"
              className="underline decoration-dotted underline-offset-2 hover:text-cyan-300"
            >
              Get a free 20-min assessment
            </Link>{" "}
            or browse{" "}
            <Link
              href="/areas"
              className="underline decoration-dotted underline-offset-2 hover:text-cyan-300"
            >
              all service areas
            </Link>
            .
          </p>
        </Reveal>

        <Reveal>
          <section>
            <h2 className="text-xl font-semibold">Who we are</h2>
            <p className="mt-3 text-slate-300 leading-7">
              {brand} is a small, senior-led team helping small and mid-sized businesses keep IT
              stable, secure, and predictable. We support teams across Allentown, Macungie &amp;
              Emmaus with clear processes, documentation, and reporting — so owners always know what’s
              happening and what’s next.
            </p>
          </section>
        </Reveal>

        <Reveal>
          <section>
            <h2 className="text-xl font-semibold">How we work</h2>

            <div className="mt-4 grid gap-3">
              {[
                {
                  title: "Security-first by default",
                  desc: "MFA, hardened endpoints, patching discipline, and practical baselines that reduce risk without slowing teams down.",
                },
                {
                  title: "Planned changes + clear communication",
                  desc: "No surprise changes. We document, communicate before/after work, and keep everything traceable.",
                },
                {
                  title: "Simple, predictable support",
                  desc: "Clean workflows for day-to-day issues, escalation when needed, and measurable results.",
                },
              ].map((x) => (
                <div key={x.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="font-semibold text-slate-100">{x.title}</div>
                  <p className="mt-2 text-sm text-slate-300 leading-7">{x.desc}</p>
                </div>
              ))}
            </div>

            <p className="mt-4 text-slate-300 text-sm leading-7">
              Want the full deliverables? See our{" "}
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
        </Reveal>

        <Reveal>
          <section>
            <h2 className="text-xl font-semibold">What you can expect</h2>
            <ul className="mt-3 space-y-2 text-slate-300 text-sm list-disc pl-5">
              <li>Clear ownership and accountability — no “IT black box.”</li>
              <li>Security-minded recommendations you can actually implement.</li>
              <li>Fast response, clean fixes, and prevention where it matters most.</li>
              <li>Simple explanations for non-technical owners and managers.</li>
            </ul>
          </section>
        </Reveal>

        {/* ✅ CTA block */}
        <Reveal>
          <section className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 p-6">
            <h2 className="text-lg font-semibold">Talk to a real engineer</h2>
            <p className="mt-2 text-sm text-slate-300 leading-7 max-w-2xl">
              If you’re evaluating IT support or want a quick second opinion on security gaps, reach
              out — no pressure.
            </p>

            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact?type=assessment&source=about-cta"
                className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
              >
                Free 20-min assessment
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

            <p className="mt-3 text-xs text-slate-400">
              Prefer location info? Browse{" "}
              <Link href="/areas" className="text-cyan-300 hover:underline">
                Areas we serve
              </Link>
              .
            </p>
          </section>
        </Reveal>
      </main>
    </>
  );
}
