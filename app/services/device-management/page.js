// app/services/device-management/page.js
import ServiceClientPage from "../_components/ServiceClientPage";
import { site } from "@/lib/siteConfig";

export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/services/device-management`;

  const title = `Device Management (MDM, Autopilot, Jamf) in Allentown, PA | ${brand}`;
  const description =
    "Windows, macOS, iOS & Android device management for SMBs in Allentown & the Lehigh Valley: zero-touch enrollment, security baselines, patch & app management, compliance reporting, and device lifecycle control.";

  const ogImage = `${baseUrl}/og-image.png?v=7`;

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
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${brand} — Device Management` }],
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

  // ✅ keep claims realistic
  const cfg = {
    title: "Device Management",
    lede:
      "Standardize devices across Windows, macOS, iOS, and Android with enrollment, baselines, patching, app catalogs, and compliance visibility—without slowing users down.",
    hero: "/images/services/device-hero.svg",

    // ✅ neutral + believable (no % promises)
    stats: [
      { kpi: "Zero-touch", label: "Autopilot / ABM" },
      { kpi: "Baselines", label: "Security standards" },
      { kpi: "Patching", label: "Cadence + rings" },
      { kpi: "Lifecycle", label: "Procure → retire" },
    ],

    sections: [
      {
        heading: "Zero-touch enrollment and consistent setup",
        body:
          "With Windows Autopilot, Jamf, and Apple Business Manager (ABM), new devices ship directly to users and enroll automatically. Standard build profiles reduce surprises and make onboarding repeatable across teams.",
        image: "/images/illus/enroll.svg",
        imageSide: "right",
      },
      {
        heading: "Compliance visibility (not just checkbox policies)",
        body:
          "Encryption, firewall, and patch posture stay visible through dashboards and reports. Exceptions are documented, time-bound, and reviewed—so policies remain practical and enforceable over time.",
        image: "/images/illus/compliance.svg",
        imageSide: "left",
      },
      {
        heading: "Apps, updates, and drift control",
        body:
          "We manage app catalogs, update rings, and compliance checks to reduce device drift. That means fewer helpdesk tickets, better performance, and faster recovery when something goes wrong.",
        image: "/images/illus/screens-1.svg",
        imageSide: "right",
      },
    ],

    features: [
      { icon: "Laptop", title: "MDM Enrollment", desc: "Autopilot, Jamf, ABM, and Android Enterprise enrollment." },
      { icon: "Lock", title: "Security Baselines", desc: "Encryption, firewall, allowlists, and compliance policies." },
      { icon: "Wrench", title: "Patch & Apps", desc: "OS/app updates with rings, maintenance windows, and rollback." },
      { icon: "AlertTriangle", title: "Lost / Stolen", desc: "Remote lock/wipe workflows and access response steps." },
      { icon: "LineChart", title: "Reporting", desc: "Patch posture, encryption coverage, and drift/compliance trends." },
      { icon: "Users", title: "Lifecycle", desc: "Procure → assign → replace → retire → disposal guidance." },
    ],

    timeline: [
      { when: "Week 1", title: "Baselines", desc: "Policies, profiles, and standards" },
      { when: "Week 2", title: "Enrollment", desc: "Zero-touch setup + asset mapping" },
      { when: "Weeks 3–4", title: "Operate", desc: "Patch/app cadence + reporting" },
    ],

    // ✅ generic roles (no fake names)
    testimonials: [
      {
        quote: "New device setup became consistent and predictable across the team.",
        author: "IT Manager",
        role: "SMB (Lehigh Valley)",
        avatar: "/images/avatars/a1.svg",
        rating: 5,
      },
      {
        quote: "Compliance reporting is clearer now, and exceptions are controlled properly.",
        author: "Operations Lead",
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
      "Zero-touch enrollment, security baselines, patch & app management, compliance reporting, and device lifecycle control for Windows, macOS, iOS, and Android.",
    url: canonical,
    provider: { "@type": "Organization", "@id": `${baseUrl}/#organization` },
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
    name: `Device Management | ${brand}`,
    description:
      "Zero-touch enrollment, security baselines, patch & app management, compliance reporting, and device lifecycle control.",
    isPartOf: { "@type": "WebSite", "@id": `${baseUrl}/#website` },
    publisher: { "@type": "Organization", "@id": `${baseUrl}/#organization` },
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
            "Yes. We can apply app protection and compliance policies so corporate data stays protected without overreaching on personal use.",
        },
      },
      {
        "@type": "Question",
        name: "How fast do critical patches get applied?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We follow a defined patch cadence with pilot rings and rollback planning. Critical updates are prioritized according to agreed SLAs and business impact.",
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
