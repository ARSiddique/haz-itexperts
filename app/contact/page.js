// app/contact/page.jsx
import PageHero from "@/components/PageHero";
import { site } from "@/lib/siteConfig";
import { Mail, Phone } from "lucide-react";

export const metadata = {
  title: `Contact — ${site?.name || "Supreme IT Experts"}`,
  description: "Email or call us directly. We respond during business hours.",
};

export default function ContactPage() {
  const email = site?.email || "supremeitexperts@gmail.com";
  const phone = site?.phone || "610-500-9209";

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to our team"
        sub="Reach out by email or phone. We’re happy to answer questions about support and services."
      />

      <main className="max-w-3xl mx-auto px-4 pb-20 space-y-8">
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
          <h2 className="text-lg font-semibold">Direct contact</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <a
              href={`mailto:${email}`}
              className="rounded-lg px-4 py-3 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 inline-flex items-center justify-center gap-2"
            >
              <Mail className="h-4 w-4" />
              {email}
            </a>
            <a
              href={`tel:${(phone || "").replace(/[^+\d]/g, "")}`}
              className="rounded-lg px-4 py-3 border border-white/15 bg-white/5 hover:bg-white/10 inline-flex items-center justify-center gap-2 text-slate-100"
            >
              <Phone className="h-4 w-4" />
              {phone}
            </a>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300 space-y-2">
          <h2 className="text-base font-semibold text-slate-100">
            Business hours
          </h2>
          <p>Monday – Friday: 8:00 AM – 6:00 PM</p>
          <p>Emergency support is available outside these hours for existing customers.</p>
        </section>
      </main>
    </>
  );
}
