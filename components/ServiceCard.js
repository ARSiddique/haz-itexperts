export default function ServiceCard({ icon:Icon, title, children, href }){
  return (
    <div className="p-6 rounded-2xl bg-[var(--surface)]/70 border border-white/10 hover:border-cyan-300/30 transition">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-cyan-300" />
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <p className="text-sm text-slate-300 mt-2">{children}</p>
      {href && <a href={href} className="text-cyan-300 text-sm mt-3 inline-block underline">Explore</a>}
    </div>
  );
}
