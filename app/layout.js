// app/layout.js
import "./globals.css";
import { site } from "@/lib/siteConfig";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: `${site.name} — Managed IT & Cybersecurity`,
  description:
    "Managed IT for SMBs in Allentown & the Lehigh Valley: 24/7 helpdesk, device management, cybersecurity & backups — fixed monthly fee.",
  icons: {
    icon: [{ url: "/favicon.ico?v=9", sizes: "any" }],
    shortcut: "/favicon.ico?v=9",
    apple: "/apple-touch-icon.png?v=9",
  },
  openGraph: {
    title: `${site.name} — Managed IT & Cybersecurity`,
    description:
      "Managed IT for SMBs in Allentown & the Lehigh Valley: 24/7 helpdesk, device management, cybersecurity & backups — fixed monthly fee.",
    url: BASE_URL,
    type: "website",
    images: ["/og-image.png?v=9"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Managed IT & Cybersecurity`,
    description:
      "Managed IT for SMBs in Allentown & the Lehigh Valley: 24/7 helpdesk, device management, cybersecurity & backups — fixed monthly fee.",
    images: ["/og-image.png?v=9"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
  {/* existing */}
  <link rel="icon" href="/favicon.ico?v=9" sizes="any" />
  <link rel="shortcut icon" href="/favicon.ico?v=9" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=9" />

  {/* extra PNG sizes (optional but nice for some browsers/OSes) */}
  <link rel="icon" type="image/png" sizes="16x16" href="/icon_16.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="/icon_32.png" />
  <link rel="icon" type="image/png" sizes="48x48" href="/icon_48.png" />
  <link rel="icon" type="image/png" sizes="64x64" href="/icon_64.png" />

  {/* Android/Install surfaces (even without full manifest) */}
  <link rel="icon" type="image/png" sizes="192x192" href="/icon_192.png" />
  <link rel="icon" type="image/png" sizes="512x512" href="/icon_512.png" />
</head>

      <body className="bg-[var(--bg)] text-slate-100 antialiased isolate min-h-screen overflow-x-hidden">
        <main>{children}</main>
      </body>
    </html>
  );
}
