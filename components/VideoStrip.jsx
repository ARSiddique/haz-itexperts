"use client";

import { PlayCircle } from "lucide-react";

export default function VideoStrip({ items = [] }) {
  return (
    <div className="grid md:grid-cols-2 gap-4 mt-6">
      {items.map((v, i) => (
        <article key={i} className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-cyan-300/30 transition">
          {/* header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div className="flex items-center gap-2 text-sm">
              <PlayCircle className="h-4 w-4 text-cyan-300" />
              <span className="font-medium">Customer story</span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-[11px]">
              <span className="px-2 py-1 rounded border border-white/10">P1 ≤ 15m</span>
              <span className="px-2 py-1 rounded border border-white/10">Uptime 99.9%</span>
            </div>
          </div>

          <div className="relative aspect-video bg-black/40">
            {v.src ? (
              <video controls playsInline preload="metadata" className="w-full h-full object-cover" poster={v.poster}>
                <source src={v.src} type="video/mp4" />
              </video>
            ) : (
              <div className="grid place-items-center w-full h-full text-slate-300">
                <div className="flex items-center gap-2">
                  <PlayCircle className="h-5 w-5 text-cyan-300" />
                  <span>Add {`/media/testimonials/t${i + 1}.mp4`}</span>
                </div>
              </div>
            )}
          </div>

          {v.caption && <div className="p-4 text-sm text-slate-300">{v.caption}</div>}
        </article>
      ))}
    </div>
  );
}
