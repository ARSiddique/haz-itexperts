"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Cpu } from "lucide-react";

const Pill = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-[12px] border border-white/10 bg-white/5">
    {children}
  </span>
);

export default function ServicesTabs({ services }) {
  const [tab, setTab] = useState(services?.[0]?.key ?? "managed");

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5">
      {/* tab buttons */}
      <div className="flex flex-wrap gap-2 p-2">
        {services.map((s) => (
          <button
            key={s.key}
            onClick={() => setTab(s.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition
              ${tab === s.key ? "bg-cyan-400/15 text-cyan-300 border border-cyan-300/30"
                              : "bg-transparent text-slate-300 hover:bg-white/5"}`}
          >
            {s.title}
          </button>
        ))}
      </div>

      {/* panels */}
      <div className="p-5 md:p-7">
        {services.map((s) => (
          <div key={s.key} className={tab === s.key ? "block" : "hidden"}>
            <div className="grid md:grid-cols-2 gap-6 items-start">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">What you get</div>
                <h3 className="text-2xl font-semibold mt-1">{s.title}</h3>
                <p className="text-slate-300 mt-2">{s.desc}</p>
                <ul className="mt-4 space-y-2">
                  {s.deep.map(([t, d]) => (
                    <li key={t} className="flex items-start gap-2 text-sm text-slate-200">
                      <svg className="mt-0.5 h-4 w-4 text-cyan-300" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2 4.8 12l1.4-1.4L9 13.4l8.8-8.8L19.2 6z"/></svg>
                      <span><strong className="text-slate-100">{t}</strong> — {d}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex gap-2">
                  <Link href="/get-quote" className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20">
                    Get Quote <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm border border-white/10 bg-white/5 hover:bg-white/10">
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
                    <li>• 99.9% EDR coverage</li>
                    <li>• Baseline hardening</li>
                    <li>• Leadership KPIs</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="font-medium text-sm mb-2">Who it’s for</div>
                  <ul className="space-y-1 text-sm text-slate-300">
                    <li>• 10–500 users</li>
                    <li>• Compliance-aware teams</li>
                    <li>• Fast-growing SMBs</li>
                  </ul>
                </div>
                <div className="col-span-2 rounded-xl border border-white/10 bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 p-4 flex items-center justify-between">
                  <div className="text-sm">
                    <div className="font-semibold">Kickoff in 7–10 business days</div>
                    <div className="text-slate-300">Assessment → Baselines → Quick wins</div>
                  </div>
                  <Pill><Cpu className="h-4 w-4 text-cyan-300" /> SOP-driven</Pill>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
