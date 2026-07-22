// src/models/commentModel.js
import pool from '../config/db.js';

// 1. Obtener todos los comentarios aprobados de una app específica
export const getCommentsByAppId = async (appId) => {
  const query = `
    SELECT id, app_id, author_name, content, rating, created_at 
    FROM app_comments 
    WHERE app_id = $1 AND is_approved = TRUE 
    ORDER BY created_at DESC;
  `;
  
  const { rows } = await pool.query(query, [appId]);
  return rows;
};

// 2. Crear y guardar un nuevo comentario en la base de datos
export const createComment = async ({ appId, authorName, content, rating }) => {
  const query = `
    INSERT INTO app_comments (app_id, author_name, content, rating)
    VALUES ($1, $2, $3, $4)
    RETURNING id, app_id, author_name, content, rating, created_at;
  `;
  
  const values = [appId, authorName, content, rating];
  const { rows } = await pool.query(query, values);
  
  // Devolvemos el comentario recién insertado para que React lo pinte de inmediato en pantalla
  return rows[0];
};

// 3. Obtener el promedio general de calificación de una app
export const getAppRatingStats = async (appId) => {
  const query = `
    SELECT 
      COUNT(*) as total_comments,
      ROUND(AVG(rating)::numeric, 1) as average_rating
    FROM app_comments 
    WHERE app_id = $1 AND is_approved = TRUE;
  `;
  
  const { rows } = await pool.query(query, [appId]);
  return rows[0];
};