import { NextRequest, NextResponse } from "next/server";

const API_URL = "http://localhost:3000/categories";

function extractIdFromUrl(req: NextRequest): string | null {
  const segments = req.nextUrl.pathname.split('/');
  return segments[segments.length - 1] || null;
}

export async function GET(req: NextRequest) {
  const id = extractIdFromUrl(req);
  if (!id) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }

  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) {
    return NextResponse.json({ error: "Not found" }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest) {
  const id = extractIdFromUrl(req);
  if (!id) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }

  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
