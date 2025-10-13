// app/services/cloud-workspace/ClientPage.jsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Cloud, Users, Lock, Server, Database, Globe } from 'lucide-react';

const FadeIn = ({ children, delay = 0 }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay }}>
    {children}
  </motion.div>
);

const Section = ({ title, subtitle, children }) => (
  <section className="mb-14">
    <FadeIn><h2 className="text-2xl md:text-3xl font-extrabold">{title}</h2></FadeIn>
    {subtitle && <FadeIn delay={0.05}><p className="mt-2 text-slate-300">{subtitle}</p></FadeIn>}
    <div className="mt-6">{children}</div>
  </section>
);

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <motion.div whileHover={{ y: -4, scale: 1.01 }} className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-xl bg-white/10 grid place-items-center"><Icon className="h-5 w-5" /></div>
      <h3 className="font-bold">{title}</h3>
    </div>
    <p className="mt-3 text-slate-300">{desc}</p>
    <div className="mt-4 h-1 w-0 bg-emerald-400 group-hover:w-full transition-all rounded-full" />
  </motion.div>
);

const Step = ({ n, title, desc }) => (
  <div className="relative pl-10 py-3">
    <div className="absolute left-0 top-0 text-emerald-400 font-extrabold">{String(n).padStart(2,'0')}</div>
    <h4 className="font-semibold">{title}</h4>
    <p className="text-slate-300">{desc}</p>
  </div>
);

const FAQ = ({ q, a }) => (
  <details className="rounded-xl border border-white/10 bg-white/5 p-4">
    <summary className="cursor-pointer font-semibold">{q}</summary>
    <p className="mt-2 text-slate-300">{a}</p>
  </details>
);

const CTA = () => (
  <div className="mt-10">
    <a href="/get-quote" className="inline-flex items-center rounded-xl px-5 py-3 font-semibold bg-emerald-500 hover:bg-emerald-600 transition">Get a Quote</a>
  </div>
);

export default function ClientPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10">
        <motion.div className="absolute inset-0 opacity-70" initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ duration: 0.8 }}>
          <Image src="/images/services/cloud-hero.svg" alt="Cloud & 365/Workspace" fill sizes="100vw" priority className="object-cover" />
        </motion.div>
        <div className="relative p-10 md:p-16 bg-gradient-to-t from-black/60 to-black/20">
          <motion.h1 className="text-3xl md:text-5xl font-extrabold" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            Cloud & 365/Workspace
          </motion.h1>
          <motion.p className="mt-3 max-w-2xl text-lg text-slate-200" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}>
            Migrations, identity, governance, and collaboration tuning for Microsoft 365 and Google Workspace.
          </motion.p>
          <motion.div className="mt-6 inline-flex items-center gap-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <a href="/get-quote" className="rounded-xl px-5 py-3 font-semibold bg-emerald-500 hover:bg-emerald-600 transition">Get a Quote</a>
            <a href="/services" className="rounded-xl px-5 py-3 font-semibold bg-white/10 hover:bg-white/20 transition">All Services</a>
          </motion.div>
        </div>
      </div>

      {/* Features */}
      <Section title="What’s Included" subtitle="Everything you need, nothing you don’t.">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <FeatureCard icon={Cloud} title="Email & File Migrations" desc="Cutover or staged moves to M365/Workspace with minimal downtime." />
          <FeatureCard icon={Users} title="Identity & SSO" desc="Entra ID or Google IAM best-practices with conditional access." />
          <FeatureCard icon={Lock} title="DLP & Governance" desc="Retention labels, sharing controls, and data loss prevention policies." />
          <FeatureCard icon={Server} title="SharePoint/Drive" desc="Sites, drives, and permissions hygiene with clear ownership." />
          <FeatureCard icon={Database} title="SaaS Backup" desc="Protect M365/Google data beyond the recycle bin." />
          <FeatureCard icon={Globe} title="Collaboration" desc="Teams/Meet structure, channels, and lifecycle management." />
        </div>
      </Section>

      {/* Process */}
      <Section title="Delivery Process" subtitle="Clear steps, consistent outcomes.">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Step n={1} title="Plan" desc="Inventory and dependency mapping; choose migration strategy." />
            <Step n={2} title="Prep" desc="Identity, DNS, licensing, and pilot users." />
            <Step n={3} title="Move" desc="Email/files migration, validation, and cutover comms." />
            <Step n={4} title="Harden" desc="Apply governance, DLP, and backup; admin training." />
          </div>
          <FadeIn delay={0.1}>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 h-full">
              <h3 className="font-bold mb-2">You’ll get</h3>
              <ul className="list-disc list-inside text-slate-300 space-y-1">
                <li>Documentation & SOPs</li><li>Governance & DLP rules</li><li>Backup status</li><li>Admin runbooks</li>
              </ul>
              <CTA />
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* FAQs */}
      <Section title="FAQs">
        <div className="grid md:grid-cols-2 gap-4">
          <FAQ q="Downtime during migration?" a="We use staged or cutover windows to keep disruption near zero." />
          <FAQ q="SharePoint vs Shared Drives?" a="Pick based on team structure and permission patterns." />
          <FAQ q="Keep legacy email?" a="We can archive/journal safely, or import PST/mbox." />
          <FAQ q="Multi-tenant setups?" a="Yes, we support mergers or multi-brand structures." />
        </div>
      </Section>
    </main>
  );
}
