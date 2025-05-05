import Image from "next/image";
import Link from "next/link";
import AddMovie from "@/app/hybrid/addMovie";
import DeleteMovie from "@/app/hybrid/deleteMovie";
import EditMovie from "@/app/hybrid/editMovie";
import type { Metadata } from "next";
// ✅ If it runs before the page hits the browser → Server (SSR/ISR/SSG)
// ✅ If it runs after the page reaches the browser or requires browser events → Client (CSR)
type Movie = {
  id: number;
  title: string;
  year: number;
  description: string;
  image: string;
  createdAt: string;
};
// It behaves like SSG — fully static at build time, until you rebuild.
export const metadata: Metadata = {
  title: "SSG",
  description: "This is the SSG page",
  keywords: "SSG, Next.js, React",
};

export default async function MovieList() {
  const res = await fetch(`${process.env.BACKEND_URL}/api/movies`, { cache: "force-cache" });
  const moviesList: Movie[] = await res.json();

  return (
    <main>
      <div className="flex-1 flex justify-end bg-dark-600 p-4">
        <AddMovie />
      </div>

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Movie List</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {moviesList.map((movie) => (
            <div key={movie.id}>
              <Link href={`/hybrid/ssg/${movie.id}`} key={movie.id} className="block bg-dark-100 rounded shadow p-4 transition-transform transform hover:scale-105 hover:shadow-lg">
                <div key={movie.id} className="bg-dark-100 rounded shadow p-4 transition-transform transform hover:scale-105 hover:shadow-lg">
                  <div className="relative w-full h-64 mb-4 overflow-hidden rounded">
                    <Image src={movie.image} alt={movie.title} fill className="object-contain transition-transform duration-300 hover:scale-110" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <h2 className="text-xl font-semibold">{movie.title}</h2>
                  <p className="text-gray-600">Released: {movie.year}</p>
                </div>
              </Link>
              <div className="flex flex-row">
                <EditMovie id={movie.id} title={movie.title} year={movie.year} image={movie.image} description={movie.description} />
                <DeleteMovie id={movie.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
