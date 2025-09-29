"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/siteConfig";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/managed-it", label: "Services" },
  { href: "/#about", label: "About" },
  { href: "/#faqs", label: "FAQs" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/#areas", label: "Areas we serve" },
  { href: "/#contact", label: "Contact" },
];

export default function Header(){
  const [solid,setSolid]=useState(false);
  const [open,setOpen]=useState(false);
  useEffect(()=>{
    const f=()=>setSolid(window.scrollY>8);
    f(); window.addEventListener("scroll",f);
    return ()=>window.removeEventListener("scroll",f);
  },[]);
  return (
    <header className={`sticky top-0 z-50 transition border-b border-white/10 ${solid? "bg-[#0b1220cc] backdrop-blur" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl"> {site.name} </Link>

        {/* desktop */}
        <nav className="hidden lg:flex items-center gap-6 text-sm">
          {links.map(l=>(
            <Link key={l.href} href={l.href} className="text-slate-300 hover:text-cyan-300">{l.label}</Link>
          ))}
          <Link
            href="/assessment"
            className="rounded-lg px-5 py-3 font-semibold bg-cyan-400/10 text-cyan-300 border border-cyan-300/30 hover:bg-cyan-400/20"
          >
            {site.cta}
          </Link>
        </nav>

        {/* mobile */}
        <button className="lg:hidden" aria-label="menu" onClick={()=>setOpen(true)}><Menu/></button>
        {open && (
          <div className="fixed inset-0 bg-black/50" onClick={()=>setOpen(false)}>
            <div className="ml-auto w-[78%] max-w-xs h-full bg-[#0e1628] p-6" onClick={(e)=>e.stopPropagation()}>
              <div className="flex items-center justify-between">
                <span className="font-semibold">{site.name}</span>
                <button onClick={()=>setOpen(false)} aria-label="close"><X/></button>
              </div>
              <div className="mt-6 grid gap-4 text-sm">
                {links.map(l=>(
                  <Link key={l.href} href={l.href} onClick={()=>setOpen(false)} className="text-slate-300 hover:text-cyan-300">{l.label}</Link>
                ))}
                <Link
                  href="/assessment"
                  onClick={()=>setOpen(false)}
                  className="rounded-lg px-5 py-3 font-semibold bg-cyan-400/10 text-cyan-300 border border-cyan-300/30 text-center"
                >
                  {site.cta}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
