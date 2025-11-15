/**
 * Página de Galeria - Exibe modelos gerados
 */

import React from 'react';
import { Layout } from '../components/Layout';

/**
 * Página GalleryPage - Galeria de modelos gerados
 */
export function GalleryPage(): React.JSX.Element {
  return (
    <Layout>
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '3rem 2rem',
        }}
      >
        <header
          style={{
            textAlign: 'center',
            marginBottom: '3rem',
          }}
        >
          <h1
            style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: 'var(--color-text-primary)',
              marginBottom: '0.5rem',
            }}
          >
            🖼️ Galeria de Modelos
          </h1>
          <p
            style={{
              fontSize: '1.1rem',
              color: 'var(--color-text-secondary)',
            }}
          >
            Explore os modelos 3D gerados pela comunidade
          </p>
        </header>

        <div
          style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            backgroundColor: 'var(--color-bg-primary)',
            borderRadius: '12px',
            border: `2px dashed var(--color-bg-tertiary)`,
          }}
        >
          <div
            style={{
              fontSize: '4rem',
              marginBottom: '1rem',
            }}
          >
            🎨
          </div>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--color-text-primary)',
              marginBottom: '0.5rem',
            }}
          >
            Galeria em Desenvolvimento
          </h2>
          <p
            style={{
              color: 'var(--color-text-secondary)',
              marginBottom: '2rem',
            }}
          >
            Esta funcionalidade será implementada em breve. Você poderá visualizar e explorar todos os modelos gerados.
          </p>
        </div>
      </div>
    </Layout>
  );
}

