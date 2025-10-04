// app/about/page.jsx
// ─────────────────────────────────────────────────────────────────────────────
// SERVER COMPONENT (no "use client") — SSR markup; interactivity via small
// client islands (Reveal, AboutTabs). US MSP content for Supreme IT Experts.
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import AboutTabs from "@/components/AboutTabs";
import {
  Users, ShieldCheck, Timer, Trophy, Target,
  Building2, Handshake, Rocket, Leaf, BookOpen,
  HeartHandshake, ChevronRight, Quote, Mail, Linkedin
} from "lucide-react";

/* ── PAGE (SSR) ───────────────────────────────────────────────────────────── */
export default async function AboutPage() {
  return (
    <>
      {/* =====================================================================
         HERO SECTION
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
            ["2019+", "Hands-on experience across US SMBs", <Building2 key="b" className="h-5 w-5 text-cyan-300" />],
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
           CEO NOTE + COLLAGE
           =================================================================== */}
        <div className="grid lg:grid-cols-5 gap-8 mt-12 items-center">
          <Reveal className="lg:col-span-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
              <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">From our founder & CEO</div>
              <h2 className="text-2xl md:text-3xl font-semibold mt-2">
                “IT isn’t just keeping the lights on — it’s about <span className="text-cyan-300">measurable outcomes</span>.”
              </h2>
              <p className="text-slate-300 mt-3">
                We operate as a small but senior team with documented SOPs, visible KPIs, and security-first defaults.
                Every month leadership sees what matters: uptime, response, coverage, and a clear view of risk.
              </p>

              <div className="mt-5 flex items-center gap-4">
                <div className="h-14 w-14 rounded-full overflow-hidden border border-white/10">
                  <Image src="/media/ceo.jpg" alt="CEO" width={56} height={56} className="h-full w-full object-cover" />
                </div>
                <div>
                  <div className="font-semibold">Haziq Ahmed</div>
                  <div className="text-slate-400 text-sm">Founder & CEO</div>
                  <div className="flex gap-3 mt-1 text-sm">
                    <a className="inline-flex items-center gap-1 text-cyan-300 hover:underline" href="mailto:ceo@supremeitexperts.com">
                      <Mail className="h-4 w-4" /> Email
                    </a>
                    <a className="inline-flex items-center gap-1 text-cyan-300 hover:underline" href="#" target="_blank" rel="noreferrer">
                      <Linkedin className="h-4 w-4" /> LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-2">
            <div className="relative h-80">
              {/* Base */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 bg-black/20">
                <Image src="/media/team.jpg" alt="Team" fill className="object-cover" />
              </div>
              {/* Overlay small */}
              <div className="absolute -left-4 top-6 w-1/3 rounded-2xl overflow-hidden border border-white/10 shadow-lg -rotate-[2deg]">
                <div className="relative h-32 md:h-36">
                  <Image src="/media/work-1.jpg" alt="On-site" fill className="object-cover" />
                </div>
              </div>
              {/* Offset */}
              <div className="absolute right-3 -bottom-6 w-1/2 rounded-2xl overflow-hidden border border-white/10 shadow-xl rotate-[1.5deg]">
                <div className="relative h-40 md:h-48">
                  <Image src="/media/rack.jpg" alt="Rack" fill className="object-cover" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ===================================================================
           TABS: MISSION / VALUES / SLAs  (client island)
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
                ["2019", "Company founded — first US SMB rollouts"],
                ["2021", "EDR everywhere + baseline hardening playbooks"],
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
           LEADERSHIP
           =================================================================== */}
        <Reveal className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Leadership</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Haziq Ahmed", role: "Founder & CEO", img: "/media/ceo.jpg", bio: "Strategy, security posture, and key accounts." },
              { name: "Anaya Khan", role: "Head of Ops", img: "/media/ops.jpg", bio: "Helpdesk workflows, SLAs, and QA." },
              { name: "Usman R.", role: "Principal Engineer", img: "/media/principal.jpg", bio: "Cloud/identity, MDM, and network architecture." },
            ].map((p) => (
              <div key={p.name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="rounded-xl overflow-hidden border border-white/10">
                  <Image src={p.img} alt={p.name} width={800} height={380} className="w-full h-44 object-cover" />
                </div>
                <div className="mt-3">
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-sm text-slate-400">{p.role}</div>
                  <p className="text-sm text-slate-300 mt-1">{p.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ===================================================================
           TEAM GRID (hover bios)
           =================================================================== */}
        <Reveal className="mt-12">
          <h2 className="text-xl font-semibold mb-4">The Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              ["Ali S.", "Senior SysAdmin", "/media/team-1.jpg"],
              ["Mehak K.", "Security Engineer", "/media/team-2.jpg"],
              ["Danish A.", "Cloud Engineer", "/media/team-3.jpg"],
              ["Hasan B.", "NOC Lead", "/media/team-4.jpg"],
              ["Ayesha T.", "Support Engineer", "/media/team-5.jpg"],
              ["Zain U.", "MDM Specialist", "/media/team-6.jpg"],
              ["Hiba M.", "Project Coordinator", "/media/team-7.jpg"],
              ["Bilal F.", "Network Engineer", "/media/team-8.jpg"],
            ].map(([n, r, src]) => (
              <div key={n} className="relative rounded-2xl overflow-hidden border border-white/10 group">
                <Image src={src} alt={n} width={800} height={480} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition" />
                <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition">
                  <div className="text-sm font-semibold">{n}</div>
                  <div className="text-xs text-slate-300">{r}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ===================================================================
           TEAM BUILDING / CSR
           =================================================================== */}
        <Reveal className="mt-12">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">Team building & CSR</div>
              <h3 className="text-lg font-semibold mt-1">We invest in people & community</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                <li className="flex gap-2"><HeartHandshake className="h-4 w-4 text-cyan-300" /> Quarterly offsites & skills workshops</li>
                <li className="flex gap-2"><Leaf className="h-4 w-4 text-cyan-300" /> NGO support for digital literacy</li>
                <li className="flex gap-2"><Users className="h-4 w-4 text-cyan-300" /> Mentorship for interns & grads</li>
              </ul>
              <div className="mt-4">
                <Link
                  href="/careers"
                  className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:border-cyan-300/30 hover:bg-cyan-400/10 hover:text-cyan-300 transition"
                >
                  Join our team <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="relative h-72">
              <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10">
                <Image src="/media/offsite-1.jpg" alt="Offsite" fill className="object-cover" />
              </div>
              <div className="absolute -left-4 -bottom-6 w-1/2 rounded-2xl overflow-hidden border border-white/10 shadow-xl rotate-[2deg]">
                <div className="relative h-40">
                  <Image src="/media/offsite-2.jpg" alt="Workshop" fill className="object-cover" />
                </div>
              </div>
            </div>
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
