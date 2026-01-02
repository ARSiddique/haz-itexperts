// app/lp/allentown/page.jsx
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/siteConfig";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import TrackedPhoneLink from "@/components/TrackedPhoneLink";

export const metadata = {
  title: "Allentown IT Launch Offer — Free IT Audit for First 20 SMBs",
  description:
    "Allentown, Macungie, Emmaus: First 20 customers get a free IT audit — uptime, security, Microsoft 365, backups — actionable quick wins and a clear roadmap.",
};

export default function AllentownLP() {
  const source = "lp-allentown";
  const phone = site?.phone || "+1 610-500-9209";

  return (
    <main className="min-h-screen bg-[#0b1220] text-slate-100">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 size-72 rounded-full bg-cyan-500/25 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 size-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">
              Allentown • Macungie • Emmaus
            </div>
            <h1 className="mt-3 text-4xl md:text-6xl font-extrabold leading-[1.06] bg-gradient-to-r from-cyan-300 via-white to-fuchsia-400 bg-clip-text text-transparent">
              First 20 Customers Get a Free IT Audit
            </h1>
            <p className="mt-4 text-base md:text-lg text-slate-200 max-w-[62ch]">
              A complete snapshot of your IT: devices, identity, Microsoft 365, security stack, backups and helpdesk. You get a short report with quick wins and a 90-day plan.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link
                href="/contact"
                className="rounded-lg px-5 py-3 font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 text-center"
              >
                Book My Free Audit
              </Link>

              {/* ✅ Tracked Call */}
              <TrackedPhoneLink
                phone={phone}
                source={source}
                className="rounded-lg px-5 py-3 font-semibold bg-white/10 ring-1 ring-white/20 hover:bg-white/20 inline-flex items-center justify-center gap-2"
              >
                <Phone className="h-4 w-4" />
                Call {phone}
              </TrackedPhoneLink>
            </div>

            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              {[
                ["Security Baseline", "EDR/XDR, MFA/SSO, email security"],
                ["Device Health", "Patch, asset, and MDM hygiene"],
                ["M365 Review", "Licensing, Teams/SharePoint controls"],
              ].map(([t, d]) => (
                <div key={t} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                  <div className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                    {t}
                  </div>
                  <div className="text-sm text-slate-300 mt-1">{d}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-sm text-slate-400">
              Limited to 20 qualified SMBs in the Allentown area. No obligation.
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-white/10">
            <div className="relative w-full aspect-[16/10]">
              <Image src="/media/dashboard.jpg" alt="Audit overview" fill className="object-cover" priority />
            </div>
            <div className="p-5 md:p-6">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/10">
                  <Image src="/media/ceo.jpg" alt="CEO" fill className="object-cover" />
                </div>
                <div>
                  <div className="font-semibold">Muhammad Barkat Saifee</div>
                  <div className="text-xs text-slate-300">CEO, {site.name}</div>
                </div>
              </div>

              <p className="mt-3 text-sm text-slate-200">
                “We stabilize IT quickly and transparently. This audit shows you the truth in a week and gives you a simple plan to raise your baseline.”
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
                >
                  Start Now <ArrowRight className="h-4 w-4" />
                </Link>

                {/* ✅ Tracked Call */}
                <TrackedPhoneLink
                  phone={phone}
                  source={source}
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm bg-white/10 ring-1 ring-white/20 hover:bg-white/20"
                >
                  <Phone className="h-4 w-4" />
                  Call {phone}
                </TrackedPhoneLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-24">
        <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 md:p-8">
          <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">What you receive</div>
          <h2 className="text-2xl md:text-3xl font-extrabold mt-1">A short, actionable report</h2>

          <div className="grid md:grid-cols-3 gap-4 mt-5 text-sm">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="font-medium">Findings</div>
              <p className="text-slate-300 mt-1">Top risks, configuration gaps, and quick wins.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="font-medium">90-day Plan</div>
              <p className="text-slate-300 mt-1">Prioritized steps with effort and impact.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="font-medium">Budget Snapshot</div>
              <p className="text-slate-300 mt-1">Licensing hygiene and right-sizing guidance.</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-lg px-5 py-3 font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
            >
              Book My Free Audit
            </Link>

            {/* ✅ Tracked Call */}
            <TrackedPhoneLink
              phone={phone}
              source={source}
              className="rounded-lg px-5 py-3 font-semibold bg-white/10 ring-1 ring-white/20 hover:bg-white/20 inline-flex items-center gap-2"
            >
              <Phone className="h-4 w-4" />
              Call {phone}
            </TrackedPhoneLink>
          </div>
        </div>
      </section>
    </main>
  );
}
