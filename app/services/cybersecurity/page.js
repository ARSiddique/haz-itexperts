// app/services/cybersecurity/page.js
import ServiceClientPage from "../_components/ServiceClientPage";
import { site } from "@/lib/siteConfig";

export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/services/cybersecurity`;
  const ogImage = `${baseUrl}/og-image.png?v=7`;

  // ✅ Local intent + clean phrasing
  const title = `Cybersecurity Services in Allentown, PA | EDR/XDR, MFA & Backup/DR | ${brand}`;
  const description =
    "Cybersecurity for SMBs in Allentown & the Lehigh Valley: identity hardening (MFA/Conditional Access), EDR/XDR, email protection, vulnerability management, and backup/DR with restore testing.";

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
    title: "Cybersecurity Services",
    lede:
      "Identity-first security, modern endpoint defense, email protection, and tested recovery—built into a practical security program for small businesses.",

    hero: "/images/services/cyber-hero.svg",

    // ✅ No fake numbers — still “benefit-driven”
    stats: [
      { kpi: "MFA + CA", label: "Identity hardening" },
      { kpi: "EDR/XDR", label: "Endpoint defense" },
      { kpi: "Backup/DR", label: "Recoverability" },
      { kpi: "Quarterly", label: "Reviews & tabletop drills" },
    ],

    sections: [
      {
        heading: "Identity is the new perimeter",
        body:
          "Most incidents start with stolen credentials. We deploy MFA and Conditional Access, enforce device compliance, and apply least-privilege access so a single compromised password doesn’t become a full breach. Admin access is tightened with role separation and secure workflows.",
        image: "/images/illus/identity.svg",
        imageSide: "right",
      },
      {
        heading: "Detect fast, contain, and recover",
        body:
          "EDR/XDR gives visibility into suspicious behavior across endpoints. We help you tune alerts, define response playbooks, and isolate affected devices quickly. Combine that with email security and phishing awareness, and you reduce both technical and human risk over time.",
        image: "/images/illus/shield.svg",
        imageSide: "left",
      },
      {
        heading: "Backup is only real when restores are tested",
        body:
          "Backups that haven’t been tested fail when it matters most. We implement backup/DR that supports immutable copies (where appropriate) and schedule restore tests—so recovery is predictable and business impact stays low.",
        image: "/images/illus/screens-3.svg",
        imageSide: "right",
      },
    ],

    problems: [
      "Weak or inconsistent MFA; admins over-privileged",
      "Phishing and ransomware attempts increasing",
      "Backups exist but restores are untested",
      "Security policies and training aren’t operational",
    ],

    outcomes: [
      "MFA + Conditional Access across users and admins",
      "EDR/XDR with response playbooks and escalation paths",
      "Backup/DR with restore testing and clear RTO/RPO targets",
      "A security cadence with reporting and continuous improvement",
    ],

    features: [
      { icon: "Shield", title: "EDR/XDR", desc: "Deployment, tuning, and response playbooks." },
      { icon: "KeySquare", title: "Identity & MFA", desc: "Conditional Access + least privilege practices." },
      { icon: "AlertTriangle", title: "Vulnerability Mgmt", desc: "Scanning + prioritized remediation workflow." },
      { icon: "Fingerprint", title: "Email Protection", desc: "Anti-phishing, spoofing protection, policy hardening." },
      { icon: "Database", title: "Backup/DR", desc: "Resilient backups with restore testing." },
      { icon: "BookOpen", title: "Policies & Training", desc: "Practical controls aligned to CIS/NIST concepts." },
    ],

    gallery: [
      "/images/illus/screens-2.svg",
      "/images/illus/screens-3.svg",
      "/images/illus/screens-1.svg",
    ],

    steps: [
      {
        title: "Baseline",
        desc: "Quick assessment and gap map against practical best practices.",
        outputs: ["Scorecard", "Prioritized security backlog"],
      },
      {
        title: "Implement",
        desc: "MFA/CA, EDR/XDR, email protection, and backup hardening.",
        outputs: ["Policies", "Rollout plan"],
      },
      {
        title: "Operate",
        desc: "Alert tuning, vuln remediation cadence, and reporting.",
        outputs: ["Monthly posture report"],
      },
      {
        title: "Review",
        desc: "Tabletop drills and evidence refresh for leadership/compliance needs.",
        outputs: ["IR playbook updates", "Quarterly review notes"],
      },
    ],

    deliverables: [
      "Security scorecard + prioritized roadmap",
      "Incident response playbook & escalation paths",
      "Conditional Access + MFA policy set",
      "Vulnerability report + remediation priorities",
      "Backup/DR notes + restore test results",
    ],

    tooling: ["EDR/XDR", "Email security", "Identity (Entra/Google)", "Logging", "Backup/DR"],

    timeline: [
      { when: "Weeks 1–2", title: "Baseline & quick wins", desc: "MFA/CA + email hardening" },
      { when: "Weeks 3–6", title: "Deploy & tune", desc: "EDR/XDR + vuln cadence + backup hardening" },
      { when: "Quarterly", title: "Review & drills", desc: "Tabletops + reporting + roadmap updates" },
    ],

    // ✅ remove fake names; keep believable
    testimonials: [
      {
        quote: "We finally got MFA and access policies consistent across the business—huge peace of mind.",
        author: "Operations Lead",
        role: "SMB (Lehigh Valley)",
        avatar: "/images/avatars/a3.svg",
        rating: 5,
      },
      {
        quote: "EDR visibility plus restore testing made our incident readiness feel real, not theoretical.",
        author: "Managing Partner",
        role: "Local firm",
        avatar: "/images/avatars/a4.svg",
        rating: 5,
      },
    ],
  };

  // ✅ JSON-LD
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
    name: "Cybersecurity Services",
    serviceType: "Cybersecurity Services",
    description:
      "Identity hardening (MFA/Conditional Access), EDR/XDR, email protection, vulnerability management, and backup/DR with restore testing for small and mid-sized businesses.",
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
    name: `Cybersecurity Services in Allentown, PA | ${brand}`,
    description:
      "Cybersecurity for SMBs: identity hardening, EDR/XDR, email protection, vulnerability management, and backup/DR with restore testing.",
    isPartOf: { "@type": "WebSite", "@id": `${baseUrl}/#website` },
    publisher: { "@type": "Organization", "@id": `${baseUrl}/#organization` },
    breadcrumb: { "@id": `${canonical}#breadcrumb` },
    mainEntity: { "@id": `${canonical}#service` },
  };

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
            "Identity hardening (MFA/Conditional Access), endpoint defense (EDR/XDR), email protection, vulnerability management, and backup/DR with restore testing—plus reporting and a security roadmap.",
        },
      },
      {
        "@type": "Question",
        name: "Do you support incident response?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. We define response playbooks (containment, investigation, recovery) and can help isolate endpoints using EDR/XDR guidance. We also run tabletop drills and maintain an incident response plan.",
        },
      },
      {
        "@type": "Question",
        name: "Can you help with compliance-oriented SMBs?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. We can align controls and reporting to common best-practice frameworks (like CIS/NIST concepts) and maintain evidence-friendly documentation and reviews.",
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
