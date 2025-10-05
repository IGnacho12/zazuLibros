import React, { useEffect, useState } from "react";
import SearchBook from "./SearchBook.jsx";
import BookCard from "./BookCard.jsx";

export default function Books() {
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    fetch("https://zazu-libros.vercel.app/api/getBooks")
      .then((response) => response.json())
      .then((data) => setLibros(data));
  }, []);
  return (
    <>
      <SearchBook></SearchBook>
      <section
        id="booksContainer"
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 p-12 my-12"
      >
        {libros.map((libro) => (
          <BookCard id={libro.id} autor={libro.autor} />
        ))}
      </section>
    </>
  );
}
