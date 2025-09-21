import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
export const prerender = false;

dotenv.config();
const consulta = neon(process.env.DATABASE_URL!);

// GET /api/searchBooks?query=algo
export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query") || "";

  // Busqueda en nombre o autor usando ILIKE para case-insensitive
  const resultado = await consulta`
  SELECT *
  FROM pdfs
  WHERE nombre ILIKE ${`%${query}%`} OR autor ILIKE ${`%${query}%`}
`;

  return new Response(JSON.stringify(resultado), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
