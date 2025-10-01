"use client";

import { useMemo, useState } from "react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import {
  Users, MonitorSmartphone, ShieldCheck, Mail, Phone, Building2,
  CheckCircle2, ArrowRight, ChevronRight, CalendarDays, Server, Cloud, Database
} from "lucide-react";

/* ---------------------- helpers ---------------------- */
const currency = (n) =>
  new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(n);

/** Progressive per-user rate based on seats (example brackets) */
function ratePerUser(users) {
  if (users >= 201) return 4200;
  if (users >= 101) return 4800;
  if (users >= 51)  return 5200;
  if (users >= 21)  return 5600;
  return 6000;
}

/** Optional modules (can be edited freely) */
const MODULES = [
  { key: "xdr",     label: "EDR/XDR + SOC-ready",        type: "perUser", cost: 1200,  icon: ShieldCheck },
  { key: "email",   label: "Email security + phishing",  type: "perUser", cost: 600,   icon: Mail },
  { key: "bdr",     label: "Endpoint backup/DR",         type: "perUser", cost: 900,   icon: Database },
  { key: "saasbkp", label: "M365/Google backup",         type: "flat",    cost: 35000, icon: Cloud },
  { key: "server",  label: "Server care (per server)",   type: "perUnit", cost: 9000,  icon: Server },
];

/* ---------------------- UI atoms ---------------------- */
function Field({ label, children, hint }) {
  return (
    <label className="block">
      <div className="text-sm text-slate-200/90">{label}</div>
      <div className="mt-1">{children}</div>
      {hint && <div className="text-xs text-slate-400 mt-1">{hint}</div>}
    </label>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg bg-transparent border border-white/20 px-3 py-2 text-sm outline-none
                  focus:border-cyan-300/50 placeholder:text-slate-500 ${props.className || ""}`}
    />
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 text-xs rounded-lg border transition
        ${active ? "border-cyan-300/40 text-cyan-300 bg-cyan-400/10" : "border-white/10 text-slate-300 hover:bg-white/5"}`}
    >
      {children}
    </button>
  );
}

/* ---------------------- page ---------------------- */
export default function QuotePage() {
  const [sent, setSent] = useState(false);

  // estimator state
  const [users, setUsers] = useState(35);
  const [devices, setDevices] = useState(60);
  const [servers, setServers] = useState(2);
  const [checked, setChecked] = useState({ xdr: true, email: true, bdr: true, saasbkp: false, server: true });

  // lead form state
  const [lead, setLead] = useState({ company: "", email: "", phone: "", notes: "" });

  // derived pricing
  const baseUserRate = ratePerUser(users);
  const base = users * baseUserRate;

  const addons = useMemo(() => {
    let total = 0;
    const lines = [];

    MODULES.forEach((m) => {
      if (!checked[m.key]) return;
      let cost = 0;
      if (m.type === "perUser") cost = users * m.cost;
      if (m.type === "flat") cost = m.cost;
      if (m.type === "perUnit") cost = servers * m.cost;

      total += cost;
      lines.push({ label: m.label, cost });
    });

    return { total, lines };
  }, [checked, users, servers]);

  const total = base + addons.total;

  async function onSubmit(e) {
    e.preventDefault();
    const payload = {
      ...lead,
      seats: users,
      devices,
      servers,
      modules: Object.keys(checked).filter((k) => checked[k]),
      estimate: { basePerUser: baseUserRate, base, addons: addons.lines, total },
    };
    try {
      await fetch("/api/quote", { method: "POST", body: JSON.stringify(payload) });
      setSent(true);
    } catch {
      setSent(true);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Get Quote"
        title="Simple, transparent pricing — live estimate"
        sub="HaziCare™ Managed IT with security add-ons. Adjust seats & modules to see a ballpark; we’ll confirm exact pricing after a quick assessment."
      />

      <section className="max-w-6xl mx-auto px-4 pb-24">
        <div className="grid lg:grid-cols-[1.2fr_.9fr] gap-6 items-start">
          {/* ===== Estimator + Form ===== */}
          <Reveal>
            <form onSubmit={onSubmit} className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-6">
              {/* seats / devices */}
              <div className="grid sm:grid-cols-3 gap-4">
                <Field label="Users">
                  <div className="flex items-center gap-3">
                    <input
                      type="range" min={5} max={500} value={users}
                      onChange={(e) => setUsers(parseInt(e.target.value))}
                      className="w-full accent-cyan-300"
                    />
                    <Input
                      type="number" min={5} max={500} value={users}
                      onChange={(e) => setUsers(Math.max(5, Math.min(500, +e.target.value || 5)))}
                      style={{ width: 90 }}
                    />
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Current per-user rate: <span className="text-cyan-300">{currency(baseUserRate)}</span> / user
                  </div>
                </Field>

                <Field label="Devices (approx)">
                  <Input
                    type="number" min={users} value={devices}
                    onChange={(e) => setDevices(Math.max(users, +e.target.value || users))}
                  />
                  <div className="text-xs text-slate-400 mt-1">Endpoints we’ll patch/monitor</div>
                </Field>

                <Field label="Servers">
                  <Input
                    type="number" min={0} value={servers}
                    onChange={(e) => setServers(Math.max(0, +e.target.value || 0))}
                  />
                  <div className="text-xs text-slate-400 mt-1">Physical/virtual managed servers</div>
                </Field>
              </div>

              {/* modules */}
              <div>
                <div className="text-sm font-semibold mb-2">Add security / services</div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {MODULES.map(({ key, label, icon: Icon }) => {
                    const active = !!checked[key];
                    return (
                      <button
                        type="button"
                        key={key}
                        onClick={() => setChecked((s) => ({ ...s, [key]: !s[key] }))}
                        className={`flex items-center gap-2 rounded-xl border p-3 text-left transition
                          ${active ? "border-cyan-300/40 bg-cyan-400/10 text-cyan-200" : "border-white/10 bg-white/5 hover:bg-white/7"}`}
                      >
                        <span className="grid place-items-center size-9 rounded-lg bg-black/20 border border-white/10">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div className="text-sm">{label}</div>
                      </button>
                    );
                  })}
                </div>

                {/* quick presets */}
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="text-xs text-slate-400 mr-1">Presets:</span>
                  <Chip
                    active={checked.xdr && checked.email && checked.bdr && !checked.saasbkp && checked.server}
                    onClick={() => setChecked({ xdr: true, email: true, bdr: true, saasbkp: false, server: true })}
                  >
                    Security-first
                  </Chip>
                  <Chip
                    active={checked.xdr && checked.email && checked.bdr && checked.saasbkp}
                    onClick={() => setChecked({ xdr: true, email: true, bdr: true, saasbkp: true, server: servers > 0 })}
                  >
                    Full stack
                  </Chip>
                  <Chip
                    active={!Object.values(checked).some(Boolean)}
                    onClick={() => setChecked({ xdr: false, email: false, bdr: false, saasbkp: false, server: false })}
                  >
                    None
                  </Chip>
                </div>
              </div>

              {/* lead info */}
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Company"><Input required value={lead.company} onChange={(e)=>setLead({...lead, company:e.target.value})} placeholder="Acme Pvt. Ltd." /></Field>
                <Field label="Work email"><Input required type="email" value={lead.email} onChange={(e)=>setLead({...lead, email:e.target.value})} placeholder="name@company.com" /></Field>
                <Field label="Phone (optional)"><Input value={lead.phone} onChange={(e)=>setLead({...lead, phone:e.target.value})} placeholder="+92…" /></Field>
                <Field label="Notes / priorities"><Input value={lead.notes} onChange={(e)=>setLead({...lead, notes:e.target.value})} placeholder="e.g., audit, co-managed, M365, DR…" /></Field>
              </div>

              <div className="flex items-center gap-3">
                <button
                  className="rounded-lg px-5 py-3 font-semibold bg-cyan-400/10 text-cyan-300 border border-cyan-300/30 hover:bg-cyan-400/20"
                >
                  Request quote
                </button>
                <a
                  href="/contact#faqs"
                  className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:bg-white/10"
                >
                  FAQs <ChevronRight className="h-4 w-4" />
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:bg-white/10"
                >
                  Or talk to us <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              {sent && (
                <div className="mt-3 inline-flex items-center gap-2 text-emerald-400 text-sm">
                  <CheckCircle2 className="h-4 w-4" /> Submitted — we’ll email you a tailored quote shortly.
                </div>
              )}
            </form>
          </Reveal>

          {/* ===== Sticky Summary ===== */}
          <Reveal>
            <aside className="lg:sticky lg:top-24 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.03] p-6">
              <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">Your estimate</div>
              <h3 className="text-xl font-semibold mt-1">HaziCare™ Managed IT</h3>

              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <div className="text-slate-400 text-xs">Users</div>
                  <div className="font-semibold">{users}</div>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <div className="text-slate-400 text-xs">Per-user rate</div>
                  <div className="font-semibold">{currency(baseUserRate)}</div>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <div className="text-slate-400 text-xs">Devices (approx)</div>
                  <div className="font-semibold">{devices}</div>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <div className="text-slate-400 text-xs">Servers</div>
                  <div className="font-semibold">{servers}</div>
                </div>
              </div>

              <div className="mt-4 border-t border-white/10 pt-4 text-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span>Base (users × rate)</span>
                  <span className="font-semibold">{currency(base)}</span>
                </div>

                {addons.lines.map((l) => (
                  <div key={l.label} className="flex items-center justify-between text-slate-300">
                    <span className="inline-flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-cyan-300" /> {l.label}
                    </span>
                    <span>{currency(l.cost)}</span>
                  </div>
                ))}

                <div className="flex items-center justify-between border-t border-white/10 pt-3 text-base">
                  <span className="font-semibold">Estimated monthly</span>
                  <span className="font-extrabold text-cyan-300">{currency(total)}</span>
                </div>
              </div>

              {/* trust / what’s included */}
              <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm font-semibold mb-2">Included with HaziCare™</div>
                <ul className="text-sm text-slate-300 grid gap-1">
                  {[
                    "24/7 helpdesk (P1 ≤ 15 min)",
                    "Patch & update management",
                    "Monitoring (endpoints, network)",
                    "MDM baselines (Win/macOS/iOS/Android)",
                    "Monthly KPIs & vCIO",
                  ].map((x) => (
                    <li key={x} className="flex gap-2"><span>•</span><span>{x}</span></li>
                  ))}
                </ul>
              </div>

              <a
                href="/contact"
                className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
              >
                Book a 15-min intro <CalendarDays className="h-4 w-4" />
              </a>
            </aside>
          </Reveal>
        </div>

        {/* ===== Process strip (visual, unique) ===== */}
        <Reveal className="mt-12">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">Process</div>
            <h3 className="text-lg font-semibold">From quote to impact — usually one week</h3>
            <div className="grid md:grid-cols-4 gap-4 mt-4 text-sm">
              {[
                ["Discover", "Light audit: assets, identity, risks." , Users],
                ["Stabilize", "Patching, EDR/XDR, backups verified.", ShieldCheck],
                ["Operate", "SLAs, workflows, monthly KPIs.", MonitorSmartphone],
                ["Grow", "Roadmap & budget with your vCIO.", Building2],
              ].map(([t, d, Icon]) => (
                <div key={t} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-2"><Icon className="h-4 w-4 text-cyan-300" /><div className="font-medium">{t}</div></div>
                  <div className="text-slate-300 mt-1">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
