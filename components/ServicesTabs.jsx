// components/ServicesTabs.jsx
"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";

const META = {
  managed: {
    outcomes: ["Fewer recurring tickets", "Predictable patching & uptime", "Clear SLAs + leadership visibility"],
    bestFor: ["Teams that want proactive IT (not reactive)", "SMBs that need consistency + reporting"],
    timeline: "Stabilize in 2–4 weeks",
  },
  security: {
    outcomes: ["Reduced phishing & account risk", "Faster detection + response", "Backups you can actually restore"],
    bestFor: ["Compliance-aware SMBs", "Teams targeted by phishing/ransomware"],
    timeline: "Baseline in 2–3 weeks",
  },
  cloud: {
    outcomes: ["Smoother collaboration + sharing control", "Cleaner tenants & access", "Recoverability beyond recycle-bin"],
    bestFor: ["M365/Workspace migrations or cleanup", "Teams with file sprawl + permission issues"],
    timeline: "Migrations often 4–7 weeks",
  },
  projects: {
    outcomes: ["Runbooks + rollback plans", "Clean cutovers with less downtime", "As-built docs & handover"],
    bestFor: ["Network refresh / office moves", "Audits, migrations, or decommissions"],
    timeline: "Depends on scope",
  },
  mdm: {
    outcomes: ["Standardized devices with less drift", "Faster onboarding/offboarding", "Compliance reporting you can prove"],
    bestFor: ["Hybrid fleets (Windows/Mac/iOS/Android)", "Teams needing zero-touch enrollment"],
    timeline: "Baselines in 1–2 weeks",
  },
  vcio: {
    outcomes: ["Roadmap tied to business goals", "Budget clarity & vendor control", "KPIs that leadership understands"],
    bestFor: ["Owners/leadership wanting direction", "Teams tired of ad-hoc IT decisions"],
    timeline: "Roadmap in 30–45 days",
  },
};

function safeMeta(key) {
  return META[key] || {
    outcomes: ["Clear deliverables", "Reduced risk & surprises", "Better visibility & control"],
    bestFor: ["Growing SMBs", "Teams that want structure"],
    timeline: "Varies by environment",
  };
}

const Chip = ({ children }) => (
  <span className="inline-flex items-center rounded-full px-2.5 py-1 text-[12px] border border-white/10 bg-white/5 text-slate-200">
    {children}
  </span>
);

export default function ServicesTabs({ services = [] }) {
  const uid = useId();
  const list = Array.isArray(services) ? services : [];
  const keys = useMemo(() => list.map((s) => s?.key).filter(Boolean), [list]);

  const initialKey = keys.includes("managed") ? "managed" : keys[0] || "managed";
  const [tab, setTab] = useState(initialKey);

  useEffect(() => {
    if (!keys.length) return;
    if (!keys.includes(tab)) setTab(keys.includes("managed") ? "managed" : keys[0]);
  }, [keys, tab]);

  const btnRefs = useRef({});

  const onKeyDown = (e) => {
    const idx = keys.indexOf(tab);
    if (idx === -1) return;

    if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "Home" || e.key === "End") {
      e.preventDefault();
      let nextIdx = idx;

      if (e.key === "ArrowRight") nextIdx = (idx + 1) % keys.length;
      if (e.key === "ArrowLeft") nextIdx = (idx - 1 + keys.length) % keys.length;
      if (e.key === "Home") nextIdx = 0;
      if (e.key === "End") nextIdx = keys.length - 1;

      const nextKey = keys[nextIdx];
      setTab(nextKey);
      requestAnimationFrame(() => btnRefs.current[nextKey]?.focus?.());
    }
  };

  if (!list.length) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
        Services will appear here shortly.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5">
      {/* tab buttons */}
      <div
        className="flex flex-wrap gap-2 p-2"
        role="tablist"
        aria-label="Service deep dives"
        onKeyDown={onKeyDown}
      >
        {list.map((s) => {
          const selected = tab === s.key;
          const tabId = `tab-${uid}-${s.key}`;
          const panelId = `panel-${uid}-${s.key}`;

          return (
            <button
              key={s.key}
              type="button"
              role="tab"
              id={tabId}
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              ref={(el) => (btnRefs.current[s.key] = el)}
              onClick={() => setTab(s.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/40
                ${
                  selected
                    ? "bg-cyan-400/15 text-cyan-300 border border-cyan-300/30"
                    : "bg-transparent text-slate-300 hover:bg-white/5 border border-transparent"
                }`}
            >
              {s.title}
            </button>
          );
        })}
      </div>

      {/* panels */}
      <div className="p-5 md:p-7">
        {list.map((s) => {
          const selected = tab === s.key;
          const tabId = `tab-${uid}-${s.key}`;
          const panelId = `panel-${uid}-${s.key}`;
          const m = safeMeta(s.key);

          const bullets = Array.isArray(s.bullets) ? s.bullets.slice(0, 3) : [];
          const modules = Array.isArray(s.deep) ? s.deep.slice(0, 3) : [];
          const href = s.href || "/services";

          return (
            <section
              key={s.key}
              id={panelId}
              role="tabpanel"
              aria-labelledby={tabId}
              hidden={!selected}
            >
              <div className="grid md:grid-cols-2 gap-6 items-start">
                {/* LEFT */}
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">Overview</div>

                  {/* Keep H3 (page already has H1/H2) */}
                  <h3 className="text-2xl font-semibold mt-1">{s.title}</h3>

                  <p className="text-slate-300 mt-2">{s.desc}</p>

                  {/* What you get (generic-friendly) */}
                  {bullets.length > 0 && (
                    <>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {bullets.map((b) => (
                          <Chip key={b}>{b}</Chip>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Key modules (short + not salesy) */}
                  {modules.length > 0 && (
                    <div className="mt-5">
                      <div className="text-sm font-medium">Key modules</div>
                      <ul className="mt-2 space-y-2">
                        {modules.map(([t, d]) => (
                          <li key={t} className="text-sm text-slate-200">
                            <span className="font-semibold text-slate-100">{t}</span>
                            {d ? <span className="text-slate-300"> — {d}</span> : null}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* CTAs: Learn more (internal link) + Get quote */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    <Link
                      href={href}
                      className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
                      aria-label={`Learn more about ${s.title}`}
                    >
                      Learn more <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </Link>

                    <Link
                      href="/get-quote"
                      className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm border border-white/10 bg-white/5 hover:bg-white/10"
                      aria-label={`Get a quote for ${s.title}`}
                    >
                      Get a Quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm border border-white/10 bg-white/5 hover:bg-white/10"
                      aria-label={`Ask a question about ${s.title}`}
                    >
                      Ask a question
                    </Link>
                  </div>
                </div>

                {/* RIGHT (non-generic, per-service) */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="font-medium text-sm mb-2">Outcomes</div>
                    <ul className="space-y-1 text-sm text-slate-300">
                      {m.outcomes.slice(0, 3).map((x) => (
                        <li key={x}>• {x}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="font-medium text-sm mb-2">Best for</div>
                    <ul className="space-y-1 text-sm text-slate-300">
                      {m.bestFor.slice(0, 2).map((x) => (
                        <li key={x}>• {x}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="col-span-2 rounded-xl border border-white/10 bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 p-4 flex items-center justify-between gap-3">
                    <div className="text-sm">
                      <div className="font-semibold">Typical timeline</div>
                      <div className="text-slate-300">{m.timeline}</div>
                    </div>
                    <Link
                      href={href}
                      className="inline-flex items-center gap-1 text-sm text-cyan-300 hover:underline whitespace-nowrap"
                      aria-label={`Open ${s.title} details`}
                    >
                      Details <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
