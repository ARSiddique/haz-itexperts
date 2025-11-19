// app/about/page.js

import PageHero from "@/components/PageHero";

// --- SEO (server-side)
export async function generateMetadata() {
  const title = "About — Supreme IT Experts";
  const description =
    "Learn who we are, what we do, and how we support SMBs with reliable managed IT and cybersecurity.";
  return {
    title,
    description,
    alternates: { canonical: "/about" },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      type: "website",
      url: "/about",
      images: ["/og-image.png?v=7"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png?v=7"],
    },
  };
}

export default function AboutPage() {
  return (
    <>
      {/* Breadcrumbs JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://supremeitexperts.com/" },
              { "@type": "ListItem", position: 2, name: "About", item: "https://supremeitexperts.com/about" }
            ]
          }),
        }}
      />

      <PageHero
        eyebrow="About us"
        title="We treat your IT like mission-critical"
        sub="A small senior team focused on reliability, security and clear communication."
        className="sm:px-5 md:px-6"
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-5 md:px-6 pb-20 space-y-10">
        <section>
          <h2 className="text-xl font-semibold">Who we are</h2>
          <p className="mt-3 text-slate-300 leading-7">
            Supreme IT Experts is a small, senior-led team that helps
            businesses keep their IT stable and secure. We focus on clear
            processes, documentation and simple reporting so owners always
            know what is happening.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">How we work</h2>
          <ul className="mt-3 space-y-2 text-slate-300 text-sm">
            <li>• Security-first configuration for devices, email and accounts.</li>
            <li>• Planned changes with communication before and after work.</li>
            <li>• Simple, fixed-fee support for day-to-day issues.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">What you can expect</h2>
          <p className="mt-3 text-slate-300 text-sm leading-7">
            Our goal is that your IT “just works” so your team can focus on
            customers and growth. When something breaks, you get a clear
            response, a simple explanation and a fix.
          </p>
        </section>
      </main>
    </>
  );
}
