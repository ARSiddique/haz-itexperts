// app/ads/layout.js
export default function AdsLayout({ children }) {
  return (
    <div className="bg-[var(--bg)] text-slate-100 antialiased min-h-screen">
      {children}
    </div>
  );
}
