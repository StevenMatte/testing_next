// app/api/movies/route.ts
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  try {
    const da_slug = (await params).slug;
    return NextResponse.json({ message: "Testing Slug", data: da_slug }, { status: 400 });
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
