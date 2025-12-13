import ServiceClientPage from "../_components/ServiceClientPage";

export async function generateMetadata() {
  const title = "Device Management — Supreme IT Experts";
  const description =
    "Zero-touch enrollment, hardening, patch & app management, compliance, and lifecycle.";
  return {
    title,
    description,
    alternates: { canonical: "/services/device-management" },
    openGraph: {
      title,
      description,
      type: "article",
      url: "/services/device-management",
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
      { quote: "98%+ compliance—audits became painless.", author: "H. Javed", role: "CISO", avatar: "/images/avatars/a1.svg", rating: 5 },
      { quote: "BYOD is secure and frictionless now.", author: "N. Fatima", role: "IT Lead", avatar: "/images/avatars/a2.svg", rating: 5 },
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
                { "@type": "ListItem", position: 3, name: "Device Management", item: "https://supremeitexperts.com/services/device-management" },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Device Management",
              serviceType: "Endpoint & Mobile Device Management",
              provider: { "@type": "Organization", name: "Supreme IT Experts", url: "https://supremeitexperts.com" },
              areaServed: ["Allentown, PA", "Macungie, PA", "Emmaus, PA", "Philadelphia, PA", "Wilmington, DE"],
              url: "https://supremeitexperts.com/services/device-management",
            },
          ]),
        }}
      />
      <ServiceClientPage cfg={cfg} />
    </>
  );
}
