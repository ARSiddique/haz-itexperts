// app/contact/page.js
import { site } from "@/lib/siteConfig";
import ContactClient from "./ContactClient";

// --- SEO (server-side)
export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/contact`;

  const title = "Contact"; // ✅ layout template already adds brand
  const description =
    "Talk to our team about managed IT, cybersecurity and support. We respond during business hours.";

  const ogImage = `${baseUrl}/og-image.png?v=7`;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },

    openGraph: {
      title: `Contact | ${brand}`,
      description,
      type: "website",
      url: canonical,
      siteName: brand,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${brand} — Contact` }],
    },

    twitter: {
      card: "summary_large_image",
      title: `Contact | ${brand}`,
      description,
      images: [ogImage],
    },
  };
}

export default function ContactPage() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/contact`;

  const email = site?.email || "supremeitexperts@gmail.com";
  const phoneRaw = site?.phone || "+1 610-500-9209";
  const digits = String(phoneRaw).replace(/[^\d+]/g, "");
  const phoneE164 = digits.startsWith("+") ? digits : `+${digits}`;

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
      { "@type": "ListItem", position: 2, name: "Contact", item: canonical },
    ],
  };

  // ✅ re-use global org id from layout
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${canonical}#contactpage`,
    url: canonical,
    name: `Contact | ${brand}`,
    isPartOf: { "@type": "WebSite", "@id": `${baseUrl}/#website` },
    about: { "@type": "Organization", "@id": `${baseUrl}/#organization` },
    breadcrumb: { "@id": `${canonical}#breadcrumb` },
  };

  // ✅ ContactPoint (attach to same org id)
  const orgContactSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: brand,
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
      {/* Breadcrumbs + ContactPage + ContactPoint JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbsSchema, contactPageSchema, orgContactSchema]),
        }}
      />

      <ContactClient mode="full" source="contact-page" tz="America/New_York" />
    </>
  );
}
