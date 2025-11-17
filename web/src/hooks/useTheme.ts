/**
 * Hook para gerenciar tema claro/escuro
 */

import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'aiexx-3d-theme';

/**
 * Hook useTheme - Gerencia tema claro/escuro
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Verificar preferência salva ou preferência do sistema
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    if (savedTheme) {
      return savedTheme;
    }
    
    // Verificar preferência do sistema
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  });

  useEffect(() => {
    // Aplicar tema ao documento (compatível com Tailwind CSS e shadcn/ui)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme, setTheme };
}

