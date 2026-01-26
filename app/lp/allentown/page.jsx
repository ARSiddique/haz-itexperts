import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/siteConfig";
import { ArrowRight, CheckCircle2, Phone, Mail, BadgeCheck } from "lucide-react";
import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import TrackedEmailLink from "@/components/TrackedEmailLink";
import TrackedWhatsAppLink from "@/components/TrackedWhatsAppLink";
import LeadFormSimple from "@/components/LeadFormSimple";
import { FaWhatsapp } from "react-icons/fa";

export const metadata = {
  title: "Allentown IT Launch Offer — Free IT Assessment for First 20 SMBs",
  description:
    "Allentown, Macungie, Emmaus: First 20 customers get a free IT assessment — uptime, security, Microsoft 365, backups — quick wins and a clear 90-day plan.",
};

function digitsOnly(p) {
  return String(p || "").replace(/[^\d]/g, "");
}

export default function AllentownLP() {
  const source = "lp-allentown";
  const email = site?.email ?? "support@supremeitexperts.com";
  const phone = site?.phone || "+1 610-500-9209";

  const waRaw = site?.whatsapp || phone;
  const waDigits = digitsOnly(waRaw);

  const WA_MSG =
    "Hi! I’d like to claim the Free IT Assessment (Allentown).\n\n" +
    "Company: __\n" +
    "Users: __\n" +
    "Biggest issue right now: __\n" +
    "Best time to reach: __";

  const waHref = waDigits ? `https://wa.me/${waDigits}?text=${encodeURIComponent(WA_MSG)}` : "";

  return (
    <main className="min-h-screen bg-[#0b1220] text-slate-100">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 size-72 rounded-full bg-cyan-500/25 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 size-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 py-14 md:py-20 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">
              Allentown • Macungie • Emmaus
            </div>

            <h1 className="mt-3 text-4xl md:text-6xl font-extrabold leading-[1.06] bg-gradient-to-r from-cyan-300 via-white to-fuchsia-400 bg-clip-text text-transparent">
              First 20 Customers Get a Free IT Assessment
            </h1>

            <p className="mt-4 text-base md:text-lg text-slate-200 max-w-[62ch]">
              A fast snapshot of your IT: endpoints, Microsoft 365, identity & MFA, email security, and backup readiness.
              You get quick wins + a simple 90-day plan.
            </p>

            {/* CTA */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="#claim"
                className="rounded-lg px-5 py-3 font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 inline-flex items-center gap-2"
              >
                Claim Free Assessment <ArrowRight className="h-4 w-4" />
              </Link>

              <TrackedPhoneLink
                phone={phone}
                source={source}
                className="rounded-lg px-5 py-3 font-semibold bg-white/10 ring-1 ring-white/20 hover:bg-white/20 inline-flex items-center justify-center gap-2"
              >
                <Phone className="h-4 w-4" />
                Call {phone}
              </TrackedPhoneLink>
            </div>

            {/* Quick cards */}
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

          {/* CEO card */}
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03]">
            <div className="relative w-full aspect-[16/10]">
              <Image src="/media/dashboard.jpg" alt="Audit overview" fill className="object-cover" priority />
            </div>

            <div className="p-5 md:p-6">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/10">
                  <Image src="/media/ceo.jpg" alt="CEO" fill className="object-cover" />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold truncate">Muhammad Barkat Saifee</div>

                    {/* ✅ tick (like your popup screenshot) */}
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-slate-200">
                      <BadgeCheck className="h-4 w-4 text-cyan-300" />
                      CEO
                    </span>
                  </div>

                  <div className="text-xs text-slate-300">CEO, {site?.name || "Supreme IT Experts"}</div>
                </div>
              </div>

              <p className="mt-3 text-sm text-slate-200">
                “We stabilize IT quickly and transparently. This assessment shows you the truth fast — and gives a simple
                plan you can actually follow.”
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="#claim"
                  className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
                >
                  Start Now <ArrowRight className="h-4 w-4" />
                </Link>

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

      {/* CLAIM FORM SECTION ✅ */}
      <section id="claim" className="max-w-6xl mx-auto px-4 pb-20 scroll-mt-28">
        <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 md:p-8">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-6 items-start">
            <LeadFormSimple
              source={source}
              title="Claim your free assessment"
              sub="Two minutes. No pressure. We reply with clear next steps."
              cta="Claim"
              defaultSubject="Free IT Assessment — Allentown Launch Offer"
            />

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">Pick the fastest way to reach us</div>
              <h2 className="mt-2 text-xl font-extrabold">WhatsApp, Email, or Call</h2>
              <p className="mt-2 text-sm text-slate-300">
                We’ll reply with next steps. No pressure — just clarity.
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                {waHref ? (
                  <TrackedWhatsAppLink
                    href={waHref}
                    source={source}
                    className="rounded-lg px-4 py-2.5 text-sm font-semibold border border-emerald-300/25 text-emerald-200 bg-emerald-400/10 hover:bg-emerald-400/15 inline-flex items-center gap-2"
                  >
                    WhatsApp <FaWhatsapp className="h-4 w-4" />
                  </TrackedWhatsAppLink>
                ) : null}

                <TrackedEmailLink
                  email={email}
                  source={source}
                  className="rounded-lg px-4 py-2.5 text-sm font-semibold bg-white/10 ring-1 ring-white/20 hover:bg-white/20 inline-flex items-center gap-2"
                >
                  Email <Mail className="h-4 w-4" />
                </TrackedEmailLink>

                <TrackedPhoneLink
                  phone={phone}
                  source={source}
                  className="rounded-lg px-4 py-2.5 text-sm font-semibold bg-white/10 ring-1 ring-white/20 hover:bg-white/20 inline-flex items-center gap-2"
                >
                  Call <Phone className="h-4 w-4" />
                </TrackedPhoneLink>

                <Link
                  href="/contact"
                  className="rounded-lg px-4 py-2.5 text-sm font-semibold bg-white/5 ring-1 ring-white/15 hover:bg-white/10 inline-flex items-center gap-2"
                >
                  Contact Page <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-4 text-xs text-slate-400">
                Not in Allentown? Use the general{" "}
                <Link href="/contact" className="underline underline-offset-4 hover:text-slate-200">
                  Contact page
                </Link>
                .
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What you receive */}
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
              href="#claim"
              className="rounded-lg px-5 py-3 font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
            >
              Claim Free Assessment
            </Link>

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
