// app/uk/contact/page.js
import Link from "next/link";
import { site } from "@/lib/siteConfig";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { ArrowRight, Mail, CalendarCheck, MessageCircle } from "lucide-react";
import { BASE_URL, BUSINESS_ID } from "@/lib/seoIds";

export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || BASE_URL || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/uk/contact`;
  const ogImage = `${baseUrl}/og-image.png?v=7`;

  const title = `Contact UK Support | ${brand}`;
  const description =
    "Contact us for UK services. Get a quick response on onboarding, pricing, and next steps for UK-based teams (remote-first).";

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "en-GB": canonical,
        "en-US": `${baseUrl}/contact`,
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
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${brand} — UK Contact` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

function toDigitsE164(phone) {
  if (!phone) return "";
  const cleaned = phone.replace(/[^\d+]/g, "");
  if (!cleaned) return "";
  return cleaned.startsWith("+") ? cleaned : `+${cleaned}`;
}

export default function UKContactPage() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || BASE_URL || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/uk/contact`;

  // ✅ Use shared business email
  const EMAIL = site?.email || "supremeitexperts@gmail.com";

  // ✅ WhatsApp: use your existing number (works for UK enquiries too)
  const WA_DISPLAY = "+92 305 5249093";
  const WA_E164 = toDigitsE164(WA_DISPLAY) || "+923055249093";
  const WA_DIGITS = WA_E164.replace(/[^\d]/g, "");
  const WA_LINK = `https://wa.me/${WA_DIGITS}?text=${encodeURIComponent(
    "Hello! I'd like to enquire about UK IT services.\n\nCompany:\nTeam size:\nService needed:\nPreferred time:\nNotes:"
  )}`;

  // ✅ Stable IDs
  const WEBSITE_ID = `${baseUrl}/#website`;
  const BREADCRUMB_ID = `${canonical}#breadcrumb`;
  const WEBPAGE_ID = `${canonical}#webpage`;
  const CONTACTPOINT_ID = `${canonical}#contactpoint`;

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": BREADCRUMB_ID,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
      { "@type": "ListItem", position: 2, name: "UK", item: `${baseUrl}/uk` },
      { "@type": "ListItem", position: 3, name: "Contact", item: canonical },
    ],
  };

  // ContactPoint (safe: email + url; telephone intentionally omitted)
  const contactPointSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPoint",
    "@id": CONTACTPOINT_ID,
    contactType: "sales",
    email: EMAIL,
    areaServed: "GB",
    availableLanguage: ["en-GB", "en"],
    url: canonical,
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": WEBPAGE_ID,
    url: canonical,
    name: `UK Contact | ${brand}`,
    description:
      "Contact us for UK services. Get a quick response on onboarding, pricing, and next steps for UK-based teams (remote-first).",
    isPartOf: { "@id": WEBSITE_ID },
    breadcrumb: { "@id": BREADCRUMB_ID },
    about: { "@id": BUSINESS_ID },
    mainEntity: { "@id": CONTACTPOINT_ID },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbsSchema, contactPointSchema, webPageSchema]),
        }}
      />

      <PageHero
        eyebrow="United Kingdom"
        title="Contact us (UK)"
        sub="Quick response on onboarding, pricing, and next steps — remote-first support for UK-based teams."
      />

      <section className="max-w-6xl mx-auto px-4 pb-24">
        {/* Top CTA row */}
        <Reveal className="mt-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">Contact options</h2>
                <p className="mt-2 text-slate-300 max-w-3xl">
                  Send an enquiry and we’ll come back with a clear plan — scope, timelines, and what to do first.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${EMAIL}?subject=${encodeURIComponent("UK enquiry — Supreme IT Experts")}`}
                  className="inline-flex items-center gap-2 text-sm rounded-lg px-4 py-2 border border-white/10 bg-white/5 hover:bg-white/10"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </a>

                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm rounded-lg px-4 py-2 border border-white/10 bg-white/5 hover:bg-white/10"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>

                <Link
                  href="/uk/services"
                  className="inline-flex items-center gap-2 text-sm rounded-lg px-4 py-2 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
                >
                  View services <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        {/* “Book a call” card */}
        <Reveal className="mt-10">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 p-6 md:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80 flex items-center gap-2">
                  <CalendarCheck className="h-4 w-4" /> UK Call Booking
                </div>
                <h3 className="mt-2 text-2xl font-extrabold">Tell us what you need — we’ll guide the next steps</h3>
                <p className="mt-2 text-slate-200 max-w-3xl">
                  Share team size, current setup, and top issues. We’ll recommend the right scope and a practical rollout plan.
                </p>
              </div>

              <div className="flex gap-3 flex-wrap">
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg px-5 py-3 font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
                >
                  Message on WhatsApp <ArrowRight className="h-4 w-4" />
                </a>

                <a
                  href={`mailto:${EMAIL}?subject=${encodeURIComponent("UK enquiry — Supreme IT Experts")}`}
                  className="inline-flex items-center gap-2 rounded-lg px-5 py-3 font-semibold bg-white/10 ring-1 ring-white/20 hover:bg-white/20"
                >
                  Email us <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Small reassurance */}
        <Reveal className="mt-10">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold">UK coverage</h3>
            <p className="text-slate-300 mt-2">
              We support UK businesses remotely (UK-wide). If you have multiple sites or hybrid staff, we’ll help you standardise access,
              collaboration, and security.
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
