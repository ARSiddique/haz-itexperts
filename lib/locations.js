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

    // ✅ Allentown page copy skeleton (2 local paragraphs + CTA microcopy)
    copy: {
      paragraphs: [
        "Allentown aur Lehigh Valley ki businesses ko usually aik hi problem hoti hai: IT theek chal raha hota hai jab tak achanak downtime, slow systems, Wi-Fi drops, ya email access issues start nahi ho jate. Supreme IT Experts Allentown ke teams ko remote-first managed IT support provide karta hai — quick helpdesk, proactive monitoring, patching, aur day-to-day Microsoft 365 support tak. Goal simple hai: aapka business smoothly chale, employees ka time waste na ho, aur “IT fire-fighting” ki jagah planned, stable systems milen.",
        "Aaj ke time me IT support ka matlab sirf “fix kar dena” nahi — security bhi saath honi chahiye. Is liye hum cybersecurity-first approach use karte hain: MFA/identity hardening, endpoint protection, backups + tested restores, aur basic security baselines jo ransomware aur data loss ka risk drastically kam karte hain. Agar aap Allentown me ho aur IT support ko predictable aur secure banana chahte ho, hum ek free 20-minute IT assessment me aapko clear next steps + priority fixes suggest kar denge.",
      ],
      primaryCtaText: "Free 20-min IT assessment",
      secondaryCtaText: "Contact us",
      microTrust: "Remote-first support for Allentown & Lehigh Valley businesses • Cybersecurity-first, practical fixes, predictable support.",
    },

    // ✅ 7 FAQs (local + free assessment intent)
    faqs: [
      {
        q: "Do you offer managed IT services in Allentown, PA?",
        a: "Yes. We provide remote-first managed IT support for Allentown and nearby Lehigh Valley areas, including helpdesk, monitoring, patching, Microsoft 365 support, and cybersecurity essentials.",
      },
      {
        q: "What types of businesses do you support in Allentown?",
        a: "We typically support small-to-mid sized businesses that need reliable IT, fast response, and predictable monthly coverage — from office teams to multi-device environments.",
      },
      {
        q: "How fast can you respond to IT issues?",
        a: "For most remote issues (email, PC performance, access, Microsoft 365, network troubleshooting), response is quick and we aim to reduce downtime immediately. Urgent issues get priority handling.",
      },
      {
        q: "Do you provide cybersecurity along with IT support?",
        a: "Yes. Our approach is cybersecurity-first — we focus on MFA, endpoint protection, patching, monitoring, and security baselines that reduce risk and prevent avoidable incidents.",
      },
      {
        q: "Can you help with Microsoft 365 and email problems?",
        a: "Absolutely. We help with Microsoft 365 setup, user access, email deliverability issues, security settings, and ongoing support.",
      },
      {
        q: "Do you offer backups and disaster recovery for Allentown businesses?",
        a: "Yes. We implement backup + recovery plans and encourage test restores so you actually know you can recover when it matters.",
      },
      {
        q: "What happens in the free 20-minute IT assessment?",
        a: "We ask a few quick questions, review your current setup/pain points, and give you a short action plan: priority fixes, security gaps, and what a managed setup could look like.",
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
