// app/about/page.jsx
// ─────────────────────────────────────────────────────────────────────────────
// SERVER COMPONENT (no "use client")
// Clean version: no individual headshots. One big team image + text sections.
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import AboutTabs from "@/components/AboutTabs";
import { Users, ShieldCheck, Timer, Building2, Quote, HeartHandshake, Leaf } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      {/* =====================================================================
         HERO
         ===================================================================== */}
      <PageHero
        eyebrow="About us"
        title="We treat your IT like mission-critical"
        sub="A small, senior core with clear SLAs and a security-first mindset. From 10 to 500 users — we scale with you."
      />

      <section className="max-w-6xl mx-auto px-4 pb-20">
        {/* ===================================================================
           SNAPSHOTS / STATS
           =================================================================== */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            ["2019+", "Hands-on experience across SMBs", <Building2 key="b" className="h-5 w-5 text-cyan-300" />],
            ["<15 min", "Priority-1 response target", <Timer key="t" className="h-5 w-5 text-cyan-300" />],
            ["24/7", "Helpdesk & monitoring", <ShieldCheck key="s" className="h-5 w-5 text-cyan-300" />],
          ].map(([k, v, Icon], i) => (
            <Reveal key={i}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-cyan-300">{k}</div>
                  {Icon}
                </div>
                <div className="text-slate-400 text-sm mt-1">{v}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ===================================================================
           NOTE + BIG TEAM IMAGE (single hero photo)
           =================================================================== */}
        <div className="grid lg:grid-cols-5 gap-8 mt-12 items-center">
          <Reveal className="lg:col-span-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
              <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">From our founder</div>
              <h2 className="text-2xl md:text-3xl font-semibold mt-2">
                “IT isn’t just keeping the lights on — it’s about <span className="text-cyan-300">measurable outcomes</span>.”
              </h2>
              <p className="text-slate-300 mt-3">
                We run lean with documented SOPs, visible KPIs, and security-first defaults. Leadership sees uptime,
                response, coverage, and a clear view of risk — no fluff, just outcomes.
              </p>
            </div>
          </Reveal>

          {/* Single centerpiece team image (use your /public/media/team.jpg) */}
          <Reveal className="lg:col-span-2">
            <div className="relative h-80 rounded-2xl overflow-hidden border border-white/10 bg-black/20">
              <Image src="/media/team.jpg" alt="Our team" fill className="object-cover" />
            </div>
          </Reveal>
        </div>

        {/* ===================================================================
           TABS: MISSION / VALUES / SLAs  (client island; uses /media/dashboard.jpg)
           =================================================================== */}
        <Reveal className="mt-12">
          <AboutTabs />
        </Reveal>

        {/* ===================================================================
           MILESTONES TIMELINE
           =================================================================== */}
        <Reveal className="mt-12">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">Milestones</div>
            <ol className="relative border-s border-white/10 ps-6 mt-4 space-y-7">
              {[
                ["2019", "Company founded — first SMB rollouts"],
                ["2021", "EDR everywhere + hardening baselines"],
                ["2022", "24/7 helpdesk & monitoring; cloud migrations"],
                ["2023", "vCIO practice; measurable KPI reporting"],
                ["2024", "99.9% endpoint coverage; SOC-ready posture"],
              ].map(([y, txt]) => (
                <li key={y} className="ms-2">
                  <span className="absolute -start-3.5 mt-1 grid place-items-center size-6 rounded-full bg-cyan-400/20 border border-cyan-300/40">
                    <Quote className="h-3.5 w-3.5 text-cyan-300" />
                  </span>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-sm text-cyan-300 font-semibold">{y}</div>
                    <div className="text-slate-300 text-sm">{txt}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        {/* ===================================================================
           HOW WE WORK (text-only instead of Leadership/Team)
           =================================================================== */}
        <Reveal className="mt-12">
          <h2 className="text-xl font-semibold mb-4">How we work</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              ["Security-first by default", "Hardening baselines, EDR/XDR, MDM, patching, and tested backups."],
              ["SOPs → automation → KPIs", "Documented processes, then scripts, then visible results."],
              ["Clear SLAs", "P1 in minutes, predictable turnaround for the rest."],
              ["Roadmaps, not guesswork", "Quarterly vCIO, budgets, and a pipeline of improvements."],
              ["Hands-on senior help", "No ticket ping-pong. People who’ve actually shipped."],
              ["Outcome reporting", "Monthly leadership snapshots: risk, uptime, coverage, actions."],
            ].map(([t, d]) => (
              <div key={t} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="font-medium">{t}</div>
                <p className="text-sm text-slate-300 mt-1">{d}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ===================================================================
           TEAM BUILDING / CSR (text-only)
           =================================================================== */}
        <Reveal className="mt-12">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">Team building & CSR</div>
            <h3 className="text-lg font-semibold mt-1">We invest in people & community</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li className="flex gap-2"><HeartHandshake className="h-4 w-4 text-cyan-300" /> Quarterly offsites & skills workshops</li>
              <li className="flex gap-2"><Leaf className="h-4 w-4 text-cyan-300" /> NGO support for digital literacy</li>
              <li className="flex gap-2"><Users className="h-4 w-4 text-cyan-300" /> Mentorship for interns & grads</li>
            </ul>
          </div>
        </Reveal>

        {/* ===================================================================
           CTA
           =================================================================== */}
        <Reveal className="mt-12">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/15 to-fuchsia-500/15 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">Meet the people who’ll own your outcomes</h3>
              <p className="text-slate-300">Book a 20-min call — quick assessment, clear next steps.</p>
            </div>
            <div className="flex gap-3">
              <Link href="/get-quote" className="rounded-lg px-5 py-3 font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition">
                Get Quote
              </Link>
              <Link href="/contact" className="rounded-lg px-5 py-3 font-semibold bg-white/10 ring-1 ring-white/20 hover:bg-white/20 transition">
                Contact
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
