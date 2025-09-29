"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { Shield, Server, Cloud, Wrench, Smartphone, Users, ArrowRight } from "lucide-react";
import { site } from "@/lib/siteConfig";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage(){
  useEffect(()=>{
    gsap.from(".hero-fx",{y:24,opacity:0,stagger:0.08,duration:0.8,ease:"power3.out"});
    gsap.utils.toArray(".reveal").forEach(el=>{
      gsap.from(el,{scrollTrigger:{trigger:el,start:"top 85%"},y:24,opacity:0,duration:0.7,ease:"power3.out"});
    });
  },[]);

  const areas = site.areas ?? ["Lahore","Karachi","Islamabad","Rawalpindi","Faisalabad"];

  return (
    <>
      {/* HERO */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 py-24">
          <div className="hero-fx inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm bg-white/10 ring-1 ring-white/20">
            Next-gen Managed IT for SMEs
          </div>
          <h1 className="hero-fx text-3xl md:text-5xl font-extrabold mt-3">
            {site.tagline}
          </h1>
          <p className="hero-fx mt-4 text-lg/7 text-slate-300 max-w-2xl">
            24/7 helpdesk, proactive monitoring, and real security — at a fixed monthly fee.
          </p>
          <div className="hero-fx mt-6 flex flex-col sm:flex-row gap-3">
            <Link href="/assessment" className="rounded-lg px-5 py-3 font-semibold bg-cyan-400/10 text-cyan-300 border border-cyan-300/30 hover:bg-cyan-400/20">
              {site.cta}
            </Link>
            <a href="#plan" className="rounded-lg px-5 py-3 font-semibold bg-white/5 ring-1 ring-white/10 hover:bg-white/10 inline-flex items-center gap-2">
              See what’s included <ArrowRight className="h-4 w-4"/>
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="reveal max-w-6xl mx-auto px-4 mt-10">
        <h2 className="text-2xl font-semibold">We keep your business running—and secure</h2>
        <p className="text-slate-300 mt-2 text-sm max-w-2xl">
          From helpdesk to cyber, our team acts as your IT department or augments your in-house team
          with real SLAs and clear reporting.
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {[["<15 min","P1 response time"],["99.9%","EDR/XDR endpoint coverage"],["24/7","Helpdesk & monitoring"]].map(([k,v])=>(
            <div key={v} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
              <div className="text-2xl font-bold text-cyan-300">{k}</div>
              <div className="text-slate-400 text-sm">{v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="reveal max-w-6xl mx-auto px-4 mt-14">
        <h2 className="text-2xl font-semibold">Everything an SME needs (and nothing you don’t)</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {[
            {Icon:Shield,t:"Managed IT",d:"Fully-managed & Co-managed helpdesk, patching, monitoring, reporting.",href:"/managed-it"},
            {Icon:Server,t:"Cybersecurity",d:"EDR/XDR, MFA/SSO, email security, backup/DR, vCISO, SOC-ready posture.",href:"/cybersecurity"},
            {Icon:Cloud,t:"Cloud & 365/Workspace",d:"Migrations, identity & MDM, admin & optimization for Microsoft 365/Google.",href:"/cloud"},
            {Icon:Wrench,t:"Projects & Consulting",d:"Audits, office moves, network refresh, server/cloud work."},
            {Icon:Smartphone,t:"Device Management",d:"Windows/Mac/iOS/Android MDM, baseline hardening, app deploys."},
            {Icon:Users,t:"vCIO / Strategy",d:"Quarterly roadmap, budget planning, measurable KPIs."},
          ].map(({Icon,t,d,href})=>(
            <div key={t} className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.03] border border-white/10 hover:border-cyan-300/30 transition">
              <div className="flex items-center gap-2"><Icon className="h-5 w-5 text-cyan-300"/><h3 className="font-semibold text-lg">{t}</h3></div>
              <p className="text-sm text-slate-300 mt-2">{d}</p>
              {href && <a href={href} className="text-cyan-300 text-sm mt-3 inline-block underline">Explore</a>}
            </div>
          ))}
        </div>
      </section>

      {/* PLAN */}
      <section id="plan" className="reveal max-w-6xl mx-auto px-4 mt-14">
        <h2 className="text-2xl font-semibold">HaziCare™ Managed IT Plan</h2>
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-6">
          <ul className="grid md:grid-cols-2 gap-x-8 gap-y-2 text-sm text-slate-300">
            {[
              "24/7 Helpdesk (P1 ≤ 15 min response)",
              "Patch & Update Management (OS & apps)",
              "Endpoint Security (EDR/XDR + Ransomware protection)",
              "Email Security (MFA/SSO, phishing defense)",
              "Device & MDM (Windows/Mac/Android/iOS)",
              "Microsoft 365/Google Workspace Admin",
              "Backup & Disaster Recovery (endpoints + M365/Google)",
              "Network Monitoring (Wi-Fi, switches, firewalls)",
              "vCIO: Quarterly IT strategy & roadmap",
            ].map(x=>(
              <li key={x} className="flex gap-2"><span>•</span><span>{x}</span></li>
            ))}
          </ul>
        </div>
      </section>

      {/* AREAS WE SERVE */}
      <section id="areas" className="reveal max-w-6xl mx-auto px-4 mt-14">
        <h2 className="text-2xl font-semibold">Areas we serve</h2>
        <p className="text-slate-300 mt-2 text-sm">Onsite & remote support across major Pakistani cities.</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {areas.map(a=>(
            <div key={a} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">{a}</div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="reveal max-w-6xl mx-auto px-4 mt-16 mb-24">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">Ready for a no-pressure IT assessment?</h3>
            <p className="text-slate-200/80">We’ll map gaps and give you clear next steps—free.</p>
          </div>
        <Link href="/assessment" className="rounded-lg px-5 py-3 font-semibold bg-white/10 ring-1 ring-white/20">Book now</Link>
        </div>
      </section>
    </>
  );
}
