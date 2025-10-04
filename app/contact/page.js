// SERVER COMPONENT — Contact (SSR, JS)
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/siteConfig";
import { redirect } from "next/navigation";
import {
  Mail, Phone, MapPin, ArrowRight, Clock, Laptop2,
  ShieldCheck, Server, Paperclip, MessageSquareText, Sparkles
} from "lucide-react";
import CopyButton from "@/components/CopyButton";

async function sendContact(form) {
  // plug into your email/CRM here
  console.log("Contact form:", form);
}

export default function ContactPage({ searchParams }) {
  const email = site?.email ?? "hello@hazitexperts.com";
  const phone = site?.phone ?? "+1 (302) 555-0139";
  const address = site?.address ?? "Wilmington, DE, USA";
  const submitted = searchParams?.ok === "1";

  async function submit(formData) {
    "use server";
    const data = {
      name: (formData.get("name") || "").toString().trim(),
      company: (formData.get("company") || "").toString().trim(),
      workEmail: (formData.get("workEmail") || "").toString().trim(),
      phone: (formData.get("phone") || "").toString().trim(),
      users: (formData.get("users") || "").toString(),
      location: (formData.get("location") || "").toString().trim(),
      priority: (formData.get("priority") || "P3").toString(),
      stack: formData.getAll("stack").map(String),
      message: (formData.get("message") || "").toString().trim(),
      consent: formData.get("consent") === "on",
      source: "contact-page",
    };

    if (!data.name || !data.company || !data.workEmail || !data.message) {
      redirect("/contact?ok=0");
    }
    await sendContact(data);
    redirect("/contact?ok=1");
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to the MSP that treats your IT like mission-critical"
        sub="Tell us about your environment. We’ll reply fast with clear next steps."
      />

      <main className="max-w-6xl mx-auto px-4 pb-24">
        {/* ===== Info cards ===== */}
        <Reveal>
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">Direct</div>
              <div className="mt-2 text-sm">
                <a className="inline-flex items-center gap-2 hover:text-cyan-300 transition" href={`mailto:${email}`}>
                  <Mail className="w-4 h-4" /> {email}
                </a>
                <CopyButton text={email} className="ms-2" />
              </div>
              <div className="mt-1 text-sm">
                <a className="inline-flex items-center gap-2 hover:text-cyan-300 transition" href={`tel:${phone.replace(/\s+/g,"")}`}>
                  <Phone className="w-4 h-4" /> {phone}
                </a>
                <CopyButton text={phone} className="ms-2" />
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
              <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">SLA Promise</div>
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
              <p className="text-xs text-slate-400 mt-2">24/7 helpdesk. Business hours: Mon–Fri 9:00–18:00 (ET).</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">Channels</div>
              <ul className="mt-2 text-sm text-slate-300 space-y-1">
                <li className="flex items-center gap-2"><MessageSquareText className="h-4 w-4 text-cyan-300"/> Email, chat portal, phone</li>
                <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-cyan-300"/> Security incidents triaged P1</li>
                <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-cyan-300"/> Remote anywhere • Onsite metro tiers</li>
              </ul>
            </div>
          </div>
        </Reveal>

        {/* ===== Form (NOTE: no method/encType when using action function) ===== */}
        <Reveal className="mt-10">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-7">
            {submitted && (
              <div className="rounded-lg border border-emerald-400/30 bg-emerald-500/10 p-4 text-sm">
                Thanks! We’ve received your request. <span className="text-emerald-300">Target response for P1 is ≤ 15 minutes.</span>
              </div>
            )}

            <form action={submit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400">Your name</label>
                  <input name="name" required className="w-full rounded-lg bg-transparent border border-white/20 px-3 py-2 text-sm outline-none focus:border-cyan-300/50" />
                </div>
                <div>
                  <label className="text-xs text-slate-400">Company</label>
                  <input name="company" required className="w-full rounded-lg bg-transparent border border-white/20 px-3 py-2 text-sm outline-none focus:border-cyan-300/50" />
                </div>
                <div>
                  <label className="text-xs text-slate-400">Work email</label>
                  <input name="workEmail" type="email" required className="w-full rounded-lg bg-transparent border border-white/20 px-3 py-2 text-sm outline-none focus:border-cyan-300/50" />
                </div>
                <div>
                  <label className="text-xs text-slate-400">Phone (optional)</label>
                  <input name="phone" className="w-full rounded-lg bg-transparent border border-white/20 px-3 py-2 text-sm outline-none focus:border-cyan-300/50" />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-slate-400">Users</label>
                  <select name="users" className="w-full rounded-lg bg-transparent border border-white/20 px-3 py-2 text-sm outline-none focus:border-cyan-300/50">
                    {["10-24","25-50","51-100","101-200","200+"].map(x=>(
                      <option key={x} value={x} className="bg-[#0b1220]">{x}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400">Primary location</label>
                  <input name="location" placeholder="e.g. Wilmington, DE" className="w-full rounded-lg bg-transparent border border-white/20 px-3 py-2 text-sm outline-none focus:border-cyan-300/50" />
                </div>
                <div>
                  <label className="text-xs text-slate-400">Priority</label>
                  <select name="priority" className="w-full rounded-lg bg-transparent border border-white/20 px-3 py-2 text-sm outline-none focus:border-cyan-300/50">
                    <option value="P1" className="bg-[#0b1220]">P1 — Critical</option>
                    <option value="P2" className="bg-[#0b1220]">P2 — High</option>
                    <option value="P3" className="bg-[#0b1220]">P3 — Normal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400">Current stack</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["Microsoft 365","Google Workspace","Windows","macOS","Android/iOS","Servers/AD","Firewalls/Wi-Fi"].map(x=>(
                    <label key={x} className="px-3 py-1.5 rounded-lg text-xs border border-white/10 hover:border-cyan-300/30 bg-white/5 cursor-pointer flex items-center gap-2">
                      <input type="checkbox" name="stack" value={x} className="accent-cyan-400" /> {x}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400">How can we help?</label>
                <textarea
                  name="message"
                  required rows={6}
                  placeholder="Example: Co-managed helpdesk and MDM baseline for ~80 users. Also email security & backup/DR."
                  className="w-full rounded-lg bg-transparent border border-white/20 px-3 py-2 text-sm outline-none focus:border-cyan-300/50"
                />
                <div className="mt-2 text-xs text-slate-400 flex items-center gap-2">
                  <Paperclip className="h-3.5 w-3.5 text-cyan-300"/> Attachments? Email to <a className="underline decoration-dotted underline-offset-2" href={`mailto:${email}`}>{email}</a>
                </div>
              </div>

              <label className="text-xs flex items-center gap-2 text-slate-300">
                <input type="checkbox" name="consent" defaultChecked className="accent-cyan-400" />
                You agree to be contacted about this request.
              </label>

              <div className="flex items-center justify-between">
                <div className="text-xs text-slate-400 inline-flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-cyan-300"/> We’ll never sell or share your data.
                </div>
                <button
                  type="submit"
                  className="rounded-lg px-5 py-2.5 text-sm font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 inline-flex items-center gap-2"
                >
                  Send <ArrowRight className="h-4 w-4"/>
                </button>
              </div>
            </form>
          </div>
        </Reveal>

        {/* Trust strip + CTA… (unchanged) */}
        {/* ... */}
      </main>
    </>
  );
}
