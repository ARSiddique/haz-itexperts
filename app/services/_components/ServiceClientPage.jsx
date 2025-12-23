"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Cloud,
  Users,
  Lock,
  Server,
  Database,
  Globe,
  Wrench,
  Shield,
  KeySquare,
  AlertTriangle,
  Fingerprint,
  BookOpen,
  Laptop,
  LineChart,
  BarChart3,
  Sparkles,
  Cpu,
  Network,
  Building2,
} from "lucide-react";

/* string → Icon map (CLIENT ONLY) */
const ICONS = {
  Cloud,
  Users,
  Lock,
  Server,
  Database,
  Globe,
  Wrench,
  Shield,
  KeySquare,
  AlertTriangle,
  Fingerprint,
  BookOpen,
  Laptop,
  LineChart,
  BarChart3,
  Sparkles,
  Cpu,
  Network,
  Building2,
};

const DEFAULT_AREA = "Allentown & the Lehigh Valley";

/* Safe image: if src 404s, swap to a local fallback */
const SafeImage = ({ src, alt, priority = false, ...rest }) => {
  const [err, setErr] = React.useState(false);
  return (
    <Image
      src={err ? "/images/illus/fallback.svg" : src}
      alt={alt}
      priority={priority}
      onError={() => setErr(true)}
      {...rest}
    />
  );
};

const FadeIn = ({ children, delay = 0 }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.55, delay }}
    >
      {children}
    </motion.div>
  );
};

const Kpi = ({ kpi, label }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 10 }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.45 }}
      className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 text-center"
    >
      <div className="text-3xl md:text-4xl font-extrabold">{kpi}</div>
      <div className="text-slate-300 text-sm mt-1">{label}</div>
    </motion.div>
  );
};

const Chip = ({ children }) => (
  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">
    {children}
  </span>
);

const FeatureCard = ({ icon: iconName, title, desc, bullets = [] }) => {
  const reduce = useReducedMotion();
  const Icon = iconName ? ICONS[iconName] : null;

  return (
    <motion.div
      whileHover={reduce ? {} : { y: -4, scale: 1.01 }}
      className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md"
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-white/10 grid place-items-center">
          {Icon ? <Icon className="h-5 w-5" aria-hidden="true" /> : <span className="text-lg">★</span>}
        </div>
        <h3 className="font-bold">{title}</h3>
      </div>

      <p className="mt-3 text-slate-300 leading-7">{desc}</p>

      {bullets.length > 0 && (
        <ul className="mt-3 list-disc list-inside text-slate-300 space-y-1">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}

      <div className="mt-4 h-1 w-0 bg-emerald-400 group-hover:w-full transition-all rounded-full" />
    </motion.div>
  );
};

const Step = ({ n, title, desc, outputs = [] }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
    <div className="text-emerald-400 font-extrabold text-sm">
      Step {String(n).padStart(2, "0")}
    </div>
    <div className="font-semibold mt-1">{title}</div>
    <p className="text-slate-300 mt-1 leading-7">{desc}</p>
    {outputs.length > 0 && (
      <ul className="mt-3 text-slate-300 text-sm space-y-1">
        {outputs.map((o, i) => (
          <li key={i}>• {o}</li>
        ))}
      </ul>
    )}
  </div>
);

/* Long-form paragraph sections with side image */
const LongSection = ({ heading, body, image, imageAlt = "", imageSide = "right" }) => {
  const reduce = useReducedMotion();
  return (
    <div
      className={`grid md:grid-cols-2 gap-6 items-center ${
        imageSide === "left" ? "md:[&>div:first-child]:order-2" : ""
      }`}
    >
      <div>
        <h3 className="text-xl md:text-2xl font-extrabold">{heading}</h3>
        <p className="mt-3 text-slate-300 leading-7">{body}</p>
      </div>

      <motion.div
        whileHover={reduce ? {} : { scale: 1.02 }}
        className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white/5"
      >
        <SafeImage
          src={image}
          alt={imageAlt || heading}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </motion.div>
    </div>
  );
};

const Stars = ({ n = 5 }) => (
  <div className="flex gap-0.5" aria-label={`${n} star rating`}>
    {Array.from({ length: n }).map((_, i) => (
      <span key={i} aria-hidden="true">
        ⭐
      </span>
    ))}
  </div>
);

const TestimonialCard = ({ quote, author, role, avatar, rating = 5 }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      whileHover={reduce ? {} : { y: -3 }}
      className="rounded-2xl border border-white/10 bg-white/5 p-5 flex gap-4"
    >
      <div className="relative h-16 w-16 rounded-xl overflow-hidden border border-white/10 bg-white/10 shrink-0">
        <SafeImage src={avatar} alt={author} fill sizes="64px" className="object-cover" />
      </div>
      <div>
        <Stars n={rating} />
        <p className="text-slate-100 mt-1 leading-7">“{quote}”</p>
        <div className="text-slate-300 text-sm mt-2">
          — {author}, {role}
        </div>
      </div>
    </motion.div>
  );
};

function QuickNav({ items = [] }) {
  if (!items.length) return null;
  return (
    <nav aria-label="On this page" className="mt-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="text-xs uppercase tracking-[0.18em] text-emerald-300/80">On this page</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {items.map((x) => (
            <a
              key={x.href}
              href={x.href}
              className="text-sm rounded-full px-3 py-1.5 border border-white/10 bg-white/5 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/40"
            >
              {x.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default function ServiceClientPage({ cfg }) {
  const reduce = useReducedMotion();

  const {
    title,
    lede,
    hero,

    sections = [],
    stats = [],

    problems = [],
    outcomes = [],

    features = [],
    gallery = [],

    steps = [],

    deliverables = [],
    tooling = [],

    compare = [],
    faqs = [],
    testimonials = [],

    // ✅ optional (doesn't break existing pages)
    area = DEFAULT_AREA,
    related = [], // [{label, href}]
  } = cfg || {};

  // ✅ Build a smart TOC (only show what exists)
  const navItems = [
    { label: "Overview", href: "#overview" },
    stats?.length ? { label: "KPIs", href: "#kpis" } : null,
    sections?.length ? { label: "How it works", href: "#how" } : null,
    features?.length ? { label: "What’s included", href: "#included" } : null,
    steps?.length ? { label: "Process", href: "#process" } : null,
    deliverables?.length || tooling?.length ? { label: "Deliverables", href: "#deliverables" } : null,
    faqs?.length ? { label: "FAQs", href: "#faqs" } : null,
    testimonials?.length ? { label: "Stories", href: "#stories" } : null,
  ].filter(Boolean);

  const showPainOutcomes = (problems?.length || 0) > 0 || (outcomes?.length || 0) > 0;

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      {/* HERO */}
      <section id="overview" aria-label={`${title} overview`} className="relative overflow-hidden rounded-3xl border border-white/10">
        {/* decorative background image */}
        <motion.div
          className="absolute inset-0 opacity-70"
          initial={reduce ? false : { opacity: 0 }}
          animate={reduce ? {} : { opacity: 0.7 }}
          transition={{ duration: 0.8 }}
          aria-hidden="true"
        >
          <SafeImage
            src={hero}
            alt="" // ✅ decorative (H1 already exists)
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        <div className="relative p-10 md:p-16 bg-gradient-to-t from-black/60 to-black/20">
          <motion.h1
            className="text-3xl md:text-5xl font-extrabold"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={reduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            {title}
          </motion.h1>

          <motion.p
            className="mt-3 max-w-3xl text-lg text-slate-200"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={reduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
          >
            {lede}
          </motion.p>

          {/* ✅ local-intent line (kills “generic” feel) */}
          <motion.p
            className="mt-3 text-sm text-slate-200/90"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={reduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            Serving SMBs in <span className="font-semibold text-slate-100">{area}</span>.
          </motion.p>

          <motion.div
            className="mt-6 flex flex-wrap items-center gap-3"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={reduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
          >
            <Link
              href="/get-quote"
              className="rounded-xl px-5 py-3 font-semibold bg-emerald-500 hover:bg-emerald-600 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/50"
              aria-label={`Get a quote for ${title}`}
            >
              Get a Quote
            </Link>

            <Link
              href="/contact"
              className="rounded-xl px-5 py-3 font-semibold bg-white/10 ring-1 ring-white/20 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/40"
              aria-label={`Talk to an expert about ${title}`}
            >
              Talk to an expert
            </Link>

            <Link
              href="/services"
              className="rounded-xl px-5 py-3 font-semibold bg-white/10 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/40"
            >
              All Services
            </Link>

            {/* ✅ optional related links if you pass cfg.related */}
            {Array.isArray(related) && related.length > 0 && (
              <div className="flex flex-wrap gap-2 ms-0 md:ms-2">
                {related.slice(0, 3).map((r) => (
                  <Link
                    key={r.href}
                    href={r.href}
                    className="text-sm rounded-full px-3 py-1.5 border border-white/10 bg-white/5 hover:bg-white/10"
                  >
                    {r.label}
                  </Link>
                ))}
              </div>
            )}
          </motion.div>

          {/* ✅ Quick jump links */}
          <QuickNav items={navItems} />
        </div>
      </section>

      {/* STATS */}
      {stats.length > 0 && (
        <section id="kpis" className="mt-10">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-extrabold">Key results</h2>
            <p className="mt-2 text-sm text-slate-300 max-w-3xl">
              Real-world metrics we track so progress is visible (not vibes).
            </p>
          </FadeIn>

          <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <Kpi key={i} kpi={s.kpi} label={s.label} />
            ))}
          </div>
        </section>
      )}

      {/* LONG SECTIONS */}
      {sections.length > 0 && (
        <section id="how" className="mt-12">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-extrabold">How this service works</h2>
            <p className="mt-2 text-sm text-slate-300 max-w-3xl">
              What we implement, how we operate it, and what changes for your team.
            </p>
          </FadeIn>

          <div className="mt-8 space-y-10">
            {sections.map((sec, i) => (
              <LongSection key={i} {...sec} />
            ))}
          </div>
        </section>
      )}

      {/* PROBLEMS → OUTCOMES */}
      {showPainOutcomes && (
        <section className="mt-12 grid md:grid-cols-2 gap-6" aria-label="Pain points and outcomes">
          {problems.length > 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-2xl font-extrabold">Common pain points</h2>
              <p className="mt-2 text-sm text-slate-300">
                These are typical risks we see before we stabilize and harden an environment.
              </p>
              <ul className="mt-3 space-y-2 text-slate-300">
                {problems.map((p, i) => (
                  <li key={i}>• {p}</li>
                ))}
              </ul>
            </div>
          )}

          {outcomes.length > 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-2xl font-extrabold">Business outcomes</h2>
              <p className="mt-2 text-sm text-slate-300">
                Clear outcomes we aim for — measurable and reviewable over time.
              </p>
              <ul className="mt-3 space-y-2 text-slate-300">
                {outcomes.map((o, i) => (
                  <li key={i}>✅ {o}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* FEATURES */}
      {features.length > 0 && (
        <section id="included" className="mt-12">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-extrabold">What’s included</h2>
            <p className="mt-2 text-sm text-slate-300 max-w-3xl">
              The core deliverables and operational coverage included in this service.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
            {features.map((f, i) => (
              <FeatureCard key={i} {...f} />
            ))}
          </div>
        </section>
      )}

      {/* GALLERY */}
      {gallery.length > 0 && (
        <section className="mt-12" aria-label="Screens and examples">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-extrabold">In action</h2>
          </FadeIn>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
            {gallery.map((src, i) => (
              <motion.div
                key={src + i}
                whileHover={reduce ? {} : { scale: 1.02 }}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white/5"
              >
                <SafeImage
                  src={src}
                  alt={`${title} screenshot ${i + 1}`}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* PROCESS */}
      {steps.length > 0 && (
        <section id="process" className="mt-12">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-extrabold">Delivery process</h2>
            <p className="mt-2 text-sm text-slate-300 max-w-3xl">
              A predictable sequence: baseline → implement → operate → review.
            </p>
          </FadeIn>

          <div className="mt-5 space-y-4">
            {steps.map((s, i) => (
              <Step key={s.title + i} n={i + 1} {...s} />
            ))}
          </div>
        </section>
      )}

      {/* DELIVERABLES + TOOLING */}
      {(deliverables.length || tooling.length) > 0 && (
        <section id="deliverables" className="mt-12 grid md:grid-cols-2 gap-6">
          {deliverables.length > 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-2xl font-extrabold">Deliverables</h2>
              <ul className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-300">
                {deliverables.map((d, i) => (
                  <li key={i}>• {d}</li>
                ))}
              </ul>
            </div>
          )}

          {tooling.length > 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-2xl font-extrabold">Primary tooling</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {tooling.map((t, i) => (
                  <Chip key={i}>{t}</Chip>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* COMPARISON */}
      {compare.length > 0 && (
        <section className="mt-12">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-extrabold">Compare plans</h2>
          </FadeIn>

          <div className="rounded-2xl border border-white/10 overflow-x-auto mt-6">
            <table className="min-w-[820px] w-full text-sm">
              <thead className="bg-white/5">
                <tr>
                  {compare[0].map((h, i) => (
                    <th key={i} className="p-3 text-left">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="[&>tr:nth-child(even)]:bg-white/[0.03]">
                {compare.slice(1).map((row, idx) => (
                  <tr key={idx}>
                    {row.map((cell, i) => (
                      <td key={i} className="p-3">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* FAQS */}
      {faqs.length > 0 && (
        <section id="faqs" className="mt-12">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-extrabold">FAQs</h2>
          </FadeIn>

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            {faqs.map((f, i) => (
              <details key={i} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <summary className="cursor-pointer font-semibold">{f.q}</summary>
                <p className="mt-2 text-slate-300 leading-7">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section id="stories" className="mt-12">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-extrabold">Customer stories</h2>
          </FadeIn>

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="mt-12">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-emerald-500/15 to-cyan-500/15 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">Ready for a no-pressure assessment?</h2>
            <p className="text-slate-300 mt-1">
              We’ll map gaps and give you clear next steps — free.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/get-quote"
              className="rounded-lg px-5 py-3 font-semibold border border-emerald-300/30 text-emerald-300 bg-emerald-400/10 hover:bg-emerald-400/20"
            >
              Get Quote
            </Link>
            <Link
              href="/contact"
              className="rounded-lg px-5 py-3 font-semibold bg-white/10 ring-1 ring-white/20 hover:bg-white/20"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
