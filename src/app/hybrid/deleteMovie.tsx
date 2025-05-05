"use client";
import { TrashIcon } from "@heroicons/react/24/outline";

type DeleteMovieProps = {
  id: number;
};

export default function DeleteMovie({ id }: DeleteMovieProps) {
  async function deleteMovie(id: number) {
    console.log("click");
    try {
      // create a body
      const response = await fetch(`${process.env.BACKEND_URL}/api/movies`, {
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

  return (
    <div>
      <button onClick={() => deleteMovie(id)} className="p-2 rounded-3xl border border-red-500 text-red-500 hover:border-transparent hover:bg-red-600 hover:text-white active:bg-purple-700">
        <TrashIcon aria-hidden="true" className="size-4" />
      </button>
    </div>
  );
}
