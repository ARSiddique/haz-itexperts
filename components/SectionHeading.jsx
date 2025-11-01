export default function SectionHeading({ icon: Icon, title, sub }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-5 w-5 text-cyan-300" />}
          <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">{title}</div>
        </div>
        {sub && <h2 className="text-xl font-semibold mt-1">{sub}</h2>}
      </div>
      <div className="h-px w-24 md:w-40 bg-gradient-to-r from-cyan-500/40 to-fuchsia-500/40 rounded-full" />
    </div>
  );
}
