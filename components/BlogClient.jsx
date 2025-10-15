"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { Search, Clock, ChevronRight, Flame, Tag, X } from "lucide-react";

/* ---------- helpers ---------- */
const fmtDate = (iso) =>
  new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric" })
    .format(new Date(iso));

const SafeImage = ({ src, alt, ...rest }) => {
  const [err, setErr] = useState(false);
  return (
    <Image
      src={err ? "/images/illus/fallback.svg" : src}
      alt={alt}
      onError={() => setErr(true)}
      {...rest}
    />
  );
};

/* ---------- card ---------- */
function PostCard({ p }) {
  return (
    <article className="group rounded-2xl border border-white/10 bg-white/[0.06] hover:border-cyan-300/30 transition overflow-hidden">
      <Link href={`/blog/${p.slug}`} className="block">
        <div className="relative">
          <div className="relative w-full h-48">
            <SafeImage
              src={p.cover}
              alt={p.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <span className="absolute left-3 top-3 text-[11px] px-2 py-0.5 rounded-full bg-black/45 backdrop-blur ring-1 ring-white/15">
            {p.category}
          </span>
        </div>

        <div className="p-5">
          <h3 className="font-semibold">{p.title}</h3>
          <p className="text-sm text-slate-300 mt-1 line-clamp-2">{p.excerpt}</p>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-cyan-300" />
              {p.minutes} min • {fmtDate(p.date)}
            </span>
            <span className="inline-flex items-center gap-1 group-hover:text-cyan-300">
              Read <ChevronRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </Link>

      {p.tags?.length > 0 && (
        <div className="px-5 pb-4">
          <div className="flex flex-wrap gap-2 text-[11px]">
            {p.tags.map((t) => (
              <span key={t} className="px-2 py-0.5 rounded-lg border border-white/10 bg-white/5">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

/* ---------- page client ---------- */
export default function BlogClient({ posts }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(posts.map((p) => p.category)))],
    [posts]
  );
  const allTags = useMemo(
    () => Array.from(new Set(posts.flatMap((p) => p.tags ?? []))).sort(),
    [posts]
  );

  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [limit, setLimit] = useState(9);
  const [activeTags, setActiveTags] = useState([]);

  const sorted = useMemo(
    () => posts.slice().sort((a, b) => new Date(b.date) - new Date(a.date)),
    [posts]
  );
  const featured = useMemo(() => sorted.filter((p) => p.featured).slice(0, 1), [sorted]);

  const list = useMemo(() => {
    let arr = sorted;
    if (cat !== "All") arr = arr.filter((x) => x.category === cat);
    if (activeTags.length) arr = arr.filter((x) => (x.tags ?? []).some(t => activeTags.includes(t)));
    const n = q.trim().toLowerCase();
    if (n) {
      arr = arr.filter(
        (x) =>
          x.title.toLowerCase().includes(n) ||
          x.excerpt.toLowerCase().includes(n) ||
          x.tags?.some((t) => t.toLowerCase().includes(n))
      );
    }
    return arr;
  }, [sorted, cat, q, activeTags]);

  const visible = list.slice(0, limit);
  const canMore = limit < list.length;

  return (
    <section className="max-w-6xl mx-auto px-4 pb-24">
      {/* FEATURED */}
      {featured.length > 0 && (
        <Reveal>
          <Link
            href={`/blog/${featured[0].slug}`}
            className="block rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.03] hover:border-cyan-300/30 transition"
          >
            <div className="grid md:grid-cols-2">
              <div className="relative w-full h-64 md:h-full">
                <SafeImage
                  src={featured[0].cover}
                  alt={featured[0].title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="p-6 md:p-8">
                <span className="inline-flex items-center gap-2 text-xs rounded-full px-2.5 py-1 border border-cyan-300/40 text-cyan-300 bg-cyan-400/10">
                  <Flame className="h-3.5 w-3.5" /> Featured
                </span>
                <h2 className="text-2xl font-bold mt-3">{featured[0].title}</h2>
                <p className="text-slate-300 mt-2">{featured[0].excerpt}</p>
                <div className="mt-3 text-xs text-slate-400 flex items-center gap-3">
                  <span>{fmtDate(featured[0].date)} • {featured[0].minutes} min</span>
                  <span className="inline-flex items-center gap-1 text-cyan-300">
                    Read the post <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </Reveal>
      )}

      {/* CONTROLS */}
      <Reveal className="mt-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => { setCat(c); setLimit(9); }}
                className={`px-3 py-1.5 rounded-lg text-xs border transition ${
                  cat === c
                    ? "border-cyan-300/40 text-cyan-300 bg-cyan-400/10"
                    : "border-white/10 text-slate-300 hover:bg-white/5"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-2 md:items-center">
            {/* TAG FILTERS */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 inline-flex items-center gap-1">
                <Tag className="h-3.5 w-3.5" /> Tags:
              </span>
              {allTags.map(t => {
                const on = activeTags.includes(t);
                return (
                  <button
                    key={t}
                    onClick={() =>
                      setActiveTags(on ? activeTags.filter(x => x !== t) : [...activeTags, t])
                    }
                    className={`px-2 py-1 rounded-md text-[11px] border transition ${
                      on ? "border-cyan-300/40 text-cyan-300 bg-cyan-400/10"
                         : "border-white/10 text-slate-300 hover:bg-white/5"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
              {activeTags.length > 0 && (
                <button
                  onClick={() => setActiveTags([])}
                  className="text-[11px] inline-flex items-center gap-1 px-2 py-1 rounded-md border border-white/10 hover:bg-white/5"
                >
                  <X className="h-3.5 w-3.5" /> Clear
                </button>
              )}
            </div>

            {/* SEARCH */}
            <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-slate-900/50 px-3 py-2">
              <Search className="h-4 w-4 text-cyan-300" />
              <input
                value={q}
                onChange={(e) => { setQ(e.target.value); setLimit(9); }}
                placeholder="Search posts…"
                className="bg-transparent outline-none text-sm w-60"
              />
            </label>
          </div>
        </div>
      </Reveal>

      {/* GRID */}
      {visible.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-slate-300">
          No posts match your filters — try clearing tags or search.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {visible.map((p) => (
            <Reveal key={p.slug}>
              <PostCard p={p} />
            </Reveal>
          ))}
        </div>
      )}

      {/* LOAD MORE */}
      {canMore && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setLimit((n) => n + 9)}
            className="rounded-lg px-4 py-2 text-sm border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20"
          >
            Load more
          </button>
        </div>
      )}

      {/* CTA */}
      <Reveal className="mt-12">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/15 to-fuchsia-500/15 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">Monthly MSP tips & playbooks</h3>
            <p className="text-slate-300">No spam. Just practical checklists you can run next week.</p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex w-full md:w-auto gap-2">
            <input
              placeholder="Your work email"
              className="flex-1 md:w-72 rounded-lg bg-transparent border border-white/20 px-3 py-2 text-sm outline-none focus:border-cyan-300/50"
            />
            <button className="rounded-lg px-4 py-2 text-sm font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20">
              Subscribe
            </button>
          </form>
        </div>
      </Reveal>
    </section>
  );
}
