/**
 * Componente de Rota Protegida
 * 
 * Protege rotas que requerem autenticação
 * Redireciona para login se usuário não estiver autenticado
 */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext';
import { AuthSideMenu } from './AuthSideMenu';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

/**
 * Props do ProtectedRoute
 */
interface ProtectedRouteProps {
  /**
   * Componente a ser renderizado se autenticado
   */
  children: React.ReactNode;
  
  /**
   * Se deve mostrar opção de login inline (ao invés de redirecionar)
   */
  showLoginInline?: boolean;
}

/**
 * Componente de rota protegida
 * 
 * Verifica se o usuário está autenticado antes de renderizar o conteúdo
 * 
 * @param props - Propriedades do componente
 * @returns JSX.Element
 */
export function ProtectedRoute({ 
  children, 
  showLoginInline = false 
}: ProtectedRouteProps): React.JSX.Element {
  const { isAuthenticated, loading } = useAuthContext();
  const location = useLocation();
  const [showAuthDialog, setShowAuthDialog] = React.useState(false);

  // Se está carregando, mostrar skeleton
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8">
            <div className="space-y-4">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Se não está autenticado
  if (!isAuthenticated) {
    if (showLoginInline) {
      // Mostrar opção de login inline
      return (
        <>
          <div className="container mx-auto px-4 py-8">
            <Card>
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4 text-foreground">
                  Autenticação Necessária
                </h2>
                <p className="text-muted-foreground mb-6">
                  Você precisa estar logado para acessar esta página.
                </p>
                <button
                  onClick={() => setShowAuthDialog(true)}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-base border-2 border-border shadow-shadow font-semibold hover:opacity-80 transition-opacity"
                >
                  Entrar
                </button>
              </CardContent>
            </Card>
          </div>
          <AuthSideMenu
            open={showAuthDialog}
            onOpenChange={setShowAuthDialog}
            initialMode="login"
            side="right"
          />
        </>
      );
    }
    
    // Redirecionar para home com estado para voltar após login
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Usuário autenticado, renderizar conteúdo
  return <>{children}</>;
}


