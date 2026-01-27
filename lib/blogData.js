// lib/blogData.js
// ─────────────────────────────────────────────────────────────
// English-only copy, US SMB focus, image paths in /public/media
// ─────────────────────────────────────────────────────────────
export const POSTS = [
  // ✅ NEW (Long, 2026)
  {
    slug: "managed-it-services-smb-2026-playbook",
    title: "Managed IT Services for SMBs in 2026: What to Expect (and What to Demand)",
    excerpt:
      "A practical, no-fluff checklist for SMB owners: SLAs, patching, security baselines, backups, Microsoft 365, and reporting that actually reduces downtime.",
    date: "2026-01-27",
    minutes: 9,
    cover: "/media/managed-it-helpdesk.jpeg", // add this image in /public/media
    category: "Managed IT",
    tags: ["Managed IT", "Helpdesk", "SLAs", "Patch Management", "Backups"],
    author: { name: "Hazi", role: "Founder & vCIO", avatar: "/media/avatar-hazi.jpg" },
    featured: true,
    body: `
### Why “Managed IT” matters more in 2026
If you’re running an SMB, IT is no longer just “fixing computers.” In 2026, IT is a business continuity system. Your email, files, accounting apps, cloud tools, and customer data are all connected — and one weak link can create downtime, lost revenue, or a security incident.

Primary keyword: managed IT services for SMBs  
Secondary keywords: IT support for small business, helpdesk support, patch management, backup and disaster recovery, Microsoft 365 support

### What you should demand from a Managed IT provider
A provider is only useful if it’s measurable. Here’s what you should demand:
- Clear response times (SLAs)
- Proactive patching and updates (not “we’ll do it later”)
- Security baselines (MFA, endpoint protection, email security)
- Backup + restore testing (not just “backup exists”)
- Monthly reporting that shows progress and risk
- Simple escalation path: who owns the problem end-to-end

Start here for service context: /services  
If you want a quick gap-check: /contact?type=assessment&source=blog

### The non-negotiables: SLAs + helpdesk that actually works
Helpdesk is your frontline. A good helpdesk means:
- Ticket intake is easy (email/chat/portal)
- Tickets are categorized (Priority 1, 2, 3)
- You know the response times up-front
- There’s ownership (no “we’re waiting on someone”)

A simple baseline SLA structure:
- Priority 1 (down): response in 15–30 mins
- Priority 2 (major impact): response in 1–2 hours
- Priority 3 (minor): same day response

### Patch management: the easiest “risk reduction” win
Most breaches and outages happen because systems weren’t updated. Patch management in 2026 should cover:
- Windows/macOS updates
- Third-party apps (browsers, PDF tools, remote apps)
- Router/switch/firewall firmware (network layer)
- Microsoft 365 identity settings and risky sign-in controls

If patching is “manual,” you’re paying for risk. It must be automated + tracked.

### Microsoft 365: the most common weak spot
Email is the #1 attack surface for SMBs. M365 support should include:
- MFA enforced for every mailbox (no exceptions)
- Blocking legacy authentication
- Safe Links / Safe Attachments policies
- Conditional Access (risk-based sign-ins)
- Backup for M365 mail + OneDrive + SharePoint
- Monthly restore test

If you want cloud hardening: /services/cloud-workspace

### Backups + disaster recovery: backups are useless if you can’t restore
A real backup plan has three layers:
- Local + cloud backups (3-2-1 concept)
- Defined recovery objectives (RPO/RTO)
- Tested restores (monthly or quarterly)

Ask your IT provider:
- When was the last successful restore test?
- How long would it take to restore a server/file share?
- What happens if ransomware encrypts everything?

If you want this fully managed: /services/managed-it

### Cybersecurity-first managed IT (baseline)
A modern “minimum security baseline” looks like:
- MFA for email + admin accounts
- Endpoint protection (EDR/XDR)
- Password manager policies
- Device encryption (BitLocker/FileVault)
- Central device management (MDM)
- Web filtering / DNS protection
- Monitoring + alerting + response workflows

If security is priority: /services/cybersecurity

### Reporting: what leadership should see (not noise)
A good provider gives a short monthly report:
- SLA hit rate (how fast you were supported)
- Patch compliance trend (are devices updated?)
- Security coverage (EDR/MFA/backup coverage)
- Backup restore test results
- Top risks + next recommended actions

This keeps IT aligned with business goals, not random tickets.

### How to choose the right provider (quick checklist)
Use this shortlist:
- Do they offer clear SLAs?
- Can they explain their security baseline in plain English?
- Do they test restores?
- Do they provide reporting monthly?
- Do they have a vCIO strategy option?
- Do they support your area?

We serve Lehigh Valley areas like Allentown, Macungie, and Emmaus:
- /areas
- /locations/allentown-pa

### Next step: free assessment
If you’re unsure where you stand, the fastest move is a 20-minute gap-check. We’ll outline:
- biggest risks (security + downtime)
- quick wins (patching/MFA/backups)
- a practical roadmap

Book it: /contact?type=assessment&source=blog-managed-it-2026
    `,
  },

  // ✅ NEW (Long, 2026)
  {
    slug: "microsoft-365-security-checklist-2026",
    title: "Microsoft 365 Security Checklist (2026): Fix These 12 Settings This Week",
    excerpt:
      "A practical M365 checklist for SMBs: MFA, conditional access, Safe Links, audit logs, backup, and restore testing — fast improvements without chaos.",
    date: "2026-01-27",
    minutes: 10,
    cover: "/media/m365-security.jpg", // add this image in /public/media
    category: "Cloud",
    tags: ["Microsoft 365", "MFA", "Conditional Access", "Email Security", "Backup"],
    author: { name: "Sarah", role: "Cloud Engineer", avatar: "/media/avatar-sarah.jpg" },
    body: `
### Why Microsoft 365 security is urgent in 2026
For SMBs, Microsoft 365 is the core of business operations: email, files, Teams, SharePoint, OneDrive, and identity. That also makes it the #1 target for phishing, account takeover, and ransomware.

Primary keyword: Microsoft 365 security checklist  
Secondary keywords: MFA for Microsoft 365, conditional access policy, Safe Links Safe Attachments, M365 backup, email security for small business

If you need help implementing this fast: /services/cloud-workspace  
Book free assessment: /contact?type=assessment&source=blog-m365

### The goal (simple)
- Stop account takeover
- Reduce phishing risk
- Make recovery easy (restore files/email fast)
- Keep access clean (who can access what)

### 12 settings to fix this week
1) Enforce MFA for all users  
MFA must be required for everyone, especially admin accounts. “Most users” is not enough.

2) Block legacy authentication  
Legacy protocols can bypass modern protections. Disable legacy auth to remove a common gap.

3) Protect admin accounts  
Use separate admin accounts. Apply stricter rules: MFA + risk controls + limited access.

4) Add Conditional Access (CA) for risky sign-ins  
At minimum: block or challenge sign-ins that look suspicious (impossible travel, new devices, risky locations).

5) Enable Safe Links  
Safe Links reduces “click-to-compromise” by scanning links.

6) Enable Safe Attachments  
Safe Attachments scans files and reduces malicious payload delivery.

7) Review and block external forwarding  
Attackers love creating hidden mailbox forwarding rules. Block external forwarding by default, allow exceptions only when required.

8) Turn on audit logs (and keep them on)
If something happens, logs matter. Without logs, you’re guessing.

9) Strengthen password policy + add password manager guidance
Push employees to use a password manager and stop password reuse across sites.

10) Lock down OneDrive/SharePoint sharing
Set sharing to “restricted.” Require sign-in. Reduce anonymous link sharing.

11) Add device compliance rules (optional but strong)
If a device is unmanaged, limit access to sensitive areas.

12) Backup Microsoft 365 + test a restore monthly
Microsoft 365 protects the platform, not your human mistakes or ransomware-style deletion. Backup:
- Mailboxes
- OneDrive
- SharePoint
Then test restores monthly.

### Quick self-audit (90 seconds)
Ask:
- Would we notice if an account got taken over today?
- Can we lock down a compromised user in 5 minutes?
- Can we restore a deleted SharePoint folder quickly?

If the answer is “no,” these settings are urgent.

### Most common SMB mistakes
- MFA is optional
- Conditional Access not used
- External forwarding enabled
- No backup, or no restore testing
- No monthly review/reporting

### Best internal linking for SEO (do this inside the blog)
Add links to:
- Cloud workspace: /services/cloud-workspace
- Cybersecurity: /services/cybersecurity
- Contact: /contact?type=assessment

Also add 1–2 links from your location pages back to /blog.

### Next step
If you want us to implement these settings quickly, we can do it with minimal disruption.

Book free assessment: /contact?type=assessment&source=blog-m365-2026
    `,
  },

  // ✅ Updated (2026 title/date, kept original idea)
  {
    slug: "smb-managed-it-starter-pack",
    title: "The SMB Managed IT Starter Pack",
    excerpt:
      "Kick off your environment with SLAs, patching, MDM baselines, and measurable KPIs — without blowing the budget.",
    date: "2026-01-18",
    minutes: 6,
    cover: "/media/dashboard.jpg",
    category: "Managed IT",
    tags: ["SLAs", "MDM", "KPIs"],
    author: { name: "Hazi", role: "Founder & vCIO", avatar: "/media/avatar-hazi.jpg" },
    body: `
### Why a starter pack?
Most SMBs get stuck in reactive IT. Our starter pack flips the model:
- Baseline hardening for endpoints
- EDR/XDR coverage + email security
- Patch & update automation
- Monthly KPIs leadership actually reads

### What you'll get (week one)
- Device inventory + identity hygiene
- MDM baselines for Windows/macOS/iOS/Android
- Backups validated
- Helpdesk workflows with SLAs

Want a quick gap-check? Book a free assessment: /contact?type=assessment
    `,
  },

  // ✅ Updated (date set to 2026)
  {
    slug: "xdr-vs-edr-what-matters",
    title: "XDR vs EDR for SMBs: What Actually Matters",
    excerpt:
      "Don't chase acronyms. Focus on coverage, response workflows, and reporting your leadership understands.",
    date: "2026-01-04",
    minutes: 5,
    cover: "/media/hero-1.jpg",
    category: "Security",
    tags: ["EDR/XDR", "Incident Response"],
    author: { name: "Ahsan", role: "Security Lead", avatar: "/media/avatar-ahsan.jpg" },
    body: `
### TL;DR
- EDR catches endpoint threats, XDR extends telemetry (email, identities, network).
- Pick the stack your team can actually operate.
- Pair with playbooks + SLAs, not just licenses.

### Buying checklist
- Coverage rate (aim 99.9% managed endpoints)
- MFA everywhere (especially email & admin)
- Alert fatigue controls
- Weekly review with your vCIO

If you want security help: /services/cybersecurity
    `,
  },

  // ✅ Updated (date set to 2026, kept concise)
  {
    slug: "m365-hardening-checklist",
    title: "Microsoft 365 Hardening Checklist You Can Run This Week",
    excerpt:
      "Practical settings for SMBs: MFA, conditional access, safe links/attachments, and backup/restore you've tested.",
    date: "2026-01-22",
    minutes: 7,
    cover: "/media/firewall.jpg",
    category: "Cloud",
    tags: ["Microsoft 365", "Identity"],
    author: { name: "Sarah", role: "Cloud Engineer", avatar: "/media/avatar-sarah.jpg" },
    body: `
### Quick checklist
1) Enforce MFA/SSO for all  
2) Block legacy auth  
3) CA policies for risky sign-ins  
4) Safe Links & Safe Attachments  
5) Backup M365 (mail/OneDrive/SharePoint)  
6) Run a restore test monthly

Need help implementing? /services/cloud-workspace
    `,
  },

  {
    slug: "network-refresh-zero-downtime",
    title: "Network Refresh With Near-Zero Downtime: Our Playbook",
    excerpt:
      "How we stage, label, and cut over switches/APs so your users barely notice.",
    date: "2026-01-10",
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

For projects help: /services/projects-consulting
    `,
  },

  {
    slug: "kpis-that-leadership-reads",
    title: "IT KPIs Leadership Actually Reads",
    excerpt:
      "Stop the noise. These six metrics track risk, reliability, and progress.",
    date: "2026-01-02",
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

If you want a vCIO-style plan: /services/vcio-strategy
    `,
  },
];

