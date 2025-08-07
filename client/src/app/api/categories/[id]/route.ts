// client/src/app/api/categories/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) {
    return NextResponse.json({ error: "Not found" }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
