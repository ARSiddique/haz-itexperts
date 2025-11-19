import ServiceClientPage from "../_components/ServiceClientPage";

export async function generateMetadata() {
  const title = "Cloud & 365/Workspace — Supreme IT Experts";
  const description = "Migrations, identity, governance, collaboration tuning, and SaaS backup.";
  return {
    title,
    description,
    alternates: { canonical: "/services/cloud-workspace" },
    openGraph: {
      title,
      description,
      type: "article",
      url: "/services/cloud-workspace",
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
    title: "Cloud & 365/Workspace",
    lede:
      "Email & files ko confidence ke saath migrate karain, identity ko standardize karain, DLP/retention enforce karain — aur sab data ko backup karein.",
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
          "Pre-flight scans, pilot cohorts, throttled batches — users ko downtime ka ehsaas bhi nahi hota. Communication kit aur hypercare ensure karta hai ke cutover smooth ho.",
        image: "/images/illus/cloud-move.svg",
        imageSide: "right",
      },
      {
        heading: "Governance from day one",
        body:
          "SharePoint/Drive info architecture, retention labels, aur DLP rules se sharing least-privilege hoti hai. SaaS backup recycle bin se aage ja kar real recoverability deta hai.",
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
      "Clean info architecture; least-privilege sharing",
      "Seamless cutover with validation & rollback",
      "Retention + DLP with audit logs",
      "Backups beyond recycle bin; tested restores",
    ],
    features: [
      { icon: "Cloud", title: "Email & Files Migration", desc: "Cutover/staged; validation & rollback." },
      { icon: "Users", title: "Identity & SSO", desc: "Entra/Workspace IAM + Conditional Access." },
      { icon: "Lock", title: "DLP & Governance", desc: "Labels, sharing policy, audit." },
      { icon: "Server", title: "Sites/Drives Design", desc: "Ownership & structure hygiene." },
      { icon: "Database", title: "SaaS Backup", desc: "Mailbox/Drive/SharePoint restores." },
      { icon: "Globe", title: "Collaboration", desc: "Teams/Channels/Spaces lifecycle." },
    ],
    gallery: ["/images/illus/screens-1.svg", "/images/illus/screens-3.svg", "/images/illus/screens-2.svg"],
    steps: [
      { title: "Plan", desc: "Inventory & dependencies; strategy.", outputs: ["Runbook + rollback", "Pilot cohort"] },
      { title: "Prep", desc: "Identity, DNS, licenses, agents.", outputs: ["CA rules", "Backup pre-checks"] },
      { title: "Move", desc: "Migration & validation.", outputs: ["Cutover checklist", "Hypercare"] },
      { title: "Harden", desc: "DLP/retention/backup.", outputs: ["DLP policies", "Backup reports"] },
    ],
    timeline: [
      { when: "Week 1", title: "Discovery & plan", desc: "Architecture & pilot" },
      { when: "Weeks 2–3", title: "Prep", desc: "Identity, DNS, licenses, agents" },
      { when: "Weeks 4–6", title: "Migration", desc: "Batches + hypercare" },
      { when: "Week 7", title: "Harden", desc: "DLP/Retention/Backup" },
    ],
    testimonials: [
      { quote: "Hundreds of mailboxes moved with minimal disruption.", author: "R. Iqbal", role: "IT Manager", avatar: "/images/avatars/a2.svg", rating: 5 },
      { quote: "Info architecture ne sharing ko finally sane bana diya.", author: "F. Tariq", role: "PM", avatar: "/images/avatars/a1.svg", rating: 5 },
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
                { "@type": "ListItem", position: 3, name: "Cloud & 365/Workspace", item: "https://supremeitexperts.com/services/cloud-workspace" }
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Cloud & 365/Workspace",
              serviceType: "Cloud Migration & Productivity",
              provider: { "@type": "Organization", name: "Supreme IT Experts", url: "https://supremeitexperts.com" },
              areaServed: ["Allentown, PA", "Macungie, PA", "Emmaus, PA", "Philadelphia, PA", "Wilmington, DE"],
              url: "https://supremeitexperts.com/services/cloud-workspace"
            }
          ])
        }}
      />
      <ServiceClientPage cfg={cfg} />
    </>
  );
}
