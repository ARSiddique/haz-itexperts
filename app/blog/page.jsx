// app/blog/page.jsx
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/siteConfig";
import { BASE_URL } from "@/lib/seoIds";
import { POSTS } from "@/lib/blogData";

export const dynamic = "force-static";
export const revalidate = false;

function formatDate(dateStr) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" });
  } catch {
    return dateStr;
  }
}

export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = String(BASE_URL || site?.url || "https://supremeitexperts.com").replace(/\/$/, "");

  const title = `Blog | ${brand}`;
  const description =
    "Practical playbooks for US SMBs: managed IT, cybersecurity, cloud, and vCIO strategy—field-tested, no fluff.";

  return {
    metadataBase: new URL(baseUrl),
    title: { absolute: title },
    description,
    alternates: { canonical: "/blog" },

    // ✅ TEMP: blog ko index nahi karwana
    robots: { index: false, follow: false },

    openGraph: {
      title,
      description,
      type: "website",
      url: "/blog",
      siteName: brand,
      images: [{ url: "/og-image.png?v=7", width: 1200, height: 630, alt: `${brand} — Blog` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png?v=7"],
    },
  };
}

export default async function BlogIndexPage() {
  const postsAll = POSTS.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

  // ✅ Sirf latest 2 posts show
  const posts = postsAll.slice(0, 2);

  const featured = posts.find((p) => p.featured) || posts[0] || null;
  const rest = featured ? posts.filter((p) => p.slug !== featured.slug) : [];

  // ✅ Clean internal links (12) — agar tum completely hide rakhna chahte ho, is section ko bhi remove kar sakte ho
  const quickLinks = [
    {
      title: "Services",
      links: [
        { href: "/services", label: "Services Overview" },
        { href: "/services/managed-it", label: "Managed IT" },
        { href: "/services/cybersecurity", label: "Cybersecurity" },
        { href: "/services/cloud-workspace", label: "Cloud Workspace" },
      ],
    },
    {
      title: "Locations",
      links: [
        { href: "/areas", label: "Areas We Serve" },
        { href: "/locations/allentown-pa", label: "Allentown, PA" },
        { href: "/locations/macungie-pa", label: "Macungie, PA" },
        { href: "/locations/emmaus-pa", label: "Emmaus, PA" },
      ],
    },
    {
      title: "Next steps",
      links: [
        { href: "/about", label: "About" },
        { href: "/faqs", label: "FAQs" },
        { href: "/contact", label: "Contact" },
        { href: "/get-quote", label: "Pricing & Quote" },
      ],
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Practical playbooks for US SMBs"
        sub="Managed IT, cybersecurity, cloud, and vCIO strategy — field-tested, no fluff."
      />

      <main className="mx-auto max-w-6xl px-4 pb-16">
        {/* Featured */}
        {featured ? (
          <section className="mt-8">
            {/* ✅ IMPORTANT: items-stretch + both columns full height */}
            <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
              {/* IMAGE (full height) */}
              <Link
                href={`/blog/${featured.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5"
              >
                {/* ✅ mobile: 16/9 | lg+: full height + min height */}
                <div className="relative w-full aspect-[16/9] lg:aspect-auto lg:h-full min-h-[360px]">
                  <Image
                    src={featured.cover}
                    alt={featured.title}
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs text-white/85">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/90" />
                    Featured
                  </div>
                </div>
              </Link>

              {/* CONTENT (same height) */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 lg:p-7 lg:h-full flex flex-col">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center rounded-full border border-white/10 bg-black/25 px-3 py-1 text-xs text-white/75">
                    {featured.category}
                  </span>
                  <span className="text-xs text-white/60">
                    {formatDate(featured.date)} • {featured.minutes} min
                  </span>
                </div>

                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">
                  {featured.title}
                </h2>

                <p className="mt-3 text-sm leading-6 text-white/70">{featured.excerpt}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {(featured.tags || []).slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/65"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* ✅ pushes buttons to bottom if content small */}
                <div className="mt-auto pt-6 flex flex-wrap gap-3">
                  <Link
                    href={`/blog/${featured.slug}`}
                    className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
                  >
                    Read the post →
                  </Link>
                  <Link
                    href="/contact?type=assessment&source=blog"
                    className="inline-flex items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100 hover:bg-cyan-400/15"
                  >
                    Free IT Assessment →
                  </Link>
                  <Link
                    href="/get-quote"
                    className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-black/20 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
                  >
                    Pricing & Quote →
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {/* Latest */}
        <section className="mt-10">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white">Latest posts</h3>
            <p className="mt-1 text-sm text-white/60">
              New guides drop regularly — short, practical, and action-first.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {rest.length ? (
              rest.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
                >
                  <div className="relative aspect-[16/9] w-full">
                    <Image src={p.cover} alt={p.title} fill className="object-cover object-center" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs text-white/80">
                      {p.category}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs text-white/60">
                        {formatDate(p.date)} • {p.minutes} min
                      </span>
                      <span className="text-xs text-cyan-200/80">Read →</span>
                    </div>

                    <h4 className="mt-2 text-base font-semibold text-white">{p.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-white/70">{p.excerpt}</p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
                No additional posts yet. Add the second post and it will appear here.
              </div>
            )}
          </div>
        </section>

        {/* Start here */}
        <section className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6 lg:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Start here</h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-white/65">
                Helpful pages to understand deliverables and next steps — clean, no “spammy link” feel.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact?type=assessment&source=blog-start-here"
                className="inline-flex items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100 hover:bg-cyan-400/15"
              >
                Get a Free IT Assessment →
              </Link>
              <Link
                href="/get-quote"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-black/20 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
              >
                Get a Quote →
              </Link>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {quickLinks.map((group) => (
              <div key={group.title} className="rounded-xl border border-white/10 bg-black/15 p-5">
                <div className="text-xs font-semibold tracking-widest text-white/55">
                  {group.title.toUpperCase()}
                </div>
                <div className="mt-3 grid gap-2">
                  {group.links.map((l) => (
                    <Link key={l.href} href={l.href} className="text-sm text-cyan-200/85 hover:text-cyan-200">
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-r from-cyan-500/10 via-white/5 to-violet-500/10 p-6 lg:p-8">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Need help right now?</h3>
              <p className="mt-1 text-sm text-white/70">
                If your team is dealing with outages, slow PCs, phishing, or messy IT—book a quick assessment.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact?type=assessment&source=blog-cta"
                className="inline-flex items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-sm text-cyan-100 hover:bg-cyan-400/15"
              >
                Book Free Assessment →
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-black/20 px-5 py-2 text-sm text-white/80 hover:bg-white/10"
              >
                Contact →
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
