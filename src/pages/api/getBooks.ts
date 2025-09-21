import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
export const prerender = false;


dotenv.config();
const consulta = neon(process.env.DATABASE_URL!);

export async function GET() {
  const resultado = await consulta`
    SELECT *
    FROM pdfs
  `;
  return new Response(JSON.stringify(resultado), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}



export async function POST(request: Request) {
  try {
    const {
      nombre,
      autor,
      archivo_url,
      portada_url,
    } = await request.json();

   await consulta`INSERT INTO pdfs (nombre, autor, archivo_url, portada_url) VALUES (${nombre}, ${autor}, ${archivo_url}, ${portada_url}})`;

   return new Response(
    JSON.stringify({ mensaje: "Programa insertado correctamente." }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
} catch (error: any) {
  return new Response(
    JSON.stringify({ error: `Error guardar el libro: ${error.message}` }),
    { status: 500, headers: { "Content-Type": "application/json" } }
  );
  }
}
