// CONTACT — simple + Next 14/15 safe (SSR + Server Action)
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/siteConfig";
import { redirect } from "next/navigation";
import { Mail, Phone, ArrowRight } from "lucide-react";
import { sendContactEmail } from "@/lib/mailer";

export const metadata = {
  title: `Contact — ${site?.name || "Supreme IT Experts"}`,
  description: "Email or call directly — or send a short note. We reply fast.",
};

export default async function ContactPage(props) {
  // Next 15 note: searchParams may be async on server components
  const sp = (props?.searchParams && (await props.searchParams)) || {};
  const submitted = sp?.ok === "1";

  const email = site?.email ;
  const phone = site?.phone;

  // ===== Server Action =====
  async function submit(formData) {
    "use server";
    const data = {
      name: (formData.get("name") || "").toString().trim(),
  workEmail: (formData.get("workEmail") || "").toString().trim().toLowerCase(),
  message: (formData.get("message") || "").toString().trim(),
  website: (formData.get("website") || "").toString(),
  source: "contact-min",
    };

    // Basic validation
    if (!data.name || !data.workEmail || !data.message) {
      redirect("/contact?ok=0");
    }

    const r = await sendContactEmail(data);
    if (!r?.ok) {
      console.error("sendContactEmail failed:", r?.error);
      redirect("/contact?ok=0");
    }
    redirect("/contact?ok=1");
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to us"
        sub="Email or call directly — or send a short note."
      />

      <main className="max-w-3xl mx-auto px-4 pb-20">
        {/* Direct actions */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6">
          <div className="grid sm:grid-cols-2 gap-3">
            <a
              href={`mailto:${email}`}
              className="rounded-lg px-4 py-3 text-sm font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 inline-flex items-center justify-center gap-2"
            >
              <Mail className="h-4 w-4" /> {email}
            </a>
            <a
              href={`tel:${(phone || "").replace(/[^+\d]/g, "")}`}
              className="rounded-lg px-4 py-3 text-sm font-semibold bg-white/10 ring-1 ring-white/20 hover:bg-white/20 inline-flex items-center justify-center gap-2"
            >
              <Phone className="h-4 w-4" /> {phone}
            </a>
          </div>
        </div>

        {/* Mini form */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6">
          {submitted && (
            <div className="mb-4 rounded-md border border-emerald-400/30 bg-emerald-500/10 p-3 text-sm">
              Thanks! We’ll get back to you shortly.
            </div>
          )}

          <form action={submit} className="space-y-4">
            {/* Honeypot (hidden) */}
            <input type="text" name="website" autoComplete="off" tabIndex={-1} className="hidden" />

            <div>
              <label className="text-xs text-slate-400">Your name</label>
              <input
                name="name"
                required
                className="w-full rounded-lg bg-transparent border border-white/20 px-3 py-2 text-sm outline-none focus:border-cyan-300/50"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400">Work email</label>
              <input
                name="workEmail"
                type="email"
                required
                className="w-full rounded-lg bg-transparent border border-white/20 px-3 py-2 text-sm outline-none focus:border-cyan-300/50"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400">Message</label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="How can we help?"
                className="w-full rounded-lg bg-transparent border border-white/20 px-3 py-2 text-sm outline-none focus:border-cyan-300/50"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">We’ll never share your data.</span>
              <button
                type="submit"
                className="rounded-lg px-4 py-2.5 text-sm font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 inline-flex items-center gap-2"
              >
                Send <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>

          <div className="mt-4 flex gap-2">
            <Link href="/get-quote" className="rounded-lg px-3 py-2 text-xs border border-white/10 bg-white/5 hover:border-cyan-300/30">
              Get a Quote
            </Link>
            <Link href="/assessment" className="rounded-lg px-3 py-2 text-xs border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20">
              Free IT assessment
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
