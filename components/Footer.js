// components/Footer.jsx
import Link from "next/link";
import { site } from "@/lib/siteConfig";

function SocialLink({ href, label, children }) {
  const disabled = !href || href === "#";
  return (
    <a
      href={disabled ? "#" : href}
      aria-label={label}
      target={disabled ? undefined : "_blank"}
      rel={disabled ? undefined : "noopener noreferrer"}
      className={[
        "inline-flex h-10 w-10 items-center justify-center rounded-xl",
        "border border-white/10 bg-white/[0.02] text-slate-300 transition",
        "hover:bg-white/[0.06] hover:text-cyan-300 hover:border-white/20",
        "focus:outline-none focus:ring-2 focus:ring-white/20",
        disabled ? "opacity-40 pointer-events-none" : "",
      ].join(" ")}
    >
      {children}
    </a>
  );
}

export default function Footer({ className = "" }) {
  const year = new Date().getFullYear();
  const s = site?.socials || {};

  return (
    <footer className={`site-footer mt-12 bg-[#0b1220] border-t border-white/10 ${className}`}>
      <div className="h-[2px] bg-gradient-to-r from-cyan-500/40 via-fuchsia-500/30 to-cyan-500/40" />

      {/* Seamless footer body (no separate card) */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          {/* Left */}
          <div className="space-y-3">
            <div className="text-xl font-extrabold tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-cyan-400">
                Supreme
              </span>{" "}
              <span className="text-slate-100">IT</span>{" "}
              <span className="text-slate-100">Experts</span>
            </div>

            <p className="text-slate-400 max-w-xl">
              Managed IT & Cybersecurity for businesses in Allentown, Macungie & Emmaus — fast, friendly, fixed-fee.
            </p>

            <div className="flex flex-col gap-2 text-sm text-slate-300 sm:flex-row sm:items-center sm:gap-4">
              <a className="hover:text-cyan-300 transition" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-slate-600" />
              <a className="hover:text-cyan-300 transition whitespace-nowrap" href={`tel:${site.phone}`}>
                {site.phone}
              </a>
            </div>

            <div className="text-xs text-slate-500">
              Mon–Fri 8am–6pm • 24/7 Emergency Support
            </div>
          </div>

          {/* Right */}
          <div className="space-y-4 lg:text-right">
            <Link
              href="/get-quote"
              className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold
                         bg-gradient-to-r from-cyan-400/20 via-fuchsia-400/20 to-cyan-400/20
                         border border-white/10 text-slate-100 hover:bg-white/[0.06] transition"
            >
              Get a Free IT Assessment
            </Link>

            <div className="flex flex-wrap gap-2 lg:justify-end">
              <SocialLink href={s.linkedin} label="LinkedIn">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM0 8h5v16H0zM8 8h4.8v2.2h.07c.67-1.27 2.3-2.6 4.73-2.6C21.6 7.6 24 10 24 14.3V24h-5v-8.4c0-2-.04-4.6-2.8-4.6-2.8 0-3.2 2.2-3.2 4.5V24H8z" />
                </svg>
              </SocialLink>
              <SocialLink href={s.facebook} label="Facebook">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M22 12.07C22 6.48 17.52 2 11.93 2 6.34 2 2 6.48 2 12.07c0 4.99 3.66 9.13 8.44 9.93v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.77l-.44 2.9h-2.33V22C18.34 21.2 22 17.06 22 12.07z" />
                </svg>
              </SocialLink>
              <SocialLink href={s.instagram} label="Instagram">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Z" />
                  <path d="M12 7.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5Z" />
                  <circle cx="17.2" cy="6.8" r="1.3" />
                </svg>
              </SocialLink>
              <SocialLink href={s.x} label="X">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M18.244 2H21l-6.86 7.85L22 22h-6.9l-4.86-6.47L4.7 22H3.1l7.52-8.64L2 2h6.9l4.52 6.02L18.244 2z" />
                </svg>
              </SocialLink>
              <SocialLink href={s.tiktok} label="TikTok">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M21 8.5a7.5 7.5 0 0 1-5.2-2.1V16a5.9 5.9 0 1 1-5.9-5.9c.3 0 .7 0 1 .1V13a2.9 2.9 0 1 0 2.1 2.8V2h2a5.5 5.5 0 0 0 5 3.2V8.5z" />
                </svg>
              </SocialLink>
            </div>
          </div>
        </div>

        {/* Bottom row */}
       <div className="mt-8 pt-5 border-t border-white/10 text-center text-xs text-slate-500">
  © {year} {site.name}. All rights reserved.
</div>

      </div>
    </footer>
  );
}
