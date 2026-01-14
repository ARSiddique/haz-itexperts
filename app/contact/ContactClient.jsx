"use client";

import Link from "next/link";
import { ShieldCheck, Clock, ArrowRight, CheckCircle2, MapPin, Lock, Wrench } from "lucide-react";
import LeadFormSimple from "@/components/LeadFormSimple";
import ContactActionsRow from "@/components/ContactActionsRow";

function cx(...a) {
  return a.filter(Boolean).join(" ");
}

export default function ContactClient({ source = "contact-page", mode = "full" }) {
  return (
    <main className={cx("max-w-6xl mx-auto px-4 pb-24", mode === "full" ? "pt-12 md:pt-16" : "pt-10")}>
      {/* HERO / STORY */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-10">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 size-72 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 size-80 rounded-full bg-fuchsia-500/15 blur-3xl" />
        </div>

        <div className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">Contact</div>

        <h1 className="mt-3 text-3xl md:text-5xl font-extrabold leading-[1.08]">
          When IT feels “fine”… until it doesn’t.
        </h1>

        <p className="mt-4 text-slate-200 max-w-[78ch]">
          A lot of teams reach out after the same chain reaction: a weird login prompt, one mailbox gets compromised,
          devices start drifting out of compliance, backups haven’t been tested, and suddenly you’re fighting fires.
          If that sounds familiar — it’s not “bad luck.” It’s usually a missing baseline.
        </p>

        <div className="mt-6 grid md:grid-cols-3 gap-4 text-sm">
          {[
            ["The small signals", "Slow devices, random sign-outs, users clicking suspicious links."],
            ["The real risk", "MFA gaps, weak mail security, untested backups, patch drift."],
            ["The fix", "Stabilize baseline fast → then a simple 30–90 day plan."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="font-semibold text-slate-100">{t}</div>
              <div className="mt-1 text-slate-300">{d}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {/* ✅ This now goes to FREE ASSESSMENT FORM section */}
          <Link
            href="/lp/allentown#claim"
            className="rounded-lg px-4 py-2 text-sm border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 inline-flex items-center gap-2"
          >
            Free IT Assessment <ArrowRight className="h-4 w-4" />
          </Link>

          <div className="text-xs text-slate-400 inline-flex items-center gap-2 px-2">
            <ShieldCheck className="h-4 w-4 text-cyan-300" />
            Remote-first MSP • Clear next steps
          </div>

          <div className="text-xs text-slate-400 inline-flex items-center gap-2 px-2">
            <Clock className="h-4 w-4 text-cyan-300" />
            Reply during business hours
          </div>
        </div>
      </section>

      {/* FORM + NEXT STEPS */}
      <section className="mt-8 grid lg:grid-cols-[1.05fr_0.95fr] gap-6 items-start" id="contact-form">
        <LeadFormSimple
          source={source}
          title="Send a quick message"
          sub="Tell us what’s happening — we’ll reply with the cleanest next step."
          cta="Send"
          defaultSubject="Website Contact"
        />

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">What happens next</div>
          <h2 className="mt-2 text-xl font-bold">A calm, simple process</h2>

          <ol className="mt-3 space-y-3 text-sm text-slate-300">
            <li className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <span className="text-slate-100 font-medium">1)</span> We confirm scope in 2–3 questions.
            </li>
            <li className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <span className="text-slate-100 font-medium">2)</span> You get quick wins + risk hotspots.
            </li>
            <li className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <span className="text-slate-100 font-medium">3)</span> We share a practical 30–90 day plan.
            </li>
          </ol>

          <div className="mt-5 text-xs text-slate-400">
            Want a faster option? The Allentown Free IT Assessment page has a dedicated claim form.
          </div>

          <div className="mt-4">
            <Link
              href="/lp/allentown#claim"
              className="w-full text-center rounded-lg px-4 py-2.5 text-sm font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 inline-flex items-center justify-center gap-2"
            >
              Go to Free Assessment <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SEO CONTENT (to make page longer + rankable) */}
      <section className="mt-10 grid lg:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 lg:col-span-2">
          <div className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">Why teams contact us</div>
          <h2 className="mt-2 text-2xl font-extrabold">Managed IT + Cybersecurity, without the chaos</h2>

          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            If you’re in <span className="text-slate-100 font-medium">Allentown</span>,{" "}
            <span className="text-slate-100 font-medium">Macungie</span>, or{" "}
            <span className="text-slate-100 font-medium">Emmaus</span>, we can support you remotely with a predictable
            helpdesk, device hygiene, Microsoft 365 hardening, backups you can actually restore, and practical security
            baselines.
          </p>

          <div className="mt-5 grid sm:grid-cols-2 gap-3 text-sm">
            {[
              { icon: <Lock className="h-4 w-4 text-cyan-300" />, t: "Security baseline", d: "MFA/SSO, email security, endpoint protection." },
              { icon: <Wrench className="h-4 w-4 text-cyan-300" />, t: "Stability + support", d: "Fast triage, clean escalations, less downtime." },
              { icon: <CheckCircle2 className="h-4 w-4 text-cyan-300" />, t: "Backups that restore", d: "Testing + alerts so you’re not guessing." },
              { icon: <MapPin className="h-4 w-4 text-cyan-300" />, t: "Local focus", d: "Allentown-area SMBs, remote-first delivery." },
            ].map((x) => (
              <div key={x.t} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2 font-semibold text-slate-100">
                  {x.icon} {x.t}
                </div>
                <div className="mt-1 text-slate-300 text-sm">{x.d}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/services"
              className="rounded-lg px-4 py-2 text-sm bg-white/10 ring-1 ring-white/15 hover:bg-white/15"
            >
              View Services
            </Link>
            <Link
              href="/areas-we-serve"
              className="rounded-lg px-4 py-2 text-sm bg-white/10 ring-1 ring-white/15 hover:bg-white/15"
            >
              Areas We Serve
            </Link>
            <Link
              href="/faqs"
              className="rounded-lg px-4 py-2 text-sm bg-white/10 ring-1 ring-white/15 hover:bg-white/15"
            >
              FAQs
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">Quick FAQ</div>
          <h3 className="mt-2 text-lg font-bold">Before you reach out</h3>

          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="font-semibold text-slate-100">How fast do you respond?</div>
              <div className="mt-1">We triage incidents quickly and reply during business hours with next steps.</div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="font-semibold text-slate-100">Do you support remote-only?</div>
              <div className="mt-1">Yes — remote-first support across the Allentown area for SMBs.</div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="font-semibold text-slate-100">What should I write in the message?</div>
              <div className="mt-1">Just the basics: company, user count, and what’s currently breaking.</div>
            </div>
          </div>

          <div className="mt-5">
            <Link
              href="/lp/allentown#claim"
              className="w-full text-center rounded-lg px-4 py-2.5 text-sm font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 inline-flex items-center justify-center gap-2"
            >
              Claim Free Assessment <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA strip */}
      <section className="mt-10">
        <ContactActionsRow source={source} />
      </section>
    </main>
  );
}
