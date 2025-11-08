// app/sitemap.js
export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://supremeitexperts.com";

  const staticRoutes = [
    "", "/about", "/services", "/blog", "/faqs", "/areas", "/contact", "/gallery", "/get-quote",
  ].map((path) => ({
    url: `${baseUrl}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1.0 : 0.7,
  }));

  // If you have dynamic blog posts, fetch and append them here:
  // const posts = await getPosts();
  // const postRoutes = posts.map(p => ({
  //   url: `${baseUrl}/blog/${p.slug}`,
  //   lastModified: p.updatedAt,
  //   changeFrequency: "weekly",
  //   priority: 0.6,
  // }));

  return [...staticRoutes /*, ...postRoutes */];
}
