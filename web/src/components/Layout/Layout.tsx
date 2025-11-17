/**
 * Componente Layout - Layout comum com navegação usando Neobrutalism
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
    <div className="flex min-h-screen flex-col bg-background">
      <Navigation />
      <main className="flex-1 w-full">
        {children}
      </main>
      {showFooter && (
        <footer className="mt-auto border-t-2 border-border bg-card p-8 text-center text-foreground">
          <p className="text-foreground/80">
            Desenvolvido com ❤️ por{' '}
            <a
              href="https://github.com/AIExxplorer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline-offset-4 transition-opacity hover:opacity-80 hover:underline font-semibold"
            >
              AIEXX
            </a>
          </p>
          <p className="mt-2 text-sm text-foreground/70">
            © {new Date().getFullYear()} AIEXX GENAI TEXT_TO_3D. Todos os direitos reservados.
          </p>
        </footer>
      )}
    </div>
  );
}
