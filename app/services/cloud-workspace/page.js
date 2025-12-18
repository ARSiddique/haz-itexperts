// app/services/cloud-workspace/page.js
import ServiceClientPage from "../_components/ServiceClientPage";
import { site } from "@/lib/siteConfig";

export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/services/cloud-workspace`;

  const title = `Cloud & 365/Workspace | ${brand}`;
  const description =
    "Migrations, identity, governance, collaboration tuning, and SaaS backup.";

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
          alt: `${brand} — Cloud & 365/Workspace`,
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

  const cfg = {
    title: "Cloud & 365/Workspace",
    lede:
      "Migrate email and files with confidence, standardize identity, enforce DLP and retention, and protect everything with verified SaaS backups.",
    hero: "/images/services/cloud-hero.svg",
    stats: [
      { kpi: "0–1h", label: "Cutover downtime" },
      { kpi: "100%", label: "Mailbox success" },
      { kpi: "DLP", label: "Sensitive data guardrails" },
      { kpi: "Backup", label: "Point-in-time restore" },
    ],
    sections: [
      {
        heading: "Migrations that feel invisible",
        body:
          "Pre-flight scans, pilot cohorts, and throttled migration batches keep disruption low—most users barely notice the cutover. A clear communications kit and hypercare support ensure the transition is smooth and predictable.",
        image: "/images/illus/cloud-move.svg",
        imageSide: "right",
      },
      {
        heading: "Governance from day one",
        body:
          "With a clean SharePoint/Drive information architecture, retention labels, and DLP rules, sharing becomes least-privilege by design. SaaS backup goes beyond the recycle bin to deliver real recoverability with tested restores.",
        image: "/images/illus/dlp.svg",
        imageSide: "left",
      },
    ],
    problems: [
      "Scattered files & permissive sharing",
      "Legacy mailboxes & PST sprawl",
      "No DLP/retention — risky leaks",
      "Teams/Meet structure chaotic",
    ],
    outcomes: [
      "Clean information architecture with least-privilege sharing",
      "Seamless cutover with validation and rollback options",
      "Retention + DLP policies backed by audit logs",
      "Backups beyond the recycle bin with tested restores",
    ],
    features: [
      { icon: "Cloud", title: "Email & Files Migration", desc: "Staged or cutover migrations with validation and rollback." },
      { icon: "Users", title: "Identity & SSO", desc: "Entra ID / Google Workspace IAM plus Conditional Access." },
      { icon: "Lock", title: "DLP & Governance", desc: "Labels, sharing policy, and audit visibility." },
      { icon: "Server", title: "Sites/Drives Design", desc: "Ownership, structure, and lifecycle hygiene." },
      { icon: "Database", title: "SaaS Backup", desc: "Mailbox, Drive, and SharePoint restores you can trust." },
      { icon: "Globe", title: "Collaboration", desc: "Teams/Channels/Spaces standards and lifecycle controls." },
    ],
    gallery: [
      "/images/illus/screens-1.svg",
      "/images/illus/screens-3.svg",
      "/images/illus/screens-2.svg",
    ],
    steps: [
      {
        title: "Plan",
        desc: "Inventory data and dependencies, then choose the right migration strategy.",
        outputs: ["Runbook + rollback plan", "Pilot cohort"],
      },
      {
        title: "Prep",
        desc: "Finalize identity, DNS, licensing, and required tooling or agents.",
        outputs: ["Conditional Access rules", "Backup pre-checks"],
      },
      {
        title: "Move",
        desc: "Run migrations in batches, validate results, and support users through hypercare.",
        outputs: ["Cutover checklist", "Hypercare support"],
      },
      {
        title: "Harden",
        desc: "Turn on governance: DLP, retention, and backup reporting with routine restore tests.",
        outputs: ["DLP policies", "Backup reports"],
      },
    ],
    timeline: [
      { when: "Week 1", title: "Discovery & plan", desc: "Architecture and pilot design" },
      { when: "Weeks 2–3", title: "Prep", desc: "Identity, DNS, licensing, agents/tooling" },
      { when: "Weeks 4–6", title: "Migration", desc: "Batches with validation and hypercare" },
      { when: "Week 7", title: "Harden", desc: "DLP, retention, and backup hardening" },
    ],
    testimonials: [
      { quote: "Hundreds of mailboxes moved with minimal disruption.", author: "R. Iqbal", role: "IT Manager", avatar: "/images/avatars/a2.svg", rating: 5 },
      { quote: "Information architecture finally made sharing sane and secure.", author: "F. Tariq", role: "PM", avatar: "/images/avatars/a1.svg", rating: 5 },
    ],
  };

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${baseUrl}/services` },
      { "@type": "ListItem", position: 3, name: "Cloud & 365/Workspace", item: canonical },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Cloud & 365/Workspace",
    serviceType: "Cloud Migration & Productivity",
    url: canonical,
    provider: {
      "@type": "Organization",
      name: brand,
      url: baseUrl,
      "@id": `${baseUrl}/#organization`,
    },
    areaServed: ["Allentown, PA", "Macungie, PA", "Emmaus, PA", "Lehigh Valley, PA"],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Cloud & 365/Workspace | ${brand}`,
    url: canonical,
    description: "Migrations, identity, governance, collaboration tuning, and SaaS backup.",
    isPartOf: { "@type": "WebSite", name: brand, url: baseUrl },
    breadcrumb: { "@id": `${canonical}#breadcrumb` },
  };

  // attach ids (optional but nice)
  breadcrumbsSchema["@id"] = `${canonical}#breadcrumb`;
  serviceSchema["@id"] = `${canonical}#service`;
  webPageSchema.mainEntity = { "@id": `${canonical}#service` };

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
