import Link from "next/link";
import { site } from "@/lib/siteConfig";

export default function Footer(){
  const s = site.socials || {};
  return (
    <footer className="mt-24 border-top">
      <div className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-4 gap-8 text-sm border-t border-white/10">
        <div>
          <div className="text-lg font-semibold">{site.name}</div>
          <p className="text-slate-400 mt-2">{site.tagline}</p>
          <div className="mt-4 text-slate-300 space-y-1">
            <div>{site.email}</div>
            <div>{site.phone}</div>
            <div>{site.address}</div>
          </div>
          <div className="mt-4 text-slate-400 flex flex-wrap gap-3">
            <a href={s.linkedin || "#"} className="hover:text-cyan-300">LinkedIn</a>
            <a href={s.x || "#"} className="hover:text-cyan-300">X</a>
            <a href={s.facebook || "#"} className="hover:text-cyan-300">Facebook</a>
            <a href={s.instagram || "#"} className="hover:text-cyan-300">Instagram</a>
            <a href={s.tiktok || "#"} className="hover:text-cyan-300">TikTok</a>
          </div>
        </div>

        <div>
          <div className="font-semibold">Company</div>
          <ul className="mt-3 space-y-2 text-slate-300">
            <li><Link href="/about" className="hover:text-cyan-300">About</Link></li>
            <li><Link href="/gallery" className="hover:text-cyan-300">Gallery</Link></li>
            <li><Link href="/contact" className="hover:text-cyan-300">Contact</Link></li>
          </ul>
        </div>

        <div>
          <div className="font-semibold">Services</div>
          <ul className="mt-3 space-y-2 text-slate-300">
            <li><Link href="/services#managed-it" className="hover:text-cyan-300">Managed IT</Link></li>
            <li><Link href="/services#security" className="hover:text-cyan-300">Cybersecurity</Link></li>
            <li><Link href="/services#cloud" className="hover:text-cyan-300">Cloud</Link></li>
            <li><Link href="/services#vcio" className="hover:text-cyan-300">vCIO</Link></li>
          </ul>
        </div>

        <div>
          <div className="font-semibold">Visit us</div>
          <p className="text-slate-300 mt-2">{site.address}</p>
          <Link href="/get-quote" className="btn-primary mt-3 inline-block rounded-lg px-5 py-3 font-semibold bg-cyan-400/10 text-cyan-300 border border-cyan-300/30 hover:bg-cyan-400/20">
            Get Quote
          </Link>
        </div>
      </div>
      <div className="text-center text-xs text-slate-500 pb-8">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </div>
    </footer>
  );
}
