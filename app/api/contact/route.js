// app/api/contact/route.js
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const MAIL_TO = process.env.MAIL_TO || "supremeitexperts@gmail.com";
const MAIL_FROM = process.env.MAIL_FROM || "Supreme IT Experts <onboarding@resend.dev>";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const LP = new URL("/ads/allentown-it-support", SITE).toString();

function esc(s = "") {
  return String(s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
const cap = (s = "", n = 2000) => String(s).slice(0, n);
const norm = (s = "") => cap(String(s).trim(), 2000);
const isEmail = (s = "") => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s).trim());

async function readBody(req) {
  const ct = req.headers.get("content-type") || "";
  if (ct.includes("application/json")) return await req.json();
  try {
    const fd = await req.formData();
    return Object.fromEntries(fd.entries());
  } catch {
    return {};
  }
}

// Build an absolute URL even if a relative path is provided
function makeRedirect(req, url, params) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl?.origin || "http://localhost:3000";
  const u = new URL(url, base); // supports relative or absolute
  Object.entries(params).forEach(([k, v]) => u.searchParams.set(k, v));
  return Response.redirect(u.toString(), 303);
}

export async function POST(req) {
  try {
    const body = await readBody(req);

    const redirectTo = body.redirectTo ? String(body.redirectTo) : LP;

    // honeypot
    if (body.website || body.hp) {
      return makeRedirect(req, redirectTo, { sent: "1" });
    }

    const name = norm(body.name);
    const email = norm((body.email || "").toLowerCase());
    const phone = norm(body.phone);
    const message = cap(norm(body.message), 5000);

    if (!name || !email) return makeRedirect(req, redirectTo, { error: "missing" });
    if (!isEmail(email)) return makeRedirect(req, redirectTo, { error: "invalidEmail" });
    if (!resend) return makeRedirect(req, redirectTo, { error: "mailConfig" });

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
    ].filter(Boolean).join("\n");

    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial;line-height:1.5">
        <h2 style="margin:0 0 8px 0">New IT Assessment lead</h2>
        <p><strong>Name:</strong> ${esc(name)}<br/>
           <strong>Email:</strong> ${esc(email)}<br/>
           ${phone ? `<strong>Phone:</strong> ${esc(phone)}<br/>` : ""}</p>
        <p style="white-space:pre-wrap"><strong>Message</strong><br/>${esc(message || "(no message)")}</p>
        <hr style="border:none;border-top:1px solid #eee;margin:16px 0"/>
        <p style="color:#667085;font-size:12px">Sent ${esc(new Date().toLocaleString())}</p>
      </div>`;

    await resend.emails.send({
      from: MAIL_FROM,
      to: MAIL_TO,
      subject,
      text,
      html,
      reply_to: email,
    });

    return makeRedirect(req, redirectTo, { sent: "1" });
  } catch (e) {
    console.error("Contact form error:", e);
    return makeRedirect(req, LP, { error: "server" });
  }
}

export async function GET() {
  return new Response("Method Not Allowed", { status: 405, headers: { Allow: "POST" } });
}
