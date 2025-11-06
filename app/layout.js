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
    icon: [{ url: "/favicon.ico?v=8", sizes: "any" }],
    shortcut: "/favicon.ico?v=8",
    apple: "/apple-touch-icon.png?v=8",
  },
  openGraph: {
    title: `${site.name} — Managed IT & Cybersecurity`,
    description:
      "Managed IT for SMBs in Allentown & the Lehigh Valley: 24/7 helpdesk, device management, cybersecurity & backups — fixed monthly fee.",
    url: BASE_URL,
    type: "website",
    images: ["/og-image.png?v=8"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Managed IT & Cybersecurity`,
    description:
      "Managed IT for SMBs in Allentown & the Lehigh Valley: 24/7 helpdesk, device management, cybersecurity & backups — fixed monthly fee.",
    images: ["/og-image.png?v=8"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Explicit tags to ensure the custom favicon from /public is used */}
        <link rel="icon" href="/favicon.ico?v=8" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico?v=8" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=8" />
      </head>
      <body className="bg-[var(--bg)] text-slate-100 antialiased isolate min-h-screen overflow-x-hidden">
        <main>{children}</main>
      </body>
    </html>
  );
}
