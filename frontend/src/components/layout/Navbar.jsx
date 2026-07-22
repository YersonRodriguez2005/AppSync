import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { SoftButton } from '../common/SoftButton';
import { Sun, Moon, Sparkles } from 'lucide-react';

export const Navbar = ({ onOpenCustomAppModal }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 w-full bg-[#F0F4F8]/80 dark:bg-[#0B1120]/80 backdrop-blur-lg border-b border-slate-200/50 dark:border-slate-800/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* LOGO APPSYNC */}
        <div 
          onClick={() => navigate('/')} 
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
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
          
          <span className="text-2xl font-extrabold tracking-tight bg-linear-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
            AppSync
          </span>
        </div>

        {/* CONTROLES DERECHA (¡Botón siempre visible!) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* LLAMADO A LA ACCIÓN 1: Botón en el Header */}
          <SoftButton
            variant="accent"
            onClick={onOpenCustomAppModal}
            className="py-2.5! px-3! sm:px-5! text-xs sm:text-sm font-bold inline-flex shadow-blue-500/20"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span className="hidden md:inline">Crear App Personalizada</span>
            <span className="md:hidden">Cotizar App</span>
          </SoftButton>

          {/* Botón de Tema Sol / Luna */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-3 rounded-2xl bg-[#E2E8F0] dark:bg-[#1E293B] shadow-soft-light dark:shadow-soft-dark text-slate-700 dark:text-yellow-400 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shrink-0"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 text-slate-700" />}
          </button>
        </div>

      </div>
    </header>
  );
};