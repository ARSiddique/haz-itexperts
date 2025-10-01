"use client";
/**
 * HaziTExperts — HOME (Premium v6)
 * - Repeatable reveal (down & up) with ScrollTrigger.create
 * - Section backgrounds (haze + grid) so it never looks empty
 * - Collage overlaps (1–3 images), hover zoom
 * - Services clean (single CTA block)
 * - Process = vertical timeline (no numbers)
 *
 * /public/media: hero-1.jpg, hero-2.jpg, rack.jpg, dashboard.jpg, team.jpg, work-1.jpg, work-2.jpg
 */
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Shield, Server, Cloud, Wrench, Smartphone, Users, ArrowRight,
  CheckCircle2, Cpu, Lock, LineChart, Image as ImageIcon, Sparkles
} from "lucide-react";
import { site } from "@/lib/siteConfig";
import BackToTop from "@/components/BackToTop";
import AutoBot from "@/components/AutoBot";

gsap.registerPlugin(ScrollTrigger);

/* ---------- Safe <img> with SVG fallback ---------- */
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
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0 H0 V40" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width='1200' height='800' fill='url(#g)'/>
        <rect width='1200' height='800' fill='url(#grid)'/>
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

/* ---------- Collage (1–3 images with overlaps) ---------- */
function Collage({ items = [], height = "h-80 md:h-96" }) {
  return (
    <div className={`relative ${height}`} data-reveal="up">
      {/* base */}
      {items[0] && (
        <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 bg-black/20 group">
          <Img
            src={items[0].src}
            alt={items[0].alt || ""}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
      )}
      {/* offset right */}
      {items[1] && (
        <div className="absolute right-3 -bottom-6 w-1/2 rounded-2xl overflow-hidden border border-white/10 shadow-xl rotate-[1.5deg] group">
          <Img
            src={items[1].src}
            alt={items[1].alt || ""}
            className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
      )}
      {/* small badge left */}
      {items[2] && (
        <div className="absolute -left-4 top-6 w-1/3 rounded-2xl overflow-hidden border border-white/10 shadow-lg -rotate-[2deg] group">
          <Img
            src={items[2].src}
            alt={items[2].alt || ""}
            className="w-full h-32 md:h-40 object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          />
        </div>
      )}
    </div>
  );
}

/* ---------- UI helpers ---------- */
const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`relative overflow-hidden`}>
    {/* background haze + grid */}
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute -top-32 -left-24 size-80 rounded-full bg-cyan-500/15 blur-3xl" />
      <div className="absolute -bottom-32 -right-24 size-96 rounded-full bg-fuchsia-500/15 blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04),transparent_35%)]" />
    </div>
    <div className={`max-w-6xl mx-auto px-4 section-enter ${className}`}>{children}</div>
  </section>
);

const Title = ({ k, sub }) => (
  <div className="mb-6" data-reveal="up">
    <div className="text-xs md:text-sm uppercase tracking-[0.2em] text-cyan-300/80">{k}</div>
    <h2 className="text-3xl md:text-5xl font-extrabold leading-tight bg-gradient-to-r from-cyan-300 via-white to-fuchsia-400 bg-clip-text text-transparent">
      {sub}
    </h2>
  </div>
);

const Stat = ({ k, v }) => (
  <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4 text-center transition hover:-translate-y-0.5 hover:border-cyan-300/30" data-reveal="up">
    <div className="text-xl font-bold text-cyan-300">{k}</div>
    <div className="text-slate-300 text-xs">{v}</div>
  </div>
);

const ServiceCard = ({ Icon, t, d, bullets = [] }) => (
  <div
    className="group p-6 rounded-2xl bg-white/[0.06] border border-white/10 transition
               hover:-translate-y-1 hover:shadow-xl hover:border-cyan-300/30"
    data-reveal="up"
  >
    <div className="flex items-center gap-3">
      <span className="grid place-items-center size-10 rounded-xl bg-cyan-400/10 border border-cyan-300/20">
        <Icon className="h-5 w-5 text-cyan-300" />
      </span>
      <h3 className="font-semibold text-lg">{t}</h3>
    </div>
    <p className="text-sm text-slate-300 mt-2">{d}</p>
    {!!bullets.length && (
      <ul className="mt-3 space-y-1">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2 text-sm text-slate-300">
            <Sparkles className="h-4 w-4 text-cyan-300" /> {b}
          </li>
        ))}
      </ul>
    )}
  </div>
);

/* ---------- Page ---------- */
export default function HomePage() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Repeatable reveal (up/down)
      const els = gsap.utils.toArray("[data-reveal]");
      els.forEach((el) => {
        const dir = el.getAttribute("data-reveal"); // 'up' | 'down'
        const fromY = dir === "down" ? -24 : 24;
        gsap.set(el, { y: fromY, opacity: 0 });

        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          end: "bottom 15%",
          onEnter: () => gsap.to(el, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }),
          onLeave: () => gsap.to(el, { y: -fromY, opacity: 0, duration: 0.35, ease: "power3.in" }),
          onEnterBack: () => gsap.to(el, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }),
          onLeaveBack: () => gsap.to(el, { y: fromY, opacity: 0, duration: 0.35, ease: "power3.in" }),
        });
      });

      // Section drift (scrub both ways)
      gsap.utils.toArray(".section-enter").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 18, opacity: 0.98 },
          { y: -10, opacity: 1, ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } }
        );
      });

      // Parallax for anything with data-parallax
      gsap.utils.toArray("[data-parallax='y']").forEach((el) => {
        const speed = Number(el.getAttribute("data-speed") || 0.15);
        gsap.to(el, {
          yPercent: 10 * speed,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      // Divider wipe (every pass)
      document.querySelectorAll(".section-divider").forEach((bar) => {
        ScrollTrigger.create({
          trigger: bar,
          start: "top 92%",
          end: "bottom 82%",
          onEnter: () => gsap.fromTo(bar, { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.6 }),
          onEnterBack: () => gsap.fromTo(bar, { scaleX: 0, transformOrigin: "right center" }, { scaleX: 1, duration: 0.6 }),
        });
      });

      // Hero entrance
      if (heroRef.current) {
        gsap.from(heroRef.current.querySelectorAll(".hero-fx"), {
          y: 24, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.06,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const areas = site.areas ?? ["Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad"];

  return (
    <>
      {/* ============== HERO ============== */}
      <section ref={heroRef} className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 size-72 rounded-full bg-cyan-500/25 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 size-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid lg:grid-cols-2 gap-10 items-center section-enter">
          <div>
            <div className="hero-fx text-xs md:text-sm uppercase tracking-[0.2em] text-cyan-300/80">
              Next-gen Managed IT for SMEs
            </div>
            <h1 className="hero-fx text-4xl md:text-6xl font-extrabold mt-3 leading-tight bg-gradient-to-r from-cyan-300 via-white to-fuchsia-400 bg-clip-text text-transparent">
              {site.tagline}
            </h1>
            <p className="hero-fx mt-4 text-base md:text-lg text-slate-200 max-w-2xl">
              24/7 helpdesk, proactive monitoring, and real security — at a fixed monthly fee.
            </p>

            <div className="hero-fx mt-6 flex flex-col sm:flex-row gap-3">
              <Link href="/get-quote" className="rounded-lg px-5 py-3 font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition">
                Get a Quote
              </Link>
              <a href="#services" className="rounded-lg px-5 py-3 font-semibold bg-white/5 ring-1 ring-white/10 hover:bg-white/10 inline-flex items-center gap-2 group">
                Explore services <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <div className="hero-fx grid md:grid-cols-3 gap-4 mt-10">
              <Stat k="<15 min" v="P1 response target" />
              <Stat k="99.9%" v="EDR/XDR coverage" />
              <Stat k="24/7" v="Helpdesk & monitoring" />
            </div>
          </div>

          <div data-parallax="y" data-speed="0.18" className="section-enter">
            <Collage
              items={[
                { src: "/media/hero-1.jpg", alt: "Fiber optics" },
                { src: "/media/hero-2.jpg", alt: "Cloud & devices" },
              ]}
              height="h-80 md:h-96"
            />
          </div>
        </div>

        <div className="section-divider h-px w-full bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      </section>

      {/* ============== ABOUT ============== */}
      <Section id="about" className="py-16">
        <Title k="About" sub="We keep your business running — and secure" />
        <p className="text-slate-300 max-w-3xl" data-reveal="up">
          We act as your IT department, or augment your in-house team, with real SLAs, documented SOPs,
          and transparent reporting leadership actually reads.
        </p>

        <div className="grid md:grid-cols-2 gap-10 items-center mt-8">
          <div className="grid grid-cols-3 gap-3">
            {[
              ["Playbooks", "Documented SOPs for repeatable results"],
              ["Visibility", "Monthly KPIs leadership actually reads"],
              ["Security-first", "Baseline hardening + EDR/XDR + backup/DR"],
            ].map(([t, d]) => (
              <div key={t} className="rounded-xl border border-white/10 bg-white/5 p-4 transition hover:-translate-y-0.5 hover:border-cyan-300/30" data-reveal="up">
                <div className="font-medium text-sm">{t}</div>
                <p className="text-slate-300 text-xs mt-1">{d}</p>
              </div>
            ))}
          </div>

          <div data-parallax="y" data-speed="0.12">
            <Collage
              items={[
                { src: "/media/rack.jpg", alt: "Server rack" },
                { src: "/media/dashboard.jpg", alt: "Monitoring" },
                { src: "/media/team.jpg", alt: "IT team" },
              ]}
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3" data-reveal="up">
          <Link href="/about" className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:border-cyan-300/30 hover:bg-cyan-400/10 hover:text-cyan-300 transition">
            More about us <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/assessment" className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:border-cyan-300/30 hover:bg-cyan-400/10 hover:text-cyan-300 transition">
            Free IT Assessment <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <div className="section-divider h-px w-full my-12 bg-gradient-to-r from-transparent via-fuchsia-400/40 to-transparent" />

      {/* ============== SERVICES ============== */}
      <Section id="services" className="py-16">
        <Title k="Services" sub="Everything an SME needs — nothing you don’t" />
        <p className="text-slate-300 max-w-3xl" data-reveal="up">
          Choose fully-managed or co-managed. We’ll meet you where you are and raise your baseline fast.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {[
            { Icon: Shield, t: "Managed IT", d: "Helpdesk, patching, monitoring, reporting with SLAs.", bullets: ["Helpdesk workflows", "Proactive maintenance", "Monthly KPIs"] },
            { Icon: Server, t: "Cybersecurity", d: "EDR/XDR, MFA/SSO, email security, backup/DR, vCISO.", bullets: ["EDR/XDR coverage", "Identity hardening", "BCP/DR playbooks"] },
            { Icon: Cloud, t: "Cloud & 365/Workspace", d: "Migrations, identity, MDM, cost optimization.", bullets: ["Tenant security", "Licensing hygiene", "MDM baselines"] },
            { Icon: Wrench, t: "Projects & Consulting", d: "Audits, office moves, network refresh, server/cloud.", bullets: ["Network redesign", "Server refresh", "Zero-trust rollout"] },
            { Icon: Smartphone, t: "Device Management", d: "Windows/Mac/iOS/Android baselines + app deploys.", bullets: ["Baseline config", "App catalogs", "Compliance checks"] },
            { Icon: Users, t: "vCIO / Strategy", d: "Quarterly roadmap, budget planning, measurable KPIs.", bullets: ["Roadmaps", "Budgeting", "Risk register"] },
          ].map((p) => <ServiceCard key={p.t} {...p} />)}
        </div>

        <div className="mt-8 flex gap-3" data-reveal="up">
          <Link href="/services" className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:border-cyan-300/30 hover:bg-cyan-400/10 hover:text-cyan-300 transition">
            All service details <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/get-quote" className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition">
            Pricing & Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <div className="section-divider h-px w-full my-12 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      {/* ============== WINS / CASES ============== */}
      <Section id="wins" className="py-16">
        <Title k="Case Studies" sub="Outcomes your team actually feels" />
        <div className="grid md:grid-cols-3 gap-6">
          <div data-reveal="up">
            <Collage items={[{ src: "/media/work-1.jpg", alt: "Site work" }, { src: "/media/rack.jpg", alt: "Rack" }]} />
            <div className="mt-3">
              <div className="font-medium">Faster P1 handling</div>
              <p className="text-sm text-slate-300">First response down to ≤12 min with SOPs and queue hygiene.</p>
            </div>
          </div>
          <div data-reveal="up">
            <Collage items={[{ src: "/media/dashboard.jpg", alt: "Monitoring" }]} />
            <div className="mt-3">
              <div className="font-medium">Fleet visibility</div>
              <p className="text-sm text-slate-300">99.9% EDR coverage + leadership KPIs that tell the truth.</p>
            </div>
          </div>
          <div data-reveal="up">
            <Collage items={[{ src: "/media/team.jpg", alt: "Team" }, { src: "/media/work-2.jpg", alt: "Work" }, { src: "/media/hero-2.jpg", alt: "Cloud" }]} />
            <div className="mt-3">
              <div className="font-medium">Onboarding without chaos</div>
              <p className="text-sm text-slate-300">MDM baselines in 10 days; predictable new-hire workflow.</p>
            </div>
          </div>
        </div>
      </Section>

      <div className="section-divider h-px w-full my-12 bg-gradient-to-r from-transparent via-fuchsia-400/40 to-transparent" />

      {/* ============== PROCESS ============== */}
      <Section id="process" className="py-16">
        <Title k="Process" sub="A simple, measurable onboarding" />
        <div className="grid md:grid-cols-2 gap-10">
          <ol className="relative border-s border-white/10 ps-6 space-y-8" data-reveal="up">
            {[
              { icon: Cpu, title: "Assess", text: "Light discovery of users, devices, identity, risks." },
              { icon: Lock, title: "Stabilize", text: "Patch, EDR/XDR, baselines for M365/Google, backup/DR." },
              { icon: LineChart, title: "Optimize", text: "Helpdesk SLAs, workflows, reporting, roadmap alignment." },
              { icon: Server, title: "Grow", text: "New hires, office moves, cloud projects — predictable outcomes." },
            ].map(({ icon: Icon, title, text }) => (
              <li key={title} className="ms-2">
                <span className="absolute -start-3.5 mt-1 grid place-items-center size-6 rounded-full bg-cyan-400/20 border border-cyan-300/40">
                  <Icon className="h-3.5 w-3.5 text-cyan-300" />
                </span>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-0.5 hover:border-cyan-300/30">
                  <div className="font-semibold">{title}</div>
                  <p className="text-sm text-slate-300 mt-1">{text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="rounded-2xl overflow-hidden border border-white/10 group" data-parallax="y" data-speed="0.1" data-reveal="up">
            <Img src="/media/work-2.jpg" alt="Onsite work" className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
          </div>
        </div>
      </Section>

      <div className="section-divider h-px w-full my-12 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      {/* ============== TRUST ============== */}
      <Section id="trust" className="py-16">
        <Title k="Trust" sub="Security-first and SLA-backed" />
        <div className="grid md:grid-cols-3 gap-4">
          {[
            ["SLA", "P1 ≤ 15 min, P2 ≤ 1 hr, P3 same day"],
            ["Coverage", "99.9% EDR/XDR on managed endpoints"],
            ["MDM", "Windows/Mac/iOS/Android baselines & compliance"],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5" data-reveal="up">
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-300"/><span className="font-medium">{t}</span></div>
              <p className="text-sm text-slate-300 mt-1">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <div className="section-divider h-px w-full my-12 bg-gradient-to-r from-transparent via-fuchsia-400/40 to-transparent" />

      {/* ============== GALLERY ============== */}
      <Section id="gallery" className="py-16">
        <Title k="Gallery" sub="Real work. Real environments." />
        <div className="grid md:grid-cols-3 gap-4">
          {[
            ["/media/hero-1.jpg","Fiber"],
            ["/media/rack.jpg","Rack & cabling"],
            ["/media/dashboard.jpg","Monitoring"],
          ].map(([src, cap]) => (
            <figure key={src} className="rounded-2xl overflow-hidden border border-white/10 group" data-reveal="up">
              <Img src={src} alt={cap} className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
              <figcaption className="px-3 py-2 text-xs text-slate-300 flex items-center gap-2">
                <ImageIcon className="h-3.5 w-3.5 text-cyan-300" /> {cap}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-6" data-reveal="up">
          <Link href="/gallery" className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:border-cyan-300/30 hover:bg-cyan-400/10 hover:text-cyan-300 transition">
            View full gallery <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <div className="section-divider h-px w-full my-12 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      {/* ============== FAQs ============== */}
      <Section id="faqs" className="py-16">
        <Title k="FAQs" sub="Quick answers" />
        <div className="grid md:grid-cols-3 gap-4">
          {[
            ["Fully-managed vs Co-managed?", "We can run end-to-end or augment your IT."],
            ["SLAs?", "P1 ≤ 15 min, P2 ≤ 1 hr, P3 same business day."],
            ["Tooling included?", "EDR/XDR, patching, monitoring, email security, backup/DR."],
          ].map(([q, a]) => (
            <div key={q} className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-0.5 hover:border-cyan-300/30" data-reveal="up">
              <div className="font-medium">{q}</div>
              <p className="text-sm text-slate-300 mt-1">{a}</p>
            </div>
          ))}
        </div>
      </Section>

      <div className="section-divider h-px w-full my-12 bg-gradient-to-r from-transparent via-fuchsia-400/40 to-transparent" />

      {/* ============== AREAS ============== */}
      <Section id="areas" className="pb-24">
        <Title k="Areas we serve" sub="Onsite & remote support across Pakistan" />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {areas.map((a) => (
            <div key={a} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center transition hover:-translate-y-0.5 hover:border-cyan-300/30" data-reveal="up">
              {a}
            </div>
          ))}
        </div>
      </Section>

      <BackToTop />
      <AutoBot />
    </>
  );
}
