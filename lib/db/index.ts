import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import env from "../env";
import * as schema from "./schema";
// You can specify any property from the libsql connection options
// const db = drizzle({
//   connection: {
//     connectionString: env.TURSO_DATABASE_URL,
//     ssl: true
//     // authToken: env.NODE_ENV === "development" ? undefined : env.TURSO_AUTH_TOKEN,

//   },
//   schema,
// });

// Configurar pool de conexiones
const pool = new Pool({
  host: env.DB_HOST || "localhost",
  port: Number(env.DB_PORT) || 5432,
  user: env.DB_USER || "postgres",
  password: env.DB_PASSWORD || "postgres",
  database: env.DB_NAME || "mydb",
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
