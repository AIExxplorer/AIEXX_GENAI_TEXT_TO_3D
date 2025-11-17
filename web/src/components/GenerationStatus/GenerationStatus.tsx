/**
 * Componente para exibir status da geração de modelo 3D usando Neobrutalism
 */

import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

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
          label: 'Pendente',
          message: message || 'Aguardando início da geração...',
        };
      case 'processing':
        return {
          icon: '⚙️',
          label: 'Processando',
          message: message || 'Gerando modelo 3D...',
        };
      case 'completed':
        return {
          icon: '✅',
          label: 'Concluído',
          message: message || 'Modelo gerado com sucesso!',
        };
      case 'failed':
        return {
          icon: '❌',
          label: 'Falhou',
          message: message || 'Erro ao gerar modelo.',
          variant: 'destructive' as const,
        };
      default:
        return {
          icon: '❓',
          label: 'Desconhecido',
          message: message || 'Status desconhecido',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <Alert
      variant={config.variant || 'default'}
      className={cn('flex items-start gap-4', className)}
    >
      <div className="text-2xl">{config.icon}</div>
      <div className="flex-1">
        <AlertTitle className="mb-1">{config.label}</AlertTitle>
        <AlertDescription>{config.message}</AlertDescription>
        {estimatedTime && status === 'processing' && (
          <AlertDescription className="mt-2 text-xs">
            Tempo estimado: {Math.ceil(estimatedTime)} segundos
          </AlertDescription>
        )}
      </div>
    </Alert>
  );
}
