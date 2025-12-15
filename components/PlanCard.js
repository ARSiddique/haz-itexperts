export default function PlanCard(){
  const items=[
    "24/7 Helpdesk (P1 ≤ 15 min response)",
    "Patch & Update Management (OS & apps)",
    "Endpoint Security (EDR/XDR + Ransomware protection)",
    "Email Security (MFA/SSO, phishing defense)",
    "Device & MDM (Windows/Mac/Android/iOS)",
    "Microsoft 365/Google Workspace Admin",
    "Backup & Disaster Recovery (endpoints + M365/Google)",
    "Network Monitoring (Wi-Fi, switches, firewalls)",
    "vCIO: Quarterly IT strategy & roadmap",
  ];
  return (
    <div id="plan" className="card p-6">
      <div className="flex items-baseline justify-between gap-4 flex-wrap">
        <h3 className="text-xl font-semibold">SupremeCare™ Managed IT Plan</h3>
        <span className="text-xs text-slate-400">Add-ons: vCISO · Compliance · SOC/SIEM · Projects</span>
      </div>
      <ul className="mt-4 grid md:grid-cols-2 gap-x-8 gap-y-2 text-sm text-slate-300">
        {items.map(t=>(
          <li key={t} className="flex gap-2"><span>•</span><span>{t}</span></li>
        ))}
      </ul>
    </div>
  );
}
