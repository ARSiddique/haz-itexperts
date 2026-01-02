// app/ads/allentown-it-support/page.js
import Link from "next/link";
import Image from "next/image";
import BodyClass from "@/components/BodyClass";
import TrackedPhoneLink from "@/components/TrackedPhoneLink";
import TrackedEmailLink from "@/components/TrackedEmailLink";

export const metadata = {
  title: "Allentown Managed IT Support for SMBs | Supreme IT Experts",
  description:
    "Local MSP in Allentown providing 24/7 helpdesk, device management, cybersecurity & backups, and network monitoring. Fast response. Fixed monthly pricing.",
  robots: { index: false, follow: true },
};

export default async function Page({ searchParams }) {
  const sp = await searchParams;
  const get = (k) => (typeof sp?.get === "function" ? sp.get(k) : sp?.[k]);

  const sent = get("sent") === "1";
  const error = get("error") || "";

  const source = "ads-allentown-it-support";
  const phone = "+1 610-500-9209";
  const email = "supremeitexperts@gmail.com";
  const emailHref = `mailto:${email}?subject=${encodeURIComponent("IT Support Inquiry")}`;

  const wrap = {
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
    lineHeight: 1.6,
    padding: 28,
    maxWidth: 900,
    marginLeft: "auto",
    marginRight: "auto",
  };

  const sec = { marginTop: 24, marginBottom: 24 };
  const kicker = { fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.8 };
  const h1 = { marginTop: 6, marginBottom: 6, fontSize: 30, fontWeight: 800, letterSpacing: "-0.02em" };
  const hero = { marginTop: 4, marginBottom: 0, opacity: 0.9, fontSize: 16 };
  const h2 = { marginTop: 0, marginBottom: 10, fontSize: 20, fontWeight: 700, letterSpacing: "-0.01em" };
  const list = { paddingLeft: 18, marginTop: 0, marginBottom: 0 };
  const btn = { display: "inline-block", padding: "10px 14px", borderRadius: 10, background: "#111827", color: "#fff", textDecoration: "none", border: "1px solid #111827", marginRight: 12 };
  const btnOutline = { ...btn, background: "#fff", color: "#111827" };
  const input = { padding: "10px 12px", borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 14, width: "100%" };
  const subnote = { fontSize: 12, marginTop: 6, opacity: 0.8 };
  const banner = { marginBottom: 16, padding: "10px 12px", borderRadius: 8, background: "rgba(34,197,94,.15)", border: "1px solid rgba(34,197,94,.35)", fontSize: 14 };
  const errBanner = { marginBottom: 16, padding: "10px 12px", borderRadius: 8, background: "rgba(239,68,68,.15)", border: "1px solid rgba(239,68,68,.35)", fontSize: 14 };

  return (
    <main style={wrap}>
      <BodyClass name="hide-chrome" />

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <Link href="/" aria-label="Supreme IT Experts – Home" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}>
          <Image
            src="/logo.png"
            alt="Supreme IT Experts"
            width={140}
            height={28}
            priority
            style={{ height: "28px", width: "auto" }}
          />
        </Link>
      </div>

      {sent && <div style={banner}>✅ Thanks! Your message was sent. We’ll contact you shortly.</div>}
      {error && <div style={errBanner}>⚠️ Something went wrong. Please try again.</div>}

      <div style={sec} role="banner">
        <div style={kicker}>Managed IT Support • Allentown, PA</div>
        <h1 style={h1}>Keep Your Business Secure, Fast & Supported</h1>
        <p style={hero}>
          24/7 helpdesk, proactive device management, cybersecurity &amp; backups, and
          network monitoring — delivered by a local MSP on a predictable monthly plan.
        </p>

        <div style={{ marginTop: 12 }}>
          {/* ✅ Tracked Call */}
          <TrackedPhoneLink
            phone={phone}
            source={source}
            style={btn}
          >
            Call {phone}
          </TrackedPhoneLink>

          {/* ✅ Tracked Email */}
          <TrackedEmailLink
            href={emailHref}
            email={email}
            source={source}
            style={btnOutline}
          >
            Email Us
          </TrackedEmailLink>
        </div>
      </div>

      <section style={sec} id="intro">
        <h2 style={h2}>Built for SMBs in Allentown, Macungie & Emmaus</h2>
        <p style={{ marginTop: 0, marginBottom: 0 }}>
          We keep teams productive and protected in Allentown, Macungie and Emmaus.
          You get rapid response, clear communication, and an IT environment that just works.
        </p>
      </section>

      <section style={sec} id="services">
        <h2 style={h2}>Core Services</h2>
        <ul style={list}>
          <li><strong>24/7 Helpdesk &amp; Device Management</strong> — provisioning, updates, troubleshooting.</li>
          <li><strong>Cybersecurity</strong> — EDR/AV, patching, MFA, encrypted backups &amp; recovery.</li>
          <li><strong>Network</strong> — secure setup, Wi-Fi coverage, monitoring &amp; performance tuning.</li>
          <li><strong>Email &amp; Cloud Migrations</strong> — smooth moves with minimal downtime.</li>
        </ul>
      </section>

      <section style={sec} id="why">
        <h2 style={h2}>Why Choose Supreme IT Experts</h2>
        <ul style={list}>
          <li>Local team • fast, friendly support</li>
          <li>Flat monthly pricing • no surprises</li>
          <li>Transparent onboarding, SLAs &amp; reporting</li>
          <li>No long-term lock-ins • we earn your trust every month</li>
        </ul>
      </section>

      <section style={sec} id="pricing">
        <h2 style={h2}>Simple, Predictable Pricing</h2>
        <p style={{ marginTop: 0, marginBottom: 0 }}>
          Per-user monthly plans tailored to your size and needs. Start with a free assessment —
          we’ll map your environment and give you a fixed quote.
        </p>
      </section>

      <section style={sec} id="contact">
        <h2 style={h2}>Request a Free IT Assessment</h2>
        <form method="post" action="/api/contact" style={{ display: "grid", gap: 12, maxWidth: 520 }}>
          <input type="hidden" name="redirectTo" value="/ads/allentown-it-support?sent=1" />
          <input
            name="hp"
            tabIndex={-1}
            autoComplete="off"
            style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
            aria-hidden="true"
          />
          <input name="name" required placeholder="Your name" style={input} />
          <input name="email" required type="email" placeholder="Your email" style={input} />
          <input name="phone" placeholder="Phone (optional)" style={input} />
          <textarea name="message" rows={4} placeholder="Company size & needs" style={input} />
          <button type="submit" style={btn}>Request Assessment</button>
        </form>

        <p style={subnote}>
          Prefer email? Write to{" "}
          <TrackedEmailLink href={`mailto:${email}`} email={email} source={source}>
            {email}
          </TrackedEmailLink>
        </p>
      </section>

      <section style={{ ...sec, marginBottom: 8 }} id="area">
        <h2 style={h2}>Service Area</h2>
        <p style={{ marginTop: 0, marginBottom: 0 }}>
          Allentown • Macungie • Emmaus
        </p>
      </section>

      <div style={{ fontSize: 12, opacity: 0.75, marginTop: 20 }}>
        Supreme IT Experts · Allentown, PA · Local MSP ·{" "}
        <Link href="/" aria-label="Visit full website">Visit full website</Link>
      </div>
    </main>
  );
}
