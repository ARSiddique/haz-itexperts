"use client";

import { useMemo, useState } from "react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import {
  Users, MonitorSmartphone, ShieldCheck, Mail, ArrowRight, ChevronRight,
  CalendarDays, Server, Cloud, Database, BadgePercent, Info
} from "lucide-react";

/* ---------------------- helpers ---------------------- */
const currency = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

/** 🇺🇸 Progressive per-user rate (typical US SMB ranges) */
function ratePerUser(users) {
  if (users >= 201) return 59;
  if (users >= 101) return 69;
  if (users >= 51)  return 75;
  if (users >= 21)  return 79;
  return 85; // 5–20 seats
}

/** Optional modules (US market-ish) */
const MODULES = [
  { key: "xdr",     label: "EDR/XDR + SOC-ready",       type: "perUser", cost: 12,  icon: ShieldCheck },
  { key: "email",   label: "Email security + phishing", type: "perUser", cost: 6,   icon: Mail },
  { key: "bdr",     label: "Endpoint backup / DR",      type: "perUser", cost: 9,   icon: Database },
  { key: "saasbkp", label: "M365 / Google backup",      type: "flat",    cost: 150, icon: Cloud },
  { key: "server",  label: "Server care (per server)",  type: "perUnit", cost: 120, icon: Server },
];

/* Optional one-time onboarding (set to 0 if N/A) */
const DEFAULT_ONBOARD_FEE = 0;

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
  const [users, setUsers] = useState(25);
  const [devices, setDevices] = useState(40);
  const [servers, setServers] = useState(1);
  const [checked, setChecked] = useState({ xdr: true, email: true, bdr: true, saasbkp: false, server: servers > 0 });

  // billing options
  const [annual, setAnnual] = useState(false); // 10% off annual prepay
  const [onboardFee, setOnboardFee] = useState(DEFAULT_ONBOARD_FEE);

  // lead form
  const [lead, setLead] = useState({ company: "", email: "", phone: "", notes: "" });

  // derived pricing
  const baseUserRate = ratePerUser(users);
  const baseMonthly = users * baseUserRate;

  const addons = useMemo(() => {
    let total = 0;
    const lines = [];
    MODULES.forEach((m) => {
      if (!checked[m.key]) return;
      let cost = 0;
      if (m.type === "perUser") cost = users * m.cost;
      if (m.type === "flat")    cost = m.cost;
      if (m.type === "perUnit") cost = servers * m.cost;
      total += cost;
      lines.push({ label: m.label, cost });
    });
    return { total, lines };
  }, [checked, users, servers]);

  const monthlySubtotal = baseMonthly + addons.total;

  // discount totals
  const discountPct = annual ? 0.10 : 0;
  const monthlyAfterDiscount = Math.round(monthlySubtotal * (1 - discountPct));
  const annualTotal = monthlyAfterDiscount * 12;
  const withOnboarding = annual ? annualTotal + onboardFee : monthlyAfterDiscount + onboardFee;

  async function onSubmit(e) {
    e.preventDefault();
    const payload = {
      ...lead,
      seats: users,
      devices,
      servers,
      billing: { annual, discountPct, onboardFee },
      modules: Object.keys(checked).filter((k) => checked[k]),
      estimate: {
        basePerUser: baseUserRate,
        baseMonthly,
        addons: addons.lines,
        monthlySubtotal,
        monthlyAfterDiscount,
        annualTotal,
        withOnboarding,
      },
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
        title="Simple, transparent pricing — live estimate (USD)"
        sub="Managed IT for US startups & SMBs. Adjust seats and modules to see a ballpark; we’ll finalize after a quick discovery."
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
                    Current per-user rate: <span className="text-cyan-300">{currency(baseUserRate)}</span> / user / month
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
                    onChange={(e) => {
                      const v = Math.max(0, +e.target.value || 0);
                      setServers(v);
                      setChecked((s) => ({ ...s, server: v > 0 ? s.server : false }));
                    }}
                  />
                  <div className="text-xs text-slate-400 mt-1">Physical/virtual managed servers</div>
                </Field>
              </div>

              {/* billing options */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 flex items-center justify-between">
                  <div className="text-sm">
                    <div className="font-semibold inline-flex items-center gap-2">
                      Billing cycle <BadgePercent className="h-4 w-4 text-cyan-300" />
                    </div>
                    <div className="text-xs text-slate-400">Annual prepay saves 10%</div>
                  </div>
                  <div className="flex gap-2">
                    <Chip active={!annual} onClick={() => setAnnual(false)}>Monthly</Chip>
                    <Chip active={annual} onClick={() => setAnnual(true)}>Annual (-10%)</Chip>
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <Field label="One-time onboarding (optional)">
                    <Input
                      type="number"
                      min={0}
                      value={onboardFee}
                      onChange={(e) => setOnboardFee(Math.max(0, +e.target.value || 0))}
                    />
                    <div className="text-xs text-slate-400 mt-1">Covers discovery, documentation, and baseline setup</div>
                  </Field>
                </div>
              </div>

              {/* modules */}
              <div>
                <div className="text-sm font-semibold mb-2">Add security / services</div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {MODULES.map(({ key, label, icon: Icon }) => {
                    const active = !!checked[key];
                    const disabled = key === "server" && servers === 0;
                    return (
                      <button
                        type="button"
                        key={key}
                        onClick={() => !disabled && setChecked((s) => ({ ...s, [key]: !s[key] }))}
                        className={`flex items-center gap-2 rounded-xl border p-3 text-left transition
                          ${disabled ? "opacity-40 cursor-not-allowed" :
                           active ? "border-cyan-300/40 bg-cyan-400/10 text-cyan-200" : "border-white/10 bg-white/5 hover:bg-white/7"}`}
                        aria-disabled={disabled}
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
                    active={checked.xdr && checked.email && checked.bdr && !checked.saasbkp && (servers > 0 ? checked.server : true)}
                    onClick={() => setChecked({ xdr: true, email: true, bdr: true, saasbkp: false, server: servers > 0 })}
                  >
                    Security-first
                  </Chip>
                  <Chip
                    active={checked.xdr && checked.email && checked.bdr && checked.saasbkp && (servers > 0 ? checked.server : true)}
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
                <Field label="Company">
                  <Input required value={lead.company} onChange={(e)=>setLead({...lead, company:e.target.value})} placeholder="Acme Inc." />
                </Field>
                <Field label="Work email">
                  <Input required type="email" value={lead.email} onChange={(e)=>setLead({...lead, email:e.target.value})} placeholder="name@company.com" />
                </Field>
                <Field label="Phone (optional)">
                  <Input value={lead.phone} onChange={(e)=>setLead({...lead, phone:e.target.value})} placeholder="+1…" />
                </Field>
                <Field label="Notes / priorities">
                  <Input value={lead.notes} onChange={(e)=>setLead({...lead, notes:e.target.value})} placeholder="e.g., audit, co-managed, M365, DR…" />
                </Field>
              </div>

              <div className="flex items-center gap-3">
                <button className="rounded-lg px-5 py-3 font-semibold bg-cyan-400/10 text-cyan-300 border border-cyan-300/30 hover:bg-cyan-400/20">
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
                  <Info className="h-4 w-4" /> Submitted — we’ll email a tailored quote shortly.
                </div>
              )}
            </form>
          </Reveal>

          {/* ===== Sticky Summary ===== */}
          <Reveal>
            <aside className="lg:sticky lg:top-24 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.03] p-6">
              <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">Your estimate</div>
              <h3 className="text-xl font-semibold mt-1">Managed IT (USD)</h3>

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
                  <span className="font-semibold">{currency(baseMonthly)}</span>
                </div>

                {addons.lines.map((l) => (
                  <div key={l.label} className="flex items-center justify-between text-slate-300">
                    <span className="inline-flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-cyan-300" /> {l.label}
                    </span>
                    <span>{currency(l.cost)}</span>
                  </div>
                ))}

                {annual && (
                  <div className="flex items-center justify-between text-emerald-300/90">
                    <span>Annual discount (10%)</span>
                    <span>-{currency(Math.max(0, baseMonthly + addons.total - monthlyAfterDiscount))}</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span>Onboarding (one-time)</span>
                  <span>{currency(onboardFee)}</span>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-3 text-base">
                  <span className="font-semibold">{annual ? "Annual total (pre-tax)" : "Monthly total (pre-tax)"}</span>
                  <span className="font-extrabold text-cyan-300">
                    {annual ? currency(withOnboarding) : currency(withOnboarding)}
                  </span>
                </div>
              </div>

              <div className="mt-4 text-[12px] text-slate-400 leading-relaxed">
                Prices are in USD and exclude applicable taxes. Final quote may vary after discovery.
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

        {/* ===== Process strip ===== */}
        <Reveal className="mt-12">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">Process</div>
            <h3 className="text-lg font-semibold">From quote to impact — typically one week</h3>
            <div className="grid md:grid-cols-4 gap-4 mt-4 text-sm">
              {[
                ["Discover", "Light audit: assets, identity, risks." , Users],
                ["Stabilize", "Patching, EDR/XDR, backups verified.", ShieldCheck],
                ["Operate", "SLAs, workflows, monthly KPIs.", MonitorSmartphone],
                ["Grow", "Roadmap & budget with your vCIO.", /* Building2 */ Users],
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
