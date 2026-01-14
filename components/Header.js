// components/Header.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { site } from "@/lib/siteConfig";

const US_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  // { href: "/blog", label: "Blog" },
  { href: "/faqs", label: "FAQs" },
  { href: "/areas", label: "Areas we serve" },
  { href: "/contact", label: "Contact" },
  { href: "/gallery", label: "Gallery" },
];

// ✅ Keep UK links in code, but we will hide them when rollout is OFF
const UK_LINKS = [
  { href: "/uk", label: "Home" },
  { href: "/uk/about", label: "About" },
  { href: "/uk/services", label: "Services" },
  { href: "/uk/faqs", label: "FAQs" },
  { href: "/uk/areas", label: "Areas" },
  { href: "/uk/contact", label: "Contact" },
];

// Brand logo component (can show word-mark text beside the icon)
function BrandLogo({ size = 28, className = "", withText = false }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Image
        src="/logo.png"
        alt="Supreme IT Experts logo"
        width={size}
        height={size}
        priority
        sizes={`${size * 2}px`}
        className="object-contain"
        style={{ width: size, height: size }}
      />
      {withText && (
        <span className="hidden sm:inline text-[17px] font-semibold tracking-tight text-slate-100">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-cyan-400">
            Supreme
          </span>{" "}
          IT Experts
        </span>
      )}
    </span>
  );
}

function isUkRolloutOn() {
  const v = String(process.env.NEXT_PUBLIC_UK_ROLLOUT || "").toLowerCase().trim();
  return v === "on" || v === "true" || v === "1";
}

// E.164-ish for tel links
const cleanTel = (p) => {
  const s = String(p || "").trim();
  if (!s) return "";
  const cleaned = s.replace(/[^\d+]/g, "").replace(/\++/g, "+");
  if (!cleaned) return "";
  return cleaned.startsWith("+") ? cleaned : `+${cleaned}`;
};

export default function Header({ className = "" }) {
  const pathname = usePathname();

  // ✅ Master switch
  const UK_ENABLED = isUkRolloutOn();

  // ✅ Only treat routes as UK when UK rollout is ON
  const routeIsUk = pathname === "/uk" || pathname.startsWith("/uk/");
  const isUk = UK_ENABLED && routeIsUk;

  const LINKS = isUk ? UK_LINKS : US_LINKS;

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  // ✅ When user is on UK pages, logo should go to /uk (only when UK enabled)
  const brandHref = isUk ? "/uk" : "/";

  // ✅ CTA changes per region
  const ctaHref = isUk ? "/uk/contact" : "/get-quote";
  const ctaText = isUk ? "Book a Call" : "Get a Free IT Assessment";

  // ✅ Region switch (ONLY show if UK rollout is enabled)
  const regionSwitchHref = isUk ? "/" : "/uk";
  const regionSwitchText = isUk ? "US" : "UK";
  const regionSwitchTitle = isUk ? "Switch to United States" : "Switch to United Kingdom";

  // ✅ Phone CTA (always visible in header)
  const phoneDisplay = site?.phone || "+1 610-500-9209";
  const phoneE164 = cleanTel(site?.phoneTel?.replace("tel:", "") || phoneDisplay);
  const phoneHref = phoneE164 ? `tel:${phoneE164}` : "tel:+16105009209";

  return (
    <header
      className={`site-header sticky top-0 z-[100] border-b border-white/10 bg-[#0b1220] md:bg-[#0b1220]/70 md:backdrop-blur ${className}`}
    >
      {/* thin glow line */}
      <div className="h-[2px] bg-gradient-to-r from-cyan-500/50 via-fuchsia-500/40 to-cyan-500/50" />

      {/* content-driven height */}
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between leading-none">
        {/* Brand */}
        <Link
          href={brandHref}
          className="shrink-0"
          aria-label={isUk ? "Go to UK homepage" : "Go to US homepage"}
        >
          <BrandLogo size={40} withText />
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

          {/* ✅ UK Switch (only if UK_ENABLED) */}
          {UK_ENABLED && (
            <Link
              href={regionSwitchHref}
              className="rounded-lg px-3 py-2 text-sm font-semibold border border-white/10 bg-white/5 hover:bg-white/10 text-slate-100 transition"
              title={regionSwitchTitle}
              aria-label={regionSwitchTitle}
            >
              {regionSwitchText}
            </Link>
          )}

          {/* ✅ Phone CTA (conversion) */}
          <a
            href={phoneHref}
            className="rounded-lg px-3 py-2 text-sm font-semibold border border-white/10 bg-white/5 hover:bg-white/10 text-slate-100 transition"
            aria-label={`Call ${phoneDisplay}`}
            title={`Call ${phoneDisplay}`}
          >
            Call {phoneDisplay}
          </a>

          {/* Primary CTA */}
          <Link
            href={ctaHref}
            className="rounded-lg px-3.5 py-2 text-sm font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
          >
            {ctaText}
          </Link>
        </nav>

        {/* Mobile nav (drawer) */}
        <div className="xl:hidden">
          <input id="nav-toggle" type="checkbox" className="peer hidden" />
          <label htmlFor="nav-toggle" aria-label="Open menu" className="text-slate-200 cursor-pointer">
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
                <Link href={brandHref} className="font-semibold text-slate-100" aria-label="Go to homepage">
                  <BrandLogo size={26} className="translate-y-[1px]" />
                </Link>

                <label htmlFor="nav-toggle" aria-label="Close menu" className="text-slate-200 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path
                      fillRule="evenodd"
                      d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 11-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </label>
              </div>

              {/* ✅ Primary conversion actions (mobile) */}
              <div className="mt-4 grid gap-2">
                <a
                  href={phoneHref}
                  className="rounded-lg px-4 py-3 text-sm font-semibold border border-white/10 bg-white/5 hover:bg-white/10 text-slate-100 transition text-center"
                  aria-label={`Call ${phoneDisplay}`}
                >
                  Call {phoneDisplay}
                </a>

                <Link
                  href={ctaHref}
                  className="rounded-lg px-4 py-3 text-sm font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition text-center"
                >
                  {ctaText}
                </Link>
              </div>

              {/* ✅ Region switch buttons (mobile) — only if UK enabled */}
              {UK_ENABLED && (
                <div className="mt-4 flex gap-2">
                  <Link
                    href={regionSwitchHref}
                    className="rounded-lg px-3 py-2 text-sm font-semibold border border-white/10 bg-white/5 hover:bg-white/10 text-slate-100 transition"
                    aria-label={regionSwitchTitle}
                  >
                    {isUk ? "Switch to US" : "Switch to UK"}
                  </Link>
                </div>
              )}

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
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
