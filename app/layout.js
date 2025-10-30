// app/layout.js
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FABs from "@/components/FABs";
import BackToTop from "@/components/BackToTop";
import HomeFX from "@/components/HomeFX";
import { site } from "@/lib/siteConfig";

export const metadata = {
  title: `${site.name} — Managed IT & Cybersecurity`,
  description: "Managed IT for SMBs in Allentown & the Lehigh Valley: 24/7 helpdesk, Microsoft 365, device management, cybersecurity & backups — fixed monthly fee."
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
