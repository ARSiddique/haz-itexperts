"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import {
  Mail, Phone, MapPin, ArrowRight, Copy, Check, Clock, Laptop2,
  ShieldCheck, Server, Paperclip, ChevronRight, MessageSquareText, Globe, Sparkles
} from "lucide-react";
import { site } from "@/lib/siteConfig";

function cx(...a){ return a.filter(Boolean).join(" "); }

const Input = (p) => (
  <input {...p}
    className={cx("rounded-lg bg-transparent border px-3 py-2 text-sm outline-none",
      "border-white/20 focus:border-cyan-300/50", p.className)}
  />
);
const TextArea = (p) => (
  <textarea {...p}
    className={cx("w-full rounded-lg bg-transparent border px-3 py-2 text-sm outline-none",
      "border-white/20 focus:border-cyan-300/50", p.className)}
  />
);

export default function ContactClient() {
  const email = site?.email ?? "hello@hazitexperts.com";
  const phone = site?.phone ?? "+92-3XX-XXXXXXX";
  const address = site?.address ?? "Gulberg, Lahore, Pakistan";

  const [copied, setCopied] = useState("");
  const copy = async (txt, key) => {
    try { await navigator.clipboard.writeText(txt); setCopied(key); setTimeout(()=>setCopied(""), 1300); } catch {}
  };

  const [step, setStep] = useState(1);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const [form, setForm] = useState({
    name: "", company: "", workEmail: "", phone: "",
    users: "25-50", stack: ["Microsoft 365"], location: "Lahore",
    priority: "P2", message: "", consent: true,
  });

  const sla = useMemo(() => {
    switch (form.priority) {
      case "P1": return { label: "P1 — Critical", eta: "≤ 15 min" };
      case "P2": return { label: "P2 — High",     eta: "≤ 1 hour" };
      default:   return { label: "P3 — Normal",   eta: "Same business day" };
    }
  }, [form.priority]);

  const disabledNext1 = !(form.name && form.company && /\S+@\S+\.\S+/.test(form.workEmail));
  const disabledNext2 = !(form.users && form.location);
  const disabledSubmit = !(form.message && form.consent);

  const onSubmit = async (e) => {
    e?.preventDefault();
    if (disabledSubmit) return;
    setSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "contact-page" }),
      });
      if (res.ok) { setDone(true); setSending(false); return; }
      throw new Error("api failed");
    } catch {
      const lines = [
        `Name: ${form.name}`,
        `Company: ${form.company}`,
        `Email: ${form.workEmail}`,
        `Phone: ${form.phone || "-"}`,
        `Users: ${form.users}`,
        `Stack: ${form.stack.join(", ")}`,
        `Location: ${form.location}`,
        `Priority: ${form.priority} (${sla.eta})`,
        "", "Message:", form.message,
      ];
      const body = encodeURIComponent(lines.join("\n"));
      window.location.href = `mailto:${email}?subject=${encodeURIComponent("Website Contact — " + form.company)}&body=${body}`;
      setSending(false);
      setDone(true);
    }
  };

  const StackChip = ({label}) => {
    const active = form.stack.includes(label);
    return (
      <button
        type="button"
        onClick={() =>
          setForm((f)=>({ ...f, stack: active ? f.stack.filter(x=>x!==label) : [...f.stack, label] }))
        }
        className={cx(
          "px-3 py-1.5 rounded-lg text-xs border transition",
          active ? "border-cyan-300/30 text-cyan-300 bg-cyan-400/10"
                 : "border-white/10 text-slate-300 hover:bg-white/5"
        )}
      >
        {label}
      </button>
    );
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to the MSP that treats your IT like mission-critical"
        sub="Tell us about your environment. We’ll reply fast with clear next steps."
      />

      <main className="max-w-6xl mx-auto px-4 pb-24">
        {/* Top info cards */}
        <Reveal>
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">Direct</div>
              <div className="mt-2 text-sm">
                <a className="inline-flex items-center gap-2 hover:text-cyan-300 transition" href={`mailto:${email}`}>
                  <Mail className="w-4 h-4" /> {email}
                </a>
                <button onClick={()=>copy(email,"email")} className="ms-2 text-xs inline-flex items-center gap-1 opacity-80 hover:opacity-100">
                  {copied==="email" ? <><Check className="h-3.5 w-3.5"/> Copied</> : <><Copy className="h-3.5 w-3.5"/> Copy</>}
                </button>
              </div>
              <div className="mt-1 text-sm">
                <a className="inline-flex items-center gap-2 hover:text-cyan-300 transition" href={`tel:${phone.replaceAll(" ","")}`}>
                  <Phone className="w-4 h-4" /> {phone}
                </a>
                <button onClick={()=>copy(phone,"phone")} className="ms-2 text-xs inline-flex items-center gap-1 opacity-80 hover:opacity-100">
                  {copied==="phone" ? <><Check className="h-3.5 w-3.5"/> Copied</> : <><Copy className="h-3.5 w-3.5"/> Copy</>}
                </button>
              </div>
              <div className="mt-2 text-sm inline-flex items-center gap-2 opacity-90">
                <MapPin className="w-4 h-4" /> {address}
              </div>
              <div className="mt-4 flex gap-2">
                <Link href="/get-quote" className="rounded-lg px-3 py-2 text-sm border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20">Get Quote</Link>
                <Link href="/assessment" className="rounded-lg px-3 py-2 text-sm bg-white/10 ring-1 ring-white/20 hover:bg-white/20 inline-flex items-center gap-2">Free IT assessment <ArrowRight className="h-4 w-4"/></Link>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">SLA promise</div>
              <div className="mt-2 grid grid-cols-3 gap-3 text-sm">
                {[
                  ["P1", "≤ 15 min"],
                  ["P2", "≤ 1 hr"],
                  ["P3", "Same day"],
                ].map(([k,v])=>(
                  <div key={k} className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                    <div className="text-cyan-300 font-semibold">{k}</div>
                    <div className="text-slate-300 text-xs">{v} response</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-2">24/7 helpdesk. Business hours: Mon–Fri 9:00–18:00 (PKT).</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">Channels</div>
              <ul className="mt-2 text-sm text-slate-300 space-y-1">
                <li className="flex items-center gap-2"><MessageSquareText className="h-4 w-4 text-cyan-300"/> Email, chat portal, phone</li>
                <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-cyan-300"/> Security incidents triaged P1</li>
                <li className="flex items-center gap-2"><Globe className="h-4 w-4 text-cyan-300"/> Remote anywhere • Onsite metro tiers</li>
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Multi-step form */}
        <Reveal className="mt-10">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-7">
            {/* progress */}
            <div className="flex items-center gap-2 text-xs">
              {["Details","Environment","Message"].map((t,i)=>(
                <div key={t} className="flex items-center gap-2">
                  <div className={cx(
                    "size-6 grid place-items-center rounded-full border",
                    step>=i+1 ? "border-cyan-300/40 bg-cyan-400/10 text-cyan-300" : "border-white/10 text-slate-400"
                  )}>{i+1}</div>
                  <span className={cx("hidden sm:inline", step>=i+1 ? "text-slate-200" : "text-slate-400")}>{t}</span>
                  {i<2 && <span className="w-6 h-[2px] bg-white/10 rounded-full" />}
                </div>
              ))}
            </div>

            <form className="mt-6 space-y-5" onSubmit={onSubmit}>
              {step===1 && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className="text-xs text-slate-400">Your name</label>
                    <Input required value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/></div>
                  <div><label className="text-xs text-slate-400">Company</label>
                    <Input required value={form.company} onChange={e=>setForm(f=>({...f,company:e.target.value}))}/></div>
                  <div><label className="text-xs text-slate-400">Work email</label>
                    <Input required type="email" value={form.workEmail} onChange={e=>setForm(f=>({...f,workEmail:e.target.value}))}/></div>
                  <div><label className="text-xs text-slate-400">Phone (optional)</label>
                    <Input value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))}/></div>
                </div>
              )}

              {step===2 && (
                <>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs text-slate-400">Users</label>
                      <select
                        value={form.users}
                        onChange={(e)=>setForm(f=>({...f,users:e.target.value}))}
                        className="w-full rounded-lg bg-transparent border border-white/20 px-3 py-2 text-sm outline-none focus:border-cyan-300/50"
                      >
                        {["10-24","25-50","51-100","101-200","200+"].map(x=>(
                          <option key={x} value={x} className="bg-[#0b1220]">{x}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Primary location</label>
                      <Input value={form.location} onChange={e=>setForm(f=>({...f,location:e.target.value}))}/>
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Priority</label>
                      <div className="flex gap-2">
                        {["P1","P2","P3"].map(p=>(
                          <button key={p} type="button"
                            onClick={()=>setForm(f=>({...f,priority:p}))}
                            className={cx(
                              "px-3 py-2 rounded-lg text-sm border transition",
                              form.priority===p ? "border-cyan-300/30 text-cyan-300 bg-cyan-400/10"
                                                 : "border-white/10 text-slate-300 hover:bg-white/5"
                            )}
                          >{p}</button>
                        ))}
                      </div>
                      <div className="mt-1 text-xs text-slate-400 inline-flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 text-cyan-300"/> Target response {sla.eta}
                      </div>
                    </div>
                  </div>

                  <div className="mt-2">
                    <label className="text-xs text-slate-400">Current stack</label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {["Microsoft 365","Google Workspace","Windows","macOS","Android/iOS","Servers/AD","Firewalls/Wi-Fi"].map(x=>(
                        <StackChip key={x} label={x}/>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {step===3 && (
                <>
                  <div>
                    <label className="text-xs text-slate-400">How can we help?</label>
                    <TextArea rows={6} value={form.message}
                      onChange={e=>setForm(f=>({...f,message:e.target.value}))}
                      placeholder="Example: Co-managed helpdesk and MDM baseline for ~80 users. Also email security & backup/DR."
                    />
                    <div className="mt-2 text-xs text-slate-400 flex items-center gap-2">
                      <Paperclip className="h-3.5 w-3.5 text-cyan-300"/> Attachments? Email to <a className="underline decoration-dotted underline-offset-2" href={`mailto:${email}`}>{email}</a>
                    </div>
                  </div>
                  <label className="text-xs flex items-center gap-2 text-slate-300">
                    <input type="checkbox" checked={form.consent} onChange={e=>setForm(f=>({...f,consent:e.target.checked}))}/>
                    You agree to be contacted about this request.
                  </label>
                </>
              )}

              <div className="flex items-center justify-between">
                <div className="text-xs text-slate-400 inline-flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-cyan-300"/> We’ll never sell or share your data.
                </div>
                <div className="flex gap-2">
                  {step>1 && (
                    <button type="button" onClick={()=>setStep(s=>s-1)}
                      className="rounded-lg px-4 py-2 text-sm border border-white/10 bg-white/5 hover:bg-white/10">
                      Back
                    </button>
                  )}
                  {step<3 && (
                    <button type="button" disabled={step===1?disabledNext1:disabledNext2}
                      onClick={()=> setStep(s=>s+1)}
                      className={cx(
                        "rounded-lg px-4 py-2 text-sm border",
                        step===1?disabledNext1:disabledNext2
                          ? "border-white/10 text-slate-400"
                          : "border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
                      )}>
                      Next <ChevronRight className="h-4 w-4 inline-block ms-1"/>
                    </button>
                  )}
                  {step===3 && (
                    <button type="submit" disabled={disabledSubmit || sending}
                      className={cx(
                        "rounded-lg px-5 py-2.5 text-sm font-semibold border transition inline-flex items-center gap-2",
                        disabledSubmit || sending
                          ? "border-white/10 text-slate-400"
                          : "border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
                      )}>
                      {sending ? "Sending…" : "Send"} {!sending && <ArrowRight className="h-4 w-4"/>}
                    </button>
                  )}
                </div>
              </div>

              {done && (
                <div className="mt-4 rounded-lg border border-emerald-400/30 bg-emerald-500/10 p-3 text-sm">
                  Thanks! We’ve received your request. <span className="text-emerald-300">Target response {sla.eta}</span>.
                </div>
              )}
            </form>
          </div>
        </Reveal>

        {/* Trust strip */}
        <Reveal className="mt-10">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              [Laptop2, "Endpoints", "MDM baselines, patching, app catalogs"],
              [Server, "Infra & Cloud", "Monitoring, identity, backup/DR"],
              [ShieldCheck, "Security", "EDR/XDR 99.9%, email security+"],
            ].map(([Icon, t, d])=>(
              <div key={t} className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-cyan-300/30 transition">
                <div className="flex items-center gap-2">
                  <span className="grid place-items-center size-9 rounded-xl bg-cyan-400/10 border border-cyan-300/20">
                    <Icon className="h-5 w-5 text-cyan-300"/>
                  </span>
                  <div className="font-semibold">{t}</div>
                </div>
                <p className="text-sm text-slate-300 mt-2">{d}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* FAQ preview */}
        <Reveal className="mt-12">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">FAQs</h2>
              <Link href="/faqs" className="text-sm text-cyan-300 inline-flex items-center gap-2">
                See all <ArrowRight className="h-4 w-4"/>
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mt-3">
              {[
                ["How fast do you respond?", "P1 ≤ 15 min, P2 ≤ 1 hr, P3 same business day."],
                ["Do you do co-managed IT?", "Yes — we integrate with in-house teams with SLAs & KPIs."],
                ["What tools are included?", "EDR/XDR, patching, monitoring, email security, backup/DR."],
              ].map(([q,a])=>(
                <div key={q} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="font-medium">{q}</div>
                  <p className="text-sm text-slate-300 mt-1">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal className="mt-12">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/15 to-fuchsia-500/15 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">Prefer a quick call?</h3>
              <p className="text-slate-300">15-min no-pressure assessment — we’ll map gaps and next steps.</p>
            </div>
            <div className="flex gap-3">
              <a href={`tel:${phone.replaceAll(" ","")}`} className="rounded-lg px-5 py-3 font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 inline-flex items-center gap-2">
                Call now <Phone className="h-4 w-4"/>
              </a>
              <Link href="/get-quote" className="rounded-lg px-5 py-3 font-semibold bg-white/10 ring-1 ring-white/20 hover:bg-white/20 inline-flex items-center gap-2">
                Get Quote <Sparkles className="h-4 w-4"/>
              </Link>
            </div>
          </div>
        </Reveal>
      </main>
    </>
  );
}
