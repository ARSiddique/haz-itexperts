// app/blog/page.jsx
// ─────────────────────────────────────────────────────────────
// SERVER COMPONENT (SSR)
// - Prepares plain JSON for the client island
// - Renders hero
// - No client hooks here
// ─────────────────────────────────────────────────────────────

import PageHero from "@/components/PageHero";
import BlogClient from "@/components/BlogClient";
import { POSTS } from "@/lib/blogData";

export const dynamic = "force-static";
export const revalidate = false;

export default async function BlogIndexPage() {
  // Ensure we only pass plain data (already plain here)
  const posts = POSTS
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      {/* ========== HERO ========== */}
      <PageHero
        eyebrow="Blog"
        title="Practical playbooks for US SMBs"
        sub="Managed IT, cybersecurity, cloud, and vCIO strategy — zero fluff, all field-tested."
      />

      {/* ========== CLIENT ISLAND: search / filter / grid ========== */}
      <BlogClient posts={posts} />
    </>
  );
}
