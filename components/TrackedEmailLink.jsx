"use client";

import { track } from "@/lib/track";

export default function TrackedEmailLink({
  email,
  href,
  source = "unknown",
  eventName = "email_click",
  className = "",
  children,
  ...props
}) {
  const finalHref = href || (email ? `mailto:${email}` : "#");

  return (
    <a
      {...props}
      href={finalHref}
      className={className}
      onClick={(e) => {
        track(eventName, {
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
