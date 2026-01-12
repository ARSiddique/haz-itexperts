// lib/locations.js
export const LOCATIONS = [
  {
    slug: "allentown-pa",
    city: "Allentown",
    state: "PA",
    title: "Managed IT Services in Allentown, PA",
    lede:
      "Fast, friendly managed IT and cybersecurity for small and mid-sized businesses in Allentown. Helpdesk, monitoring, patching, identity security, and backup/DR — with clear SLAs.",
    nearby: ["Macungie", "Emmaus"],
    faqs: [
      {
        q: "Do you offer managed IT services in Allentown for small businesses?",
        a: "Yes — we support Allentown small and mid-sized businesses with helpdesk, proactive monitoring, patching, and security-first IT management.",
      },
      {
        q: "What’s included in your cybersecurity-first IT support?",
        a: "We focus on MFA/identity hardening, endpoint protection, patching, monitoring, and practical security controls to reduce risk and downtime.",
      },
      {
        q: "Do you handle Microsoft 365 / email issues and security?",
        a: "Yes — we help with Microsoft 365 setup, troubleshooting, mailbox/security hardening, and email protection best practices.",
      },
      {
        q: "Can you set up backups and disaster recovery?",
        a: "Absolutely — we implement backup and disaster recovery with test restores so you can recover quickly if something goes wrong.",
      },
      {
        q: "How do I get started?",
        a: "Book a free 20-minute IT assessment and we’ll share a clear action plan and next steps.",
      },
    ],
  },
  {
    slug: "macungie-pa",
    city: "Macungie",
    state: "PA",
    title: "Managed IT Services in Macungie, PA",
    lede:
      "Reliable managed IT and security for growing teams in Macungie. Proactive support, hardened baselines, and predictable onboarding — without the chaos.",
    nearby: ["Allentown", "Emmaus"],
    faqs: [
      {
        q: "Do you support businesses in Macungie remotely?",
        a: "Yes — we deliver fast remote support for Macungie businesses, with proactive monitoring and clear ownership.",
      },
      {
        q: "Can you help reduce downtime and slow PCs?",
        a: "Yes — we fix performance issues by standardizing devices, patching consistently, and monitoring systems to catch problems early.",
      },
      {
        q: "Do you offer backups and ransomware-ready recovery?",
        a: "Yes — we set up secure backups and recovery steps designed for ransomware scenarios and real-world outages.",
      },
    ],
  },
  {
    slug: "emmaus-pa",
    city: "Emmaus",
    state: "PA",
    title: "Managed IT Services in Emmaus, PA",
    lede:
      "Security-first managed IT and support for businesses in Emmaus. Helpdesk + patching + monitoring, plus strong identity and ransomware-ready backup practices.",
    nearby: ["Allentown", "Macungie"],
    faqs: [
      {
        q: "Do you provide IT support for Emmaus businesses?",
        a: "Yes — we provide managed IT support, monitoring, patching, and security-first guidance for teams in Emmaus.",
      },
      {
        q: "What kind of cybersecurity services do you include?",
        a: "Identity hardening (MFA), endpoint protection, patching, monitoring, and practical security baselines to reduce risk.",
      },
      {
        q: "Do you help with Microsoft 365 and email security?",
        a: "Yes — Microsoft 365 setup, troubleshooting, and security best practices are included in our support options.",
      },
    ],
  },
];

export function getLocationBySlug(slug) {
  return LOCATIONS.find((l) => l.slug === slug);
}
