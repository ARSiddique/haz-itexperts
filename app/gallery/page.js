// app/gallery/page.jsx
import PageHero from "@/components/PageHero";
import GalleryClient from "./GalleryClient";

export const metadata = {
  title: "Gallery — Supreme IT Experts",
  description:
    "Racks, refreshes, dashboards, field jobs — a candid look at how we keep SMEs running.",
};

// Static data is safe to live on the server.
// (Make sure the files exist in /public/media)
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
  return (
    <>
      {/* HERO */}
      <PageHero
        eyebrow="GALLERY"
        title="Real work. Real environments."
        sub="Racks, refreshes, dashboards, field jobs — a candid look at how we keep SMEs running."
      />

      {/* Client island for interactivity */}
      <GalleryClient items={ALL_ITEMS} />
    </>
  );
}
