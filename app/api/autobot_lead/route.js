// app/api/autobot_lead/route.js
export async function POST(req) {
  try {
    const body = await req.json();

    // TODO: pipe to your CRM / email / Slack webhook
    // Example: await fetch(process.env.SLACK_WEBHOOK_URL, { method: "POST", body: JSON.stringify(body) });

    console.log("AutoBot Lead:", body);

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    console.error("AutoBot Lead Error:", e);
    return new Response(JSON.stringify({ ok: false }), { status: 500 });
  }
}
