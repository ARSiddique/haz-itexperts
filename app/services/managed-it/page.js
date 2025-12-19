// app/services/managed-it/page.js
import ServiceClientPage from "../_components/ServiceClientPage";
import { site } from "@/lib/siteConfig";

export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/services/managed-it`;

  // ✅ stronger intent + local + keywords
  const title = `Managed IT Services (Helpdesk, Monitoring, Patching) | ${brand}`;
  const description =
    "Managed IT for SMBs in Allentown & the Lehigh Valley: helpdesk with SLAs, patching, monitoring, endpoint baselines, and executive reporting — fully managed or co-managed.";

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
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${brand} — Managed IT`,
        },
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
  const canonical = `${baseUrl}/services/managed-it`;

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

  // ✅ Breadcrumbs
  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${baseUrl}/services` },
      { "@type": "ListItem", position: 3, name: "Managed IT", item: canonical },
    ],
  };

  // ✅ Service (with description + offer CTA)
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonical}#service`,
    name: "Managed IT Services",
    serviceType: "Managed IT Services",
    description:
      "Helpdesk with SLAs, proactive monitoring, patch management, endpoint baselines, onboarding/offboarding, and executive reporting for small and mid-sized businesses.",
    url: canonical,
    provider: { "@type": "Organization", "@id": `${baseUrl}/#organization` },
    areaServed: ["Allentown, PA", "Macungie, PA", "Emmaus, PA", "Lehigh Valley, PA"],
    offers: {
      "@type": "Offer",
      url: `${baseUrl}/get-quote`,
      availability: "https://schema.org/InStock",
    },
  };

  // ✅ WebPage (IDs aligned)
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: `Managed IT Services | ${brand}`,
    description:
      "Managed IT for SMBs: helpdesk with SLAs, patching, monitoring, endpoint baselines, and leadership reporting.",
    isPartOf: { "@type": "WebSite", "@id": `${baseUrl}/#website` },
    publisher: { "@type": "Organization", "@id": `${baseUrl}/#organization` },
    breadcrumb: { "@id": `${canonical}#breadcrumb` },
    mainEntity: { "@id": `${canonical}#service` },
  };

  // ✅ FAQ (rich result support)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${canonical}#faq`,
    mainEntity: [
      {
        "@type": "Question",
        name: "What’s included in managed IT?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Helpdesk (email/chat/portal), patching, monitoring, endpoint baselines, onboarding/offboarding, and reporting. Security basics like EDR guidance, encryption, and MFA recommendations are included.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer co-managed IT?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. We can run IT end-to-end or work alongside your internal team with shared tooling, SOPs, and reporting.",
        },
      },
      {
        "@type": "Question",
        name: "What are your SLA targets?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "SLA targets depend on your plan and environment. Typical priorities include rapid response for critical issues and same-day handling for standard requests, with monthly KPI/SLA reporting.",
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
