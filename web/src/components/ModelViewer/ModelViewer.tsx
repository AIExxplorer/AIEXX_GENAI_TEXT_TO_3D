/**
 * Componente Viewer 3D Principal - Ambiente limpo que carrega modelos após geração
 */

import React, { useEffect, useState } from 'react';
import type { ModelInfo } from '@aiexx/viewer3d';
import { Viewer3D } from '@aiexx/viewer3d';

export interface ModelViewerProps {
  /** Informações do modelo a ser exibido */
  model?: ModelInfo | null;
  /** Se está carregando */
  isLoading?: boolean;
  /** Mensagem de erro */
  error?: string | null;
  /** Classe CSS adicional */
  className?: string;
  /** Altura do viewer */
  height?: string | number;
}

/**
 * Componente ModelViewer - Viewer 3D principal em ambiente limpo
 */
export function ModelViewer({
  model,
  isLoading = false,
  error = null,
  className = '',
  height = '100%',
}: ModelViewerProps): React.JSX.Element {
  const [showEmptyState, setShowEmptyState] = useState(!model && !isLoading && !error);

  useEffect(() => {
    setShowEmptyState(!model && !isLoading && !error);
  }, [model, isLoading, error]);

  return (
    <div
      className={`model-viewer-container ${className}`}
      style={{
        width: '100%',
        height: typeof height === 'number' ? `${height}px` : height,
        position: 'relative',
        backgroundColor: 'var(--color-bg-secondary)',
        borderRadius: '12px',
        border: `2px solid var(--color-bg-tertiary)`,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {showEmptyState && (
        <div
          style={{
            textAlign: 'center',
            padding: '3rem',
            color: 'var(--color-text-tertiary)',
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
          <h3
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--color-text-secondary)',
              marginBottom: '0.5rem',
            }}
          >
            Ambiente de Visualização 3D
          </h3>
          <p
            style={{
              fontSize: '1rem',
              color: 'var(--color-text-tertiary)',
              maxWidth: '400px',
              margin: '0 auto',
            }}
          >
            Digite um prompt acima para gerar seu modelo 3D. O artefato gerado aparecerá aqui automaticamente.
          </p>
        </div>
      )}

      {isLoading && (
        <div
          style={{
            textAlign: 'center',
            padding: '3rem',
            color: 'var(--color-primary)',
          }}
        >
          <div
            style={{
              fontSize: '3rem',
              marginBottom: '1rem',
              animation: 'spin 1s linear infinite',
            }}
          >
            ⚙️
          </div>
          <h3
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--color-text-primary)',
              marginBottom: '0.5rem',
            }}
          >
            Gerando Modelo 3D...
          </h3>
          <p
            style={{
              fontSize: '1rem',
              color: 'var(--color-text-secondary)',
            }}
          >
            Aguarde enquanto processamos seu prompt e geramos o modelo.
          </p>
        </div>
      )}

      {error && (
        <div
          style={{
            textAlign: 'center',
            padding: '3rem',
            color: 'var(--color-error)',
          }}
        >
          <div
            style={{
              fontSize: '3rem',
              marginBottom: '1rem',
            }}
          >
            ⚠️
          </div>
          <h3
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--color-error)',
              marginBottom: '0.5rem',
            }}
          >
            Erro ao Carregar Modelo
          </h3>
          <p
            style={{
              fontSize: '1rem',
              color: 'var(--color-text-secondary)',
            }}
          >
            {error}
          </p>
        </div>
      )}

      {model && !isLoading && !error && (
        <div
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <Viewer3D model={model} width="100%" height="100%" />
        </div>
      )}

      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

