// components/ServicesTabs.jsx
"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ArrowRight, Cpu } from "lucide-react";

const Pill = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-[12px] border border-white/10 bg-white/5">
    {children}
  </span>
);

export default function ServicesTabs({ services = [] }) {
  const uid = useId();
  const list = Array.isArray(services) ? services : [];
  const keys = useMemo(() => list.map((s) => s?.key).filter(Boolean), [list]);

  const initialKey = keys.includes("managed") ? "managed" : keys[0] || "managed";
  const [tab, setTab] = useState(initialKey);

  // keep tab valid if services change
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

          return (
            <section
              key={s.key}
              id={panelId}
              role="tabpanel"
              aria-labelledby={tabId}
              hidden={!selected}
            >
              <div className="grid md:grid-cols-2 gap-6 items-start">
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">
                    What you get
                  </div>

                  {/* NOTE: keep H3 here (page already has H1/H2) */}
                  <h3 className="text-2xl font-semibold mt-1">{s.title}</h3>

                  <p className="text-slate-300 mt-2">{s.desc}</p>

                  <ul className="mt-4 space-y-2">
                    {(s.deep || []).map(([t, d]) => (
                      <li key={t} className="flex items-start gap-2 text-sm text-slate-200">
                        <svg
                          className="mt-0.5 h-4 w-4 text-cyan-300"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M9 16.2 4.8 12l1.4-1.4L9 13.4l8.8-8.8L19.2 6z" />
                        </svg>
                        <span>
                          <strong className="text-slate-100">{t}</strong> — {d}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex gap-2">
                    <Link
                      href="/get-quote"
                      className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
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

                {/* small visual pack */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="font-medium text-sm mb-2">Typical outcomes</div>
                    <ul className="space-y-1 text-sm text-slate-300">
                      <li>• Faster P1 response</li>
                      <li>• Stronger baselines</li>
                      <li>• Leadership reporting</li>
                    </ul>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="font-medium text-sm mb-2">Who it’s for</div>
                    <ul className="space-y-1 text-sm text-slate-300">
                      <li>• 10–500 users</li>
                      <li>• Compliance-aware teams</li>
                      <li>• Growing SMBs</li>
                    </ul>
                  </div>

                  <div className="col-span-2 rounded-xl border border-white/10 bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 p-4 flex items-center justify-between">
                    <div className="text-sm">
                      <div className="font-semibold">Kickoff in 7–10 business days</div>
                      <div className="text-slate-300">Assessment → Baselines → Quick wins</div>
                    </div>
                    <Pill>
                      <Cpu className="h-4 w-4 text-cyan-300" aria-hidden="true" /> SOP-driven
                    </Pill>
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
