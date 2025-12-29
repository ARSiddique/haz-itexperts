// app/services/cloud-workspace/page.js
import ServiceClientPage from "../_components/ServiceClientPage";
import { site } from "@/lib/siteConfig";
import { BUSINESS_ID, BASE_URL } from "@/lib/seoIds";

export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/services/cloud-workspace`;
  const ogImage = `${baseUrl}/og-image.png?v=7`;

  const title = `Cloud & Microsoft 365 Support in Allentown, PA | Migrations, Security & Automation | ${brand}`;
  const description =
    "Microsoft 365, Google Workspace and cloud support for SMBs in Allentown, Macungie & Emmaus: migrations, identity/SSO, SharePoint/Drive governance, DLP/retention, Teams/Meet setup, and SaaS backup with restore testing.";

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
          alt: `${brand} — Cloud & Microsoft 365`,
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
  const baseUrl = (site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const brand = site?.name || "Supreme IT Experts";
  const canonical = `${baseUrl}/services/cloud-workspace`;

  // ✅ FAQs (also used for FAQPage schema)
  const faqs = [
    {
      q: "How long does a Microsoft 365 / Workspace migration take?",
      a: "Most SMB migrations run a few weeks depending on mailbox count, file volume, and governance needs. We usually start with a pilot, then migrate in batches to keep disruption low.",
    },
    {
      q: "Can you migrate without downtime?",
      a: "We plan cutovers to minimize downtime and user impact. Most users experience minimal interruption, and we validate results with a clear rollback option if needed.",
    },
    {
      q: "Do you set up DLP and retention policies?",
      a: "Yes. We can implement retention rules/labels, sharing controls, auditing, and reporting so collaboration stays secure and compliant.",
    },
    {
      q: "Is SaaS backup necessary if we use Microsoft/Google?",
      a: "Native retention/recycle bin features aren’t the same as independent backup. SaaS backup provides point-in-time recovery for mail and files, plus restore testing for real confidence.",
    },
  ];

  const cfg = {
    title: "Cloud & Microsoft 365 / Google Workspace",
    lede:
      "Migrate email and files safely, standardize identity, clean up sharing, and add real recoverability with SaaS backups and restore testing.",

    hero: "/images/services/cloud-hero.svg",

    // ✅ no hard claims
    stats: [
      { kpi: "Pilot-first", label: "Low-risk migrations" },
      { kpi: "SSO + MFA", label: "Identity hardening" },
      { kpi: "DLP/Retention", label: "Governance guardrails" },
      { kpi: "Restore tests", label: "Recoverability you can verify" },
    ],

    sections: [
      {
        heading: "Migrations that stay calm",
        body:
          "We start with discovery and a pilot to confirm mail flow, permissions, and edge cases before moving everyone. Then we migrate in controlled batches, validate results, and provide hypercare support so users stay productive during the transition.",
        image: "/images/illus/cloud-move.svg",
        imageSide: "right",
      },
      {
        heading: "Governance that prevents mess later",
        body:
          "We design SharePoint/Drive structure, ownership rules, and sharing policies so collaboration stays organized and least-privilege by default. Retention and DLP help reduce accidental exposure—without blocking normal work.",
        image: "/images/illus/dlp.svg",
        imageSide: "left",
      },
      {
        heading: "Backups beyond ‘recycle bin’",
        body:
          "SaaS backup gives independent point-in-time recovery for mail and files. We also schedule restore tests so you know recovery works—before a deletion, ransomware, or account compromise forces the issue.",
        image: "/images/illus/screens-1.svg",
        imageSide: "right",
      },
    ],

    problems: [
      "Scattered files and permissive sharing",
      "Legacy mailboxes, PST sprawl, and unclear ownership",
      "No governance: retention/DLP/audit settings missing",
      "Teams/Meet and shared drives become chaotic",
    ],

    outcomes: [
      "Cleaner structure with ownership + secure sharing defaults",
      "Predictable migration with validation and rollback plan",
      "Retention + DLP policies with auditing/reporting",
      "SaaS backup with restore testing and recovery confidence",
    ],

    features: [
      {
        icon: "Cloud",
        title: "Email & Files Migration",
        desc: "Pilot-first, batch migrations with validation and rollback planning.",
      },
      {
        icon: "Users",
        title: "Identity & SSO",
        desc: "Entra ID / Google identity setup, MFA, and access standards.",
      },
      {
        icon: "Lock",
        title: "Governance (DLP/Retention)",
        desc: "Sharing controls, retention policies, auditing, and reporting.",
      },
      {
        icon: "Server",
        title: "SharePoint/Drive Design",
        desc: "Structure, ownership, lifecycle, and permission hygiene.",
      },
      {
        icon: "Database",
        title: "SaaS Backup",
        desc: "Independent backup for mail and files with restore testing.",
      },
      {
        icon: "Globe",
        title: "Collaboration Standards",
        desc: "Teams/Channels/Spaces naming, templates, and lifecycle rules.",
      },
    ],

    gallery: ["/images/illus/screens-1.svg", "/images/illus/screens-3.svg", "/images/illus/screens-2.svg"],

    steps: [
      {
        title: "Plan",
        desc: "Inventory mail, files, permissions, and dependencies. Choose a staged or cutover approach.",
        outputs: ["Migration runbook", "Pilot cohort + success criteria"],
      },
      {
        title: "Prep",
        desc: "Identity, DNS, licensing, security baselines, and pre-checks.",
        outputs: ["SSO/MFA setup", "Backup readiness checklist"],
      },
      {
        title: "Move",
        desc: "Migrate in batches, validate outcomes, and support users during hypercare.",
        outputs: ["Cutover checklist", "Hypercare support plan"],
      },
      {
        title: "Harden",
        desc: "Enable governance and reporting; schedule restore tests for ongoing confidence.",
        outputs: ["Retention/DLP policies", "Backup + restore test cadence"],
      },
    ],

    timeline: [
      { when: "Week 1", title: "Discovery & plan", desc: "Architecture, risks, and pilot plan" },
      { when: "Weeks 2–3", title: "Preparation", desc: "Identity, DNS, licensing, security baselines" },
      { when: "Weeks 4–6", title: "Migration", desc: "Batches + validation + hypercare" },
      { when: "Week 7", title: "Harden", desc: "Governance + backup reporting + restore tests" },
    ],

    // ✅ remove fake people names; keep credible
    testimonials: [
      {
        quote: "The migration was structured and calm—users stayed productive during the move.",
        author: "Office Manager",
        role: "SMB (Allentown area)",
        avatar: "/images/avatars/a2.svg",
        rating: 5,
      },
      {
        quote: "Once sharing rules and ownership were fixed, files finally stayed organized and secure.",
        author: "Operations Lead",
        role: "Local business",
        avatar: "/images/avatars/a1.svg",
        rating: 5,
      },
    ],

    faqs,
  };

  // ✅ JSON-LD (Breadcrumb + WebPage + Service + FAQPage)
  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${baseUrl}/services` },
      { "@type": "ListItem", position: 3, name: "Cloud & 365/Workspace", item: canonical },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonical}#service`,
    name: "Cloud & Microsoft 365 / Google Workspace",
    description:
      "Microsoft 365 and Google Workspace services: migrations, identity/SSO, SharePoint/Drive governance, DLP/retention, collaboration standards, and SaaS backup with restore testing.",
    serviceType: "Cloud Migration & Productivity",
    url: canonical,
    provider: { "@id": BUSINESS_ID },
    areaServed: ["Allentown, PA", "Macungie, PA", "Emmaus, PA"],
    offers: {
      "@type": "Offer",
      url: `${baseUrl}/get-quote`,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: `Cloud & Microsoft 365 / Google Workspace | ${brand}`,
    description:
      "Migrations, identity, governance, collaboration tuning, and SaaS backup for SMBs in Allentown & tMacungie & Emmaus.",
    isPartOf: { "@type": "WebSite", "@id": `${baseUrl}/#website` },
    breadcrumb: { "@id": `${canonical}#breadcrumb` },
    mainEntity: { "@id": `${canonical}#service` },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${canonical}#faq`,
    mainEntity: faqs.map((x) => ({
      "@type": "Question",
      name: x.q,
      acceptedAnswer: { "@type": "Answer", text: x.a },
    })),
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
