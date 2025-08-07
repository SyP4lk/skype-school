// client/src/app/api/categories/route.ts
import { NextRequest, NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/categories`
  : null;

// GET /api/categories → /categories на backend
export async function GET() {
  if (!API_URL) {
    return NextResponse.json({ error: "API_URL is not defined" }, { status: 500 });
  }

  const res = await fetch(API_URL);
  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}

// POST /api/categories → /categories на backend
export async function POST(req: NextRequest) {
  if (!API_URL) {
    return NextResponse.json({ error: "API_URL is not defined" }, { status: 500 });
  }

  const body = await req.json();

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to create category" }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
