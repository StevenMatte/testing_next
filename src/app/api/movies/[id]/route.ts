import { prisma } from "../../../../../prisma/lib/prisma";
import { NextResponse } from "next/server";

// type Params = {
//   params: Promise<{ id: string }>;
// };

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  // GET request to fetch a single movie by ID
  try {
    const { id } = await params;
    console.log(id);
    const movies = await prisma.movies.findFirst({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json(movies);
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
