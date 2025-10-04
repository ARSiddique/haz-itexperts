// components/PageHero.jsx
export default function PageHero({ eyebrow, title, sub, compact = false, className = "" }) {
  // compact=true gives a shorter hero (if you ever want it)
  const pad = compact ? "pt-10 pb-8 md:pt-12 md:pb-10" : "pt-16 pb-12 md:pt-20 md:pb-16";
  return (
    <section className={`relative ${pad} ${className}`}>
      <div className="max-w-6xl mx-auto px-4">
        {eyebrow && (
          <div className="text-xs uppercase tracking-wide text-cyan-300/80">
            {eyebrow}
          </div>
        )}
        <h1 className="text-3xl md:text-4xl font-extrabold mt-2">{title}</h1>
        {sub && <p className="text-slate-300 mt-3 max-w-3xl">{sub}</p>}
      </div>
    </section>
  );
}
