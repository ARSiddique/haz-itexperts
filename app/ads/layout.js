// app/ads/layout.js
export default function AdsLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[var(--bg)] text-slate-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
