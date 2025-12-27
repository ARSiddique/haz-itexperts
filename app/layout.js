// app/layout.js
import "./globals.css";
import { site } from "@/lib/siteConfig";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import Script from "next/script";
import { BASE_URL, BUSINESS_ID, uniq } from "@/lib/seoIds";

const BRAND = site?.name || "Supreme IT Experts";
const DEFAULT_DESC =
  "Managed IT for SMBs in Allentown & the Lehigh Valley: 24/7 helpdesk, device management, cybersecurity & backups — fixed monthly fee.";

const OG_IMAGE = new URL("/og-image.png?v=7", BASE_URL).toString();

const cleanPhone = (site?.phone || "+1 610-500-9209").replace(/[^\d+]/g, "");
const phoneE164 = cleanPhone.startsWith("+") ? cleanPhone : `+${cleanPhone}`;
const email = site?.email || "supremeitexperts@gmail.com";

// socials (if site.socials is an object)
const sameAs = uniq(Object.values(site?.socials || {}).filter(Boolean));

// (optional) if you later add real street/zip in siteConfig, it will auto-fill
const address = {
  "@type": "PostalAddress",
  streetAddress: site?.address?.streetAddress || site?.address?.street || undefined,
  postalCode: site?.address?.postalCode || undefined,
  addressLocality: site?.address?.addressLocality || "Allentown",
  addressRegion: site?.address?.addressRegion || "PA",
  addressCountry: site?.address?.addressCountry || "US",
};

export const metadata = {
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: "/" },

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
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: BRAND }],
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
  // ✅ ONE business entity only (NO separate Organization object)
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: `${BASE_URL}/`,
        name: BRAND,
        publisher: { "@id": BUSINESS_ID },
      },

      {
        "@type": ["LocalBusiness", "ITService"],
        "@id": BUSINESS_ID,
        name: BRAND,
        url: `${BASE_URL}/`,
        description:
          "Managed IT services and cybersecurity for small and mid-sized businesses in Allentown and the Lehigh Valley, PA.",
        telephone: phoneE164,
        email,
        priceRange: "$$",
        image: OG_IMAGE,
        logo: new URL("/logo.png", BASE_URL).toString(),
        sameAs,
        address,
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
    ],
  };

  return (
    <html lang="en">
      <body className="bg-[var(--bg)] text-slate-100 antialiased isolate min-h-screen overflow-x-hidden">
        <Analytics />

        <Script
          id="global-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />

        <Header className="site-header" />
        <main>{children}</main>
        <Footer className="site-footer" />
      </body>
    </html>
  );
}
