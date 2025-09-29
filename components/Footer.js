import Link from "next/link";
import { site } from "@/lib/siteConfig";

export default function Footer(){
  const socials = site.socials || {};
  return (
    <footer className="mt-24 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="text-lg font-semibold">{site.name}</div>
          <p className="text-slate-400 mt-2">{site.tagline}</p>
          <div className="mt-4 text-slate-300 space-y-1">
            <div>{site.email}</div><div>{site.phone}</div><div>Lahore, Pakistan</div>
          </div>
        </div>
        <div>
          <div className="font-semibold">Company</div>
          <ul className="mt-3 space-y-2 text-slate-300">
            <li><Link href="/#about" className="hover:text-cyan-300">About</Link></li>
            <li><Link href="/#testimonials" className="hover:text-cyan-300">Testimonials</Link></li>
            <li><Link href="/#areas" className="hover:text-cyan-300">Areas we serve</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold">Services</div>
          <ul className="mt-3 space-y-2 text-slate-300">
            <li><Link href="/managed-it" className="hover:text-cyan-300">Managed IT</Link></li>
            <li><Link href="/cybersecurity" className="hover:text-cyan-300">Cybersecurity</Link></li>
            <li><Link href="/cloud" className="hover:text-cyan-300">Cloud & 365/Workspace</Link></li>
            <li><Link href="/pricing" className="hover:text-cyan-300">Pricing</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold">Get started</div>
          <p className="text-slate-400 mt-2">Book a 30-min assessment and get a quick plan.</p>
          <Link
            href="/assessment"
            className="mt-3 inline-block rounded-lg px-5 py-3 font-semibold bg-cyan-400/10 text-cyan-300 border border-cyan-300/30 hover:bg-cyan-400/20"
          >
            {site.cta}
          </Link>
          <div className="mt-4 text-slate-400">
            <a href={socials.linkedin || "#"} className="hover:text-cyan-300 mr-3">LinkedIn</a>
            <a href={socials.x || "#"} className="hover:text-cyan-300 mr-3">X</a>
            <a href={socials.facebook || "#"} className="hover:text-cyan-300">Facebook</a>
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-slate-500 pb-8">© {new Date().getFullYear()} {site.name}. All rights reserved.</div>
    </footer>
  );
}
