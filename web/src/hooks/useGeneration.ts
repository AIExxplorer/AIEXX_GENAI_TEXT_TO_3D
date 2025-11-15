/**
 * Hook para gerenciar geração de modelos 3D
 */

import { useState, useCallback, useEffect } from 'react';
import { GenerationService, type GenerationRequest, type GenerationResponse } from '../api/services/generationService';
import type { ModelInfo } from '@aiexx/viewer3d';

export interface UseGenerationReturn {
  /** Gerar modelo a partir de prompt */
  generate: (prompt: string, options?: Partial<GenerationRequest>) => Promise<void>;
  /** Status da geração */
  status: GenerationResponse['status'] | null;
  /** Resposta da geração */
  generation: GenerationResponse | null;
  /** Modelo gerado para visualização */
  model: ModelInfo | null;
  /** Se está carregando */
  isLoading: boolean;
  /** Erro se houver */
  error: string | null;
  /** Resetar estado */
  reset: () => void;
}

/**
 * Hook useGeneration - Gerencia geração de modelos 3D
 */
export function useGeneration(): UseGenerationReturn {
  const [generation, setGeneration] = useState<GenerationResponse | null>(null);
  const [status, setStatus] = useState<GenerationResponse['status'] | null>(null);
  const [model, setModel] = useState<ModelInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null);

  // Polling para verificar status da geração
  const pollGenerationStatus = useCallback(async (jobId: string) => {
    try {
      const statusResponse = await GenerationService.getGenerationStatus(jobId);
      setGeneration(statusResponse);
      setStatus(statusResponse.status);

      if (statusResponse.status === 'completed' && statusResponse.model_id) {
        // Buscar informações do modelo gerado
        try {
          const modelResponse = await GenerationService.getGenerationStatus(jobId);
          
          // Construir ModelInfo a partir da resposta
          // Assumindo que o backend retorna URLs dos arquivos gerados
          const modelInfo: ModelInfo = {
            name: `Modelo ${statusResponse.model_id}`,
            description: statusResponse.prompt,
            urls: [
              // URLs serão construídas baseadas no model_id e estrutura de diretórios
              // Exemplo: `/api/v1/models/${statusResponse.model_id}/files/model.obj`,
              //          `/api/v1/models/${statusResponse.model_id}/files/model.mtl`
            ],
          };

          // Construir URLs do modelo baseado na estrutura de diretórios do projeto
          // Cada projeto tem seu próprio diretório em projects/
          const baseUrl = import.meta.env.VITE_API_URL || '';
          
          // Assumindo que o backend retorna o caminho do projeto
          // Formato: projects/{project_name}/output/{model_name}.obj
          const projectName = `project_${statusResponse.model_id}`;
          modelInfo.urls = [
            `${baseUrl}/api/v1/models/${statusResponse.model_id}/files/model.obj`,
            `${baseUrl}/api/v1/models/${statusResponse.model_id}/files/model.mtl`,
          ];
          
          // Se o backend retornar URLs diretamente, usar essas
          // Por enquanto, usar estrutura padrão

          setModel(modelInfo);
          setIsLoading(false);
          if (pollingInterval) {
            clearInterval(pollingInterval);
            setPollingInterval(null);
          }
        } catch (err) {
          console.error('Erro ao buscar modelo:', err);
          setError('Erro ao carregar modelo gerado');
          setIsLoading(false);
        }
      } else if (statusResponse.status === 'failed') {
        setError('Falha ao gerar modelo');
        setIsLoading(false);
        if (pollingInterval) {
          clearInterval(pollingInterval);
          setPollingInterval(null);
        }
      }
    } catch (err) {
      console.error('Erro ao verificar status:', err);
      setError('Erro ao verificar status da geração');
      setIsLoading(false);
      if (pollingInterval) {
        clearInterval(pollingInterval);
        setPollingInterval(null);
      }
    }
  }, [pollingInterval]);

  const generate = useCallback(
    async (prompt: string, options?: Partial<GenerationRequest>) => {
      setIsLoading(true);
      setError(null);
      setModel(null);
      setStatus(null);

      try {
        const request: GenerationRequest = {
          prompt,
          ...options,
        };

        const response = await GenerationService.generateModel(request);
        setGeneration(response);
        setStatus(response.status);

        // Iniciar polling se status for pending ou processing
        if (response.status === 'pending' || response.status === 'processing') {
          const interval = setInterval(() => {
            pollGenerationStatus(response.job_id);
          }, 2000); // Verificar a cada 2 segundos
          setPollingInterval(interval);
        } else if (response.status === 'completed' && response.model_id) {
          // Se já estiver completo, buscar modelo imediatamente
          await pollGenerationStatus(response.job_id);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erro ao gerar modelo';
        setError(errorMessage);
        setIsLoading(false);
      }
    },
    [pollGenerationStatus]
  );

  const reset = useCallback(() => {
    if (pollingInterval) {
      clearInterval(pollingInterval);
      setPollingInterval(null);
    }
    setGeneration(null);
    setStatus(null);
    setModel(null);
    setIsLoading(false);
    setError(null);
  }, [pollingInterval]);

  // Cleanup ao desmontar
  useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [pollingInterval]);

  return {
    generate,
    status,
    generation,
    model,
    isLoading,
    error,
    reset,
  };
}

