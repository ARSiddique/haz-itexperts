"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import {
  MapPin, Clock, Route, ShieldCheck, Search, ArrowRight,
  ChevronDown, Bus, Truck, CalendarDays, Laptop2, Server, Shield
} from "lucide-react";

/* ---------- Safe <img> with SVG fallback ---------- */
function Img({ src, alt, className }) {
  const fallback =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'>
         <defs>
           <linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
             <stop offset='0' stop-color='#22d3ee'/>
             <stop offset='1' stop-color='#a855f7'/>
           </linearGradient>
           <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
             <path d="M40 0 H0 V40" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
           </pattern>
         </defs>
         <rect width='1200' height='800' fill='url(#g)'/>
         <rect width='1200' height='800' fill='url(#grid)'/>
       </svg>`
    );
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => { if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback; }}
      loading="lazy"
      decoding="async"
    />
  );
}

/* ---------- MSP coverage data (edit freely) ---------- */
const REGIONS = [
  {
    key: "punjab",
    name: "Punjab",
    color: "#22d3ee",
    cities: [
      { name: "Lahore",       tier: "A", sla: "P1 ≤ 15 min", onsite: "Mon–Sat", pin: [38, 46] },
      { name: "Rawalpindi",   tier: "A", sla: "P1 ≤ 15 min", onsite: "Mon–Fri", pin: [32, 30] },
      { name: "Faisalabad",   tier: "B", sla: "P1 ≤ 30 min", onsite: "Tue–Sat", pin: [34, 42] },
      { name: "Multan",       tier: "B", sla: "P1 ≤ 30 min", onsite: "Wed–Sat", pin: [30, 56] },
      { name: "Gujranwala",   tier: "B", sla: "P1 ≤ 30 min", onsite: "Tue–Fri", pin: [40, 43] },
    ],
  },
  {
    key: "sindh",
    name: "Sindh",
    color: "#a855f7",
    cities: [
      { name: "Karachi",      tier: "A", sla: "P1 ≤ 15 min", onsite: "Mon–Sat", pin: [68, 72] },
      { name: "Hyderabad",    tier: "B", sla: "P1 ≤ 30 min", onsite: "Tue–Fri", pin: [62, 66] },
      { name: "Sukkur",       tier: "C", sla: "P1 ≤ 60 min", onsite: "Wed/Fri", pin: [58, 48] },
    ],
  },
  {
    key: "kpk",
    name: "Khyber Pakhtunkhwa",
    color: "#34d399",
    cities: [
      { name: "Peshawar",     tier: "B", sla: "P1 ≤ 30 min", onsite: "Tue–Fri", pin: [26, 26] },
      { name: "Abbottabad",   tier: "C", sla: "P1 ≤ 60 min", onsite: "Wed",     pin: [30, 24] },
      { name: "Mardan",       tier: "C", sla: "P1 ≤ 60 min", onsite: "Thu",     pin: [28, 28] },
    ],
  },
  {
    key: "isb",
    name: "Islamabad Capital",
    color: "#f59e0b",
    cities: [
      { name: "Islamabad",    tier: "A", sla: "P1 ≤ 15 min", onsite: "Mon–Fri", pin: [34, 30] },
    ],
  },
  {
    key: "balochistan",
    name: "Balochistan",
    color: "#f97316",
    cities: [
      { name: "Quetta",       tier: "C", sla: "P1 ≤ 60 min", onsite: "Thu/Fri", pin: [16, 54] },
      { name: "Gwadar",       tier: "C", sla: "P1 ≤ 60 min", onsite: "Route-based", pin: [10, 70] },
    ],
  },
];

/* ---------- Tier legend ---------- */
const TIER_COPY = {
  A: { label: "Tier A", note: "Metro, fastest dispatch",  bg: "bg-emerald-500/15", ring: "ring-emerald-400/30" },
  B: { label: "Tier B", note: "Extended metro, fast",     bg: "bg-cyan-500/15",    ring: "ring-cyan-400/30" },
  C: { label: "Tier C", note: "Route-based onsite",       bg: "bg-fuchsia-500/15", ring: "ring-fuchsia-400/30" },
};

/* ---------- small UI helpers ---------- */
const Pill = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-[12px] border border-white/10 bg-white/5">
    {children}
  </span>
);

const TierBadge = ({ tier }) => {
  const t = TIER_COPY[tier] || TIER_COPY.C;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] text-slate-100 ring ${t.bg} ${t.ring}`}>
      {t.label}
    </span>
  );
};

/* ---------- Abstract Pakistan map with animated pins ---------- */
function PakistanMap({ regions, active, onPick }) {
  return (
    <div className="relative rounded-2xl border border-white/10 overflow-hidden bg-gradient-to-br from-white/[0.04] to-white/[0.02]">
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.18),transparent_60%)]" />
      <svg viewBox="0 0 100 100" className="w-full h-[360px] md:h-[500px]">
        {/* abstract silhouette */}
        <g className="fill-white/6 stroke-white/10">
          <path d="M8,52 C16,28 36,18 46,16 C58,14 66,20 76,28 C88,38 92,50 86,64 C82,74 70,82 58,84 C44,86 32,80 24,72 C14,62 10,58 8,52 Z" />
        </g>
        {/* pins */}
        {regions.map((r) =>
          r.cities.map((c) => (
            <g key={r.key + c.name} className="cursor-pointer" onClick={() => onPick(r.key)}>
              <circle cx={c.pin[0]} cy={c.pin[1]} r="1.1" fill={r.color} className="opacity-90">
                <animate attributeName="r" values="0.8;1.2;0.8" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx={c.pin[0]} cy={c.pin[1]} r="2.2" fill="none" stroke={r.color} strokeWidth="0.2" className="opacity-40">
                <animate attributeName="r" values="1.6;2.4;1.6" dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0.2;0.5" dur="2.4s" repeatCount="indefinite" />
              </circle>
            </g>
          ))
        )}
      </svg>

      {/* region pills + CTA */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {regions.map((r) => (
            <button
              key={r.key}
              onClick={() => onPick(r.key)}
              className={`px-3 py-1.5 text-xs rounded-lg border transition ${
                active === r.key
                  ? "border-cyan-300/40 text-cyan-300 bg-cyan-400/10"
                  : "border-white/10 text-slate-300 hover:bg-white/5"
              }`}
            >
              {r.name}
            </button>
          ))}
        </div>
        <Link
          href="/get-quote"
          className="text-xs rounded-lg px-3 py-1.5 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
        >
          Get Quote
        </Link>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */
export default function AreasPage() {
  const [active, setActive] = useState("punjab");
  const [q, setQ] = useState("");

  const region = useMemo(
    () => REGIONS.find((r) => r.key === active) || REGIONS[0],
    [active]
  );

  const filteredCities = useMemo(() => {
    const n = q.trim().toLowerCase();
    const list = region.cities.filter((c) => !n || c.name.toLowerCase().includes(n));
    // sort by tier A→C then name
    const order = { A: 0, B: 1, C: 2 };
    return list.sort((a, b) => (order[a.tier] - order[b.tier]) || a.name.localeCompare(b.name));
  }, [region, q]);

  return (
    <>
      {/* HERO */}
      <PageHero
        eyebrow="Areas we serve"
        title="MSP-grade coverage — onsite where it matters, remote everywhere"
        sub="Metro tiers for dispatch SLAs, route-based onsite for extended regions, and 24/7 remote helpdesk across Pakistan."
      />

      <section className="max-w-6xl mx-auto px-4 pb-24">
        {/* MAP + CITY PANEL */}
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <Reveal>
            <PakistanMap regions={REGIONS} active={active} onPick={setActive} />
          </Reveal>

          <Reveal>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">Region</div>
                  <h2 className="text-xl font-semibold">{region.name}</h2>
                </div>
                <Pill><ShieldCheck className="h-4 w-4 text-cyan-300" /> SLA-backed</Pill>
              </div>

              {/* Search inside region */}
              <label className="mt-4 flex items-center gap-2 rounded-lg border border-white/10 bg-slate-900/50 px-3 py-2">
                <Search className="h-4 w-4 text-cyan-300" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Find a city in this region…"
                  className="w-full bg-transparent outline-none text-sm"
                />
              </label>

              {/* Cities list */}
              <div className="mt-4 grid gap-3">
                {filteredCities.map((c) => (
                  <div
                    key={c.name}
                    className="rounded-xl border border-white/10 bg-white/5 p-4 hover:border-cyan-300/30 hover:-translate-y-0.5 transition"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="grid place-items-center size-8 rounded-lg bg-white/5 border border-white/10">
                          <MapPin className="h-4 w-4 text-cyan-300" />
                        </span>
                        <div>
                          <div className="font-medium">{c.name}</div>
                          <div className="text-xs text-slate-400 flex items-center gap-2">
                            <TierBadge tier={c.tier} />
                            <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {c.sla}</span>
                          </div>
                        </div>
                      </div>
                      <Pill><CalendarDays className="h-4 w-4 text-cyan-300" /> Onsite: {c.onsite}</Pill>
                    </div>
                  </div>
                ))}

                {filteredCities.length === 0 && (
                  <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
                    No matches — try a different name.
                  </div>
                )}
              </div>

              <div className="mt-5 flex gap-2">
                <Link
                  href="/get-quote"
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
                >
                  Ask about coverage <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm border border-white/10 bg-white/5 hover:bg-white/10"
                >
                  Contact
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        {/* MSP STACK PROMISE (unique to MSP context) */}
        <Reveal className="mt-12">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">Everywhere you are</div>
            <h3 className="text-lg font-semibold">Same security-first stack in every city</h3>
            <div className="grid sm:grid-cols-3 gap-4 mt-4 text-sm">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2 font-medium"><Laptop2 className="h-4 w-4 text-cyan-300" /> Endpoints</div>
                <ul className="mt-2 space-y-1 text-slate-300">
                  <li>• Patching & health</li>
                  <li>• MDM baselines</li>
                  <li>• App catalogs</li>
                </ul>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2 font-medium"><Server className="h-4 w-4 text-cyan-300" /> Infra & Cloud</div>
                <ul className="mt-2 space-y-1 text-slate-300">
                  <li>• Monitoring & backups</li>
                  <li>• Identity & IAM</li>
                  <li>• Cost hygiene</li>
                </ul>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2 font-medium"><Shield className="h-4 w-4 text-cyan-300" /> Security</div>
                <ul className="mt-2 space-y-1 text-slate-300">
                  <li>• EDR/XDR 99.9%</li>
                  <li>• Email security+</li>
                  <li>• BCP/DR drills</li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* WEEKLY ROUTES (for onsite dispatch) */}
        <Reveal className="mt-12">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">Weekly routes</div>
                <h3 className="text-lg font-semibold">How onsite dispatch works</h3>
              </div>
              <Pill><Route className="h-4 w-4 text-cyan-300" /> Predictable coverage</Pill>
            </div>

            <div className="grid md:grid-cols-5 gap-4 mt-4 text-sm">
              {[
                ["Mon", "Lahore ↔ Faisalabad", "8:00–18:00", Bus],
                ["Tue", "Karachi ↔ Hyderabad", "8:00–18:00", Truck],
                ["Wed", "Islamabad ↔ Rawalpindi", "8:00–18:00", Bus],
                ["Thu", "Multan ↔ Faisalabad", "8:00–18:00", Bus],
                ["Fri", "Quetta (route-based)", "Window 10:00–16:00", Truck],
              ].map(([d, r, t, Icon]) => (
                <div key={d} className="rounded-xl border border-white/10 bg-white/5 p-4 hover:border-cyan-300/30 hover:-translate-y-0.5 transition">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-cyan-300" />
                    <div className="font-medium">{d}</div>
                  </div>
                  <div className="text-slate-200 mt-1">{r}</div>
                  <div className="text-slate-400 text-xs">{t}</div>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-400 mt-3">
              Note: Emergency/P1 onsite outside schedule possible per availability. Remote always-on.
            </p>
          </div>
        </Reveal>

        {/* VISUAL STRIP */}
        <Reveal className="mt-12">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              ["/media/rack.jpg", "Metro dispatch"],
              ["/media/dashboard.jpg", "Monitoring everywhere"],
              ["/media/work-1.jpg", "Onsite without chaos"],
            ].map(([src, cap]) => (
              <figure key={src} className="relative rounded-2xl overflow-hidden border border-white/10 group">
                <Img src={src} alt={cap} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
                <figcaption className="absolute bottom-2 left-2 text-xs bg-black/40 backdrop-blur px-2 py-1 rounded">
                  {cap}
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>

        {/* REGION ACCORDION (compact overview) */}
        <Reveal className="mt-12">
          <div className="rounded-2xl border border-white/10 bg-white/5">
            {REGIONS.map((r) => (
              <details key={r.key} className="border-b border-white/10 last:border-none group open:bg-white/[0.03]" open={r.key===active}>
                <summary
                  className="cursor-pointer list-none px-4 md:px-6 py-4 flex items-center justify-between"
                  onClick={() => setActive(r.key)}
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-block size-3 rounded-full" style={{ background: r.color }} />
                    <div className="font-medium">{r.name}</div>
                    <span className="text-xs text-slate-400">{r.cities.length} cities</span>
                  </div>
                  <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
                </summary>
                <div className="px-4 md:px-6 pb-4">
                  <div className="flex flex-wrap gap-2">
                    {r.cities.map((c) => (
                      <span key={c.name} className="text-sm rounded-lg px-3 py-1.5 border border-white/10 bg-white/5">
                        {c.name} • <span className="text-slate-400">{c.onsite}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal className="mt-12">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/15 to-fuchsia-500/15 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">Not seeing your city?</h3>
              <p className="text-slate-300">Remote coverage anywhere. Onsite coverage expands based on demand.</p>
            </div>
            <div className="flex gap-3">
              <Link href="/get-quote" className="rounded-lg px-5 py-3 font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20">Request coverage</Link>
              <Link href="/contact" className="rounded-lg px-5 py-3 font-semibold bg-white/10 ring-1 ring-white/20 hover:bg-white/20">Talk to us</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
