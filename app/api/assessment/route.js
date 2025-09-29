import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.text(); // keep simple; integrate email/CRM later
  console.log("Assessment lead:", body);
  return NextResponse.json({ ok: true });
}
