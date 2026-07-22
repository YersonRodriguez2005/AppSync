// src/services/commentService.js
import api from '../api/axios';

/**
 * Obtiene la lista de comentarios aprobados y estadísticas de una aplicación.
 * @param {string} appId - El ID único de la app (ej: 'fintrack-pro')
 */
export const getAppComments = async (appId) => {
  try {
    const response = await api.get(`/comments/${appId}`);
    return response; // Recuerda que nuestro interceptor de Axios ya limpia response.data
  } catch (error) {
    console.error(`[commentService] Error al obtener comentarios para ${appId}:`, error);
    throw error;
  }
};

/**
 * Envía un nuevo comentario y calificación al servidor.
 * @param {Object} commentData - { appId, authorName, content, rating }
 */
export const postAppComment = async (commentData) => {
  try {
    const response = await api.post('/comments', commentData);
    return response;
  } catch (error) {
    console.error('[commentService] Error al publicar comentario:', error);
    throw error;
  }
};