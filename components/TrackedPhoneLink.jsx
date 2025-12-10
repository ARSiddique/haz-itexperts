// components/TrackedPhoneLink.jsx
"use client";

import { Phone } from "lucide-react";

export default function TrackedPhoneLink({ phoneHref, phone, className }) {
  const handleClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "call_click", {
        event_category: "engagement",
        event_label: phone,
        value: 1,
      });
      console.log("call_click fired");
    }
  };

  return (
    <a
      href={`tel:${phoneHref}`}
      onClick={handleClick}
      className={className}
    >
      <Phone className="h-4 w-4" />
      <span>{phone}</span>
    </a>
  );
}
