// src/components/cards/CommentsSection.jsx
import { useState, useEffect, useCallback } from 'react';
import { getAppComments, postAppComment } from '../../services/commentService';
import { GlassCard } from '../common/GlassCard';
import { SoftButton } from '../common/SoftButton';
import { StarRating } from '../common/StarRating';
import { MessageSquare, Send, User, AlertCircle, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CommentsSection = ({ appId }) => {
  // --- Estados de Datos ---
  const [comments, setComments] = useState([]);
  const [stats, setStats] = useState({ totalComments: 0, averageRating: 5.0 });
  
  // --- Estados de Interfaz (UI/UX) ---
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // --- Estado del Formulario ---
  const [formData, setFormData] = useState({
    authorName: '',
    content: '',
    rating: 5
  });

  // Función para cargar comentarios desde PostgreSQL (Optimizada con useCallback)
  const fetchCommentsData = useCallback(async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const response = await getAppComments(appId);
      if (response && response.success) {
        setComments(response.data || []);
        setStats(response.stats || { totalComments: 0, averageRating: 5.0 });
      }
    } catch {
      setErrorMsg('No pudimos conectar con el servidor de comentarios en este momento.');
    } finally {
      setIsLoading(false);
    }
  }, [appId]);

  // Cargar datos automáticamente al montar el componente o si cambia el appId
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCommentsData();
  }, [fetchCommentsData]);

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    // Validaciones rápidas en el frontend para buena UX
    if (!formData.authorName.trim() || !formData.content.trim()) {
      setErrorMsg('Por favor, ingresa tu nombre y escribe un comentario.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        appId,
        authorName: formData.authorName.trim(),
        content: formData.content.trim(),
        rating: formData.rating
      };

      const response = await postAppComment(payload);

      if (response && response.success) {
        setSuccessMsg('¡Comentario publicado con éxito!');
        // Limpiamos el formulario
        setFormData({ authorName: '', content: '', rating: 5 });
        // Recargamos la lista en tiempo real para ver el nuevo comentario
        await fetchCommentsData();
      }
    } catch (err) {
      const backendError = err.response?.data?.error || 'Ocurrió un error al publicar. Inténtalo de nuevo.';
      setErrorMsg(backendError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="space-y-8">
      {/* --- CABECERA Y ESTADÍSTICAS GLOBALES --- */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-brand-accent/10 text-brand-accent border border-brand-accent/20">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Comunidad y Opiniones
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {stats.totalComments} {stats.totalComments === 1 ? 'comentario registrado' : 'comentarios registrados'}
            </p>
          </div>
        </div>

        {/* Resumen de Calificación Neumórfico */}
        <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#E2E8F0]/80 dark:bg-[#1E293B]/80 shadow-soft-light-inset dark:shadow-soft-dark-inset border border-white/40 dark:border-white/5">
          <span className="text-2xl font-extrabold text-amber-500 font-mono">{stats.averageRating}</span>
          <div className="flex flex-col">
            <StarRating rating={Math.round(stats.averageRating)} readOnly={true} size="sm" />
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Calificación General</span>
          </div>
        </div>
      </div>

      {/* --- FORMULARIO NEUMÓRFICO PARA PUBLICAR --- */}
      <GlassCard className="p-6 sm:p-8" hoverEffect={false}>
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-brand-accent" />
          <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100">
            Deja tu reseña sobre esta aplicación
          </h4>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Fila 1: Nombre y Estrellas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Tu Nombre o Apodo *
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Ej: Alex Developer"
                  value={formData.authorName}
                  onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                  maxLength={50}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#E2E8F0] dark:bg-[#1E293B] shadow-soft-light-inset dark:shadow-soft-dark-inset text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all text-sm font-medium border-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Calificación en Estrellas *
              </label>
              <div className="h-12 px-4 rounded-2xl bg-[#E2E8F0]/50 dark:bg-[#1E293B]/50 shadow-soft-light-inset dark:shadow-soft-dark-inset flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">¿Qué tal tu experiencia?</span>
                <StarRating 
                  rating={formData.rating} 
                  onRatingChange={(newRating) => setFormData({ ...formData, rating: newRating })} 
                  readOnly={false} 
                  size="md" 
                />
              </div>
            </div>
          </div>

          {/* Fila 2: Comentario */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Tu Comentario o Feedback *
            </label>
            <textarea
              rows="3"
              placeholder="Escribe aquí tu opinión sobre el rendimiento, diseño o funciones que te gustaría ver..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              maxLength={500}
              className="w-full p-4 rounded-2xl bg-[#E2E8F0] dark:bg-[#1E293B] shadow-soft-light-inset dark:shadow-soft-dark-inset text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all text-sm font-medium resize-none border-none"
              required
            ></textarea>
            <div className="flex justify-end mt-1">
              <span className="text-[11px] font-mono text-slate-400">
                {formData.content.length}/500 caracteres
              </span>
            </div>
          </div>

          {/* Avisos de Estado (Error / Éxito) */}
          <AnimatePresence>
            {errorMsg && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm flex items-center gap-3">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{errorMsg}</span>
              </motion.div>
            )}
            {successMsg && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>{successMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botón de Enviar */}
          <div className="flex justify-end">
            <SoftButton
              type="submit"
              variant="accent"
              disabled={isSubmitting}
              className="py-3! px-8! font-bold"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Publicando...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Publicar Reseña</span>
                </>
              )}
            </SoftButton>
          </div>
        </form>
      </GlassCard>

      {/* --- LISTA DE COMENTARIOS REGISTRADOS --- */}
      <div className="space-y-4 pt-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-400 space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-brand-accent" />
            <p className="text-sm font-medium">Cargando opiniones de la comunidad desde PostgreSQL...</p>
          </div>
        ) : comments.length === 0 ? (
          <GlassCard className="p-12 text-center text-slate-500 dark:text-slate-400 space-y-2" hoverEffect={false}>
            <MessageSquare className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600 stroke-[1.5]" />
            <h5 className="text-lg font-bold text-slate-700 dark:text-slate-200">Aún no hay comentarios</h5>
            <p className="text-sm max-w-sm mx-auto">
              Sé el primero en probar y calificar esta aplicación. ¡Tu retroalimentación ayuda a mejorar el software!
            </p>
          </GlassCard>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            <AnimatePresence>
              {comments.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <GlassCard className="p-6 transition-all duration-200 hover:border-white/90 dark:hover:border-white/20" hoverEffect={false}>
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                          {item.author_name ? item.author_name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-900 dark:text-white text-base">
                            {item.author_name}
                          </h5>
                          <span className="text-xs text-slate-400 font-mono">
                            {new Date(item.created_at).toLocaleDateString('es-CO', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Calificación en estrellas readOnly */}
                      <StarRating rating={item.rating} readOnly={true} size="sm" />
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed pl-13">
                      {item.content}
                    </p>
                  </GlassCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};