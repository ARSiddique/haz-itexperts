// app/faqs/page.js
import Link from "next/link";
import PageHero from "@/components/PageHero";

// --- SEO (server-side)
export async function generateMetadata() {
  const title = "FAQs — Supreme IT Experts";
  const description =
    "Short answers to common questions about our managed IT and cybersecurity services.";
  return {
    title,
    description,
    alternates: { canonical: "/faqs" },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      type: "website",
      url: "/faqs",
      images: ["/og-image.png?v=7"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png?v=7"],
    },
  };
}

const FAQS = [
  {
    q: "What types of businesses do you work with?",
    a: "We mainly support small and mid-sized organisations that need reliable IT, basic cybersecurity and a friendly support team.",
  },
  {
    q: "Do you support remote and in-office teams?",
    a: "Yes. We help with laptops, desktops, VPNs, cloud tools and basic security for people working from home or in the office.",
  },
  {
    q: "Can you help if we already have an internal IT person?",
    a: "Yes. We can work alongside an in-house IT contact to handle monitoring, patching, security tools and documentation.",
  },
  {
    q: "Is there a long-term contract?",
    a: "Most customers work with us on a rolling agreement. Terms are kept simple and clear so there are no surprises.",
  },
  {
    q: "How do we get started?",
    a: "Send us a short email or give us a call. We will ask a few questions about your team and systems, then suggest a simple next step.",
  },
];

export default function FaqsPage() {
  // FAQPage schema JSON-LD object
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://supremeitexperts.com/" },
      { "@type": "ListItem", position: 2, name: "FAQs", item: "https://supremeitexperts.com/faqs" },
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
        {/* ✅ H2 for better heading hierarchy */}
        <section aria-labelledby="faqs-title" className="mt-2">
          <h2 id="faqs-title" className="sr-only">
            Frequently asked questions
          </h2>

          <div className="rounded-2xl border border-white/10 bg-white/5 divide-y divide-white/10">
            {FAQS.map((item) => (
              <details key={item.q} className="group px-4 md:px-6 py-4">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-3">
                  {/* ✅ keep questions as H3 */}
                  <h3 className="font-medium leading-snug">{item.q}</h3>
                  <span className="text-xs text-slate-400 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-3 text-sm text-slate-300">{item.a}</p>
              </details>
            ))}
          </div>

          {/* ✅ stronger CTA block */}
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
