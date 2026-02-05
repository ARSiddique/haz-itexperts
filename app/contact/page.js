// app/contact/page.js
import { site } from "@/lib/siteConfig";
import ContactClient from "./ContactClient";
import { BUSINESS_ID } from "@/lib/seoIds";

export async function generateMetadata() {
  const baseUrl = (site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/contact`;

  const title = "Contact (Allentown, PA)";
  const description = "Contact Supreme IT Experts for managed IT, cybersecurity and support.";

  return {
    // ✅ metadataBase yahan dena optional hai; root me already hai
    // metadataBase: new URL(baseUrl),

    title, // ✅ NO brand here
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title, // ✅ NO brand here
      description,
      url: canonical,
      type: "website",
    },
    twitter: {
      title, // ✅ optional but consistent
      description,
    },
  };
}

export default function ContactPage() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/contact`;

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
      { "@type": "ListItem", position: 2, name: "Contact", item: canonical },
    ],
  };

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${canonical}#contactpage`,
    url: canonical,

    // ✅ Schema name can include brand (no harm) OR keep it short.
    // I recommend keep it consistent with page title:
    name: `Contact (Allentown, PA) — ${brand}`,

    isPartOf: { "@type": "WebSite", "@id": `${baseUrl}/#website` },
    about: { "@id": BUSINESS_ID },
    breadcrumb: { "@id": `${canonical}#breadcrumb` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbsSchema, contactPageSchema]),
        }}
      />
      <ContactClient mode="full" source="contact-page" />
    </>
  );
}
