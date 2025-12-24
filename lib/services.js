// lib/services.js
// ✅ Single source of truth for service internal linking

export const SERVICES = [
  {
    key: "managed",
    title: "Managed IT Services",
    href: "/services/managed-it",
    icon: "Shield",
    blurb: "Helpdesk, monitoring, patching, and reporting with clear SLAs.",
    tags: ["Helpdesk", "Patching", "Monitoring"],
  },
  {
    key: "security",
    title: "Cybersecurity",
    href: "/services/cybersecurity",
    icon: "Lock",
    blurb: "EDR/XDR, identity hardening, email security, and backup/DR.",
    tags: ["EDR/XDR", "MFA", "Backup/DR"],
  },
  {
    key: "cloud",
    title: "Cloud & Microsoft 365",
    href: "/services/cloud-workspace",
    icon: "Cloud",
    blurb: "Migrations, tenant security baselines, and cost optimization.",
    tags: ["M365", "Migrations", "Governance"],
  },
  {
    key: "projects",
    title: "IT Projects & Consulting",
    href: "/services/projects-consulting",
    icon: "Wrench",
    blurb: "Audits, network refresh, office moves, and modernization projects.",
    tags: ["Audits", "Migrations", "Network"],
  },
  {
    key: "mdm",
    title: "Device Management (MDM)",
    href: "/services/device-management",
    icon: "Laptop",
    blurb: "Zero-touch enrollment, hardening, patch & app management.",
    tags: ["Autopilot", "Jamf", "Compliance"],
  },
  {
    key: "vcio",
    title: "vCIO / IT Strategy",
    href: "/services/vcio-strategy",
    icon: "LineChart",
    blurb: "Roadmaps, budgets, vendor consolidation, and KPI reporting.",
    tags: ["Roadmaps", "Budgets", "KPIs"],
  },
];

// SEO-friendly internal linking suggestions
export const RELATED = {
  managed: ["security", "cloud", "mdm", "vcio"],
  security: ["managed", "cloud", "projects", "mdm"],
  cloud: ["managed", "security", "mdm", "projects"],
  projects: ["managed", "cloud", "security", "vcio"],
  mdm: ["managed", "security", "cloud", "vcio"],
  vcio: ["managed", "security", "cloud", "projects"],
};
