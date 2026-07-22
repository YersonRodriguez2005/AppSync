// src/controllers/leadController.js
import pool from '../config/db.js';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

// Inicializamos el cliente de Resend con la llave de tu .env
const resend = new Resend(process.env.RESEND_API_KEY || 're_123456789');

export const createCustomAppLead = async (req, res, next) => {
  try {
    const { clientName, clientEmail, targetPlatform, budgetRange, projectDetails } = req.body;

    // 1. VALIDACIÓN DE CAMPOS EN BACKEND
    if (!clientName || !clientEmail || !targetPlatform || !budgetRange || !projectDetails) {
      return res.status(400).json({ 
        error: 'Todos los campos del formulario de cotización son obligatorios.' 
      });
    }

    // Validación básica de formato de correo con Expresión Regular
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(clientEmail)) {
      return res.status(400).json({ error: 'Por favor, proporciona un correo electrónico válido.' });
    }

    // 2. GUARDAR EN POSTGRESQL (Respaldo de seguridad)
    const insertQuery = `
      INSERT INTO custom_app_leads (client_name, client_email, target_platform, budget_range, project_details, email_sent)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, created_at;
    `;
    
    // Inicialmente guardamos email_sent como false
    const dbResult = await pool.query(insertQuery, [
      clientName.trim(), 
      clientEmail.trim().toLowerCase(), 
      targetPlatform, 
      budgetRange, 
      projectDetails.trim(), 
      false
    ]);

    const leadId = dbResult.rows[0].id;
    let emailSuccess = false;

    // 3. ENVIAR CORREO CON RESEND API
    try {
      const mailResponse = await resend.emails.send({
        from: 'AppSync Store <onboarding@resend.dev>', // Dominio de prueba gratuito de Resend
        to: [process.env.ADMIN_EMAIL || 'rodriguezyerson2005@gmail.com'],
        reply_to: clientEmail.trim(), // Si le das a "Responder" en Gmail, le escribirás directo al cliente
        subject: `🚀 [Nuevo Lead AppSync] Cotización de App - ${targetPlatform}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-w: 600px; padding: 20px; border: 1px solid #E2E8F0; border-radius: 12px; background-color: #F8FAFC;">
            <h2 style="color: #3B82F6; margin-top: 0;">¡Tienes una nueva solicitud de desarrollo!</h2>
            <p style="color: #475569;">Alguien está interesado en encargar una aplicación personalizada desde tu tienda <strong>AppSync</strong>.</p>
            
            <hr style="border: none; border-top: 1px solid #CBD5E1; margin: 20px 0;" />
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #64748B;"><strong>Cliente:</strong></td><td style="color: #0F172A;">${clientName}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748B;"><strong>Email:</strong></td><td style="color: #0F172A;"><a href="mailto:${clientEmail}">${clientEmail}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #64748B;"><strong>Plataforma:</strong></td><td style="color: #0F172A;">${targetPlatform}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748B;"><strong>Presupuesto:</strong></td><td style="color: #10B981; font-weight: bold;">${budgetRange}</td></tr>
            </table>

            <h3 style="color: #1E293B; margin-bottom: 8px;">Detalles del Proyecto / Idea:</h3>
            <div style="background-color: #FFFFFF; padding: 15px; border-radius: 8px; border: 1px solid #E2E8F0; color: #334155; line-height: 1.5;">
              ${projectDetails.replace(/\n/g, '<br />')}
            </div>

            <p style="font-size: 12px; color: #94A3B8; margin-top: 25px; text-align: center;">
              ID de Referencia en Base de Datos: ${leadId}
            </p>
          </div>
        `
      });

      if (mailResponse && !mailResponse.error) {
        emailSuccess = true;
        // Actualizamos la base de datos para confirmar que el correo salió bien
        await pool.query('UPDATE custom_app_leads SET email_sent = TRUE WHERE id = $1', [leadId]);
      }
    } catch (mailError) {
      console.warn('⚠️ [Mail Notice] El registro se guardó en PostgreSQL pero la API de correo falló:', mailError.message);
    }

    res.status(201).json({
      success: true,
      message: '¡Hemos recibido tu propuesta! El creador de AppSync analizará tu idea y te contactará por correo muy pronto.',
      leadId,
      emailSent: emailSuccess
    });

  } catch (error) {
    next(error);
  }
};