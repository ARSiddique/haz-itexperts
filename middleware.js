// middleware.js
import { NextResponse } from "next/server";

function isUkRolloutOn() {
  const v = String(process.env.UK_ROLLOUT || "").toLowerCase().trim();
  return v === "on" || v === "true" || v === "1";
}

export const config = {
  matcher: ["/uk/:path*"],
};

export function middleware() {
  if (isUkRolloutOn()) return NextResponse.next();

  // Hard-hide: 404 + noindex header
  return new NextResponse("Not Found", {
    status: 404,
    headers: {
      "x-robots-tag": "noindex, nofollow, noarchive",
      "cache-control": "no-store",
    },
  });
}
