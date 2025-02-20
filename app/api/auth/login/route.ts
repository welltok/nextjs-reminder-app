// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { NEXT_SERVICE } from "@/config";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const externalUrl = NEXT_SERVICE;
    if (!externalUrl) {
      throw new Error("Service URL is not defined in the environment");
    }

    const externalResponse = await fetch(`${NEXT_SERVICE}/api/v1/auth/login`, {
      method: "POST",
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await externalResponse.json();

    if (externalResponse.ok) {
      return NextResponse.json(data, { status: externalResponse.status });
    } else {
      return NextResponse.json(
        { error: data.error || "Authentication failed" },
        { status: externalResponse.status }
      );
    }
  } catch (error: any) {
    console.error("Login proxy error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
