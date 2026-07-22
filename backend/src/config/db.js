// src/config/db.js
import pkg from "pg";
import dotenv from "dotenv";

// Cargamos las variables de entorno del archivo .env
dotenv.config();

const { Pool } = pkg;

// Configuración del Pool de conexiones para PostgreSQL
const pool = new Pool({
  // user: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  // host: process.env.DB_HOST,
  // port: process.env.DB_PORT,
  // database: process.env.DB_NAME,
  connectionString: process.env.DB_URL_DATABASE,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Evento para monitorear en la consola cuando una nueva conexión se abre en el pool
pool.on("connect", () => {
  console.log("📦 [Database] Nueva conexión establecida al pool de PostgreSQL");
});

// Evento global para capturar errores de base de datos inesperados y evitar que el servidor se caiga
pool.on("error", (err) => {
  console.error("❌ [Database] Error inesperado en un cliente del pool:", err);
  process.exit(-1);
});

// Función auxiliar para probar la conexión al iniciar el servidor
export const testDbConnection = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT NOW() AS current_time, current_database() AS db_name",
    );
    console.log(
      `✅ [Database] Conectado exitosamente a PostgreSQL (${result.rows[0].db_name}) - ${result.rows[0].current_time}`,
    );
    client.release();
  } catch (error) {
    console.error(
      "❌ [Database] Error fatal al conectar con PostgreSQL:",
      error.message,
    );
    console.error(
      "👉 Verifique que el servicio de PostgreSQL esté corriendo y el .env sea correcto.",
    );
  }
};

export default pool;
