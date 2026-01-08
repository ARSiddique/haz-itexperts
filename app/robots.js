// app/robots.js
import { site } from "@/lib/siteConfig";

export const revalidate = 3600;

function isUkRolloutOn() {
  const v = String(process.env.UK_ROLLOUT || "").toLowerCase().trim();
  return v === "on" || v === "true" || v === "1";
}

export default function robots() {
  const baseUrl = (site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const ukOn = isUkRolloutOn();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        ...(ukOn ? {} : { disallow: ["/uk/"] }),
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
