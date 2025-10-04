"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, ShieldCheck, Target, Trophy, BookOpen, Handshake, Leaf, Users, Rocket } from "lucide-react";

export default function AboutTabs() {
  const [tab, setTab] = useState("mission");

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-2">
      {/* Tabs */}
      <div className="flex gap-2 p-1">
        {[
          ["mission", "Our mission"],
          ["values", "Values we live by"],
          ["slas", "SLAs & tooling"],
        ].map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              tab === id ? "bg-cyan-400/15 text-cyan-300 border border-cyan-300/30" : "bg-white/0 text-slate-300 hover:bg-white/5"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Panels */}
      <div className="p-4 md:p-6">
        {tab === "mission" && (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg">Make SMB IT boring (in the best way)</h3>
              <p className="text-slate-300 mt-2">
                Predictable response, visible KPIs, and secure baselines so business can focus on growth.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                <li className="flex gap-2"><Sparkles className="h-4 w-4 text-cyan-300" /> Quick wins in week one</li>
                <li className="flex gap-2"><ShieldCheck className="h-4 w-4 text-cyan-300" /> Security-first defaults</li>
                <li className="flex gap-2"><Target className="h-4 w-4 text-cyan-300" /> Roadmap with budgets</li>
              </ul>
            </div>
            <div className="rounded-xl overflow-hidden border border-white/10 relative h-56">
              <Image src="/media/dashboard.jpg" alt="Monitoring" fill className="object-cover" />
            </div>
          </div>
        )}

        {tab === "values" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              [Trophy, "Own the outcome", "We measure success by user experience."],
              [BookOpen, "Document & automate", "SOPs first, then tooling."],
              [Handshake, "Be a partner", "No fluff, just honest advice."],
              [Leaf, "Secure by default", "Hardening, EDR/XDR, backup/DR."],
              [Users, "Empathy for users", "Less friction, more enablement."],
              [Rocket, "Bias for action", "Ship improvements weekly."],
            ].map(([Icon, t, d]) => (
              <div key={t} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-cyan-300" />
                  <div className="font-medium">{t}</div>
                </div>
                <p className="text-sm text-slate-300 mt-1">{d}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "slas" && (
          <div className="grid md:grid-cols-3 gap-4">
            {[
              ["Response targets", "P1 ≤ 15 min, P2 ≤ 1 hr, P3 same day"],
              ["Tooling included", "EDR/XDR, patching, monitoring, email security, backup/DR"],
              ["Reporting", "Monthly leadership KPIs & recommendations"],
            ].map(([t, d]) => (
              <div key={t} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="font-medium">{t}</div>
                <p className="text-sm text-slate-300 mt-1">{d}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
