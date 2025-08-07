import { NextRequest, NextResponse } from "next/server";

// Убедимся, что переменная окружения определена
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const RESOURCE = "teachers"; // ← при необходимости замени на нужный путь

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined in the environment variables.");
}

export async function GET() {
  const res = await fetch(`${API_URL}/${RESOURCE}`);

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const res = await fetch(`${API_URL}/${RESOURCE}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to create" }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
