// components/ServiceInternalLinks.jsx
import Link from "next/link";
import { SERVICES, RELATED } from "@/lib/services";
import { LOCATIONS } from "@/lib/locations";

const Chip = ({ children }) => (
  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
    {children}
  </span>
);

function RelatedServiceCard({ s }) {
  return (
    <Link
      href={s.href}
      className="group block rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-cyan-300/30 transition"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-extrabold text-base">{s.title}</h3>
          <p className="mt-2 text-slate-300 text-sm leading-6">{s.blurb}</p>
        </div>
        <span className="text-slate-300 group-hover:text-cyan-200 transition">›</span>
      </div>

      {Array.isArray(s.tags) && s.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {s.tags.slice(0, 3).map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </div>
      )}
    </Link>
  );
}

function AreaCard({ area }) {
  const title =
    area?.city && area?.state ? `${area.city}, ${area.state}` : area?.title || "Area";
  const desc = area?.lede || "Coverage details, FAQs, and service options for this area.";

  return (
    <Link
      href={`/locations/${area.slug}`}
      className="group block rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-emerald-300/30 transition"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-extrabold text-base">{title}</h3>
          <p className="mt-2 text-slate-300 text-sm leading-6">{desc}</p>
        </div>
        <span className="text-slate-300 group-hover:text-emerald-200 transition">›</span>
      </div>
    </Link>
  );
}

export default function ServiceInternalLinks({ currentKey }) {
  const order = (currentKey && RELATED[currentKey]) || [];
  const relatedServices = order.length
    ? order.map((k) => SERVICES.find((x) => x.key === k)).filter(Boolean).slice(0, 4)
    : SERVICES.slice(0, 4);

  const topAreas = Array.isArray(LOCATIONS) ? LOCATIONS.slice(0, 6) : [];

  return (
    <>
      {/* RELATED SERVICES */}
      <section className="mt-12">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-end justify-between gap-3 flex-wrap">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold">Related services</h2>
              <p className="mt-2 text-slate-300 max-w-3xl">
                Explore connected services teams bundle together for better stability and security.
              </p>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
            >
              View all services ›
            </Link>
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            {relatedServices.map((s) => (
              <RelatedServiceCard key={s.key} s={s} />
            ))}
          </div>
        </div>
      </section>

      {/* AREAS WE SERVE */}
      <section className="mt-12">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-end justify-between gap-3 flex-wrap">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold">Areas we serve</h2>
              <p className="mt-2 text-slate-300 max-w-3xl">
                Browse location pages for coverage details and next steps.
              </p>
            </div>

            <Link
              href="/areas"
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm border border-emerald-300/30 text-emerald-300 bg-emerald-400/10 hover:bg-emerald-400/20"
            >
              View all areas ›
            </Link>
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            {topAreas.map((a) => (
              <AreaCard key={a.slug} area={a} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
