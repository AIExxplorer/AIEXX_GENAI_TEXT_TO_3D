/**
 * Hook para gerenciar autenticação com Supabase
 * 
 * Fornece funcionalidades de:
 * - Login
 * - Registro
 * - Logout
 * - Verificação de sessão
 * - Gerenciamento de estado de autenticação
 */

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { User, Session, AuthError } from '@supabase/supabase-js';
import type { SignUpData, SignInData, AuthState, AuthResponse } from '@/types/auth';

/**
 * Retorno do hook useAuth
 */
export interface UseAuthReturn {
  /**
   * Estado atual de autenticação
   */
  authState: AuthState;

  /**
   * Realiza login do usuário
   * 
   * @param credentials - Credenciais de login (email e senha)
   * @returns Promise com resultado da operação
   */
  signIn: (credentials: SignInData) => Promise<AuthResponse>;

  /**
   * Registra um novo usuário
   * 
   * @param data - Dados de registro (email, senha, nome completo)
   * @returns Promise com resultado da operação
   */
  signUp: (data: SignUpData) => Promise<AuthResponse>;

  /**
   * Realiza logout do usuário atual
   * 
   * @returns Promise com resultado da operação
   */
  signOut: () => Promise<{ success: boolean; error?: string }>;

  /**
   * Verifica se o usuário está autenticado
   * 
   * @returns true se o usuário estiver autenticado, false caso contrário
   */
  isAuthenticated: () => boolean;
}

/**
 * Hook para gerenciar autenticação
 * 
 * @returns Objeto com estado e funções de autenticação
 */
export function useAuth(): UseAuthReturn {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    error: null,
  });

  /**
   * Atualiza o estado de autenticação
   */
  const updateAuthState = (updates: Partial<AuthState>) => {
    setAuthState((prev) => ({ ...prev, ...updates }));
  };

  /**
   * Carrega a sessão atual do usuário
   */
  const loadSession = async (): Promise<void> => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        throw error;
      }

      updateAuthState({
        user: session?.user ?? null,
        session: session,
        loading: false,
        error: null,
      });
    } catch (error) {
      const authError = error as AuthError;
      updateAuthState({
        user: null,
        session: null,
        loading: false,
        error: authError.message,
      });
    }
  };

  /**
   * Realiza login do usuário
   */
  const signIn = async (credentials: SignInData): Promise<AuthResponse> => {
    try {
      updateAuthState({ loading: true, error: null });

      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        throw error;
      }

      updateAuthState({
        user: data.user,
        session: data.session,
        loading: false,
        error: null,
      });

      return {
        success: true,
        data: {
          user: data.user!,
          session: data.session!,
        },
      };
    } catch (error) {
      const authError = error as AuthError;
      updateAuthState({
        loading: false,
        error: authError.message,
      });

      return {
        success: false,
        error: authError.message,
      };
    }
  };

  /**
   * Registra um novo usuário
   */
  const signUp = async (data: SignUpData): Promise<AuthResponse> => {
    try {
      updateAuthState({ loading: true, error: null });

      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
          },
        },
      });

      if (error) {
        throw error;
      }

      updateAuthState({
        user: authData.user,
        session: authData.session,
        loading: false,
        error: null,
      });

      return {
        success: true,
        data: {
          user: authData.user!,
          session: authData.session!,
        },
      };
    } catch (error) {
      const authError = error as AuthError;
      updateAuthState({
        loading: false,
        error: authError.message,
      });

      return {
        success: false,
        error: authError.message,
      };
    }
  };

  /**
   * Realiza logout do usuário
   */
  const signOut = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      updateAuthState({ loading: true });

      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      updateAuthState({
        user: null,
        session: null,
        loading: false,
        error: null,
      });

      return { success: true };
    } catch (error) {
      const authError = error as AuthError;
      updateAuthState({
        loading: false,
        error: authError.message,
      });

      return {
        success: false,
        error: authError.message,
      };
    }
  };

  /**
   * Verifica se o usuário está autenticado
   */
  const isAuthenticated = (): boolean => {
    return authState.user !== null && authState.session !== null;
  };

  /**
   * Efeito para carregar sessão ao montar o componente
   */
  useEffect(() => {
    loadSession();

    /**
     * Listener para mudanças na autenticação
     */
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      updateAuthState({
        user: session?.user ?? null,
        session: session,
        loading: false,
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    authState,
    signIn,
    signUp,
    signOut,
    isAuthenticated,
  };
}

