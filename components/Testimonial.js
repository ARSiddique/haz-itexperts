export default function Testimonial({ quote, name, role }) {
  return (
    <figure className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <blockquote className="text-slate-200">“{quote}”</blockquote>
      <figcaption className="mt-3 text-sm text-slate-400">— {name}, {role}</figcaption>
    </figure>
  );
}
