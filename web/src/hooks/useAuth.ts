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
import type { Tables } from '@/lib/supabase-types';

/**
 * Retorno do hook useAuth
 */
export interface UseAuthReturn {
  /**
   * Estado atual de autenticação
   */
  authState: AuthState;

  /**
   * Perfil do usuário (dados adicionais de user_profiles)
   */
  userProfile: Tables<'user_profiles'> | null;

  /**
   * Se está carregando o perfil
   */
  profileLoading: boolean;

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
   * Realiza login com Google OAuth
   * 
   * @param redirectTo - URL de redirecionamento após login (opcional)
   * @returns Promise com resultado da operação
   */
  signInWithGoogle: (redirectTo?: string) => Promise<{ success: boolean; error?: string }>;

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
  const [userProfile, setUserProfile] = useState<Tables<'user_profiles'> | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);

  /**
   * Atualiza o estado de autenticação
   */
  const updateAuthState = (updates: Partial<AuthState>) => {
    setAuthState((prev) => ({ ...prev, ...updates }));
  };

  /**
   * Carrega o perfil do usuário
   * Se o perfil não existir, aguarda um pouco e tenta novamente (trigger pode estar criando)
   */
  const loadUserProfile = async (userId: string, retryCount = 0): Promise<void> => {
    try {
      console.log('[useAuth] Carregando perfil do usuário:', { userId, retryCount });
      setProfileLoading(true);
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.log('[useAuth] Erro ao buscar perfil:', { 
          code: error.code, 
          message: error.message,
          retryCount 
        });
        
        // Se o perfil não existe e ainda não tentamos 2 vezes, aguarda e tenta novamente
        if (error.code === 'PGRST116' && retryCount < 2) {
          // Aguarda 500ms para o trigger criar o perfil
          console.log('[useAuth] Perfil não encontrado, aguardando trigger...');
          await new Promise((resolve) => setTimeout(resolve, 500));
          return loadUserProfile(userId, retryCount + 1);
        }
        
        if (error.code !== 'PGRST116') {
          console.warn('[useAuth] Erro ao carregar perfil:', error.message);
        }
        setUserProfile(null);
      } else {
        console.log('[useAuth] Perfil carregado com sucesso:', { 
          id: data.id, 
          full_name: data.full_name, 
          avatar_url: data.avatar_url,
          provider: data.provider,
          email: data.email
        });
        setUserProfile(data);
      }
    } catch (error) {
      console.warn('[useAuth] Erro ao carregar perfil:', error);
      setUserProfile(null);
    } finally {
      setProfileLoading(false);
      console.log('[useAuth] Carregamento de perfil finalizado');
    }
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

      // Carregar perfil se usuário estiver autenticado
      if (session?.user) {
        await loadUserProfile(session.user.id);
      } else {
        setUserProfile(null);
      }
    } catch (error) {
      const authError = error as AuthError;
      updateAuthState({
        user: null,
        session: null,
        loading: false,
        error: authError.message,
      });
      setUserProfile(null);
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

      // Carregar perfil após login
      if (data.user) {
        await loadUserProfile(data.user.id);
      }

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

      // Carregar perfil após registro
      if (authData.user) {
        await loadUserProfile(authData.user.id);
      }

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
      console.log('[useAuth] Iniciando logout...');
      
      // Limpar estado local primeiro
      updateAuthState({
        user: null,
        session: null,
        loading: false,
        error: null,
      });
      setUserProfile(null);

      // Fazer logout no Supabase (com timeout mais longo)
      try {
        const signOutPromise = supabase.auth.signOut({ scope: 'global' });
        const timeoutPromise = new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 5000)
        );
        await Promise.race([signOutPromise, timeoutPromise]);
        console.log('[useAuth] SignOut do Supabase concluído');
      } catch (error) {
        // Ignorar timeout ou erro - continuar com limpeza
        console.warn('[useAuth] Timeout ou erro no signOut (continuando limpeza):', error);
      }

      // Limpar storage DEPOIS de chamar signOut
      try {
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && (key.includes('supabase') || key.includes('sb-') || key.includes('auth'))) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach(key => {
          try {
            localStorage.removeItem(key);
          } catch (e) {
            // Ignorar erros individuais
          }
        });
        sessionStorage.clear();
        console.log('[useAuth] Storage limpo');
      } catch (e) {
        console.warn('[useAuth] Erro ao limpar storage:', e);
      }

      // Verificar se realmente limpou
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        console.warn('[useAuth] Sessão ainda existe após logout, limpando novamente...');
        // Tentar limpar novamente
        try {
          localStorage.clear();
          sessionStorage.clear();
        } catch (e) {
          // Ignorar
        }
      } else {
        console.log('[useAuth] Sessão removida com sucesso');
      }

      console.log('[useAuth] Logout realizado com sucesso');
      return { success: true };
    } catch (error) {
      const authError = error as AuthError;
      console.error('[useAuth] Erro ao fazer logout:', authError);
      
      // Mesmo com erro, garantir que estado está limpo
      updateAuthState({
        user: null,
        session: null,
        loading: false,
        error: null,
      });
      setUserProfile(null);

      // Limpar storage mesmo com erro
      try {
        localStorage.clear();
        sessionStorage.clear();
      } catch (e) {
        // Ignorar
      }

      return {
        success: true, // Sempre retornar success para forçar redirecionamento
        error: authError.message,
      };
    }
  };

  /**
   * Realiza login com Google OAuth
   * 
   * @see https://supabase.com/docs/guides/auth/social-login/auth-google
   */
  const signInWithGoogle = async (redirectTo?: string): Promise<{ success: boolean; error?: string }> => {
    try {
      updateAuthState({ loading: true, error: null });

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectTo || window.location.origin,
        },
      });

      if (error) {
        throw error;
      }

      // O signInWithOAuth redireciona automaticamente para o Google
      // Não precisamos atualizar o estado aqui, pois o onAuthStateChange cuidará disso
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
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('[useAuth] Auth state changed:', { event, userId: session?.user?.id });
      
      updateAuthState({
        user: session?.user ?? null,
        session: session,
        loading: false,
      });

      // Carregar perfil quando sessão mudar
      if (session?.user) {
        // Aguardar um pouco para garantir que o trigger criou o perfil
        await new Promise((resolve) => setTimeout(resolve, 300));
        await loadUserProfile(session.user.id);
      } else {
        setUserProfile(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    authState,
    userProfile,
    profileLoading,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    isAuthenticated,
  };
}

