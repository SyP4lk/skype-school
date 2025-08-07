// client/src/app/api/categories/route.ts
import { NextRequest, NextResponse } from "next/server"

const API_URL = "http://localhost:3000/categories"

// GET /api/categories → /categories на backend
export async function GET() {
  const res = await fetch(API_URL)
  const data = await res.json()
  return NextResponse.json(data)
}

// POST /api/categories → /categories на backend
export async function POST(req: NextRequest) {
  const body = await req.json()
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  return NextResponse.json(data)
}
