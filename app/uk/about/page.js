// app/uk/about/page.js
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/siteConfig";
import { BASE_URL, BUSINESS_ID } from "@/lib/seoIds";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || BASE_URL || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/uk/about`;
  const ogImage = `${baseUrl}/og-image.png?v=7`;

  const title = `About (UK) | ${brand}`;
  const description =
    "About Supreme IT Experts (UK): security-first managed IT, proactive support, and practical roadmaps — delivered remotely across the United Kingdom.";

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "en-GB": canonical,
        "en-US": `${baseUrl}/about`,
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
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${brand} — About (UK)` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function UKAboutPage() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || BASE_URL || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/uk/about`;

  const WEBSITE_ID = `${baseUrl}/#website`;
  const BREADCRUMB_ID = `${canonical}#breadcrumb`;
  const WEBPAGE_ID = `${canonical}#webpage`;

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": BREADCRUMB_ID,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
      { "@type": "ListItem", position: 2, name: "UK", item: `${baseUrl}/uk` },
      { "@type": "ListItem", position: 3, name: "About", item: canonical },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": WEBPAGE_ID,
    url: canonical,
    name: `About (UK) | ${brand}`,
    description:
      "About Supreme IT Experts (UK): security-first managed IT, proactive support, and practical roadmaps — delivered remotely across the United Kingdom.",
    isPartOf: { "@id": WEBSITE_ID },
    breadcrumb: { "@id": BREADCRUMB_ID },
    about: { "@id": BUSINESS_ID },
  };

  const bullets = [
    "Security-first baselines and practical hardening (MFA, endpoint, backup posture)",
    "Proactive monitoring and patching to reduce downtime and surprises",
    "Clear onboarding plan with documentation and ownership",
    "Straightforward reporting: what’s done, what’s next, and what matters",
    "Remote-first delivery across the United Kingdom with a process-driven approach",
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbsSchema, webPageSchema]) }}
      />

      <PageHero
        eyebrow="United Kingdom"
        title={`About ${brand} (UK)`}
        sub="Security-first managed IT with proactive support and practical roadmaps — delivered remotely across the United Kingdom."
      />

      <section className="max-w-6xl mx-auto px-4 pb-24">
        {/* Intro */}
        <Reveal className="mt-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
            <h2 className="text-xl font-semibold">Who we are</h2>
            <p className="mt-2 text-slate-300 leading-7 max-w-3xl">
              {brand} supports small and mid-sized teams with managed IT, cybersecurity, and cloud operations.
              Our UK pages are built for UK businesses — with clear scope, practical delivery, and remote-first
              support across the United Kingdom.
            </p>

            <div className="mt-6 grid md:grid-cols-3 gap-4">
              {[
                { k: "Approach", v: "Security-first + proactive" },
                { k: "Delivery", v: "Remote-first across the UK" },
                { k: "Focus", v: "Stability, clarity, and outcomes" },
              ].map((x) => (
                <div key={x.k} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-400">{x.k}</div>
                  <div className="mt-1 font-semibold text-slate-100">{x.v}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* What you get */}
        <Reveal className="mt-10">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
            <h2 className="text-xl font-semibold">What UK teams get with us</h2>

            <ul className="mt-4 space-y-2 text-slate-200">
              {bullets.map((x) => (
                <li key={x} className="flex gap-2 text-sm leading-6">
                  <CheckCircle2 className="h-4 w-4 text-cyan-300 mt-0.5" />
                  {x}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/uk/services"
                className="inline-flex items-center gap-2 text-sm rounded-lg px-4 py-2 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
              >
                View UK Services <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/uk/contact"
                className="inline-flex items-center gap-2 text-sm rounded-lg px-4 py-2 border border-white/10 bg-white/5 hover:bg-white/10"
              >
                Contact (UK) <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>

        {/* How we work */}
        <Reveal className="mt-10">
          <div className="grid lg:grid-cols-2 gap-6 items-start">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-semibold">How we work</h3>
              <p className="mt-2 text-slate-300 leading-7">
                We keep delivery simple: onboarding, baseline hardening, proactive maintenance, and clear communication.
                You get predictable ownership and a roadmap that matches business priorities — not random ticket noise.
              </p>

              <div className="mt-4 space-y-3 text-sm text-slate-200">
                {[
                  ["Onboarding", "Access + inventory + documentation + quick wins"],
                  ["Stabilise", "Patch cadence + monitoring + identity controls"],
                  ["Secure", "Endpoint + email security + backup posture checks"],
                  ["Improve", "Quarterly roadmap + cost and risk priorities"],
                ].map(([t, d]) => (
                  <div key={t} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="font-semibold">{t}</div>
                    <div className="text-slate-300 mt-1">{d}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 p-6">
              <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">
                UK Enquiries
              </div>
              <h3 className="mt-2 text-xl font-semibold">Talk to us about your setup</h3>
              <p className="mt-2 text-slate-300 leading-7">
                Share your current environment and goals — we’ll suggest a clean, security-first plan and the best-fit
                service scope for your team.
              </p>

              <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm text-slate-300">Best next step</div>
                <div className="mt-1 text-base font-semibold text-slate-100">
                  Use the UK Contact page to book a call
                </div>
                <div className="mt-1 text-xs text-slate-400">
                  You’ll get a quick response with recommended scope, onboarding steps, and next actions.
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/uk/contact"
                  className="inline-flex items-center gap-2 text-sm rounded-lg px-4 py-2 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
                >
                  Book a call <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/uk/areas"
                  className="inline-flex items-center gap-2 text-sm rounded-lg px-4 py-2 border border-white/10 bg-white/5 hover:bg-white/10"
                >
                  UK Coverage <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Internal linking footer */}
        <Reveal className="mt-10">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold">Next steps</h3>
            <p className="text-slate-300 mt-2">
              If you want to see scope details, start from{" "}
              <Link href="/uk/services" className="text-cyan-300 hover:underline">
                UK Services
              </Link>{" "}
              — or review{" "}
              <Link href="/uk/faqs" className="text-cyan-300 hover:underline">
                UK FAQs
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
