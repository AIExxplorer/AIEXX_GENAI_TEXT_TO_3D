/**
 * Cliente Supabase para autenticação e armazenamento
 * 
 * Configuração do cliente Supabase para gerenciar:
 * - Autenticação de usuários
 * - Armazenamento de arquivos temporários
 * - Banco de dados PostgreSQL
 */

import { createClient } from '@supabase/supabase-js';

/**
 * URL do projeto Supabase
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://grpxuporwqdyckkyhlcx.supabase.co';

/**
 * Chave pública (anon key) do Supabase
 */
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseAnonKey) {
  console.warn('[Supabase] VITE_SUPABASE_ANON_KEY não está definida. Configure no arquivo .env.local');
}

/**
 * Cliente Supabase configurado
 * 
 * @see https://supabase.com/docs/reference/javascript/creating-a-client
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

/**
 * Tipos de banco de dados do Supabase
 * 
 * Estas interfaces serão expandidas conforme o schema do banco for criado
 */
export interface Database {
  public: {
    Tables: {
      user_files: {
        Row: {
          id: string;
          user_id: string;
          file_name: string;
          file_path: string;
          file_type: string;
          file_size: number;
          created_at: string;
          expires_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          file_name: string;
          file_path: string;
          file_type: string;
          file_size: number;
          expires_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          file_name?: string;
          file_path?: string;
          file_type?: string;
          file_size?: number;
          expires_at?: string | null;
        };
      };
    };
  };
}

