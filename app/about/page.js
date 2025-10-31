// app/about/page.jsx
// ─────────────────────────────────────────────────────────────────────────────
// SERVER COMPONENT (no "use client")
// Order (per request):
// 1) Hero/Stats  2) Certifications (members with Experience + Certs)
// 3) Video Testimonials (dummy, no faces)  4) How We Solve (step-by-step + imgs)
// 5) Team (collage + content)  6) How We Work  7) CSR  8) CTA
// Milestones removed.
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import AboutTabs from "@/components/AboutTabs";
import {
  Users,
  ShieldCheck,
  Timer,
  Building2,
  BadgeCheck,
  PlayCircle,
  Lightbulb,
  ServerCog,
  CheckCircle2,
  Workflow,
  Rocket,
  HeartHandshake,
  Leaf,
} from "lucide-react";

function MemberPanel({ name, role, experience = [], certs = [] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold">{name}</div>
          <div className="text-xs text-slate-400">{role}</div>
        </div>
        <BadgeCheck className="h-5 w-5 text-cyan-300" />
      </div>

      {/* Experience */}
      <div className="mt-4">
        <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">Experience</div>
        <ul className="mt-2 space-y-2 text-sm text-slate-300">
          {experience.map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-1.5 size-1.5 rounded-full bg-cyan-300/70" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Certifications */}
      <div className="mt-5">
        <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">Certifications</div>
        <div className="mt-2 grid sm:grid-cols-2 gap-2">
          {certs.map((c, i) => (
            <div key={i} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300">
              {c}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

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
           CERTIFICATIONS (Members: Muhammad Hazrat & Abdul Rauf)
           =================================================================== */}
        <Reveal className="mt-12">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
            <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">Certifications</div>
            <h2 className="text-xl font-semibold mt-1">Our certified leads</h2>
            <p className="text-slate-300 text-sm mt-2">
              Team ke 2 core members — alag alag specialization ke saath — directly own your outcomes.
            </p>

            <div className="grid lg:grid-cols-2 gap-6 mt-6">
              <MemberPanel
                name="Muhammad Hazrat"
                role="Senior Systems & Security Lead"
                experience={[
                  "Microsoft 365/Azure hardening & identity baseline (CIS-aligned)",
                  "EDR/XDR rollouts, patch orchestration, and vulnerability remediation",
                  "Backups & DR runbooks; RPO/RTO planning for SMB workloads",
                  "Email security: phishing defense, isolation, and DMARC alignment",
                ]}
                certs={[
                  "Microsoft 365: Admin & Security (AZ-900/SC-900 level)",
                  "Intune/MDM device compliance & baselines",
                  "EDR/XDR (Huntress/Defender stack)",
                  "Aruba (switching/WLAN) foundations",
                ]}
              />

              <MemberPanel
                name="Abdul Rauf"
                role="vCIO & Delivery Lead"
                experience={[
                  "Quarterly roadmaps with budgets and measurable KPIs",
                  "Cloud migrations (email, files, apps) with minimal downtime",
                  "Process → automation → reporting (SOP-first approach)",
                  "Stakeholder enablement: training, adoption, & governance",
                ]}
                certs={[
                  "Google Workspace Admin (foundational)",
                  "Microsoft 365 Admin (foundational)",
                  "Backup/DR design (Axcient-like stack)",
                  "Email security & deliverability (SPF/DKIM/DMARC)",
                ]}
              />
            </div>
          </div>
        </Reveal>

        {/* ===================================================================
           VIDEO TESTIMONIALS (dummy, no faces)
           =================================================================== */}
        <Reveal className="mt-12">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
            <div className="flex items-center gap-2">
              <PlayCircle className="h-5 w-5 text-cyan-300" />
              <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">Testimonials & Work</div>
            </div>
            <p className="text-slate-300 text-sm mt-2">
              Short clips (no faces) jo uptime, responsiveness aur hardening outcomes highlight karte hain.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              {[
                { src: "/media/testimonials/t1.mp4", poster: "/media/testimonials/poster1.jpg", caption: "Retail Ops — faster response & weekly improvements" },
                { src: "/media/testimonials/t2.mp4", poster: "/media/testimonials/poster2.jpg", caption: "SaaS Startup — clean KPIs leadership understands" },
              ].map((v) => (
                <div key={v.src} className="rounded-xl border border-white/10 bg-black/30 overflow-hidden">
                  <div className="relative aspect-video">
                    <video controls preload="metadata" className="w-full h-full object-cover" poster={v.poster}>
                      <source src={v.src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="p-4 text-sm text-slate-300">{v.caption}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ===================================================================
           HOW WE SOLVE PROBLEMS (step-by-step + images)
           =================================================================== */}
        <Reveal className="mt-12">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
            <div className="flex items-center gap-2">
              <Workflow className="h-5 w-5 text-cyan-300" />
              <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">How we solve problems</div>
            </div>
            <p className="text-slate-300 text-sm mt-2">
              Step-by-step method jo week-one quick wins se le kar quarterly roadmaps tak measurable outcomes deta hai.
            </p>

            <div className="mt-6 grid lg:grid-cols-4 sm:grid-cols-2 gap-4">
              {[
                {
                  step: "1) Discover",
                  desc: "Stakeholder interviews, current-state audit, quick wins & risk snapshot.",
                  icon: <Lightbulb className="h-5 w-5 text-cyan-300" />,
                  img: "/media/how/01-discover.jpg",
                },
                {
                  step: "2) Stabilize",
                  desc: "Hardening baselines, MDM, patching, EDR/XDR, email security, backup/DR.",
                  icon: <ServerCog className="h-5 w-5 text-cyan-300" />,
                  img: "/media/how/02-stabilize.jpg",
                },
                {
                  step: "3) Prove",
                  desc: "SOPs → automation; KPIs for uptime, response, coverage; monthly reports.",
                  icon: <CheckCircle2 className="h-5 w-5 text-cyan-300" />,
                  img: "/media/how/03-prove.jpg",
                },
                {
                  step: "4) Scale",
                  desc: "vCIO roadmap, budgets, training & adoption; ship improvements weekly.",
                  icon: <Rocket className="h-5 w-5 text-cyan-300" />,
                  img: "/media/how/04-scale.jpg",
                },
              ].map(({ step, desc, icon, img }) => (
                <div key={step} className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                  <div className="relative h-28 border-b border-white/10">
                    <Image src={img} alt={step} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2">
                      {icon}
                      <div className="font-medium">{step}</div>
                    </div>
                    <p className="text-sm text-slate-300 mt-1">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ===================================================================
           TEAM (collage + content)
           =================================================================== */}
        <Reveal className="mt-12">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-cyan-300" />
              <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">Team</div>
            </div>

            <div className="grid lg:grid-cols-5 gap-6 mt-4 items-start">
              {/* Collage */}
              <div className="lg:col-span-3">
                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/20 h-64">
                  <Image src="/media/team-collage/hero.jpg" alt="Team hero collage" fill className="object-cover" />
                </div>

                <div className="grid grid-cols-3 gap-3 mt-3">
                  {["/media/team-collage/thumb1.jpg", "/media/team-collage/thumb2.jpg", "/media/team-collage/thumb3.jpg"].map((src) => (
                    <div key={src} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-black/20">
                      <Image src={src} alt="Team thumb" fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-2">
                <h3 className="text-lg font-semibold">Small, senior, outcome-driven</h3>
                <p className="text-slate-300 text-sm mt-2">
                  Hum lean team hain — ticket ping-pong nahi, directly senior engineers. Documentation & automation pe
                  focus hota hai taa ke har mahine measurable improvements deliver hon.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  <li className="flex gap-2"><span className="mt-1.5 size-1.5 rounded-full bg-cyan-300/70" /> Security-first defaults</li>
                  <li className="flex gap-2"><span className="mt-1.5 size-1.5 rounded-full bg-cyan-300/70" /> Clear SLAs & visible KPIs</li>
                  <li className="flex gap-2"><span className="mt-1.5 size-1.5 rounded-full bg-cyan-300/70" /> vCIO roadmaps & budgets</li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ===================================================================
           HOW WE WORK (kept)
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
           TEAM BUILDING / CSR (kept)
           =================================================================== */}
        <Reveal className="mt-12">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">Team building & CSR</div>
            <h3 className="text-lg font-semibold mt-1">We invest in people & community</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li className="flex gap-2"><HeartHandshake className="h-4 w-4 text-cyan-300" /> Quarterly offsites & skills workshops</li>
              <li className="flex gap-2"><Leaf className="h-4 w-4 text-cyan-300" /> NGO support for digital literacy</li>
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
