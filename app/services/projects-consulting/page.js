import ServiceClientPage from "../_components/ServiceClientPage";

export async function generateMetadata() {
  const title = "Projects & Consulting — Supreme IT Experts";
  const description =
    "Audits, office moves, network refresh, directory cleanup, decommissions — fixed scope & clean handovers.";
  return {
    title,
    description,
    alternates: { canonical: "/services/projects-consulting" },
    openGraph: {
      title,
      description,
      type: "article",
      url: "/services/projects-consulting",
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
    title: "Projects & Consulting",
    lede:
      "Fixed-scope projects with clear timelines, acceptance tests, and zero-stress handovers—weekend change windows included.",
    hero: "/images/services/projects-hero.svg",
    stats: [
      { kpi: "200+", label: "Projects delivered" },
      { kpi: "95%", label: "On-time / on-budget" },
      { kpi: "24/7", label: "Change windows" },
      { kpi: "Clean", label: "Handover" },
    ],
    sections: [
      {
        heading: "Designs that survive production",
        body:
          "We don’t deliver slideware—we deliver runbooks, rollback plans, and acceptance tests. With stakeholder communications, everyone knows what’s happening, when it’s happening, and what “done” looks like.",
        image: "/images/illus/network.svg",
        imageSide: "right",
      },
      {
        heading: "From legacy to lean",
        body:
          "Decommission and migration projects are executed with an obsessive focus on data safety: backups are validated, and “what-if” scenarios are rehearsed. The result is simpler, cheaper, and easier-to-support infrastructure.",
        image: "/images/illus/servers.svg",
        imageSide: "left",
      },
    ],
    features: [
      { icon: "Wrench", title: "Network Refresh", desc: "Switching/Wi-Fi redesign and segmentation." },
      { icon: "Server", title: "Server Decommission", desc: "Migrate and retire with backup checkpoints." },
      { icon: "Cloud", title: "Email/Domain Moves", desc: "Cutovers, tenant-to-tenant migrations, rebrands." },
      { icon: "Cpu", title: "Directory Cleanup", desc: "OU design, GPO refactor, identity hardening." },
      { icon: "BarChart3", title: "Cost Optimization", desc: "License and vendor consolidation." },
      { icon: "Sparkles", title: "Automation", desc: "Scripting and low-code workflows." },
    ],
    steps: [
      { title: "Discovery", desc: "Workshops and current-state documentation.", outputs: ["Requirements & risks", "Options"] },
      { title: "Plan", desc: "Design, dependencies, and rollback planning.", outputs: ["Cutover schedule", "Backout plan"] },
      { title: "Implement", desc: "Execution with change windows and communications.", outputs: ["As-built docs", "Acceptance tests"] },
      { title: "Handover", desc: "Documentation, training, and warranty support.", outputs: ["Admin training", "Support path"] },
    ],
    timeline: [
      { when: "Week 1", title: "Discovery", desc: "Scope and risks" },
      { when: "Weeks 2–3", title: "Design", desc: "Architecture and plan" },
      { when: "Weeks 4–6", title: "Execution", desc: "Change windows and cutovers" },
      { when: "Week 7", title: "Handover", desc: "Docs and training" },
    ],
    testimonials: [
      {
        quote: "Weekend move—everything was up on Monday. Perfect execution.",
        author: "Z. Farooq",
        role: "GM, Logistics",
        avatar: "/images/avatars/a3.svg",
        rating: 5,
      },
      {
        quote: "The rollback plan gave stakeholders real confidence.",
        author: "A. Junaid",
        role: "CIO",
        avatar: "/images/avatars/a4.svg",
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
                  name: "Projects & Consulting",
                  item: "https://supremeitexperts.com/services/projects-consulting",
                },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Projects & Consulting",
              serviceType: "IT Projects & Consulting",
              provider: { "@type": "Organization", name: "Supreme IT Experts", url: "https://supremeitexperts.com" },
              areaServed: ["Allentown, PA", "Macungie, PA", "Emmaus, PA", "Lehigh Valley, PA"],
              url: "https://supremeitexperts.com/services/projects-consulting",
            },
          ]),
        }}
      />
      <ServiceClientPage cfg={cfg} />
    </>
  );
}
