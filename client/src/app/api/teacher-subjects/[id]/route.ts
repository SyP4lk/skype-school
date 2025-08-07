// src/app/api/teacher-subjects/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function DELETE(req: NextRequest, context: any) {
  const { id } = context.params;

  const res = await fetch(`${API_URL}/teacher-subjects/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function PATCH(req: NextRequest, context: any) {
  const { id } = context.params;
  const body = await req.json();

  const res = await fetch(`${API_URL}/teacher-subjects/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }

  return NextResponse.json(await res.json());
}
