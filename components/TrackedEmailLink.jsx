// components/TrackedEmailLink.jsx
"use client";

import { Mail } from "lucide-react";

export default function TrackedEmailLink({ email, className }) {
  const handleClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "email_click", {
        event_category: "engagement",
        event_label: email,
        value: 1,
      });
      console.log("email_click fired");
    }
  };

  return (
    <a
      href={`mailto:${email}`}
      onClick={handleClick}
      className={className}
    >
      <Mail className="h-4 w-4" />
      <span>{email}</span>
    </a>
  );
}
