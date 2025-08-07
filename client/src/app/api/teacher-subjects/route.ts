import { NextRequest, NextResponse } from "next/server"
const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function GET(req: NextRequest) {
  // Проксируем query-string (teacherId)
  const teacherId = req.nextUrl.searchParams.get("teacherId")
  let res
  if (teacherId) {
    res = await fetch(`${API_URL}?teacherId=${teacherId}`)
  } else {
    res = await fetch(API_URL)
  }
  const data = await res.json()
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  return NextResponse.json(await res.json())
}
