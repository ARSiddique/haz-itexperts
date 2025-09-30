// app/contact/page.js
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { site } from "@/lib/siteConfig"; // ✅ IMPORT THIS

export const metadata = {
  title: `Contact — ${site?.name ?? "HaziTExperts"}`,
  description:
    "Reach HaziTExperts for managed IT & cybersecurity. Call, email, or request a free IT assessment.",
};

export default function ContactPage() {
  const email = site?.email ?? "hello@hazitexperts.com";
  const phone = site?.phone ?? "+92-3XX-XXXXXXX";
  const address = site?.address ?? "Gulberg, Lahore, Pakistan";

  return (
    <main className="max-w-6xl mx-auto px-4 py-16">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold">Contact</h1>
        <p className="text-slate-300 mt-2 max-w-2xl">
          Tell us a bit about your environment and what you need. We’ll respond fast
          with clear next steps.
        </p>
      </header>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: direct & office info */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-6">
          <div>
            <h3 className="font-semibold">Direct</h3>
            <p className="text-slate-300 text-sm mt-1">
              <a className="inline-flex items-center gap-2 hover:text-cyan-300 transition"
                 href={`mailto:${email}`}>
                <Mail className="w-4 h-4" /> {email}
              </a>
              <span className="mx-2 opacity-40">•</span>
              <a className="inline-flex items-center gap-2 hover:text-cyan-300 transition"
                 href={`tel:${phone.replaceAll(" ", "")}`}>
                <Phone className="w-4 h-4" /> {phone}
              </a>
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Office</h3>
            <p className="text-slate-300 text-sm mt-1 inline-flex items-center gap-2">
              <MapPin className="w-4 h-4" /> {address}
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/get-quote"
              className="rounded-lg px-5 py-3 font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
            >
              Get Quote
            </Link>
            <Link
              href="/assessment"
              className="rounded-lg px-5 py-3 font-semibold bg-white/10 ring-1 ring-white/20 hover:bg-white/20 transition inline-flex items-center gap-2"
            >
              Free IT assessment <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Right: lightweight form (no backend yet) */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="font-semibold">Quick message</h3>
          <p className="text-slate-300 text-sm mt-1">
            Prefer email? We’ll route your note to the right specialist.
          </p>

          <form
            action={`mailto:${email}`}
            method="post"
            encType="text/plain"
            className="mt-4 space-y-4"
          >
            <div className="grid md:grid-cols-2 gap-3">
              <input required name="name" placeholder="Your name"
                className="rounded-lg bg-transparent border border-white/20 px-3 py-2 text-sm outline-none focus:border-cyan-300/50"/>
              <input required name="company" placeholder="Company"
                className="rounded-lg bg-transparent border border-white/20 px-3 py-2 text-sm outline-none focus:border-cyan-300/50"/>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <input required type="email" name="email" placeholder="Email"
                className="rounded-lg bg-transparent border border-white/20 px-3 py-2 text-sm outline-none focus:border-cyan-300/50"/>
              <input name="phone" placeholder="Phone"
                className="rounded-lg bg-transparent border border-white/20 px-3 py-2 text-sm outline-none focus:border-cyan-300/50"/>
            </div>

            <textarea required name="message" rows={5} placeholder="How can we help?"
              className="w-full rounded-lg bg-transparent border border-white/20 px-3 py-2 text-sm outline-none focus:border-cyan-300/50"></textarea>

            <button className="rounded-lg px-5 py-3 font-semibold border border-white/20 bg-white/10 hover:bg-white/20 transition">
              Send
            </button>
          </form>

          <p className="text-xs text-slate-400 mt-3">
            Sending opens your email app (no data stored on this site yet).
          </p>
        </section>
      </div>

      {/* FAQ anchor preview so header link works */}
      <section id="faqs" className="mt-16">
        <h2 className="text-2xl font-semibold">FAQs</h2>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {[
            ["How fast do you respond?", "P1 ≤ 15 min, P2 ≤ 1 hr, P3 same business day."],
            ["Do you do co-managed IT?", "Yes, we augment in-house teams with SLAs and KPIs."],
            ["What tools are included?", "EDR/XDR, patching, monitoring, email security, backup/DR."],
          ].map(([q, a]) => (
            <div key={q} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="font-medium">{q}</div>
              <p className="text-sm text-slate-300 mt-1">{a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
