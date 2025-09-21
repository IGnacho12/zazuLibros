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



export async function POST({ request }: { request: Request }) {
  try {
    const formData = await request.formData();
    
    // DEBUG: Imprime TODOS los datos que llegan
    console.log('=== DATOS RECIBIDOS ===');
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: "${value}" (tipo: ${typeof value})`);
    }
    console.log('=== FIN DATOS ===');
    
    const nombre = formData.get('nombre') as string;
    const autor = formData.get('autor') as string;
    const descripcion = formData.get('descripcion') as string;
    const archivo_url = formData.get('archivo_url') as string;
    const portada_url = formData.get('portada_url') as string;

    // DEBUG: Verificar valores extraídos
    console.log('Valores extraídos:', {
      nombre: `"${nombre}"`,
      autor: `"${autor}"`,
      descripcion: `"${descripcion}"`,
      archivo_url: `"${archivo_url}"`,
      portada_url: `"${portada_url}"`
    });

    // Validar que no sean null o vacíos
    if (!nombre || !autor || !descripcion || !archivo_url || !portada_url) {
      return new Response(
        JSON.stringify({ 
          error: 'Campos faltantes',
          recibido: { nombre, autor, descripcion, archivo_url, portada_url }
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    await consulta`INSERT INTO pdfs (nombre, autor, descripcion, archivo_url, portada_url) VALUES (${nombre}, ${autor}, ${descripcion}, ${archivo_url}, ${portada_url})`;

    return new Response(
      JSON.stringify({ mensaje: "Libro insertado correctamente." }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error('Error completo:', error);
    return new Response(
      JSON.stringify({ error: `Error guardar el libro: ${error.message}` }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}