export default function LogoWall(){
  return (
    <section className="mt-16 bg-white/5">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h3 className="text-sm uppercase tracking-wide text-slate-400">Trusted by teams like yours</h3>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-6 opacity-80">
          <div className="h-10 rounded bg-white/10" />
          <div className="h-10 rounded bg-white/10" />
          <div className="h-10 rounded bg-white/10" />
          <div className="h-10 rounded bg-white/10" />
        </div>
      </div>
    </section>
  );
}
