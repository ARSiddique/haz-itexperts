// app/layout.js
import "./globals.css";
import { site } from "@/lib/siteConfig";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";

const BASE_URL =
  (site?.url && site.url.startsWith("http") ? site.url : null) ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://supremeitexperts.com";

export const metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: `${site?.name || "Supreme IT Experts"} — Managed IT & Cybersecurity`,
    template: `%s | ${site?.name || "Supreme IT Experts"}`,
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

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48.png", type: "image/png", sizes: "48x48" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },

  openGraph: {
    title: `${site?.name || "Supreme IT Experts"} — Managed IT & Cybersecurity`,
    description:
      "Managed IT for SMBs in Allentown & the Lehigh Valley: 24/7 helpdesk, device management, cybersecurity & backups — fixed monthly fee.",
    url: BASE_URL,
    siteName: site?.name || "Supreme IT Experts",
    type: "website",
    images: [
      {
        url: new URL("/og-image.png?v=7", BASE_URL).toString(),
        width: 1200,
        height: 630,
        alt: "Supreme IT Experts",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${site?.name || "Supreme IT Experts"} — Managed IT & Cybersecurity`,
    description:
      "Managed IT for SMBs in Allentown & the Lehigh Valley: 24/7 helpdesk, device management, cybersecurity & backups — fixed monthly fee.",
    images: [new URL("/og-image.png?v=7", BASE_URL).toString()],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b1220",
};

export default function RootLayout({ children }) {
  const brand = site?.name || "Supreme IT Experts";
  const phone = site?.phone || "+1 610-500-9209";
  const email = site?.email || "supremeitexperts@gmail.com";

  return (
    <html lang="en">
      <body className="bg-[var(--bg)] text-slate-100 antialiased isolate min-h-screen overflow-x-hidden">
        {/* GA4 */}
        <Analytics />

        {/* Global Organization JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: brand,
              url: BASE_URL,
              logo: new URL("/favicon-48.png", BASE_URL).toString(),
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  contactType: "customer support",
                  telephone: phone,
                  email,
                  availableLanguage: ["English"],
                },
              ],
              // Optional: add your real social profile URLs here
              sameAs: [
                // "https://www.linkedin.com/company/...",
                // "https://www.facebook.com/...",
                // "https://x.com/...",
              ],
              areaServed: ["Allentown, PA", "Macungie, PA", "Emmaus, PA", "Lehigh Valley, PA"],
            }),
          }}
        />

        <Header className="site-header" />
        <main>{children}</main>
        <Footer className="site-footer" />
      </body>
    </html>
  );
}
