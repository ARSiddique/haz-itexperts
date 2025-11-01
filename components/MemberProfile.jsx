// components/MemberProfile.jsx
import Image from "next/image";
import { BadgeCheck, Quote, ShieldCheck, Activity, Target, CheckCircle2 } from "lucide-react";

/**
 * Props:
 *  - name, role, img
 *  - summary
 *  - specialties[]  (bullets)
 *  - highlights[]   (bullets)
 *  - stack[]        (chips)
 *  - industries[]   (chips)
 *  - quote
 *  - size: "sm" | "md" | "lg"  (controls image height)
 */
export default function MemberProfile({
  name,
  role,
  img,
  summary,
  specialties = [],
  highlights = [],
  stack = [],
  industries = [],
  quote,
  size = "md",
}) {
  const heroH =
    size === "lg"
      ? "h-64 md:h-72 lg:h-80"
      : size === "md"
      ? "h-56 md:h-64"
      : "h-44 md:h-52";

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden hover:border-cyan-300/30 transition">
      {/* hero */}
      <div className={`relative ${heroH}`}>
        <Image src={img} alt={name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
        <div className="absolute left-4 bottom-3 right-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/50 ring-1 ring-white/20 text-[11px]">
              <BadgeCheck className="h-4 w-4 text-cyan-300" />
              Verified Lead
            </span>
            <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/50 ring-1 ring-white/20 text-[11px]">
              <ShieldCheck className="h-4 w-4 text-cyan-300" />
              Security-first
            </span>
            <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/50 ring-1 ring-white/20 text-[11px]">
              <Activity className="h-4 w-4 text-cyan-300" />
              SLA-driven
            </span>
          </div>
        </div>
      </div>

      {/* body */}
      <div className="p-6 md:p-7">
        <h3 className="text-xl md:text-2xl font-semibold">{name}</h3>
        <p className="text-xs text-slate-400 mt-0.5">{role}</p>

        <p className="text-slate-200/90 mt-3 leading-7">{summary}</p>

        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">Specialties</div>
            <ul className="mt-2 space-y-2 text-sm text-slate-300">
              {specialties.map((t, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1.5 size-1.5 rounded-full bg-cyan-300/70" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">Highlights</div>
            <ul className="mt-2 space-y-2 text-sm text-slate-300">
              {highlights.map((t, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1.5 size-1.5 rounded-full bg-fuchsia-300/70" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">Delivery focus</div>
            <ul className="mt-2 space-y-2 text-sm text-slate-300">
              <li className="flex gap-2">
                <Target className="h-4 w-4 text-cyan-300 mt-0.5" />
                <span>Document → automate → measure (SOP-first)</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-300 mt-0.5" />
                <span>KPIs leaders understand (uptime, response, coverage)</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-300 mt-0.5" />
                <span>Planned change windows with rollback</span>
              </li>
            </ul>
          </div>
        </div>

        {!!stack.length && (
          <div className="mt-6 flex flex-wrap gap-2">
            {stack.map((b, i) => (
              <span key={`stack-${i}`} className="px-3 h-8 inline-flex items-center rounded-full text-xs border border-white/10 bg-white/5">
                {b}
              </span>
            ))}
          </div>
        )}
        {!!industries.length && (
          <div className="mt-2 flex flex-wrap gap-2">
            {industries.map((b, i) => (
              <span key={`ind-${i}`} className="px-3 h-8 inline-flex items-center rounded-full text-xs border border-white/10 bg-white/5">
                {b}
              </span>
            ))}
          </div>
        )}

        {quote && (
          <div className="mt-6 rounded-xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-start gap-2">
              <Quote className="h-5 w-5 text-cyan-300 shrink-0 mt-0.5" />
              <p className="text-sm text-slate-300">{quote}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
