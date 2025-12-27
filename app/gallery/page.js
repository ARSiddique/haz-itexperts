// app/gallery/page.jsx
import PageHero from "@/components/PageHero";
import GalleryClient from "./GalleryClient";
import { site } from "@/lib/siteConfig";
import { BUSINESS_ID } from "@/lib/seoIds";

// --- SEO (server-side)
export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/gallery`;

  const title = `Gallery — ${brand}`;
  const description =
    "Racks, refreshes, dashboards, field jobs — a candid look at how we keep SMEs running.";

  const ogImage = `${baseUrl}/og-image.png?v=7`;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
      siteName: brand,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${brand} — Gallery` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

// Static data (Make sure files exist in /public/media)
const ALL_ITEMS = [
  { src: "/media/hero-1.jpg", t: "Fiber uplink test", tag: "Monitoring" },
  { src: "/media/hero-2.jpg", t: "Edge optics", tag: "Security" },
  { src: "/media/rack.jpg", t: "Rack & cabling", tag: "Racks" },
  { src: "/media/dashboard.jpg", t: "NOC dashboard", tag: "Monitoring" },
  { src: "/media/work-1.jpg", t: "Field deployment", tag: "Field work" },
  { src: "/media/work-2.jpg", t: "Cutover night", tag: "Field work" },
  { src: "/media/fiber.jpg", t: "Termination", tag: "Cabling" },
  { src: "/media/cabling.jpg", t: "Structured cabling", tag: "Cabling" },
  { src: "/media/datacenter.jpg", t: "Row refresh", tag: "Racks" },
  { src: "/media/firewall.jpg", t: "Firewall HA pair", tag: "Security" },
  { src: "/media/wifi.jpg", t: "Wi-Fi heatmap", tag: "Cloud" },
  { src: "/media/backup.jpg", t: "Backup / DR", tag: "Cloud" },
];

export default function GalleryPage() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/gallery`;

  // Only reference the website id (layout should define it globally)
  const WEBSITE_ID = `${baseUrl}/#website`;

  // Breadcrumb schema
  const breadcrumbsSchema = {
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
      { "@type": "ListItem", position: 2, name: "Gallery", item: canonical },
    ],
  };

  // CollectionPage schema
  const collectionPageSchema = {
    "@type": "CollectionPage",
    "@id": `${canonical}#collectionpage`,
    url: canonical,
    name: `Gallery — ${brand}`,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": BUSINESS_ID }, // ✅ reference only
    breadcrumb: { "@id": `${canonical}#breadcrumb` },
  };

  // ImageGallery schema
  const gallerySchema = {
    "@type": "ImageGallery",
    "@id": `${canonical}#imagegallery`,
    name: `${brand} Gallery`,
    url: canonical,
    isPartOf: { "@id": `${canonical}#collectionpage` },
    image: ALL_ITEMS.map((x, idx) => ({
      "@type": "ImageObject",
      "@id": `${canonical}#img-${idx + 1}`,
      contentUrl: `${baseUrl}${x.src}`,
      thumbnailUrl: `${baseUrl}${x.src}`,
      caption: x.t,
      name: x.t,
      representativeOfPage: idx === 0,
    })),
  };

  // ✅ One JSON-LD block (no Organization here)
  const pageJsonLd = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbsSchema, collectionPageSchema, gallerySchema],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />

      <PageHero
        eyebrow="GALLERY"
        title="Real work. Real environments."
        sub="Racks, refreshes, dashboards, field jobs — a candid look at how we keep SMEs running."
      />

      <GalleryClient items={ALL_ITEMS} />
    </>
  );
}
