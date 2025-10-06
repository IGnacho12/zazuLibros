import React from "react";

export default function BookCard({
  id,
  nombre,
  autor,
  descripcion,
  portada_url,
  rating = 4,
  usuario = "Usuario",
  estado = "Publicado",
  fecha = "Oct 2025",
}) {
  return (
    <a
      href={`/libros/bookInfo${id}`}
      className="flex flex-col w-full max-w-md gap-3 rounded-lg border border-[var(--border)] hover:border-[var(--hover-border)] hover:bg-white p-3 transition duration-200 hover:shadow-xl"
    >
      <main className="flex">
        {/* Portada */}
        <section className="flex-shrink-0 w-2/5 aspect-[2/3] overflow-hidden">
          <img
            src={portada_url}
            alt={`Portada de ${nombre}`}
            onError={(e) => (e.target.src = "zazuImageIndex.webp")}
            className="h-full w-full object-cover"
          />
        </section>

        {/* Contenido */}
        <article className="flex flex-col justify-between flex-grow px-2">
          {/* Contenedor principal del contenido */}
          <div className="flex flex-col flex-grow">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
              {nombre}
            </h3>
            <p className="text-sm font-semibold text-[var(--text-muted)]">
              {autor}
            </p>
            <p className="mt-2 text-sm line-clamp-5">{descripcion}</p>

            {/* Estrellas */}
            <div className="mt-auto">
              <div className="flex items-center space-x-1.5">
                <article className="rating">
                  <input value="5" name="rate" id="star5" type="radio" />
                  <label title="5 estrellas" htmlFor="star5"></label>

                  <input value="4" name="rate" id="star4" type="radio" />
                  <label title="4 estrellas" htmlFor="star4"></label>

                  <input
                    value="3"
                    name="rate"
                    id="star3"
                    type="radio"
                    defaultChecked
                  />
                  <label title="3 estrellas" htmlFor="star3"></label>

                  <input value="2" name="rate" id="star2" type="radio" />
                  <label title="2 estrellas" htmlFor="star2"></label>

                  <input value="1" name="rate" id="star1" type="radio" />
                  <label title="1 estrella" htmlFor="star1"></label>
                </article>
              </div>
            </div>
          </div>
        </article>
      </main>

      {/* Usuario */}
      <section className="mt-4 flex items-center gap-2">
        <div className="h-6 w-6 rounded-full bg-gray-300 flex place-items-center ">
          <svg
            fill="#4d4d4d"
            class="user-img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12,12.5c-3.04,0-5.5,1.73-5.5,3.5s2.46,3.5,5.5,3.5,5.5-1.73,5.5-3.5-2.46-3.5-5.5-3.5Zm0-.5c1.66,0,3-1.34,3-3s-1.34-3-3-3-3,1.34-3,3,1.34,3,3,3Z"></path>
          </svg>
        </div>
        <div>
          <span className="text-sm font-semibold text-[var(--text)]">
            {usuario}
          </span>
          <p className="text-xs  italic">
            {estado} – {fecha}
          </p>
        </div>
      </section>
    </a>
  );
}
