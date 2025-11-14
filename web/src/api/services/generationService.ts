/**
 * Serviço para geração de modelos 3D via IA
 */
import { post, get } from '../client';

/**
 * Request para geração de modelo 3D
 */
export interface GenerationRequest {
  prompt: string;
  style?: string;
  resolution?: string;
  materials?: string[];
}

/**
 * Response da geração
 */
export interface GenerationResponse {
  job_id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  prompt: string;
  created_at: string;
  estimated_time?: number;
  model_id?: string;
}

/**
 * Serviço de geração de modelos 3D
 */
export class GenerationService {
  /**
   * Gerar modelo 3D a partir de texto
   */
  static async generateModel(
    request: GenerationRequest
  ): Promise<GenerationResponse> {
    const response = await post<GenerationResponse>(
      '/api/v1/generation/generate',
      request
    );
    return response.data;
  }

  /**
   * Verificar status de uma geração
   */
  static async getGenerationStatus(
    jobId: string
  ): Promise<GenerationResponse> {
    const response = await get<GenerationResponse>(
      `/api/v1/generation/${jobId}`
    );
    return response.data;
  }

  /**
   * Listar todas as gerações
   */
  static async listGenerations(): Promise<GenerationResponse[]> {
    const response = await get<GenerationResponse[]>('/api/v1/generation');
    return response.data;
  }
}

