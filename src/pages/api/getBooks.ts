import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
export const prerender = false;


dotenv.config();
const consulta = neon(process.env.DATABASE_URL);

export async function GET() {
  const resultado = await consulta`
    SELECT id, nombre, autor, archivo_url, portada_url, calificaciones
    FROM pdfs
  `;
  return new Response(JSON.stringify(resultado), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
