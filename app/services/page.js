"use client";
import { Shield, Server, Cloud, Wrench, Smartphone, Users } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

const services = [
  { icon: Shield,  title: "Managed IT", d: "Full/Co-managed helpdesk, patching, monitoring, reporting." },
  { icon: Server,  title: "Cybersecurity", d: "EDR/XDR, MFA/SSO, email security, backup/DR, vCISO." },
  { icon: Cloud,   title: "Cloud & 365/Workspace", d: "Migrations, identity, MDM, cost optimization." },
  { icon: Wrench,  title: "Projects & Consulting", d: "Audits, office moves, network refresh, servers." },
  { icon: Smartphone, title: "Device Management", d: "Windows/Mac/iOS/Android MDM & baseline hardening." },
  { icon: Users,   title: "vCIO / Strategy", d: "Quarterly roadmap, budget planning, KPIs." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything you need for reliable IT"
        sub="Pick fully-managed or co-managed. Start with our HaziCare™ plan and add security modules as you grow."
      />
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({icon:Icon,title,d}) => (
            <Reveal key={title}>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.03] border border-white/10 hover:border-cyan-300/30 transition">
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-cyan-300" />
                  <h3 className="font-semibold text-lg">{title}</h3>
                </div>
                <p className="text-sm text-slate-300 mt-2">{d}</p>
                <a href="/get-quote" className="text-cyan-300 text-sm mt-3 inline-block underline">Get a quote</a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold">HaziCare™ Managed IT Plan — what’s included</h2>
            <ul className="grid md:grid-cols-2 gap-x-10 gap-y-2 text-sm text-slate-300 mt-3">
              {[
                "24/7 Helpdesk (P1 ≤ 15 min response)", "Patching & Updates", "EDR/XDR endpoint security",
                "Email security (MFA/SSO, phishing defense)", "MDM (Windows/Mac/iOS/Android)",
                "365/Workspace admin", "Backup & DR (endpoints + SaaS)", "Network monitoring",
                "vCIO: roadmap & KPIs"
              ].map(x => <li key={x} className="flex gap-2"><span>•</span><span>{x}</span></li>)}
            </ul>
          </div>
        </Reveal>
      </section>
    </>
  );
}
