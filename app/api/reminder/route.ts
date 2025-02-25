import { NextResponse } from "next/server";
import { NEXT_SERVICE } from "@/config";

const url = `${NEXT_SERVICE}/api/v1/reminder`;

// 🔹 Handle GET (Fetch all reminders)
export async function GET(request: Request) {
  try {
    const token = request.headers.get("Authorization") ?? "";
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    console.log("Fetching reminders from:", url);

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": token, // Pass token to backend
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error("Failed to fetch reminders");

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 🔹 Handle POST (Create a new reminder)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Extract token from request headers
    const token = request.headers.get("Authorization") ?? "";
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": token, // Pass token to backend
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error("Failed to create reminder");

    const data = await res.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
