/// <reference types="vite/client" />

/**
 * Definições de tipos para variáveis de ambiente
 * 
 * Variáveis com prefixo VITE_ são expostas ao cliente (browser)
 * @see https://vite.dev/guide/env-and-mode.html
 */
interface ImportMetaEnv {
  /**
   * URL da API Backend
   * @example https://api.aiexx.com
   * @example http://localhost:8000
   */
  readonly VITE_API_URL: string;

  /**
   * Nome da aplicação
   */
  readonly VITE_APP_NAME: string;

  /**
   * Versão da aplicação
   */
  readonly VITE_APP_VERSION: string;

  /**
   * Token do Hugging Face (se necessário)
   * ⚠️ ATENÇÃO: Esta variável será exposta ao cliente!
   */
  readonly VITE_HUGGINGFACE_API_KEY?: string;

  /**
   * Ambiente de execução
   */
  readonly NODE_ENV: 'development' | 'production' | 'test';

  /**
   * Modo do Vite
   */
  readonly MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

