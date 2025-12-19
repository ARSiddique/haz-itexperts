// app/robots.txt/route.js
export const runtime = "edge";

const body = `User-agent: *
Allow: /

Sitemap: https://supremeitexperts.com/sitemap.xml
`;

export async function GET() {
  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300, must-revalidate",
    },
  });
}
