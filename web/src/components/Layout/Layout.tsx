/**
 * Componente Layout - Layout comum com navegação
 */

import React from 'react';
import { Navigation } from '../Navigation';

export interface LayoutProps {
  /** Conteúdo da página */
  children: React.ReactNode;
  /** Se deve mostrar o footer */
  showFooter?: boolean;
}

/**
 * Componente Layout - Layout comum para todas as páginas
 */
export function Layout({ children, showFooter = true }: LayoutProps): React.JSX.Element {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Navigation />
      <main
        style={{
          flex: 1,
          width: '100%',
        }}
      >
        {children}
      </main>
      {showFooter && (
        <footer
          style={{
            backgroundColor: 'var(--color-bg-primary)',
            borderTop: '1px solid var(--color-bg-tertiary)',
            padding: '2rem',
            textAlign: 'center',
            color: 'var(--color-text-tertiary)',
            marginTop: 'auto',
          }}
        >
          <p>
            Desenvolvido com ❤️ por{' '}
            <a
              href="https://github.com/AIExxplorer"
              target="_blank"
              rel="noopener noreferrer"
              style={{ 
                color: 'var(--color-primary)', 
                textDecoration: 'none',
                transition: 'opacity var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
            >
              AIEXX
            </a>
          </p>
          <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
            © {new Date().getFullYear()} AIEXX GENAI TEXT_TO_3D. Todos os direitos reservados.
          </p>
        </footer>
      )}
    </div>
  );
}

