// components/OfferPopup.jsx
"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { X, Phone, Sparkles } from "lucide-react";
import { site } from "@/lib/siteConfig";

/** Replace with your preferred Lottie JSONs (any public .json URL works) */
const LOTTIE_SIDE =
  "https://assets9.lottiefiles.com/packages/lf20_w51pcehl.json"; // IT guy w/ laptop (example)
const LOTTIE_CEO =
  "https://assets1.lottiefiles.com/packages/lf20_xlkxtmul.json"; // subtle avatar (example)

/** Local dev: show on every reload. Prod: show only first visit. */
const SEEN_KEY = "sie_lp_seen_v3";

export default function OfferPopup() {
  const [open, setOpen] = useState(false);
  const [lottieReady, setLottieReady] = useState(false);
  const scrInjected = useRef(false);

  // show logic
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isProd = process.env.NODE_ENV === "production";
    if (!isProd) {
      // dev/localhost: always show
      setTimeout(() => setOpen(true), 500);
      return;
    }
    const seen = localStorage.getItem(SEEN_KEY);
    if (!seen) {
      setTimeout(() => setOpen(true), 700);
      localStorage.setItem(SEEN_KEY, "1");
    }
  }, []);

  // inject lottie-player web component script once
  useEffect(() => {
    if (!open || scrInjected.current) return;
    if (typeof window === "undefined") return;
    if (customElements.get("lottie-player")) {
      setLottieReady(true);
      scrInjected.current = true;
      return;
    }
    const s = document.createElement("script");
    s.src =
      "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
    s.async = true;
    s.onload = () => setLottieReady(true);
    s.onerror = () => setLottieReady(false);
    document.body.appendChild(s);
    scrInjected.current = true;
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999]">
      {/* Backdrop (click to close) */}
      <button
        aria-label="Close offer"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-black/70"
      />

      {/* Modal */}
      <div className="absolute inset-0 z-[1000] flex items-center justify-center p-3 md:p-6">
        <div className="relative w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-[#0b1220] shadow-2xl">
          <button
            onClick={() => setOpen(false)}
            className="absolute right-3 top-3 z-[1001] rounded-full p-2 text-slate-300 hover:bg-white/10"
            aria-label="Close"
            type="button"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="grid md:grid-cols-2">
            {/* Left: Content */}
            <div className="relative bg-gradient-to-br from-white/[0.03] to-white/[0.01]">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.22),transparent_60%)]" />
              <div className="relative px-6 pt-14 pb-6 md:p-10">
                <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-cyan-300/90">
                  <Sparkles className="h-4 w-4" /> Allentown Launch Offer
                </div>

                <h3 className="mt-2 text-3xl md:text-4xl font-extrabold leading-snug bg-gradient-to-r from-cyan-300 via-white to-fuchsia-400 bg-clip-text text-transparent">
                  First 20 Customers Get a Free IT Audit
                </h3>

                <p className="mt-3 text-sm md:text-base text-slate-300">
                  Full environment checkup for SMBs in Allentown, Macungie, and
  Emmaus. Endpoint health, identity & MFA review, Microsoft 365
  hardening, email security, and backup/DR readiness.
                </p>

                <ul className="mt-4 space-y-2 text-sm text-slate-200">
                  <li>• Helpdesk workflow review</li>
                  <li>• Patch, EDR/XDR, and device baselines</li>
                  <li>• Email security and phishing posture</li>
                  <li>• Budget and 90-day quick wins</li>
                </ul>

                {/* CTAs must remain clickable: ensure they sit above backdrop (z-index already higher) */}
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <Link
                    href="/lp/allentown"
                    className="rounded-lg px-5 py-3 text-sm font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 text-center"
                  >
                    Claim Free Audit
                  </Link>

                  <a
                    href={`tel:${site.phone?.replace(/[^+\d]/g, "") || ""}`}
                    className="rounded-lg px-5 py-3 text-sm font-semibold bg-white/10 ring-1 ring-white/20 hover:bg-white/20 inline-flex items-center justify-center gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    Call {site.phone}
                  </a>
                </div>

                {/* CEO note */}
                <div className="mt-6 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3">
                  {/* tiny lottie avatar on the left (optional) */}
                  <div className="h-10 w-10 overflow-hidden rounded-full border border-white/10 bg-white/10 grid place-items-center">
                    {lottieReady ? (
                      <lottie-player
                        src={LOTTIE_CEO}
                        autoplay
                        loop
                        mode="normal"
                        style={{ width: 36, height: 36 }}
                      />
                    ) : (
                      <div className="size-9 rounded-full bg-cyan-400/20" />
                    )}
                  </div>
                  <div className="text-xs">
                    <div className="font-semibold text-slate-100">
                      Muhammad Barkat Saifee, CEO
                    </div>
                    <div className="text-slate-300">
                      “Let us stabilize your IT fast — then help you grow.”
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Lottie visual */}
            <div className="relative flex items-center justify-center bg-[#0e1628] p-6 md:p-8">
              <div className="w-full max-w-[560px]">
                {lottieReady ? (
                  <lottie-player
                    src={LOTTIE_SIDE}
                    autoplay
                    loop
                    mode="normal"
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  // graceful fallback (simple gradient box)
                  <div className="aspect-[16/12] w-full rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-400/10 to-fuchsia-400/10" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
