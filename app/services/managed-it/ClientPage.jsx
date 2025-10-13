// app/services/managed-it/ClientPage.jsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Wrench, Server, Lock, Database, Users, LineChart } from 'lucide-react';

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
          <Image src="/images/services/managed-hero.svg" alt="Managed IT" fill sizes="100vw" priority className="object-cover" />
        </motion.div>
        <div className="relative p-10 md:p-16 bg-gradient-to-t from-black/60 to-black/20">
          <motion.h1 className="text-3xl md:text-5xl font-extrabold" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>Managed IT</motion.h1>
          <motion.p className="mt-3 max-w-2xl text-lg text-slate-200" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}>
            Proactive helpdesk, patching, monitoring, and reporting so your team stays focused on work—not IT issues.
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
          <FeatureCard icon={Wrench} title="Helpdesk & Remote Support" desc="Responsive support with clear SLAs and priority routing." />
          <FeatureCard icon={Server} title="Patching & Monitoring" desc="Automated updates and 24/7 health checks for servers/devices." />
          <FeatureCard icon={Lock} title="Baseline Security" desc="Firewall, AV/EDR, disk encryption, MFA guidance." />
          <FeatureCard icon={Database} title="Backup Checks" desc="Daily backup verification with alerting and restore testing." />
          <FeatureCard icon={Users} title="On/Offboarding" desc="Fast, compliant user lifecycle including access and devices." />
          <FeatureCard icon={LineChart} title="Reporting & KPIs" desc="Monthly insights on tickets, assets, patch status, and risk." />
        </div>
      </Section>

      {/* Process */}
      <Section title="Delivery Process" subtitle="Clear steps, consistent outcomes.">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Step n={1} title="Assess" desc="Discovery, documentation, and risk review." />
            <Step n={2} title="Stabilize" desc="Patch, secure, and standardize endpoints & servers." />
            <Step n={3} title="Optimize" desc="SOPs, automation, and self-service improvements." />
            <Step n={4} title="Grow" desc="Quarterly roadmap & budget to scale confidently." />
          </div>
          <FadeIn delay={0.1}>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 h-full">
              <h3 className="font-bold mb-2">You’ll get</h3>
              <ul className="list-disc list-inside text-slate-300 space-y-1">
                <li>Documentation & SOPs</li><li>Monthly reports & KPIs</li><li>Security & backup status</li><li>Roadmap suggestions</li>
              </ul>
              <CTA />
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* FAQs */}
      <Section title="FAQs">
        <div className="grid md:grid-cols-2 gap-4">
          <FAQ q="Do you support hybrid/remote teams?" a="Yes—our tooling supports remote users with secure access and remote remediation." />
          <FAQ q="What SLAs do you offer?" a="Standard next-business-day; premium same-day options for critical incidents." />
          <FAQ q="Can you take over mid-year?" a="We can onboard any time with a stabilization sprint in the first 30 days." />
          <FAQ q="How do you price?" a="Predictable per-user or per-device with optional add-ons from the Get Quote page." />
        </div>
      </Section>
    </main>
  );
}
