"use client";

import { useMemo, useState } from "react";
import { ArrowRight, ShieldCheck, Copy, Check } from "lucide-react";
import { site } from "@/lib/siteConfig";
import ContactActionsRow from "@/components/ContactActionsRow";
import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import TrackedEmailLink from "@/components/TrackedEmailLink";
import { track as gaTrack } from "@/lib/track";

function cx(...a) {
  return a.filter(Boolean).join(" ");
}

const Input = ({ error, className, ...props }) => (
  <input
    {...props}
    className={cx(
      "w-full rounded-lg bg-transparent border px-3 py-2 text-sm outline-none",
      error ? "border-red-500/70 focus:border-red-400" : "border-white/20 focus:border-cyan-300/50",
      className
    )}
  />
);

const TextArea = ({ error, className, ...props }) => (
  <textarea
    {...props}
    className={cx(
      "w-full rounded-lg bg-transparent border px-3 py-2 text-sm outline-none",
      error ? "border-red-500/70 focus:border-red-400" : "border-white/20 focus:border-cyan-300/50",
      className
    )}
  />
);

export default function QuoteFormClient({ source = "get-quote-page" }) {
  const email = site?.email ?? "supremeitexperts@gmail.com";
  const phone = site?.phone ?? "+1 610-500-9209";

  const pageCtx = () => {
    if (typeof window === "undefined") return { source };
    return {
      source,
      page_path: window.location.pathname,
      page_url: window.location.href,
    };
  };

  const [form, setForm] = useState({
    name: "",
    company: "",
    workEmail: "",
    phone: "",
    teamSize: "25–50",
    tools: "",
    budget: "",
    message: "",
    website: "", // honeypot
  });

  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  // fallback UI (no programmatic mailto)
  const [fallbackOpen, setFallbackOpen] = useState(false);
  const [fallbackText, setFallbackText] = useState("");
  const [copied, setCopied] = useState(false);

  const updateField = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((err) => ({ ...err, [field]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.company.trim()) next.company = "Please enter your company.";
    if (!form.workEmail.trim()) next.workEmail = "Please enter your work email.";
    else if (!/\S+@\S+\.\S+/.test(form.workEmail.trim())) next.workEmail = "Please enter a valid email.";
    if (!form.teamSize) next.teamSize = "Select your team size.";
    if (!form.message.trim()) next.message = "Tell us what you’d like a quote for.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const composedMessage = useMemo(() => {
    return [
      "QUOTE REQUEST DETAILS",
      "---------------------",
      `Name: ${form.name}`,
      `Company: ${form.company}`,
      `Work Email: ${form.workEmail}`,
      `Phone: ${form.phone || "-"}`,
      `Team size: ${form.teamSize}`,
      form.tools ? `Current tools: ${form.tools}` : "",
      form.budget ? `Rough monthly budget: ${form.budget}` : "",
      "",
      "Message:",
      form.message,
    ]
      .filter(Boolean)
      .join("\n");
  }, [form]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // bot trap
    if (form.website?.trim()) {
      setDone(true);
      return;
    }

    setSending(true);
    setCopied(false);
    setFallbackOpen(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          company: form.company,
          email: form.workEmail,
          phone: form.phone,
          users: form.teamSize,
          stack: form.tools ? [form.tools] : [],
          location: "",
          priority: "P2",
          slaTarget: "≤ 1 hour",
          message: composedMessage,
          source,
          tz: "America/New_York",
          page: typeof window !== "undefined" ? window.location.href : "",
        }),
      });

      if (res.ok || res.status === 303) {
        gaTrack("contact_submit", { ...pageCtx(), form: "quote", teamSize: form.teamSize });
        setDone(true);
        setSending(false);
        return;
      }

      throw new Error("api failed");
    } catch {
      // ✅ no window.location.href mailto; show fallback UI
      gaTrack("contact_submit", { ...pageCtx(), form: "quote", fallback: "manual_email" });

      setFallbackText(composedMessage);
      setFallbackOpen(true);
      setSending(false);
    }
  };

  const copyFallback = async () => {
    try {
      await navigator.clipboard.writeText(fallbackText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  };

  return (
    <>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7 space-y-6">
        <div>
          <h2 className="text-base md:text-lg font-semibold text-slate-50">Tell us what you’d like a quote for</h2>
          <p className="mt-1 text-sm text-slate-300">
            A short, concrete description is enough. We’ll reply with options and a simple, transparent breakdown.
          </p>

          {/* ✅ trust/CTA line (tracked + no raw tel href) */}
          <div className="mt-3 text-xs text-slate-400">
            Or call us:{" "}
            <TrackedPhoneLink
              phone={phone}
              source={source}
              placement="quote_trust_line"
              className="text-cyan-300 hover:underline"
            >
              {phone}
            </TrackedPhoneLink>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          {/* honeypot */}
          <input
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            value={form.website}
            onChange={(e) => updateField("website", e.target.value)}
          />

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
              {errors.company && <p className="mt-1 text-xs text-red-400">{errors.company}</p>}
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
              {errors.workEmail && <p className="mt-1 text-xs text-red-400">{errors.workEmail}</p>}
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

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-slate-400">Team size</label>
              <select
                value={form.teamSize}
                onChange={(e) => updateField("teamSize", e.target.value)}
                className={cx(
                  "w-full rounded-lg bg-transparent border px-3 py-2 text-sm outline-none",
                  errors.teamSize ? "border-red-500/70 focus:border-red-400" : "border-white/20 focus:border-cyan-300/50"
                )}
              >
                {["10–24", "25–50", "51–100", "101–200", "200+"].map((opt) => (
                  <option key={opt} value={opt} className="bg-[#0b1220]">
                    {opt}
                  </option>
                ))}
              </select>
              {errors.teamSize && <p className="mt-1 text-xs text-red-400">{errors.teamSize}</p>}
            </div>

            <div>
              <label className="text-xs text-slate-400">Current tools (optional)</label>
              <Input
                placeholder="e.g. Microsoft 365, Google Workspace"
                value={form.tools}
                onChange={(e) => updateField("tools", e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs text-slate-400">Rough monthly budget (optional)</label>
              <Input
                placeholder="e.g. $1,500–$2,500"
                value={form.budget}
                onChange={(e) => updateField("budget", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400">What would you like us to cover in the quote?</label>
            <TextArea
              rows={5}
              placeholder="Example: Fully managed IT + security for ~40 staff across 2 offices. Include options for 24/7 support and backup/DR."
              value={form.message}
              onChange={(e) => updateField("message", e.target.value)}
              error={!!errors.message}
            />
            {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="h-3.5 w-3.5 text-cyan-300" />
              No spam. We only use these details to prepare your quote.
            </span>

            <button
              type="submit"
              disabled={sending}
              className={cx(
                "rounded-lg px-5 py-2.5 text-sm font-semibold border transition inline-flex items-center gap-2",
                sending ? "border-white/10 text-slate-400" : "border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
              )}
            >
              {sending ? "Sending…" : "Request quote"}
              {!sending && <ArrowRight className="h-4 w-4" />}
            </button>
          </div>

          {done && (
            <div className="mt-3 rounded-lg border border-emerald-400/30 bg-emerald-500/10 p-3 text-sm">
              Thanks! We’ve received your quote request. We’ll reply with a clear proposal soon.
            </div>
          )}

          {fallbackOpen && (
            <div className="mt-3 rounded-lg border border-amber-400/30 bg-amber-500/10 p-4 text-sm space-y-3">
              <div className="font-semibold text-amber-200">Couldn’t send automatically.</div>
              <p className="text-slate-200">
                Please email us and paste the message below (copy button). We’ll respond quickly.
              </p>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={copyFallback}
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs border border-white/10 bg-white/5 hover:bg-white/10"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied" : "Copy message"}
                </button>

                <TrackedEmailLink
                  email={email}
                  source={source}
                  placement="quote_fallback_email"
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
                >
                  Email us
                </TrackedEmailLink>
              </div>

              <pre className="whitespace-pre-wrap rounded-lg border border-white/10 bg-white/5 p-3 text-xs text-slate-200">
                {fallbackText}
              </pre>
            </div>
          )}
        </form>
      </div>

      {/* SAME CTA ROW */}
      <div className="mt-10">
        <ContactActionsRow source={source} />
      </div>
    </>
  );
}
