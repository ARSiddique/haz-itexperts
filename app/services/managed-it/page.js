// app/services/managed-it/page.js
import ServiceClientPage from "../_components/ServiceClientPage";
import { site } from "@/lib/siteConfig";
import { BUSINESS_ID } from "@/lib/seoIds";

export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/services/managed-it`;
  const ogImage = `${baseUrl}/og-image.png?v=7`;

  // ✅ more local intent + clearer
  const title = `Managed IT Services in Allentown, PA | Helpdesk, Monitoring & Patching | ${brand}`;
  const description =
    "Managed IT for small businesses in Allentown & the Lehigh Valley: responsive helpdesk, proactive monitoring, patch management, endpoint baselines, onboarding/offboarding, and leadership reporting (fully managed or co-managed).";

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
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${brand} — Managed IT Services`,
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
    title: "Managed IT Services",
    lede:
      "Day-to-day IT, done right—helpdesk, patching, monitoring, and secure device baselines—so your team can stay focused on the business.",
    hero: "/images/services/managed-hero.svg",

    // ✅ avoid hard guarantees; keep “targets / typical”
    stats: [
      { kpi: "Fast", label: "P1 response targets" },
      { kpi: "Stable", label: "Patch & baseline cadence" },
      { kpi: "Clear", label: "KPIs for leadership" },
      { kpi: "30 days", label: "Typical stabilization sprint" },
    ],

    sections: [
      {
        heading: "Helpdesk that actually closes tickets",
        body:
          "Requests come in through email, chat, or portal—our triage process assigns the right priority fast and keeps clear ownership on every ticket. You get monthly SLA/KPI reporting, so leadership sees what’s working, what’s trending, and what needs attention.",
        image: "/images/illus/helpdesk.svg",
        imageSide: "right",
      },
      {
        heading: "Standardized endpoints = fewer surprises",
        body:
          "We implement consistent Windows/macOS baselines, automated patching, and curated app policies to reduce drift. Monitoring catches issues early, and backup verification plus restore testing makes recovery predictable—not a guess.",
        image: "/images/illus/devices.svg",
        imageSide: "left",
      },
      {
        heading: "Co-managed or fully managed—your choice",
        body:
          "Have internal IT? We can complement your team with shared tooling, SOPs, escalations, and reporting. Or we can run everything end-to-end. Either way, the goal is the same: fewer incidents, faster resolution, and better visibility.",
        image: "/images/illus/screens-2.svg",
        imageSide: "right",
      },
    ],

    problems: [
      "Tickets bounce around with no clear ownership or SLA",
      "Endpoints drift — missed patches, outdated apps, inconsistent configs",
      "On/Offboarding takes too long and access mistakes happen",
      "Leadership has no simple KPIs or risk visibility",
    ],

    outcomes: [
      "Consistent SLAs with clear ticket ownership and escalation",
      "Predictable patching & hardened device baselines",
      "Checklist-driven hires/leavers with fewer access errors",
      "Executive-ready reporting (tickets, assets, patch, risk)",
    ],

    features: [
      { icon: "Wrench", title: "Helpdesk", desc: "Email/chat/portal support with triage and ownership." },
      { icon: "Server", title: "Monitoring", desc: "Endpoint/server/network health signals and alerts." },
      { icon: "Lock", title: "Baseline Security", desc: "Practical hardening + MFA guidance + endpoint protection baseline." },
      { icon: "Database", title: "Backup Checks", desc: "Verification + restore testing for predictable recovery." },
      { icon: "Users", title: "Lifecycle", desc: "Onboarding/offboarding checklists and access control hygiene." },
      { icon: "LineChart", title: "Reporting", desc: "Monthly KPI pack: tickets, response, patch, risk trends." },
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
        outputs: ["Access & tooling plan", "Initial risk register"],
      },
      {
        title: "Stabilize",
        desc: "Monitoring + patching + baseline hardening + backup checks.",
        outputs: ["Patch cadence/rings", "Baseline policies"],
      },
      {
        title: "Optimize",
        desc: "SOPs, automation, and self-service improvements.",
        outputs: ["Runbooks & KB", "Automation backlog"],
      },
      {
        title: "Grow",
        desc: "Roadmap planning and continuous improvement cadence.",
        outputs: ["QBR deck", "Quarterly plan / OKRs"],
      },
    ],

    deliverables: [
      "Ticketing + SLA dashboard (monthly)",
      "Asset inventory + ownership",
      "Patch + baseline status reporting",
      "Backup verification + restore test notes",
      "Roadmap & budget view (quarterly)",
    ],

    tooling: [
      "RMM",
      "EDR/XDR",
      "Intune/Jamf",
      "M365/Workspace",
      "Ticketing + KB",
      "Reporting/KPI pack",
    ],

    timeline: [
      { when: "Week 1", title: "Access & discovery", desc: "Tooling connected + quick wins" },
      { when: "Weeks 2–3", title: "Stabilization sprint", desc: "Patching/monitoring/baselines + backup checks" },
      { when: "Week 4", title: "Reporting + roadmap", desc: "Leadership metrics + next-steps plan" },
    ],
    compactTimeline: true,

    testimonials: [
      {
        quote: "Onboarding went from days to hours, and tickets finally have ownership.",
        author: "Operations Lead",
        role: "SMB (Lehigh Valley)",
        avatar: "/images/avatars/a1.svg",
        rating: 5,
      },
      {
        quote: "The monthly KPIs made it easy to plan budgets and reduce recurring issues.",
        author: "COO",
        role: "Local business",
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

  // ✅ Service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonical}#service`,
    name: "Managed IT Services",
    serviceType: "Managed IT Services",
    description:
      "Helpdesk with SLAs, proactive monitoring, patch management, endpoint baselines, onboarding/offboarding, and leadership reporting for small and mid-sized businesses.",
    url: canonical,
    provider: { "@id": BUSINESS_ID },
    areaServed: ["Allentown, PA", "Macungie, PA", "Emmaus, PA", "Lehigh Valley, PA"],
    offers: {
      "@type": "Offer",
      url: `${baseUrl}/get-quote`,
      availability: "https://schema.org/InStock",
    },
  };

  // ✅ WebPage
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: `Managed IT Services in Allentown, PA | ${brand}`,
    description:
      "Managed IT for SMBs: helpdesk with SLAs, patching, monitoring, endpoint baselines, and leadership reporting.",
    isPartOf: { "@type": "WebSite", "@id": `${baseUrl}/#website` },
    publisher: { "@id": BUSINESS_ID },
    breadcrumb: { "@id": `${canonical}#breadcrumb` },
    mainEntity: { "@id": `${canonical}#service` },
  };

  // ✅ FAQ
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
            "Helpdesk (email/chat/portal), monitoring, patch management, endpoint baselines, onboarding/offboarding checklists, and monthly reporting. Security hardening guidance (MFA, encryption, endpoint protection baseline) is included as part of a practical standard.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer co-managed IT?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. We can run IT end-to-end or work alongside your internal team with shared tooling, SOPs, escalations, and reporting.",
        },
      },
      {
        "@type": "Question",
        name: "What are your SLA targets?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We set SLA targets based on your environment and plan. Critical issues get rapid response targets, while standard requests follow defined same-day/next-day handling—with monthly SLA reporting and continuous improvement.",
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
