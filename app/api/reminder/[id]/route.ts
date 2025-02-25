import { NextResponse } from "next/server";
import { NEXT_SERVICE } from "@/config";

const url = `${NEXT_SERVICE}/api/v1/reminder`

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = request.headers.get("Authorization") ?? "";
    const { id } = await params

    const res = await fetch(`${url}/${id}`, { method: "GET", headers: {"Authorization": token }});

    if (!res.ok) throw new Error("Failed to fetch reminder");

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = request.headers.get("Authorization") ?? "";
    const { id } = await params
    const body = await request.json();
    const res = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": token,
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error("Failed to update reminder");

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = request.headers.get("Authorization") ?? "";

    const { id } = await params

    const res = await fetch(`${url}/${id}`, { method: "DELETE", headers: { "Authorization": token } });

    if (!res.ok) throw new Error("Failed to delete reminder");

    return NextResponse.json({ message: "Reminder deleted" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
