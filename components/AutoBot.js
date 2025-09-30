"use client";
import { useState } from "react";
import { Bot, Send, X, MessageCircle } from "lucide-react";

const canned = [
  { q: /price|pricing|quote/i, a: "Please tap Get Quote and share users/devices; we’ll reply with a tailored plan." },
  { q: /support|helpdesk|issue|ticket/i, a: "Our helpdesk runs 24/7 with P1 ≤ 15 min response. How can we help?" },
  { q: /security|edr|xdr|backup/i, a: "We deploy EDR/XDR, email security, and backup/DR as standard. What’s your current stack?" },
];

export default function AutoBot() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [log, setLog] = useState([{ from: "bot", text: "Hi! Ask me about services, pricing, or onboarding." }]);

  function reply(text) {
    const hit = canned.find(c => c.q.test(text));
    return hit ? hit.a : "Got it. A specialist will follow up shortly. You can also click Get Quote for a fast proposal.";
  }

  function send(e) {
    e?.preventDefault();
    if (!msg.trim()) return;
    const user = { from: "you", text: msg.trim() };
    const bot = { from: "bot", text: reply(msg.trim()) };
    setLog((l) => [...l, user, bot]);
    setMsg("");
  }

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(v => !v)}
        className="fixed right-5 bottom-6 z-[60] rounded-full px-4 py-3 bg-cyan-500 text-white shadow-lg hover:bg-cyan-400 transition flex items-center gap-2"
        aria-label="Open chat"
      >
        <MessageCircle className="w-5 h-5" /> {open ? "Close" : "Chat"}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed right-4 bottom-24 z-[60] w-80 rounded-2xl border border-white/10 bg-[#0e1628]">
          <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
            <div className="font-semibold text-sm flex items-center gap-2"><Bot className="w-4 h-4"/> HaziTExperts — AutoBot</div>
            <button onClick={() => setOpen(false)} aria-label="close"><X className="w-4 h-4"/></button>
          </div>
          <div className="h-64 overflow-y-auto p-3 space-y-2">
            {log.map((m, i) => (
              <div key={i} className={`text-sm ${m.from === "you" ? "text-cyan-300" : "text-slate-200"}`}>
                <span className="opacity-70 mr-1">[{m.from}]</span>{m.text}
              </div>
            ))}
          </div>
          <form onSubmit={send} className="p-2 flex gap-2">
            <input
              value={msg}
              onChange={e=>setMsg(e.target.value)}
              className="flex-1 rounded-lg bg-transparent border border-white/20 px-3 py-2 text-sm"
              placeholder="Type your message…"
            />
            <button className="rounded-lg px-3 py-2 text-sm bg-cyan-400/10 text-cyan-300 border border-cyan-300/30 hover:bg-cyan-400/20">
              <Send className="w-4 h-4"/>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
