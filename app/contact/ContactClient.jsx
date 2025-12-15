"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Copy,
  Check,
  Clock,
  Laptop2,
  ShieldCheck,
  Server,
  Paperclip,
  ChevronRight,
  MessageSquareText,
  Globe,
  Sparkles,
} from "lucide-react";
import { site } from "@/lib/siteConfig";

function cx(...a) {
  return a.filter(Boolean).join(" ");
}

// --------- Reusable inputs with error support ----------
const Input = ({ error, className, ...props }) => (
  <input
    {...props}
    className={cx(
      "rounded-lg bg-transparent border px-3 py-2 text-sm outline-none",
      error
        ? "border-red-500/70 focus:border-red-400"
        : "border-white/20 focus:border-cyan-300/50",
      className
    )}
  />
);

const TextArea = ({ error, className, ...props }) => (
  <textarea
    {...props}
    className={cx(
      "w-full rounded-lg bg-transparent border px-3 py-2 text-sm outline-none",
      error
        ? "border-red-500/70 focus:border-red-400"
        : "border-white/20 focus:border-cyan-300/50",
      className
    )}
  />
);

// -------------------------------------------------------

export default function ContactClient({ source = "contact-page" }) {
  const email = site?.email ?? "supremeitexperts@gmail.com";
  const phone = site?.phone ?? "+1 610-500-9209";

  // ✅ Remote-only (NO onsite, NO Pakistan)
  const address =
    "Remote-only IT support across Allentown, Macungie, Emmaus & the Lehigh Valley.";

  const [copied, setCopied] = useState("");
  const copy = async (txt, key) => {
    try {
      await navigator.clipboard.writeText(txt);
      setCopied(key);
      setTimeout(() => setCopied(""), 1300);
    } catch {
      // ignore
    }
  };

  const [step, setStep] = useState(1);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const [form, setForm] = useState({
    name: "",
    company: "",
    workEmail: "",
    phone: "",
    users: "25-50",
    stack: ["Microsoft 365"],
    location: "",
    priority: "P2",
    message: "",
    consent: true,
  });

  const [errors, setErrors] = useState({});

  // helper – field update + error clear
  const updateField = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((err) => ({ ...err, [field]: "" }));
  };

  const sla = useMemo(() => {
    switch (form.priority) {
      case "P1":
        return { label: "P1 — Critical", eta: "≤ 15 min" };
      case "P2":
        return { label: "P2 — High", eta: "≤ 1 hour" };
      default:
        return { label: "P3 — Normal", eta: "Same business day" };
    }
  }, [form.priority]);

  // ---------- Validation per step ----------
  const validateStep1 = () => {
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = "Please enter your name.";
    if (!form.company.trim()) nextErrors.company = "Please enter your company name.";

    if (!form.workEmail.trim()) {
      nextErrors.workEmail = "Please enter your work email.";
    } else if (!/\S+@\S+\.\S+/.test(form.workEmail.trim())) {
      nextErrors.workEmail = "Please enter a valid email (e.g. you@company.com).";
    }

    setErrors((err) => ({ ...err, ...nextErrors }));
    return Object.keys(nextErrors).length === 0;
  };

  const validateStep2 = () => {
    const nextErrors = {};
    if (!form.users) nextErrors.users = "Select approximate number of users.";
    if (!form.location.trim()) nextErrors.location = "Enter your primary location.";
    setErrors((err) => ({ ...err, ...nextErrors }));
    return Object.keys(nextErrors).length === 0;
  };

  const validateStep3 = () => {
    const nextErrors = {};
    if (!form.message.trim()) nextErrors.message = "Tell us briefly what you need help with.";
    if (!form.consent) nextErrors.consent = "Please confirm we can contact you about this request.";
    setErrors((err) => ({ ...err, ...nextErrors }));
    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setStep((s) => s + 1);
  };

  // ---------- Submit handler ----------
  const onSubmit = async (e) => {
    e?.preventDefault();

    if (!validateStep3()) {
      setStep(3);
      return;
    }

    setSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.workEmail,
          phone: form.phone,
          message: form.message,
          source,
        }),
      });

      if (res.ok || res.status === 303) {
        setDone(true);
        setSending(false);
        return;
      }

      throw new Error("api failed");
    } catch (err) {
      console.error("Contact submit failed, falling back to mailto:", err);

      const lines = [
        `Name: ${form.name}`,
        `Company: ${form.company}`,
        `Email: ${form.workEmail}`,
        `Phone: ${form.phone || "-"}`,
        `Users: ${form.users}`,
        `Stack: ${form.stack.join(", ")}`,
        `Location: ${form.location}`,
        `Priority: ${form.priority} (${sla.eta})`,
        "",
        "Message:",
        form.message,
      ];
      const body = encodeURIComponent(lines.join("\n"));
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(
        "Website Contact — " + form.company
      )}&body=${body}`;
      setSending(false);
      setDone(true);
    }
  };

  const StackChip = ({ label }) => {
    const active = form.stack.includes(label);
    return (
      <button
        type="button"
        onClick={() =>
          setForm((f) => ({
            ...f,
            stack: active ? f.stack.filter((x) => x !== label) : [...f.stack, label],
          }))
        }
        className={cx(
          "px-3 py-1.5 rounded-lg text-xs border transition",
          active
            ? "border-cyan-300/30 text-cyan-300 bg-cyan-400/10"
            : "border-white/10 text-slate-300 hover:bg-white/5"
        )}
      >
        {label}
      </button>
    );
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to the MSP that treats your IT like mission-critical"
        sub="Tell us about your environment. We’ll reply fast with clear next steps."
      />

      <main className="max-w-6xl mx-auto px-4 pb-24">
        {/* Top info cards */}
        <Reveal>
          <div className="grid lg:grid-cols-3 gap-4">
            {/* Direct */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">
                Direct
              </div>

              <div className="mt-2 text-sm">
                <a
                  className="inline-flex items-center gap-2 hover:text-cyan-300 transition"
                  href={`mailto:${email}`}
                >
                  <Mail className="w-4 h-4" /> {email}
                </a>
                <button
                  type="button"
                  onClick={() => copy(email, "email")}
                  className="ms-2 text-xs inline-flex items-center gap-1 opacity-80 hover:opacity-100"
                >
                  {copied === "email" ? (
                    <>
                      <Check className="h-3.5 w-3.5" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" /> Copy
                    </>
                  )}
                </button>
              </div>

              <div className="mt-1 text-sm">
                <a
                  className="inline-flex items-center gap-2 hover:text-cyan-300 transition"
                  href={`tel:${phone.replaceAll(" ", "")}`}
                >
                  <Phone className="w-4 h-4" /> {phone}
                </a>
                <button
                  type="button"
                  onClick={() => copy(phone, "phone")}
                  className="ms-2 text-xs inline-flex items-center gap-1 opacity-80 hover:opacity-100"
                >
                  {copied === "phone" ? (
                    <>
                      <Check className="h-3.5 w-3.5" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" /> Copy
                    </>
                  )}
                </button>
              </div>

              {address && (
                <div className="mt-2 text-sm inline-flex items-center gap-2 opacity-90">
                  <MapPin className="w-4 h-4" /> {address}
                </div>
              )}

              <div className="mt-4 flex gap-2">
                <Link
                  href="/get-quote"
                  className="rounded-lg px-3 py-2 text-sm border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
                >
                  Get Quote
                </Link>
                <Link
                  href="/assessment"
                  className="rounded-lg px-3 py-2 text-sm bg-white/10 ring-1 ring-white/20 hover:bg-white/20 inline-flex items-center gap-2"
                >
                  Free IT assessment <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* SLA */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">
                SLA promise
              </div>
              <div className="mt-2 grid grid-cols-3 gap-3 text-sm">
                {[
                  ["P1", "≤ 15 min"],
                  ["P2", "≤ 1 hr"],
                  ["P3", "Same day"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="rounded-xl border border-white/10 bg-white/5 p-3 text-center"
                  >
                    <div className="text-cyan-300 font-semibold">{k}</div>
                    <div className="text-slate-300 text-xs">{v} response</div>
                  </div>
                ))}
              </div>
              {/* ✅ No PKT here */}
            <p className="text-xs text-slate-400 mt-2">
  24/7 helpdesk. Business hours:{" "}
  {site.businessHours?.text || "Mon–Fri 9:00 AM – 6:00 PM ET"}
</p>


            </div>

            {/* Channels */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">
                Channels
              </div>
              <ul className="mt-2 text-sm text-slate-300 space-y-1">
                <li className="flex items-center gap-2">
                  <MessageSquareText className="h-4 w-4 text-cyan-300" /> Email, portal, phone
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-cyan-300" /> Security incidents triaged as P1
                </li>
                {/* ✅ No onsite mention */}
                <li className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-cyan-300" /> Remote support anywhere in the US
                </li>
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Multi-step form */}
        <Reveal className="mt-10">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-7">
            {/* progress */}
            <div className="flex items-center gap-2 text-xs">
              {["Details", "Environment", "Message"].map((t, i) => (
                <div key={t} className="flex items-center gap-2">
                  <div
                    className={cx(
                      "size-6 grid place-items-center rounded-full border",
                      step >= i + 1
                        ? "border-cyan-300/40 bg-cyan-400/10 text-cyan-300"
                        : "border-white/10 text-slate-400"
                    )}
                  >
                    {i + 1}
                  </div>
                  <span
                    className={cx(
                      "hidden sm:inline",
                      step >= i + 1 ? "text-slate-200" : "text-slate-400"
                    )}
                  >
                    {t}
                  </span>
                  {i < 2 && <span className="w-6 h-[2px] bg-white/10 rounded-full" />}
                </div>
              ))}
            </div>

            <form className="mt-6 space-y-5" onSubmit={onSubmit}>
              {step === 1 && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-400">Your name</label>
                    <Input
                      placeholder="Your full name"
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      error={!!errors.name}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="text-xs text-slate-400">Company</label>
                    <Input
                      placeholder="Company name"
                      value={form.company}
                      onChange={(e) => updateField("company", e.target.value)}
                      error={!!errors.company}
                    />
                    {errors.company && (
                      <p className="mt-1 text-xs text-red-400">{errors.company}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs text-slate-400">Work email</label>
                    <Input
                      type="email"
                      placeholder="you@company.com"
                      value={form.workEmail}
                      onChange={(e) => updateField("workEmail", e.target.value)}
                      error={!!errors.workEmail}
                    />
                    {errors.workEmail && (
                      <p className="mt-1 text-xs text-red-400">{errors.workEmail}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs text-slate-400">Phone (optional)</label>
                    <Input
                      placeholder="e.g. +1 (610) 555-1234"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs text-slate-400">Users</label>
                      <select
                        value={form.users}
                        onChange={(e) => updateField("users", e.target.value)}
                        className={cx(
                          "w-full rounded-lg bg-transparent border px-3 py-2 text-sm outline-none",
                          errors.users
                            ? "border-red-500/70 focus:border-red-400"
                            : "border-white/20 focus:border-cyan-300/50"
                        )}
                      >
                        {["10-24", "25-50", "51-100", "101-200", "200+"].map((x) => (
                          <option key={x} value={x} className="bg-[#0b1220]">
                            {x}
                          </option>
                        ))}
                      </select>
                      {errors.users && <p className="mt-1 text-xs text-red-400">{errors.users}</p>}
                    </div>

                    <div>
                      <label className="text-xs text-slate-400">Primary location</label>
                      <Input
                        placeholder="City / region"
                        value={form.location}
                        onChange={(e) => updateField("location", e.target.value)}
                        error={!!errors.location}
                      />
                      {errors.location && (
                        <p className="mt-1 text-xs text-red-400">{errors.location}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-xs text-slate-400">Priority</label>
                      <div className="flex gap-2">
                        {["P1", "P2", "P3"].map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => updateField("priority", p)}
                            className={cx(
                              "px-3 py-2 rounded-lg text-sm border transition",
                              form.priority === p
                                ? "border-cyan-300/30 text-cyan-300 bg-cyan-400/10"
                                : "border-white/10 text-slate-300 hover:bg-white/5"
                            )}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                      <div className="mt-1 text-xs text-slate-400 inline-flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 text-cyan-300" /> Target response {sla.eta}
                      </div>
                    </div>
                  </div>

                  <div className="mt-2">
                    <label className="text-xs text-slate-400">Current stack</label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {[
                        "Microsoft 365",
                        "Google Workspace",
                        "Windows",
                        "macOS",
                        "Android/iOS",
                        "Servers/AD",
                        "Firewalls/Wi-Fi",
                      ].map((x) => (
                        <StackChip key={x} label={x} />
                      ))}
                    </div>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div>
                    <label className="text-xs text-slate-400">How can we help?</label>
                    <TextArea
                      rows={6}
                      placeholder="Example: Co-managed helpdesk and MDM baseline for ~80 users. Also email security & backup/DR."
                      value={form.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      error={!!errors.message}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-400">{errors.message}</p>
                    )}
                    <div className="mt-2 text-xs text-slate-400 flex items-center gap-2">
                      <Paperclip className="h-3.5 w-3.5 text-cyan-300" /> Attachments? Email to{" "}
                      <a
                        className="underline decoration-dotted underline-offset-2"
                        href={`mailto:${email}`}
                      >
                        {email}
                      </a>
                    </div>
                  </div>

                  <label className="text-xs flex flex-col gap-1 text-slate-300 mt-2">
                    <span className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={form.consent}
                        onChange={(e) => updateField("consent", e.target.checked)}
                      />
                      You agree to be contacted about this request.
                    </span>
                    {errors.consent && <span className="text-xs text-red-400">{errors.consent}</span>}
                  </label>
                </>
              )}

              <div className="flex items-center justify-between">
                <div className="text-xs text-slate-400 inline-flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-cyan-300" /> We’ll never sell or share your data.
                </div>

                <div className="flex gap-2">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep((s) => s - 1)}
                      className="rounded-lg px-4 py-2 text-sm border border-white/10 bg-white/5 hover:bg-white/10"
                    >
                      Back
                    </button>
                  )}

                  {step < 3 && (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="rounded-lg px-4 py-2 text-sm border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 inline-flex items-center gap-1"
                    >
                      Next <ChevronRight className="h-4 w-4" />
                    </button>
                  )}

                  {step === 3 && (
                    <button
                      type="submit"
                      disabled={sending}
                      className={cx(
                        "rounded-lg px-5 py-2.5 text-sm font-semibold border transition inline-flex items-center gap-2",
                        sending
                          ? "border-white/10 text-slate-400"
                          : "border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
                      )}
                    >
                      {sending ? "Sending…" : "Send"} {!sending && <ArrowRight className="h-4 w-4" />}
                    </button>
                  )}
                </div>
              </div>

              {done && (
                <div className="mt-4 rounded-lg border border-emerald-400/30 bg-emerald-500/10 p-3 text-sm">
                  Thanks! We’ve received your request.{" "}
                  <span className="text-emerald-300">Target response {sla.eta}</span>.
                </div>
              )}
            </form>
          </div>
        </Reveal>

        {/* Trust strip */}
        <Reveal className="mt-10">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              [Laptop2, "Endpoints", "MDM baselines, patching, app catalogs"],
              [Server, "Infra & Cloud", "Monitoring, identity, backup/DR"],
              [ShieldCheck, "Security", "EDR/XDR, email security, backup/DR"],
            ].map(([Icon, t, d]) => (
              <div
                key={t}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-cyan-300/30 transition"
              >
                <div className="flex items-center gap-2">
                  <span className="grid place-items-center size-9 rounded-xl bg-cyan-400/10 border border-cyan-300/20">
                    <Icon className="h-5 w-5 text-cyan-300" />
                  </span>
                </div>
                <div className="font-semibold mt-1">{t}</div>
                <p className="text-sm text-slate-300 mt-2">{d}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* FAQ preview */}
        <Reveal className="mt-12">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">FAQs</h2>
              <Link href="/faqs" className="text-sm text-cyan-300 inline-flex items-center gap-2">
                See all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mt-3">
              {[
                ["How fast do you respond?", "P1 ≤ 15 min, P2 ≤ 1 hr, P3 same business day."],
                ["Do you do co-managed IT?", "Yes — we integrate with in-house teams with SLAs & KPIs."],
                ["What tools are included?", "EDR/XDR, patching, monitoring, email security, backup/DR."],
              ].map(([q, a]) => (
                <div key={q} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="font-medium">{q}</div>
                  <p className="text-sm text-slate-300 mt-1">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal className="mt-12">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/15 to-fuchsia-500/15 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">Prefer a quick call?</h3>
              <p className="text-slate-300">
                15-min no-pressure assessment — we’ll map gaps and next steps.
              </p>
            </div>
            <div className="flex gap-3">
              <a
                href={`tel:${phone.replaceAll(" ", "")}`}
                className="rounded-lg px-5 py-3 font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 inline-flex items-center gap-2"
              >
                Call now <Phone className="h-4 w-4" />
              </a>
              <Link
                href="/get-quote"
                className="rounded-lg px-5 py-3 font-semibold bg-white/10 ring-1 ring-white/20 hover:bg-white/20 inline-flex items-center gap-2"
              >
                Get Quote <Sparkles className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </main>
    </>
  );
}
