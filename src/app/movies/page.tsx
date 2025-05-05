"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { FilmIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
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

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    year: 0,
    description: "",
    image: "",
  });
  const [formDataEdit, setFormDataEdit] = useState({
    id: 0,
    title: "",
    year: 0,
    description: "",
    image: "",
  });

  function getApi() {
    fetch("http://localhost:3000/api/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }

  useEffect(() => {
    getApi();
  }, []);

  function addMovieModal() {
    console.log("click");
    setOpen(!open);
  }

  function editMovieModal(id: number, title: string, year: number, description: string, image: string) {
    console.log("click");
    setFormDataEdit({ id, title, year, description, image });
    setOpenEdit(!open);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeEdit = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormDataEdit({ ...formDataEdit, [e.target.name]: e.target.value });
  };

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("click");
    try {
      // create a body
      const response = await fetch("http://localhost:3000/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: formData }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Movies successfully added:", result);
      } else {
        console.error("Failed to add movies:", response.statusText);
      }
    } catch (error) {
      console.error("Error while sending the request:", error);
    }
  }
  async function deleteMovie(id: number) {
    console.log("click");
    try {
      // create a body
      const response = await fetch("http://localhost:3000/api/movies", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: { id } }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Movies successfully added:", result);
      } else {
        console.error("Failed to add movies:", response.statusText);
      }
    } catch (error) {
      console.error("Error while sending the request:", error);
    }
  }
  async function updateMovie(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("click");
    try {
      // create a body
      const response = await fetch("http://localhost:3000/api/movies", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: formDataEdit }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Movies successfully added:", result);
      } else {
        console.error("Failed to add movies:", response.statusText);
      }
    } catch (error) {
      console.error("Error while sending the request:", error);
    }
  }
  return (
    <main>
      <div className="flex-1 flex justify-end bg-dark-600 p-4">
        <button onClick={addMovieModal} className="px-1 rounded-xl border border-purple-600 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700">
          Add Movie
        </button>
      </div>

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Movie List</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <div key={movie.id}>
              <Link href={`/movies/${movie.id}`} key={movie.id} className="block bg-dark-100 rounded shadow p-4 transition-transform transform hover:scale-105 hover:shadow-lg">
                <div key={movie.id} className="bg-dark-100 rounded shadow p-4 transition-transform transform hover:scale-105 hover:shadow-lg">
                  <div className="relative w-full h-64 mb-4 overflow-hidden rounded">
                    <Image src={movie.image} alt={movie.title} fill className="object-contain transition-transform duration-300 hover:scale-110" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <h2 className="text-xl font-semibold">{movie.title}</h2>
                  <p className="text-gray-600">Released: {movie.year}</p>
                </div>
              </Link>
              <a href={`/movies/${movie.id}`}>
                <button className="p-2 rounded-3xl border border-red-500 text-red-500 hover:border-transparent hover:bg-red-600 hover:text-white active:bg-purple-700">
                  <TrashIcon aria-hidden="true" className="size-4" />
                </button>
              </a>
              <div>
                <button
                  onClick={() => editMovieModal(movie.id, movie.title, movie.year, movie.description, movie.image)}
                  className="mx-3 p-2 rounded-3xl border border-blue-600 text-blue-600 hover:border-transparent hover:bg-blue-600 hover:text-white active:bg-purple-700"
                >
                  <PencilIcon aria-hidden="true" className="size-4" />
                </button>
                <button onClick={() => deleteMovie(movie.id)} className="p-2 rounded-3xl border border-red-500 text-red-500 hover:border-transparent hover:bg-red-600 hover:text-white active:bg-purple-700">
                  <TrashIcon aria-hidden="true" className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* create movie */}
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in" />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <form onSubmit={submit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start w-full">
                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-purple-100 sm:mx-0 sm:size-10">
                      <FilmIcon aria-hidden="true" className="size-6 text-purple-600" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                        Add Movies
                      </DialogTitle>
                      <div className="mt-2">
                        <div>
                          <label className="block mb-1 font-medium text-gray-900">Title</label>
                          <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full border px-3 py-2 rounded text-gray-900" />
                        </div>

                        <div>
                          <label className="block mb-1 font-medium text-gray-900">Year</label>
                          <input type="number" name="year" value={formData.year} onChange={handleChange} required className="w-full border px-3 py-2 rounded text-gray-900" />
                        </div>

                        <div>
                          <label className="block mb-1 font-medium text-gray-900">Description</label>
                          <textarea name="description" value={formData.description} onChange={handleChange} required className="w-full border px-3 py-2 rounded text-gray-900" />
                        </div>

                        <div>
                          <label className="block mb-1 font-medium text-gray-900">Image URL</label>
                          <input type="text" name="image" value={formData.image} onChange={handleChange} required className="w-full border px-3 py-2 rounded text-gray-900" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button type="submit" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto">
                    Add
                  </button>
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => setOpen(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      {/* update movie */}
      <Dialog open={openEdit} onClose={setOpenEdit} className="relative z-10">
        <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in" />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <form onSubmit={updateMovie}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start w-full">
                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-purple-100 sm:mx-0 sm:size-10">
                      <FilmIcon aria-hidden="true" className="size-6 text-purple-600" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                        Add Movies
                      </DialogTitle>
                      <div className="mt-2">
                        <div>
                          <label className="block mb-1 font-medium text-gray-900">Title</label>
                          <input type="text" name="title" value={formDataEdit.title} onChange={handleChangeEdit} required className="w-full border px-3 py-2 rounded text-gray-900" />
                        </div>

                        <div>
                          <label className="block mb-1 font-medium text-gray-900">Year</label>
                          <input type="number" name="year" value={formDataEdit.year} onChange={handleChangeEdit} required className="w-full border px-3 py-2 rounded text-gray-900" />
                        </div>

                        <div>
                          <label className="block mb-1 font-medium text-gray-900">Description</label>
                          <textarea name="description" value={formDataEdit.description} onChange={handleChangeEdit} required className="w-full border px-3 py-2 rounded text-gray-900" />
                        </div>

                        <div>
                          <label className="block mb-1 font-medium text-gray-900">Image URL</label>
                          <input type="text" name="image" value={formDataEdit.image} onChange={handleChangeEdit} required className="w-full border px-3 py-2 rounded text-gray-900" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button type="submit" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto">
                    Add
                  </button>
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => setOpenEdit(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </main>
  );
}
