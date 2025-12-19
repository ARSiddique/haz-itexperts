// app/page.js
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import HomeFX from "@/components/HomeFX";
import { site } from "@/lib/siteConfig";
import ClientOfferPopup from "@/components/ClientOfferPopup";
import {
  Shield,
  Server,
  Cloud,
  Wrench,
  Smartphone,
  Users,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Lock,
  LineChart,
  Image as ImageIcon,
  Sparkles,
  Phone,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// SEO (server-side)
// ─────────────────────────────────────────────────────────────────────────────
export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const siteUrl = site?.url || "https://supremeitexperts.com";

  const baseTitle =
    "Managed IT Services & Cybersecurity in Allentown & Lehigh Valley, PA";
  const title = `${baseTitle} | ${brand}`;
  const description =
    "Managed IT services, 24/7 IT support and cybersecurity for small and mid-sized businesses in Allentown and the Lehigh Valley (Macungie, Emmaus). Fixed-fee helpdesk, monitoring, cloud, backup and disaster recovery.";

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords: [
      "managed IT services Allentown",
      "IT support Allentown PA",
      "managed service provider Lehigh Valley",
      "small business IT support",
      "cybersecurity services Allentown",
    ],
    alternates: { canonical: "/" },
    openGraph: {
      title,
      description,
      url: "/",
      type: "website",
      images: [
        {
          url: "/og-image.png?v=7",
          width: 1200,
          height: 630,
          alt: `${brand} — Managed IT Services`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png?v=7"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Small presentational helpers
// ─────────────────────────────────────────────────────────────────────────────
function Collage({
  items = [],
  priority = false,
  ratio = "aspect-[16/10] md:aspect-[16/9]",
}) {
  return (
    <div className={`relative ${ratio}`} data-reveal="up">
      {items[0] && (
        <div className="absolute inset-0 overflow-hidden rounded-2xl border border-white/10 bg-black/20 group">
          <Image
            src={items[0].src}
            alt={items[0].alt || ""}
            fill
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(max-width:768px) 96vw, 560px"
          />
        </div>
      )}
      {items[1] && (
        <div className="absolute right-3 -bottom-6 w-1/2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 shadow-xl rotate-[1.5deg] group">
            <Image
              src={items[1].src}
              alt={items[1].alt || ""}
              fill
              loading="lazy"
              decoding="async"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              sizes="(max-width:768px) 48vw, 280px"
            />
          </div>
        </div>
      )}
      {items[2] && (
        <div className="absolute -left-4 top-6 w-1/3">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 shadow-lg -rotate-[2deg] group">
            <Image
              src={items[2].src}
              alt={items[2].alt || ""}
              fill
              loading="lazy"
              decoding="async"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
              sizes="(max-width:768px) 32vw, 180px"
            />
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * ✅ Seamless Section:
 * - no per-section blobs / overlays
 * - only spacing + container
 */
const Section = ({ id, children, className = "" }) => (
  <section id={id} className="relative">
    <div className={`max-w-6xl mx-auto px-4 section-enter ${className}`}>
      {children}
    </div>
  </section>
);

const Title = ({ k, sub }) => (
  <div className="mb-6" data-reveal="up">
    <div className="text-xs md:text-sm uppercase tracking-[0.2em] text-cyan-300/80">
      {k}
    </div>
    <h2 className="text-3xl md:text-5xl font-extrabold leading-tight bg-gradient-to-r from-cyan-300 via-white to-fuchsia-400 bg-clip-text text-transparent">
      {sub}
    </h2>
  </div>
);

const Stat = ({ k, v }) => (
  <div
    className="rounded-xl border border-white/10 bg-white/[0.06] p-4 text-center transition hover:-translate-y-0.5 hover:border-cyan-300/30"
    data-reveal="up"
  >
    <div className="text-xl font-bold text-cyan-300">{k}</div>
    <div className="text-slate-300 text-xs">{v}</div>
  </div>
);

// linked service card (deep pages)
const ServiceCard = ({ Icon, t, d, bullets = [], href }) => {
  const Card = (
    <div className="group p-6 rounded-2xl bg-white/[0.06] border border-white/10 transition hover:-translate-y-1 hover:shadow-xl hover:border-cyan-300/30">
      <div className="flex items-center gap-3">
        <span className="grid place-items-center size-10 rounded-xl bg-cyan-400/10 border border-cyan-300/20">
          <Icon className="h-5 w-5 text-cyan-300" />
        </span>
        <h3 className="font-semibold text-lg">{t}</h3>
      </div>
      <p className="text-sm text-slate-300 mt-2">{d}</p>
      {!!bullets.length && (
        <ul className="mt-3 space-y-1">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2 text-sm text-slate-300">
              <Sparkles className="h-4 w-4 text-cyan-300" /> {b}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 inline-flex items-center gap-2 text-sm text-cyan-300">
        View details <ArrowRight className="h-4 w-4" />
      </div>
    </div>
  );

  return href ? (
    <Link href={href} className="block" aria-label={`${t} details`}>
      {Card}
    </Link>
  ) : (
    <div data-reveal="up">{Card}</div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const areas = site?.areas?.length
    ? site.areas
    : ["Allentown, PA", "Macungie, PA", "Emmaus, PA", "Lehigh Valley, PA"];

  const brand = site?.name || "Supreme IT Experts";
  const SITE_URL = site?.url || "https://supremeitexperts.com";

  // ✅ schema sameAs should be an array (site.socials is usually an object)
  const sameAs = Object.values(site?.socials || {}).filter(Boolean);

  const phoneRaw = site?.phone || "+1-610-500-9209";
  const phoneTel = `tel:${String(phoneRaw).replace(/[^\d+]/g, "")}`;

  const SERVICES = [
    {
      Icon: Shield,
      t: "Managed IT",
      d: "Helpdesk, patching, monitoring, reporting with SLAs.",
      bullets: ["Helpdesk workflows", "Proactive maintenance", "Monthly KPIs"],
      href: "/services/managed-it",
    },
    {
      Icon: Server,
      t: "Cybersecurity",
      d: "EDR/XDR, MFA/SSO, email security, backup/DR, vCISO.",
      bullets: ["EDR/XDR coverage", "Identity hardening", "BCP/DR playbooks"],
      href: "/services/cybersecurity",
    },
    {
      Icon: Cloud,
      t: "Cloud & 365/Workspace",
      d: "Migrations, identity, MDM, cost optimization.",
      bullets: ["Tenant security", "Licensing hygiene", "MDM baselines"],
      href: "/services/cloud-workspace",
    },
    {
      Icon: Wrench,
      t: "Projects & Consulting",
      d: "Audits, office moves, network refresh, server/cloud.",
      bullets: ["Network redesign", "Server refresh", "Zero-trust rollout"],
      href: "/services/projects-consulting",
    },
    {
      Icon: Smartphone,
      t: "Device Management",
      d: "Windows/Mac/iOS/Android baselines + app deploys.",
      bullets: ["Baseline config", "App catalogs", "Compliance checks"],
      href: "/services/device-management",
    },
    {
      Icon: Users,
      t: "vCIO / Strategy",
      d: "Quarterly roadmap, budget planning, measurable KPIs.",
      bullets: ["Roadmaps", "Budgeting", "Risk register"],
      href: "/services/vcio-strategy",
    },
  ];

  // Areas → internal links (SEO boost)
  const areaLinks = {
    "Allentown, PA": "/locations/allentown-pa",
    "Macungie, PA": "/locations/macungie-pa",
    "Emmaus, PA": "/locations/emmaus-pa",
    "Lehigh Valley, PA": "/areas",
  };

  // FAQ (Home) — on-page + FAQPage schema
  const FAQS = [
    {
      q: "What’s included in managed IT services?",
      a: "Our managed IT services typically include helpdesk support, proactive monitoring, patch management, endpoint security baselines, reporting, and an ongoing roadmap aligned with your business goals.",
    },
    {
      q: "Do you provide 24/7 IT support?",
      a: "Yes — we offer 24/7 helpdesk and monitoring for businesses in Allentown and the Lehigh Valley, with clear SLAs and escalation paths for urgent issues.",
    },
    {
      q: "Do you support both Windows and Mac environments?",
      a: "Yes. We support mixed environments (Windows and macOS) and can manage iOS/Android devices with MDM baselines, compliance checks, and app deployment.",
    },
    {
      q: "How fast is your response time?",
      a: "Response time depends on priority. We use SLAs and ticket triage so high-impact issues are handled first, with clear communication and ownership until resolution.",
    },
    {
      q: "Can you help us improve cybersecurity quickly?",
      a: "Yes. We can rapidly strengthen identity and endpoint security with MFA/SSO guidance, endpoint protection (EDR/XDR where appropriate), email security, and backup/DR planning.",
    },
  ];

  // JSON-LD objects (WebSite + Organization + LocalBusiness/ITService + WebPage + FAQPage + BreadcrumbList)
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: brand,
      url: `${SITE_URL}/`,
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: brand,
      url: `${SITE_URL}/`,
      sameAs,
      logo: `${SITE_URL}/logo.png`,
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: phoneRaw,
          contactType: "customer service",
          areaServed: areas,
          availableLanguage: ["en"],
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "ITService"],
      "@id": `${SITE_URL}/#localbusiness`,
      name: brand,
      url: `${SITE_URL}/`,
      description:
        "Managed IT services and cybersecurity for small and mid-sized businesses in Allentown and the Lehigh Valley, PA.",
      telephone: phoneRaw,
      priceRange: "$$",
      areaServed: areas,
      logo: `${SITE_URL}/logo.png`,
      image: [`${SITE_URL}/og-image.png?v=7`],
      // NOTE: Add full address ONLY if you have a real public address
      // address: {
      //   "@type": "PostalAddress",
      //   streetAddress: "123 Main St",
      //   addressLocality: "Allentown",
      //   addressRegion: "PA",
      //   postalCode: "18101",
      //   addressCountry: "US",
      // },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: "Managed IT Services & Cybersecurity in Allentown & Lehigh Valley, PA",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#localbusiness` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${SITE_URL}/og-image.png?v=7`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${SITE_URL}/`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.a,
        },
      })),
    },
  ];

  return (
    <div className="relative overflow-hidden bg-[#0b1220]">
      {/* ✅ ONE global background for whole page (seamless) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-48 -left-48 size-[520px] rounded-full bg-cyan-500/12 blur-3xl" />
        <div className="absolute top-[18%] -right-56 size-[700px] rounded-full bg-fuchsia-500/12 blur-3xl" />
        <div className="absolute -bottom-72 left-[10%] size-[820px] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(1100px_600px_at_50%_-10%,rgba(56,189,248,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent_30%)]" />
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      {/* Popup – client component */}
      <ClientOfferPopup />

      {/* ───────────── HERO ───────────── */}
      <section id="hero" className="relative">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-12 items-center">
          <div className="max-w-[62ch]">
            <div className="text-xs md:text-sm uppercase tracking-[0.2em] text-cyan-300/80">
              Managed IT & cybersecurity for Allentown & the Lehigh Valley
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold mt-3 leading-[1.06] bg-gradient-to-r from-cyan-300 via-white to-fuchsia-400 bg-clip-text text-transparent">
              Managed IT Services in Allentown &amp; Lehigh Valley, PA — Fast,
              Friendly, Fixed-Fee
            </h1>

            <p className="mt-4 text-base md:text-lg text-slate-200">
              {brand} is a local{" "}
              <Link
                href="/services/managed-it"
                className="underline decoration-dotted underline-offset-2 hover:text-cyan-300"
              >
                managed IT services
              </Link>{" "}
              and{" "}
              <Link
                href="/services/cybersecurity"
                className="underline decoration-dotted underline-offset-2 hover:text-cyan-300"
              >
                cybersecurity
              </Link>{" "}
              partner for small and mid-sized businesses in Allentown, Macungie
              &amp; Emmaus. 24/7 helpdesk, proactive monitoring and real
              security backed by SLAs.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/get-quote"
                className="rounded-lg px-5 py-3 font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
              >
                Get a Quote
              </Link>

              <a
                href="#services"
                className="rounded-lg px-5 py-3 font-semibold bg-white/5 ring-1 ring-white/10 hover:bg-white/10 inline-flex items-center gap-2 group"
              >
                Explore IT services{" "}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-10">
              <Stat k="<15 min" v="P1 response target" />
              <Stat k="99.9%" v="EDR/XDR coverage target" />
              <Stat k="24/7" v="Helpdesk & monitoring" />
            </div>
          </div>

          <div className="lg:pl-2">
            <Collage
              items={[
                {
                  src: "/media/hero-1.jpg",
                  alt: "Network and cabling for managed IT environments",
                },
                {
                  src: "/media/hero-2.jpg",
                  alt: "Cloud and devices managed by an MSP",
                },
              ]}
              ratio="aspect-[16/10] md:aspect-[16/9]"
              priority
            />
          </div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      </section>

      {/* ───────────── ABOUT ───────────── */}
      <Section id="about" className="py-16">
        <Title
          k="About"
          sub="We keep your business running with managed IT and real security"
        />
        <p className="text-slate-300 max-w-3xl" data-reveal="up">
          We act as your IT department, or augment your in-house team, with{" "}
          <Link
            href="/services/managed-it"
            className="underline decoration-dotted underline-offset-2 hover:text-cyan-300"
          >
            managed IT services
          </Link>
          ,{" "}
          <Link
            href="/services/cybersecurity"
            className="underline decoration-dotted underline-offset-2 hover:text-cyan-300"
          >
            cybersecurity
          </Link>
          , real SLAs, documented SOPs and transparent reporting leadership
          actually reads.
        </p>

        <div className="grid md:grid-cols-2 gap-10 items-center mt-8">
          <div className="grid grid-cols-3 gap-3">
            {[
              ["Playbooks", "Documented SOPs for repeatable results"],
              ["Visibility", "Monthly KPIs leadership actually reads"],
              ["Security-first", "Baseline hardening + EDR/XDR + backup/DR"],
            ].map(([t, d]) => (
              <div
                key={t}
                className="rounded-xl border border-white/10 bg-white/5 p-4 transition hover:-translate-y-0.5 hover:border-cyan-300/30"
                data-reveal="up"
              >
                <h3 className="font-medium text-sm">{t}</h3>
                <p className="text-slate-300 text-xs mt-1">{d}</p>
              </div>
            ))}
          </div>

          <div data-parallax="y" data-speed="0.12">
            <Collage
              items={[
                { src: "/media/rack.jpg", alt: "Server rack and network gear" },
                { src: "/media/dashboard.jpg", alt: "IT monitoring dashboard" },
                { src: "/media/team.jpg", alt: "IT support team at work" },
              ]}
              ratio="aspect-[4/3] md:aspect-[16/10]"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3" data-reveal="up">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:border-cyan-300/30 hover:bg-cyan-400/10 hover:text-cyan-300 transition"
          >
            More about us <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/assessment"
            className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:border-cyan-300/30 hover:bg-cyan-400/10 hover:text-cyan-300 transition"
          >
            Free IT Assessment <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* ───────────── SERVICES ───────────── */}
      <Section id="services" className="py-16">
        <Title
          k="Services"
          sub="Managed IT, IT support & cybersecurity for SMBs"
        />
        <p className="text-slate-300 max-w-3xl" data-reveal="up">
          Choose fully-managed or co-managed IT with our{" "}
          <Link
            href="/services"
            className="underline decoration-dotted underline-offset-2 hover:text-cyan-300"
          >
            managed IT service plans
          </Link>
          . We’ll meet you where you are and raise your security and support
          baseline fast.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {SERVICES.map((p) => (
            <ServiceCard key={p.t} {...p} />
          ))}
        </div>

        <div className="mt-8 flex gap-3" data-reveal="up">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:border-cyan-300/30 hover:bg-cyan-400/10 hover:text-cyan-300 transition"
          >
            All service details <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/get-quote"
            className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
          >
            Pricing & Quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* ───────────── CASE STUDIES ───────────── */}
      <Section id="wins" className="py-16">
        <Title k="Case Studies" sub="Outcomes your team actually feels" />
        <div className="grid md:grid-cols-3 gap-6">
          <div data-reveal="up">
            <Collage
              items={[
                { src: "/media/work-1.jpg", alt: "Onsite IT cabling work" },
                { src: "/media/rack.jpg", alt: "Network rack after cleanup" },
              ]}
            />
            <div className="mt-3">
              <h3 className="font-medium">Faster P1 handling</h3>
              <p className="text-sm text-slate-300">
                First response down to ≤12 min with SOPs and queue hygiene.
              </p>
            </div>
          </div>

          <div data-reveal="up">
            <Collage
              items={[
                {
                  src: "/media/dashboard.jpg",
                  alt: "Monitoring tools for managed IT services",
                },
              ]}
            />
            <div className="mt-3">
              <h3 className="font-medium">Fleet visibility</h3>
              <p className="text-sm text-slate-300">
                Strong endpoint visibility + leadership KPIs that tell the truth.
              </p>
            </div>
          </div>

          <div data-reveal="up">
            <Collage
              items={[
                { src: "/media/team.jpg", alt: "IT support team collaborating" },
                { src: "/media/work-2.jpg", alt: "Technician working onsite" },
                { src: "/media/hero-2.jpg", alt: "Cloud-focused IT setup" },
              ]}
            />
            <div className="mt-3">
              <h3 className="font-medium">Onboarding without chaos</h3>
              <p className="text-sm text-slate-300">
                MDM baselines in 10 days; predictable new-hire workflow.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ───────────── PROCESS ───────────── */}
      <Section id="process" className="py-16">
        <Title k="Process" sub="A simple, measurable onboarding" />
        <div className="grid md:grid-cols-2 gap-10">
          <ol
            className="relative border-s border-white/10 ps-6 space-y-8"
            data-reveal="up"
          >
            {[
              {
                icon: Cpu,
                title: "Assess",
                text: "Light discovery of users, devices, identity and risks in your current IT environment.",
              },
              {
                icon: Lock,
                title: "Stabilize",
                text: "Patch, endpoint protection, baselines for M365/Google and backup/DR so your IT is secure and predictable.",
              },
              {
                icon: LineChart,
                title: "Optimize",
                text: "Helpdesk SLAs, workflows, reporting and roadmap alignment with leadership.",
              },
              {
                icon: Server,
                title: "Grow",
                text: "New hires, office moves, cloud projects — predictable outcomes with clear ownership.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <li key={title} className="ms-2">
                <span className="absolute -start-3.5 mt-1 grid place-items-center size-6 rounded-full bg-cyan-400/20 border border-cyan-300/40">
                  <Icon className="h-3.5 w-3.5 text-cyan-300" />
                </span>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-0.5 hover:border-cyan-300/30">
                  <div className="font-semibold">{title}</div>
                  <p className="text-sm text-slate-300 mt-1">{text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div
            className="rounded-2xl overflow-hidden border border-white/10 group"
            data-parallax="y"
            data-speed="0.1"
            data-reveal="up"
          >
            <div className="relative w-full aspect-[16/16]">
              <Image
                src="/media/work-2.jpg"
                alt="Technician delivering onsite IT support"
                fill
                loading="lazy"
                decoding="async"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                sizes="(max-width:768px) 96vw, 640px"
              />
            </div>
          </div>
        </div>

        <p className="mt-6 text-sm text-slate-400 max-w-3xl" data-reveal="up">
          Have questions about how our managed IT services work? Check our{" "}
          <Link
            href="/faqs"
            className="underline decoration-dotted underline-offset-2 hover:text-cyan-300"
          >
            FAQs
          </Link>{" "}
          or{" "}
          <Link
            href="/contact"
            className="underline decoration-dotted underline-offset-2 hover:text-cyan-300"
          >
            contact us
          </Link>{" "}
          for a quick, no-pressure conversation.
        </p>
      </Section>

      {/* ───────────── TRUST ───────────── */}
      <Section id="trust" className="py-16">
        <Title k="Trust" sub="Security-first and SLA-backed" />
        <div className="grid md:grid-cols-3 gap-4">
          {[
            ["SLA", "P1 ≤ 15 min (target), P2 ≤ 1 hr, P3 same day"],
            ["Coverage", "EDR/XDR coverage targets on managed endpoints"],
            ["MDM", "Windows/Mac/iOS/Android baselines & compliance"],
          ].map(([t, d]) => (
            <div
              key={t}
              className="rounded-2xl border border-white/10 bg-white/[0.06] p-5"
              data-reveal="up"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                <h3 className="font-medium">{t}</h3>
              </div>
              <p className="text-sm text-slate-300 mt-1">{d}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-slate-400 max-w-3xl" data-reveal="up">
          Want a deeper look at our security stack? See our{" "}
          <Link
            href="/services/cybersecurity"
            className="underline decoration-dotted underline-offset-2 hover:text-cyan-300"
          >
            cybersecurity services
          </Link>{" "}
          or{" "}
          <Link
            href="/faqs"
            className="underline decoration-dotted underline-offset-2 hover:text-cyan-300"
          >
            IT services FAQs
          </Link>
          .
        </p>
      </Section>

      {/* ───────────── FAQ ───────────── */}
      <Section id="faq" className="py-16">
        <Title k="FAQs" sub="Quick answers before you book a call" />

        <div className="grid md:grid-cols-2 gap-4">
          {FAQS.map((f) => (
            <div
              key={f.q}
              className="rounded-2xl border border-white/10 bg-white/[0.06] p-5"
              data-reveal="up"
            >
              <h3 className="font-semibold">{f.q}</h3>
              <p className="mt-2 text-sm text-slate-300">{f.a}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-slate-400 max-w-3xl" data-reveal="up">
          Still not sure what you need?{" "}
          <Link
            href="/contact"
            className="underline decoration-dotted underline-offset-2 hover:text-cyan-300"
          >
            Contact us
          </Link>{" "}
          or{" "}
          <Link
            href="/get-quote"
            className="underline decoration-dotted underline-offset-2 hover:text-cyan-300"
          >
            request a quote
          </Link>
          .
        </p>
      </Section>

      {/* ───────────── GALLERY ───────────── */}
      <Section id="gallery" className="py-16">
        <Title k="Gallery" sub="Real work. Real environments." />
        <div className="grid md:grid-cols-3 gap-4">
          {[
            ["/media/hero-1.jpg", "Fiber and cabling work for business networks"],
            ["/media/rack.jpg", "Tidy network rack in a small business"],
            [
              "/media/dashboard.jpg",
              "Monitoring dashboard for managed IT services",
            ],
          ].map(([src, cap]) => (
            <figure
              key={src}
              className="rounded-2xl overflow-hidden border border-white/10 bg-white/5"
              data-reveal="up"
            >
              <div className="relative w-full aspect-[3/2] md:aspect-[16/10] group">
                <Image
                  src={src}
                  alt={cap}
                  fill
                  loading="lazy"
                  decoding="async"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  sizes="(max-width:768px) 96vw, 33vw"
                />
              </div>
              <figcaption className="px-3 py-2 text-xs text-slate-300 flex items-center gap-2">
                <ImageIcon className="h-3.5 w-3.5 text-cyan-300" /> {cap}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-6" data-reveal="up">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:border-cyan-300/30 hover:bg-cyan-400/10 hover:text-cyan-300 transition"
          >
            View full gallery <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* ───────────── AREAS ───────────── */}
      <Section id="areas" className="py-16">
        <Title
          k="Areas we serve"
          sub="Onsite & remote IT support in Allentown & the Lehigh Valley"
        />

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {areas.map((a) => {
            const href = areaLinks[a] || "/areas";
            return (
              <Link
                key={a}
                href={href}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center transition hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-cyan-400/5"
                data-reveal="up"
                aria-label={`IT services in ${a}`}
              >
                <h3 className="font-medium">{a}</h3>
                <div className="mt-1 text-xs text-slate-400">
                  View local coverage <span className="text-cyan-300">→</span>
                </div>
              </Link>
            );
          })}
        </div>

        <p className="mt-6 text-sm text-slate-400 max-w-3xl" data-reveal="up">
          If you’re based in or around these locations and need a responsive IT
          support partner,{" "}
          <Link
            href="/contact"
            className="underline decoration-dotted underline-offset-2 hover:text-cyan-300"
          >
            contact us
          </Link>{" "}
          or{" "}
          <Link
            href="/get-quote"
            className="underline decoration-dotted underline-offset-2 hover:text-cyan-300"
          >
            request a quote
          </Link>
          .
        </p>

        <div className="mt-6" data-reveal="up">
          <Link
            href="/areas"
            className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:border-cyan-300/30 hover:bg-cyan-400/10 hover:text-cyan-300 transition"
          >
            See coverage map <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* ───────────── FINAL CTA ───────────── */}
      <Section id="cta" className="py-16">
        <div
          className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 md:p-10 overflow-hidden relative"
          data-reveal="up"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -right-24 size-[360px] rounded-full bg-cyan-500/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 size-[420px] rounded-full bg-fuchsia-500/10 blur-3xl" />
          </div>

          <div className="relative">
            <div className="text-xs md:text-sm uppercase tracking-[0.2em] text-cyan-300/80">
              Ready to tighten IT and security?
            </div>
            <h2 className="mt-3 text-2xl md:text-4xl font-extrabold leading-tight text-slate-100">
              Get a clear plan for your IT — fast response, real SLAs,
              predictable costs.
            </h2>
            <p className="mt-3 text-slate-300 max-w-3xl">
              Request a quote, run a quick assessment, or just call — we’ll map
              gaps and give you next steps.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/get-quote"
                className="inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
              >
                Get a Quote <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/assessment"
                className="inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 font-semibold bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition"
              >
                Free IT Assessment <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href={phoneTel}
                className="inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 font-semibold bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition"
              >
                <Phone className="h-4 w-4" />
                Call {phoneRaw}
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* FX (scroll / cursor stuff) */}
      <Suspense fallback={null}>
        <HomeFX />
      </Suspense>
    </div>
  );
}
