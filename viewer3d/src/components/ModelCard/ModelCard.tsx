/**
 * Componente Card para exibir trabalhos/modelos 3D
 * Card fixo que pode incorporar o viewer 3D
 */

import React, { useState } from 'react';
import type { ModelCardProps } from '../../types/viewer.types';
import { Viewer3D } from '../Viewer3D';

/**
 * Componente ModelCard - Card fixo para exibir trabalhos 3D
 *
 * @param props - Props do componente
 * @returns Componente React do card de modelo
 */
export function ModelCard({
  model,
  onClick,
  showViewer = false,
  viewerConfig,
  className = '',
}: ModelCardProps): React.JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = (): void => {
    if (onClick) {
      onClick(model);
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div
      className={`model-card ${className}`}
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '1rem',
        margin: '1rem',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        cursor: onClick || showViewer ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
        maxWidth: '400px',
        width: '100%',
      }}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      role={onClick || showViewer ? 'button' : 'article'}
      tabIndex={onClick || showViewer ? 0 : -1}
    >
      {/* Thumbnail ou Viewer */}
      <div
        style={{
          width: '100%',
          height: '250px',
          marginBottom: '1rem',
          borderRadius: '4px',
          overflow: 'hidden',
          backgroundColor: '#f5f5f5',
        }}
      >
        {showViewer && (isExpanded || !model.thumbnail) ? (
          <Viewer3D model={model} config={viewerConfig} width="100%" height="100%" />
        ) : model.thumbnail ? (
          <img
            src={model.thumbnail}
            alt={model.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#999',
            }}
          >
            Sem preview
          </div>
        )}
      </div>

      {/* Informações do modelo */}
      <div>
        <h3
          style={{
            margin: '0 0 0.5rem 0',
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#333',
          }}
        >
          {model.name}
        </h3>
        {model.description && (
          <p
            style={{
              margin: '0',
              fontSize: '0.875rem',
              color: '#666',
              lineHeight: '1.5',
            }}
          >
            {model.description}
          </p>
        )}
      </div>

      {/* Indicador de expansão */}
      {showViewer && (
        <div
          style={{
            marginTop: '1rem',
            textAlign: 'center',
            fontSize: '0.75rem',
            color: '#999',
          }}
        >
          {isExpanded ? 'Clique para minimizar' : 'Clique para visualizar'}
        </div>
      )}
    </div>
  );
}

