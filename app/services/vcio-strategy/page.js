import ServiceClientPage from "../_components/ServiceClientPage";

export async function generateMetadata() {
  const title = "vCIO / Strategy — Supreme IT Experts";
  const description =
    "Roadmaps, budgets, vendor consolidation, exec/board reporting, and measurable KPIs.";
  return {
    title,
    description,
    alternates: { canonical: "/services/vcio-strategy" },
    openGraph: {
      title,
      description,
      type: "article",
      url: "/services/vcio-strategy",
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

export default function Page() {
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

  return (
    <>
      {/* Breadcrumbs + Service JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://supremeitexperts.com/" },
                { "@type": "ListItem", position: 2, name: "Services", item: "https://supremeitexperts.com/services" },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "vCIO / Strategy",
                  item: "https://supremeitexperts.com/services/vcio-strategy",
                },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "Service",
              name: "vCIO / Strategy",
              serviceType: "Virtual CIO & IT Strategy",
              provider: { "@type": "Organization", name: "Supreme IT Experts", url: "https://supremeitexperts.com" },
              areaServed: ["Allentown, PA", "Philadelphia, PA", "Wilmington, DE", "Macungie, PA", "Emmaus, PA"],
              url: "https://supremeitexperts.com/services/vcio-strategy",
            },
          ]),
        }}
      />
      <ServiceClientPage cfg={cfg} />
    </>
  );
}
