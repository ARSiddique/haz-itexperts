"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HomeFX() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // reveal up/down
      const els = gsap.utils.toArray("[data-reveal]");
      els.forEach((el) => {
        const dir = el.getAttribute("data-reveal"); // 'up' | 'down'
        const fromY = dir === "down" ? -24 : 24;
        gsap.set(el, { y: fromY, opacity: 0 });
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          end: "bottom 15%",
          onEnter: () => gsap.to(el, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }),
          onLeave: () => gsap.to(el, { y: -fromY, opacity: 0, duration: 0.35, ease: "power3.in" }),
          onEnterBack: () => gsap.to(el, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }),
          onLeaveBack: () => gsap.to(el, { y: fromY, opacity: 0, duration: 0.35, ease: "power3.in" }),
        });
      });

      // section drift
      gsap.utils.toArray(".section-enter").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 18, opacity: 0.98 },
          { y: -10, opacity: 1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } }
        );
      });

      // parallax
      gsap.utils.toArray("[data-parallax='y']").forEach((el) => {
        const speed = Number(el.getAttribute("data-speed") || 0.15);
        gsap.to(el, { yPercent: 10 * speed, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      });

      // divider wipes
      document.querySelectorAll(".section-divider").forEach((bar) => {
        ScrollTrigger.create({
          trigger: bar,
          start: "top 92%",
          end: "bottom 82%",
          onEnter: () => gsap.fromTo(bar, { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.6 }),
          onEnterBack: () => gsap.fromTo(bar, { scaleX: 0, transformOrigin: "right center" }, { scaleX: 1, duration: 0.6 }),
        });
      });

      // hero entrance
      const hero = document.querySelector("#hero");
      if (hero) {
        gsap.from(hero.querySelectorAll(".hero-fx"), { y: 24, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.06 });
      }
    });
    return () => ctx.revert();
  }, []);

  return null; // no UI — just effects
}
