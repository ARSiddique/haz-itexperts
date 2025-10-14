import ServiceClientPage from "../_components/ServiceClientPage";

export const metadata = {
  title: "Managed IT — HaziTExperts",
  description: "Proactive helpdesk, patching, monitoring & reporting with clear SLAs.",
};

export default function Page() {
  const cfg = {
    title: "Managed IT",
    lede: "Hum aapka day-to-day IT chalatay hain: tickets, patching, monitoring, security baselines — taake aapki team ka focus business par rahe.",
    hero: "/images/services/managed-hero.svg",
    stats: [
      { kpi: "98%", label: "CSAT" },
      { kpi: "≤15m", label: "P1 response" },
      { kpi: "99.5%", label: "Patch compliance" },
      { kpi: "30 days", label: "Stabilization" },
    ],
    sections: [
      {
        heading: "Ticketing that actually solves problems",
        body:
          "Hamari helpdesk workflows first-contact resolution par focus karti hain. Email/chat/portal se ticket aaye — triage SOPs se priority set hoti hai, aur automation repetitive tasks ko khud handle kar leti hai. Aapko monthly CSAT aur SLA dashboards miltay hain jisse leadership ko real picture nazar aati hai.",
        image: "/images/illus/helpdesk.svg",
        imageSide: "right"
      },
      {
        heading: "Standardized endpoints = fewer surprises",
        body:
          "Windows/macOS devices par hardened baselines, auto patching, app catalogs aur EDR — is se drift kam hota hai, aur incidents ka blast radius control me rehta hai. Backup checks aur test restores ki wajah se recovery predictable hoti hai.",
        image: "/images/illus/devices.svg",
        imageSide: "left"
      }
    ],
    problems: [
      "Tickets bounce between people; no ownership or SLA",
      "Endpoints drift — missing patches, outdated apps",
      "On/Offboarding slow; access errors",
      "Leadership lacks KPIs and risk visibility",
    ],
    outcomes: [
      "Clear SLAs with first-contact resolution",
      "Hardened baselines & predictable patching",
      "Checklist-driven hires/leavers same-day",
      "Exec-ready KPIs; audits become easy",
    ],
    features: [
      { icon: "Wrench", title: "Helpdesk", desc: "Omni-channel support with triage & CSAT." },
      { icon: "Server", title: "Patching & Monitoring", desc: "Automated updates + health checks." },
      { icon: "Lock", title: "Baseline Security", desc: "EDR, encryption, firewall, MFA guidance." },
      { icon: "Database", title: "Backup Checks", desc: "Daily verification + quarterly restores." },
      { icon: "Users", title: "Lifecycle", desc: "Fast, compliant on/offboarding." },
      { icon: "LineChart", title: "Reporting", desc: "Ticket, asset, patch & risk KPIs." },
    ],
    gallery: ["/images/illus/screens-1.svg","/images/illus/screens-2.svg","/images/illus/screens-3.svg"],
    steps: [
      { title: "Assess", desc: "Users, devices, identity, risks.", outputs: ["Access & tooling", "Initial risk register"] },
      { title: "Stabilize", desc: "Patching, EDR, backup/DR, baselines.", outputs: ["Patch rings", "EDR policies"] },
      { title: "Optimize", desc: "SOPs, automation, self-service.", outputs: ["KB + runbooks", "Automation backlog"] },
      { title: "Grow", desc: "QBRs, roadmap, budget planning.", outputs: ["QBR deck", "OKRs"] },
    ],
    deliverables: ["SOPs", "Asset inventory", "Monthly KPI pack", "Backup & security status", "Roadmap & budget view"],
    tooling: ["RMM", "EDR/XDR", "Intune/Jamf", "M365/Workspace", "SharePoint/Drive", "Ticketing/CSAT"],
    timeline: [
      { when: "Week 1", title: "Access & discovery", desc: "Tools connected, quick wins" },
      { when: "Weeks 2–3", title: "Stabilization sprint", desc: "Patch/EDR/Baselines + backup" },
      { when: "Week 4", title: "KPI + roadmap", desc: "Leadership metrics & plan" },
    ],
    compactTimeline: true,
    testimonials: [
      { quote: "Onboarding ab hours me hota hai, days me nahi.", author: "S. Malik", role: "HR Lead", avatar: "/images/avatars/a1.svg", rating: 5 },
      { quote: "Finally SLAs aur visibility hai — chaos khatam.", author: "A. Khan", role: "COO", avatar: "/images/avatars/a2.svg", rating: 5 }
    ],
  };
  return <ServiceClientPage cfg={cfg} />;
}
