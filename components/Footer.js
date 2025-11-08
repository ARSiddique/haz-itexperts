// components/Footer.jsx
import Link from "next/link";
import { site } from "@/lib/siteConfig";

function SocialLink({ href = "#", label, variant = "default", children }) {
  const brand = {
    linkedin: "hover:text-[#0A66C2] hover:border-[#0A66C2] hover:bg-[#0A66C2]/10",
    facebook: "hover:text-[#1877F2] hover:border-[#1877F2] hover:bg-[#1877F2]/10",
    instagram: "hover:text-[#E1306C] hover:border-[#E1306C] hover:bg-[#E1306C]/10",
    x: "hover:text-[#8AB4F8] hover:border-[#8AB4F8] hover:bg-[#8AB4F8]/10",
    tiktok: "hover:text-[#25F4EE] hover:border-[#25F4EE] hover:bg-[#25F4EE]/10",
    default: "hover:text-cyan-300 hover:border-cyan-300/40 hover:bg-white/5",
  }[variant] || "hover:text-cyan-300 hover:border-cyan-300/40 hover:bg-white/5";

  return (
    <a
      href={href || "#"}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        "inline-flex h-9 w-9 items-center justify-center rounded-lg",
        "border border-white/10 text-slate-300 transition",
        "focus:outline-none focus:ring-2 focus:ring-white/20",
        brand,
      ].join(" ")}
    >
      {children}
    </a>
  );
}

function LabeledRow({ label, children, icon }) {
  return (
    <div className="flex items-start gap-3.5 leading-relaxed">
      <div className="mt-1 shrink-0">{icon}</div>
      <div className="space-y-0.5">
        <div className="text-[10px] font-medium tracking-wider text-slate-400">{label}</div>
        <div className="text-slate-200">{children}</div>
      </div>
    </div>
  );
}

export default function Footer({ className = "" }) {
  const year = new Date().getFullYear();
  const s = site?.socials || {};

  return (
    <footer className={`site-footer mt-24 bg-[#0b1220] border-t border-white/10 ${className}`}>
      <div className="h-[2px] bg-gradient-to-r from-cyan-500/50 via-fuchsia-500/40 to-cyan-500/50" />

      <div className="max-w-6xl mx-auto px-4 py-14 grid gap-y-12 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
        {/* Brand + Contact */}
        <div className="space-y-6 md:col-span-2 lg:col-span-1">
          <div className="text-2xl font-extrabold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-cyan-400">Supreme</span>{" "}
            <span className="text-slate-100">IT</span>{" "}
            <span className="text-slate-100">Experts</span>
            <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-cyan-400/80 align-middle shadow-[0_0_12px_2px_rgba(34,211,238,0.45)]" />
          </div>

          <p className="text-slate-400 max-w-md">{site.tagline}</p>

          <div className="space-y-5">
            <LabeledRow label="EMAIL" icon={<svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="currentColor"><path d="M2 6.75A2.75 2.75 0 0 1 4.75 4h14.5A2.75 2.75 0 0 1 22 6.75v10.5A2.75 2.75 0 0 1 19.25 20H4.75A2.75 2.75 0 0 1 2 17.25V6.75Zm2.6-.25 7.03 4.39c.22.14.52.14.74 0L19.4 6.5H4.6Z"/></svg>}>
              {site.email}
            </LabeledRow>
            <LabeledRow label="PHONE" icon={<svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C11.85 21 3 12.15 3 1a1 1 0 0 1 1-1h3.49a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.24 1.02l-2.2 2.2Z"/></svg>}>
              {site.phone}
            </LabeledRow>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-1">
            <SocialLink href={s.linkedin} label="LinkedIn" variant="linkedin">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM0 8h5v16H0zM8 8h4.8v2.2h.07c.67-1.27 2.3-2.6 4.73-2.6C21.6 7.6 24 10 24 14.3V24h-5v-8.4c0-2-.04-4.6-2.8-4.6-2.8 0-3.2 2.2-3.2 4.5V24H8z"/></svg>
            </SocialLink>
            <SocialLink href={s.facebook} label="Facebook" variant="facebook">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M22 12.07C22 6.48 17.52 2 11.93 2 6.34 2 2 6.48 2 12.07c0 4.99 3.66 9.13 8.44 9.93v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.77l-.44 2.9h-2.33V22C18.34 21.2 22 17.06 22 12.07z"/></svg>
            </SocialLink>
            <SocialLink href={s.instagram} label="Instagram" variant="instagram">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Z" />
                <path d="M12 7.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5Z" />
                <circle cx="17.2" cy="6.8" r="1.3" />
              </svg>
            </SocialLink>
            <SocialLink href={s.x} label="X" variant="x">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M18.244 2H21l-6.86 7.85L22 22h-6.9l-4.86-6.47L4.7 22H3.1l7.52-8.64L2 2h6.9l4.52 6.02L18.244 2z"/></svg>
            </SocialLink>
            <SocialLink href={s.tiktok} label="TikTok" variant="tiktok">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M21 8.5a7.5 7.5 0 0 1-5.2-2.1V16a5.9 5.9 0 1 1-5.9-5.9c.3 0 .7 0 1 .1V13a2.9 2.9 0 1 0 2.1 2.8V2h2a5.5 5.5 0 0 0 5 3.2V8.5z"/></svg>
            </SocialLink>
          </div>

          <div className="text-xs text-slate-500 pt-2">
            Business Hours: Mon–Fri 8am–6pm • 24/7 Emergency Support
          </div>
        </div>

        {/* Trust & Legal */}
        <div>
          <div className="font-semibold text-slate-100 mb-3">Trust & Legal</div>
          <ul className="space-y-2.5 text-slate-300">
            <li><Link href="/privacy" className="hover:text-cyan-300">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-cyan-300">Terms of Service</Link></li>
            <li><Link href="/sla" className="hover:text-cyan-300">Service Level Agreement</Link></li>
            <li><Link href="/status" className="hover:text-cyan-300">System Status</Link></li>
            <li><span className="text-slate-400">HIPAA/PCI Guidance Available</span></li>
          </ul>
        </div>

        {/* Areas */}
        <div>
          <div className="font-semibold text-slate-100 mb-3">Areas We Serve</div>
          <ul className="space-y-2 text-slate-300 text-sm">
            <li><Link href="/areas" className="hover:text-cyan-300">Areas we serve</Link></li>
            <li><Link href="/areas#allentown" className="hover:text-cyan-300">Allentown, PA</Link></li>
            <li><Link href="/areas#macungie"  className="hover:text-cyan-300">Macungie, PA</Link></li>
            <li><Link href="/areas#emmaus"    className="hover:text-cyan-300">Emmaus, PA</Link></li>
            <li><Link href="/areas" className="hover:text-cyan-300">See all areas</Link></li>
          </ul>
          <Link
            href="/get-quote"
            className="mt-4 inline-block rounded-lg px-5 py-3 font-semibold bg-cyan-400/10 text-cyan-300 border border-cyan-300/30 hover:bg-cyan-400/20"
          >
            Get Quote
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-6 text-xs flex flex-col md:flex-row items-center justify-between gap-3 text-slate-500">
          <div>© {year} {site.name}. All rights reserved.</div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-slate-400">Response time: <span className="text-slate-300">~15 min avg</span></span>
            <span className="h-1 w-1 rounded-full bg-slate-600" />
            <span className="text-slate-400">Emergency Hotline: <span className="text-slate-300">{site.phone}</span></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
