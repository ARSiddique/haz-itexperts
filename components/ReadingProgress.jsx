"use client";
import { useEffect, useState } from "react";

export default function ReadingProgress({ targetId }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const onScroll = () => {
      const total = el.scrollHeight - el.clientHeight;
      const scrolled = window.scrollY - el.offsetTop;
      const p = Math.max(0, Math.min(1, scrolled / total));
      setPct(p * 100);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [targetId]);
  return (
    <div className="sticky top-12 z-20 w-full h-1 bg-white/5">
      <div className="h-full bg-cyan-400" style={{ width: `${pct}%` }} />
    </div>
  );
}
