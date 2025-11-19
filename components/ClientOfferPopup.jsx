// components/ClientOfferPopup.jsx
"use client";

import dynamic from "next/dynamic";

// Load the popup only on the client (no SSR)
const OfferPopup = dynamic(() => import("@/components/OfferPopup"), {
  ssr: false,
});

export default function ClientOfferPopup() {
  return <OfferPopup />;
}
