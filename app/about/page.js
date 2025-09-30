"use client";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="We’re the team that treats your IT like mission-critical"
        sub="Small, senior core. Clear SLAs. Security-first mindset. We scale with you from 10 to 500 users."
      />
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            ["2019+", "Hands-on experience across SMEs"],
            ["<15 min", "Priority-1 response target"],
            ["24/7", "Helpdesk & monitoring"],
          ].map(([k,v]) => (
            <Reveal key={v}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
                <div className="text-2xl font-bold text-cyan-300">{k}</div>
                <div className="text-slate-400 text-sm">{v}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold">Our philosophy</h2>
            <p className="text-slate-300 mt-2">
              No fluff. Observable results. We document, automate, and report—so leadership
              sees progress. We earn trust by being reliable, transparent, and proactive.
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
