import React from "react";

export default function BookCard({ id, nombre, autor, portada_url }) {
  return (
    <a
      href={`/libros/bookInfo${id}`}
      className="no-underline hover:curser-pointer book-card px-4 py-3 border border-[var(--border)] hover:border-[var(--active-border)] transition-all"
    >
      <div className="book-card__cover aspect-2/3">
        <div className="book-card__book">
          <div className="book-card__book-front">
            <img
              className="book-card__img"
              src={portada_url}
              alt={`Portada de ${nombre}`}
            />
          </div>
          <div className="book-card__book-side"></div>
          <div className="book-card__book-back"></div>
        </div>
      </div>
      <div>
        <div className="text-[var(--text)] text-2xl font-extrabold">{nombre}</div>
        <div className="text-[var(--active-border)] text-lg italic">{autor}</div>
      </div>
    </a>
  );
}
