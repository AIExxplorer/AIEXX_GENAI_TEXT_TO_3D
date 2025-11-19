/**
 * Cliente Supabase para autenticação e armazenamento
 * 
 * Configuração do cliente Supabase para gerenciar:
 * - Autenticação de usuários
 * - Armazenamento de arquivos temporários
 * - Banco de dados PostgreSQL
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from './supabase-types';

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
 * Cliente Supabase configurado com tipos do banco de dados
 * 
 * @see https://supabase.com/docs/reference/javascript/creating-a-client
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Re-exportar tipos para facilitar uso
export type { Database, Tables, TablesInsert, TablesUpdate } from './supabase-types';

