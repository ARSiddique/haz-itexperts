// components/OfferPopup.jsx
"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Phone, Sparkles } from "lucide-react";
import { site } from "@/lib/siteConfig";

const LOTTIE_SIDE =
  "https://assets9.lottiefiles.com/packages/lf20_w51pcehl.json";
const LOTTIE_CEO =
  "https://assets1.lottiefiles.com/packages/lf20_xlkxtmul.json";

const SEEN_KEY = "sie_lp_seen_v3";

export default function OfferPopup() {
  const [open, setOpen] = useState(false);
  const [lottieReady, setLottieReady] = useState(false);
  const scrInjected = useRef(false);
  const pathname = usePathname();

  const lockedRef = useRef(false);
  const scrollYRef = useRef(0);

  // ✅ OPEN ONLY AFTER USER INTERACTION (prevents CLS in Lighthouse/PSI)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isProd = process.env.NODE_ENV === "production";
    const seen = localStorage.getItem(SEEN_KEY);

    // dev me quick open (optional)
    if (!isProd) {
      const t = setTimeout(() => setOpen(true), 500);
      return () => clearTimeout(t);
    }

    if (seen) return;

    let opened = false;

    const openNow = () => {
      if (opened) return;
      opened = true;
      setOpen(true);
      localStorage.setItem(SEEN_KEY, "1");
      cleanup();
    };

    const onInteract = () => openNow();

    const cleanup = () => {
      window.removeEventListener("scroll", onInteract);
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("keydown", onInteract);
      window.removeEventListener("touchstart", onInteract);
    };

    // first interaction triggers open
    window.addEventListener("scroll", onInteract, { passive: true });
    window.addEventListener("pointerdown", onInteract, { passive: true });
    window.addEventListener("touchstart", onInteract, { passive: true });
    window.addEventListener("keydown", onInteract);

    return cleanup;
  }, []);

  // close on route change
  useEffect(() => {
    if (open) setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // inject lottie script once (only when popup opens)
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

  // BODY SCROLL LOCK (keep as is, but safe)
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const lock = () => {
      if (lockedRef.current) return;
      scrollYRef.current = window.scrollY || window.pageYOffset || 0;

      html.style.overflow = "hidden";
      body.style.position = "fixed";
      body.style.top = `-${scrollYRef.current}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";

      lockedRef.current = true;
    };

    const unlock = () => {
      if (!lockedRef.current) return;

      html.style.overflow = "";
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";

      window.scrollTo(0, scrollYRef.current);
      lockedRef.current = false;
    };

    if (open) lock();
    else unlock();

    return () => unlock();
  }, [open]);

  // Esc to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[999] overscroll-contain h-[100dvh]"
      role="dialog"
      aria-modal="true"
      aria-label="Allentown Launch Offer"
    >
      {/* Backdrop */}
      <button
        aria-label="Close offer"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-black/70"
      />

      <div className="absolute inset-0 z-[1000] flex items-center justify-center p-3 md:p-6 h-[100dvh]">
        <div className="relative w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-[#0b1220] shadow-2xl max-h-[100dvh]">
          <div className="max-h-[100dvh] overflow-y-auto">
            <button
              onClick={() => setOpen(false)}
              className="sticky top-3 right-3 float-right z-[1001] m-3 rounded-full p-2 text-slate-300 hover:bg-white/10 bg-transparent"
              aria-label="Close"
              type="button"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid md:grid-cols-2">
              {/* Left */}
              <div className="relative bg-gradient-to-br from-white/[0.03] to-white/[0.01]">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.22),transparent_60%)]" />
                <div className="relative px-5 pt-6 pb-6 sm:px-6 sm:pt-10 sm:pb-8 md:p-10">
                  <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-cyan-300/90">
                    <Sparkles className="h-4 w-4" /> Allentown Launch Offer
                  </div>

                  <h3 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-extrabold leading-snug bg-gradient-to-r from-cyan-300 via-white to-fuchsia-400 bg-clip-text text-transparent">
                    First 20 Customers Get a Free IT Audit
                  </h3>

                  <p className="mt-3 text-[13px] sm:text-sm md:text-base text-slate-300">
                    Full environment checkup for SMBs in Allentown, Macungie,
                    and Emmaus. Endpoint health, identity &amp; MFA review,
                    Microsoft 365 hardening, email security, and backup/DR
                    readiness.
                  </p>

                  <ul className="mt-4 space-y-2 text-[13px] sm:text-sm text-slate-200">
                    <li>• Helpdesk workflow review</li>
                    <li>• Patch, EDR/XDR, and device baselines</li>
                    <li>• Email security and phishing posture</li>
                    <li>• Budget and 90-day quick wins</li>
                  </ul>

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

              {/* Right (reserve space to avoid internal shifts) */}
              <div className="relative flex items-center justify-center bg-[#0e1628] p-5 sm:p-6 md:p-8">
                <div className="w-full max-w-[560px]">
                  <div className="relative w-full aspect-[16/12] rounded-2xl overflow-hidden border border-white/10">
                    {lottieReady ? (
                      <lottie-player
                        src={LOTTIE_SIDE}
                        autoplay
                        loop
                        mode="normal"
                        style={{
                          position: "absolute",
                          inset: 0,
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-fuchsia-400/10" />
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
