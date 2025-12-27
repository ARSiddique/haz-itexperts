// app/services/projects-consulting/page.js
import ServiceClientPage from "../_components/ServiceClientPage";
import { site } from "@/lib/siteConfig";
import { BUSINESS_ID } from "@/lib/seoIds";

export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/services/projects-consulting`;
  const ogImage = `${baseUrl}/og-image.png?v=7`;

  // ✅ cleaner + local intent
  const title = `IT Projects & Consulting in Allentown, PA | ${brand}`;
  const description =
    "Fixed-scope IT projects for SMBs in Allentown & the Lehigh Valley: audits, office moves, network refresh, migrations, directory cleanup, decommissions, and automation — with runbooks, rollback plans, and clean handover docs.";

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
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${brand} — Projects & Consulting` }],
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
  const canonical = `${baseUrl}/services/projects-consulting`;

  // ✅ FAQs (keep short + real)
  const faqs = [
    {
      q: "Do you offer fixed-scope projects?",
      a: "Yes. We can deliver fixed-scope projects with defined deliverables, milestones, and acceptance checks. Time-and-materials is available when scope is evolving.",
    },
    {
      q: "Can projects be done after-hours or on weekends?",
      a: "Yes. We can plan change windows to reduce business disruption, including evenings and weekends, with rollback steps documented in advance.",
    },
    {
      q: "What does the handover include?",
      a: "As-built documentation, runbooks, admin notes/training, and a short post-project support path so the environment is easy to operate.",
    },
  ];

  const cfg = {
    title: "Projects & Consulting",
    lede:
      "Fixed-scope IT projects with clear timelines, acceptance checks, and clean handovers—so upgrades happen without business disruption.",
    hero: "/images/services/projects-hero.svg",

    // ✅ no inflated numbers
    stats: [
      { kpi: "Fixed-scope", label: "Clear deliverables" },
      { kpi: "Runbooks", label: "Step-by-step execution" },
      { kpi: "Change windows", label: "Evenings/weekends" },
      { kpi: "Handover", label: "As-built documentation" },
    ],

    sections: [
      {
        heading: "Production-ready design and planning",
        body:
          "We plan projects the way they’ll be operated in real life: scope, dependencies, risks, communications, and acceptance criteria. You get a runbook and rollback plan—so stakeholders know what “done” means and what happens if anything goes sideways.",
        image: "/images/illus/network.svg",
        imageSide: "right",
      },
      {
        heading: "Migrations and decommissions done safely",
        body:
          "We execute migrations and retire legacy systems with a safety-first approach: backups and validation, staged cutovers where possible, and documented checkpoints. The goal is simpler infrastructure that’s easier to support and less risky long-term.",
        image: "/images/illus/servers.svg",
        imageSide: "left",
      },
      {
        heading: "Clean handover (or we can run it for you)",
        body:
          "If you have internal IT, we hand over with as-built docs and admin notes. If you want ongoing support, we can transition the project outcome into managed service with monitoring, patching, and helpdesk coverage.",
        image: "/images/illus/screens-2.svg",
        imageSide: "right",
      },
    ],

    features: [
      { icon: "Wrench", title: "Network Refresh", desc: "Switches, Wi-Fi, VLANs/segmentation, and standard configs." },
      { icon: "Server", title: "Server Refresh / Decommission", desc: "Migrate workloads and retire legacy safely." },
      { icon: "Cloud", title: "Email / Tenant Moves", desc: "Cutovers, rebrands, and mailbox/data migrations." },
      { icon: "Cpu", title: "Directory Cleanup", desc: "AD/Entra cleanup, OU/GPO refactor, access hardening." },
      { icon: "BarChart3", title: "Cost Optimization", desc: "Licensing cleanup and vendor consolidation." },
      { icon: "Sparkles", title: "Automation", desc: "Scripting and lightweight workflow automation." },
    ],

    steps: [
      { title: "Discovery", desc: "Workshops + current-state capture.", outputs: ["Requirements", "Risks & dependencies"] },
      { title: "Plan", desc: "Design + cutover + rollback plan.", outputs: ["Runbook", "Backout plan"] },
      { title: "Implement", desc: "Execution with change windows.", outputs: ["Acceptance checks", "As-built docs"] },
      { title: "Handover", desc: "Docs + admin notes + support path.", outputs: ["Handover pack", "Warranty window"] },
    ],

    timeline: [
      { when: "Week 1", title: "Discovery", desc: "Scope, inventory, risks" },
      { when: "Weeks 2–3", title: "Design & plan", desc: "Architecture, runbook, rollback" },
      { when: "Weeks 4–6", title: "Execution", desc: "Cutovers and validation" },
      { when: "Week 7", title: "Handover", desc: "Docs, admin notes, support path" },
    ],

    // ✅ no fake names
    testimonials: [
      {
        quote: "The project plan was clear and the cutover went smoothly with minimal disruption.",
        author: "Operations Lead",
        role: "SMB (Lehigh Valley)",
        avatar: "/images/avatars/a3.svg",
        rating: 5,
      },
      {
        quote: "Runbooks and handover docs made it easy for our team to operate everything after delivery.",
        author: "IT Coordinator",
        role: "Local business",
        avatar: "/images/avatars/a4.svg",
        rating: 5,
      },
    ],

    faqs,
  };

  // ✅ JSON-LD (aligned IDs)
  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${baseUrl}/services` },
      { "@type": "ListItem", position: 3, name: "Projects & Consulting", item: canonical },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonical}#service`,
    name: "IT Projects & Consulting",
    serviceType: "IT Projects & Consulting",
    description:
      "Fixed-scope IT projects including audits, office moves, network refresh, migrations, directory cleanup, decommissions, and automation — delivered with runbooks, rollback plans, acceptance checks, and clean handover documentation.",
    url: canonical,
  provider: { "@id": BUSINESS_ID },
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
    name: `Projects & Consulting | ${brand}`,
    url: canonical,
    description:
      "Fixed-scope audits, moves, network refresh, directory cleanup, migrations, and decommissions — delivered with runbooks, rollback plans, acceptance checks, and clean handovers.",
    isPartOf: { "@type": "WebSite", "@id": `${baseUrl}/#website` },
    publisher: { "@id": BUSINESS_ID },
    breadcrumb: { "@id": `${canonical}#breadcrumb` },
    mainEntity: { "@id": `${canonical}#service` },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${canonical}#faq`,
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
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
