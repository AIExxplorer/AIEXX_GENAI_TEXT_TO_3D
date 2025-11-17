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
        // Erro da API (resposta recebida mas com status de erro)
        const errorMessage = error.response.data?.message || error.response.data?.detail || 'Erro ao comunicar com a API';
        console.error('API Error:', error.response.data);
        
        // Criar erro customizado com mensagem mais clara
        const apiError = new Error(errorMessage);
        (apiError as any).status = error.response.status;
        (apiError as any).response = error.response;
        return Promise.reject(apiError);
      } else if (error.request) {
        // Erro de rede (requisição feita mas sem resposta)
        const isConnectionRefused = error.code === 'ECONNREFUSED' || 
                                    error.message?.includes('ERR_CONNECTION_REFUSED') ||
                                    error.message?.includes('Network Error');
        
        let errorMessage = 'Erro de conexão com o servidor';
        if (isConnectionRefused) {
          errorMessage = `Não foi possível conectar ao servidor. Verifique se a API está rodando em ${apiUrl}`;
        } else if (error.code === 'ETIMEDOUT') {
          errorMessage = 'Tempo de conexão esgotado. O servidor pode estar sobrecarregado.';
        } else {
          errorMessage = 'Erro de rede. Verifique sua conexão com a internet.';
        }
        
        console.error('Network Error:', errorMessage, error.message);
        
        const networkError = new Error(errorMessage);
        (networkError as any).isNetworkError = true;
        (networkError as any).code = error.code;
        return Promise.reject(networkError);
      } else {
        // Outro erro (erro ao configurar a requisição)
        console.error('Error:', error.message);
        const genericError = new Error(error.message || 'Erro desconhecido ao fazer requisição');
        return Promise.reject(genericError);
      }
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

