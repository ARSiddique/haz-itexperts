// app/sitemap.js
import { BASE_URL } from "@/lib/seoIds";

export default function sitemap() {
  const now = new Date().toISOString();

  const urls = [
    { loc: `${BASE_URL}/`, changefreq: "weekly", priority: 1.0 },

    { loc: `${BASE_URL}/about`, changefreq: "monthly", priority: 0.7 },
    { loc: `${BASE_URL}/services`, changefreq: "weekly", priority: 0.8 },

    { loc: `${BASE_URL}/services/managed-it`, changefreq: "monthly", priority: 0.8 },
    { loc: `${BASE_URL}/services/cybersecurity`, changefreq: "monthly", priority: 0.8 },
    { loc: `${BASE_URL}/services/cloud-workspace`, changefreq: "monthly", priority: 0.7 },
    { loc: `${BASE_URL}/services/device-management`, changefreq: "monthly", priority: 0.7 },
    { loc: `${BASE_URL}/services/projects-consulting`, changefreq: "monthly", priority: 0.7 },
    { loc: `${BASE_URL}/services/vcio-strategy`, changefreq: "monthly", priority: 0.7 },

    { loc: `${BASE_URL}/faqs`, changefreq: "monthly", priority: 0.6 },
    { loc: `${BASE_URL}/areas`, changefreq: "monthly", priority: 0.6 },
    { loc: `${BASE_URL}/contact`, changefreq: "yearly", priority: 0.6 },
    { loc: `${BASE_URL}/gallery`, changefreq: "monthly", priority: 0.5 },
    { loc: `${BASE_URL}/get-quote`, changefreq: "weekly", priority: 0.7 },

    { loc: `${BASE_URL}/locations/allentown-pa`, changefreq: "monthly", priority: 0.6 },
    { loc: `${BASE_URL}/locations/macungie-pa`, changefreq: "monthly", priority: 0.6 },
    { loc: `${BASE_URL}/locations/emmaus-pa`, changefreq: "monthly", priority: 0.6 },

    // ✅ NEW: Landing Page (Free Assessment)
    { loc: `${BASE_URL}/lp/allentown`, changefreq: "weekly", priority: 0.9 },
  ];

  return urls.map((u) => ({
    url: u.loc,
    lastModified: now,
    changeFrequency: u.changefreq,
    priority: u.priority,
  }));
}
