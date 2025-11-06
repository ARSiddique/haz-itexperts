// app/layout.js
import "./globals.css";
import { site } from "@/lib/siteConfig";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: `${site.name} — Managed IT & Cybersecurity`,
  description:
    "Managed IT for SMBs in Allentown & the Lehigh Valley: 24/7 helpdesk, device management, cybersecurity & backups — fixed monthly fee.",
<<<<<<< HEAD

  // Keep this simple; we'll also add explicit <link> tags in <head>
  icons: {
    icon: [{ url: "/favicon.ico?v=7", sizes: "any" }],
    apple: "/apple-touch-icon.png?v=7",
    shortcut: "/favicon.ico?v=7",
=======
  icons: {
    icon: [{ url: "/favicon.ico?v=9", sizes: "any" }],
    shortcut: "/favicon.ico?v=9",
    apple: "/apple-touch-icon.png?v=9",
>>>>>>> origin/campaign-lp-landing
  },
  openGraph: {
    title: `${site.name} — Managed IT & Cybersecurity`,
    description:
      "Managed IT for SMBs in Allentown & the Lehigh Valley: 24/7 helpdesk, device management, cybersecurity & backups — fixed monthly fee.",
    url: BASE_URL,
    type: "website",
<<<<<<< HEAD
    images: ["/og-image.png?v=7"],
=======
    images: ["/og-image.png?v=9"],
>>>>>>> origin/campaign-lp-landing
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Managed IT & Cybersecurity`,
    description:
      "Managed IT for SMBs in Allentown & the Lehigh Valley: 24/7 helpdesk, device management, cybersecurity & backups — fixed monthly fee.",
<<<<<<< HEAD
    images: ["/og-image.png?v=7"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0b1220",
};

=======
    images: ["/og-image.png?v=9"],
  },
};

>>>>>>> origin/campaign-lp-landing
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
<<<<<<< HEAD
        <link rel="icon" href="/favicon.ico?v=7" sizes="any" />
  <link rel="shortcut icon" href="/favicon.ico?v=7" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=7" />
  {/* <link rel="manifest" href="/manifest.webmanifest" /> */}
=======
        {/* Primary icons (served from /public) */}
        <link rel="icon" href="/favicon.ico?v=9" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico?v=9" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=9" />

        {/* Extra PNG sizes for various platforms */}
        <link rel="icon" type="image/png" sizes="16x16" href="/icon_16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon_32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/icon_48.png" />
        <link rel="icon" type="image/png" sizes="64x64" href="/icon_64.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon_192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon_512.png" />
>>>>>>> origin/campaign-lp-landing
      </head>
      <body className="bg-[var(--bg)] text-slate-100 antialiased isolate min-h-screen overflow-x-hidden">
        <main>{children}</main>
      </body>
    </html>
  );
}
