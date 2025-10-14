import ServiceClientPage from "../_components/ServiceClientPage";

export const metadata = {
  title: "Cybersecurity — HaziTExperts",
  description: "CIS/NIST aligned: zero-trust identity, EDR/XDR, phishing defense, immutable backups.",
};

export default function Page() {
  const cfg = {
    title: "Cybersecurity",
    lede: "Identity-first controls, modern endpoint defense, phishing resistance, aur recoverability — sab kuch ek measured program ke through.",
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
        body: "MFA, Conditional Access, device compliance, aur least-privilege ki wajah se compromised password se breach tak ka safar yahin khatam ho jata hai. Privileged access ko JIT/JEA se gated rakhte hain.",
        image: "/images/illus/identity.svg",
        imageSide: "right"
      },
      {
        heading: "Detect fast, respond faster",
        body: "EDR/XDR detections par curated playbooks: isolate, investigate, rollback. Email security ke sath monthly phishing drills run karte hain jisse user behavior measurable rehta hai.",
        image: "/images/illus/shield.svg",
        imageSide: "left"
      }
    ],
    problems: [
      "Inconsistent MFA; privileged access unmanaged",
      "Phishing/ransomware attempts increasing",
      "Backups not immutable/tested",
      "Policies & training outdated",
    ],
    outcomes: [
      "Strong MFA/CA across users & admins",
      "Rapid endpoint isolation & response",
      "Immutable backups with test restores",
      "Awareness program with visible drop in clicks",
    ],
    features: [
      { icon: "Shield", title: "EDR/XDR", desc: "Managed detections, isolation & response." },
      { icon: "KeySquare", title: "Identity & MFA", desc: "CA policies, PAM, JIT/JEA." },
      { icon: "AlertTriangle", title: "Vulnerability Mgmt", desc: "Scans + remediation pipelines." },
      { icon: "Fingerprint", title: "Email & Phishing", desc: "Advanced filtering + simulations." },
      { icon: "Database", title: "Backup/Immutable", desc: "Air-gapped copy + quarterly restores." },
      { icon: "BookOpen", title: "Policies & Training", desc: "Practical controls; mapped to CIS/NIST." },
    ],
    gallery: ["/images/illus/screens-2.svg","/images/illus/screens-3.svg","/images/illus/screens-1.svg"],
    steps: [
      { title: "Baseline", desc: "Gap analysis vs CIS/NIST.", outputs: ["Scorecard", "Prioritized backlog"] },
      { title: "Implement", desc: "MFA/CA, EDR, email security, backups.", outputs: ["Policies", "EDR rollout"] },
      { title: "Operate", desc: "Alert tuning, vuln mgmt, phishing drills.", outputs: ["Monthly posture report"] },
      { title: "Audit", desc: "Tabletops & evidence refresh.", outputs: ["IR plan", "Evidence pack"] },
    ],
    deliverables: ["Security scorecard", "IR playbook", "CA/MFA policies", "Vuln report", "Awareness results"],
    tooling: ["EDR/XDR", "Email security", "SIEM/Logs", "M365/Entra", "Backup (immutable)"],
    timeline: [
      { when: "Weeks 1–2", title: "Baseline & quick wins", desc: "MFA/CA rollout" },
      { when: "Weeks 3–6", title: "Deploy & tune", desc: "EDR, email, backups" },
      { when: "Quarterly", title: "Tabletop & audit", desc: "Evidence refresh" },
    ],
    testimonials: [
      { quote: "CA/MFA ke baad breach attempts near zero.", author: "M. Raza", role: "CFO", avatar: "/images/avatars/a3.svg", rating: 5 },
      { quote: "Phishing drills ne team ko kaafi disciplined bana diya.", author: "H. Noor", role: "Ops Head", avatar: "/images/avatars/a4.svg", rating: 5 }
    ],
  };
  return <ServiceClientPage cfg={cfg} />;
}
