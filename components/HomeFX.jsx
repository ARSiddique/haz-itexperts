// components/HomeFX.jsx
"use client";
import { useEffect } from "react";

export default function HomeFX() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---- once-only reveal for [data-reveal]
    const els = Array.from(document.querySelectorAll("[data-reveal]"))
      .filter((el) => el instanceof HTMLElement && !el.dataset.revealed);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const el = e.target;
          if (!e.isIntersecting || el.dataset.revealed === "1") return;
          el.dataset.revealed = "1";
          if (reduce) {
            el.style.opacity = "1";
            el.style.transform = "none";
            return;
          }
          const dir = el.getAttribute("data-reveal") || "up";
          const y = dir === "up" ? 16 : dir === "down" ? -16 : 0;
          const x = dir === "left" ? 16 : dir === "right" ? -16 : 0;
          el.style.transition = "opacity .42s ease, transform .42s ease";
          el.style.opacity = "1";
          el.style.transform = "translate3d(0,0,0)";
        });
      },
      { threshold: 0.16 }
    );

    els.forEach((el) => io.observe(el));

    // ---- cheap parallax for [data-parallax]
    const para = Array.from(document.querySelectorAll("[data-parallax]"))
      .filter((el) => el instanceof HTMLElement);

    let raf = 0;
    const tick = () => {
      raf = 0;
      if (reduce) return;
      const vpH = window.innerHeight;
      para.forEach((el) => {
        const speed = parseFloat(el.getAttribute("data-speed") || "0.12");
        const r = el.getBoundingClientRect();
        const mid = r.top + r.height / 2 - vpH / 2;
        const t = Math.max(-1, Math.min(1, mid / (vpH / 2)));
        el.style.transform = `translate3d(0, ${t * speed * 60}px, 0)`;
      });
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null; // ⬅️ IMPORTANT: koi layout/markup nahi
}
