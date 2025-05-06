import Image from "next/image";
import { Metadata } from "next";
// type
type Movie = {
  id: number;
  title: string;
  year: number;
  description: string;
  image: string;
};

// fetch movie detail for a single id
async function getMovie(id: string) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/movies${id}`, { cache: "no-store" });
  return res.json();
}

// generate all possible id routes at build time
export async function generateStaticParams() {
  const res = await fetch("http://localhost:3000/api/movies");
  const movies: Movie[] = await res.json();
  return movies.map((movie) => ({
    id: movie.id.toString(),
  }));
}

// Dynamic metadata for this specific movie page
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const parameter = await params;
  const movie = await getMovie(parameter.id);
  return {
    title: movie.title, // Set dynamic title based on the movie title
    description: movie.description, // Dynamic description for SEO
  };
}

// page
export default async function MovieDetail({ params }: { params: Promise<{ id: string }> }) {
  const parameter = await params;
  const movie = await getMovie(parameter.id);

  if (!movie) {
    return <div className="p-8">Movie not found.</div>;
  }

  return (
    <main>
      <div className="flex h-screen p-8 flex-col gap-6 md:flex-row">
        <div className="relative flex-1 h-[400px] md:h-full">
          <Image src={movie.image} alt={movie.title} fill className="object-contain rounded" />
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          <h4 className="text-gray-600 mb-4 text-lg">Released: {movie.year}</h4>
          <h4 className="text-gray-300 text-lg">{movie.description}</h4>
        </div>
      </div>
    </main>
  );
}
