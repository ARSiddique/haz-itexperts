// app/uk/faqs/page.js
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/siteConfig";
import { BASE_URL, BUSINESS_ID } from "@/lib/seoIds";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || BASE_URL || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/uk/faqs`;
  const ogImage = `${baseUrl}/og-image.png?v=7`;

  const title = `UK FAQs | ${brand}`;
  const description =
    "FAQs for UK businesses: managed IT, cybersecurity, Microsoft 365, onboarding, response times, and remote-first coverage across the United Kingdom.";

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "en-GB": canonical,
        "en-US": `${baseUrl}/faqs`,
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
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${brand} — UK FAQs` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

const UK_FAQS = [
  {
    q: "Do you support businesses across the United Kingdom?",
    a: "Yes. We provide remote-first support UK-wide. Where on-site work is required, we can coordinate with your internal team or local resources depending on location and availability.",
  },
  {
    q: "Are your UK services different from the US services?",
    a: "The core service set is the same, but UK pages are written for UK businesses and UK intent — with UK-focused guidance, expectations, and terminology.",
  },
  {
    q: "What’s included in managed IT for UK teams?",
    a: "Typical coverage includes helpdesk support, proactive monitoring, patching, device management, security baseline hardening, backups oversight, and reporting — tailored to your environment and goals.",
  },
  {
    q: "Can you manage Microsoft 365 for UK organisations?",
    a: "Yes. We can help with migrations, tenant security baselines, identity controls (MFA/conditional access), device policies, and governance — plus ongoing optimisation and support.",
  },
  {
    q: "How do you handle onboarding and handover?",
    a: "We follow a structured onboarding plan: access + inventory, documentation, quick stabilisation work, security baseline setup, and a clear roadmap. You’ll have a single point of accountability and a documented setup.",
  },
  {
    q: "Do you offer cybersecurity as a standalone service?",
    a: "Yes. Cybersecurity can be delivered as a standalone engagement (assessment + hardening + controls) or as part of managed IT. We focus on practical risk reduction and measurable outcomes.",
  },
  {
    q: "What response times do you provide?",
    a: "Response times depend on the chosen plan and ticket priority. We keep it simple: clear ownership, predictable communication, and service expectations aligned to business impact.",
  },
  {
    q: "Do you provide on-site support in the UK?",
    a: "We are remote-first. If on-site work is needed, we can coordinate with your internal team or a local resource depending on location and availability.",
  },
  {
    q: "How do you price your services for UK clients?",
    a: "Pricing depends on the number of users/devices, complexity, and scope. We aim for predictable monthly pricing where possible, with a clear list of included deliverables.",
  },
  {
    q: "What’s the best way to contact you for UK enquiries?",
    a: "Use the UK Contact page for a fast response. Share your team size, current tools (Microsoft 365 / Google Workspace), and the top issues you want fixed first.",
  },
];

export default function UKFaqsPage() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || BASE_URL || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/uk/faqs`;

  const WEBSITE_ID = `${baseUrl}/#website`;
  const BREADCRUMB_ID = `${canonical}#breadcrumb`;
  const WEBPAGE_ID = `${canonical}#webpage`;
  const FAQ_ID = `${canonical}#faq`;

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": BREADCRUMB_ID,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
      { "@type": "ListItem", position: 2, name: "UK", item: `${baseUrl}/uk` },
      { "@type": "ListItem", position: 3, name: "FAQs", item: canonical },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": FAQ_ID,
    mainEntity: UK_FAQS.map((x) => ({
      "@type": "Question",
      name: x.q,
      acceptedAnswer: { "@type": "Answer", text: x.a },
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": WEBPAGE_ID,
    url: canonical,
    name: `UK FAQs | ${brand}`,
    description:
      "FAQs for UK businesses: managed IT, cybersecurity, Microsoft 365, onboarding, response times, and remote-first coverage across the United Kingdom.",
    isPartOf: { "@id": WEBSITE_ID },
    breadcrumb: { "@id": BREADCRUMB_ID },
    about: { "@id": BUSINESS_ID },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbsSchema, faqSchema, webPageSchema]),
        }}
      />

      <PageHero
        eyebrow="United Kingdom"
        title="UK FAQs"
        sub="Quick answers for UK businesses — scope, onboarding, response times, and how remote-first support works."
      />

      <section className="max-w-6xl mx-auto px-4 pb-24">
        {/* quick nav */}
        <Reveal className="mt-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-slate-400">UK Help Centre</div>
              <p className="text-slate-300 mt-2 max-w-2xl">
                Looking for service scope? Visit UK Services. Ready to talk? Use the UK Contact page.
              </p>
            </div>

            <div className="flex gap-3 flex-wrap">
              <Link
                href="/uk/services"
                className="inline-flex items-center gap-2 text-sm rounded-lg px-4 py-2 border border-white/10 bg-white/5 hover:bg-white/10"
              >
                UK Services <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/uk/contact"
                className="inline-flex items-center gap-2 text-sm rounded-lg px-4 py-2 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
              >
                Contact <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>

        {/* FAQ list */}
        <Reveal className="mt-10">
          <div className="grid lg:grid-cols-2 gap-6">
            {UK_FAQS.map((x) => (
              <div key={x.q} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex gap-2">
                  <CheckCircle2 className="h-5 w-5 text-cyan-300 mt-0.5" />
                  <h3 className="text-base font-extrabold">{x.q}</h3>
                </div>
                <p className="mt-3 text-sm text-slate-300 leading-7">{x.a}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* internal linking footer */}
        <Reveal className="mt-10">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold">Next steps</h3>
            <p className="text-slate-300 mt-2">
              Browse{" "}
              <Link href="/uk/services" className="text-cyan-300 hover:underline">
                UK Services
              </Link>{" "}
              or check{" "}
              <Link href="/uk/areas" className="text-cyan-300 hover:underline">
                UK Areas We Serve
              </Link>
              . If you want to move fast, use{" "}
              <Link href="/uk/contact" className="text-cyan-300 hover:underline">
                UK Contact
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
