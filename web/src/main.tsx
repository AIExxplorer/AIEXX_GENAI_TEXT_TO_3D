import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

/**
 * Inicializar tema antes de renderizar
 * Compatível com Tailwind CSS dark mode e shadcn/ui
 */
function initializeTheme() {
  const savedTheme = localStorage.getItem('aiexx-3d-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
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

