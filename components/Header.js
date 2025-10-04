// app/components/Header.jsx
import Link from "next/link";

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

function Brand() {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-cyan-400 font-extrabold tracking-tight">
        Supreme
      </span>
      <span className="font-extrabold text-slate-100">IT</span>
      <span className="font-extrabold text-slate-100">Experts</span>
      <span className="ml-1 h-1.5 w-1.5 rounded-full bg-cyan-400/80 shadow-[0_0_12px_2px_rgba(34,211,238,0.45)]" />
    </span>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#0b1220cc] backdrop-blur border-b border-white/10">
      <div className="h-[2px] bg-gradient-to-r from-cyan-500/50 via-fuchsia-500/40 to-cyan-500/50" />
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" prefetch className="text-xl">
          <Brand />
        </Link>

        <nav className="hidden xl:flex items-center gap-6">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              prefetch
              className="relative py-2 text-sm text-slate-300 hover:text-cyan-300 transition-colors group"
            >
              {l.label}
              <span className="absolute left-0 -bottom-1 h-[2px] w-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-cyan-400" />
            </Link>
          ))}
          <Link
            href="/get-quote"
            prefetch
            className="rounded-lg px-4 py-2 text-sm font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 shadow-[0_0_0_0_rgba(0,0,0,0)] hover:shadow-[0_0_24px_-6px_rgba(34,211,238,0.45)] transition-all duration-300"
          >
            Get Quote
          </Link>
        </nav>

        <div className="xl:hidden">
          <input id="nav-toggle" type="checkbox" className="peer hidden" />
          <label htmlFor="nav-toggle" aria-label="menu" className="text-slate-200 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
              <path fillRule="evenodd" d="M3.75 5.25a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75zm0 6a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75zm0 6a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z" clipRule="evenodd" />
            </svg>
          </label>

          <label
            htmlFor="nav-toggle"
            className="fixed inset-0 bg-black/50 backdrop-blur-sm opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto transition xl:hidden"
          />

          <div className="fixed right-0 top-0 h-full w-[78%] max-w-xs bg-[#0e1628] border-l border-white/10 translate-x-full peer-checked:translate-x-0 transition will-change-transform xl:hidden">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-100">
                  <Brand />
                </span>
                <label htmlFor="nav-toggle" aria-label="close" className="text-slate-300 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 11-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                  </svg>
                </label>
              </div>

              <div className="mt-6 grid gap-3">
                {LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="rounded-lg px-3 py-2 text-slate-200 hover:bg-white/5 hover:text-cyan-300 transition"
                  >
                    {l.label}
                  </Link>
                ))}
                <Link
                  href="/get-quote"
                  className="mt-2 rounded-lg px-4 py-3 text-sm font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
                >
                  Get Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
