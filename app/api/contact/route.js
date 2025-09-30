export async function POST(req) {
  const body = await req.text(); // simple log
  console.log("CONTACT_FORM:", body);
  return new Response("ok");
}
