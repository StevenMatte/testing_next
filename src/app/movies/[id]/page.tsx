"use client";
import Image from "next/image";
import { use, useEffect, useState } from "react";
// Example of CSR (client side render)
type Movie = {
  id: number;
  title: string;
  year: number;
  description: string;
  image: string;
  createdAt: string;
};

export default function MovieDetail({ params }: { params: Promise<{ id: string }> }) {
  const a = use(params);
  console.log(a.id);
  const [movies, setMovies] = useState<Movie[]>([]);
  const selectedMovie = movies.find((m) => m.id == Number(a.id));
  function getApi() {
    fetch("http://localhost:3000/api/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }

  useEffect(() => {
    getApi();
  }, []);

  if (!selectedMovie) {
    return <div className="p-8">Movie not found.</div>;
  }
  return (
    <main>
      <div className="flex h-screen p-8 flex-col gap-6 md:flex-row">
        <div className="relative flex-1 h-[400px] md:h-full">
          <Image src={selectedMovie.image} alt={selectedMovie.title} fill className="object-contain rounded" />
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-2">{selectedMovie.title}</h1>
          <h4 className="text-gray-600 mb-4 text-lg">Released: {selectedMovie.year}</h4>
          <h4 className="text-gray-300 text-lg">{selectedMovie.description}</h4>
        </div>
      </div>
    </main>
  );
}
