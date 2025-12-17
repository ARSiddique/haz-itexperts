// app/contact/page.js
import { site } from "@/lib/siteConfig";
import ContactClient from "./ContactClient";

// --- SEO (server-side)
export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = site?.url || "https://supremeitexperts.com";

  const title = `Contact — ${brand}`;
  const description =
    "Talk to our team about managed IT, cybersecurity and support. We respond during business hours.";

  return {
    title,
    description,
    alternates: { canonical: "/contact" },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${baseUrl}/contact`,
      images: [`${baseUrl}/og-image.png?v=7`],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/og-image.png?v=7`],
    },
  };
}

export default function ContactPage() {
  const baseUrl = site?.url || "https://supremeitexperts.com";
  const email = site?.email || "supremeitexperts@gmail.com";
  const phoneRaw = site?.phone || "+1 610-500-9209";

  // normalize phone for schema (E.164-ish)
  const digits = String(phoneRaw).replace(/[^\d+]/g, "");
  const phoneE164 = digits.startsWith("+") ? digits : `+${digits}`;

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
      { "@type": "ListItem", position: 2, name: "Contact", item: `${baseUrl}/contact` },
    ],
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site?.name || "Supreme IT Experts",
    url: baseUrl,
    email,
    telephone: phoneE164,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email,
        telephone: phoneE164,
        availableLanguage: ["English"],
      },
    ],
  };

  return (
    <>
      {/* Breadcrumbs + Organization/ContactPoint JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbsSchema, orgSchema]),
        }}
      />

      {/* full contact page UI */}
      <ContactClient mode="full" source="contact-page" tz="America/New_York" />
    </>
  );
}
