"use client";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

const images = [
  "/placeholder1.jpg","/placeholder2.jpg","/placeholder3.jpg",
  "/placeholder4.jpg","/placeholder5.jpg","/placeholder6.jpg",
];

export default function GalleryPage(){
  return (
    <>
      <PageHero eyebrow="Gallery" title="A peek into our work & stack"
        sub="Racks, networks, migrations, dashboards — replace these with your real photos later."/>
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((src,i)=>(
            <Reveal key={i}>
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <div className="h-40 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20" />
                {/* real image later: <img src={src} alt="" className="h-40 w-full object-cover" /> */}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
