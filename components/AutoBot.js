// app/components/AutoBot.jsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  Bot,
  Send,
  X,
  MessageCircle,
  Loader2,
  Check,
  RefreshCw,
  Download,
  Pencil,
  Trash2,
  Save,
} from "lucide-react";

/* ---------- Config ---------- */

const QUICK_REPLIES = [
  "Pricing",
  "Services",
  "Onboarding",
  "Support",
  "Security stack",
];

const INTENTS = [
  {
    key: "pricing",
    test: /(price|pricing|cost|quote|plan|package)/i,
    respond: () =>
      "We price by users/devices and scope (MSP + security + backup). Want me to collect a few details to get you a tailored quote?",
    next: "lead_confirm",
  },
  {
    key: "services",
    test:
      /(service|msp|managed it|cyber|security|edr|xdr|backup|o365|m365|email|cloud|vcio|helpdesk)/i,
    respond: () =>
      "We provide Managed IT, 24/7 helpdesk, EDR/XDR, email security, backup/DR, vCIO, and cloud. Do you want a quick overview PDF or a custom quote?",
    suggestions: ["Get a quote", "Talk to support", "Security stack"],
  },
  {
    key: "onboarding",
    test: /(onboard|onboarding|start|kickoff|deploy|rollout)/i,
    respond: () =>
      "Standard onboarding: discovery → hardening → agent rollout → backup baseline → runbook. Need timelines or a proposal?",
    suggestions: ["Get a quote", "Timelines", "What do you need from us?"],
  },
  {
    key: "support",
    test: /(support|helpdesk|issue|ticket|problem|down|outage)/i,
    respond: () =>
      "Our helpdesk is 24/7. P1 response ≤ 15 min. Want me to raise a ticket or route you to an engineer?",
    suggestions: ["Open a ticket", "Speak to engineer", "SLA details"],
    next: "lead_confirm_support",
  },
  {
    key: "security",
    test: /(security|edr|xdr|siem|soc|phish|spam|ransom|backup|dr|mfa|zero trust)/i,
    respond: () =>
      "We deploy EDR/XDR on endpoints, secure email with advanced threat protection, and enforce MFA + backups. Want a quick security gap check?",
    suggestions: ["Security gap check", "Get a quote", "Which EDR do you use?"],
  },
  {
    key: "fallback",
    test: /.*/i,
    respond: () =>
      "Got it. I can collect a few details for a tailored plan or connect you to a specialist. What would you like?",
    suggestions: ["Get a quote", "Talk to support", "Services"],
  },
];

const LEAD_FIELDS = [
  { key: "name", label: "Your name", placeholder: "e.g., Ali Raza", validate: (v) => v.length >= 2 },
  { key: "email", label: "Work email", placeholder: "e.g., ali@company.com", validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
  { key: "company", label: "Company", placeholder: "e.g., Acme Pvt Ltd", validate: (v) => v.length >= 2 },
  { key: "users", label: "Users (approx.)", placeholder: "e.g., 25", validate: (v) => /^\d{1,5}$/.test(v) },
  { key: "devices", label: "Managed devices (approx.)", placeholder: "e.g., 30", validate: (v) => /^\d{1,5}$/.test(v) },
];

/* ---------- Helpers ---------- */

const nowTS = () => new Date().toISOString();
const greetByTime = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
};
const trimLog = (log, max = 300) => (log.length <= max ? log : log.slice(-max));

/* ---------- Component ---------- */

export default function AutoBot() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const [mode, setMode] = useState("chat"); // chat | lead | lead_gate | support_gate
  const [leadStep, setLeadStep] = useState(0);
  const [lead, setLead] = useState({ name: "", email: "", company: "", users: "", devices: "", consent: true });

  // editing state
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const [log, setLog] = useState(() => {
    if (typeof window === "undefined") return [];
    const saved = window.localStorage.getItem("autobot_log");
    if (saved) return JSON.parse(saved);
    return [
      {
        id: crypto.randomUUID(),
        from: "bot",
        text: `${greetByTime()} — I'm AutoBot 🤖. Ask about services, pricing, or onboarding. I can also get you a tailored quote in under a minute.`,
        ts: nowTS(),
      },
    ];
  });

  const viewport = useRef(null);

  // keep FAB state CSS var for layout shims (back-to-top)
  useEffect(() => {
    document.documentElement.style.setProperty("--autobot-open", open ? "1" : "0");
    return () => document.documentElement.style.removeProperty("--autobot-open");
  }, [open]);

  // Esc to close
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // persist log
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("autobot_log", JSON.stringify(log));
    }
  }, [log]);

  // auto-scroll
  useEffect(() => {
    if (!viewport.current) return;
    viewport.current.scrollTop = viewport.current.scrollHeight;
  }, [log, typing, open]);

  // unread badge
  useEffect(() => {
    if (!open) {
      const last = log.at(-1);
      if (last?.from === "bot") setUnread((u) => u + 1);
    } else {
      setUnread(0);
    }
  }, [log, open]);

  // context capture
  const ctx = useMemo(() => {
    if (typeof window === "undefined") return {};
    const url = new URL(window.location.href);
    const utm = Object.fromEntries([...url.searchParams.entries()].filter(([k]) => k.startsWith("utm_")));
    return { path: url.pathname, referrer: document.referrer || "", utm };
  }, []);

  function pushUser(text) {
    setLog((l) => trimLog([...l, { id: crypto.randomUUID(), from: "you", text, ts: nowTS() }]));
  }
  function pushBot(text) {
    setLog((l) => trimLog([...l, { id: crypto.randomUUID(), from: "bot", text, ts: nowTS() }]));
  }
  function setBotTyping(cb, delay = 600) {
    setTyping(true);
    setTimeout(() => { cb?.(); setTyping(false); }, delay);
  }
  function handleQuick(text) { setMsg(text); setTimeout(() => send(), 10); }
  function detectIntent(text) { return INTENTS.find((i) => i.test.test(text)) || INTENTS[INTENTS.length - 1]; }

  // delete a message (any)
  function deleteMsg(id) {
    if (!id) return;
    const ok = window.confirm("Delete this message?");
    if (!ok) return;
    setLog((l) => l.filter((m) => m.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setEditingText("");
    }
  }

  // start edit (only for user's own message)
  function startEdit(m) {
    if (m.from !== "you") return;
    setEditingId(m.id);
    setEditingText(m.text);
  }
  // save edit
  function saveEdit() {
    if (!editingId) return;
    const text = editingText.trim();
    if (!text) return;
    setLog((l) =>
      l.map((m) => (m.id === editingId ? { ...m, text, ts: nowTS(), edited: true } : m))
    );
    setEditingId(null);
    setEditingText("");
  }

  async function send(e) {
    e?.preventDefault();
    const t = (msg || "").trim();
    if (!t) return;

    // commands
    if (t.startsWith("/")) {
      handleCommand(t);
      setMsg("");
      return;
    }

    pushUser(t);
    setMsg("");

    // lead flow
    if (mode === "lead") {
      const field = LEAD_FIELDS[leadStep];
      if (field) {
        if (!field.validate(t)) {
          setBotTyping(() => pushBot(`Please provide a valid **${field.label.toLowerCase()}**.`));
          return;
        }
        setLead((prev) => ({ ...prev, [field.key]: t }));
        const next = leadStep + 1;
        if (next < LEAD_FIELDS.length) {
          setLeadStep(next);
          setBotTyping(() => {
            const nf = LEAD_FIELDS[next];
            pushBot(`**${nf.label}**\n${nf.placeholder ? `(${nf.placeholder})` : ""}`);
          });
          return;
        }
        setMode("chat");
        setLeadStep(0);
        await submitLead("quote");
        return;
      }
    }

    // gate modes
    if (mode === "lead_gate" || mode === "support_gate") {
      const ans = t.toLowerCase();
      if (["yes", "y", "ok", "sure"].includes(ans)) {
        setMode("lead");
        setLeadStep(0);
        setBotTyping(() => pushBot(`Perfect. **${LEAD_FIELDS[0].label}**\n(${LEAD_FIELDS[0].placeholder})`));
      } else if (["no", "n", "later"].includes(ans)) {
        setMode("chat");
        setBotTyping(() => pushBot("No problem. Ask me anything or type **Get a quote** when ready."));
      } else {
        setBotTyping(() => pushBot("Reply **yes** to proceed or **no** to skip."));
      }
      return;
    }

    // normal intent path
    const intent = detectIntent(t);
    setBotTyping(() => {
      pushBot(intent.respond());
      if (intent.suggestions?.length) pushBot("Suggestions: " + intent.suggestions.map((s) => `“${s}”`).join(" • "));
    });

    if (intent.next === "lead_confirm") {
      setBotTyping(() => pushBot("Shall I collect details now? (Reply **yes** to proceed)"));
      setMode("lead_gate");
      return;
    }
    if (intent.next === "lead_confirm_support") {
      setBotTyping(() => pushBot("Want me to raise a support ticket now? (Reply **yes** to proceed)"));
      setMode("support_gate");
      return;
    }
  }

  function handleCommand(cmd) {
    pushUser(cmd);
    if (cmd === "/help") {
      setBotTyping(() => pushBot("Commands:\n• /help — Show this\n• /reset — Clear chat\n• /download — Export transcript"));
      return;
    }
    if (cmd === "/reset") {
      setLog([
        { id: crypto.randomUUID(), from: "bot", text: `${greetByTime()} — I'm AutoBot 🤖. Ask about services, pricing, or onboarding.`, ts: nowTS() },
      ]);
      setMode("chat");
      setLeadStep(0);
      setLead({ name: "", email: "", company: "", users: "", devices: "", consent: true });
      setEditingId(null);
      setEditingText("");
      return;
    }
    if (cmd === "/download") {
      const blob = new Blob([JSON.stringify(log, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `autobot-transcript-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setBotTyping(() => pushBot("Transcript downloaded."));
      return;
    }
    setBotTyping(() => pushBot("Unknown command. Try /help"));
  }

  async function submitLead(kind) {
    setBotTyping(() => pushBot("Thanks! Submitting your details…"));
    try {
      await fetch("/api/autobot_lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, lead, context: ctx, transcript: log, createdAt: Date.now() }),
      });
      setBotTyping(() => pushBot("All set ✅ A specialist will email you shortly with a tailored proposal. Anything else I can help with?"));
    } catch {
      setBotTyping(() => pushBot("I couldn't reach the server right now, but your details are saved. We'll follow up by email."));
    }
  }

  function onLeadChange(k, v) { setLead((p) => ({ ...p, [k]: v })); }
  function startQuoteFlow() {
    setMode("lead");
    setLeadStep(0);
    setBotTyping(() => pushBot(`Let's do it. **${LEAD_FIELDS[0].label}**\n(${LEAD_FIELDS[0].placeholder})`));
  }

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] z-[85] rounded-full w-12 h-12 bg-cyan-500 text-white shadow-lg hover:bg-cyan-400 transition grid place-items-center"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        <div className="relative">
          <MessageCircle className="w-[20px] h-[20px]" />
          {unread > 0 && !open && (
            <span className="absolute -top-2 -right-2 text-[10px] bg-rose-500 text-white rounded-full px-1.5 py-0.5">
              {unread}
            </span>
          )}
        </div>
      </button>

      {/* Overlay (click outside to close) */}
      {open && (
        <button
          className="fixed inset-0 z-[84] bg-black/30 backdrop-blur-[1px]"
          aria-label="Close chat"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Panel */}
      {open && (
        <div
          className="fixed right-4 bottom-[calc(4.5rem+env(safe-area-inset-bottom,0px))] z-[85] w-[22rem] max-w-[92vw] rounded-2xl border border-white/10 bg-[#0e1628] shadow-2xl overflow-hidden"
          role="dialog"
          aria-label="Chat with AutoBot"
        >
          <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
            <div className="font-semibold text-sm flex items-center gap-2">
              <Bot className="w-4 h-4" /> Supreme IT experts — AutoBot
            </div>
            <div className="flex items-center gap-2">
              {/* direct link to Get Quote page */}
              <Link
                href="/get-quote"
                className="text-xs px-2 py-1 rounded-md border border-cyan-300/40 text-cyan-300 hover:bg-cyan-300/10"
                title="Get Quote"
              >
                Get Quote →
              </Link>
              <button onClick={() => handleCommand("/reset")} className="text-xs opacity-70 hover:opacity-100" title="Reset">
                <RefreshCw className="w-4 h-4" />
              </button>
              <button onClick={() => handleCommand("/download")} className="text-xs opacity-70 hover:opacity-100" title="Download transcript">
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-1 text-[12px] px-2 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/15"
                aria-label="Close chat"
                title="Close (Esc)"
              >
                <X className="w-4 h-4" />
                Close
              </button>
            </div>
          </div>

          <div ref={viewport} className="h-72 overflow-y-auto p-3 space-y-2">
            {log.map((m) => (
              <div key={m.id} className={`group relative text-[13px] leading-relaxed ${m.from === "you" ? "text-cyan-300" : "text-slate-200"}`}>
                {/* meta */}
                <div className="opacity-60 text-[11px] mb-0.5">
                  [{m.from}] • {new Date(m.ts).toLocaleTimeString()} {m.edited ? "• edited" : ""}
                </div>

                {/* message view / edit */}
                {editingId === m.id ? (
                  <div className="flex items-start gap-2">
                    <textarea
                      className="w-full rounded-md bg-transparent border border-white/20 px-2 py-1 text-sm"
                      rows={2}
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                    />
                    <button
                      className="p-1 rounded-md border border-emerald-400/40 text-emerald-300 hover:bg-emerald-300/10"
                      title="Save"
                      onClick={saveEdit}
                    >
                      <Save className="w-4 h-4" />
                    </button>
                    <button
                      className="p-1 rounded-md border border-white/20 hover:bg-white/10"
                      title="Cancel"
                      onClick={() => { setEditingId(null); setEditingText(""); }}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: m.text.replace(/\n/g, "<br/>") }} />
                )}

                {/* actions (hover) */}
                <div className="absolute -top-1 right-0 opacity-0 group-hover:opacity-100 transition flex items-center gap-1">
                  {m.from === "you" && editingId !== m.id && (
                    <button
                      className="p-1 rounded-md border border-white/15 hover:bg-white/10"
                      title="Edit"
                      onClick={() => startEdit(m)}
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    className="p-1 rounded-md border border-white/15 hover:bg-white/10"
                    title="Delete"
                    onClick={() => deleteMsg(m.id)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
            {typing && (
              <div className="text-slate-300 text-sm flex items-center gap-2 opacity-80">
                <Loader2 className="w-4 h-4 animate-spin" /> typing…
              </div>
            )}
          </div>

          {/* quick replies */}
          <div className="px-3 pb-2 flex flex-wrap gap-2">
            {QUICK_REPLIES.map((q) => (
              <button
                key={q}
                onClick={() => handleQuick(q)}
                className="text-xs px-2 py-1 rounded-full border border-white/15 text-slate-200/90 hover:bg-white/5"
              >
                {q}
              </button>
            ))}
            {/* proper link to /get-quote */}
            <Link
              href="/get-quote"
              className="text-xs px-2 py-1 rounded-full border border-cyan-300/40 text-cyan-300 hover:bg-cyan-300/10"
            >
              Get Quote →
            </Link>
          </div>

          {/* stepper (lead mode) */}
          {mode === "lead" && (
            <div className="px-3 pb-2">
              <div className="flex items-center gap-2 text-[11px] text-slate-300/80">
                <Check className={`w-3 h-3 ${leadStep > 0 ? "text-emerald-400" : "opacity-40"}`} />
                <span>Step {Math.min(leadStep + 1, LEAD_FIELDS.length)} of {LEAD_FIELDS.length}</span>
              </div>
            </div>
          )}

          {/* composer */}
          <form onSubmit={send} className="p-2 flex gap-2 border-t border-white/10">
            <input
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              className="flex-1 rounded-lg bg-transparent border border-white/20 px-3 py-2 text-sm outline-none placeholder:text-slate-400"
              placeholder={
                mode === "lead"
                  ? `Type your ${LEAD_FIELDS[leadStep]?.label?.toLowerCase() || "answer"}…`
                  : "Type your message… (try /help)"
              }
              disabled={typing}
              aria-label="Message"
            />
            <button
              className="rounded-lg px-3 py-2 text-sm bg-cyan-400/10 text-cyan-300 border border-cyan-300/30 hover:bg-cyan-400/20 disabled:opacity-50"
              disabled={typing || !msg.trim()}
              aria-label="Send"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* consent (lead mode) */}
          {mode === "lead" && (
            <div className="px-3 pb-3">
              <label className="flex items-center gap-2 text-[11px] text-slate-300/90">
                <input type="checkbox" checked={lead.consent} onChange={(e) => onLeadChange("consent", e.target.checked)} />
                I agree to be contacted about this request.
              </label>
            </div>
          )}
        </div>
      )}
    </>
  );
}
