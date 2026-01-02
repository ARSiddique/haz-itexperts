"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const GA_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ||
  process.env.NEXT_PUBLIC_GA4_ID ||
  process.env.NEXT_PUBLIC_GA_ID ||
  "";

const GA_IN_DEV = String(process.env.NEXT_PUBLIC_GA_IN_DEV || "").toLowerCase();
const ENABLE_IN_DEV = GA_IN_DEV === "1" || GA_IN_DEV === "true" || GA_IN_DEV === "yes";

export default function AnalyticsClient() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const enabled =
    Boolean(GA_ID) && (process.env.NODE_ENV === "production" || ENABLE_IN_DEV);

  const debugMode = process.env.NODE_ENV !== "production";

  // SPA route changes = manual page_view
  useEffect(() => {
    if (!enabled) return;

    const qs = searchParams?.toString?.() || "";
    const page_path = qs ? `${pathname}?${qs}` : pathname;

    try {
      window.gtag?.("config", GA_ID, {
        page_path,
        debug_mode: debugMode,
      });

      window.gtag?.("event", "page_view", {
        page_path,
        page_location: window.location.href,
        page_title: document.title,
        debug_mode: debugMode,
      });
    } catch {
      // ignore
    }
  }, [enabled, pathname, searchParams, debugMode]);

  if (!enabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { send_page_view: false, debug_mode: ${debugMode ? "true" : "false"} });
          `,
        }}
      />
    </>
  );
}
