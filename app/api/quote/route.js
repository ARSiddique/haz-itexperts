export async function POST(req) {
  const body = await req.text();
  console.log("QUOTE_FORM:", body);
  return new Response("ok");
}
