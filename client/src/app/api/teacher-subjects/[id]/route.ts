import { NextRequest, NextResponse } from "next/server"
const API_URL = "http://localhost:3000/teacher-subjects"

export async function DELETE(
  req: NextRequest,
  context: Promise<{ params: { id: string } }>
) {
  const { params } = await context
  const { id } = params
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" })
  if (!res.ok) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}

export async function PATCH(
  req: NextRequest,
  context: Promise<{ params: { id: string } }>
) {
  const { params } = await context
  const { id } = params
  const body = await req.json()
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  return NextResponse.json(await res.json())
}
