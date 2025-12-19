// app/services/vcio-strategy/page.js
import ServiceClientPage from "../_components/ServiceClientPage";
import { site } from "@/lib/siteConfig";

export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/services/vcio-strategy`;

  // ✅ stronger keyword intent + local intent
  const title = `vCIO & IT Strategy (Roadmaps, Budgets, KPI Reporting) | ${brand}`;
  const description =
    "vCIO / IT strategy for SMBs in Allentown & the Lehigh Valley: 90-day roadmaps, budgets, vendor consolidation, exec/board reporting, and measurable KPIs.";

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
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${brand} — vCIO / Strategy` }],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Page() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/services/vcio-strategy`;

  const cfg = {
    title: "vCIO / Strategy",
    lede:
      "We translate business goals into a practical IT roadmap—with budgets, risks, vendors, and KPIs you can actually act on.",
    hero: "/images/services/vcio-hero.svg",
    stats: [
      { kpi: "90-day", label: "Roadmaps" },
      { kpi: "12–18m", label: "Budget forecast" },
      { kpi: "OKRs", label: "Outcome-driven" },
      { kpi: "Quarterly", label: "Board pack" },
    ],
    sections: [
      {
        heading: "From wishlist to measurable outcomes",
        body:
          "We tie every initiative to revenue, efficiency, or risk reduction. That makes spend defensible, priorities clear, and progress easy to track across leadership.",
        image: "/images/illus/roadmap.svg",
        imageSide: "right",
      },
      {
        heading: "Vendors under control",
        body:
          "We right-size your stack and remove overlap. With a renewal calendar and scorecards, surprises disappear and decisions become data-driven.",
        image: "/images/illus/vendors.svg",
        imageSide: "left",
      },
    ],
    features: [
      { icon: "LineChart", title: "QBRs", desc: "KPIs, risks, and health reviews with leadership." },
      { icon: "BookOpen", title: "Policies & Standards", desc: "A practical and auditable operating model." },
      { icon: "BarChart3", title: "Budget & Forecast", desc: "12–18 month view of spend, refresh, and licensing." },
      { icon: "Network", title: "Vendor Management", desc: "Right-size the stack and remove overlap." },
      { icon: "Sparkles", title: "Innovation Sprints", desc: "Pilot to prove value before committing." },
      { icon: "Building2", title: "Board Reporting", desc: "Clear visuals and risk summaries for exec teams." },
    ],
    timeline: [
      { when: "Month 1", title: "Baseline & KPIs", desc: "Scorecard and OKRs" },
      { when: "Month 2", title: "Vendors & budget", desc: "Consolidation plan" },
      { when: "Quarterly", title: "Board / QBR", desc: "Progress and risk review" },
    ],
    testimonials: [
      {
        quote: "Strategy finally ties to revenue and risk—the board loved it.",
        author: "N. Rahman",
        role: "CEO",
        avatar: "/images/avatars/a4.svg",
        rating: 5,
      },
      {
        quote: "Spend is predictable now, and the vendor stack is streamlined.",
        author: "R. Saleem",
        role: "COO",
        avatar: "/images/avatars/a3.svg",
        rating: 5,
      },
    ],
  };

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${baseUrl}/services` },
      { "@type": "ListItem", position: 3, name: "vCIO / Strategy", item: canonical },
    ],
  };

  // ✅ richer Service schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonical}#service`,
    name: "vCIO & IT Strategy",
    serviceType: "Virtual CIO & IT Strategy",
    description:
      "Quarterly business reviews (QBRs), 90-day roadmaps, 12–18 month budget forecasts, vendor consolidation, governance/policies, and executive reporting with measurable KPIs.",
    url: canonical,
    provider: { "@type": "Organization", "@id": `${baseUrl}/#organization` },
    areaServed: ["Allentown, PA", "Macungie, PA", "Emmaus, PA", "Lehigh Valley, PA"],
    offers: {
      "@type": "Offer",
      url: `${baseUrl}/get-quote`,
      availability: "https://schema.org/InStock",
    },
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    name: `vCIO / Strategy | ${brand}`,
    url: canonical,
    description:
      "Roadmaps, budgets, vendor consolidation, exec/board reporting, and measurable KPIs.",
    isPartOf: { "@type": "WebSite", "@id": `${baseUrl}/#website` },
    publisher: { "@type": "Organization", "@id": `${baseUrl}/#organization` },
    breadcrumb: { "@id": `${canonical}#breadcrumb` },
    mainEntity: { "@id": `${canonical}#service` },
  };

  // ✅ FAQ schema (helps on-page + rich snippets)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${canonical}#faq`,
    mainEntity: [
      {
        "@type": "Question",
        name: "What does a vCIO do?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "A vCIO aligns IT with business goals by building a roadmap, forecasting budgets, managing vendors, and reporting KPIs and risk in a leadership-friendly format.",
        },
      },
      {
        "@type": "Question",
        name: "How often do we review progress?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We run regular check-ins and formal QBR/board-style reviews quarterly, including KPIs, risks, initiatives, and next-quarter priorities.",
        },
      },
      {
        "@type": "Question",
        name: "Do you help with vendor consolidation and renewals?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. We evaluate overlap, right-size licensing, build a renewal calendar, and provide scorecards so vendor decisions are data-driven.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbsSchema, webPageSchema, serviceSchema, faqSchema]),
        }}
      />
      <ServiceClientPage cfg={cfg} />
    </>
  );
}
