/**
 * Contexto de Autenticação Global
 * 
 * Fornece estado de autenticação centralizado para toda a aplicação
 * Garante consistência entre todos os componentes
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { User, Session } from '@supabase/supabase-js';
import type { Tables } from '@/lib/supabase-types';
import { useAuth } from '@/hooks/useAuth';

/**
 * Interface do contexto de autenticação
 */
interface AuthContextType {
  /**
   * Usuário atual
   */
  user: User | null;
  
  /**
   * Sessão atual
   */
  session: Session | null;
  
  /**
   * Perfil do usuário
   */
  userProfile: Tables<'user_profiles'> | null;
  
  /**
   * Se está carregando
   */
  loading: boolean;
  
  /**
   * Se o usuário está autenticado
   */
  isAuthenticated: boolean;
  
  /**
   * Função de logout
   */
  signOut: () => Promise<void>;
}

/**
 * Contexto de autenticação
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Props do AuthProvider
 */
interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * Provider de autenticação global
 * 
 * Garante que toda a aplicação tenha acesso ao mesmo estado de autenticação
 */
export function AuthProvider({ children }: AuthProviderProps): React.JSX.Element {
  const { authState, userProfile, profileLoading, signOut: signOutHook, isAuthenticated } = useAuth();
  const [isInitialized, setIsInitialized] = useState(false);

  /**
   * Função de logout melhorada
   */
  const handleSignOut = async (): Promise<void> => {
    try {
      console.log('[AuthContext] Iniciando logout completo...');
      
      // Usar o signOut do hook que já faz tudo necessário
      // Não fazer signOut duplo para evitar conflitos
      await signOutHook();
      
      console.log('[AuthContext] Logout completo realizado');
    } catch (error) {
      console.error('[AuthContext] Erro ao fazer logout:', error);
      // Mesmo com erro, limpar storage
      try {
        localStorage.clear();
        sessionStorage.clear();
      } catch (e) {
        // Ignorar
      }
    }
  };

  // Aguardar inicialização
  useEffect(() => {
    console.log('[AuthContext] Estado de loading:', {
      authLoading: authState.loading,
      profileLoading,
      user: authState.user?.id,
      userProfile: userProfile?.id,
      isInitialized,
    });
    
    // Se o auth não está mais carregando, considerar inicializado
    // Não esperar pelo perfil para não bloquear a UI
    if (!authState.loading && !isInitialized) {
      setIsInitialized(true);
    }
  }, [authState.loading, profileLoading, authState.user, userProfile]);
  
  // Timeout de segurança: se após 3 segundos ainda não inicializou, forçar inicialização
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsInitialized((prev) => {
        if (!prev) {
          console.warn('[AuthContext] Timeout de inicialização, forçando inicialização');
          return true;
        }
        return prev;
      });
    }, 3000);
    
    return () => clearTimeout(timeout);
  }, []); // Executar apenas uma vez na montagem

  const value: AuthContextType = {
    user: authState.user,
    session: authState.session,
    userProfile,
    // Loading apenas quando há operação de auth em andamento, não durante inicialização
    // profileLoading não deve bloquear a UI de login
    loading: authState.loading,
    isAuthenticated: isAuthenticated(),
    signOut: handleSignOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook para usar o contexto de autenticação
 */
export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext deve ser usado dentro de um AuthProvider');
  }
  return context;
}

