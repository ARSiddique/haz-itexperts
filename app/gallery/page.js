"use client";
/**
 * HaziTExperts — Gallery
 * Recommended images to place under /public/media/ :
 *  hero-1.jpg, hero-2.jpg, rack.jpg, dashboard.jpg, work-1.jpg, work-2.jpg,
 *  fiber.jpg, cabling.jpg, datacenter.jpg, firewall.jpg, wifi.jpg, backup.jpg
 */

import { useEffect, useMemo, useState, useCallback } from "react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Search, X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

/* ---------- tiny <Img> with SVG fallback ---------- */
function Img({ src, alt, className }) {
  const fallback =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'>
         <defs>
           <linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
             <stop offset='0' stop-color='#22d3ee'/><stop offset='1' stop-color='#a855f7'/>
           </linearGradient>
         </defs>
         <rect width='1200' height='800' fill='url(#g)'/>
         <g fill='rgba(255,255,255,.35)'>
           <circle cx='220' cy='240' r='120'/><rect x='650' y='420' width='420' height='220' rx='28'/>
         </g>
       </svg>`
    );
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
      }}
      loading="lazy"
      decoding="async"
    />
  );
}

/* ---------- data ---------- */
const ALL = [
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

/* ---------- chips ---------- */
const TAGS = ["All", "Racks", "Cabling", "Monitoring", "Cloud", "Field work", "Security"];

/* ---------- Lightbox ---------- */
function Lightbox({ open, items, index, onClose, onMove }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onMove(-1);
      if (e.key === "ArrowRight") onMove(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, onMove]);

  if (!open) return null;
  const it = items[index];

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="absolute inset-0 flex items-center justify-center p-4" onClick={(e)=>e.stopPropagation()}>
        <button
          className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15"
          aria-label="Close"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>

        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15"
          onClick={()=>onMove(-1)}
          aria-label="Prev"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <figure className="max-w-6xl w-full">
          <Img src={it.src} alt={it.t} className="w-full max-h-[75vh] object-contain rounded-xl shadow-2xl" />
          <figcaption className="mt-3 text-center text-sm text-slate-300">
            {it.t} <span className="text-slate-400">• {index+1}/{items.length}</span>
          </figcaption>
        </figure>

        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15"
          onClick={()=>onMove(1)}
          aria-label="Next"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}

/* ---------- page ---------- */
export default function GalleryPage() {
  const [tag, setTag] = useState("All");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [at, setAt] = useState(0);

  const filtered = useMemo(() => {
    const byTag = tag === "All" ? ALL : ALL.filter((x) => x.tag === tag);
    const n = q.trim().toLowerCase();
    return n ? byTag.filter((x) => x.t.toLowerCase().includes(n)) : byTag;
  }, [tag, q]);

  const openAt = useCallback((i) => { setAt(i); setOpen(true); }, []);
  const move = useCallback((dir) => {
    setAt((i) => (i + dir + filtered.length) % filtered.length);
  }, [filtered.length]);

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Real work. Real environments."
        sub="Racks, refreshes, dashboards, field jobs — a candid look at how we keep SMEs running."
      />

      <section className="max-w-6xl mx-auto px-4 pb-24">
        {/* controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {TAGS.map((t) => (
              <button
                key={t}
                onClick={() => setTag(t)}
                className={`px-3 py-1.5 rounded-lg text-xs border transition ${
                  tag === t
                    ? "border-cyan-300/40 text-cyan-300 bg-cyan-400/10"
                    : "border-white/10 text-slate-300 hover:bg-white/5"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-slate-900/50 px-3 py-2">
            <Search className="h-4 w-4 text-cyan-300" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search captions…"
              className="bg-transparent outline-none text-sm w-56"
            />
          </label>
        </div>

        {/* masonry grid */}
        <div
          className="
            mt-6 [column-fill:_balance]
            columns-1 sm:columns-2 lg:columns-3
            gap-4
          "
        >
          {filtered.map((it, i) => (
            <Reveal key={it.src + i}>
              <figure
                className="
                  relative mb-4 break-inside-avoid rounded-2xl overflow-hidden
                  border border-white/10 group
                "
              >
                <Img
                  src={it.src}
                  alt={it.t}
                  className="
                    w-full h-auto object-cover
                    transition-transform duration-500 group-hover:scale-[1.03]
                  "
                />
                {/* tag chip */}
                <span className="absolute left-3 top-3 text-[11px] px-2 py-0.5 rounded-full bg-black/45 backdrop-blur ring-1 ring-white/15">
                  {it.tag}
                </span>
                {/* caption */}
                <figcaption
                  className="
                    absolute bottom-0 left-0 right-0
                    translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0
                    transition-all duration-300
                    bg-gradient-to-t from-black/70 to-transparent
                    p-3 text-sm
                  "
                >
                  {it.t}
                </figcaption>
                {/* open button */}
                <button
                  onClick={() => openAt(i)}
                  className="
                    absolute inset-0
                    bg-gradient-to-tr from-cyan-500/0 to-fuchsia-500/0
                    hover:from-cyan-500/10 hover:to-fuchsia-500/10
                  "
                  aria-label="Open"
                  title="Open"
                />
              </figure>
            </Reveal>
          ))}
        </div>

        {/* empty state */}
        {filtered.length === 0 && (
          <div className="mt-10 rounded-xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
            Nothing matched — try a different tag or keyword.
          </div>
        )}

        {/* CTA strip */}
        <Reveal className="mt-12">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/15 to-fuchsia-500/15 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">Want the full tour?</h3>
              <p className="text-slate-300">We’ll walkthrough our stack, reporting, and a before/after case.</p>
            </div>
            <a
              href="/get-quote"
              className="rounded-lg px-5 py-3 font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 inline-flex items-center gap-2"
            >
              Book a demo <Sparkles className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </section>

      {/* Lightbox */}
      <Lightbox open={open} items={filtered} index={at} onClose={()=>setOpen(false)} onMove={move} />
    </>
  );
}
