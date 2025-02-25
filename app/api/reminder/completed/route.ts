import { NextResponse } from "next/server";
import { NEXT_SERVICE } from "@/config";

const url = `${NEXT_SERVICE}/api/v1/reminder`

// 🔹 Handle DELETE (Delete completed reminders)
export async function DELETE(request: Request) {
  try {
    const token = request.headers.get("Authorization") ?? "";

    const res = await fetch(`${url}/completed`, { method: "DELETE", headers: { "Authorization": token }});

    if (!res.ok) throw new Error("Failed to delete completed reminders");

    return NextResponse.json({ message: "Completed reminders deleted" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
