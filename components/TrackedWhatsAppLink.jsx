"use client";

import { track } from "@/lib/track";

/**
 * Tracked WhatsApp link
 * - Fires whatsapp_click
 * - Works with any href you pass (wa.me)
 */
export default function TrackedWhatsAppLink({
  href,
  source = "unknown",
  className = "",
  children,
  "aria-label": ariaLabel,
  ...props
}) {
  return (
    <a
      {...props}
      href={href}
      className={className}
      aria-label={ariaLabel || "WhatsApp us"}
      onClick={(e) => {
        // track only for real user clicks
        track("whatsapp_click", {
          source,
          page_path: typeof window !== "undefined" ? window.location.pathname : "",
          page_url: typeof window !== "undefined" ? window.location.href : "",
        });

        props?.onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
