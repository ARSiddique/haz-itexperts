"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyButton({ text, className = "" }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try { await navigator.clipboard.writeText(text); setOk(true); setTimeout(()=>setOk(false), 1200); } catch {}
      }}
      className={`text-xs inline-flex items-center gap-1 opacity-80 hover:opacity-100 ${className}`}
      aria-label="Copy to clipboard"
    >
      {ok ? <><Check className="h-3.5 w-3.5"/> Copied</> : <><Copy className="h-3.5 w-3.5"/> Copy</>}
    </button>
  );
}
