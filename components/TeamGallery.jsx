// components/TeamGallery.jsx
import Image from "next/image";

/**
 * Props:
 *  - hero: string (src)
 *  - thumbs: string[] (3–6 images)
 *  - heroHeight?: "h-64" | "h-72" | "h-80"
 *  - thumbHeight?: "h-36" | "h-40" | "h-44"
 *  - className?: string
 */
export default function TeamGallery({
  hero,
  thumbs = [],
  heroHeight = "h-80",          // bigger hero
  thumbHeight = "h-40",         // bigger thumbs
  className = "",
}) {
  return (
    <div className={`grid gap-4 ${className}`}>
      {/* HERO */}
      <div className={`relative w-full ${heroHeight} rounded-2xl overflow-hidden border border-white/10`}>
        <Image
          src={hero}
          alt="Team hero collage"
          fill
          priority
          className="object-cover object-center transition-transform duration-500 will-change-transform hover:scale-[1.02]"
        />
      </div>

      {/* THUMB GRID (3 up on lg, 2 up on md, 1 up on mobile) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {thumbs.slice(0, 6).map((src, i) => (
          <div key={i} className={`relative w-full ${thumbHeight} rounded-2xl overflow-hidden border border-white/10`}>
            <Image
              src={src}
              alt={`Team thumb ${i + 1}`}
              fill
              className="object-cover object-center transition-transform duration-500 will-change-transform hover:scale-[1.03]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
