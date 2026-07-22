// src/components/modals/LegalModal.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, X, Download } from 'lucide-react';
import { SoftButton } from '../common/SoftButton';
import ReactMarkdown from 'react-markdown';

export const LegalModal = ({ isOpen, onClose, onConfirm, appTitle, termsText }) => {
  const [accepted, setAccepted] = useState(false);

  if (!isOpen) return null;


  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

        {/* Fondo oscurecido con desenfoque de vidrio para centrar la atención */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm"
        />

        {/* Contenedor principal del Modal en Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.25, type: "spring", bounce: 0.3 }}
          className="relative w-full max-w-2xl bg-white/80 dark:bg-slate-900/85 backdrop-blur-xl border border-white/80 dark:border-white/15 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden z-10 text-slate-800 dark:text-slate-100"
        >
          {/* Header del Modal */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-slate-800/60">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Acuerdo Legal y Licencia</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Software: <span className="font-semibold text-brand-accent">{appTitle}</span></p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="prose dark:prose-invert max-w-none text-sm text-slate-300 space-y-3 leading-relaxed overflow-y-auto max-h-[50vh] p-4">
            {/* 2. Renderizamos ReactMarkdown completamente limpio, sin props adicionales */}
            <ReactMarkdown>
              {termsText}
            </ReactMarkdown>
          </div>

          {/* Checkbox de Aceptación Obligatoria */}
          <label className="flex items-start gap-3 p-3 rounded-2xl cursor-pointer hover:bg-white/40 dark:hover:bg-slate-800/40 transition-colors border border-transparent hover:border-slate-300/40 select-none">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-0.5 w-5 h-5 rounded-md border-slate-300 text-brand-accent focus:ring-brand-accent transition cursor-pointer"
            />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
              He leído, comprendo y acepto todos los **Términos de Uso y Exención de Responsabilidad** para proceder con la descarga o instalación de esta aplicación en mi dispositivo.
            </span>
          </label>

          {/* Footer de Botones */}
          <div className="mt-8 pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-end gap-3">
            <SoftButton variant="primary" onClick={onClose} className="py-2.5! px-5! text-sm">
              Cancelar
            </SoftButton>

            {/* El botón permanece DESHABILITADO hasta que 'accepted' sea true */}
            <SoftButton
              variant="success"
              disabled={!accepted}
              onClick={() => {
                onConfirm();
                setAccepted(false);
              }}
              className="py-2.5! px-6! text-sm font-bold shadow-emerald-500/30"
            >
              <Download className="w-4 h-4" />
              <span>Confirmar y Descargar</span>
            </SoftButton>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};