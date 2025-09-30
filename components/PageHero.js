export default function PageHero({ eyebrow, title, sub }) {
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {eyebrow && <div className="text-xs uppercase tracking-wide text-cyan-300/80">{eyebrow}</div>}
        <h1 className="text-3xl md:text-4xl font-extrabold mt-2">{title}</h1>
        {sub && <p className="text-slate-300 mt-3 max-w-3xl">{sub}</p>}
      </div>
    </section>
  );
}
