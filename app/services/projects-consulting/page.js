// app/services/projects-consulting/page.js
import ServiceClientPage from "../_components/ServiceClientPage";
import { site } from "@/lib/siteConfig";

export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/services/projects-consulting`;

  const title = `Projects & Consulting | ${brand}`;
  const description =
    "Audits, office moves, network refresh, directory cleanup, decommissions — fixed scope & clean handovers.";

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
      images: [
        { url: ogImage, width: 1200, height: 630, alt: `${brand} — Projects & Consulting` },
      ],
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
  const canonical = `${baseUrl}/services/projects-consulting`;

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

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${baseUrl}/services` },
      { "@type": "ListItem", position: 3, name: "Projects & Consulting", item: canonical },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonical}#service`,
    name: "Projects & Consulting",
    serviceType: "IT Projects & Consulting",
    url: canonical,
    provider: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: brand,
      url: baseUrl,
    },
    areaServed: ["Allentown, PA", "Macungie, PA", "Emmaus, PA", "Lehigh Valley, PA"],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Projects & Consulting | ${brand}`,
    url: canonical,
    description:
      "Audits, office moves, network refresh, directory cleanup, decommissions — fixed scope & clean handovers.",
    isPartOf: { "@type": "WebSite", name: brand, url: baseUrl },
    breadcrumb: { "@id": `${canonical}#breadcrumb` },
    mainEntity: { "@id": `${canonical}#service` },
  };

  return (
    <>
      {/* Breadcrumbs + Service + WebPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbsSchema, serviceSchema, webPageSchema]),
        }}
      />
      <ServiceClientPage cfg={cfg} />
    </>
  );
}
