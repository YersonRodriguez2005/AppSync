// src/components/common/FloatingCTA.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

export const FloatingCTA = ({ onOpenModal }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Burbuja de Texto Animada (Tooltip) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/80 dark:border-white/15 shadow-xl text-xs font-bold text-slate-800 dark:text-slate-100 whitespace-nowrap cursor-pointer"
            onClick={onOpenModal}
          >
            <span>¿Tienes una idea? Crea tu App Personalizada</span>
            <ArrowRight className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón Principal Flotante (Pulsante Neumórfico) */}
      <div className="relative group">
        {/* Efecto de radar / pulso de atención detrás del botón */}
        <span className="absolute -inset-1 rounded-full bg-linear-to-r from-blue-600 to-emerald-500 opacity-75 blur-sm animate-pulse group-hover:opacity-100 transition duration-300"></span>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={onOpenModal}
          aria-label="Pedir App Personalizada"
          className="relative w-14 h-14 rounded-full bg-linear-to-tr from-blue-600 via-indigo-600 to-emerald-500 text-white flex items-center justify-center shadow-2xl cursor-pointer border-2 border-white/40 dark:border-white/20"
        >
          <Sparkles className="w-6 h-6 animate-spin-slow" />
        </motion.button>
      </div>
    </div>
  );
};