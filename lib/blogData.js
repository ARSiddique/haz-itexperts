// /lib/blogData.js
export const POSTS = [
  {
    slug: "sme-managed-it-starter-pack",
    title: "The SME Managed IT Starter Pack (2025)",
    excerpt:
      "Kicks off your environment with SLAs, patching, MDM baselines, and measurable KPIs — without blowing the budget.",
    date: "2025-01-18",
    minutes: 6,
    cover: "/media/dashboard.jpg",
    category: "Managed IT",
    tags: ["SLAs", "MDM", "KPIs"],
    author: { name: "Hazi", role: "Founder & vCIO", avatar: "/media/avatar-hazi.jpg" },
    body: `
### Why a starter pack?
Most SMEs get stuck in reactive IT. Our starter pack flips the model:
- Baseline hardening for endpoints
- EDR/XDR coverage + email security
- Patch & update automation
- Monthly KPIs leadership actually reads

### What you'll get (week one)
- Device inventory + identity hygiene
- MDM baselines for Windows/macOS/iOS/Android
- Backups validated
- Helpdesk workflows w/ SLAs

Ready for a no-pressure assessment? Hit **Get Quote** — we’ll map gaps and next steps.
    `,
    featured: true,
  },
  {
    slug: "xdr-vs-edr-for-pakistan-smes",
    title: "XDR vs EDR for Pakistan’s SMEs — what actually matters",
    excerpt:
      "Don’t chase acronyms. Focus on coverage, response workflows, and reporting your board understands.",
    date: "2025-01-04",
    minutes: 5,
    cover: "/media/hero-1.jpg",
    category: "Security",
    tags: ["EDR/XDR", "Incident Response"],
    author: { name: "Ahsan", role: "Security Lead", avatar: "/media/avatar-ahsan.jpg" },
    body: `
### TL;DR
- EDR catches endpoint threats, XDR extends telemetry (email, identities, network).
- Pick the stack your team can actually **operate**.
- Pair with Playbooks + SLAs, not just licenses.

### Buying checklist
- Coverage rate (aim 99.9% managed endpoints)
- MFA everywhere (esp. email & admin)
- Alert fatigue controls
- Weekly review with your vCIO
    `,
  },
  {
    slug: "m365-hardening-checklist",
    title: "Microsoft 365 hardening checklist you can run this week",
    excerpt:
      "Practical settings for SMEs: MFA, conditional access, safe links/attachments, and backup/restore you’ve tested.",
    date: "2024-12-22",
    minutes: 7,
    cover: "/media/firewall.jpg",
    category: "Cloud",
    tags: ["Microsoft 365", "Identity"],
    author: { name: "Sarah", role: "Cloud Engineer", avatar: "/media/avatar-sarah.jpg" },
    body: `
1) Enforce MFA/SSO for all  
2) Block legacy auth  
3) CA policies for risky sign-ins  
4) Safe Links & Safe Attachments  
5) Backup M365 (mail/OneDrive/SharePoint)  
6) Run a restore test monthly
    `,
  },
  {
    slug: "network-refresh-zero-downtime",
    title: "Network refresh with near zero downtime — our playbook",
    excerpt:
      "How we stage, label, and cutover switches/APs so your users barely notice.",
    date: "2024-12-10",
    minutes: 4,
    cover: "/media/cabling.jpg",
    category: "Projects",
    tags: ["Wi-Fi", "Switching", "Cutover"],
    author: { name: "Bilal", role: "Projects Lead", avatar: "/media/avatar-bilal.jpg" },
    body: `
- Validate configs in a lab
- Pre-label patching
- Blue-green cutovers with rollback
- Post-cutover heatmaps & KPIs
    `,
  },
  {
    slug: "kpis-that-leadership-reads",
    title: "IT KPIs leadership actually reads",
    excerpt:
      "Stop the noise. These 6 metrics track risk, reliability, and progress.",
    date: "2024-11-28",
    minutes: 5,
    cover: "/media/datacenter.jpg",
    category: "Strategy",
    tags: ["KPIs", "Reporting"],
    author: { name: "Hazi", role: "Founder & vCIO", avatar: "/media/avatar-hazi.jpg" },
    body: `
- Tickets by priority (SLA hit rate)
- Patch compliance trend
- Security coverage (EDR/MFA/Backup)
- Backup restore tests
- Asset drift (baseline → current)
- Top risks & next actions
    `,
  },
];
