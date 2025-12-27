// app/layout.js
import "./globals.css";
import { site } from "@/lib/siteConfig";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import Script from "next/script";

const RAW_BASE_URL =
  (site?.url && site.url.startsWith("http") ? site.url : null) ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://supremeitexperts.com";

// normalize (no trailing slash)
const BASE_URL = RAW_BASE_URL.replace(/\/$/, "");

const BRAND = site?.name || "Supreme IT Experts";
const DEFAULT_DESC =
  "Managed IT for SMBs in Allentown & the Lehigh Valley: 24/7 helpdesk, device management, cybersecurity & backups — fixed monthly fee.";

const OG_IMAGE = new URL("/og-image.png?v=7", BASE_URL).toString();

const cleanPhone = (site?.phone || "+1 610-500-9209").replace(/[^\d+]/g, "");
const phoneE164 = cleanPhone.startsWith("+") ? cleanPhone : `+${cleanPhone}`;
const email = site?.email || "supremeitexperts@gmail.com";

// ✅ socials: remove empty/# + dedupe
const sameAs = Array.from(
  new Set(
    Object.values(site?.socials || {})
      .map((v) => (v ? String(v).trim() : ""))
      .filter((v) => v && v !== "#" && v !== "https://#" && v !== "http://#")
  )
);

// ✅ address: keep it present (critical for LocalBusiness rich results)
// If you have real address fields in siteConfig, it will use them; otherwise fallback is partial (still valid)
const addr = site?.address || {};
const postalAddress = {
  "@type": "PostalAddress",
  ...(addr.streetAddress ? { streetAddress: String(addr.streetAddress) } : {}),
  ...(addr.postalCode ? { postalCode: String(addr.postalCode) } : {}),
  addressLocality: String(addr.addressLocality || "Allentown"),
  addressRegion: String(addr.addressRegion || "PA"),
  addressCountry: String(addr.addressCountry || "US"),
};

export const metadata = {
  metadataBase: new URL(BASE_URL),

  alternates: {
    canonical: "/",
  },

  title: {
    default: `${BRAND} — Managed IT & Cybersecurity`,
    template: `%s | ${BRAND}`,
  },

  description: DEFAULT_DESC,

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      // "msvalidate.01": "xxxx"
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48.png", type: "image/png", sizes: "48x48" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },

  openGraph: {
    title: `${BRAND} — Managed IT & Cybersecurity`,
    description: DEFAULT_DESC,
    url: "/",
    siteName: BRAND,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: BRAND,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${BRAND} — Managed IT & Cybersecurity`,
    description: DEFAULT_DESC,
    images: [OG_IMAGE],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
  ],
};

export default function RootLayout({ children }) {
  // ✅ ONE graph, ONE business entity (prevents duplicate url/logo/image/sameAs)
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        // ✅ Single “business” node acts as Organization + LocalBusiness + ITService
        "@type": ["Organization", "LocalBusiness", "ITService"],
        "@id": `${BASE_URL}/#business`,
        name: BRAND,
        url: `${BASE_URL}/`,
        description:
          "Managed IT services and cybersecurity for small and mid-sized businesses in Allentown and the Lehigh Valley, PA.",
        telephone: phoneE164,
        email,
        priceRange: "$$",
        logo: new URL("/logo.png", BASE_URL).toString(),
        image: [OG_IMAGE],
        sameAs,
        address: postalAddress,
        areaServed: [
          "Allentown, PA",
          "Macungie, PA",
          "Emmaus, PA",
          "Lehigh Valley, PA",
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            telephone: phoneE164,
            email,
            availableLanguage: ["en"],
          },
        ],
      },

      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: `${BASE_URL}/`,
        name: BRAND,
        publisher: { "@id": `${BASE_URL}/#business` },
      },
    ],
  };

  return (
    <html lang="en">
      <body className="bg-[var(--bg)] text-slate-100 antialiased isolate min-h-screen overflow-x-hidden">
        <Analytics />

        <Script
          id="global-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
        />

        <Header className="site-header" />
        <main>{children}</main>
        <Footer className="site-footer" />
      </body>
    </html>
  );
}
