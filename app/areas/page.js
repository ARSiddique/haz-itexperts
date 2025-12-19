// app/areas/page.js
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/siteConfig";
import {
  MapPin,
  ShieldCheck,
  Search,
  ArrowRight,
  ChevronDown,
  Clock,
  Laptop2,
  Server,
  Shield,
  ExternalLink,
} from "lucide-react";

// ✅ SEO (server-side) — handles query params to avoid duplicate indexing
export async function generateMetadata({ searchParams }) {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/areas`;

  const sp = (await searchParams) || {};
  const regionParam = Array.isArray(sp.region) ? sp.region[0] : sp.region;
  const qParam = Array.isArray(sp.q) ? sp.q[0] : sp.q;
  const hasFilters = Boolean(regionParam || qParam);

  const titleCore = "Areas We Serve";
  const title = `${titleCore} | ${brand}`;
  const description =
    "Remote-first managed IT services and cybersecurity for SMBs across Allentown, Macungie, and Emmaus — with clear SLAs, fast response, and consistent service.";

  const ogImage = `${baseUrl}/og-image.png?v=7`;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    alternates: { canonical },

    // ✅ index only the clean /areas URL
    robots: hasFilters
      ? { index: false, follow: true }
      : { index: true, follow: true },

    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
      siteName: brand,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${brand} — Areas We Serve`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

const REGIONS = [
  {
    key: "lehigh",
    name: "Lehigh Valley, PA",
    color: "#34d399",
    cities: [
      { name: "Allentown, PA", slug: "allentown-pa", tier: "A", sla: "P1 ≤ 15 min", pin: [60, 34] },
      { name: "Macungie, PA", slug: "macungie-pa", tier: "A", sla: "P1 ≤ 15 min", pin: [62, 36] },
      { name: "Emmaus, PA", slug: "emmaus-pa", tier: "A", sla: "P1 ≤ 15 min", pin: [61, 35] },
    ],
  },
];

const TIER = {
  A: { label: "Tier A", note: "Fastest remote response", bg: "bg-emerald-500/15", ring: "ring-emerald-400/30" },
  B: { label: "Tier B", note: "Fast remote response", bg: "bg-cyan-500/15", ring: "ring-cyan-400/30" },
  C: { label: "Tier C", note: "Standard remote response", bg: "bg-fuchsia-500/15", ring: "ring-fuchsia-400/30" },
};

const SHARED_SERVICES = [
  {
    title: "Managed IT (SupremeCare™)",
    bullets: ["Helpdesk with P1 ≤ 15 min response", "Proactive monitoring & patching", "Asset & license management"],
    href: "/services/managed-it",
  },
  {
    title: "Cybersecurity (EDR/XDR + Hardening)",
    bullets: ["Identity-first security controls", "Phishing defense + training", "Immutable backups + recovery drills"],
    href: "/services/cybersecurity",
  },
  {
    title: "Cloud & Microsoft 365",
    bullets: ["Tenant security & governance", "Exchange/SharePoint/Teams tuning", "Microsoft 365 backup & restores"],
    href: "/services/cloud-workspace",
  },
  {
    title: "Projects & Consulting",
    bullets: ["Network refresh planning", "Migrations & rebrands", "Decommissions with clean handover"],
    href: "/services/projects-consulting",
  },
  {
    title: "vCIO / Strategy",
    bullets: ["Roadmaps & budgets", "Vendor consolidation", "Exec-ready KPIs & reporting"],
    href: "/services/vcio-strategy",
  },
];

const normalize = (s) => s.toLowerCase().replace(/\s+/g, " ").trim();

const Pill = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-[12px] border border-white/10 bg-white/5">
    {children}
  </span>
);

function TierBadge({ tier }) {
  const t = TIER[tier] || TIER.C;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] text-slate-100 ring ${t.bg} ${t.ring}`}
      title={t.note}
    >
      {t.label}
    </span>
  );
}

function RegionMap({ regions, active }) {
  const buildHref = (key) => {
    const params = new URLSearchParams();
    params.set("region", key);
    return `/areas?${params.toString()}`;
  };

  return (
    <div className="relative rounded-2xl border border-white/10 overflow-hidden bg-gradient-to-br from-white/[0.04] to-white/[0.02]">
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.18),transparent_60%)]" />

      <svg viewBox="0 0 100 100" className="w-full h-[360px] md:h-[500px]">
        <g className="fill-white/6 stroke-white/10">
          <path d="M28,20 C34,16 46,14 58,18 C68,21 76,28 82,36 C88,44 92,54 88,64 C84,72 76,78 66,82 C58,84 48,85 40,82 C28,78 22,70 18,60 C14,50 16,40 20,32 C22,26 24,22 28,20 Z" />
        </g>

        {regions.map((r) =>
          r.cities.map((c) => (
            <a key={r.key + c.name} href={buildHref(r.key)} aria-label={`View ${r.name}`}>
              <circle cx={c.pin[0]} cy={c.pin[1]} r="1.15" fill={r.color} className="opacity-90" />
              <circle
                cx={c.pin[0]}
                cy={c.pin[1]}
                r="2.3"
                fill="none"
                stroke={r.color}
                strokeWidth="0.2"
                className="opacity-40"
              />
            </a>
          ))
        )}
      </svg>

      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {regions.map((r) => (
            <a
              key={r.key}
              href={buildHref(r.key)}
              className={`px-3 py-1.5 text-xs rounded-lg border transition ${
                active === r.key
                  ? "border-cyan-300/40 text-cyan-300 bg-cyan-400/10"
                  : "border-white/10 text-slate-300 hover:bg-white/5"
              }`}
            >
              {r.name}
            </a>
          ))}
        </div>

        <Link
          href="/contact?type=assessment&source=areas"
          className="text-xs rounded-lg px-3 py-1.5 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
        >
          Book a 20-min Assessment
        </Link>
      </div>
    </div>
  );
}

export default async function AreasPage({ searchParams }) {
  const baseUrl = (site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const brand = site?.name || "Supreme IT Experts";
  const canonical = `${baseUrl}/areas`;

  const sp = (await searchParams) || {};
  const regionParam = Array.isArray(sp.region) ? sp.region[0] : sp.region;
  const qParam = Array.isArray(sp.q) ? sp.q[0] : sp.q;

  const regionKey = (regionParam ?? "lehigh").toString();
  const q = (qParam ?? "").toString();

  const region =
    REGIONS.find((r) => r.key === regionKey) ??
    REGIONS.find((r) => r.key === "lehigh") ??
    REGIONS[0];

  const nq = normalize(q);
  const order = { A: 0, B: 1, C: 2 };

  const filtered = region.cities
    .filter((c) => !nq || normalize(c.name).includes(nq))
    .sort((a, b) => order[a.tier] - order[b.tier] || a.name.localeCompare(b.name));

  const popularLocations = [
    { name: "Allentown, PA", slug: "allentown-pa" },
    { name: "Macungie, PA", slug: "macungie-pa" },
    { name: "Emmaus, PA", slug: "emmaus-pa" },
  ];

  // ---- JSON-LD (clean + avoids duplicating org schema if it already exists globally)
  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
      { "@type": "ListItem", position: 2, name: "Areas We Serve", item: canonical },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${canonical}#locations`,
    name: "Popular IT Support Locations",
    itemListElement: popularLocations.map((x, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: x.name,
      url: `${baseUrl}/locations/${x.slug}`,
    })),
  };

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${canonical}#collection`,
    name: "Areas We Serve",
    url: canonical,
    isPartOf: { "@type": "WebSite", "@id": `${baseUrl}/#website` },
    publisher: { "@type": "Organization", "@id": `${baseUrl}/#organization` },
    breadcrumb: { "@id": `${canonical}#breadcrumb` },
    about: { "@type": "Service", name: "Managed IT Services & Cybersecurity" },
    description:
      "Remote-first managed IT services and cybersecurity across Allentown, Macungie, Emmaus and the Lehigh Valley.",
  };

  return (
    <>
      {/* Breadcrumbs + CollectionPage + ItemList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbsSchema, collectionPageSchema, itemListSchema]),
        }}
      />

      <PageHero
        eyebrow="Areas we serve"
        title="Remote-first IT support across the Lehigh Valley"
        sub="We support SMBs across Allentown, Macungie, and Emmaus with fast remote response, clear SLAs, and consistent service."
      />

      <section className="max-w-6xl mx-auto px-4 pb-24">
        {/* Quick internal links to dedicated location pages */}
        <Reveal className="mt-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-5">
            <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">Popular locations</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {popularLocations.map((x) => (
                <Link
                  key={x.slug}
                  href={`/locations/${x.slug}`}
                  className="inline-flex items-center gap-2 text-xs rounded-lg px-3 py-1.5 border border-white/10 bg-white/5 hover:border-cyan-300/30 hover:bg-cyan-400/10"
                >
                  <MapPin className="h-3.5 w-3.5 text-cyan-300" />
                  {x.name}
                  <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                </Link>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6 items-start mt-6">
          <Reveal>
            <RegionMap regions={REGIONS} active={region.key} />
          </Reveal>

          <Reveal>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">Region</div>
                  <h2 className="text-xl font-semibold">{region.name}</h2>
                </div>
                <Pill>
                  <ShieldCheck className="h-4 w-4 text-cyan-300" /> SLA-backed
                </Pill>
              </div>

              <form action="/areas" method="get" className="mt-4">
                <input type="hidden" name="region" value={region.key} />
                <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-slate-900/50 px-3 py-2">
                  <Search className="h-4 w-4 text-cyan-300" aria-hidden="true" />
                  <input
                    name="q"
                    defaultValue={q}
                    placeholder="Find a city in this region…"
                    className="w-full bg-transparent outline-none text-sm"
                    aria-label={`Search cities in ${region.name}`}
                  />
                </label>
                <div className="mt-2">
                  <button className="text-xs rounded-lg px-3 py-1.5 border border-white/10 bg-white/5 hover:bg-white/10">
                    Apply
                  </button>
                </div>
              </form>

              <div className="mt-4 grid gap-3">
                {filtered.map((c) => (
                  <div
                    key={c.name}
                    className="rounded-xl border border-white/10 bg-white/5 p-4 hover:border-cyan-300/30 hover:-translate-y-0.5 transition"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2">
                        <span className="mt-0.5 grid place-items-center size-8 rounded-lg bg-white/5 border border-white/10">
                          <MapPin className="h-4 w-4 text-cyan-300" />
                        </span>
                        <div>
                          <div className="font-medium">{c.name}</div>
                          <div className="text-xs text-slate-400 flex flex-wrap items-center gap-2 mt-1">
                            <TierBadge tier={c.tier} />
                            <span className="inline-flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" /> {c.sla}
                            </span>
                            <span className="text-slate-500">• Remote support</span>
                          </div>

                          {c.slug && (
                            <div className="mt-3">
                              <Link
                                href={`/locations/${c.slug}`}
                                className="inline-flex items-center gap-2 text-xs rounded-lg px-3 py-1.5 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
                              >
                                View location page <ExternalLink className="h-3.5 w-3.5" />
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>

                      <Pill>
                        <ShieldCheck className="h-4 w-4 text-cyan-300" /> Coverage
                      </Pill>
                    </div>
                  </div>
                ))}

                {filtered.length === 0 && (
                  <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
                    No matches — try a different name.
                  </div>
                )}
              </div>

              <div className="mt-5 flex gap-2">
                <Link
                  href="/contact?type=assessment&source=areas-region"
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
                >
                  Book a 20-min Assessment <ArrowRight className="h-4 w-4" />
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

        {/* Services section */}
        <Reveal className="mt-12">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">Every location, same value</div>
            <h3 className="text-lg font-semibold">Managed IT & cybersecurity — remote-first delivery</h3>

            <div className="grid sm:grid-cols-3 gap-4 mt-4 text-sm">
              {SHARED_SERVICES.map((s) => (
                <div key={s.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-medium">{s.title}</div>
                    {s.href && (
                      <Link href={s.href} className="text-xs text-cyan-300 hover:underline">
                        View
                      </Link>
                    )}
                  </div>
                  <ul className="mt-2 space-y-1 text-slate-300">
                    {s.bullets.map((b) => (
                      <li key={b}>• {b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:bg-white/10"
              >
                View all services <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact?type=assessment&source=areas-services"
                className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
              >
                Book a 20-min Assessment <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Same stack everywhere */}
        <Reveal className="mt-12">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">How we deliver</div>
            <h3 className="text-lg font-semibold">Consistent, security-first stack (remote)</h3>

            <div className="grid sm:grid-cols-3 gap-4 mt-4 text-sm">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2 font-medium">
                  <Laptop2 className="h-4 w-4 text-cyan-300" /> Endpoints
                </div>
                <ul className="mt-2 space-y-1 text-slate-300">
                  <li>• Patching &amp; health</li>
                  <li>• Device baselines</li>
                  <li>• App catalogs</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2 font-medium">
                  <Server className="h-4 w-4 text-cyan-300" /> Cloud &amp; Identity
                </div>
                <ul className="mt-2 space-y-1 text-slate-300">
                  <li>• Monitoring &amp; backups</li>
                  <li>• IAM / MFA / SSO</li>
                  <li>• Governance</li>
                </ul>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2 font-medium">
                  <Shield className="h-4 w-4 text-cyan-300" /> Security
                </div>
                <ul className="mt-2 space-y-1 text-slate-300">
                  <li>• EDR/XDR</li>
                  <li>• Email security</li>
                  <li>• Recovery drills</li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Region accordions */}
        <Reveal className="mt-12">
          <div className="rounded-2xl border border-white/10 bg-white/5">
            {REGIONS.map((r) => {
              const href = `/areas?region=${r.key}${q ? `&q=${encodeURIComponent(q)}` : ""}`;

              return (
                <details
                  key={r.key}
                  className="border-b border-white/10 last:border-none group open:bg-white/[0.03]"
                  open={r.key === region.key}
                >
                  <summary className="cursor-pointer list-none px-4 md:px-6 py-4 flex items-center justify-between">
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
                        <div key={c.name} className="flex flex-wrap gap-2">
                          <span className="text-sm rounded-lg px-3 py-1.5 border border-white/10 bg-white/5">
                            {c.name} • <span className="text-slate-400">{c.sla}</span>
                          </span>

                          {c.slug && (
                            <Link
                              href={`/locations/${c.slug}`}
                              className="text-sm rounded-lg px-3 py-1.5 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
                            >
                              Location page
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-3">
                      <a
                        href={href}
                        className="inline-block text-xs rounded-lg px-3 py-1.5 border border-white/10 bg-white/5 hover:bg-white/10"
                      >
                        View this region
                      </a>
                    </div>
                  </div>
                </details>
              );
            })}
          </div>
        </Reveal>

        {/* Final CTA */}
        <Reveal className="mt-12">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/15 to-fuchsia-500/15 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">Not seeing your exact city?</h3>
              <p className="text-slate-300">
                We’re remote-first and can support businesses anywhere in the US — reach out and we’ll confirm fit.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/contact?type=assessment&source=areas-footer"
                className="rounded-lg px-5 py-3 font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
              >
                Book a 20-min Assessment
              </Link>
              <Link
                href="/contact"
                className="rounded-lg px-5 py-3 font-semibold bg-white/10 ring-1 ring-white/20 hover:bg-white/20"
              >
                Talk to us
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
