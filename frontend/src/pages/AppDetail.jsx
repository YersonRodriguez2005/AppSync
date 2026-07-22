// src/pages/AppDetail.jsx
import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { APPS_CATALOG } from '../data/appsData';
import { GlassCard } from '../components/common/GlassCard';
import { SoftButton } from '../components/common/SoftButton';
import { Badge } from '../components/common/Badge';
import { LegalModal } from '../components/modals/LegalModal';
import { CommentsSection } from '../components/cards/CommentsSection';
import { ArrowLeft, Download, ShieldCheck, Cpu, HardDrive, Calendar, Layers, ExternalLink, Maximize2, X } from 'lucide-react';

export const AppDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Estado para el lightbox / vista a pantalla completa
  const [selectedImage, setSelectedImage] = useState(null);
  // 1. Buscamos la app en nuestro arreglo estático
  const app = APPS_CATALOG.find((item) => item.id === id);
  // 2. Filtramos "Más apps de AppSync" excluyendo la actual (Máximo 3 apps recomendadas)
  const moreApps = APPS_CATALOG.filter((item) => item.id !== id).slice(0, 3);

  // Si el usuario ingresa un ID que no existe, le mostramos una pantalla de error limpia
  if (!app) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-extrabold mb-4">Aplicación no encontrada</h2>
        <p className="text-slate-500 mb-6">Parece que este software aún no ha sido publicado en el catálogo de AppSync.</p>
        <SoftButton variant="accent" onClick={() => navigate('/')}>Volver a la Tienda</SoftButton>
      </div>
    );
  }

  // FUNCIÓN PROFESIONAL DE DESCARGA:
  const handleStartDownload = () => {
    setIsModalOpen(false); // 1. Cerramos el modal de vidrio

    // 2. Notificamos al usuario suavemente
    console.log(`[AppSync Auth] Consentimiento aceptado para: ${app.title}`);

    // 3. Disparamos la descarga hacia GitHub Releases, Cloudflare R2, o Google Drive
    if (app.downloadUrl) {
      // Abre el enlace en una nueva pestaña o descarga directa sin salir de la página
      window.open(app.downloadUrl, '_blank');
    } else {
      alert(`⚠️ Enlace de descarga no configurado en appsData.js para ${app.title}`);
    }
  };

  return (
    <div className="min-h-screen pb-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">

      {/* HEADER DINÁMICO */}
      <header className="max-w-6xl mx-auto pt-6 pb-8">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#E2E8F0] dark:bg-[#1E293B] shadow-soft-light dark:shadow-soft-dark text-slate-700 dark:text-slate-300 font-medium text-sm hover:scale-105 transition-transform cursor-pointer mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Catálogo</span>
        </button>
      </header>

      <main className="max-w-6xl mx-auto space-y-12">

        {/* SECCIÓN 1: PRESENTACIÓN DE LA APP (Vidrio + Soft UI) */}
        <GlassCard className="p-6 sm:p-10" hoverEffect={false}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

            {/* Icono + Título + Tagline */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <img
                src={app.iconUrl}
                alt={app.title}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover shadow-xl border border-white/40"
              />
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Badge>{app.category}</Badge>
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5" /> 100% Verificado
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                  {app.title}
                </h1>
                <p className="text-base text-slate-600 dark:text-slate-300 max-w-xl">
                  {app.tagline}
                </p>
              </div>
            </div>

            {/* Botón Principal de Descarga (Abre el Modal Legal) */}
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
              <SoftButton
                variant="success"
                onClick={() => {
                  console.log("Abriendo Modal Legal para:", app.title);
                  setIsModalOpen(true);
                }}
                className="w-full md:w-auto py-4! px-8! text-lg font-bold shadow-emerald-500/30 hover:scale-105"
              >
                <Download className="w-5 h-5" />
                <span>Instalar App</span>
              </SoftButton>
            </div>
          </div>

          {/* ESPECIFICACIONES TÉCNICAS RÁPIDAS (Grid Neumórfico) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 pt-8 border-t border-slate-200/50 dark:border-slate-800/50 text-center">
            <div className="p-4 rounded-2xl bg-[#E2E8F0]/50 dark:bg-[#1E293B]/50 shadow-soft-light-inset dark:shadow-soft-dark-inset">
              <div className="flex items-center justify-center text-slate-400 mb-1"><HardDrive className="w-5 h-5" /></div>
              <span className="block text-xs text-slate-500 uppercase font-mono font-semibold">Peso</span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{app.size}</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#E2E8F0]/50 dark:bg-[#1E293B]/50 shadow-soft-light-inset dark:shadow-soft-dark-inset">
              <div className="flex items-center justify-center text-slate-400 mb-1"><Cpu className="w-5 h-5" /></div>
              <span className="block text-xs text-slate-500 uppercase font-mono font-semibold">Versión</span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{app.version}</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#E2E8F0]/50 dark:bg-[#1E293B]/50 shadow-soft-light-inset dark:shadow-soft-dark-inset">
              <div className="flex items-center justify-center text-slate-400 mb-1"><Layers className="w-5 h-5" /></div>
              <span className="block text-xs text-slate-500 uppercase font-mono font-semibold">Plataforma</span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{app.platform}</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#E2E8F0]/50 dark:bg-[#1E293B]/50 shadow-soft-light-inset dark:shadow-soft-dark-inset">
              <div className="flex items-center justify-center text-slate-400 mb-1"><Calendar className="w-5 h-5" /></div>
              <span className="block text-xs text-slate-500 uppercase font-mono font-semibold">Desarrollador</span>
              <span className="text-sm font-bold text-brand-accent">AppSync Core</span>
            </div>
          </div>
        </GlassCard>

        {/* ── SECCIÓN: CAPTURAS DE PANTALLA ADAPTABLES ── */}
        {app.screenshots && app.screenshots.length > 0 && (
          <section className="mt-10 max-w-7xl mx-auto animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                Capturas de Pantalla
              </h2>
              <span className="text-xs font-semibold text-slate-400">
                Desliza horizontalmente para explorar →
              </span>
            </div>

            {/* Carrusel Horizontal Snap-Scroll */}
            <div className="flex gap-5 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory">
              {app.screenshots.map((imgUrl, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(imgUrl)}
                  className="group relative h-115 w-65 sm:w-70 shrink-0 snap-center rounded-4xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-900/80 shadow-[0_12px_40px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-brand-accent/50 hover:scale-[1.02] cursor-pointer flex items-center justify-center"
                >
                  <img
                    src={imgUrl}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover opacity-25 blur-2xl scale-125 pointer-events-none transition-transform duration-700 group-hover:scale-150"
                  />

                  <img
                    src={imgUrl}
                    alt={`Captura ${index + 1}`}
                    className="relative z-10 w-full h-full object-contain p-2 rounded-[28px] transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />

                  {/* 3. OVERLAY INTERACTIVO AL PASAR EL MOUSE */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 flex items-end justify-center p-6">
                    <span className="text-xs font-bold text-brand-accent flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <Maximize2 size={14} />
                      Ver a pantalla completa
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── MODAL OPCIONAL: LIGHTBOX PANTALLA COMPLETA ── */}
        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-fade-in cursor-zoom-out"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X size={24} />
            </button>
            <img
              src={selectedImage}
              alt="Vista completa"
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}

        {/* SECCIÓN 2: DESCRIPCIÓN Y ESPECIFICACIONES A FONDO */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <GlassCard className="p-8" hoverEffect={false}>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Acerca de esta Aplicación</h2>
              <div className="prose dark:prose-invert text-slate-600 dark:text-slate-300 leading-relaxed space-y-4">
                <p>
                  {app.description || `${app.title} es una herramienta de software de última generación desarrollada y firmada digitalmente bajo los estándares más estrictos de ingeniería de AppSync. Diseñada específicamente para maximizar tu productividad en entornos ${app.platform}.`}
                </p>
                <p>
                  Nuestra arquitectura garantiza un rendimiento fluido, consumo mínimo de memoria RAM y almacenamiento local 100% privado en el dispositivo del usuario. Al no requerir servidores de terceros para su funcionamiento interno, mantienes el control total de tus datos en todo momento.
                </p>
              </div>
            </GlassCard>

            {/* COMPONENTE FULLSTACK DE COMENTARIOS */}
            <CommentsSection appId={app.id} />
          </div>

          {/* SECCIÓN 3: BARRA LATERAL - MÁS APPS DE APPSYNC */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Más apps del Creador</h3>
            <div className="space-y-4">
              {moreApps.map((item) => (
                <Link to={`/app/${item.id}`} key={item.id} className="block">
                  <GlassCard className="p-4 flex items-center gap-4 hover:border-brand-accent/50 transition-colors">
                    <img src={item.iconUrl} alt={item.title} className="w-14 h-14 rounded-2xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">{item.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{item.tagline}</p>
                      <span className="inline-block mt-1 text-[10px] text-brand-accent font-mono font-semibold">{item.category}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                  </GlassCard>
                </Link>
              ))}
            </div>
          </div>
        </div>

      </main>

      {/* RENDERIZADO DEL MODAL LEGAL ESTILO VIDRIO */}
      <LegalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleStartDownload}
        appTitle={app.title}
        termsText={app.legalTerms}
      />

    </div>
  );
};