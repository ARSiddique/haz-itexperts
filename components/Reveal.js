"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Reveal({ children, y = 24, delay = 0, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        gsap.fromTo(el, { y, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay });
        obs.disconnect();
      }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [y, delay]);
  return <div ref={ref} className={className}>{children}</div>;
}
