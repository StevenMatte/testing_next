// app/api/movies/route.ts
import { prisma } from "../../../../../prisma/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  /*
  POST expected response"
  {
    data:
    [
      {
      id: number;
      title: string;
      year: number;
      description: string;
      image: string;
      createdAt: Date;
      },
      {
      id: number;
      title: string;
      year: number;
      description: string;
      image: string;
      createdAt: Date;
      },
    ]
  }
  */
  try {
    const movies = await prisma.movies.findMany();
    return NextResponse.json(movies);
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  /*
  POST expected request:
  {
    data:
    {
      title:string,
      year:string,
      description:string,
      image:string,
    }
  }
  POST expected response"
  {
    message:  string 
  }
*/
  try {
    const requestJson = await request.json();
    console.log(requestJson);
    const dataObject = requestJson.data;

    const createdMovie = await prisma.movies.create({
      data: {
        title: dataObject.title,
        year: parseInt(dataObject.year),
        description: dataObject.description,
        image: dataObject.image,
      },
    });
    return NextResponse.json(createdMovie, { status: 201 });
  } catch (error) {
    console.error("Failed to create movies:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: Request) {
  /*
  DELETE expected request:
  {
    data:
    {
      id:string,
    }
  }
  PUT expected response"
  {
    message:  string 
  }
*/
  try {
    const requestJson = await request.json();
    console.log(requestJson);
    const dataObject = requestJson.data;

    const movie = await prisma.movies.delete({
      where: {
        id: dataObject.id, // Ensure you are sending the correct ID
      },
    });
    return NextResponse.json({ message: `Movie deleted with id ${movie.id}` }, { status: 200 });
  } catch (error) {
    console.error("Failed to create movies:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  /*
  PUT expected request:
  {
    data:
    {
      id:string,
      title:string,
      year:string,
      description:string,
      image:string 
    }
  }
  PUT expected response"
  {
    message:  string 
  }
*/
  try {
    const requestJson = await request.json();
    console.log(requestJson);
    const dataObject = requestJson.data;

    if (!dataObject.id) {
      return NextResponse.json({ error: "Movie ID is required" }, { status: 400 });
    }

    const updatedMovie = await prisma.movies.update({
      where: {
        id: dataObject.id,
      },
      data: {
        title: dataObject.title,
        year: parseInt(dataObject.year),
        description: dataObject.description,
        image: dataObject.image,
      },
    });
    return NextResponse.json({ message: `Movie with id ${updatedMovie.id} has been updated` }, { status: 200 });
  } catch (error) {
    console.error("Failed to create movies:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
