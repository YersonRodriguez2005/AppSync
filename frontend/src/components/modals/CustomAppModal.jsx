// src/components/modals/CustomAppModal.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Code, DollarSign, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { SoftButton } from '../common/SoftButton';
import { sendCustomAppProposal } from '../../services/leadService';

const PLATFORMS = ["Móvil (Android/iOS)", "Web App / Cloud", "Escritorio (Win/Mac)", "Sistema Híbrido"];
const BUDGETS = ["< $500 USD", "$500 - $1,500 USD", "$1,500 - $5,000 USD", "+ $5,000 USD / A convenir"];

export const CustomAppModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    targetPlatform: PLATFORMS[0],
    budgetRange: BUDGETS[1],
    projectDetails: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!formData.clientName.trim() || !formData.clientEmail.trim() || !formData.projectDetails.trim()) {
      setErrorMsg('Por favor llena tu nombre, correo y los detalles de tu proyecto.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await sendCustomAppProposal(formData);
      if (response && response.success) {
        setSuccessMsg(response.message);
        setFormData({ clientName: '', clientEmail: '', targetPlatform: PLATFORMS[0], budgetRange: BUDGETS[1], projectDetails: '' });
      }
    } catch (err) {
      const backendError = err.response?.data?.error || 'No pudimos enviar tu solicitud en este momento. Intenta más tarde.';
      setErrorMsg(backendError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Fondo oscurecido con desenfoque */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 dark:bg-black/75 backdrop-blur-md"
        />

        {/* Tarjeta del Formulario en Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.25, type: "spring", bounce: 0.3 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white/85 dark:bg-slate-900/90 backdrop-blur-2xl border border-white/80 dark:border-white/15 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 text-slate-800 dark:text-slate-100 scrollbar-none"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-slate-800/60 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-linear-to-tr from-blue-600 to-indigo-500 text-white shadow-lg shadow-blue-500/30">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold">Diseñemos tu App Personalizada</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Cotización directa con el creador principal de AppSync</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>

          {successMsg ? (
            /* Pantalla de Éxito Neumórfica */
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white">¡Propuesta Enviada!</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                {successMsg}
              </p>
              <div className="pt-6">
                <SoftButton variant="primary" onClick={onClose} className="mx-auto">
                  Volver a la Tienda
                </SoftButton>
              </div>
            </div>
          ) : (
            /* Formulario de Cotización */
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Tu Nombre o Empresa *</label>
                  <input
                    type="text"
                    placeholder="Ej: Laura Torres / TechSolutions"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    required
                    className="w-full p-3.5 rounded-2xl bg-[#E2E8F0] dark:bg-[#1E293B] shadow-soft-light-inset dark:shadow-soft-dark-inset text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm font-medium border-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Correo Electrónico *</label>
                  <input
                    type="email"
                    placeholder="ejemplo@empresa.com"
                    value={formData.clientEmail}
                    onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                    required
                    className="w-full p-3.5 rounded-2xl bg-[#E2E8F0] dark:bg-[#1E293B] shadow-soft-light-inset dark:shadow-soft-dark-inset text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm font-medium border-none"
                  />
                </div>
              </div>

              {/* Selección de Plataforma */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-brand-accent" /> Plataforma Objetivo
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {PLATFORMS.map((plat) => (
                    <button
                      key={plat}
                      type="button"
                      onClick={() => setFormData({ ...formData, targetPlatform: plat })}
                      className={`p-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                        formData.targetPlatform === plat
                          ? "bg-brand-accent text-white border-brand-accent shadow-md scale-105"
                          : "bg-[#E2E8F0]/50 dark:bg-[#1E293B]/50 text-slate-600 dark:text-slate-300 border-transparent hover:bg-[#E2E8F0]"
                      }`}
                    >
                      {plat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selección de Presupuesto */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-500" /> Presupuesto Estimado
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {BUDGETS.map((bud) => (
                    <button
                      key={bud}
                      type="button"
                      onClick={() => setFormData({ ...formData, budgetRange: bud })}
                      className={`p-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                        formData.budgetRange === bud
                          ? "bg-emerald-500 text-white border-emerald-500 shadow-md scale-105"
                          : "bg-[#E2E8F0]/50 dark:bg-[#1E293B]/50 text-slate-600 dark:text-slate-300 border-transparent hover:bg-[#E2E8F0]"
                      }`}
                    >
                      {bud}
                    </button>
                  ))}
                </div>
              </div>

              {/* Detalles del Requerimiento */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Describe la idea o funciones clave de tu aplicación *
                </label>
                <textarea
                  rows="4"
                  placeholder="Ej: Necesito una aplicación móvil estilo e-commerce con carrito de compras, pasarela de pagos integrada y panel de administración en la web..."
                  value={formData.projectDetails}
                  onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                  required
                  className="w-full p-4 rounded-2xl bg-[#E2E8F0] dark:bg-[#1E293B] shadow-soft-light-inset dark:shadow-soft-dark-inset text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-accent text-sm font-medium resize-none border-none"
                ></textarea>
              </div>

              {errorMsg && (
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0" /><span>{errorMsg}</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <SoftButton variant="primary" onClick={onClose} className="py-3! text-sm">Cancelar</SoftButton>
                <SoftButton type="submit" variant="accent" disabled={isSubmitting} className="py-3! px-8! text-sm font-bold shadow-blue-500/30">
                  {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /><span>Enviando al Creador...</span></> : <><Send className="w-4 h-4" /><span>Enviar Cotización</span></>}
                </SoftButton>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};