import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

/**
 * Suprimir erros de extensões do navegador
 * Erros como "Extension context invalidated" e "message port closed"
 * são causados por extensões e não afetam a aplicação
 */
if (import.meta.env.MODE !== 'development') {
  const originalError = console.error;
  console.error = (...args) => {
    const message = args[0]?.toString() || '';
    // Suprimir erros conhecidos de extensões
    if (
      message.includes('Extension context invalidated') ||
      message.includes('message port closed') ||
      message.includes('runtime.lastError')
    ) {
      return;
    }
    originalError.apply(console, args);
  };
}

/**
 * Inicializar tema antes de renderizar
 * Compatível com Tailwind CSS dark mode e shadcn/ui
 */
function initializeTheme() {
  const savedTheme = localStorage.getItem('aiexx-3d-theme');
  const prefersDark =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.setAttribute('data-theme', 'light');
  }
}

// Inicializar tema imediatamente
initializeTheme();

/**
 * Ponto de entrada da aplicação React
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
