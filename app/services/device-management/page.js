// app/services/device-management/page.js
import ServiceClientPage from "../_components/ServiceClientPage";
import { site } from "@/lib/siteConfig";

export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/services/device-management`;

  // ✅ stronger title/description (intent + platforms + local)
  const title = `Device Management (MDM/Autopilot/Jamf) | ${brand}`;
  const description =
    "Windows, macOS, iOS & Android device management for SMBs in Allentown & the Lehigh Valley: zero-touch enrollment, hardening, patch & app management, compliance reporting, and lifecycle control.";

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
          alt: `${brand} — Device Management`,
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
  const canonical = `${baseUrl}/services/device-management`;

  const cfg = {
    title: "Device Management",
    lede:
      "Windows, macOS, iOS, and Android—standardized baselines, patching, app catalogs, and compliance dashboards across your entire fleet.",
    hero: "/images/services/device-hero.svg",
    stats: [
      { kpi: "100%", label: "Disk encryption" },
      { kpi: "≤7d", label: "Critical patch SLA" },
      { kpi: "BYOD", label: "App protection" },
      { kpi: "Quarterly", label: "Compliance review" },
    ],
    sections: [
      {
        heading: "Zero-touch that users actually love",
        body:
          "With Autopilot, Jamf, and Apple Business Manager (ABM), devices become policy-compliant right out of the box. Clear onboarding checklists keep the HR-to-IT handoff smooth and predictable.",
        image: "/images/illus/enroll.svg",
        imageSide: "right",
      },
      {
        heading: "Compliance you can trust",
        body:
          "Encryption, firewall status, and patch levels are visible in dashboards at all times. Exceptions are documented, time-bound, and reviewed regularly—so compliance stays real, not just a checkbox.",
        image: "/images/illus/compliance.svg",
        imageSide: "left",
      },
    ],
    features: [
      { icon: "Laptop", title: "MDM Enrollment", desc: "Autopilot, Jamf, ABM, and Android Enterprise." },
      { icon: "Lock", title: "Hardening", desc: "Encryption, firewall, allowlists, and compliance rules." },
      { icon: "Wrench", title: "Patch & Apps", desc: "Automated OS/app updates and app catalogs." },
      { icon: "AlertTriangle", title: "Lost/Stolen", desc: "Remote lock/wipe and chain-of-custody workflows." },
      { icon: "LineChart", title: "Compliance Reports", desc: "Drift, encryption coverage, and patch levels." },
      { icon: "Users", title: "Lifecycle", desc: "Procure → assign → replace → retire → dispose." },
    ],
    timeline: [
      { when: "Week 1", title: "Baselines", desc: "Profiles and policies" },
      { when: "Week 2", title: "Enrollment", desc: "Zero-touch setup and asset mapping" },
      { when: "Weeks 3–4", title: "Operate", desc: "Patch and app cadence" },
    ],
    testimonials: [
      {
        quote: "98%+ compliance—audits became painless.",
        author: "H. Javed",
        role: "CISO",
        avatar: "/images/avatars/a1.svg",
        rating: 5,
      },
      {
        quote: "BYOD is secure and frictionless now.",
        author: "N. Fatima",
        role: "IT Lead",
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
      { "@type": "ListItem", position: 3, name: "Device Management", item: canonical },
    ],
  };

  // ✅ Service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonical}#service`,
    name: "Device Management",
    serviceType: "Endpoint & Mobile Device Management",
    description:
      "Zero-touch enrollment, security hardening, patch & app management, compliance reporting, and device lifecycle control for Windows, macOS, iOS, and Android.",
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
    name: `Device Management | ${brand}`,
    description:
      "Zero-touch enrollment, hardening, patch & app management, compliance, and lifecycle.",
    isPartOf: { "@type": "WebSite", "@id": `${baseUrl}/#website` },
    publisher: { "@type": "Organization", "@id": `${baseUrl}/#organization` },
    breadcrumb: { "@id": `${canonical}#breadcrumb` },
    mainEntity: { "@id": `${canonical}#service` },
  };

  // ✅ FAQ (rich-result support)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${canonical}#faq`,
    mainEntity: [
      {
        "@type": "Question",
        name: "Which platforms do you manage?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Windows, macOS, iOS, and Android — including zero-touch enrollment, baselines, patching, app deployment, and compliance reporting.",
        },
      },
      {
        "@type": "Question",
        name: "Do you support BYOD devices?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. We apply app protection and compliance policies so corporate data stays protected without overreaching on personal use.",
        },
      },
      {
        "@type": "Question",
        name: "How fast do critical patches get applied?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We follow a defined patch cadence with an SLA target for critical updates (typically within 7 days), with pilot rings and rollback plans.",
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
