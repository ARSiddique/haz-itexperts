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
const LOGO_URL = new URL("/logo.png", BASE_URL).toString();

const cleanPhone = (site?.phone || "+1 610-500-9209").replace(/[^\d+]/g, "");
const phoneE164 = cleanPhone.startsWith("+") ? cleanPhone : `+${cleanPhone}`;
const email = site?.email || "supremeitexperts@gmail.com";

// ✅ socials: remove "#", non-urls, and dedupe
const sameAs = Array.from(
  new Set(
    Object.values(site?.socials || {})
      .map((v) => String(v || "").trim())
      .filter((v) => v && v !== "#" && v !== "/" && /^https?:\/\//i.test(v))
  )
);

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
  // ✅ SINGLE business entity (prevents duplicate url/logo/image/sameAs in Rich Results)
  const businessId = `${BASE_URL}/#localbusiness`;

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "ITService"],
      "@id": businessId,
      name: BRAND,
      url: `${BASE_URL}/`,
      description:
        "Managed IT services and cybersecurity for small and mid-sized businesses in Allentown and the Lehigh Valley, PA.",
      telephone: phoneE164,
      email,
      priceRange: "$$",
      logo: LOGO_URL,
      image: OG_IMAGE, // ✅ keep single value (not duplicate array)
      sameAs, // ✅ deduped + cleaned
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

      // ✅ IMPORTANT:
      // If you don't have a real office address/zip (SAB), keep address OMITTED.
      // Add address only when you have exact street + postalCode.
      // address: {
      //   "@type": "PostalAddress",
      //   streetAddress: "YOUR STREET",
      //   addressLocality: "Allentown",
      //   addressRegion: "PA",
      //   postalCode: "18101",
      //   addressCountry: "US",
      // },
    },

    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: `${BASE_URL}/`,
      name: BRAND,
      publisher: { "@id": businessId },
      inLanguage: "en-US",
    },
  ];

  return (
    <html lang="en">
      <body className="bg-[var(--bg)] text-slate-100 antialiased isolate min-h-screen overflow-x-hidden">
        <Analytics />

        {/* ✅ Plain script in SSR HTML (safe + no duplication quirks) */}
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
