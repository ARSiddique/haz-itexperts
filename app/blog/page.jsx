// app/blog/page.jsx
// SSR: prepares plain JSON and renders hero + client island

import PageHero from "@/components/PageHero";
import BlogClient from "@/components/BlogClient";
import { POSTS } from "@/lib/blogData";

export const dynamic = "force-static";
export const revalidate = false;

export default async function BlogIndexPage() {
  const posts = POSTS.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Practical playbooks for US SMBs"
        sub="Managed IT, cybersecurity, cloud, and vCIO strategy — zero fluff, all field-tested."
      />
      <BlogClient posts={posts} />
    </>
  );
}
