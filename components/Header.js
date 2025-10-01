"use client";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/siteConfig";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const f = () => setSolid(window.scrollY > 8);
    f();
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);

  const links = useMemo(
    () => [
      { href: "/",         label: "Home",           match: (p) => p === "/" },
      { href: "/about",    label: "About",          match: (p) => p.startsWith("/about") },
      { href: "/services", label: "Services",       match: (p) => p.startsWith("/services") },
      { href: "/blog",     label: "Blog",           match: (p) => p.startsWith("/blog") }, // ✅ NEW
      { href: "/faqs",     label: "FAQs",           match: (p) => p.startsWith("/faqs") },
      { href: "/areas",    label: "Areas we serve", match: (p) => p.startsWith("/areas") },
      { href: "/contact",  label: "Contact",        match: (p) => p.startsWith("/contact") },
      { href: "/gallery",  label: "Gallery",        match: (p) => p.startsWith("/gallery") },
    ],
    []
  );

  const baseLink =
    "relative py-2 text-sm text-slate-300 hover:text-cyan-300 transition-colors";
  const underline =
    "absolute left-0 -bottom-1 h-[2px] w-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform";
  const activeUnderline =
    "bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-cyan-400";

  return (
    <header
      className={`sticky top-0 z-50 transition ${
        solid ? "bg-[#0b1220cc] backdrop-blur border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="h-[2px] bg-gradient-to-r from-cyan-500/50 via-fuchsia-500/40 to-cyan-500/50" />
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-extrabold text-xl tracking-tight">
          {site.name}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden xl:flex items-center gap-6">
          {links.map((l) => {
            const isActive = l.match(pathname);
            return (
              <Link
                key={l.href}
                href={l.href}
                prefetch
                aria-current={isActive ? "page" : undefined}
                className={`group ${baseLink} ${isActive ? "text-cyan-300" : ""}`}
              >
                {l.label}
                <span className={`${underline} ${activeUnderline} ${isActive ? "scale-x-100" : ""}`} />
              </Link>
            );
          })}

          <Link
            href="/get-quote"
            className="rounded-lg px-4 py-2 text-sm font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 shadow-[0_0_0_0_rgba(0,0,0,0)] hover:shadow-[0_0_24px_-6px_rgba(34,211,238,0.45)] transition-all duration-300"
          >
            Get Quote
          </Link>
        </nav>

        {/* Mobile button */}
        <button
          className="xl:hidden text-slate-200"
          aria-label="menu"
          onClick={() => setOpen(true)}
        >
          <Menu />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm xl:hidden"
          onClick={() => setOpen(false)}
        >
          <div
            className="ml-auto h-full w-[78%] max-w-xs bg-[#0e1628] border-l border-white/10 p-6 animate-[slideIn_.25s_ease]"
            onClick={(e) => e.stopPropagation()}
            style={{
              animationName:
                "@keyframes slideIn{from{transform:translateX(12%);opacity:.6}to{transform:translateX(0);opacity:1}}",
            }}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold">{site.name}</span>
              <button onClick={() => setOpen(false)} aria-label="close">
                <X />
              </button>
            </div>

            <div className="mt-6 grid gap-3">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-slate-200 hover:bg-white/5 hover:text-cyan-300 transition"
                >
                  {l.label}
                </Link>
              ))}

              <Link
                href="/get-quote"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-lg px-4 py-3 text-sm font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
              >
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
