// components/BackToTop.jsx
"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronUp } from "lucide-react";

/**
 * BackToTop (conic ring) — AutoBot-aware
 * - Appears after ~320px scroll
 * - Sits above chat FAB (chatSize + gap)
 * - Also lifted above WhatsApp/Call FAB stack using fabLift
 * - When AutoBot opens:
 *    mode="shift" (default) -> lifts up by panelLift
 *    mode="hide"            -> fades & disables pointer events
 */
export default function BackToTop({
  showAfter = 320, // px scrolled before showing
  chatSize = 56, // chatbot FAB size (px)
  gap = 12, // gap from chatbot (px)
  size = 48, // this button size (px)
  mode = "shift", // "shift" | "hide"
  panelLift = 304, // ≈ 19rem panel height
  z = 86, // z-index
  fabLift = 116, // lift above WA+Call (2 buttons + gap + breathing room)
}) {
  const [show, setShow] = useState(false);
  const [pct, setPct] = useState(0);
  const [autobotOpen, setAutobotOpen] = useState(false);
  const raf = useRef(0);

  // Smooth scroll% + visibility
  useEffect(() => {
    const onScroll = () => {
      if (raf.current) return;
      raf.current = window.requestAnimationFrame(() => {
        const y = window.scrollY || document.documentElement.scrollTop || 0;
        const h =
          (document.documentElement.scrollHeight || 0) -
          (document.documentElement.clientHeight || 0);
        setShow(y > showAfter);
        setPct(h > 0 ? Math.min(100, Math.max(0, (y / h) * 100)) : 0);
        raf.current = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [showAfter]);

  // Watch CSS var --autobot-open
  useEffect(() => {
    const readVar = () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue("--autobot-open")
        .trim() === "1";
    setAutobotOpen(readVar());

    const obs = new MutationObserver(() => setAutobotOpen(readVar()));
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    });
    return () => obs.disconnect();
  }, []);

  const goTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  // Base: above chat FAB + lifted above WhatsApp/Call stack
  const baseBottom = `calc(1rem + env(safe-area-inset-bottom,0px) + ${
    chatSize + gap + fabLift
  }px)`;

  const bottom =
    mode === "shift" && autobotOpen
      ? `calc(${baseBottom} + ${panelLift}px)`
      : baseBottom;

  const hiddenByAutoBot = mode === "hide" && autobotOpen;

  return (
    <div
      aria-hidden={!show || hiddenByAutoBot}
      className="fixed right-5 transition-opacity duration-200"
      style={{
        bottom,
        zIndex: z,
        opacity: show && !hiddenByAutoBot ? 1 : 0,
        pointerEvents: show && !hiddenByAutoBot ? "auto" : "none",
      }}
    >
      <button
        onClick={goTop}
        aria-label="Back to top"
        title="Back to top"
        className="group relative grid place-items-center rounded-full
                   bg-[#0f1a2e]/90 border border-white/15 shadow-lg
                   hover:bg-[#11203a] focus:outline-none
                   focus-visible:ring-2 focus-visible:ring-cyan-400/50"
        style={{ width: size, height: size }}
      >
        {/* progress ring */}
        <span
          aria-hidden
          style={{
            background: `conic-gradient(#22d3ee ${pct}%, transparent ${pct}%)`,
            borderRadius: 9999,
            padding: 2,
            inset: 0,
            position: "absolute",
          }}
        />
        {/* inner disc */}
        <span
          aria-hidden
          className="absolute rounded-full bg-[#0f1a2e]"
          style={{ inset: 2 }}
        />

        <ChevronUp className="relative z-[1] h-5 w-5 text-cyan-300" />

        {/* hover label */}
        <span
          className="absolute -left-2 -translate-x-full px-2 py-1 text-xs rounded-md
                     bg-black/70 text-slate-200 border border-white/10 opacity-0
                     pointer-events-none transition group-hover:opacity-100"
          style={{ whiteSpace: "nowrap" }}
          aria-hidden
        >
          Top
        </span>
      </button>
    </div>
  );
}
