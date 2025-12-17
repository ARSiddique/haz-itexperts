// app/sitemap.xml/route.js
export const runtime = "edge";

import { site } from "@/lib/siteConfig";
import { LOCATIONS } from "@/lib/locations";

const getBaseUrl = () => {
  const fromSite = site?.url;
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  const base = (fromSite || fromEnv || "https://supremeitexperts.com").trim();
  return base.replace(/\/$/, "");
};

const todayISO = () => {
  // YYYY-MM-DD
  return new Date().toISOString().slice(0, 10);
};

const esc = (s) =>
  String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const urlNode = ({ loc, lastmod, changefreq, priority }) => {
  return `
  <url>
    <loc>${esc(loc)}</loc>
    <lastmod>${esc(lastmod)}</lastmod>
    <changefreq>${esc(changefreq)}</changefreq>
    <priority>${esc(priority)}</priority>
  </url>`;
};

export async function GET() {
  const baseUrl = getBaseUrl();
  const lastmod = todayISO();

  // ✅ Add/edit your static routes here (easy to maintain)
  const staticRoutes = [
    { path: "/", changefreq: "weekly", priority: "1.0" },

    { path: "/about", changefreq: "monthly", priority: "0.7" },
    { path: "/services", changefreq: "weekly", priority: "0.8" },

    { path: "/services/managed-it", changefreq: "monthly", priority: "0.8" },
    { path: "/services/cybersecurity", changefreq: "monthly", priority: "0.8" },
    { path: "/services/cloud-workspace", changefreq: "monthly", priority: "0.7" },
    { path: "/services/device-management", changefreq: "monthly", priority: "0.7" },
    { path: "/services/projects-consulting", changefreq: "monthly", priority: "0.7" },
    { path: "/services/vcio-strategy", changefreq: "monthly", priority: "0.7" },

    { path: "/faqs", changefreq: "monthly", priority: "0.6" },
    { path: "/areas", changefreq: "monthly", priority: "0.6" },
    { path: "/contact", changefreq: "yearly", priority: "0.6" },
    { path: "/gallery", changefreq: "monthly", priority: "0.5" },
    { path: "/get-quote", changefreq: "weekly", priority: "0.7" },

    // ✅ Add any future pages here easily:
    // { path: "/privacy", changefreq: "yearly", priority: "0.3" },
    // { path: "/terms", changefreq: "yearly", priority: "0.3" },
  ];

  // ✅ Dynamic location pages
  const locationRoutes = (LOCATIONS || []).map((l) => ({
    path: `/locations/${l.slug}`,
    changefreq: "monthly",
    priority: "0.6",
  }));

  // Combine + de-dup
  const all = [...staticRoutes, ...locationRoutes]
    .filter(Boolean)
    .map((r) => ({
      loc: `${baseUrl}${r.path === "/" ? "" : r.path}`,
      lastmod,
      changefreq: r.changefreq || "monthly",
      priority: r.priority || "0.5",
    }));

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all.map(urlNode).join("\n")}
</urlset>`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=300, must-revalidate",
    },
  });
}
