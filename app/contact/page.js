// app/contact/page.js
import { site } from "@/lib/siteConfig";
import ContactClient from "./ContactClient";

// --- SEO (server-side)
export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const title = `Contact — ${brand}`;
  const description =
    "Talk to our team about managed IT, cybersecurity and support. We respond during business hours.";
  const url = "https://supremeitexperts.com/contact";

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      type: "website",
      url,
      images: ["https://supremeitexperts.com/og-image.png?v=7"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://supremeitexperts.com/og-image.png?v=7"],
    },
  };
}

export default function ContactPage() {
  const email = site?.email || "supremeitexperts@gmail.com";
  const phone = site?.phone || "+1 610-500-9209";
  const phoneHref = (phone || "").replace(/[^+\d]/g, ""); // keeps + and digits

  return (
    <>
      {/* Breadcrumbs + ContactPoint JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://supremeitexperts.com/" },
                { "@type": "ListItem", position: 2, name: "Contact", item: "https://supremeitexperts.com/contact" },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              name: site?.name || "Supreme IT Experts",
              url: "https://supremeitexperts.com",
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  contactType: "customer support",
                  email,
                  telephone: phoneHref ? `+${phoneHref.replace(/^\+?/, "")}` : undefined,
                  availableLanguage: ["English"],
                },
              ],
            },
          ]),
        }}
      />

      {/* full contact page UI (hero + cards + multi-step form etc.) */}
      <ContactClient mode="full" source="contact-page" tz="America/New_York" />
    </>
  );
}
