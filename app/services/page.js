"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import {
  Shield, Server, Cloud, Wrench, Smartphone, Users,
  CheckCircle2, ArrowRight, ChevronRight, ChevronDown,
  Calculator, DollarSign, Cpu, Lock, LineChart, CloudCog,
  Network, Building2, Sparkles
} from "lucide-react";

/* ---------- tiny helpers ---------- */
const Badge = ({ children, tone = "cyan" }) => (
  <span
    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium border
      ${tone==="cyan" ? "text-cyan-300 border-cyan-300/30 bg-cyan-400/10"
                      : "text-fuchsia-300 border-fuchsia-300/30 bg-fuchsia-400/10"}`}
  >
    {children}
  </span>
);

const Pill = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-[12px] border border-white/10 bg-white/5">
    {children}
  </span>
);

const Feature = ({ children }) => (
  <li className="flex items-start gap-2 text-sm text-slate-200">
    <CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan-300" /> {children}
  </li>
);

/* ---------- page ---------- */
export default function ServicesPage() {
  const [tab, setTab] = useState("managed"); // deep-dives
  const [billing, setBilling] = useState("monthly"); // monthly | yearly
  const [seats, setSeats] = useState(60); // ROI mini calc

  const price = useMemo(() => {
    // example price curve (fake numbers — adjust to your plan)
    const base = 8_000; // PKR per user / yearly-billed baseline
    const vol = seats > 150 ? 0.78 : seats > 80 ? 0.85 : seats > 40 ? 0.9 : 1;
    const perUser = Math.round(base * (billing === "monthly" ? 1.15 : 1) * vol);
    const total = perUser * seats;
    return { perUser, total };
  }, [billing, seats]);

  const services = [
    {
      key: "managed",
      icon: Shield,
      title: "Managed IT",
      desc: "Helpdesk, patching, monitoring, reporting with SLAs.",
      bullets: ["Helpdesk workflows", "Proactive maintenance", "Leadership KPIs"],
      deep: [
        ["Helpdesk", "Omni-channel (email/chat/portal), triage SOPs, CSAT."],
        ["Patch mgmt", "OS & app updates with pilot rings & rollback."],
        ["Monitoring", "Endpoints, servers, network, cloud signals."],
      ],
    },
    {
      key: "security",
      icon: Server,
      title: "Cybersecurity",
      desc: "EDR/XDR, MFA/SSO, email security, backup/DR, vCISO.",
      bullets: ["EDR/XDR coverage", "Identity hardening", "BCP/DR playbooks"],
      deep: [
        ["EDR/XDR", "Managed detections, isolation, post-incident SOPs."],
        ["Identity", "MFA/SSO, conditional access, least-privilege."],
        ["Email", "Spoofing/phishing defense, impersonation guard."],
      ],
    },
    {
      key: "cloud",
      icon: Cloud,
      title: "Cloud & 365/Workspace",
      desc: "Migrations, identity, MDM, cost optimization.",
      bullets: ["Tenant security", "License hygiene", "Automation"],
      deep: [
        ["Migrations", "Cutover/hybrid with staged comms & rollback."],
        ["Governance", "Secure baselines, DLP, retention, logs."],
        ["FinOps", "License cleanup, storage policies, rightsizing."],
      ],
    },
    {
      key: "projects",
      icon: Wrench,
      title: "Projects & Consulting",
      desc: "Audits, office moves, network refresh, server/cloud.",
      bullets: ["Zero-trust rollout", "Network redesign", "Server refresh"],
      deep: [
        ["Audits", "Infra, security & process with scorecards."],
        ["Moves", "ISP, cabling, Wi-Fi heatmaps, cutover plans."],
        ["Servers", "AD, file/print, virtualisation, backup/DR."],
      ],
    },
    {
      key: "mdm",
      icon: Smartphone,
      title: "Device Management",
      desc: "Windows/Mac/iOS/Android baselines & app deploys.",
      bullets: ["Baseline config", "Compliance checks", "App catalogues"],
      deep: [
        ["Baselines", "CIS-aligned controls per platform."],
        ["Provisioning", "AutoPilot/ABM, zero-touch rollouts."],
        ["Health", "Drift detection, remediations, reporting."],
      ],
    },
    {
      key: "vcio",
      icon: Users,
      title: "vCIO / Strategy",
      desc: "Quarterly roadmap, budget planning, KPIs.",
      bullets: ["Roadmaps", "Budgeting", "Risk register"],
      deep: [
        ["Roadmap", "Quarterly OKRs tied to business outcomes."],
        ["KPIs", "Board-friendly scorecards, action items."],
        ["Vendors", "Stack review, contracts, consolidation."],
      ],
    },
  ];

  return (
    <>
      {/* ========== HERO ========== */}
      <PageHero
        eyebrow="Services"
        title="Everything you need for reliable, secure IT"
        sub="Pick fully-managed or co-managed. Start with HaziCare™ and plug security modules as you grow."
      />

      {/* ========== STICKY IN-PAGE NAV ========== */}
      <nav className="sticky top-14 z-20 bg-gradient-to-b from-slate-950/90 to-slate-950/70 backdrop-blur supports-[backdrop-filter]:backdrop-blur border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-2 flex flex-wrap gap-2">
          {services.map(s => (
            <a key={s.key} href={`#${s.key}`}
               className="text-xs md:text-sm rounded-lg px-3 py-1.5 border border-white/10 text-slate-300 hover:text-cyan-300 hover:border-cyan-300/30">
              {s.title}
            </a>
          ))}
          <span className="ms-auto">
            <Link href="/get-quote" className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20">
              Get Quote <ArrowRight className="h-4 w-4"/>
            </Link>
          </span>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-4 pb-24">

        {/* ========== GRID OF SERVICES (cards with hover details) ========== */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {services.map(({ key, icon:Icon, title, desc, bullets }) => (
            <Reveal key={key}>
              <a id={key} className="block group p-6 rounded-2xl bg-gradient-to-br from-white/6 to-white/[0.03] border border-white/10 hover:border-cyan-300/30 transition relative overflow-hidden">
                <div className="absolute -right-10 -top-10 size-36 rounded-full bg-cyan-500/10 blur-2xl group-hover:scale-125 transition" />
                <div className="flex items-center gap-3">
                  <span className="grid place-items-center size-10 rounded-xl bg-cyan-400/10 border border-cyan-300/20">
                    <Icon className="h-5 w-5 text-cyan-300" />
                  </span>
                  <h3 className="font-semibold text-lg">{title}</h3>
                  <Badge>Included in HaziCare™</Badge>
                </div>
                <p className="text-sm text-slate-300 mt-2">{desc}</p>
                <ul className="mt-3 space-y-1">
                  {bullets.map(b => <li key={b} className="text-sm text-slate-300 flex gap-2"><Sparkles className="h-4 w-4 text-cyan-300"/>{b}</li>)}
                </ul>
                <div className="mt-4 inline-flex items-center gap-2 text-sm text-cyan-300">
                  Explore details <ChevronRight className="h-4 w-4"/>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        {/* ========== DEEP-DIVES (tabs) ========== */}
        <Reveal className="mt-14">
          <div className="rounded-2xl border border-white/10 bg-white/5">
            <div className="flex flex-wrap gap-2 p-2">
              {services.map(s => (
                <button key={s.key}
                        onClick={() => setTab(s.key)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition
                          ${tab===s.key ? "bg-cyan-400/15 text-cyan-300 border border-cyan-300/30"
                                         : "bg-transparent text-slate-300 hover:bg-white/5"}`}>
                  {s.title}
                </button>
              ))}
            </div>

            <div className="p-5 md:p-7">
              {services.map(s => (
                <div key={s.key} className={tab===s.key ? "block" : "hidden"}>
                  <div className="grid md:grid-cols-2 gap-6 items-start">
                    <div>
                      <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">What you get</div>
                      <h3 className="text-2xl font-semibold mt-1">{s.title}</h3>
                      <p className="text-slate-300 mt-2">{s.desc}</p>
                      <ul className="mt-4 space-y-2">
                        {s.deep.map(([t,d]) => <Feature key={t}><strong className="text-slate-100">{t}</strong> — {d}</Feature>)}
                      </ul>
                      <div className="mt-5 flex gap-2">
                        <Link href="/get-quote" className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20">Get Quote <ArrowRight className="h-4 w-4"/></Link>
                        <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm border border-white/10 bg-white/5 hover:bg-white/10">Ask a question</Link>
                      </div>
                    </div>

                    {/* visual pack */}
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
                          <li>• Fast-growing SMEs</li>
                        </ul>
                      </div>
                      <div className="col-span-2 rounded-xl border border-white/10 bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 p-4 flex items-center justify-between">
                        <div className="text-sm">
                          <div className="font-semibold">Kickoff in 7–10 business days</div>
                          <div className="text-slate-300">Assessment → Baselines → Quick wins</div>
                        </div>
                        <Pill><Cpu className="h-4 w-4 text-cyan-300"/> SOP-driven</Pill>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ========== PRICING & ROI ========== */}
        <Reveal className="mt-14">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">HaziCare™</div>
                <h3 className="text-xl font-semibold">Managed IT plan & simple add-ons</h3>
              </div>
              {/* billing toggle */}
              <div className="flex items-center gap-2">
                <span className={`text-sm ${billing==="monthly" ? "text-cyan-300" : "text-slate-400"}`}>Monthly</span>
                <button onClick={() => setBilling((b)=> b==="monthly" ? "yearly" : "monthly")}
                        className="relative w-12 h-6 rounded-full bg-slate-700/70 border border-white/10">
                  <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${billing==="monthly" ? "left-1" : "left-6"}`} />
                </button>
                <span className={`text-sm ${billing==="yearly" ? "text-cyan-300" : "text-slate-400"}`}>Yearly <Badge tone="fuchsia">save 15%</Badge></span>
              </div>
            </div>

            {/* price cards */}
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              {[
                {
                  t: "HaziCare™ Core",
                  p: price.perUser, u: "per user",
                  list: ["Helpdesk & SLAs", "Patching & monitoring", "EDR/XDR baseline", "Leadership KPIs"],
                  highlight: true
                },
                {
                  t: "Security Add-ons",
                  p: "à-la-carte", u: "",
                  list: ["Email security+", "Backup/DR (SaaS+endpoints)", "Identity hardening", "vCISO"],
                },
                {
                  t: "Projects",
                  p: "fixed / T&M", u: "",
                  list: ["Audits & moves", "Network refresh", "Cloud migrations"],
                },
              ].map(({t,p,u,list,highlight})=>(
                <div key={t} className={`rounded-2xl border p-5 ${highlight ? "border-cyan-300/30 bg-cyan-400/10" : "border-white/10 bg-white/5"}`}>
                  <div className="font-semibold">{t}</div>
                  <div className="mt-2 text-2xl font-extrabold">{typeof p==="number" ? `PKR ${p.toLocaleString()}` : p} {u && <span className="text-sm font-medium text-slate-300">/ {u}</span>}</div>
                  <ul className="mt-3 space-y-1 text-sm text-slate-200">
                    {list.map(x => <li key={x} className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-300"/>{x}</li>)}
                  </ul>
                  <Link href="/get-quote" className="mt-4 inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:bg-white/10">
                    Get Quote <ArrowRight className="h-4 w-4"/>
                  </Link>
                </div>
              ))}
            </div>

            {/* ROI mini calculator */}
            <div className="mt-6 rounded-xl border border-white/10 bg-slate-900/40 p-4">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2"><Calculator className="h-4 w-4 text-cyan-300"/><div className="font-medium">ROI quick look</div></div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-300">Users:</span>
                  <input type="range" min={10} max={250} value={seats} onChange={(e)=>setSeats(parseInt(e.target.value))}
                         className="w-40 accent-cyan-400"/>
                  <span className="text-sm font-medium">{seats}</span>
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-3 mt-3 text-sm">
                <Pill><DollarSign className="h-4 w-4 text-cyan-300"/> Est. monthly spend: <strong className="ms-1">PKR {(Math.round(price.total/ (billing==="monthly" ? 1 : 12))).toLocaleString()}</strong></Pill>
                <Pill><Lock className="h-4 w-4 text-cyan-300"/> Security lift: <strong className="ms-1">EDR 99.9% + MFA</strong></Pill>
                <Pill><LineChart className="h-4 w-4 text-cyan-300"/> Productivity: <strong className="ms-1">↓ P1 to ≤15 min</strong></Pill>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ========== PLAN MATRIX ========== */}
        <Reveal className="mt-14">
          <div className="rounded-2xl border border-white/10 overflow-x-auto">
            <table className="min-w-[720px] w-full text-sm">
              <thead className="bg-white/5">
                <tr>
                  <th className="text-left p-3">Capability</th>
                  <th className="p-3">HaziCare™</th>
                  <th className="p-3">Add-on</th>
                  <th className="p-3">Project</th>
                </tr>
              </thead>
              <tbody className="[&>tr:nth-child(even)]:bg-white/[0.03]">
                {[
                  ["Helpdesk & SLAs", "•", "", ""],
                  ["Patching & Monitoring", "•", "", ""],
                  ["EDR/XDR Baseline", "•", "", ""],
                  ["Email Security+", "", "•", ""],
                  ["Backup/DR (SaaS + endpoints)", "", "•", ""],
                  ["Identity Hardening / SSO", "", "•", ""],
                  ["Audits / Migrations / Moves", "", "", "•"],
                ].map(([cap,a,b,c])=>(
                  <tr key={cap}>
                    <td className="p-3">{cap}</td>
                    <td className="text-center p-3">{a && "✅"}</td>
                    <td className="text-center p-3">{b && "🧩"}</td>
                    <td className="text-center p-3">{c && "🛠️"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* ========== PROCESS (compact) ========== */}
        <Reveal className="mt-14">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">How we start</div>
            <h3 className="text-xl font-semibold mt-1">Predictable onboarding</h3>
            <ol className="relative border-s border-white/10 ps-6 mt-4 space-y-6">
              {[
                [Building2,"Assess","Light discovery: users, devices, identity, risks."],
                [CloudCog,"Stabilize","Patching, EDR/XDR, baselines, backup/DR."],
                [Network,"Optimize","SLAs, workflows, reporting, roadmap alignment."],
                [LineChart,"Grow","New hires, moves, projects — no chaos."],
              ].map(([Icon,t,d])=>(
                <li key={t} className="ms-2">
                  <span className="absolute -start-3.5 mt-1 grid place-items-center size-6 rounded-full bg-cyan-400/20 border border-cyan-300/40">
                    <Icon className="h-3.5 w-3.5 text-cyan-300"/>
                  </span>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="font-medium">{t}</div>
                    <p className="text-slate-300 text-sm mt-0.5">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        {/* ========== FAQs ========== */}
        <Reveal className="mt-14">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold">FAQs</h3>
            <div className="mt-4 divide-y divide-white/10">
              {[
                ["Fully-managed vs Co-managed?", "Hum end-to-end chala sakte hain, ya aapki in-house team ko augment karte hain. Access, tooling aur SOPs aligned."],
                ["SLA details?", "P1 ≤ 15 min, P2 ≤ 1 hr, P3 same business day. Monthly KPIs leadership view ke saath."],
                ["Tooling included?", "EDR/XDR, patching, monitoring, email security, backup/DR — plus MDM baselines."],
              ].map(([q,a])=>(
                <details key={q} className="py-3 group">
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-2">
                    <span className="font-medium">{q}</span>
                    <ChevronDown className="h-4 w-4 transition group-open:rotate-180"/>
                  </summary>
                  <p className="text-sm text-slate-300 mt-2">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ========== CTA ========== */}
        <Reveal className="mt-14">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/15 to-fuchsia-500/15 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">Ready for a no-pressure IT assessment?</h3>
              <p className="text-slate-300">We’ll map gaps and give you clear next steps — free.</p>
            </div>
            <div className="flex gap-3">
              <Link href="/get-quote" className="rounded-lg px-5 py-3 font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20">Get Quote</Link>
              <Link href="/contact" className="rounded-lg px-5 py-3 font-semibold bg-white/10 ring-1 ring-white/20 hover:bg-white/20">Contact us</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
