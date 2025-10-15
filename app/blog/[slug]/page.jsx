// app/blog/[slug]/page.jsx
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ReadingProgress from "@/components/ReadingProgress";
import ShareBar from "@/components/ShareBar"; // <-- NEW
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
    openGraph: { images: [p.cover], type: "article" },
  };
}

const fmtDate = (iso) =>
  new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric" })
    .format(new Date(iso));

export default function BlogPost({ params }) {
  const p = POSTS.find((x) => x.slug === params.slug);
  if (!p) return notFound();

  const lines = p.body.split("\n");
  const headings = lines
    .map((line, i) => (line.startsWith("### ") ? { i, text: line.replace(/^### /, "") } : null))
    .filter(Boolean);

  const siblings = POSTS.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
  const idx = siblings.findIndex((x) => x.slug === p.slug);
  const prev = idx > 0 ? siblings[idx - 1] : null;
  const next = idx < siblings.length - 1 ? siblings[idx + 1] : null;

  const related = POSTS.filter((x) => x.slug !== p.slug && x.category === p.category).slice(0, 3);

  return (
    <>
      <PageHero eyebrow={p.category} title={p.title} sub={p.excerpt} />

      <ReadingProgress targetId="postBody" />

      <article
        id="postBody"
        className="max-w-3xl mx-auto px-4 pb-24 prose prose-invert prose-p:leading-relaxed prose-headings:scroll-mt-24"
      >
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

        {/* meta / author */}
        <div className="flex items-center justify-between gap-4 text-sm text-slate-400 mb-6">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 rounded-full overflow-hidden ring-1 ring-white/15">
              <Image
                src={p.author?.avatar || "/media/avatar-hazi.jpg"}
                alt={p.author?.name || "Author"}
                fill
                className="object-cover"
                sizes="36px"
              />
            </div>
            <div>
              <div className="text-slate-200 font-medium">{p.author?.name || "Team"}</div>
              <div className="text-slate-400 text-xs">{p.author?.role || "Contributor"}</div>
            </div>
          </div>
          <div>{fmtDate(p.date)} • {p.minutes} min read</div>
        </div>

        {/* TOC */}
        {headings.length > 0 && (
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 mb-6">
            <div className="text-xs uppercase tracking-wide text-slate-400">On this page</div>
            <ul className="mt-2 space-y-1 text-sm">
              {headings.map((h) => (
                <li key={h.i}>
                  <a href={`#h${h.i}`} className="text-cyan-300 hover:underline">
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* content */}
        {lines.map((line, i) =>
          line.startsWith("### ") ? (
            <h3 id={`h${i}`} key={i}>{line.replace(/^### /, "")}</h3>
          ) : line.startsWith("- ") ? (
            <ul key={i}>
              {line
                .split("- ")
                .filter(Boolean)
                .map((li, idx2) => <li key={idx2}>{li.trim()}</li>)}
            </ul>
          ) : line.trim() === "" ? (
            <p key={i}>&nbsp;</p>
          ) : (
            <p key={i}>{line}</p>
          )
        )}

        {/* share (CLIENT) */}
        <Reveal className="mt-8">
          <ShareBar slug={p.slug} title={p.title} baseUrl="" />
        </Reveal>

        {/* prev / next */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {prev && (
            <Link href={`/blog/${prev.slug}`} className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10">
              ← Previous: <span className="font-medium">{prev.title}</span>
            </Link>
          )}
          {next && (
            <Link href={`/blog/${next.slug}`} className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 text-right">
              Next: <span className="font-medium">{next.title}</span> →
            </Link>
          )}
        </div>

        {/* related */}
        {related.length > 0 && (
          <div className="mt-10">
            <h4 className="text-lg font-semibold mb-3">Related in {p.category}</h4>
            <div className="grid sm:grid-cols-2 gap-3">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10">
                  <div className="text-sm text-slate-400">
                    {fmtDate(r.date)} • {r.minutes} min
                  </div>
                  <div className="font-medium">{r.title}</div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* back link */}
        <Reveal className="mt-10">
          <Link
            href="/blog"
            className="inline-block rounded-lg px-4 py-2 text-sm border border-white/10 bg-white/5 hover:bg-white/10"
          >
            ← Back to blog
          </Link>
        </Reveal>
      </article>
    </>
  );
}
