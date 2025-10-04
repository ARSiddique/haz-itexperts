"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calculator, DollarSign, Lock, LineChart, CheckCircle2 } from "lucide-react";

const Pill = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-[12px] border border-white/10 bg-white/5">
    {children}
  </span>
);

const Badge = ({ children, tone = "cyan" }) => (
  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium border ${
    tone === "fuchsia" ? "text-fuchsia-300 border-fuchsia-300/30 bg-fuchsia-400/10"
                       : "text-cyan-300 border-cyan-300/30 bg-cyan-400/10"}`}>
    {children}
  </span>
);

export default function PricingRoi() {
  const [billing, setBilling] = useState("monthly"); // monthly | yearly
  const [seats, setSeats] = useState(60);

  // example USD curve (placeholder numbers — adjust to your real pricing)
  const price = useMemo(() => {
    const base = 45; // USD per user (yearly baseline)
    const vol = seats > 150 ? 0.78 : seats > 80 ? 0.85 : seats > 40 ? 0.9 : 1;
    const perUser = Math.round(base * (billing === "monthly" ? 1.15 : 1) * vol);
    const total = perUser * seats;
    return { perUser, total };
  }, [billing, seats]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">HaziCare™</div>
          <h3 className="text-xl font-semibold">Managed IT plan & simple add-ons</h3>
        </div>
        {/* billing toggle */}
        <div className="flex items-center gap-2">
          <span className={`text-sm ${billing === "monthly" ? "text-cyan-300" : "text-slate-400"}`}>Monthly</span>
          <button
            onClick={() => setBilling((b) => (b === "monthly" ? "yearly" : "monthly"))}
            className="relative w-12 h-6 rounded-full bg-slate-700/70 border border-white/10"
          >
            <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${billing === "monthly" ? "left-1" : "left-6"}`} />
          </button>
          <span className={`text-sm ${billing === "yearly" ? "text-cyan-300" : "text-slate-400"}`}>
            Yearly <Badge tone="fuchsia">save 15%</Badge>
          </span>
        </div>
      </div>

      {/* price cards */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {[
          {
            t: "HaziCare™ Core",
            p: price.perUser, u: "per user",
            list: ["Helpdesk & SLAs", "Patching & monitoring", "EDR/XDR baseline", "Leadership KPIs"],
            highlight: true,
          },
          {
            t: "Security Add-ons",
            p: "à-la-carte", u: "",
            list: ["Email security+", "Backup/DR (SaaS + endpoints)", "Identity hardening", "vCISO"],
          },
          {
            t: "Projects",
            p: "fixed / T&M", u: "",
            list: ["Audits & moves", "Network refresh", "Cloud migrations"],
          },
        ].map(({ t, p, u, list, highlight }) => (
          <div key={t} className={`rounded-2xl border p-5 ${highlight ? "border-cyan-300/30 bg-cyan-400/10" : "border-white/10 bg-white/5"}`}>
            <div className="font-semibold">{t}</div>
            <div className="mt-2 text-2xl font-extrabold">
              {typeof p === "number" ? `USD ${p.toLocaleString()}` : p} {u && <span className="text-sm font-medium text-slate-300">/ {u}</span>}
            </div>
            <ul className="mt-3 space-y-1 text-sm text-slate-200">
              {list.map((x) => (
                <li key={x} className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 text-cyan-300" /> {x}
                </li>
              ))}
            </ul>
            <Link href="/get-quote" className="mt-4 inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:bg-white/10">
              Get Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ))}
      </div>

      {/* ROI mini calculator */}
      <div className="mt-6 rounded-xl border border-white/10 bg-slate-900/40 p-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Calculator className="h-4 w-4 text-cyan-300" />
            <div className="font-medium">ROI quick look</div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-300">Users:</span>
            <input
              type="range"
              min={10}
              max={250}
              value={seats}
              onChange={(e) => setSeats(parseInt(e.target.value))}
              className="w-40 accent-cyan-400"
            />
            <span className="text-sm font-medium">{seats}</span>
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-3 mt-3 text-sm">
          <Pill>
            <DollarSign className="h-4 w-4 text-cyan-300" />
            Est. monthly spend:
            <strong className="ms-1">
              USD {Math.round(price.total / (billing === "monthly" ? 1 : 12)).toLocaleString()}
            </strong>
          </Pill>
          <Pill><Lock className="h-4 w-4 text-cyan-300" /> Security lift: <strong className="ms-1">EDR 99.9% + MFA</strong></Pill>
          <Pill><LineChart className="h-4 w-4 text-cyan-300" /> Productivity: <strong className="ms-1">↓ P1 to ≤15 min</strong></Pill>
        </div>
      </div>
    </div>
  );
}
