/**
 * Cliente HTTP para comunicação com a API Backend
 */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

/**
 * Cria uma instância do Axios configurada para a API
 */
function createApiClient(): AxiosInstance {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  
  const client = axios.create({
    baseURL: apiUrl,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  // Interceptor para adicionar tokens se necessário
  client.interceptors.request.use(
    (config) => {
      // Adicionar token de autenticação se disponível
      const token = import.meta.env.VITE_API_TOKEN;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Interceptor para tratamento de erros
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      // Tratamento global de erros
      if (error.response) {
        // Erro da API
        console.error('API Error:', error.response.data);
      } else if (error.request) {
        // Erro de rede
        console.error('Network Error:', error.message);
      } else {
        // Outro erro
        console.error('Error:', error.message);
      }
      return Promise.reject(error);
    }
  );

  return client;
}

/**
 * Instância do cliente API
 */
export const apiClient = createApiClient();

/**
 * Tipos de requisição
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

/**
 * Função helper para fazer requisições GET
 */
export async function get<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  const response = await apiClient.get<T>(url, config);
  return {
    data: response.data,
    status: response.status,
  };
}

/**
 * Função helper para fazer requisições POST
 */
export async function post<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  const response = await apiClient.post<T>(url, data, config);
  return {
    data: response.data,
    status: response.status,
  };
}

/**
 * Função helper para fazer requisições PUT
 */
export async function put<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  const response = await apiClient.put<T>(url, data, config);
  return {
    data: response.data,
    status: response.status,
  };
}

/**
 * Função helper para fazer requisições DELETE
 */
export async function del<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
  const response = await apiClient.delete<T>(url, config);
  return {
    data: response.data,
    status: response.status,
  };
}

