// app/sitemap.xml/route.js
export const runtime = "edge";

import { site } from "@/lib/siteConfig";
import { LOCATIONS } from "@/lib/locations";
import { POSTS } from "@/lib/blogData";

function esc(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function urlTag({ loc, lastmod, changefreq, priority }) {
  return `<url>
  <loc>${esc(loc)}</loc>
  <lastmod>${esc(lastmod)}</lastmod>
  <changefreq>${esc(changefreq)}</changefreq>
  <priority>${esc(priority)}</priority>
</url>`;
}

export async function GET() {
  const baseUrl = (site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const today = new Date().toISOString().slice(0, 10);

  const staticUrls = [
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

    // ✅ Blog index
    // { path: "/blog", changefreq: "weekly", priority: "0.7" },
  ];

  const locationUrls = (LOCATIONS || []).map((l) => ({
    path: `/locations/${l.slug}`,
    changefreq: "monthly",
    priority: "0.6",
    lastmod: today,
  }));

  // ✅ Blog posts
  const blogUrls = [];

  const all = [
    ...staticUrls.map((u) => ({ ...u, lastmod: today })),
    ...locationUrls,
    ...blogUrls,
  ];

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    all
      .map((u) =>
        urlTag({
          loc: `${baseUrl}${u.path}`,
          lastmod: u.lastmod || today,
          changefreq: u.changefreq,
          priority: u.priority,
        })
      )
      .join("\n") +
    `\n</urlset>`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=300, must-revalidate",
    },
  });
}
