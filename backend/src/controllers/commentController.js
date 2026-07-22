// src/controllers/commentController.js
import * as CommentModel from '../models/commentModel.js';

// 1. Obtener comentarios y estadísticas
export const fetchComments = async (req, res, next) => {
  try {
    // Extraemos el ID de la URL (ej: /api/comments/fintrack-pro -> appId = "fintrack-pro")
    const { appId } = req.params;

    if (!appId) {
      return res.status(400).json({ error: 'El identificador de la aplicación es obligatorio.' });
    }

    // Ejecutamos ambas consultas en paralelo para máxima velocidad
    const [comments, stats] = await Promise.all([
      CommentModel.getCommentsByAppId(appId),
      CommentModel.getAppRatingStats(appId)
    ]);

    res.status(200).json({
      success: true,
      appId,
      stats: {
        totalComments: parseInt(stats.total_comments, 10) || 0,
        averageRating: parseFloat(stats.average_rating) || 5.0
      },
      data: comments
    });
  } catch (error) {
    // Pasamos el error al manejador global de Express que configuramos en server.js
    next(error);
  }
};

// 2. Publicar un nuevo comentario
export const addComment = async (req, res, next) => {
  try {
    const { appId, authorName, content, rating } = req.body;

    // VALIDACIÓN DE BACKEND: Nunca confíes ciegamente en lo que envía el frontend
    if (!appId || !authorName || !content) {
      return res.status(400).json({ 
        error: 'Todos los campos son obligatorios (appId, authorName, content).' 
      });
    }

    // Limpiamos los textos de espacios en blanco a los extremos
    const cleanAuthor = authorName.trim();
    const cleanContent = content.trim();

    if (cleanAuthor.length < 2 || cleanAuthor.length > 50) {
      return res.status(400).json({ error: 'El nombre debe tener entre 2 y 50 caracteres.' });
    }

    if (cleanContent.length < 5 || cleanContent.length > 500) {
      return res.status(400).json({ error: 'El comentario debe tener entre 5 y 500 caracteres.' });
    }

    // Validamos que el rating sea un número entero válido entre 1 y 5
    const numRating = parseInt(rating, 10);
    if (isNaN(numRating) || numRating < 1 || numRating > 5) {
      return res.status(400).json({ error: 'La calificación (rating) debe ser un número entre 1 y 5.' });
    }

    // Insertamos en PostgreSQL
    const newComment = await CommentModel.createComment({
      appId,
      authorName: cleanAuthor,
      content: cleanContent,
      rating: numRating
    });

    // Código 201 significa "Created" (Creado exitosamente) en el estándar HTTP
    res.status(201).json({
      success: true,
      message: '¡Tu comentario ha sido publicado exitosamente!',
      data: newComment
    });
  } catch (error) {
    next(error);
  }
};