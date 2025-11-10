// app/faqs/page.jsx
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "FAQs — Supreme IT Experts",
  description:
    "Short answers to common questions about our managed IT and cybersecurity services.",
};

const FAQS = [
  {
    q: "What types of businesses do you work with?",
    a: "We mainly support small and mid-sized organisations that need reliable IT, basic cybersecurity and a friendly support team.",
  },
  {
    q: "Do you support remote and in-office teams?",
    a: "Yes. We help with laptops, desktops, VPNs, cloud tools and basic security for people working from home or in the office.",
  },
  {
    q: "Can you help if we already have an internal IT person?",
    a: "Yes. We can work alongside an in-house IT contact to handle monitoring, patching, security tools and documentation.",
  },
  {
    q: "Is there a long-term contract?",
    a: "Most customers work with us on a rolling agreement. Terms are kept simple and clear so there are no surprises.",
  },
  {
    q: "How do we get started?",
    a: "Send us a short email or give us a call. We will ask a few questions about your team and systems, then suggest a simple next step.",
  },
];

export default function FaqsPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQs"
        title="Common questions"
        sub="Straightforward answers about how we work and what we provide."
      />

      <main className="max-w-4xl mx-auto px-4 pb-20">
        <div className="rounded-2xl border border-white/10 bg-white/5 divide-y divide-white/10">
          {FAQS.map((item, i) => (
            <details key={i} className="group px-4 md:px-6 py-4">
              <summary className="cursor-pointer list-none flex items-center justify-between gap-3">
                <h3 className="font-medium leading-snug">{item.q}</h3>
                <span className="text-xs text-slate-400 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="mt-3 text-sm text-slate-300">{item.a}</p>
            </details>
          ))}
        </div>

        <p className="mt-8 text-sm text-slate-400">
          If your question is not listed here, please email or call us and we’ll be happy
          to help.
        </p>
      </main>
    </>
  );
}
