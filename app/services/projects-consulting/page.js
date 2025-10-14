import ServiceClientPage from "../_components/ServiceClientPage";

export const metadata = {
  title: "Projects & Consulting — HaziTExperts",
  description: "Audits, office moves, network refresh, directory cleanup, decommissions — fixed scope & clean handovers.",
};

export default function Page() {
  const cfg = {
    title: "Projects & Consulting",
    lede: "Fixed-scope projects with clear timelines, acceptance tests, aur zero-stress handovers — weekend change windows included.",
    hero: "/images/services/projects-hero.svg",
    stats: [
      { kpi: "200+", label: "Projects delivered" },
      { kpi: "95%", label: "On-time/budget" },
      { kpi: "24/7", label: "Change windows" },
      { kpi: "Zero-touch", label: "Handover" },
    ],
    sections: [
      {
        heading: "Designs that survive production",
        body: "Hum slide-ware nahi dete: runbooks, rollback, aur acceptance tests ke saath designs deliver hote hain. Stakeholder comms se sab ko pata hota hai kab kya ho raha hai.",
        image: "/images/illus/network.svg",
        imageSide: "right"
      },
      {
        heading: "From legacy to lean",
        body: "Decommission projects me data safety pe obsessive focus — backups validate, and ‘what-if’ scenarios rehearsed. Result: sasta, simple, supportable infra.",
        image: "/images/illus/servers.svg",
        imageSide: "left"
      }
    ],
    features: [
      { icon: "Wrench", title: "Network Refresh", desc: "Switching/Wi-Fi redesign & segmentation." },
      { icon: "Server", title: "Server Decommission", desc: "Migrate & retire with backup checkpoints." },
      { icon: "Cloud", title: "Email/Domain Moves", desc: "Cutovers, tenant-to-tenant, rebrands." },
      { icon: "Cpu", title: "Directory Cleanup", desc: "OU design, GPO refactor, identity hardening." },
      { icon: "BarChart3", title: "Cost Optimization", desc: "License & vendor consolidation." },
      { icon: "Sparkles", title: "Automation", desc: "Scripting & low-code workflows." },
    ],
    steps: [
      { title: "Discovery", desc: "Workshops & current-state docs.", outputs: ["Requirements & risks", "Options"] },
      { title: "Plan", desc: "Design + dependencies + rollback.", outputs: ["Cutover schedule", "Backout plan"] },
      { title: "Implement", desc: "Change windows & comms.", outputs: ["As-built", "Acceptance tests"] },
      { title: "Handover", desc: "Docs, training, warranty.", outputs: ["Admin training", "Support path"] },
    ],
    timeline: [
      { when: "Week 1", title: "Discovery", desc: "Scope & risks" },
      { when: "Weeks 2–3", title: "Design", desc: "Architecture & plan" },
      { when: "Weeks 4–6", title: "Execution", desc: "Change windows" },
      { when: "Week 7", title: "Handover", desc: "Docs & training" },
    ],
    testimonials: [
      { quote: "Weekend move, Monday ko sab up — love it.", author: "Z. Farooq", role: "GM, Logistics", avatar: "/images/avatars/a3.svg", rating: 5 },
      { quote: "Rollback plan ne stakeholders ko confidence dia.", author: "A. Junaid", role: "CIO", avatar: "/images/avatars/a4.svg", rating: 5 }
    ],
  };
  return <ServiceClientPage cfg={cfg} />;
}
