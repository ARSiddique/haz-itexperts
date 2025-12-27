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
const HOME_URL = `${BASE_URL}/`;

const BRAND = site?.name || "Supreme IT Experts";
const DEFAULT_DESC =
  "Managed IT for SMBs in Allentown & the Lehigh Valley: 24/7 helpdesk, device management, cybersecurity & backups — fixed monthly fee.";

const OG_IMAGE = new URL("/og-image.png?v=7", BASE_URL).toString();
const LOGO_URL = new URL("/logo.png", BASE_URL).toString();

const cleanPhone = (site?.phone || "+1 610-500-9209").replace(/[^\d+]/g, "");
const phoneE164 = cleanPhone.startsWith("+") ? cleanPhone : `+${cleanPhone}`;
const email = site?.email || "supremeitexperts@gmail.com";

// socials (if site.socials is an object)
const sameAs = Object.values(site?.socials || {}).filter(Boolean);

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
  /**
   * ✅ IMPORTANT:
   * Ensure `/#localbusiness` schema is NOT injected anywhere else (Footer/Header/pages).
   * Otherwise Google will merge → duplicate url/logo/image.
   */
  const globalSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "ITService"],
        "@id": `${BASE_URL}/#localbusiness`,
        name: BRAND,
        url: HOME_URL,
        description:
          "Managed IT services and cybersecurity for small and mid-sized businesses in Allentown and the Lehigh Valley, PA.",
        telephone: phoneE164,
        email,
        priceRange: "$$",
        image: OG_IMAGE,
        logo: LOGO_URL,
        sameAs,
        areaServed: ["Allentown, PA", "Macungie, PA", "Emmaus, PA", "Lehigh Valley, PA"],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Allentown",
          addressRegion: "PA",
          addressCountry: "US",
          // Optional (add when you have them):
          // streetAddress: "YOUR STREET ADDRESS",
          // postalCode: "YOUR ZIP CODE",
        },
      },

      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: HOME_URL,
        name: BRAND,
        publisher: { "@id": `${BASE_URL}/#localbusiness` },
      },
    ],
  };

  return (
    <html lang="en">
      <body className="bg-[var(--bg)] text-slate-100 antialiased isolate min-h-screen overflow-x-hidden">
        <Analytics />

        {/* ✅ ONE global schema only (prevents duplicate field url/logo/image warnings) */}
        <Script
          id="global-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />

        <Header className="site-header" />
        <main>{children}</main>
        <Footer className="site-footer" />
      </body>
    </html>
  );
}
