// src/App.jsx
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';

// Importamos nuestras vistas y layouts
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { AppDetail } from './pages/AppDetail';

// Importamos nuestros CTAs y Modales Globales
import { FloatingCTA } from './components/common/FloatingCTA';
import { CustomAppModal } from './components/modals/CustomAppModal';

export default function App() {
  // ESTADO GLOBAL DEL MODAL DE COTIZACIÓN
  const [isCustomAppModalOpen, setIsCustomAppModalOpen] = useState(false);

  const handleOpenModal = () => setIsCustomAppModalOpen(true);
  const handleCloseModal = () => setIsCustomAppModalOpen(false);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col justify-between transition-colors duration-300">

          {/* 1. NAVBAR GLOBAL: Visible en el Home, en Detalle y en todo el sitio */}
          <Navbar onOpenCustomAppModal={handleOpenModal} />

          {/* 2. ENRUTADOR DE PÁGINAS PRINCIPALES */}
          <div className="grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/app/:id" element={<AppDetail />} />

              <Route path="*" element={
                <div className="py-20 text-center space-y-4">
                  <h2 className="text-4xl font-extrabold text-slate-800 dark:text-white">404 - Página no encontrada</h2>
                  <p className="text-slate-500">La ruta que intentas visitar no está disponible en AppSync.</p>
                </div>
              } />
            </Routes>
          </div>

          {/* 3. FOOTER GLOBAL: Visible en todas las interfaces */}
          <Footer onOpenCustomAppModal={handleOpenModal} />

          {/* 4. CTA FLOTANTE GLOBAL (Estilo WhatsApp): ¡Aparece en toda la página! */}
          <FloatingCTA onOpenModal={handleOpenModal} />

          {/* 5. MODAL DE COTIZACIÓN GLOBAL: Se puede abrir desde el Navbar, Footer o CTA Flotante */}
          <CustomAppModal
            isOpen={isCustomAppModalOpen}
            onClose={handleCloseModal}
          />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}