import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { uuid } = await request.json();

    if (!uuid) {
      return NextResponse.json({ error: "UUID is required" }, { status: 400 });
    }

    // Log the request details for debugging
    console.log("Attempting to delete file:", uuid);
    console.log(
      "Using public key:",
      process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY
    );

    const response = await fetch(
      `https://api.uploadcare.com/files/${uuid}/storage/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Uploadcare.Simple ${process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY}:${process.env.UPLOADCARE_SECRET_KEY}`,
          Accept: "application/vnd.uploadcare-v0.5+json",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Uploadcare API Error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      });
      throw new Error(
        `Failed to delete file: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting file from Uploadcare:", error);
    return NextResponse.json(
      {
        error: "Failed to delete file from Uploadcare",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
