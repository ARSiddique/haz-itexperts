// app/services/device-management/page.js
import ServiceClientPage from "../_components/ServiceClientPage";
import { site } from "@/lib/siteConfig";

export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/services/device-management`;

  const title = `Device Management | ${brand}`;
  const description =
    "Zero-touch enrollment, hardening, patch & app management, compliance, and lifecycle.";

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

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonical}#service`,
    name: "Device Management",
    serviceType: "Endpoint & Mobile Device Management",
    url: canonical,
    provider: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: brand,
      url: baseUrl,
    },
    areaServed: ["Allentown, PA", "Macungie, PA", "Emmaus, PA", "Lehigh Valley, PA"],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Device Management | ${brand}`,
    url: canonical,
    description:
      "Zero-touch enrollment, hardening, patch & app management, compliance, and lifecycle.",
    isPartOf: { "@type": "WebSite", name: brand, url: baseUrl },
    breadcrumb: { "@id": `${canonical}#breadcrumb` },
    mainEntity: { "@id": `${canonical}#service` },
  };

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
