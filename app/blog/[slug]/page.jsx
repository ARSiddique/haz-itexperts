// app/blog/[slug]/page.jsx
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ReadingProgress from "@/components/ReadingProgress";
import ShareBar from "@/components/ShareBar";
import { POSTS } from "@/lib/blogData";
import { site } from "@/lib/siteConfig";
import { BASE_URL, BUSINESS_ID } from "@/lib/seoIds";

export const dynamic = "force-static";
export const revalidate = false;

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

const fmtDate = (iso) =>
  new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric" }).format(
    new Date(iso)
  );

function isInternalHref(href) {
  return typeof href === "string" && href.startsWith("/");
}

function linkifyText(text) {
  const raw = String(text || "");
  // internal: /path?x=y
  // external: https://...
  const re = /(https?:\/\/[^\s)]+|\/[a-zA-Z0-9\-._~%/]+(?:\?[a-zA-Z0-9\-._~%&=+#]*)?)/g;
  const parts = raw.split(re).filter(Boolean);

  return parts.map((part, idx) => {
    if (part.startsWith("http://") || part.startsWith("https://")) {
      return (
        <a
          key={idx}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-300 hover:underline"
        >
          {part}
        </a>
      );
    }
    if (isInternalHref(part)) {
      return (
        <Link key={idx} href={part} className="text-cyan-300 hover:underline">
          {part}
        </Link>
      );
    }
    return <span key={idx}>{part}</span>;
  });
}

// ✅ Better renderer: combine lines into paragraphs (no “one line = one paragraph” issue)
function renderBlocks(raw) {
  const lines = String(raw || "").replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  let ul = null;
  let para = [];

  const flushUl = () => {
    if (ul && ul.items.length) blocks.push({ type: "ul", items: ul.items });
    ul = null;
  };

  const flushPara = () => {
    if (para.length) {
      const text = para.join(" ").trim();
      if (text) blocks.push({ type: "p", text });
      para = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // blank line
    if (!line) {
      flushUl();
      flushPara();
      continue;
    }

    // headings
    if (line.startsWith("### ")) {
      flushUl();
      flushPara();
      blocks.push({ type: "h3", text: line.replace(/^###\s+/, ""), id: `h${i}` });
      continue;
    }

    // ordered list like "1) "
    if (/^\d+\)\s+/.test(line)) {
      flushUl();
      flushPara();
      const items = [];
      let j = i;
      while (j < lines.length && /^\d+\)\s+/.test(lines[j].trim())) {
        items.push(lines[j].trim().replace(/^\d+\)\s+/, ""));
        j++;
      }
      blocks.push({ type: "ol", items });
      i = j - 1;
      continue;
    }

    // unordered list "- "
    if (line.startsWith("- ")) {
      flushPara();
      if (!ul) ul = { type: "ul", items: [] };
      ul.items.push(line.replace(/^- /, "").trim());
      continue;
    }

    // normal paragraph line (accumulate)
    flushUl();
    para.push(line);
  }

  flushUl();
  flushPara();
  return blocks;
}

export async function generateMetadata({ params }) {
  const { slug } = await params; // ✅ FIX
  const p = POSTS.find((x) => x.slug === slug);
  if (!p) return {};

  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = String(BASE_URL || site?.url || "https://supremeitexperts.com").replace(/\/$/, "");

  return {
    metadataBase: new URL(baseUrl),
    title: { absolute: `${p.title} | ${brand}` },
    description: p.excerpt,
    alternates: { canonical: `/blog/${p.slug}` },

    // ✅ index ON
    robots: { index: true, follow: true },

    openGraph: {
      title: p.title,
      description: p.excerpt,
      type: "article",
      url: `/blog/${p.slug}`,
      images: [{ url: p.cover, width: 1200, height: 630, alt: p.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: p.title,
      description: p.excerpt,
      images: [p.cover],
    },
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params; // ✅ FIX
  const p = POSTS.find((x) => x.slug === slug);
  if (!p) return notFound();

  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = String(BASE_URL || site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/blog/${p.slug}`;

  const blocks = renderBlocks(p.body);
  const headings = blocks.filter((b) => b.type === "h3").map((h) => ({ id: h.id, text: h.text }));

  const siblings = POSTS.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
  const idx = siblings.findIndex((x) => x.slug === p.slug);
  const prev = idx > 0 ? siblings[idx - 1] : null;
  const next = idx < siblings.length - 1 ? siblings[idx + 1] : null;

  const related = POSTS.filter((x) => x.slug !== p.slug && x.category === p.category).slice(0, 3);

  const WEBPAGE_ID = `${canonical}#webpage`;
  const ARTICLE_ID = `${canonical}#article`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": WEBPAGE_ID,
        url: canonical,
        name: p.title,
        description: p.excerpt,
        isPartOf: { "@id": `${baseUrl}/#website` },
        about: { "@id": BUSINESS_ID || `${baseUrl}/#business` },
        primaryImageOfPage: { "@type": "ImageObject", url: new URL(p.cover, baseUrl).toString() },
        mainEntity: { "@id": ARTICLE_ID },
      },
      {
        "@type": "Article",
        "@id": ARTICLE_ID,
        headline: p.title,
        description: p.excerpt,
        image: [new URL(p.cover, baseUrl).toString()],
        datePublished: p.date,
        dateModified: p.date,
        author: { "@type": "Organization", name: brand },
        publisher: {
          "@type": "Organization",
          name: brand,
          logo: { "@type": "ImageObject", url: new URL("/logo.png", baseUrl).toString() },
        },
        mainEntityOfPage: canonical,
      },
    ],
  };

  const authorName = p.author?.name || brand;
  const authorRole = p.author?.role || "IT Team";
  const authorAvatar = p.author?.avatar || "/logo.png";

  return (
    <>
      <Script
        id={`blog-article-jsonld-${p.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <PageHero eyebrow={p.category} title={p.title} sub={p.excerpt} />
      <ReadingProgress targetId="postBody" />

      <section className="max-w-6xl mx-auto px-4 pb-24">
        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          <article
            id="postBody"
            className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-7"
          >
            <div className="relative w-full h-72 md:h-96 mb-6 rounded-2xl overflow-hidden border border-white/10">
              <Image
                src={p.cover}
                alt={p.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
                priority
              />
            </div>

            {/* meta */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-slate-400 mb-6">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-full overflow-hidden ring-1 ring-white/15 bg-black/20">
                  <Image src={authorAvatar} alt={authorName} fill className="object-cover" sizes="40px" />
                </div>
                <div>
                  <div className="text-slate-200 font-medium">{authorName}</div>
                  <div className="text-slate-400 text-xs">{authorRole}</div>
                </div>
              </div>
              <div className="text-slate-400">
                {fmtDate(p.date)} • {p.minutes} min read •{" "}
                <Link href="/contact?type=assessment&source=blog-post" className="text-cyan-300 hover:underline">
                  Book free assessment
                </Link>
              </div>
            </div>

            {/* CONTENT */}
            <div className="prose prose-invert prose-p:leading-relaxed prose-headings:scroll-mt-24 max-w-none">
              {blocks.map((b, i) => {
                if (b.type === "h3") return <h3 id={b.id} key={i}>{b.text}</h3>;
                if (b.type === "p") return <p key={i}>{linkifyText(b.text)}</p>;
                if (b.type === "ul")
                  return (
                    <ul key={i}>
                      {b.items.map((it, k) => <li key={k}>{linkifyText(it)}</li>)}
                    </ul>
                  );
                if (b.type === "ol")
                  return (
                    <ol key={i}>
                      {b.items.map((it, k) => <li key={k}>{linkifyText(it)}</li>)}
                    </ol>
                  );
                return null;
              })}
            </div>

            {/* CTA BLOCK */}
            <Reveal className="mt-10">
              <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/15 to-fuchsia-500/15 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-cyan-300/80">Next step</div>
                  <h4 className="text-lg font-semibold mt-1">Want a quick gap-check for your IT?</h4>
                  <p className="text-slate-300 mt-1">
                    Get a free assessment. We’ll point out the biggest risks + quickest wins.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Link
                    href="/contact?type=assessment&source=blog-cta"
                    className="rounded-lg px-5 py-3 font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
                  >
                    Free IT Assessment
                  </Link>
                  <Link
                    href="/services"
                    className="rounded-lg px-5 py-3 font-semibold bg-white/10 ring-1 ring-white/20 hover:bg-white/20"
                  >
                    View Services
                  </Link>
                </div>
              </div>
            </Reveal>

            <Reveal className="mt-8">
              <ShareBar slug={p.slug} title={p.title} baseUrl={baseUrl} />
            </Reveal>

            {/* prev / next */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
              {prev && (
                <Link href={`/blog/${prev.slug}`} className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10">
                  ← Previous: <span className="font-medium">{prev.title}</span>
                </Link>
              )}
              {next && (
                <Link
                  href={`/blog/${next.slug}`}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 text-right"
                >
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
                    <Link
                      key={r.slug}
                      href={`/blog/${r.slug}`}
                      className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10"
                    >
                      <div className="text-sm text-slate-400">{fmtDate(r.date)} • {r.minutes} min</div>
                      <div className="font-medium">{r.title}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <Reveal className="mt-10">
              <Link href="/blog" className="inline-block rounded-lg px-4 py-2 text-sm border border-white/10 bg-white/5 hover:bg-white/10">
                ← Back to blog
              </Link>
            </Reveal>
          </article>

          {/* SIDEBAR */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              {headings.length > 0 && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="text-xs uppercase tracking-wide text-slate-400">On this page</div>
                  <ul className="mt-3 space-y-2 text-sm">
                    {headings.map((h) => (
                      <li key={h.id}>
                        <a href={`#${h.id}`} className="text-cyan-300 hover:underline">
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <div className="text-xs uppercase tracking-wide text-slate-400">Helpful links</div>
                <div className="mt-3 space-y-2 text-sm">
                  <Link className="block text-slate-200 hover:text-cyan-300" href="/services">→ Services overview</Link>
                  <Link className="block text-slate-200 hover:text-cyan-300" href="/areas">→ Areas we serve</Link>
                  <Link className="block text-slate-200 hover:text-cyan-300" href="/contact?type=assessment&source=blog-sidebar">
                    → Free IT assessment
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
