'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  Cloud, Users, Lock, Server, Database, Globe,
  Wrench, Shield, KeySquare, AlertTriangle, Fingerprint, BookOpen,
  Laptop, LineChart, BarChart3, Sparkles, Cpu, Network, Building2
} from 'lucide-react';

/* string → Icon map (CLIENT ONLY) */
const ICONS = {
  Cloud, Users, Lock, Server, Database, Globe,
  Wrench, Shield, KeySquare, AlertTriangle, Fingerprint, BookOpen,
  Laptop, LineChart, BarChart3, Sparkles, Cpu, Network, Building2
};

/* Safe image: if src 404s, swap to a local fallback */
const SafeImage = ({ src, alt, ...rest }) => {
  const [err, setErr] = React.useState(false);
  return (
    <Image
      src={err ? '/images/illus/fallback.svg' : src}
      alt={alt}
      onError={() => setErr(true)}
      {...rest}
    />
  );
};

const FadeIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

const Kpi = ({ kpi, label }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 text-center"
  >
    <div className="text-3xl md:text-4xl font-extrabold">{kpi}</div>
    <div className="text-slate-300 text-sm mt-1">{label}</div>
  </motion.div>
);

const Chip = ({ children }) => (
  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">
    {children}
  </span>
);

const FeatureCard = ({ icon: iconName, title, desc, bullets = [] }) => {
  const Icon = iconName ? ICONS[iconName] : null;
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md"
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-white/10 grid place-items-center">
          {Icon ? <Icon className="h-5 w-5" /> : <span className="text-lg">★</span>}
        </div>
        <h3 className="font-bold">{title}</h3>
      </div>
      <p className="mt-3 text-slate-300">{desc}</p>
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
      Step {String(n).padStart(2, '0')}
    </div>
    <div className="font-semibold mt-1">{title}</div>
    <p className="text-slate-300 mt-1">{desc}</p>
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
const LongSection = ({ heading, body, image, imageAlt = "", imageSide = "right" }) => (
  <div
    className={`grid md:grid-cols-2 gap-6 items-center ${
      imageSide === 'left' ? 'md:[&>div:first-child]:order-2' : ''
    }`}
  >
    <div>
      <h3 className="text-xl md:text-2xl font-extrabold">{heading}</h3>
      <p className="mt-3 text-slate-300 leading-7">{body}</p>
    </div>
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white/5"
    >
      <SafeImage
        src={image}
        alt={imageAlt || heading}
        fill
        sizes="50vw"
        className="object-cover"
      />
    </motion.div>
  </div>
);

/* Avatar testimonials with stars */
const Stars = ({ n = 5 }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: n }).map((_, i) => (
      <span key={i}>⭐</span>
    ))}
  </div>
);

const TestimonialCard = ({ quote, author, role, avatar, rating = 5 }) => (
  <motion.div
    whileHover={{ y: -3 }}
    className="rounded-2xl border border-white/10 bg-white/5 p-5 flex gap-4"
  >
    <div className="relative h-16 w-16 rounded-xl overflow-hidden border border-white/10 bg-white/10 shrink-0">
      <SafeImage src={avatar} alt={author} fill sizes="64px" className="object-cover" />
    </div>
    <div>
      <Stars n={rating} />
      <p className="text-slate-100 mt-1">“{quote}”</p>
      <div className="text-slate-300 text-sm mt-2">
        — {author}, {role}
      </div>
    </div>
  </motion.div>
);

export default function ServiceClientPage({ cfg }) {
  const {
    // hero
    title,
    lede,
    hero,

    // long paragraphs + side images
    sections = [],

    // KPIs
    stats = [],

    // pains & outcomes
    problems = [],
    outcomes = [],

    // features & gallery
    features = [],
    gallery = [],

    // process (timeline removed)
    steps = [],

    // deliverables & tools
    deliverables = [],
    tooling = [],

    // tables, FAQs, testimonials
    compare = [],
    faqs = [],
    testimonials = [],
  } = cfg;

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10">
        <motion.div
          className="absolute inset-0 opacity-70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.8 }}
        >
          <SafeImage src={hero} alt={title} fill sizes="100vw" className="object-cover" />
        </motion.div>
        <div className="relative p-10 md:p-16 bg-gradient-to-t from-black/60 to-black/20">
          <motion.h1
            className="text-3xl md:text-5xl font-extrabold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="mt-3 max-w-3xl text-lg text-slate-200"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            {lede}
          </motion.p>
          <motion.div
            className="mt-6 inline-flex items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link
              href="/get-quote"
              className="rounded-xl px-5 py-3 font-semibold bg-emerald-500 hover:bg-emerald-600 transition"
            >
              Get a Quote
            </Link>
            <Link
              href="/contact"
              className="rounded-xl px-5 py-3 font-semibold bg-white/10 ring-1 ring-white/20 hover:bg-white/20"
            >
              Talk to an expert
            </Link>
            <Link
              href="/services"
              className="rounded-xl px-5 py-3 font-semibold bg-white/10 hover:bg-white/20"
            >
              All Services
            </Link>
          </motion.div>
        </div>
      </div>

      {/* STATS */}
      {stats.length > 0 && (
        <section className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <Kpi key={i} kpi={s.kpi} label={s.label} />
          ))}
        </section>
      )}

      {/* LONG SECTIONS */}
      {sections.length > 0 && (
        <section className="mt-12 space-y-10">
          {sections.map((sec, i) => (
            <LongSection key={i} {...sec} />
          ))}
        </section>
      )}

      {/* PROBLEMS → OUTCOMES */}
      {(problems.length || outcomes.length) > 0 && (
        <section className="mt-12 grid md:grid-cols-2 gap-6">
          {problems.length > 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-2xl font-extrabold">Common pain points</h2>
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
        <section className="mt-12">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-extrabold">What’s included</h2>
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
        <section className="mt-12">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-extrabold">In action</h2>
          </FadeIn>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
            {gallery.map((src, i) => (
              <motion.div
                key={src + i}
                whileHover={{ scale: 1.02 }}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white/5"
              >
                <SafeImage
                  src={src}
                  alt={`${title} screenshot ${i + 1}`}
                  fill
                  sizes="33vw"
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* PROCESS (steps only) */}
      {steps.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-extrabold">Delivery process</h2>
          <div className="mt-4 space-y-4">
            {steps.map((s, i) => (
              <Step key={s.title + i} n={i + 1} {...s} />
            ))}
          </div>
        </section>
      )}

      {/* DELIVERABLES + TOOLING */}
      {(deliverables.length || tooling.length) > 0 && (
        <section className="mt-12 grid md:grid-cols-2 gap-6">
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
        <section className="mt-12">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-extrabold">FAQs</h2>
          </FadeIn>
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            {faqs.map((f, i) => (
              <details key={i} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <summary className="cursor-pointer font-semibold">{f.q}</summary>
                <p className="mt-2 text-slate-300">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="mt-12">
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
            <h3 className="text-lg font-semibold">Ready for a no-pressure assessment?</h3>
            <p className="text-slate-300">We’ll map gaps and give you clear next steps — free.</p>
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
