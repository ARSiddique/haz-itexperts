// app/page.js
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { Suspense } from "react";
import HomeFX from "@/components/HomeFX";
import { site } from "@/lib/siteConfig";
import ClientOfferPopup from "@/components/ClientOfferPopup";
import { BASE_URL, BUSINESS_ID } from "@/lib/seoIds";
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

  const baseUrl = String(BASE_URL || site?.url || "https://supremeitexperts.com").replace(
    /\/$/,
    ""
  );

  const canonical = `${baseUrl}/`;

  const baseTitle =
    "Managed IT Services & Cybersecurity in Allentown, Macungie & Emmaus, PA";
  const fullTitle = `${baseTitle} | ${brand}`;

  const description =
    "Managed IT services, 24/7 IT support and cybersecurity for small and mid-sized businesses in Allentown, Macungie & Emmaus. Fixed-fee helpdesk, monitoring, cloud, backup and disaster recovery.";

  return {
    metadataBase: new URL(baseUrl),
    title: { absolute: fullTitle },
    description,
    keywords: [
      "managed IT services Allentown",
      "IT support Allentown PA",
      "managed IT services Macungie",
      "IT support Emmaus PA",
      "small business IT support",
      "cybersecurity services Allentown",
      "managed service provider Allentown",
    ],
    alternates: { canonical },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      type: "website",
      siteName: brand,
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
      title: fullTitle,
      description,
      images: ["/og-image.png?v=7"],
    },
    robots: { index: true, follow: true },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
function Collage({ items = [], priority = false, ratio = "aspect-[16/11] md:aspect-[16/10]" }) {
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
            className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
            sizes="(max-width:768px) 96vw, 560px"
          />
        </div>
      )}

      {items[1] && (
        <div className="absolute right-3 -bottom-5 w-[52%]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 shadow-xl rotate-[1.2deg] group">
            <Image
              src={items[1].src}
              alt={items[1].alt || ""}
              fill
              loading="lazy"
              decoding="async"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              sizes="(max-width:768px) 52vw, 300px"
            />
          </div>
        </div>
      )}
    </div>
  );
}

const Section = ({ id, children, className = "" }) => (
  <section id={id} className="relative scroll-mt-[90px]">
    <div className={`max-w-6xl mx-auto px-4 section-enter ${className}`}>{children}</div>
  </section>
);

const Title = ({ k, sub }) => (
  <div className="mb-5 md:mb-6" data-reveal="up">
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
    <Link href={href} className="block" aria-label={`${t} details`} data-reveal="up">
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
  const areas = site?.areas?.length ? site.areas : ["Allentown, PA", "Macungie, PA", "Emmaus, PA"];
  const brand = site?.name || "Supreme IT Experts";

  const baseUrl = String(BASE_URL || site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/`;

  const WEBSITE_ID = `${baseUrl}/#website`;
  const BREADCRUMB_ID = `${baseUrl}/#breadcrumb`;
  const WEBPAGE_ID = `${baseUrl}/#webpage`;
  const FAQ_ID = `${baseUrl}/#faq`;

  const phoneRaw = site?.phone || "+1 610-500-9209";
  const phoneTel = `tel:${String(phoneRaw).replace(/[^\d+]/g, "")}`;

  const SERVICES = [
    { Icon: Shield, t: "Managed IT", d: "Helpdesk, patching, monitoring, reporting with SLAs.", bullets: ["Helpdesk workflows", "Proactive maintenance", "Monthly KPIs"], href: "/services/managed-it" },
    { Icon: Server, t: "Cybersecurity", d: "EDR/XDR, MFA/SSO, email security, backup/DR, vCISO.", bullets: ["EDR/XDR coverage", "Identity hardening", "BCP/DR playbooks"], href: "/services/cybersecurity" },
    { Icon: Cloud, t: "Cloud & 365/Workspace", d: "Migrations, identity, MDM, cost optimization.", bullets: ["Tenant security", "Licensing hygiene", "MDM baselines"], href: "/services/cloud-workspace" },
    { Icon: Wrench, t: "Projects & Consulting", d: "Audits, office moves, network refresh, server/cloud.", bullets: ["Network redesign", "Server refresh", "Zero-trust rollout"], href: "/services/projects-consulting" },
    { Icon: Smartphone, t: "Device Management", d: "Windows/Mac/iOS/Android baselines + app deploys.", bullets: ["Baseline config", "App catalogs", "Compliance checks"], href: "/services/device-management" },
    { Icon: Users, t: "vCIO / Strategy", d: "Quarterly roadmap, budget planning, measurable KPIs.", bullets: ["Roadmaps", "Budgeting", "Risk register"], href: "/services/vcio-strategy" },
  ];

  const areaLinks = {
    "Allentown, PA": "/locations/allentown-pa",
    "Macungie, PA": "/locations/macungie-pa",
    "Emmaus, PA": "/locations/emmaus-pa",
  };

  const FAQS = [
    {
      q: "What’s included in managed IT services?",
      a: "Our managed IT services typically include helpdesk support, proactive monitoring, patch management, endpoint security baselines, reporting, and an ongoing roadmap aligned with your business goals.",
    },
    {
      q: "Do you provide 24/7 IT support?",
      a: "Yes — we offer 24/7 helpdesk and monitoring for businesses in Allentown, Macungie and Emmaus, with clear SLAs and escalation paths for urgent issues.",
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": WEBPAGE_ID,
        url: canonical,
        name: "Managed IT Services & Cybersecurity in Allentown, Macungie & Emmaus, PA",
        isPartOf: { "@type": "WebSite", "@id": WEBSITE_ID },
        breadcrumb: { "@id": BREADCRUMB_ID },
        about: { "@id": BUSINESS_ID },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: new URL("/og-image.png?v=7", baseUrl).toString(),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": BREADCRUMB_ID,
        itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: canonical }],
      },
      {
        "@type": "FAQPage",
        "@id": FAQ_ID,
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: canonical,
        name: brand,
        publisher: { "@id": BUSINESS_ID },
      },
    ],
  };

  return (
    <div className="relative overflow-hidden bg-[#0b1220]">
      {/* ONE global background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-48 -left-48 size-[520px] rounded-full bg-cyan-500/12 blur-3xl" />
        <div className="absolute top-[18%] -right-56 size-[700px] rounded-full bg-fuchsia-500/12 blur-3xl" />
        <div className="absolute -bottom-72 left-[10%] size-[820px] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(1100px_600px_at_50%_-10%,rgba(56,189,248,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent_30%)]" />
      </div>

      <Script
        id="home-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ClientOfferPopup />

      {/* HERO */}
      <section id="hero" className="relative">
        <div className="max-w-6xl mx-auto px-4 pt-10 pb-10 md:pt-14 md:pb-12 grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-8 md:gap-10 items-center">
          <div className="max-w-[62ch]">
            <div className="text-xs md:text-sm uppercase tracking-[0.2em] text-cyan-300/80">
              Managed IT & cybersecurity for Allentown, Macungie & Emmaus
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold mt-3 leading-[1.06] bg-gradient-to-r from-cyan-300 via-white to-fuchsia-400 bg-clip-text text-transparent">
              Managed IT Services in Allentown, Macungie &amp; Emmaus, PA — Fast, Friendly, Fixed-Fee
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
              partner for small and mid-sized businesses in Allentown, Macungie &amp; Emmaus.
              24/7 helpdesk, proactive monitoring and real security backed by SLAs.
            </p>

            {/* ✅ tighter: keep only one helper line */}
            <div className="mt-3 text-sm text-slate-300">
              Core services:{" "}
              <Link href="/services/managed-it" className="underline decoration-dotted underline-offset-2 hover:text-cyan-300">
                Managed IT
              </Link>
              ,{" "}
              <Link href="/services/cybersecurity" className="underline decoration-dotted underline-offset-2 hover:text-cyan-300">
                Cybersecurity
              </Link>{" "}
              &{" "}
              <Link href="/services/cloud-workspace" className="underline decoration-dotted underline-offset-2 hover:text-cyan-300">
                Cloud & Microsoft 365
              </Link>
              .
            </div>

            {/* CTA row (compact) */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/assessment"
                className="rounded-xl px-5 py-3 font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition text-center"
              >
                {site?.cta || "Get a Free IT Assessment"}
              </Link>

              <Link
                href="/get-quote"
                className="rounded-xl px-5 py-3 font-semibold bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition text-center"
              >
                Pricing &amp; Quote
              </Link>

              <a
                href={phoneTel}
                className="rounded-xl px-5 py-3 font-semibold bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition inline-flex items-center justify-center gap-2"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </a>
            </div>

            <div className="mt-3 text-xs text-slate-400">
              No pressure. Quick 15-min call to map risks + next steps.
            </div>

            {/* stats (slightly tighter) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
              <Stat k="<15 min" v="P1 response target" />
              <Stat k="99.9%" v="EDR/XDR coverage target" />
              <Stat k="24/7" v="Helpdesk & monitoring" />
            </div>

            <div className="mt-5">
              <a
                href="#services"
                className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-cyan-300 transition group"
              >
                Explore IT services{" "}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          <div className="lg:pl-2">
            <Collage
              items={[
                { src: "/media/hero-1.jpg", alt: "Network and cabling for managed IT environments" },
                { src: "/media/hero-2.jpg", alt: "Cloud and devices managed by an MSP" },
              ]}
              ratio="aspect-[16/11] md:aspect-[16/10]"
              priority
            />
          </div>
        </div>

        {/* small divider + tighter transition */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/35 to-transparent" />
      </section>

      {/* ABOUT (tightened so “empty space” feel khatam) */}
      <Section id="about" className="pt-10 pb-12 md:pt-12 md:pb-14">
        <Title k="About" sub="We keep your business running with managed IT and real security" />

        <p className="text-slate-300 max-w-3xl" data-reveal="up">
          We act as your IT department, or augment your in-house team, with{" "}
          <Link href="/services/managed-it" className="underline decoration-dotted underline-offset-2 hover:text-cyan-300">
            managed IT services
          </Link>
          ,{" "}
          <Link href="/services/cybersecurity" className="underline decoration-dotted underline-offset-2 hover:text-cyan-300">
            cybersecurity
          </Link>
          , real SLAs, documented SOPs and transparent reporting leadership actually reads.
        </p>

        <div className="grid md:grid-cols-2 gap-8 items-center mt-7">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
              ]}
              ratio="aspect-[4/3] md:aspect-[16/11]"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3" data-reveal="up">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:border-cyan-300/30 hover:bg-cyan-400/10 hover:text-cyan-300 transition"
          >
            More about us <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/assessment"
            className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
          >
            {site?.cta || "Free IT Assessment"} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* SERVICES */}
      <Section id="services" className="py-12 md:py-14">
        <Title k="Services" sub="Managed IT, IT support & cybersecurity for SMBs" />
        <p className="text-slate-300 max-w-3xl" data-reveal="up">
          Choose fully-managed or co-managed IT with our{" "}
          <Link href="/services" className="underline decoration-dotted underline-offset-2 hover:text-cyan-300">
            managed IT service plans
          </Link>
          . We’ll meet you where you are and raise your security and support baseline fast.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {SERVICES.map((p) => (
            <ServiceCard key={p.t} {...p} />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3" data-reveal="up">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:border-cyan-300/30 hover:bg-cyan-400/10 hover:text-cyan-300 transition"
          >
            All service details <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/get-quote"
            className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:border-cyan-300/30 hover:bg-white/10 transition"
          >
            Pricing &amp; Quote <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/assessment"
            className="inline-flex items-center gap-2 text-sm rounded-lg px-3 py-2 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
          >
            {site?.cta || "Free IT Assessment"} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* CASE STUDIES */}
      <Section id="wins" className="py-12 md:py-14">
        <Title k="Case Studies" sub="Outcomes your team actually feels" />
        <div className="grid md:grid-cols-3 gap-6">
          <div data-reveal="up">
            <Collage items={[{ src: "/media/work-1.jpg", alt: "Onsite IT cabling work" }, { src: "/media/rack.jpg", alt: "Network rack after cleanup" }]} />
            <div className="mt-3">
              <h3 className="font-medium">Faster P1 handling</h3>
              <p className="text-sm text-slate-300">First response down to ≤12 min with SOPs and queue hygiene.</p>
            </div>
          </div>

          <div data-reveal="up">
            <Collage items={[{ src: "/media/dashboard.jpg", alt: "Monitoring tools for managed IT services" }]} />
            <div className="mt-3">
              <h3 className="font-medium">Fleet visibility</h3>
              <p className="text-sm text-slate-300">Strong endpoint visibility + leadership KPIs that tell the truth.</p>
            </div>
          </div>

          <div data-reveal="up">
            <Collage items={[{ src: "/media/team.jpg", alt: "IT support team collaborating" }, { src: "/media/work-2.jpg", alt: "Technician working onsite" }]} />
            <div className="mt-3">
              <h3 className="font-medium">Onboarding without chaos</h3>
              <p className="text-sm text-slate-300">MDM baselines in 10 days; predictable new-hire workflow.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* PROCESS */}
      <Section id="process" className="py-12 md:py-14">
        <Title k="Process" sub="A simple, measurable onboarding" />
        <div className="grid md:grid-cols-2 gap-10">
          <ol className="relative border-s border-white/10 ps-6 space-y-7" data-reveal="up">
            {[
              { icon: Cpu, title: "Assess", text: "Light discovery of users, devices, identity and risks in your current IT environment." },
              { icon: Lock, title: "Stabilize", text: "Patch, endpoint protection, baselines for M365/Google and backup/DR so IT is secure and predictable." },
              { icon: LineChart, title: "Optimize", text: "Helpdesk SLAs, workflows, reporting and roadmap alignment with leadership." },
              { icon: Server, title: "Grow", text: "New hires, office moves, cloud projects — predictable outcomes with clear ownership." },
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

          <div className="rounded-2xl overflow-hidden border border-white/10 group" data-parallax="y" data-speed="0.1" data-reveal="up">
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
          Have questions? Check our{" "}
          <Link href="/faqs" className="underline decoration-dotted underline-offset-2 hover:text-cyan-300">
            FAQs
          </Link>{" "}
          or{" "}
          <Link href="/contact" className="underline decoration-dotted underline-offset-2 hover:text-cyan-300">
            contact us
          </Link>
          .
        </p>
      </Section>

      {/* TRUST */}
      <Section id="trust" className="py-12 md:py-14">
        <Title k="Trust" sub="Security-first and SLA-backed" />
        <div className="grid md:grid-cols-3 gap-4">
          {[
            ["SLA", "P1 ≤ 15 min (target), P2 ≤ 1 hr, P3 same day"],
            ["Coverage", "EDR/XDR coverage targets on managed endpoints"],
            ["MDM", "Windows/Mac/iOS/Android baselines & compliance"],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5" data-reveal="up">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                <h3 className="font-medium">{t}</h3>
              </div>
              <p className="text-sm text-slate-300 mt-1">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" className="py-12 md:py-14">
        <Title k="FAQs" sub="Quick answers before you book a call" />
        <div className="grid md:grid-cols-2 gap-4">
          {FAQS.map((f) => (
            <div key={f.q} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5" data-reveal="up">
              <h3 className="font-semibold">{f.q}</h3>
              <p className="mt-2 text-sm text-slate-300">{f.a}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* GALLERY */}
      <Section id="gallery" className="py-12 md:py-14">
        <Title k="Gallery" sub="Real work. Real environments." />
        <div className="grid md:grid-cols-3 gap-4">
          {[
            ["/media/hero-1.jpg", "Fiber and cabling work for business networks"],
            ["/media/rack.jpg", "Tidy network rack in a small business"],
            ["/media/dashboard.jpg", "Monitoring dashboard for managed IT services"],
          ].map(([src, cap]) => (
            <figure key={src} className="rounded-2xl overflow-hidden border border-white/10 bg-white/5" data-reveal="up">
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

      {/* AREAS */}
      <Section id="areas" className="py-12 md:py-14">
        <Title k="Areas we serve" sub="Onsite & remote IT support in Allentown, Macungie & Emmaus" />

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
      </Section>

      {/* FINAL CTA (no WhatsApp/email here — clean) */}
      <Section id="cta" className="py-12 md:py-14">
        <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 md:p-10 overflow-hidden relative" data-reveal="up">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -right-24 size-[360px] rounded-full bg-cyan-500/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 size-[420px] rounded-full bg-fuchsia-500/10 blur-3xl" />
          </div>

          <div className="relative">
            <div className="text-xs md:text-sm uppercase tracking-[0.2em] text-cyan-300/80">
              Ready to tighten IT and security?
            </div>
            <h2 className="mt-3 text-2xl md:text-4xl font-extrabold leading-tight text-slate-100">
              Get a clear plan for your IT — fast response, real SLAs, predictable costs.
            </h2>
            <p className="mt-3 text-slate-300 max-w-3xl">
              Start with a quick assessment and we’ll map gaps, risks, and next steps.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/assessment"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
              >
                {site?.cta || "Get a Free IT Assessment"} <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href={phoneTel}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </a>

              <Link
                href="/get-quote"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition"
              >
                Pricing &amp; Quote <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Suspense fallback={null}>
        <HomeFX />
      </Suspense>
    </div>
  );
}
