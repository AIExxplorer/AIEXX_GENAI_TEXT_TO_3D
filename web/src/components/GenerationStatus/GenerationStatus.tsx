/**
 * Componente para exibir status da geração de modelo 3D
 */

import React from 'react';

export interface GenerationStatusProps {
  /** Status da geração */
  status: 'pending' | 'processing' | 'completed' | 'failed';
  /** Mensagem de status */
  message?: string;
  /** Tempo estimado em segundos */
  estimatedTime?: number;
  /** Classe CSS adicional */
  className?: string;
}

/**
 * Componente GenerationStatus - Exibe status da geração
 */
export function GenerationStatus({
  status,
  message,
  estimatedTime,
  className = '',
}: GenerationStatusProps): React.JSX.Element {
  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return {
          icon: '⏳',
          color: '#ffc107',
          label: 'Pendente',
          message: message || 'Aguardando início da geração...',
        };
      case 'processing':
        return {
          icon: '⚙️',
          color: '#007bff',
          label: 'Processando',
          message: message || 'Gerando modelo 3D...',
        };
      case 'completed':
        return {
          icon: '✅',
          color: '#28a745',
          label: 'Concluído',
          message: message || 'Modelo gerado com sucesso!',
        };
      case 'failed':
        return {
          icon: '❌',
          color: '#dc3545',
          label: 'Falhou',
          message: message || 'Erro ao gerar modelo.',
        };
      default:
        return {
          icon: '❓',
          color: '#6c757d',
          label: 'Desconhecido',
          message: message || 'Status desconhecido',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div
      className={`generation-status ${className}`}
      style={{
        padding: '1rem',
        borderRadius: '8px',
        backgroundColor: '#fff',
        border: `2px solid ${config.color}`,
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      <div
        style={{
          fontSize: '2rem',
        }}
      >
        {config.icon}
      </div>
      <div
        style={{
          flex: 1,
        }}
      >
        <div
          style={{
            fontSize: '1rem',
            fontWeight: '600',
            color: config.color,
            marginBottom: '0.25rem',
          }}
        >
          {config.label}
        </div>
        <div
          style={{
            fontSize: '0.875rem',
            color: '#666',
          }}
        >
          {config.message}
        </div>
        {estimatedTime && status === 'processing' && (
          <div
            style={{
              fontSize: '0.75rem',
              color: '#999',
              marginTop: '0.5rem',
            }}
          >
            Tempo estimado: {Math.ceil(estimatedTime)} segundos
          </div>
        )}
      </div>
    </div>
  );
}

