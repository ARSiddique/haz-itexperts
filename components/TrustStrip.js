export default function TrustStrip() {
  return (
    <section className="mt-20 bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12 text-slate-200">
        <h3 className="text-sm uppercase tracking-wide text-slate-400">Trusted by</h3>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-6 opacity-80">
          <div className="h-10 rounded bg-slate-800" />
          <div className="h-10 rounded bg-slate-800" />
          <div className="h-10 rounded bg-slate-800" />
          <div className="h-10 rounded bg-slate-800" />
        </div>
        <p className="mt-6 text-xs text-slate-400">
          Replace with client logos, Google reviews, awards/badges.
        </p>
      </div>
    </section>
  );
}
