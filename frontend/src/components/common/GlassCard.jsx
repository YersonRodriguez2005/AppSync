// src/components/common/GlassCard.jsx
import { motion } from 'framer-motion';

export const GlassCard = ({ children, className = '', hoverEffect = true, ...props }) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -6, transition: { duration: 0.2 } } : {}}
      className={`bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-white/80 dark:border-white/10 rounded-3xl shadow-lg dark:shadow-black/40 transition-colors duration-300 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};