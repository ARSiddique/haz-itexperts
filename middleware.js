import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl.clone();
  const p = url.pathname;

  // remove trailing slash except root
  if (p.length > 1 && p.endsWith("/")) {
    url.pathname = p.slice(0, -1);
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api).*)"],
};
