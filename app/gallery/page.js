// app/gallery/page.jsx
import PageHero from "@/components/PageHero";
import GalleryClient from "./GalleryClient";
import { site } from "@/lib/siteConfig";

// --- SEO (server-side)
export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = site?.url || "https://supremeitexperts.com";

  const title = `Gallery — ${brand}`;
  const description =
    "Racks, refreshes, dashboards, field jobs — a candid look at how we keep SMEs running.";

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    alternates: { canonical: "/gallery" },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${baseUrl}/gallery`,
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
  const baseUrl = site?.url || "https://supremeitexperts.com";

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
      { "@type": "ListItem", position: 2, name: "Gallery", item: `${baseUrl}/gallery` },
    ],
  };

  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Supreme IT Experts Gallery",
    url: `${baseUrl}/gallery`,
    image: ALL_ITEMS.map((x) => ({
      "@type": "ImageObject",
      contentUrl: `${baseUrl}${x.src}`,
      caption: x.t,
    })),
  };

  return (
    <>
      {/* Breadcrumbs JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />

      {/* Gallery JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }}
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
