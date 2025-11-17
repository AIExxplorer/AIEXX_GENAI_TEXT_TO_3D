/**
 * Componente de diálogo de autenticação
 * 
 * Gerencia login e registro em um único diálogo
 */

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LoginForm, SignUpForm } from './index';
import { useAuth } from '@/hooks/useAuth';

/**
 * Props do componente AuthDialog
 */
interface AuthDialogProps {
  /**
   * Controla se o diálogo está aberto
   */
  open: boolean;

  /**
   * Callback chamado quando o diálogo é fechado
   */
  onOpenChange: (open: boolean) => void;

  /**
   * Modo inicial do diálogo ('login' ou 'signup')
   */
  initialMode?: 'login' | 'signup';
}

/**
 * Componente de diálogo de autenticação
 * 
 * @param props - Propriedades do componente
 * @returns JSX.Element
 */
export function AuthDialog({ open, onOpenChange, initialMode = 'login' }: AuthDialogProps): React.JSX.Element {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const { authState } = useAuth();

  /**
   * Callback chamado após autenticação bem-sucedida
   */
  const handleAuthSuccess = (): void => {
    onOpenChange(false);
  };

  /**
   * Alterna entre login e registro
   */
  const switchMode = (): void => {
    setMode((prev) => (prev === 'login' ? 'signup' : 'login'));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === 'login' ? 'Entrar' : 'Criar Conta'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'login'
              ? 'Entre com sua conta para continuar'
              : 'Crie uma nova conta para começar'}
          </DialogDescription>
        </DialogHeader>

        {mode === 'login' ? (
          <LoginForm
            onSuccess={handleAuthSuccess}
            onSwitchToSignUp={switchMode}
          />
        ) : (
          <SignUpForm
            onSuccess={handleAuthSuccess}
            onSwitchToLogin={switchMode}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

