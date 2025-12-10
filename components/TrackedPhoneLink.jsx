// components/TrackedPhoneLink.jsx
"use client";

import { Phone } from "lucide-react";

export default function TrackedPhoneLink({ phoneHref, phone, className }) {
  function handleClick() {
    console.log("call_click fired"); // debug ke liye

    try {
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", "call_click", {
          event_category: "engagement",
          event_label: "Contact phone click",
          value: 1,
        });
      } else {
        console.warn("gtag not found on window");
      }
    } catch (error) {
      console.error("call_click tracking error", error);
    }
  }

  return (
    <a
      href={`tel:${phoneHref}`}
      onClick={handleClick}
      className={className}
    >
      <Phone className="h-4 w-4" />
      {phone}
    </a>
  );
}
