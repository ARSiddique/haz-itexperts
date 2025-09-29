import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/siteConfig";

export const metadata = {
  title: `${site.name} — Managed IT & Cybersecurity`,
  description: "Managed IT, co-managed IT, and cybersecurity for SMEs in Pakistan.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[var(--bg)] text-slate-100 antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
