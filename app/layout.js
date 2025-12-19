// app/layout.js
import "./globals.css";
import { site } from "@/lib/siteConfig";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";

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

// socials (if site.socials is an object)
const sameAs = Object.values(site?.socials || {}).filter(Boolean);

export const metadata = {
  metadataBase: new URL(BASE_URL),

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
    url: BASE_URL,
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
  // ✅ Keep ONE global schema set here
  const schema = [
    // Organization
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: BRAND,
      url: BASE_URL,
      logo: new URL("/favicon-48.png", BASE_URL).toString(),
      sameAs,
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          telephone: phoneE164,
          email,
          availableLanguage: ["en"],
        },
      ],
      areaServed: [
        "Allentown, PA",
        "Macungie, PA",
        "Emmaus, PA",
        "Lehigh Valley, PA",
      ],
    },

    // WebSite
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: `${BASE_URL}/`,
      name: BRAND,
      publisher: { "@id": `${BASE_URL}/#organization` },
    },

    // ✅ LocalBusiness / ITService (ONE PLACE ONLY)
    // Note: no fake streetAddress. Only locality/region/country to satisfy validator.
    {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "ITService"],
      "@id": `${BASE_URL}/#localbusiness`,
      name: BRAND,
      url: `${BASE_URL}/`,
      description:
        "Managed IT services and cybersecurity for small and mid-sized businesses in Allentown and the Lehigh Valley, PA.",
      telephone: phoneE164,
      priceRange: "$$",
      areaServed: [
        "Allentown, PA",
        "Macungie, PA",
        "Emmaus, PA",
        "Lehigh Valley, PA",
      ],
      image: [OG_IMAGE],
      logo: new URL("/logo.png", BASE_URL).toString(),
      address: {
        "@type": "PostalAddress",
        addressLocality: "Allentown",
        addressRegion: "PA",
        addressCountry: "US",
      },
    },
  ];

  return (
    <html lang="en">
      <body className="bg-[var(--bg)] text-slate-100 antialiased isolate min-h-screen overflow-x-hidden">
        <Analytics />

        <script
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
