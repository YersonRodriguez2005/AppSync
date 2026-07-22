// src/pages/Home.jsx
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { APPS_CATALOG, CATEGORIES } from '../data/appsData';
import { GlassCard } from '../components/common/GlassCard';
import { SoftButton } from '../components/common/SoftButton';
import { Badge } from '../components/common/Badge';
import { Search, Download, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const navigate = useNavigate();

  // useMemo memoriza el resultado del filtro.
  // Solo recalcula si el usuario cambia el texto del buscador o la categoría.
  const filteredApps = useMemo(() => {
    return APPS_CATALOG.filter((app) => {
      const matchesCategory = selectedCategory === "Todas" || app.category === selectedCategory;
      const matchesSearch = app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen pb-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">

      <main className="max-w-7xl mx-auto space-y-12">

        {/* 2. HERO SECTION */}
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border border-white/60 dark:border-white/10 text-sm font-medium text-slate-600 dark:text-slate-300">
            <Sparkles className="w-4 h-4 text-brand-accent animate-pulse" />
            <span>Tienda Personalizada & Showcase de Software</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Diseño Fluido. <br />
            <span className="text-brand-accent">Software de Alta Ingeniería.</span>
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
            Explora, analiza y descarga mis aplicaciones exclusivas en un entorno seguro, limpio y libre de ruido visual.
          </p>

          {/* BUSCADOR ESTILO SOFT UI */}
          <div className="relative max-w-xl mx-auto pt-4">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por nombre o palabra clave (ej: Finanzas, AI)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-13 pr-6 py-4 rounded-2xl bg-[#E2E8F0] dark:bg-[#1E293B] shadow-soft-light-inset dark:shadow-soft-dark-inset text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all font-medium"
            />
          </div>
        </section>

        {/* 3. FILTROS POR CATEGORÍA (Píldoras) */}
        <section className="flex flex-wrap items-center justify-center gap-3 py-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer ${selectedCategory === cat
                  ? "bg-brand-accent text-white shadow-lg shadow-blue-500/30 scale-105"
                  : "bg-white/40 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-slate-800/60"
                }`}
            >
              {cat}
            </button>
          ))}
        </section>

        {/* 4. GRILLA DE APLICACIONES (Cards Glassmorphism) */}
        <section>
          {filteredApps.length === 0 ? (
            <div className="text-center py-16 text-slate-500 dark:text-slate-400">
              <p className="text-lg font-medium">No encontramos aplicaciones con esa búsqueda.</p>
              <button
                onClick={() => { setSearchQuery(""); setSelectedCategory("Todas"); }}
                className="mt-4 text-brand-accent underline cursor-pointer text-sm font-semibold"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence>
                {filteredApps.map((app) => (
                  <motion.div
                    key={app.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <GlassCard className="p-6 flex flex-col justify-between h-full group">
                      <div>
                        {/* Cabecera Card: Icono y Categoría */}
                        <div className="flex items-start justify-between mb-4">
                          <img
                            src={app.iconUrl}
                            alt={app.title}
                            className="w-16 h-16 rounded-2xl object-cover shadow-md group-hover:scale-105 transition-transform duration-300 border border-white/40"
                          />
                          <Badge>{app.category}</Badge>
                        </div>

                        {/* Textos */}
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                          {app.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-6">
                          {app.tagline}
                        </p>
                      </div>

                      {/* Footer Card: Especificaciones Rápidas y Botón */}
                      <div className="pt-4 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between">
                        <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                          <span className="block font-semibold text-slate-700 dark:text-slate-200">{app.size}</span>
                          <span>{app.version}</span>
                        </div>

                        <SoftButton
                          variant="primary"
                          onClick={(e) => {
                            e.stopPropagation(); // Evita el doble clic con la tarjeta
                            navigate(`/app/${app.id}`);
                          }}
                          className="py-2! px-4! text-sm font-semibold"
                        >
                          <Download className="w-4 h-4 text-brand-accent" />
                          <span>Ver App</span>
                        </SoftButton>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </section>

      </main>
    </div>
  );
};