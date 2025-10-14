import ServiceClientPage from "../_components/ServiceClientPage";

export const metadata = {
  title: "Device Management — HaziTExperts",
  description: "Zero-touch enrollment, hardening, patch & app mgmt, compliance and lifecycle.",
};

export default function Page() {
  const cfg = {
    title: "Device Management",
    lede: "Windows, macOS, iOS, Android — sab ke liye baselines, patching, app catalogs, aur compliance dashboards.",
    hero: "/images/services/device-hero.svg",
    stats: [
      { kpi: "100%", label: "Disk encryption" },
      { kpi: "≤7d", label: "Critical patch SLA" },
      { kpi: "BYOD", label: "App protection" },
      { kpi: "Quarterly", label: "Compliance review" },
    ],
    sections: [
      {
        heading: "Zero-touch that delights",
        body: "Autopilot/Jamf/ABM se devices box se nikalte hi policy-compliant ban jate hain. HR/IT ke beech ka handoff clear checklists se smooth rehta hai.",
        image: "/images/illus/enroll.svg",
        imageSide: "right"
      },
      {
        heading: "Compliance you can trust",
        body: "Encryption, firewall, patch levels — sab dashboards me. Exceptions documented, time-bound aur review me rehte hain.",
        image: "/images/illus/compliance.svg",
        imageSide: "left"
      }
    ],
    features: [
      { icon: "Laptop", title: "MDM Enrollment", desc: "Autopilot/Jamf/ABM/Android Enterprise." },
      { icon: "Lock", title: "Hardening", desc: "Encryption, firewall, allowlists, compliance rules." },
      { icon: "Wrench", title: "Patch & Apps", desc: "Automated OS/app updates & catalogs." },
      { icon: "AlertTriangle", title: "Lost/Stolen", desc: "Remote lock/wipe & chain-of-custody." },
      { icon: "LineChart", title: "Compliance Reports", desc: "Drift, encryption, patch levels." },
      { icon: "Users", title: "Lifecycle", desc: "Procure → assign → replace → dispose." },
    ],
    timeline: [
      { when: "Week 1", title: "Baselines", desc: "Profiles & policies" },
      { when: "Week 2", title: "Enrollment", desc: "Zero-touch & assets" },
      { when: "Weeks 3–4", title: "Operate", desc: "Patch/app cadence" },
    ],
    testimonials: [
      { quote: "Compliance 98%+ — audits painless.", author: "H. Javed", role: "CISO", avatar: "/images/avatars/a1.svg", rating: 5 },
      { quote: "BYOD bhi secure aur frictionless.", author: "N. Fatima", role: "IT Lead", avatar: "/images/avatars/a2.svg", rating: 5 }
    ],
  };
  return <ServiceClientPage cfg={cfg} />;
}
