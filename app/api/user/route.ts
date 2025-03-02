// app/api/inspiration/route.ts
import { NextResponse } from "next/server";
import { NEXT_SERVICE } from "@/config";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = request.headers.get("Authorization");
    if (!NEXT_SERVICE) {
      throw new Error("Service URL is not defined in the environment");
    }

    const externalResponse = await fetch(`${NEXT_SERVICE}/api/v1/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `${token}`,
      },
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
    return NextResponse.json({ error: "GETTING ERROR" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const token = request.headers.get("Authorization");
    if (!NEXT_SERVICE) {
      throw new Error("Service URL is not defined in the environment");
    }

    const externalResponse = await fetch(`${NEXT_SERVICE}/api/v1/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `${token}`,
      },
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
    console.error("GET request error:", error);
    return NextResponse.json({ error: error.message || "An error occurred" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const token = request.headers.get("Authorization");

    if (!NEXT_SERVICE) {
      throw new Error("Service URL is not defined in the environment");
    }

    const externalResponse = await fetch(`${NEXT_SERVICE}/api/v1/user/${body._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `${token}`,
      },
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
    console.error("PUT request error:", error);
    return NextResponse.json({ error: error.message || "An error occurred" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const id = await request.json();
    const token = request.headers.get("Authorization");

    if (!NEXT_SERVICE) {
      throw new Error("Service URL is not defined in the environment");
    }

    const externalResponse = await fetch(`${NEXT_SERVICE}/api/v1/user/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `${token}`,
      },
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
    console.error("DELETE request error:", error);
    return NextResponse.json({ error: error.message || "An error occurred" }, { status: 500 });
  }
}