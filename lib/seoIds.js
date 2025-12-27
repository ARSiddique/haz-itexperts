// lib/seoIds.js
import { site } from "@/lib/siteConfig";

const RAW_BASE_URL =
  (site?.url && site.url.startsWith("http") ? site.url : null) ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://supremeitexperts.com";

export const BASE_URL = RAW_BASE_URL.replace(/\/$/, "");
export const BUSINESS_ID = `${BASE_URL}/#business`;

export function uniq(arr = []) {
  const out = [];
  for (const v of arr) {
    const s = (v || "").toString().trim();
    if (!s) continue;
    if (s === "#") continue;
    if (!out.includes(s)) out.push(s);
  }
  return out;
}
