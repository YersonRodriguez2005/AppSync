// src/components/common/SoftButton.jsx
export const SoftButton = ({ 
  children, 
  onClick, 
  variant = 'primary',
  className = '', 
  type = 'button',
  disabled = false 
}) => {
  const baseStyles = "font-medium px-6 py-3 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 select-none font-sans";
  
  const variants = {
    // Soft UI clásico adaptable
    primary: "bg-[#E2E8F0] dark:bg-[#1E293B] text-slate-800 dark:text-slate-100 shadow-soft-light dark:shadow-soft-dark hover:brightness-105 active:shadow-soft-light-inset dark:active:shadow-soft-dark-inset",
    // Botón azul confianza para acciones principales
    accent: "bg-brand-accent hover:bg-blue-600 text-white shadow-lg shadow-blue-500/30 active:scale-95",
    // Botón verde para descargas oficiales
    success: "bg-brand-success hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 active:scale-95",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
    >
      {children}
    </button>
  );
};