/**
 * Serviço para gerenciamento de modelos 3D
 */
import { get, del } from '../client';

/**
 * Modelo 3D
 */
export interface Model3D {
  id: string;
  name: string;
  description?: string;
  format: 'obj' | 'mtl' | 'gltf' | 'glb' | 'fbx';
  vertices: number;
  faces: number;
  materials: number;
  file_size: number;
  created_at: string;
  updated_at: string;
}

/**
 * Lista paginada de modelos
 */
export interface ModelListResponse {
  total: number;
  page: number;
  page_size: number;
  models: Model3D[];
}

/**
 * Parâmetros de listagem
 */
export interface ListModelsParams {
  page?: number;
  page_size?: number;
  format?: Model3D['format'];
  search?: string;
}

/**
 * Serviço de modelos 3D
 */
export class ModelsService {
  /**
   * Listar modelos 3D com paginação
   */
  static async listModels(
    params: ListModelsParams = {}
  ): Promise<ModelListResponse> {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.page_size) queryParams.append('page_size', params.page_size.toString());
    if (params.format) queryParams.append('format', params.format);
    if (params.search) queryParams.append('search', params.search);

    const queryString = queryParams.toString();
    const url = `/api/v1/models${queryString ? `?${queryString}` : ''}`;
    
    const response = await get<ModelListResponse>(url);
    return response.data;
  }

  /**
   * Obter modelo por ID
   */
  static async getModelById(modelId: string): Promise<Model3D> {
    const response = await get<Model3D>(`/api/v1/models/${modelId}`);
    return response.data;
  }

  /**
   * Deletar modelo
   */
  static async deleteModel(modelId: string): Promise<void> {
    await del(`/api/v1/models/${modelId}`);
  }
}

