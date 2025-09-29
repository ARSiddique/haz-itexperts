"use client";
import * as Accordion from "@radix-ui/react-accordion";
const faqs=[
  {q:"Fully-managed vs Co-managed IT?",a:"Fully-managed: we run helpdesk, monitoring, security end-to-end. Co-managed: we augment your in-house IT."},
  {q:"Response SLAs?",a:"P1 ≤ 15 min · P2 ≤ 1 hr · P3 same business day."},
  {q:"Minimum users?",a:"Typically 10+ users; smaller teams on review."},
  {q:"Tooling included?",a:"Yes—EDR/XDR, patching, monitoring, email security, backup/DR."},
  {q:"Contract terms?",a:"Monthly (30-day cancellation) or annual discounts."},
];
export default function FAQ(){
  return (
    <Accordion.Root type="single" collapsible className="w-full">
      {faqs.map((f,i)=>(
        <Accordion.Item key={i} value={`i-${i}`} className="border-b border-white/10">
          <Accordion.Header>
            <Accordion.Trigger className="py-4 w-full text-left font-medium text-slate-100 hover:text-cyan-300">
              {f.q}
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="pb-4 text-slate-300">{f.a}</Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
