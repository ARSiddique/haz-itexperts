// app/layout.js
import "./globals.css";
import { site } from "@/lib/siteConfig";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";

// Prefer explicit prod domain so canonicals/OG never leak localhost
const PROD_URL = "https://supremeitexperts.com";
const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL || PROD_URL).replace(/\/$/, "");

export const metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: `${site.name} — Managed IT & Cybersecurity`,
    template: `%s — ${site.name}`,
  },

  description:
    "Managed IT for SMBs in Allentown & the Lehigh Valley: 24/7 helpdesk, device management, cybersecurity & backups — fixed monthly fee.",

  alternates: {
    canonical: "/",
  },

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

  openGraph: {
    title: `${site.name} — Managed IT & Cybersecurity`,
    description:
      "Managed IT for SMBs in Allentown & the Lehigh Valley: 24/7 helpdesk, device management, cybersecurity & backups — fixed monthly fee.",
    url: BASE_URL,
    siteName: site.name,
    type: "website",
    images: [`${BASE_URL}/og-image.png?v=7`],
  },

  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Managed IT & Cybersecurity`,
    description:
      "Managed IT for SMBs in Allentown & the Lehigh Valley: 24/7 helpdesk, device management, cybersecurity & backups — fixed monthly fee.",
    images: [`${BASE_URL}/og-image.png?v=7`],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b1220",
};

export default function RootLayout({ children }) {
  const brand = site?.name || "Supreme IT Experts";
  const email = site?.email || "supremeitexperts@gmail.com";
  const phone = site?.phone || "+1 610-500-9209";
  const phoneHref = (phone || "").replace(/[^+\d]/g, "");

  // ✅ Site-wide JSON-LD (Organization + WebSite)
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand,
    url: BASE_URL,
    logo: `${BASE_URL}/favicon-48.png`,
    email,
    telephone: phoneHref ? `+${phoneHref.replace(/^\+?/, "")}` : undefined,
    areaServed: ["Allentown, PA", "Macungie, PA", "Emmaus, PA", "Lehigh Valley, PA"],
    sameAs: [
      site?.socials?.linkedin,
      site?.socials?.facebook,
      site?.socials?.instagram,
      site?.socials?.x,
      site?.socials?.tiktok,
      site?.socials?.youtube,
    ].filter(Boolean),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email,
        telephone: phoneHref ? `+${phoneHref.replace(/^\+?/, "")}` : undefined,
        availableLanguage: ["English"],
      },
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brand,
    url: BASE_URL,
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/favicon-48.png" sizes="48x48" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>

      <body className="bg-[var(--bg)] text-slate-100 antialiased isolate min-h-screen overflow-x-hidden">
        <Analytics />
        <Header className="site-header" />
        <main>{children}</main>
        <Footer className="site-footer" />
      </body>
    </html>
  );
}
