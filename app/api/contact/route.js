// app/api/contact/route.js
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// --- config ---
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const MAIL_TO = process.env.MAIL_TO || "supremeitexperts@gmail.com";
const MAIL_FROM =
  process.env.MAIL_FROM || "Supreme IT Experts <onboarding@resend.dev>";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
// Default success target (LP)
const REDIRECT_TO = `${BASE}/ads/allentown-it-support?sent=1`;

// --- helpers ---
function esc(s = "") {
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
  if (ct.includes("application/x-www-form-urlencoded")) {
    const fd = await req.formData();
    return Object.fromEntries(fd.entries());
  }
  try {
    const fd = await req.formData();
    return Object.fromEntries(fd.entries());
  } catch {
    return {};
  }
}

const isEmail = (s = "") => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
const cap = (s = "", n = 2000) => String(s).slice(0, n);

function safeRedirect(path) {
  // allow only same-site relative paths like "/foo?sent=1"
  if (typeof path !== "string") return REDIRECT_TO;
  if (!path.startsWith("/")) return REDIRECT_TO;
  try {
    const url = new URL(path, BASE);
    return url.toString();
  } catch {
    return REDIRECT_TO;
  }
}

// --- handlers ---
export async function POST(req) {
  try {
    const body = await readBody(req);

    // Honeypot (bots fill hidden fields)
    if (body.website || body.hp) {
      return Response.redirect(REDIRECT_TO, 303);
    }

    // Optional caller-provided redirect (hidden input `redirectTo`)
    const target = safeRedirect(body.redirectTo);

    const name = cap(body.name || "", 200);
    const email = cap(body.email || "", 320);
    const phone = cap(body.phone || "", 80);
    const message = cap(body.message || "", 5000);

    if (!name || !email) {
      return new Response("Name and email are required.", { status: 400 });
    }
    if (!isEmail(email)) {
      return new Response("Please enter a valid email.", { status: 400 });
    }
    if (!resend) {
      return new Response("Email service not configured.", { status: 500 });
    }

    // Context
    const referer = req.headers.get("referer") || "";
    const ua = req.headers.get("user-agent") || "";
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "";

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
      `IP: ${ip}`,
      `UA: ${ua}`,
      `Referer: ${referer}`,
      `Timestamp: ${new Date().toISOString()}`,
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
        <p style="color:#667085;font-size:12px">
          IP: ${esc(ip)}<br/>
          UA: ${esc(ua)}<br/>
          Referer: ${esc(referer)}<br/>
          Sent ${esc(new Date().toLocaleString())}
        </p>
      </div>`;

    const { error } = await resend.emails.send({
      from: MAIL_FROM,
      to: MAIL_TO,
      subject,
      text,
      html,
      reply_to: email, // Resend supports snake_case
    });

    if (error) {
      console.error("Resend error:", error);
      return new Response("Failed to send message.", { status: 500 });
    }

    return Response.redirect(target, 303);
  } catch (err) {
    console.error("Contact form error:", err);
    return new Response("Failed to send message.", { status: 500 });
  }
}

export async function GET() {
  return new Response("Method Not Allowed", {
    status: 405,
    headers: { Allow: "POST" },
  });
}
