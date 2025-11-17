/**
 * Componente de Side Menu de autenticação
 * 
 * Menu lateral responsivo para login e registro
 * Usa Sheet para funcionar bem em desktop e mobile
 */

import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LoginForm, SignUpForm } from './index';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

/**
 * Props do componente AuthSideMenu
 */
interface AuthSideMenuProps {
  /**
   * Controla se o menu está aberto
   */
  open: boolean;

  /**
   * Callback chamado quando o menu é fechado
   */
  onOpenChange: (open: boolean) => void;

  /**
   * Modo inicial do menu ('login' ou 'signup')
   */
  initialMode?: 'login' | 'signup';

  /**
   * Lado do qual o menu abre ('left' ou 'right')
   */
  side?: 'left' | 'right';
}

/**
 * Componente de Side Menu de autenticação
 * 
 * Menu lateral responsivo que funciona bem em desktop e mobile
 * 
 * @param props - Propriedades do componente
 * @returns JSX.Element
 */
export function AuthSideMenu({
  open,
  onOpenChange,
  initialMode = 'login',
  side = 'right',
}: AuthSideMenuProps): React.JSX.Element {
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
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={side}
        className={cn(
          // Largura responsiva
          'w-full sm:w-[400px] md:w-[450px]',
          // Layout flexível
          'flex flex-col',
          // Sem padding padrão (controlado internamente)
          'p-0',
          // Overflow controlado
          'overflow-hidden',
          // Altura total
          'h-full'
        )}
      >
        {/* Header fixo */}
        <SheetHeader className="px-6 pt-6 pb-4 border-b-2 border-border bg-background shrink-0">
          <SheetTitle className="text-2xl font-bold text-foreground">
            {mode === 'login' ? 'Entrar' : 'Criar Conta'}
          </SheetTitle>
          <SheetDescription className="text-base text-muted-foreground mt-2">
            {mode === 'login'
              ? 'Entre com sua conta para continuar'
              : 'Crie uma nova conta para começar'}
          </SheetDescription>
        </SheetHeader>

        {/* Conteúdo com scroll */}
        <ScrollArea className="flex-1 min-h-0">
          <div className="px-6 py-6">
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
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

