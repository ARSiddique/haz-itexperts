// components/Header.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/faqs", label: "FAQs" },
  { href: "/areas", label: "Areas we serve" },
  { href: "/contact", label: "Contact" },
  { href: "/gallery", label: "Gallery" },
];

// Reusable brand logo (single asset: /public/logo.png)
function BrandLogo({ size = 28, className = "" }) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <Image
        src="/logo.png"
        alt="Supreme IT Experts"
        width={size}
        height={size}
        priority
        sizes={`${size * 2}px`}
        className="object-contain"
        style={{ width: size, height: size }}
      />
    </span>
  );
}

export default function Header() {
  const pathname = usePathname();
  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-[100] border-b border-white/10 bg-[#0b1220] md:bg-[#0b1220]/70 md:backdrop-blur">
      {/* thin glow line */}
      <div className="h-[2px] bg-gradient-to-r from-cyan-500/50 via-fuchsia-500/40 to-cyan-500/50" />

      {/* content-driven height (no fixed h-16) */}
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between leading-none">
        {/* Brand */}
        <Link href="/" className="shrink-0" aria-label="Go to homepage">
          <BrandLogo size={50} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden xl:flex items-center gap-5">
          {LINKS.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`group relative py-1 text-sm transition-colors ${
                  active ? "text-cyan-300" : "text-slate-300 hover:text-cyan-300"
                }`}
              >
                {l.label}
                <span
                  className={`pointer-events-none absolute left-0 -bottom-1 h-[2px] w-full origin-left bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-cyan-400 transition-transform ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
          <Link
            href="/get-quote"
            className="rounded-lg px-3.5 py-2 text-sm font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
          >
            Get a Free IT Assessment
          </Link>
        </nav>

        {/* Mobile nav (drawer) */}
        <div className="xl:hidden">
          <input id="nav-toggle" type="checkbox" className="peer hidden" />
          <label htmlFor="nav-toggle" aria-label="menu" className="text-slate-200 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
              <path
                fillRule="evenodd"
                d="M3.75 5.25a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75zm0 6a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75zm0 6a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </label>

          {/* overlay */}
          <label
            htmlFor="nav-toggle"
            className="fixed inset-0 z-40 bg-black/50 opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto transition xl:hidden"
          />

          {/* drawer */}
          <div className="fixed right-0 top-0 z-50 h-full w-[78%] max-w-xs bg-[#0e1628] border-l border-white/10 translate-x-full peer-checked:translate-x-0 transition xl:hidden">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-100">
                  <BrandLogo size={26} className="translate-y-[1px]" />
                </span>
                <label htmlFor="nav-toggle" aria-label="close" className="text-slate-200 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path
                      fillRule="evenodd"
                      d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 11-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </label>
              </div>

              <div className="mt-6 grid gap-3">
                {LINKS.map((l) => {
                  const active = isActive(l.href);
                  return (
                    <Link
                      key={l.href}
                      href={l.href}
                      className={`rounded-lg px-3 py-2 transition ${
                        active ? "text-cyan-300 bg-cyan-400/10" : "text-slate-200 hover:bg-white/5 hover:text-cyan-300"
                      }`}
                    >
                      {l.label}
                    </Link>
                  );
                })}
                <Link
                  href="/get-quote"
                  className="mt-2 rounded-lg px-4 py-3 text-sm font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
                >
                  Get a Free IT Assessment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
