"use client";

import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import HomeFX from "@/components/HomeFX";
import { site } from "@/lib/siteConfig";
import dynamic from "next/dynamic";
import {
  Shield,
  Server,
  Cloud,
  Wrench,
  Smartphone,
  Users,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Lock,
  LineChart,
  Image as ImageIcon,
  Sparkles,
} from "lucide-react";

function Collage({ items = [], priority = false, ratio = "aspect-[16/10] md:aspect-[16/9]" }) {
  return (
    <div className={`relative ${ratio}`} data-reveal="up">
      {items[0] && (
        <div className="absolute inset-0 overflow-hidden rounded-2xl border border-white/10 bg-black/20 group">
          <Image
            src={items[0].src}
            alt={items[0].alt || ""}
            fill
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(max-width:768px) 96vw, 560px"
          />
        </div>
      )}
      {items[1] && (
        <div className="absolute right-3 -bottom-6 w-1/2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 shadow-xl rotate-[1.5deg] group">
            <Image
              src={items[1].src}
              alt={items[1].alt || ""}
              fill
              loading="lazy"
              decoding="async"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              sizes="(max-width:768px) 48vw, 280px"
            />
          </div>
        </div>
      )}
      {items[2] && (
        <div className="absolute -left-4 top-6 w-1/3">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 shadow-lg -rotate-[2deg] group">
            <Image
              src={items[2].src}
              alt={items[2].alt || ""}
              fill
              loading="lazy"
              decoding="async"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
              sizes="(max-width:768px) 32vw, 180px"
            />
          </div>
        </div>
      )}
    </div>
  );
}

const Section = ({ id, children, className = "" }) => (
  <section id={id} className="relative overflow-hidden">
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
  <div
    className="rounded-xl border border-white/10 bg-white/[0.06] p-4 text-center transition hover:-translate-y-0.5 hover:border-cyan-300/30"
    data-reveal="up"
  >
    <div className="text-xl font-bold text-cyan-300">{k}</div>
    <div className="text-slate-300 text-xs">{v}</div>
  </div>
);

const ServiceCard = ({ Icon, t, d, bullets = [] }) => (
  <div
    className="group p-6 rounded-2xl bg-white/[0.06] border border-white/10 transition hover:-translate-y-1 hover:shadow-xl hover:border-cyan-300/30"
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


const OfferPopup = dynamic(() => import("@/components/OfferPopup"), { ssr: false });
export default function HomePage() {
  const areas = site.areas?.length
    ? site.areas
    : ["Allentown, PA", "Macungie, PA", "Emmaus, PA"];
  return (
    <>
    <OfferPopup />
      <section id="hero" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 size-72 rounded-full bg-cyan-500/25 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 size-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-12 items-center">
          <div className="max-w-[62ch]">
            <div className="text-xs md:text-sm uppercase tracking-[0.2em] text-cyan-300/80">
              Managed IT for Allentown & the Lehigh Valley
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mt-3 leading-[1.06] bg-gradient-to-r from-cyan-300 via-white to-fuchsia-400 bg-clip-text text-transparent">
              Managed IT Services in Allentown, PA — Fast, Friendly, Fixed-Fee
            </h1>
            <p className="mt-4 text-base md:text-lg text-slate-200">
              24/7 helpdesk, proactive monitoring, and real security — built for local SMBs in Allentown, Macungie &
  Emmaus.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/get-quote"
                className="rounded-lg px-5 py-3 font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
              >
                Get a Quote
              </Link>
              <a
                href="#services"
                className="rounded-lg px-5 py-3 font-semibold bg-white/5 ring-1 ring-white/10 hover:bg-white/10 inline-flex items-center gap-2 group"
              >
                Explore services <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-10">
              <Stat k="<15 min" v="P1 response target" />
              <Stat k="99.9%" v="EDR/XDR coverage" />
              <Stat k="24/7" v="Helpdesk & monitoring" />
            </div>
          </div>

          <div className="lg:pl-2">
            <Collage
              items={[
                { src: "/media/hero-1.jpg", alt: "Fiber optics" },
                { src: "/media/hero-2.jpg", alt: "Cloud & devices" },
              ]}
              ratio="aspect-[16/10] md:aspect-[16/9]"
              priority
            />
          </div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      </section>

      <Section id="about" className="py-16">
        <Title k="About" sub="We keep your business running — and secure" />
        <p className="text-slate-300 max-w-3xl" data-reveal="up">
          We act as your IT department, or augment your in-house team, with real SLAs, documented SOPs, and transparent
          reporting leadership actually reads.
        </p>

        <div className="grid md:grid-cols-2 gap-10 items-center mt-8">
          <div className="grid grid-cols-3 gap-3">
            {[
              ["Playbooks", "Documented SOPs for repeatable results"],
              ["Visibility", "Monthly KPIs leadership actually reads"],
              ["Security-first", "Baseline hardening + EDR/XDR + backup/DR"],
            ].map(([t, d]) => (
              <div
                key={t}
                className="rounded-xl border border-white/10 bg-white/5 p-4 transition hover:-translate-y-0.5 hover:border-cyan-300/30"
                data-reveal="up"
              >
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
              ratio="aspect-[4/3] md:aspect-[16/10]"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3" data-reveal="up">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:border-cyan-300/30 hover:bg-cyan-400/10 hover:text-cyan-300 transition"
          >
            More about us <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/assessment"
            className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:border-cyan-300/30 hover:bg-cyan-400/10 hover:text-cyan-300 transition"
          >
            Free IT Assessment <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <Section id="services" className="py-16">
        <Title k="Services" sub="Everything an SMB needs — nothing you don’t" />
        <p className="text-slate-300 max-w-3xl" data-reveal="up">
          Choose fully-managed or co-managed. We’ll meet you where you are and raise your baseline fast.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {[
            {
              Icon: Shield,
              t: "Managed IT",
              d: "Helpdesk, patching, monitoring, reporting with SLAs.",
              bullets: ["Helpdesk workflows", "Proactive maintenance", "Monthly KPIs"],
            },
            {
              Icon: Server,
              t: "Cybersecurity",
              d: "EDR/XDR, MFA/SSO, email security, backup/DR, vCISO.",
              bullets: ["EDR/XDR coverage", "Identity hardening", "BCP/DR playbooks"],
            },
            {
              Icon: Cloud,
              t: "Cloud & 365/Workspace",
              d: "Migrations, identity, MDM, cost optimization.",
              bullets: ["Tenant security", "Licensing hygiene", "MDM baselines"],
            },
            {
              Icon: Wrench,
              t: "Projects & Consulting",
              d: "Audits, office moves, network refresh, server/cloud.",
              bullets: ["Network redesign", "Server refresh", "Zero-trust rollout"],
            },
            {
              Icon: Smartphone,
              t: "Device Management",
              d: "Windows/Mac/iOS/Android baselines + app deploys.",
              bullets: ["Baseline config", "App catalogs", "Compliance checks"],
            },
            {
              Icon: Users,
              t: "vCIO / Strategy",
              d: "Quarterly roadmap, budget planning, measurable KPIs.",
              bullets: ["Roadmaps", "Budgeting", "Risk register"],
            },
          ].map((p) => (
            <ServiceCard key={p.t} {...p} />
          ))}
        </div>

        <div className="mt-8 flex gap-3" data-reveal="up">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:border-cyan-300/30 hover:bg-cyan-400/10 hover:text-cyan-300 transition"
          >
            All service details <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/get-quote"
            className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
          >
            Pricing & Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

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
            <Collage
              items={[
                { src: "/media/team.jpg", alt: "Team" },
                { src: "/media/work-2.jpg", alt: "Work" },
                { src: "/media/hero-2.jpg", alt: "Cloud" },
              ]}
            />
            <div className="mt-3">
              <div className="font-medium">Onboarding without chaos</div>
              <p className="text-sm text-slate-300">MDM baselines in 10 days; predictable new-hire workflow.</p>
            </div>
          </div>
        </div>
      </Section>

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
            <div className="relative w-full aspect-[16/16]">
              <Image
                src="/media/work-2.jpg"
                alt="Onsite work"
                fill
                loading="lazy"
                decoding="async"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                sizes="(max-width:768px) 96vw, 640px"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section id="trust" className="py-16">
        <Title k="Trust" sub="Security-first and SLA-backed" />
        <div className="grid md:grid-cols-3 gap-4">
          {[
            ["SLA", "P1 ≤ 15 min, P2 ≤ 1 hr, P3 same day"],
            ["Coverage", "99.9% EDR/XDR on managed endpoints"],
            ["MDM", "Windows/Mac/iOS/Android baselines & compliance"],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5" data-reveal="up">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                <span className="font-medium">{t}</span>
              </div>
              <p className="text-sm text-slate-300 mt-1">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="gallery" className="py-16">
        <Title k="Gallery" sub="Real work. Real environments." />
        <div className="grid md:grid-cols-3 gap-4">
          {[
            ["/media/hero-1.jpg", "Fiber"],
            ["/media/rack.jpg", "Rack & cabling"],
            ["/media/dashboard.jpg", "Monitoring"],
          ].map(([src, cap]) => (
            <figure key={src} className="rounded-2xl overflow-hidden border border-white/10 bg-white/5" data-reveal="up">
              <div className="relative w-full aspect-[3/2] md:aspect-[16/10] group">
                <Image
                  src={src}
                  alt={cap}
                  fill
                  loading="lazy"
                  decoding="async"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  sizes="(max-width:768px) 96vw, 33vw"
                />
              </div>
              <figcaption className="px-3 py-2 text-xs text-slate-300 flex items-center gap-2">
                <ImageIcon className="h-3.5 w-3.5 text-cyan-300" /> {cap}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-6" data-reveal="up">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:border-cyan-300/30 hover:bg-cyan-400/10 hover:text-cyan-300 transition"
          >
            View full gallery <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      <Section id="areas" className="pb-24">
        <Title k="Areas we serve" sub="Onsite & remote support in DE & PA" />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {areas.map((a) => (
            <div
              key={a}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center transition hover:-translate-y-0.5 hover:border-cyan-300/30"
              data-reveal="up"
            >
              {a}
            </div>
          ))}
        </div>
      </Section>

      <Suspense fallback={null}>
        <HomeFX />
      </Suspense>
    </>
  );
}
