"use client";
import { useState } from "react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export default function QuotePage(){
  const [sent, setSent] = useState(false);

  async function onSubmit(e){
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    await fetch("/api/quote", { method:"POST", body: JSON.stringify(payload) });
    setSent(true);
    e.currentTarget.reset();
  }

  return (
    <>
      <PageHero eyebrow="Get Quote" title="Simple, transparent pricing"
        sub="Tell us your user/device counts and current tools. We’ll respond with a clear plan." />
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <Reveal>
          <form onSubmit={onSubmit} className="rounded-2xl border border-white/10 bg-white/5 p-6 grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm">Company</label>
              <input name="company" required className="mt-1 w-full rounded-lg bg-transparent border border-white/20 px-3 py-2"/>
            </div>
            <div>
              <label className="text-sm">Email</label>
              <input type="email" name="email" required className="mt-1 w-full rounded-lg bg-transparent border border-white/20 px-3 py-2"/>
            </div>
            <div>
              <label className="text-sm">Users</label>
              <input type="number" name="users" min="1" required className="mt-1 w-full rounded-lg bg-transparent border border-white/20 px-3 py-2"/>
            </div>
            <div>
              <label className="text-sm">Devices</label>
              <input type="number" name="devices" min="1" className="mt-1 w-full rounded-lg bg-transparent border border-white/20 px-3 py-2"/>
            </div>
            <div className="md:col-span-2">
              <label className="text-sm">Current stack (e.g., 365/Workspace, AV, backup)</label>
              <input name="stack" className="mt-1 w-full rounded-lg bg-transparent border border-white/20 px-3 py-2"/>
            </div>
            <div className="md:col-span-2">
              <label className="text-sm">Notes / priorities</label>
              <textarea name="notes" rows="4" className="mt-1 w-full rounded-lg bg-transparent border border-white/20 px-3 py-2"/>
            </div>
            <div className="md:col-span-2">
              <button className="rounded-lg px-5 py-3 font-semibold bg-cyan-400/10 text-cyan-300 border border-cyan-300/30 hover:bg-cyan-400/20">
                Request quote
              </button>
              {sent && <span className="ml-3 text-sm text-emerald-400">Submitted—check your email soon.</span>}
            </div>
          </form>
        </Reveal>
      </section>
    </>
  );
}
