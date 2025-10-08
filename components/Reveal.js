// components/Reveal.js
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Reveal({ children, className = "", dir = "up" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // initial state
    el.style.opacity = "0";
    const y = dir === "up" ? 16 : dir === "down" ? -16 : 0;
    const x = dir === "left" ? 16 : dir === "right" ? -16 : 0;
    if (reduce) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    } else {
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        gsap.to(el, { opacity: 1, x: 0, y: 0, duration: 0.42, ease: "power2.out" });
        io.disconnect();
      },
      { threshold: 0.16 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [dir]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
