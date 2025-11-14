/**
 * Constantes da aplicação
 */

/**
 * Configurações da aplicação
 */
export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || 'AIEXX GENAI TEXT_TO_3D',
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  isDevelopment: import.meta.env.NODE_ENV === 'development',
  isProduction: import.meta.env.NODE_ENV === 'production',
} as const;

/**
 * Endpoints da API
 */
export const API_ENDPOINTS = {
  health: '/health',
  models: '/api/v1/models',
  generation: '/api/v1/generation',
} as const;

/**
 * Formato de modelos suportados
 */
export const MODEL_FORMATS = {
  OBJ: 'obj',
  MTL: 'mtl',
  GLTF: 'gltf',
  GLB: 'glb',
  FBX: 'fbx',
} as const;

/**
 * Status de geração
 */
export const GENERATION_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;

/**
 * Mensagens de erro comuns
 */
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erro de conexão. Verifique sua internet.',
  API_ERROR: 'Erro ao comunicar com a API.',
  NOT_FOUND: 'Recurso não encontrado.',
  UNAUTHORIZED: 'Não autorizado. Faça login novamente.',
  SERVER_ERROR: 'Erro no servidor. Tente novamente mais tarde.',
} as const;

