import ServiceClientPage from "../_components/ServiceClientPage";

export async function generateMetadata() {
  const title = "Managed IT — Supreme IT Experts";
  const description =
    "Proactive helpdesk, patching, monitoring, and reporting with clear SLAs.";
  return {
    title,
    description,
    alternates: { canonical: "/services/managed-it" },
    openGraph: {
      title,
      description,
      type: "article",
      url: "/services/managed-it",
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
    title: "Managed IT",
    lede:
      "We run your day-to-day IT: tickets, patching, monitoring, and security baselines—so your team can stay focused on the business.",
    hero: "/images/services/managed-hero.svg",
    stats: [
      { kpi: "98%", label: "CSAT" },
      { kpi: "≤15m", label: "P1 response" },
      { kpi: "99.5%", label: "Patch compliance" },
      { kpi: "30 days", label: "Stabilization" },
    ],
    sections: [
      {
        heading: "Ticketing that actually solves problems",
        body:
          "Our helpdesk workflows prioritize first-contact resolution. Whether a request comes in via email, chat, or portal, triage SOPs set the right priority fast, while automation handles repetitive work in the background. You get monthly CSAT reports and SLA dashboards—so leadership sees a clear, honest view of performance.",
        image: "/images/illus/helpdesk.svg",
        imageSide: "right",
      },
      {
        heading: "Standardized endpoints = fewer surprises",
        body:
          "Hardened Windows and macOS baselines, automated patching, curated app catalogs, and endpoint protection reduce device drift and keep incidents contained. With backup verification and regular restore tests, recovery becomes predictable—not a guessing game.",
        image: "/images/illus/devices.svg",
        imageSide: "left",
      },
    ],
    problems: [
      "Tickets bounce between people; no ownership or SLA",
      "Endpoints drift — missing patches, outdated apps",
      "On/Offboarding slow; access errors",
      "Leadership lacks KPIs and risk visibility",
    ],
    outcomes: [
      "Clear SLAs with first-contact resolution",
      "Hardened baselines & predictable patching",
      "Checklist-driven hires/leavers same-day",
      "Exec-ready KPIs; audits become easy",
    ],
    features: [
      { icon: "Wrench", title: "Helpdesk", desc: "Omni-channel support with triage & CSAT." },
      { icon: "Server", title: "Patching & Monitoring", desc: "Automated updates + health checks." },
      { icon: "Lock", title: "Baseline Security", desc: "EDR, encryption, firewall, MFA guidance." },
      { icon: "Database", title: "Backup Checks", desc: "Daily verification + quarterly restores." },
      { icon: "Users", title: "Lifecycle", desc: "Fast, compliant on/offboarding." },
      { icon: "LineChart", title: "Reporting", desc: "Ticket, asset, patch & risk KPIs." },
    ],
    gallery: [
      "/images/illus/screens-1.svg",
      "/images/illus/screens-2.svg",
      "/images/illus/screens-3.svg",
    ],
    steps: [
      {
        title: "Assess",
        desc: "Users, devices, identity, and risks.",
        outputs: ["Access & tooling", "Initial risk register"],
      },
      {
        title: "Stabilize",
        desc: "Patching, EDR, backup/DR, and baselines.",
        outputs: ["Patch rings", "EDR policies"],
      },
      {
        title: "Optimize",
        desc: "SOPs, automation, and self-service.",
        outputs: ["Knowledge base + runbooks", "Automation backlog"],
      },
      {
        title: "Grow",
        desc: "QBRs, roadmap, and budget planning.",
        outputs: ["QBR deck", "OKRs"],
      },
    ],
    deliverables: [
      "SOPs",
      "Asset inventory",
      "Monthly KPI pack",
      "Backup & security status",
      "Roadmap & budget view",
    ],
    tooling: [
      "RMM",
      "EDR/XDR",
      "Intune/Jamf",
      "M365/Workspace",
      "SharePoint/Drive",
      "Ticketing/CSAT",
    ],
    timeline: [
      { when: "Week 1", title: "Access & discovery", desc: "Tools connected, quick wins" },
      { when: "Weeks 2–3", title: "Stabilization sprint", desc: "Patch/EDR/baselines + backup" },
      { when: "Week 4", title: "KPI + roadmap", desc: "Leadership metrics & plan" },
    ],
    compactTimeline: true,
    testimonials: [
      {
        quote: "Onboarding now takes hours, not days.",
        author: "S. Malik",
        role: "HR Lead",
        avatar: "/images/avatars/a1.svg",
        rating: 5,
      },
      {
        quote: "We finally have SLAs and visibility—no more chaos.",
        author: "A. Khan",
        role: "COO",
        avatar: "/images/avatars/a2.svg",
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
                { "@type": "ListItem", position: 3, name: "Managed IT", item: "https://supremeitexperts.com/services/managed-it" }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Managed IT",
              serviceType: "Managed IT Services",
              provider: { "@type": "Organization", name: "Supreme IT Experts", url: "https://supremeitexperts.com" },
              areaServed: ["Allentown, PA", "Macungie, PA", "Emmaus, PA", "Philadelphia, PA", "Wilmington, DE"],
              url: "https://supremeitexperts.com/services/managed-it"
            }
          ])
        }}
      />
      <ServiceClientPage cfg={cfg} />
    </>
  );
}
