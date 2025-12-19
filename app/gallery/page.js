// app/gallery/page.jsx
import PageHero from "@/components/PageHero";
import GalleryClient from "./GalleryClient";
import { site } from "@/lib/siteConfig";

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

  // ✅ Keep same IDs across site (if your layout uses these, great)
  const WEBSITE_ID = `${baseUrl}/#website`;
  const ORG_ID = `${baseUrl}/#organization`;

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
      { "@type": "ListItem", position: 2, name: "Gallery", item: canonical },
    ],
  };

  // ✅ WebPage/CollectionPage for better page understanding
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${canonical}#collectionpage`,
    url: canonical,
    name: `Gallery — ${brand}`,
    isPartOf: { "@type": "WebSite", "@id": WEBSITE_ID },
    about: { "@type": "Organization", "@id": ORG_ID },
    breadcrumb: { "@id": `${canonical}#breadcrumb` },
  };

  // ✅ Gallery schema
  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": `${canonical}#imagegallery`,
    name: `${brand} Gallery`,
    url: canonical,
    isPartOf: { "@type": "WebPage", "@id": `${canonical}#collectionpage` },
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

  // ✅ Optional: Organization stub (ONLY if your layout doesn’t already inject it)
  // If layout already has Organization JSON-LD, you can remove this block.
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: brand,
    url: baseUrl,
    telephone: site?.phone || "+1-610-500-9209",
  };

  return (
    <>
      {/* JSON-LD: Breadcrumbs + CollectionPage + ImageGallery (+ optional org) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbsSchema, collectionPageSchema, gallerySchema, orgSchema]),
        }}
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
