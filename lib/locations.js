// lib/locations.js
export const LOCATIONS = [
  {
    slug: "allentown-pa",
    city: "Allentown",
    state: "PA",
    title: "Managed IT Services in Allentown, PA",
    lede:
      "Fast, friendly managed IT and cybersecurity for small and mid-sized businesses in Allentown. Helpdesk, monitoring, patching, identity security, and backup/DR — with clear SLAs.",
    nearby: ["Macungie", "Emmaus", "Bethlehem"]
  },
  {
    slug: "macungie-pa",
    city: "Macungie",
    state: "PA",
    title: "Managed IT Services in Macungie, PA",
    lede:
      "Reliable managed IT and security for growing teams in Macungie. Proactive support, hardened baselines, and predictable onboarding — without the chaos.",
    nearby: ["Allentown", "Emmaus", "Bethlehem"]
  },
  {
    slug: "emmaus-pa",
    city: "Emmaus",
    state: "PA",
    title: "Managed IT Services in Emmaus, PA",
    lede:
      "Security-first managed IT and support for businesses in Emmaus. Helpdesk + patching + monitoring, plus strong identity and ransomware-ready backup practices.",
    nearby: ["Allentown", "Emmaus", "Bethlehem"]
  },
];

export function getLocationBySlug(slug) {
  return LOCATIONS.find((l) => l.slug === slug);
}
