/**
 * Componente para alternar entre tema claro e escuro
 */

import React from 'react';
import { useTheme } from '../../hooks/useTheme';

export interface ThemeToggleProps {
  /** Classe CSS adicional */
  className?: string;
}

/**
 * Componente ThemeToggle - Botão para alternar tema
 */
export function ThemeToggle({ className = '' }: ThemeToggleProps): React.JSX.Element {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`theme-toggle ${className}`}
      aria-label={`Alternar para modo ${theme === 'light' ? 'escuro' : 'claro'}`}
      title={`Alternar para modo ${theme === 'light' ? 'escuro' : 'claro'}`}
      style={{
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        border: 'none',
        backgroundColor: 'var(--color-bg-secondary)',
        color: 'var(--color-text-primary)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
      }}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}

