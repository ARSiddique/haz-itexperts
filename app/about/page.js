// app/about/page.jsx
import Link from "next/link";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import AboutTabs from "@/components/AboutTabs";
import MemberProfile from "@/components/MemberProfile";
import TeamGallery from "@/components/TeamGallery";
import VideoStrip from "@/components/VideoStrip";
import ImageFallback from "@/components/ImageFallback";

import {
  Users,
  ShieldCheck,
  Timer,
  BadgeCheck,
  Workflow,
  Lightbulb,
  ServerCog,
  CheckCircle2,
  Rocket,
  HeartHandshake,
  Leaf,
  Building2, // kept in case you want to swap icons later
} from "lucide-react";

function SectionHeading({ icon: Icon, title, sub }) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-5 w-5 text-cyan-300" />
      <div>
        <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">{title}</div>
        {sub && <div className="text-base md:text-lg font-semibold mt-1">{sub}</div>}
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="We treat your IT like mission-critical"
        sub="A senior core with clear SLAs, security-first defaults, and measurable outcomes — ideal for startups and growing SMBs."
        className="sm:px-5 md:px-6"
      />

      <section className="max-w-6xl mx-auto px-4 sm:px-5 md:px-6 pb-20">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            ["Startup-ready", "From early-stage to scale-ups", <Rocket key="r" className="h-5 w-5 text-cyan-300" />],
            ["≤15 min", "Priority-1 response target", <Timer key="t" className="h-5 w-5 text-cyan-300" />],
            ["24/7", "Helpdesk, monitoring & alerting", <ShieldCheck key="s" className="h-5 w-5 text-cyan-300" />],
          ].map(([k, v, Icon], i) => (
            <Reveal key={i}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-cyan-300/30 transition">
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-cyan-300">{k}</div>
                  {Icon}
                </div>
                <div className="text-slate-400 text-sm mt-1">{v}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Our story — bigger visual + copy, fully responsive */}
        <Reveal className="mt-12 sm:mt-14 md:mt-16">
          <SectionHeading icon={Users} title="OUR STORY" sub="Small senior team, built for outcomes" />
          <div className="mt-4 grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-white/10">
              <div className="relative h-56 sm:h-64 md:h-80 lg:h-96">
                <ImageFallback
                  src="/media/story/meeting.jpg"
                  alt="Team working"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 66vw, 100vw"
                />
              </div>
            </div>
            <div className="lg:col-span-1">
              <p className="text-slate-300 leading-7 break-words">
                We’re a focused startup led by senior engineers. Our belief is simple:
                <span className="text-cyan-300"> IT should be boring for the business</span> — reliable, visible, and secure.
                We document first, automate second, and report what leadership cares about:
                user experience, risk reduction, and time-to-value.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                <li>• CIS-aligned baselines by default — not an afterthought.</li>
                <li>• Planned change windows with rollback to avoid disruption.</li>
                <li>• Quarterly vCIO cadence with budgets and a transparent risk register.</li>
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Certified leads */}
        <Reveal className="mt-12 sm:mt-14 md:mt-16">
          <SectionHeading icon={BadgeCheck} title="CERTIFICATIONS" sub="Our certified leads" />
          <div className="mt-6 grid lg:grid-cols-2 gap-6">
            <MemberProfile
              size="lg"
              name="Muhammad Hazrat"
              role="Senior Systems & Security Lead"
              img="/media/members/hazrat.jpg"
              summary="Hazrat designs secure-by-default Microsoft 365 and endpoint environments that don’t slow teams down. His focus is measurable hardening and silent reliability."
              specialties={[
                "Identity & device baselines (Entra ID, Intune MDM, Windows CIS)",
                "EDR/XDR deployment, patch orchestration & vulnerability remediation",
                "Backup/DR design with tested RPO/RTO targets and tabletop exercises",
                "Email security & deliverability (SPF/DKIM/DMARC) and user awareness",
              ]}
              highlights={[
                "Retail group to 98% endpoint coverage in 90 days",
                "M365 migrations with staged cutovers and zero downtime",
                "Huntress/Defender XDR rollout, incident noise down dramatically",
                "CIS drift monitoring + monthly posture scorecards",
              ]}
              stack={["Microsoft 365", "Entra ID", "Intune / MDM", "Defender XDR", "Huntress", "Axcient Backup"]}
              industries={["Retail Ops", "SaaS", "Professional Services"]}
              quote="Secure by default, then automate. Tools without process only create noise."
            />

            <MemberProfile
              size="lg"
              name="Abdul Rauf"
              role="vCIO & Delivery Lead"
              img="/media/members/rauf.jpg"
              summary="Rauf owns roadmaps, budgets and executive reporting. He translates technical work into business language leaders can trust and act on."
              specialties={[
                "Quarterly vCIO planning with budgets, risk register & KPI dashboards",
                "Low-risk cloud migrations (mail/files/apps) with clear rollback paths",
                "SOP → automation → reporting for uptime, response & coverage",
                "Stakeholder training, governance and adoption enablement",
              ]}
              highlights={[
                "Week-one quick-wins cut escalations and lift CSAT",
                "SPF/DKIM/DMARC alignment reduced bounces by 80% for a SaaS client",
                "Shadow-IT discovery → secure, sanctioned tooling and deprecation plan",
                "Executive snapshots: risk, uptime, coverage and next-action plan",
              ]}
              stack={["Google Workspace", "Microsoft 365", "Jamf/MDM", "Axcient", "Aruba", "Fortinet"]}
              industries={["Multi-site Retail", "SaaS", "Agencies"]}
              quote="If it can't be explained in a one-page KPI snapshot, it’s not finished."
            />
          </div>
        </Reveal>

        {/* Testimonials — responsive height + fluid video */}
        <Reveal className="mt-12 sm:mt-14 md:mt-16">
          <SectionHeading icon={Users} title="TESTIMONIALS & WORK" sub="Faceless b-roll that highlights outcomes" />
          <VideoStrip
            heightClass="h-52 sm:h-60 md:h-72"
            items={[
              { src: "/media/testimonials/typing-01.mp4", poster: null, caption: "Retail Operations — faster response & weekly improvements" },
              { src: "/media/testimonials/typing-02.mp4", poster: null, caption: "SaaS Startup — clean KPIs the leadership understands" },
            ]}
            chips={[{ label: "P1 ≤ 15m" }, { label: "Uptime 99.9%" }]}
          />
        </Reveal>

        {/* How we solve — bigger cards + responsive image band */}
        <Reveal className="mt-12 sm:mt-14 md:mt-16">
          <SectionHeading icon={Workflow} title="HOW WE SOLVE PROBLEMS" sub="From quick wins in week one to quarterly roadmaps" />
          <div className="mt-6 grid lg:grid-cols-4 sm:grid-cols-2 gap-5">
            {[
              {
                step: "1) Discover",
                desc:
                  "Stakeholder interviews, current-state mapping and a risk snapshot. We also ship immediate ‘week-one’ fixes so teams feel the difference right away.",
                icon: Lightbulb,
                img: "/media/how/01-discover.jpg",
              },
              {
                step: "2) Stabilize",
                desc:
                  "Lock down identities/devices with CIS baselines, Intune MDM and EDR/XDR. Patching cadence and email protections reduce noise so work can flow.",
                icon: ServerCog,
                img: "/media/how/02-stabilize.jpg",
              },
              {
                step: "3) Prove",
                desc:
                  "SOPs become automation. We publish KPIs for uptime, response and coverage, plus monthly reports that show risk reductions and user impact.",
                icon: CheckCircle2,
                img: "/media/how/03-prove.jpg",
              },
              {
                step: "4) Scale",
                desc:
                  "Run a vCIO cadence — budgeted roadmaps, adoption plans and planned change windows. Improvements ship weekly so value compounds.",
                icon: Rocket,
                img: "/media/how/04-scale.jpg",
              },
            ].map(({ step, desc, icon: Icon, img }) => (
              <div
                key={step}
                className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-cyan-300/30 transition"
              >
                <div className="relative h-36 sm:h-40 md:h-48 lg:h-52 border-b border-white/10">
                  <ImageFallback
                    src={img}
                    alt={step}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center size-7 rounded-full bg-cyan-400/15 border border-cyan-300/30 text-xs text-cyan-200">
                      {step.split(")")[0]}
                    </span>
                    <div className="font-semibold">{step.replace(/^\d+\)\s*/, "")}</div>
                  </div>
                  <p className="text-sm text-slate-300 mt-2 leading-6">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Team collage — larger visuals, responsive heights */}
        <Reveal className="mt-12 sm:mt-14 md:mt-16">
          <div className="flex items-center gap-3 mb-3">
            <svg className="h-5 w-5 text-cyan-300" viewBox="0 0 24 24" fill="none">
              <path d="M16 11c1.657 0 3-1.79 3-4s-1.343-4-3-4-3 1.79-3 4 1.343 4 3 4Zm-8 0c1.657 0 3-1.79 3-4S9.657 3 8 3 5 4.79 5 7s1.343 4 3 4Zm0 2c-2.761 0-5 2.239-5 5v1a1 1 0 0 0 1 1h8.05a6.5 6.5 0 0 1-.55-2.6c0-1.64.61-3.14 1.62-4.28A6.96 6.96 0 0 0 8 13Zm8 0a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">Team</div>
              <div className="text-base md:text-lg font-semibold">Small, senior, outcome-driven</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-3">
              <TeamGallery
                hero="/media/team-collage/collage-main.jpg"
                thumbs={[
                  "/media/team-collage/collage-1.jpg",
                  "/media/team-collage/collage-2.jpg",
                  "/media/team-collage/collage-3.jpg",
                ]}
                heroHeight="h-72 sm:h-80 md:h-96"
                thumbHeight="h-40 sm:h-44 md:h-48"
              />
            </div>

            <div className="lg:col-span-2">
              <h3 className="text-lg font-semibold">Small team, big outcomes</h3>
              <p className="text-slate-300 text-[15px] mt-3 leading-7 break-words">
                Work directly with senior engineers. We document, automate and report progress so leaders see clear movement
                every month. No ticket ping-pong. No endless hand-offs. Changes are planned and reversible, so improvements
                ship weekly without chaos.
              </p>
              <ul className="mt-5 grid grid-cols-1 gap-2 text-[14px] text-slate-300">
                <li className="flex gap-2"><span className="mt-1.5 size-1.5 rounded-full bg-cyan-300/70" /> Security-first defaults</li>
                <li className="flex gap-2"><span className="mt-1.5 size-1.5 rounded-full bg-cyan-300/70" /> Clear SLAs & visible KPIs</li>
                <li className="flex gap-2"><span className="mt-1.5 size-1.5 rounded-full bg-cyan-300/70" /> vCIO roadmaps & budgets</li>
                <li className="flex gap-2"><span className="mt-1.5 size-1.5 rounded-full bg-cyan-300/70" /> Weekly shipped improvements</li>
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Why companies choose us */}
        <Reveal className="mt-12 sm:mt-14 md:mt-16">
          <SectionHeading icon={ShieldCheck} title="WHY COMPANIES CHOOSE US" sub="Practical wins that compound" />
          <div className="grid md:grid-cols-3 gap-6 mt-4">
            {[
              ["Noise down, focus up", "Hardening + EDR/MDM cut incident noise so teams can work without constant interruptions."],
              ["Change without chaos", "We plan change windows with rollback, communicate clearly, and ship weekly improvements."],
              ["Reports leaders use", "One-page KPI snapshots that track uptime, response, coverage and risk — board-ready."],
            ].map(([t, d]) => (
              <div key={t} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="font-medium">{t}</div>
                <p className="text-sm text-slate-300 mt-2 leading-6">{d}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Tabs */}
        <Reveal className="mt-12 sm:mt-14 md:mt-16">
          <AboutTabs />
        </Reveal>

        {/* Team building / CSR */}
        <Reveal className="mt-12 sm:mt-14 md:mt-16">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">Team building & CSR</div>
            <h3 className="text-lg font-semibold mt-1">We invest in people & community</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li className="flex gap-2"><HeartHandshake className="h-4 w-4 text-cyan-300" /> Quarterly offsites & skills workshops</li>
              <li className="flex gap-2"><Leaf className="h-4 w-4 text-cyan-300" /> NGO support for digital literacy</li>
            </ul>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal className="mt-12 sm:mt-14 md:mt-16">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/15 to-fuchsia-500/15 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">Meet the people who’ll own your outcomes</h3>
              <p className="text-slate-300">Book a 20-minute call — quick assessment, clear next steps.</p>
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
