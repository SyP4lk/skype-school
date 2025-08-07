import { NextRequest, NextResponse } from "next/server";
const API_URL = "http://localhost:3000/teachers";

export async function GET() {
  const res = await fetch(API_URL);
  return NextResponse.json(await res.json());
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return NextResponse.json(await res.json());
}
