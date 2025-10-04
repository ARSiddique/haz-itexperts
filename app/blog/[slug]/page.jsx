// app/blog/[slug]/page.jsx
import Image from "next/image";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { POSTS } from "@/lib/blogData";

export const dynamic = "force-static";
export const revalidate = false;

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
      {/* ========== HERO ========== */}
      <PageHero eyebrow={p.category} title={p.title} sub={p.excerpt} />

      {/* ========== BODY ========== */}
      <article className="max-w-3xl mx-auto px-4 pb-24 prose prose-invert prose-p:leading-relaxed prose-headings:scroll-mt-24">
        <div className="relative w-full h-72 mb-6 rounded-2xl overflow-hidden border border-white/10">
          <Image
            src={p.cover}
            alt={p.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
          />
        </div>

        <div className="text-sm text-slate-400 mb-6">
         {new Intl.DateTimeFormat("en-US", { year: "numeric", month: "numeric", day: "numeric" })
   .format(new Date(p.date))} • {p.minutes} min read

        </div>

        {/* simple markdown-ish rendering */}
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

        {/* back link */}
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
