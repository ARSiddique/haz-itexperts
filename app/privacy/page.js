// app/privacy/page.js
import TrackedEmailLink from "@/components/TrackedEmailLink";

export const metadata = { title: "Privacy Policy" };

export default function Page() {
  const source = "privacy";
  const email = "support@supremeitexperts.com";

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 24, lineHeight: 1.6 }}>
      <h1>Privacy Policy</h1>
      <p>
        We collect only the information needed to respond to inquiries and deliver managed IT services.
        We do not sell personal data. For any request regarding your data, email{" "}
        <TrackedEmailLink email={email} source={source}>
          {email}
        </TrackedEmailLink>.
      </p>
    </main>
  );
}
