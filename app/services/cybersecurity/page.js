import ServiceClientPage from "../_components/ServiceClientPage";

export async function generateMetadata() {
  const title = "Cybersecurity — Supreme IT Experts";
  const description =
    "CIS/NIST aligned: zero-trust identity, EDR/XDR, phishing defense, immutable backups.";
  return {
    title,
    description,
    alternates: { canonical: "/services/cybersecurity" },
    openGraph: {
      title,
      description,
      type: "article",
      url: "/services/cybersecurity",
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
    title: "Cybersecurity",
    lede:
      "Identity-first controls, modern endpoint defense, phishing resistance, and proven recoverability—delivered through a measurable security program.",
    hero: "/images/services/cyber-hero.svg",
    stats: [
      { kpi: "↓85%", label: "Phishing risk" },
      { kpi: "24×7", label: "Monitoring-ready" },
      { kpi: "Quarterly", label: "Tabletops" },
      { kpi: "Zero-trust", label: "Identity-first" },
    ],
    sections: [
      {
        heading: "Identity is the new perimeter",
        body:
          "MFA, Conditional Access, device compliance, and least-privilege controls stop the path from a compromised password to a full breach. We also gate privileged access using just-in-time / just-enough administration practices.",
        image: "/images/illus/identity.svg",
        imageSide: "right",
      },
      {
        heading: "Detect fast, respond faster",
        body:
          "Curated EDR/XDR playbooks help you isolate, investigate, and recover quickly. Paired with email security and monthly phishing simulations, your team’s behavior becomes measurable—and risk drops over time.",
        image: "/images/illus/shield.svg",
        imageSide: "left",
      },
    ],
    problems: [
      "Inconsistent MFA; privileged access unmanaged",
      "Phishing/ransomware attempts increasing",
      "Backups not immutable/tested",
      "Policies & training outdated",
    ],
    outcomes: [
      "Strong MFA and Conditional Access across users and admins",
      "Rapid endpoint isolation and incident response",
      "Immutable backups with tested restores",
      "An awareness program with a visible reduction in clicks",
    ],
    features: [
      { icon: "Shield", title: "EDR/XDR", desc: "Managed detections, isolation, and response." },
      { icon: "KeySquare", title: "Identity & MFA", desc: "Conditional Access policies, PAM, JIT/JEA." },
      { icon: "AlertTriangle", title: "Vulnerability Mgmt", desc: "Scans plus remediation pipelines." },
      { icon: "Fingerprint", title: "Email & Phishing", desc: "Advanced filtering plus simulations." },
      { icon: "Database", title: "Backup/Immutable", desc: "Air-gapped copy plus quarterly restores." },
      { icon: "BookOpen", title: "Policies & Training", desc: "Practical controls mapped to CIS/NIST." },
    ],
    gallery: [
      "/images/illus/screens-2.svg",
      "/images/illus/screens-3.svg",
      "/images/illus/screens-1.svg",
    ],
    steps: [
      { title: "Baseline", desc: "Gap analysis against CIS/NIST.", outputs: ["Scorecard", "Prioritized backlog"] },
      { title: "Implement", desc: "MFA/CA, EDR, email security, and backups.", outputs: ["Policies", "EDR rollout"] },
      { title: "Operate", desc: "Alert tuning, vulnerability management, phishing drills.", outputs: ["Monthly posture report"] },
      { title: "Audit", desc: "Tabletops and evidence refresh.", outputs: ["IR plan", "Evidence pack"] },
    ],
    deliverables: [
      "Security scorecard",
      "IR playbook",
      "Conditional Access / MFA policies",
      "Vulnerability report",
      "Awareness results",
    ],
    tooling: ["EDR/XDR", "Email security", "SIEM/Logs", "M365/Entra", "Backup (immutable)"],
    timeline: [
      { when: "Weeks 1–2", title: "Baseline & quick wins", desc: "MFA/CA rollout" },
      { when: "Weeks 3–6", title: "Deploy & tune", desc: "EDR, email, backups" },
      { when: "Quarterly", title: "Tabletop & audit", desc: "Evidence refresh" },
    ],
    testimonials: [
      { quote: "After rolling out Conditional Access and MFA, attempted breaches dropped to near zero.", author: "M. Raza", role: "CFO", avatar: "/images/avatars/a3.svg", rating: 5 },
      { quote: "Phishing drills made the team noticeably more disciplined and consistent.", author: "H. Noor", role: "Ops Head", avatar: "/images/avatars/a4.svg", rating: 5 },
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
                { "@type": "ListItem", position: 3, name: "Cybersecurity", item: "https://supremeitexperts.com/services/cybersecurity" },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Cybersecurity",
              serviceType: "Cybersecurity Services",
              provider: { "@type": "Organization", name: "Supreme IT Experts", url: "https://supremeitexperts.com" },
              areaServed: ["Allentown, PA", "Macungie, PA", "Emmaus, PA", "Lehigh Valley, PA"],
              url: "https://supremeitexperts.com/services/cybersecurity",
            },
          ]),
        }}
      />
      <ServiceClientPage cfg={cfg} />
    </>
  );
}
