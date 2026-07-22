import express from 'express';
import { createCustomAppLead } from '../controllers/leadController.js';

const router = express.Router();

// Ruta para crear un nuevo lead de aplicación personalizada
router.post('/', createCustomAppLead);

export default router;