import React from "react";
export default function SearchBook() {
  return (
    <>
      <form className="max-w-md mx-auto shadow-sm">
        <div className="flex">
          <label
            htmlFor="location-search"
            className="mb-2 text-sm font-medium text-white sr-only"
          >
            Buscar
          </label>

          <div className="relative w-full group">
            <input
              type="search"
              id="book-search"
              className="block p-2.5 w-full z-20 text-sm text-black bg-white border-l-2 border-black placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-l-2   focus:border-black"
              placeholder="Nombre del libro, autor, palabras clave..."
              required
            />

            <div className="absolute left-0 bottom-0 w-full h-0.5 bg-yellow-400 transform scale-x-0 group-focus-within:scale-x-100 transition-transform origin-left"></div>

            <button
              type="submit"
              className="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-black bg-yellow-400 border border-yellow-400 hover:bg-yellow-400"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Buscar</span>
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
