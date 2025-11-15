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
            backgroundColor: '#fff',
            borderTop: '1px solid #e0e0e0',
            padding: '2rem',
            textAlign: 'center',
            color: '#999',
            marginTop: 'auto',
          }}
        >
          <p>
            Desenvolvido com ❤️ por{' '}
            <a
              href="https://github.com/AIExxplorer"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#007bff', textDecoration: 'none' }}
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

