import {NEXT_SERVICE} from "@/config";

export async function fetchInspirationMessage(location: { latitude: number; longitude: number }) {
  try {

    const response = await fetch(`${NEXT_SERVICE}/api/v1/ai/inspiration`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(location),
      next: { revalidate: 60 }, // Cache data for 60 seconds, can be adjusted
    });

    if (!response.ok) {
      throw new Error(`Error fetching inspiration: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching inspiration message:", error);
    throw new Error("Failed to fetch inspiration message.");
  }
}
