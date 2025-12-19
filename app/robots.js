// app/robots.js
import { site } from "@/lib/siteConfig";

export const revalidate = 3600; // 1 hour cache

export default function robots() {
  const baseUrl = (site?.url || "https://supremeitexperts.com").replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
