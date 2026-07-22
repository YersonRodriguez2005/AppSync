// src/routes/commentRoutes.js
import express from 'express';
import { fetchComments, addComment } from '../controllers/commentController.js';

const router = express.Router();

// Ruta para traer comentarios
router.get('/:appId', fetchComments);

// Ruta para enviar un nuevo comentario
router.post('/', addComment);

export default router;