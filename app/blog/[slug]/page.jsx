import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { POSTS } from "@/lib/blogData";

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const p = POSTS.find((x) => x.slug === params.slug);
  if (!p) return {};
  return {
    title: `${p.title} — Blog`,
    description: p.excerpt,
    openGraph: { images: [p.cover] },
  };
}

export default function BlogPost({ params }) {
  const p = POSTS.find((x) => x.slug === params.slug);
  if (!p) return notFound();

  return (
    <>
      <PageHero eyebrow={p.category} title={p.title} sub={p.excerpt} />
      <article className="max-w-3xl mx-auto px-4 pb-24 prose prose-invert prose-p:leading-relaxed prose-headings:scroll-mt-24">
        <img
          src={p.cover}
          alt={p.title}
          className="w-full h-72 object-cover rounded-2xl border border-white/10 mb-6"
        />
        <div className="text-sm text-slate-400 mb-6">
          {new Date(p.date).toLocaleDateString()} • {p.minutes} min read
        </div>
        {/* Simple markdown-ish rendering (our body is plain markdown-safe text) */}
        {p.body.split("\n").map((line, i) =>
          line.startsWith("### ") ? (
            <h3 key={i}>{line.replace(/^### /, "")}</h3>
          ) : line.startsWith("- ") ? (
            <ul key={i}>
              {line
                .split("- ")
                .filter(Boolean)
                .map((li, idx) => (
                  <li key={idx}>{li.trim()}</li>
                ))}
            </ul>
          ) : line.trim() === "" ? (
            <p key={i}>&nbsp;</p>
          ) : (
            <p key={i}>{line}</p>
          )
        )}
        {/* Back link */}
        <Reveal className="mt-10">
          <a
            href="/blog"
            className="inline-block rounded-lg px-4 py-2 text-sm border border-white/10 bg-white/5 hover:bg-white/10"
          >
            ← Back to blog
          </a>
        </Reveal>
      </article>
    </>
  );
}
