/**
 * Interfaces para autenticação e gerenciamento de usuários
 */

import type { User, Session } from '@supabase/supabase-js';

/**
 * Interface para dados de registro de usuário
 */
export interface SignUpData {
  email: string;
  password: string;
  fullName?: string;
}

/**
 * Interface para dados de login de usuário
 */
export interface SignInData {
  email: string;
  password: string;
}

/**
 * Interface para perfil de usuário
 */
export interface UserProfile {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Interface para estado de autenticação
 */
export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
}

/**
 * Interface para retorno de operações de autenticação
 */
export interface AuthResponse {
  success: boolean;
  error?: string;
  data?: {
    user: User;
    session: Session;
  };
}

