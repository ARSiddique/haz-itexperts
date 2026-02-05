// app/faqs/page.js
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/siteConfig";

// --- SEO (server-side)
export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/faqs`;

  const title = "FAQs"; // ✅ brand yahan mat lagao (layout template already adds it)
  const description =
    "Short answers to common questions about our managed IT and cybersecurity services in Allentown, Macungie & Emmaus.";

  const ogImage = `${baseUrl}/og-image.png?v=7`;

  return {
    metadataBase: new URL(baseUrl),
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
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${brand} — FAQs` }],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

// ✅ Expanded FAQs (10)
const FAQS = [
  {
    q: "What’s included in managed IT services?",
    a: "Managed IT typically includes helpdesk support, proactive monitoring, patching, device baselines, reporting, and an ongoing roadmap to keep systems stable and secure.",
  },
  {
    q: "Do you provide 24/7 IT support?",
    a: "Yes. We offer 24/7 monitoring and support with clear escalation paths so urgent issues get handled fast.",
  },
  {
    q: "How fast is your response time?",
    a: "Response depends on priority. We use ticket triage and SLAs so high-impact issues are addressed first, with clear communication until resolution.",
  },
  {
    q: "Do you support both Windows and Mac environments?",
    a: "Yes. We support Windows and macOS environments, plus iOS/Android device management using practical security baselines and compliance checks.",
  },
  {
    q: "Can you help if we already have an internal IT person?",
    a: "Yes. We offer co-managed IT—supporting your internal IT with monitoring, patching, security tooling, documentation and escalation coverage.",
  },
  {
    q: "What cybersecurity services do you provide?",
    a: "We help with identity security (MFA/SSO guidance), endpoint protection, email security, and backup/disaster recovery planning with security-first baselines.",
  },
  {
    q: "Do you help with Microsoft 365 or Google Workspace?",
    a: "Yes. We support migrations, tenant security, identity, device management, and ongoing optimization for Microsoft 365 and Google Workspace.",
  },
  {
    q: "Do you support remote and in-office teams?",
    a: "Yes. We help with laptops, desktops, VPNs, cloud tools and baseline security for people working from home or in the office.",
  },
  {
    q: "Do you offer onsite support in Macungie and Emmaus?",
    a: "Yes. We provide onsite and remote support for businesses in Allentown, Macungie, and Emmaus when needed.",
  },
  {
    q: "How do we get started?",
    a: "Start with a quick call or message. We’ll learn about your users, devices and priorities, then recommend a practical next step (assessment, cleanup or onboarding).",
  },
];

export default function FaqsPage() {
  const baseUrl = (site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/faqs`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${canonical}#faq`,
    mainEntity: FAQS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
      { "@type": "ListItem", position: 2, name: "FAQs", item: canonical },
    ],
  };

  return (
    <>
      {/* Breadcrumbs JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />

      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHero
        eyebrow="FAQs"
        title="Common questions"
        sub="Straightforward answers about how we work and what we provide."
      />

      <main className="max-w-4xl mx-auto px-4 pb-20">
        <section aria-labelledby="faqs-title" className="mt-2">
          <h2 id="faqs-title" className="sr-only">
            Frequently asked questions
          </h2>

          <div className="rounded-2xl border border-white/10 bg-white/5 divide-y divide-white/10">
            {FAQS.map((item) => (
              <details key={item.q} className="group px-4 md:px-6 py-4">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-3">
                  <h3 className="font-medium leading-snug">{item.q}</h3>
                  <span className="text-xs text-slate-400 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-3 text-sm text-slate-300">{item.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-300">
                Didn’t find your question? Send us a message and we’ll point you to the right next step.
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Fast reply during business hours — and emergency support is available.
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
        </section>
      </main>
    </>
  );
}
