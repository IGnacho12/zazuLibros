import React, { useEffect, useState } from "react";
import SearchBook from "./SearchBook.jsx";
import BookCard from "./BookCard.jsx";
import "./Books.css";

export default function Books() {
  const [libros, setLibros] = useState([]);
  const [texto, setTexto] = useState("");

  // useState for skeleton
  const [isloading, setLoading] = useState(false);

  // Buscar en la base de datos
  useEffect(() => {
    setLoading(true);
    if (texto === "") {
      fetch("https://zazu-libros.vercel.app/api/getBooks")
        .then((response) => response.json())
        .then((data) => setLibros(data))
        .finally(() => setLoading(false));
      return;
    }

    fetch(`https://zazu-libros.vercel.app/api/searchBooks?query=${texto}`)
      .then((response) => response.json())
      .then((data) => setLibros(data))
      .finally(() => setLoading(false));
  }, [texto]);

  return (
    <>
      <div className="container flex place-self-center">
        <span className="prefix">Libro</span>
        <input
          onChange={(e) => setTexto(e.target.value)}
          className="myinput-link"
          placeholder="El perro guaton"
        />
        <span className="link-icon">
          📕
          <span className="tooltip">COPY</span>
        </span>
      </div>

      <section
        id="booksContainer"
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 p-6 my-6"
      >
        {isloading || libros.length === 0 ? (
          <>
            <Loading></Loading>
            <Loading></Loading>
            <Loading></Loading>
            <Loading></Loading>
            <Loading></Loading>
            <Loading></Loading>
            <Loading></Loading>
            <Loading></Loading>
          </>
        ) : (
          libros.map((libro) => (
            <BookCard
              id={libro.id}
              nombre={libro.nombre}
              autor={libro.autor}
              portada_url={libro.portada_url}
              descripcion={libro.descripcion}
            />
          ))
        )}
      </section>
    </>
  );
}

function Loading() {
  return (
    <div className="flex flex-col w-full max-w-md gap-3 rounded-lg border border-[var(--border)] p-3 animate-pulse">
      <main className="flex">
        {/* Imagen (portada) */}
        <section className="flex-shrink-0 w-2/5 aspect-[2/3] bg-gray-300 rounded overflow-hidden dark:bg-gray-600" />

        {/* Contenido */}
        <article className="flex flex-col justify-between flex-grow px-2">
          <div className="flex flex-col flex-grow space-y-2">
            {/* Título */}
            <div className="h-4 bg-gray-300 rounded dark:bg-gray-600 w-3/4" />

            {/* Autor */}
            <div className="h-3 bg-gray-300 rounded dark:bg-gray-600 w-1/2" />

            {/* Descripción */}
            <div className="mt-2 space-y-1">
              <div className="h-2 bg-gray-300 rounded dark:bg-gray-600 w-full" />
              <div className="h-2 bg-gray-300 rounded dark:bg-gray-600 w-[90%]" />
              <div className="h-2 bg-gray-300 rounded dark:bg-gray-600 w-[85%]" />
              <div className="h-2 bg-gray-300 rounded dark:bg-gray-600 w-[80%]" />
              <div className="h-2 bg-gray-300 rounded dark:bg-gray-600 w-[60%]" />
            </div>

            {/* Estrellas */}
            <div className="mt-auto flex space-x-1.5">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 w-4 bg-gray-300 rounded dark:bg-gray-600"
                />
              ))}
            </div>
          </div>
        </article>
      </main>

      {/* Usuario / Metadata */}
      <section className="mt-4 flex items-center gap-2">
        {/* Avatar */}
        <div className="h-6 w-6 rounded-full bg-gray-300 dark:bg-gray-600" />
        <div>
          <div className="h-3 w-24 bg-gray-300 rounded dark:bg-gray-600 mb-1" />
          <div className="h-2 w-16 bg-gray-300 rounded dark:bg-gray-600" />
        </div>
      </section>
      <span className="sr-only">Cargando tarjeta de libro...</span>
    </div>
  );
}
