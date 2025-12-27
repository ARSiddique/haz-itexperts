// app/services/vcio-strategy/page.js
import ServiceClientPage from "../_components/ServiceClientPage";
import { site } from "@/lib/siteConfig";
import { BUSINESS_ID } from "@/lib/seoIds";

export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/services/vcio-strategy`;

  const title = `vCIO & IT Strategy (Roadmaps, Budgets, KPI Reporting) | ${brand}`;
  const description =
    "vCIO / IT strategy for SMBs in Allentown & the Lehigh Valley: practical roadmaps, budget planning, vendor reviews, executive reporting, and measurable KPIs.";

  const ogImage = `${baseUrl}/og-image.png?v=7`;

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
      "Turn IT into a plan you can run: roadmaps, budgets, vendor decisions, and KPIs presented in a leadership-friendly format.",
    hero: "/images/services/vcio-hero.svg",

    // ✅ neutral & believable
    stats: [
      { kpi: "Roadmap", label: "Prioritized initiatives" },
      { kpi: "Budget", label: "Forecast + refresh planning" },
      { kpi: "KPIs", label: "Operational visibility" },
      { kpi: "QBR", label: "Leadership reviews" },
    ],

    sections: [
      {
        heading: "A roadmap that matches business reality",
        body:
          "We translate goals into a clear sequence of initiatives—what to do first, what to defer, and why. Each initiative is tied to outcomes like risk reduction, reliability, efficiency, or growth.",
        image: "/images/illus/roadmap.svg",
        imageSide: "right",
      },
      {
        heading: "Budget and vendor decisions without surprises",
        body:
          "We create a practical forecast for licensing, device refresh, and security needs. Vendor reviews reduce overlap, and a renewal calendar keeps decisions proactive instead of last-minute.",
        image: "/images/illus/vendors.svg",
        imageSide: "left",
      },
      {
        heading: "KPIs leadership can actually use",
        body:
          "We report on service health, security posture, projects, and risks in a simple dashboard format. You get the context behind the numbers and the next actions—so meetings end with decisions, not confusion.",
        image: "/images/illus/screens-2.svg",
        imageSide: "right",
      },
    ],

    features: [
      { icon: "LineChart", title: "QBRs", desc: "KPIs, risks, and health reviews with leadership." },
      { icon: "BookOpen", title: "Standards & Governance", desc: "Practical policies and an operating model your team can follow." },
      { icon: "BarChart3", title: "Budget & Forecast", desc: "12–18 month view of spend, refresh cycles, and licensing." },
      { icon: "Network", title: "Vendor Management", desc: "Right-size tools, reduce overlap, and manage renewals." },
      { icon: "Sparkles", title: "Pilot Before You Commit", desc: "Small, low-risk trials to validate value." },
      { icon: "Building2", title: "Exec Reporting", desc: "Clear summaries that work for owners and leadership teams." },
    ],

    timeline: [
      { when: "Month 1", title: "Baseline & priorities", desc: "Current-state review, risks, and first roadmap draft" },
      { when: "Month 2", title: "Budget + vendor review", desc: "Forecast, renewals, and consolidation recommendations" },
      { when: "Quarterly", title: "QBR / leadership review", desc: "KPIs, progress, and next-quarter plan" },
    ],

    // ✅ generic roles (no random names)
    testimonials: [
      {
        quote: "The roadmap made priorities clear and helped leadership make faster decisions.",
        author: "Business Owner",
        role: "SMB (Lehigh Valley)",
        avatar: "/images/avatars/a4.svg",
        rating: 5,
      },
      {
        quote: "Renewals and vendor choices feel controlled now—no last-minute surprises.",
        author: "Operations Lead",
        role: "Local business",
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

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonical}#service`,
    name: "vCIO & IT Strategy",
    serviceType: "Virtual CIO & IT Strategy",
    description:
      "Roadmaps, budget planning, vendor reviews, governance, and executive reporting with measurable KPIs for small and mid-sized businesses.",
    url: canonical,
    publisher: { "@id": BUSINESS_ID },
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
      "Roadmaps, budgets, vendor decisions, executive reporting, and measurable KPIs—built for SMBs.",
    isPartOf: { "@type": "WebSite", "@id": `${baseUrl}/#website` },
   publisher: { "@id": BUSINESS_ID },
    breadcrumb: { "@id": `${canonical}#breadcrumb` },
    mainEntity: { "@id": `${canonical}#service` },
  };

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
            "We run regular check-ins and formal QBR-style reviews quarterly, including KPIs, risks, initiatives, and next-quarter priorities.",
        },
      },
      {
        "@type": "Question",
        name: "Do you help with vendor consolidation and renewals?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. We evaluate overlap, right-size licensing, build a renewal calendar, and provide simple scorecards so decisions are data-driven.",
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
