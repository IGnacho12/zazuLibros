import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
export const prerender = false;

dotenv.config();
const consulta = neon(process.env.DATABASE_URL!);

// ===============================
// GET: Obtener todos los PDFs
// ===============================
export async function GET() {
  try {
    const resultado = await consulta`
      SELECT id, nombre, autor, archivo_url, calificaciones
      FROM pdfs
    `;
    return new Response(JSON.stringify(resultado), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response("Error al obtener PDFs: " + error, {
      status: 500,
    });
  }
}

// ===============================
// POST: Buscar PDFs por nombre o autor
// ===============================
export async function POST({ request }) {
  try {
    const body = await request.json();
    const inputValue = (body.inputValue || "").toLowerCase();

    if (!inputValue) {
      // Retornar todos los PDFs
      const resultado = await consulta`
        SELECT id, nombre, autor, archivo_url, calificaciones
        FROM pdfs
      `;
      return new Response(JSON.stringify(resultado), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Buscar PDFs por nombre o autor
    const resultado = await consulta`
      SELECT id, nombre, autor, archivo_url, portada_url, calificaciones
      FROM pdfs
      WHERE LOWER(nombre) LIKE ${"%" + inputValue + "%"}
         OR LOWER(autor) LIKE ${"%" + inputValue + "%"}
    `;

    return new Response(JSON.stringify(resultado), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response("Error al buscar PDFs: " + error, { status: 500 });
  }
}
