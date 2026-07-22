// src/context/ThemeContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Inicializamos el estado leyendo el localStorage o la preferencia de Windows/Mac/Linux
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('appsync-theme');
    if (savedTheme) return savedTheme === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Cada vez que cambia el estado, actualizamos el HTML y el localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('appsync-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('appsync-theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizado (Buenas prácticas para no importar useContext y ThemeContext en cada archivo)
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);