"use client";

import { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import {
  Users, ShieldCheck, Timer, Sparkles, Trophy, Target,
  Building2, Handshake, Rocket, Leaf, BookOpen, HeartHandshake,
  ChevronRight, Quote, Mail, Linkedin
} from "lucide-react";

/* Safe <img> with SVG fallback so broken images na aaye */
function Img({ src, alt, className }) {
  const fallback =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'>
         <defs>
           <linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
             <stop offset='0' stop-color='#22d3ee'/>
             <stop offset='1' stop-color='#a855f7'/>
           </linearGradient>
         </defs>
         <rect width='1200' height='800' fill='url(#g)'/>
         <rect x='120' y='140' width='960' height='520' rx='28' fill='rgba(255,255,255,0.06)'/>
       </svg>`
    );
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => { if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback; }}
      loading="lazy"
      decoding="async"
    />
  );
}

export default function AboutPage() {
  const [tab, setTab] = useState("mission"); // tabs: mission | values | slas

  return (
    <>
      {/* ===== HERO ===== */}
      <PageHero
        eyebrow="About us"
        title="We’re the team that treats your IT like mission-critical"
        sub="Small, senior core. Clear SLAs. Security-first mindset. We scale with you from 10 to 500 users."
      />

      <section className="max-w-6xl mx-auto px-4 pb-20">
        {/* Snapshots / Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            ["2019+", "Hands-on experience across SMEs", <Building2 key="b" className="h-5 w-5 text-cyan-300" />],
            ["<15 min", "Priority-1 response target", <Timer key="t" className="h-5 w-5 text-cyan-300" />],
            ["24/7", "Helpdesk & monitoring", <ShieldCheck key="s" className="h-5 w-5 text-cyan-300" />],
          ].map(([k,v,Icon], i) => (
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

        {/* ===== CEO NOTE + Collage ===== */}
        <div className="grid lg:grid-cols-5 gap-8 mt-12 items-center">
          <Reveal className="lg:col-span-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
              <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">From our founder & CEO</div>
              <h2 className="text-2xl md:text-3xl font-semibold mt-2">
                “IT ka kaam sirf chalana nahi — <span className="text-cyan-300">measurable outcomes</span> dena hai.”
              </h2>
              <p className="text-slate-300 mt-3">
                Hum chhoti magar senior team rakhte hain—documented SOPs, visible KPIs aur
                security-first defaults. Aap ki leadership ko har month wohi dikhate hain jo
                matter karta hai: uptime, response, coverage, aur risk appetite ka clear view.
              </p>

              <div className="mt-5 flex items-center gap-4">
                <Img
                  src="/media/ceo.jpg" /* Add this */
                  alt="CEO"
                  className="h-14 w-14 rounded-full object-cover border border-white/10"
                />
                <div>
                  <div className="font-semibold">Haziq Ahmed</div>
                  <div className="text-slate-400 text-sm">Founder & CEO</div>
                  <div className="flex gap-3 mt-1 text-sm">
                    <a className="inline-flex items-center gap-1 text-cyan-300 hover:underline" href="mailto:ceo@hazitexperts.com"><Mail className="h-4 w-4"/> Email</a>
                    <a className="inline-flex items-center gap-1 text-cyan-300 hover:underline" href="#" target="_blank"><Linkedin className="h-4 w-4"/> LinkedIn</a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-2">
            <div className="relative h-80">
              {/* Base */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 bg-black/20 group">
                <Img src="/media/team.jpg" alt="Team" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
              </div>
              {/* Overlay small */}
              <div className="absolute -left-4 top-6 w-1/3 rounded-2xl overflow-hidden border border-white/10 shadow-lg -rotate-[2deg] group">
                <Img src="/media/work-1.jpg" alt="On-site" className="w-full h-32 md:h-36 object-cover transition-transform duration-500 group-hover:scale-[1.06]" />
              </div>
              {/* Offset */}
              <div className="absolute right-3 -bottom-6 w-1/2 rounded-2xl overflow-hidden border border-white/10 shadow-xl rotate-[1.5deg] group">
                <Img src="/media/rack.jpg" alt="Rack" className="w-full h-40 md:h-48 object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
              </div>
            </div>
          </Reveal>
        </div>

        {/* ===== TABS: Mission / Values / SLAs ===== */}
        <Reveal className="mt-12">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-2">
            <div className="flex gap-2 p-1">
              {[
                ["mission","Our mission"],
                ["values","Values we live by"],
                ["slas","SLAs & tooling"]
              ].map(([id,label]) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition
                    ${tab===id ? "bg-cyan-400/15 text-cyan-300 border border-cyan-300/30"
                               : "bg-white/0 text-slate-300 hover:bg-white/5"}`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="p-4 md:p-6">
              {tab==="mission" && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg">Make SME IT boring (in the best way)</h3>
                    <p className="text-slate-300 mt-2">
                      Predictable response, visible KPIs, and secure baselines so business can focus on growth.
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-slate-300">
                      <li className="flex gap-2"><Sparkles className="h-4 w-4 text-cyan-300"/> Quick wins in week one</li>
                      <li className="flex gap-2"><ShieldCheck className="h-4 w-4 text-cyan-300"/> Security-first defaults</li>
                      <li className="flex gap-2"><Target className="h-4 w-4 text-cyan-300"/> Roadmap with budgets</li>
                    </ul>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-white/10">
                    <Img src="/media/dashboard.jpg" alt="Monitoring" className="w-full h-56 object-cover"/>
                  </div>
                </div>
              )}
              {tab==="values" && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    [Trophy,"Own the outcome","We measure success by user experience."],
                    [BookOpen,"Document & automate","SOPs first, then tooling."],
                    [Handshake,"Be a partner","No fluff, just honest advice."],
                    [Leaf,"Secure by default","Hardening, EDR/XDR, backup/DR."],
                    [Users,"Empathy for users","Less friction, more enablement."],
                    [Rocket,"Bias for action","Ship improvements weekly."],
                  ].map(([Icon,t,d]) => (
                    <div key={t} className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center gap-2">
                        <Icon className="h-5 w-5 text-cyan-300"/><div className="font-medium">{t}</div>
                      </div>
                      <p className="text-sm text-slate-300 mt-1">{d}</p>
                    </div>
                  ))}
                </div>
              )}
              {tab==="slas" && (
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    ["Response targets","P1 ≤ 15 min, P2 ≤ 1 hr, P3 same day"],
                    ["Tooling included","EDR/XDR, patching, monitoring, email security, backup/DR"],
                    ["Reporting","Monthly leadership KPIs & recommendations"],
                  ].map(([t,d])=>(
                    <div key={t} className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="font-medium">{t}</div>
                      <p className="text-sm text-slate-300 mt-1">{d}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Reveal>

        {/* ===== Milestones Timeline ===== */}
        <Reveal className="mt-12">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">Milestones</div>
            <ol className="relative border-s border-white/10 ps-6 mt-4 space-y-7">
              {[
                ["2019","Company founded — first SME rollouts"],
                ["2021","EDR everywhere + baseline hardening playbooks"],
                ["2022","24/7 helpdesk & monitoring; cloud migrations"],
                ["2023","vCIO practice; measurable KPI reporting"],
                ["2024","99.9% endpoint coverage; SOC-ready posture"]
              ].map(([y,txt]) => (
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

        {/* ===== Leadership ===== */}
        <Reveal className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Leadership</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {name:"Haziq Ahmed", role:"Founder & CEO", img:"/media/ceo.jpg", bio:"Strategy, security posture, and key accounts."},
              {name:"Anaya Khan", role:"Head of Ops", img:"/media/ops.jpg", bio:"Helpdesk workflows, SLAs, and QA."},
              {name:"Usman R.", role:"Principal Engineer", img:"/media/principal.jpg", bio:"Cloud/identity, MDM, and network architecture."},
            ].map((p)=>(
              <div key={p.name} className="rounded-2xl border border-white/10 bg-white/5 p-4 group">
                <div className="rounded-xl overflow-hidden border border-white/10">
                  <Img src={p.img} alt={p.name} className="w-full h-44 object-cover group-hover:scale-[1.02] transition-transform duration-500" />
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

        {/* ===== Team Grid (hover bios) ===== */}
        <Reveal className="mt-12">
          <h2 className="text-xl font-semibold mb-4">The Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              ["Ali S.","Senior SysAdmin","/media/team-1.jpg"],
              ["Mehak K.","Security Engineer","/media/team-2.jpg"],
              ["Danish A.","Cloud Engineer","/media/team-3.jpg"],
              ["Hasan B.","NOC Lead","/media/team-4.jpg"],
              ["Ayesha T.","Support Engineer","/media/team-5.jpg"],
              ["Zain U.","MDM Specialist","/media/team-6.jpg"],
              ["Hiba M.","Project Coordinator","/media/team-7.jpg"],
              ["Bilal F.","Network Engineer","/media/team-8.jpg"],
            ].map(([n,r,src])=>(
              <div key={n} className="relative rounded-2xl overflow-hidden border border-white/10 group">
                <Img src={src} alt={n} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition" />
                <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition">
                  <div className="text-sm font-semibold">{n}</div>
                  <div className="text-xs text-slate-300">{r}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ===== Team Building / CSR ===== */}
        <Reveal className="mt-12">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">Team building & CSR</div>
              <h3 className="text-lg font-semibold mt-1">We invest in people & community</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                <li className="flex gap-2"><HeartHandshake className="h-4 w-4 text-cyan-300"/> Quarterly offsites & skills workshops</li>
                <li className="flex gap-2"><Leaf className="h-4 w-4 text-cyan-300"/> NGO support for digital literacy</li>
                <li className="flex gap-2"><Users className="h-4 w-4 text-cyan-300"/> Mentorship for interns & grads</li>
              </ul>
              <div className="mt-4">
                <Link href="/careers" className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:border-cyan-300/30 hover:bg-cyan-400/10 hover:text-cyan-300 transition">
                  Join our team <ChevronRight className="h-4 w-4"/>
                </Link>
              </div>
            </div>
            <div className="relative h-72">
              <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10">
                <Img src="/media/offsite-1.jpg" alt="Offsite" className="w-full h-full object-cover"/>
              </div>
              <div className="absolute -left-4 -bottom-6 w-1/2 rounded-2xl overflow-hidden border border-white/10 shadow-xl rotate-[2deg]">
                <Img src="/media/offsite-2.jpg" alt="Workshop" className="w-full h-40 object-cover"/>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ===== CTA ===== */}
        <Reveal className="mt-12">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/15 to-fuchsia-500/15 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">Meet the people who’ll own your outcomes</h3>
              <p className="text-slate-300">Book a 20-min call—no pressure, quick assessment, clear next steps.</p>
            </div>
            <div className="flex gap-3">
              <Link href="/get-quote" className="rounded-lg px-5 py-3 font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition">Get Quote</Link>
              <Link href="/contact" className="rounded-lg px-5 py-3 font-semibold bg-white/10 ring-1 ring-white/20 hover:bg-white/20 transition">Contact</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
