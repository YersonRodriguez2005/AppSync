// server.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { testDbConnection } from "./src/config/db.js";

//Importaciones de rutas
import commentRoutes from "./src/routes/commentRoutes.js";
import leadRoutes from './src/routes/leadRoutes.js';

// 1. Inicializar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());

// CORS: Permite que nuestro frontend en Vite haga peticiones a este servidor
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? "https://app-sync-store.vercel.app"
      : ["http://localhost:5173", "http://localhost:3000", "https://app-sync-store.vercel.app"], // <-- CORREGIDO: Sin barra al final
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Rate Limiting: Evita ataques de fuerza bruta o spam limitando a 100 peticiones por IP cada 15 minutos
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    error:
      "Demasiadas peticiones desde esta IP, por favor intente de nuevo en 15 minutos.",
  },
});
app.use("/api/", limiter);

// Body Parser: Permite a Express leer JSON enviados desde el frontend (con límite de 10kb por seguridad)
app.use(express.json({ limit: "10kb" }));

// AQUÍ MONTAREMOS NUESTRAS RUTAS EN LA PRÓXIMA CLASE:
app.use("/api/comments", commentRoutes);
app.use('/api/custom-app', leadRoutes);

// Manejador para rutas no encontradas (404 Not Found)
app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint no encontrado",
    path: req.originalUrl,
  });
});

// Intercepta cualquier error inesperado para no mostrar detalles sensibles de la base de datos al cliente
app.use((err, req, res, next) => {
  console.error("🔥 [Error Global]:", err.stack);

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Error interno del servidor",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

const startServer = async () => {
  try {
    // Probamos la conexión a PostgreSQL antes de abrir el puerto HTTP
    await testDbConnection();

    app.listen(PORT, () => {
      console.log(`🌟 [Server] AppSync API corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error fatal al iniciar la aplicación:", error);
    process.exit(1);
  }
};

startServer();