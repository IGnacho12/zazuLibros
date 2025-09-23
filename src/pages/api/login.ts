// src/pages/api/login.ts
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

export const prerender = false;
dotenv.config();
const consulta = neon(process.env.DATABASE_URL!);

export async function POST({ request }: { request: Request }) {
  try {
    const body = await request.json(); // esperá JSON { nombre, password }
    const { nombre, password } = body;

    if (!nombre || !password) {
      return new Response(JSON.stringify({ error: "Faltan datos" }), { status: 400 });
    }

    // SQL correcto con WHERE
    const resultado = await consulta`
      SELECT * FROM users
      WHERE nombre = ${nombre} AND password = ${password}
      LIMIT 1
    `;

    if (!resultado || resultado.length === 0) {
      return new Response(JSON.stringify({ error: "Credenciales inválidas" }), { status: 401 });
    }

    const user = { ...resultado[0] };
    delete user.password; // opcional: no enviar la contraseña

    return new Response(JSON.stringify({ message: "Login exitoso", user }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("Error login:", err);
    return new Response(JSON.stringify({ error: "Error interno", details: String(err.message) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
