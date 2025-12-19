// app/services/cybersecurity/page.js
import ServiceClientPage from "../_components/ServiceClientPage";
import { site } from "@/lib/siteConfig";

export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/services/cybersecurity`;

  // ✅ stronger title/desc (service + intent + local)
  const title = `Cybersecurity Services (EDR/XDR, MFA, Backup/DR) | ${brand}`;
  const description =
    "CIS/NIST-aligned cybersecurity for SMBs in Allentown & the Lehigh Valley: zero-trust identity (MFA/Conditional Access), EDR/XDR, phishing defense, and immutable backups with tested restores.";

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
          alt: `${brand} — Cybersecurity`,
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
  const canonical = `${baseUrl}/services/cybersecurity`;

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
      {
        quote: "After rolling out Conditional Access and MFA, attempted breaches dropped to near zero.",
        author: "M. Raza",
        role: "CFO",
        avatar: "/images/avatars/a3.svg",
        rating: 5,
      },
      {
        quote: "Phishing drills made the team noticeably more disciplined and consistent.",
        author: "H. Noor",
        role: "Ops Head",
        avatar: "/images/avatars/a4.svg",
        rating: 5,
      },
    ],
  };

  // ✅ JSON-LD (aligned IDs)
  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${baseUrl}/services` },
      { "@type": "ListItem", position: 3, name: "Cybersecurity", item: canonical },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonical}#service`,
    name: "Cybersecurity",
    serviceType: "Cybersecurity Services",
    description:
      "CIS/NIST aligned cybersecurity: zero-trust identity (MFA/Conditional Access), EDR/XDR, phishing defense, and immutable backups with tested restores.",
    url: canonical,
    provider: { "@type": "Organization", "@id": `${baseUrl}/#organization` },
    areaServed: ["Allentown, PA", "Macungie, PA", "Emmaus, PA", "Lehigh Valley, PA"],
    offers: {
      "@type": "Offer",
      url: `${baseUrl}/get-quote`,
      availability: "https://schema.org/InStock",
    },
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: `Cybersecurity | ${brand}`,
    description:
      "CIS/NIST aligned: zero-trust identity, EDR/XDR, phishing defense, immutable backups.",
    isPartOf: { "@type": "WebSite", "@id": `${baseUrl}/#website` },
    publisher: { "@type": "Organization", "@id": `${baseUrl}/#organization` },
    breadcrumb: { "@id": `${canonical}#breadcrumb` },
    mainEntity: { "@id": `${canonical}#service` },
  };

  // ✅ FAQ schema (quick rich-result support)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${canonical}#faq`,
    mainEntity: [
      {
        "@type": "Question",
        name: "What’s included in your cybersecurity program?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Identity hardening (MFA/Conditional Access), EDR/XDR deployment, phishing defense, vulnerability management, and immutable backup + restore testing.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide incident response support?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes — we use EDR/XDR playbooks to isolate endpoints, investigate alerts, and guide recovery. We also run tabletop exercises and maintain an IR playbook.",
        },
      },
      {
        "@type": "Question",
        name: "Can you support compliance-oriented SMBs?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes — controls and documentation can be mapped to CIS/NIST practices, with evidence-ready reporting and periodic reviews.",
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
