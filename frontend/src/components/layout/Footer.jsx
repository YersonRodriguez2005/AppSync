import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Code, Mail } from 'lucide-react';

export const Footer = ({ onOpenCustomAppModal }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#E2E8F0]/60 dark:bg-[#1E293B]/40 border-t border-slate-200/80 dark:border-slate-800/80 pt-16 pb-12 transition-colors duration-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* GRILLA DE 4 COLUMNAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-300/50 dark:border-slate-800">

          {/* Columna 1: Branding y Misión */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-2xl overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-200 border border-white/60 dark:border-white/10">

                {/* 1. Logo para Tema Claro: Visible por defecto, se oculta (hidden) al activar .dark */}
                <img
                  src="/logo-light.png"
                  alt="Logo AppSync Light"
                  className="w-full h-full object-cover block dark:hidden"
                />

                {/* 2. Logo para Tema Oscuro: Oculto por defecto (hidden), se muestra (block) al activar .dark */}
                <img
                  src="/logo-dark.png"
                  alt="Logo AppSync Dark"
                  className="w-full h-full object-cover hidden dark:block"
                />

              </div>
              <span className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                AppSync
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Plataforma centralizada y showcase de software de alta ingeniería. Desarrollamos aplicaciones limpias, seguras y libres de ruido visual bajo la filosofía Glass & Soft UI.
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <ShieldCheck className="w-4 h-4" /> 100% Software Libre de Malware
            </div>
          </div>

          {/* Columna 2: Navegación Rápida */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4 font-mono">
              Explorar Tienda
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/" className="hover:text-brand-accent transition-colors">Catálogo Completo</Link>
              </li>
              <li>
                <button onClick={onOpenCustomAppModal} className="hover:text-brand-accent transition-colors text-left cursor-pointer font-medium text-brand-accent">
                  → Solicitar App Personalizada
                </button>
              </li>
              <li>
                <a href="#featured" className="hover:text-brand-accent transition-colors">Software Destacado</a>
              </li>
              <li>
                <a href="#community" className="hover:text-brand-accent transition-colors">Opiniones de la Comunidad</a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Legalidad y Licencias */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4 font-mono">
              Legal & Privacidad
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-1">
                <span>Términos y Condiciones (T&C)</span>
              </li>
              <li className="flex items-center gap-1">
                <span>Exención de Responsabilidad</span>
              </li>
              <li className="flex items-center gap-1">
                <span>Privacidad de Almacenamiento Local</span>
              </li>
              <li className="text-xs text-slate-400 dark:text-slate-500 pt-1 font-mono">
                * Cada descarga requiere consentimiento individual explícito por software.
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto del Desarrollador */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4 font-mono">
              Desarrollador Senior
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              ¿Tienes un proyecto en mente o deseas asesoría en ingeniería de software?
            </p>
            <div className="space-y-2">
              <button
                onClick={onOpenCustomAppModal}
                className="w-full py-2.5 px-4 rounded-xl bg-brand-accent hover:bg-blue-600 text-white font-semibold text-xs transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Mail className="w-4 h-4" /> Enviar Correo Directo
              </button>
            </div>
          </div>

        </div>

        {/* BARRA INFERIOR DE DERECHOS DE AUTOR */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <p>© {currentYear} AppSync Store. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            Diseñado y codificado con <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> por <Code className="w-3.5 h-3.5 text-brand-accent" /> Yerson Rodriguez
          </p>
        </div>

      </div>
    </footer>
  );
};