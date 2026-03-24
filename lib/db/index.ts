import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import env from "../env";
import * as schema from "./schema";

// Configurar pool de conexiones
const pool = new Pool({
  host: env.DB_HOST || "localhost",
  port: Number(env.DB_PORT) || 5432,
  user: env.DB_USER || "postgres",
  password: env.DB_PASSWORD || "admin",
  database: env.DB_NAME || "movie_reservation",
  max: 20, // máximo de conexiones en el pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Crear instancia de Drizzle
export const db = drizzle(pool, { schema });

// Función para cerrar conexiones
export async function closeConnection() {
  await pool.end();
}
