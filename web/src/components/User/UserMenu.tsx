/**
 * Componente de Menu do Usuário (Side Menu)
 * 
 * Menu lateral que abre ao clicar no avatar do usuário logado
 * Exibe informações do perfil, opções principais e botão de logout
 */

import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuthContext } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { LogOut, User, FileText, Image as ImageIcon, Home, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Props do componente UserMenu
 */
interface UserMenuProps {
  /**
   * Controla se o menu está aberto
   */
  open: boolean;

  /**
   * Callback chamado quando o menu é fechado
   */
  onOpenChange: (open: boolean) => void;

  /**
   * Lado do qual o menu abre ('left' ou 'right')
   */
  side?: 'left' | 'right';
}

/**
 * Componente de Menu do Usuário
 * 
 * Menu lateral responsivo que exibe informações do perfil e opções do usuário
 * 
 * @param props - Propriedades do componente
 * @returns JSX.Element
 */
export function UserMenu({
  open,
  onOpenChange,
  side = 'right',
}: UserMenuProps): React.JSX.Element {
  const { user, userProfile, loading, signOut } = useAuthContext();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  /**
   * Manipula logout
   */
  const handleSignOut = async (): Promise<void> => {
    if (isLoggingOut) return; // Prevenir múltiplos cliques
    
    setIsLoggingOut(true);
    console.log('[UserMenu] Iniciando logout...');
    
    // Fechar menu imediatamente
    onOpenChange(false);
    
    try {
      // Executar logout
      await signOut();
      console.log('[UserMenu] Logout concluído, redirecionando...');
    } catch (error) {
      console.error('[UserMenu] Erro ao fazer logout:', error);
    } finally {
      // Sempre redirecionar após logout (mesmo com erro)
      // Usar window.location para garantir reload completo
      // Aguardar um pouco para garantir que o storage foi limpo
      setTimeout(() => {
        console.log('[UserMenu] Redirecionando para home...');
        window.location.href = '/';
      }, 300);
    }
  };

  /**
   * Navega para uma rota e fecha o menu
   */
  const handleNavigate = (path: string): void => {
    navigate(path);
    onOpenChange(false);
  };

  // Fallback: pegar dados do auth.user se o perfil não tiver
  // O Supabase armazena dados do Google em user_metadata
  const userMetadata = user?.user_metadata || {};
  
  const displayName = userProfile?.full_name 
    || userMetadata.full_name 
    || userMetadata.name 
    || user?.email?.split('@')[0] 
    || 'Usuário';
  
  const avatarUrl = userProfile?.avatar_url 
    || userMetadata.avatar_url 
    || userMetadata.picture 
    || undefined;
  
  const userEmail = userProfile?.email || user?.email || '';

  /**
   * Opções do menu
   */
  const menuOptions = [
    {
      icon: Home,
      label: 'Início',
      path: '/',
      description: 'Voltar para a página inicial',
    },
    {
      icon: FileText,
      label: 'Meus Arquivos',
      path: '/viewer',
      description: 'Visualizar meus modelos 3D',
    },
    {
      icon: ImageIcon,
      label: 'Galeria',
      path: '/gallery',
      description: 'Explorar modelos da galeria',
    },
  ];

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
        {/* Header fixo com informações do usuário */}
        <SheetHeader className="px-6 pt-6 pb-4 border-b-2 border-border bg-background shrink-0">
          <SheetTitle className="text-2xl font-bold text-black! dark:text-white! flex items-center gap-2">
            <User className="h-6 w-6 text-black! dark:text-white!" />
            Minha Conta
          </SheetTitle>
          <SheetDescription className="text-base text-black! dark:text-white! mt-2">
            Gerencie sua conta e preferências
          </SheetDescription>

          {/* Perfil do usuário */}
          <div className="flex items-center gap-4 mt-4 pt-4 border-t-2 border-border">
            {loading ? (
              <>
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                </div>
              </>
            ) : (
              <>
                <Avatar className="h-16 w-16 border-2 border-border">
                  {avatarUrl ? (
                    <AvatarImage src={avatarUrl} alt={displayName} />
                  ) : null}
                  <AvatarFallback className="text-lg font-bold">
                    {displayName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-semibold text-black! dark:text-white! truncate">
                    {displayName}
                  </p>
                  <p className="text-sm text-black! dark:text-white! truncate">
                    {userEmail}
                  </p>
                  {userProfile?.provider && (
                    <p className="text-xs text-black! dark:text-white! mt-1">
                      Conectado via {userProfile.provider === 'google' ? 'Google' : 'Email'}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </SheetHeader>

        {/* Conteúdo com scroll */}
        <ScrollArea className="flex-1 min-h-0">
          <div className="px-6 py-6 space-y-2">
            {/* Opções do menu */}
            {menuOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Button
                  key={option.path}
                  variant="neutral"
                  className="w-full justify-start gap-3 h-auto py-3 px-4 text-black! dark:text-white!"
                  onClick={() => handleNavigate(option.path)}
                  asChild
                >
                  <Link to={option.path} className="text-black! dark:text-white!">
                    <Icon className="h-5 w-5 shrink-0 text-black! dark:text-white!" />
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-black! dark:text-white!">{option.label}</p>
                      <p className="text-xs text-black! dark:text-white!">
                        {option.description}
                      </p>
                    </div>
                  </Link>
                </Button>
              );
            })}
          </div>
        </ScrollArea>

        {/* Footer fixo com botão de logout */}
        <div className="px-6 py-4 border-t-2 border-border bg-background shrink-0">
          <Button
            variant="default"
            className="w-full gap-2"
            onClick={handleSignOut}
            disabled={isLoggingOut || loading}
          >
            {isLoggingOut ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Saindo...</span>
              </>
            ) : (
              <>
                <LogOut className="h-5 w-5" />
                <span>Sair</span>
              </>
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

