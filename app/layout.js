// app/layout.js
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FABs from "@/components/FABs";
import BackToTop from "@/components/BackToTop";
import HomeFX from "@/components/HomeFX";
import { site } from "@/lib/siteConfig";

// Use env in dev/prod so Next.js stops warning
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  // ✅ fixes: “metadataBase not set”
  metadataBase: new URL(BASE_URL),

  title: `${site.name} — Managed IT & Cybersecurity`,
  description:
    "Managed IT for SMBs in Allentown & the Lehigh Valley: 24/7 helpdesk, Microsoft 365, device management, cybersecurity & backups — fixed monthly fee.",

  // Icons (cache-busted)
  icons: {
    icon: [
      { url: "/favicon.ico?v=6", sizes: "any" },
      { url: "/logo.png?v=6", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png?v=6",
    shortcut: "/favicon.ico?v=6",
  },

  openGraph: {
    title: `${site.name} — Managed IT & Cybersecurity`,
    description:
      "Managed IT for SMBs in Allentown & the Lehigh Valley: 24/7 helpdesk, Microsoft 365, device management, cybersecurity & backups — fixed monthly fee.",
    url: BASE_URL,                     // absolute URL
    type: "website",
    images: ["/og-image.png?v=6"],     // resolved against metadataBase
  },

  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Managed IT & Cybersecurity`,
    description:
      "Managed IT for SMBs in Allentown & the Lehigh Valley: 24/7 helpdesk, Microsoft 365, device management, cybersecurity & backups — fixed monthly fee.",
    images: ["/og-image.png?v=6"],     // resolved against metadataBase
  },
};

// ✅ fixes: “themeColor in metadata” warning
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0b1220",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico?v=6" sizes="any" />
        <link rel="icon" type="image/png" href="/logo.png?v=6" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=6" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body className="bg-[var(--bg)] text-slate-100 antialiased isolate min-h-screen overflow-x-hidden">
        <Header />
        <main>{children}</main>
        <Footer />
        <BackToTop size={44} chatSize={56} gap={12} mode="hide" panelLift={360} z={80} />
        <FABs />
        <HomeFX />
      </body>
    </html>
  );
}
