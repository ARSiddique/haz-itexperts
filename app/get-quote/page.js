// app/get-quote/page.js
import Link from "next/link";
import PageHero from "@/components/PageHero";

// --- SEO (server-side)
export async function generateMetadata() {
  const title = "Get a Quote — Supreme IT Experts";
  const description = "See a simple overview of how our pricing works and request a customised quote.";
  return {
    title,
    description,
    alternates: { canonical: "/get-quote" },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      type: "website",
      url: "/get-quote",
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

const PLANS = [
  {
    name: "Essentials",
    priceNote: "Suitable for small teams",
    description:
      "Basic managed IT for laptops, desktops and standard office tools, plus simple security best practices.",
    includes: [
      "Day-to-day support for staff",
      "System updates and basic monitoring",
      "Help with email and account issues",
    ],
  },
  {
    name: "Secure",
    priceNote: "For growing teams",
    description:
      "Everything in Essentials plus stronger security controls, backup guidance and regular checks.",
    includes: [
      "Security-first configuration for users and devices",
      "Simple backup and recovery plan",
      "Regular review of alerts and incidents",
    ],
  },
  {
    name: "Plus",
    priceNote: "For multi-site or higher-risk teams",
    description:
      "A more tailored plan with extra time for planning, reporting and coordination with your leadership.",
    includes: [
      "Scheduled check-ins with a senior engineer",
      "Higher touch support for key systems",
      "Clear summary of work completed each month",
    ],
  },
];

export default function GetQuotePage() {
  return (
    <>
      {/* Breadcrumbs JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://supremeitexperts.com/" },
              { "@type": "ListItem", position: 2, name: "Get a Quote", item: "https://supremeitexperts.com/get-quote" }
            ]
          }),
        }}
      />

      <PageHero
        eyebrow="Get quote"
        title="Simple, transparent pricing"
        sub="Every quote is tailored to your team size, tools and support needs."
      />

      <main className="max-w-5xl mx-auto px-4 pb-20 space-y-10">
        <section className="text-sm text-slate-300 leading-7">
          <p>
            Pricing is based mainly on the number of people we support and the
            systems we manage for you. We keep the structure simple so that it
            is easy to understand and easy to budget for.
          </p>
          <p className="mt-3">
            The examples below are guidelines only. We will confirm an exact
            quote after a short conversation about your environment.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col"
            >
              <h2 className="text-lg font-semibold text-slate-100">
                {plan.name}
              </h2>
              <p className="mt-1 text-xs text-cyan-300/90">{plan.priceNote}</p>
              <p className="mt-3 text-sm text-slate-300">{plan.description}</p>
              <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
                {plan.includes.map((line) => (
                  <li key={line}>• {line}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-slate-100">
              Ready for a tailored quote?
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Share a few basic details about your team and systems and we’ll
              reply with a clear, no-obligation proposal.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/contact"
              className="rounded-lg px-5 py-3 text-sm font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
            >
              Email or call us
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
