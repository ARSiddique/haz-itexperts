export default function SectionTitle({eyebrow, title, sub}){
  return (
    <div className="max-w-2xl">
      {eyebrow && <div className="text-xs uppercase tracking-wide text-cyan-300/80">{eyebrow}</div>}
      <h2 className="text-2xl font-semibold mt-1">{title}</h2>
      {sub && <p className="text-slate-300 mt-2 text-sm">{sub}</p>}
    </div>
  );
}
