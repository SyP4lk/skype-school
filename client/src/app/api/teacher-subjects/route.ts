import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(req: NextRequest) {
  if (!API_URL) {
    return NextResponse.json({ error: "API_URL not set" }, { status: 500 });
  }

  try {
    const teacherId = req.nextUrl.searchParams.get("teacherId");
    const url = teacherId ? `${API_URL}?teacherId=${teacherId}` : API_URL;

    const res = await fetch(url);
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch teacher-subjects" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!API_URL) {
    return NextResponse.json({ error: "API_URL not set" }, { status: 500 });
  }

  try {
    const body = await req.json();

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to create teacher-subject" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
