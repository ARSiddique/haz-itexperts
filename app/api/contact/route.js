// app/api/contact/route.js
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const MAIL_TO = process.env.MAIL_TO || "supremeitexperts@gmail.com";
const MAIL_FROM =
  process.env.MAIL_FROM || "Supreme IT Experts <onboarding@resend.dev>";

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function readBody(req) {
  const ct = req.headers.get("content-type") || "";
  if (ct.includes("application/json")) return await req.json();
  const fd = await req.formData();
  return Object.fromEntries(fd.entries());
}

export async function POST(req) {
  try {
    const { name = "", email = "", phone = "", message = "" } = await readBody(req);
    if (!name || !email) {
      return new Response("Name and email are required.", { status: 400 });
    }
    if (!resend) {
      return new Response("Email service not configured.", { status: 500 });
    }

    const subject = `New IT Assessment lead — ${name}`;
    const text = [
      "New lead from landing page:",
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : "",
      "",
      "Message:",
      message || "(no message)",
      "",
      `Timestamp: ${new Date().toISOString()}`
    ]
      .filter(Boolean)
      .join("\n");

    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial;line-height:1.5">
        <h2 style="margin:0 0 8px 0">New IT Assessment lead</h2>
        <p><strong>Name:</strong> ${esc(name)}<br/>
           <strong>Email:</strong> ${esc(email)}<br/>
           ${phone ? `<strong>Phone:</strong> ${esc(phone)}<br/>` : ""}</p>
        <p style="white-space:pre-wrap"><strong>Message</strong><br/>${esc(message || "(no message)")}</p>
        <hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>
        <p style="color:#667085;font-size:12px">Sent ${new Date().toLocaleString()}</p>
      </div>`;

    await resend.emails.send({
      from: MAIL_FROM,
      to: MAIL_TO,
      subject,
      text,
      html,
      reply_to: email,
    });

    // redirect back to the page with a success flag
    const referer = req.headers.get("referer") || (process.env.NEXT_PUBLIC_SITE_URL ?? "/");
    const url = new URL(referer);
    url.searchParams.set("sent", "1");
    return Response.redirect(url.toString(), 303);
  } catch (err) {
    console.error("Contact form error:", err);
    return new Response("Failed to send message.", { status: 500 });
  }
}

export async function GET() {
  return new Response("Method Not Allowed", { status: 405, headers: { Allow: "POST" } });
}
