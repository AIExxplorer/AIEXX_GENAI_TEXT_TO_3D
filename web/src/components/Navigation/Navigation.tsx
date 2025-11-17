/**
 * Componente de navegação principal usando Neobrutalism
 */

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../ThemeToggle';
import { AuthDialog } from '../Auth/AuthDialog';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { LogIn, LogOut, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export interface NavigationProps {
  /** Classe CSS adicional */
  className?: string;
}

/**
 * Componente Navigation - Menu de navegação principal com estilo Neobrutalism
 */
export function Navigation({ className = '' }: NavigationProps): React.JSX.Element {
  const location = useLocation();
  const { authState, signOut, isAuthenticated } = useAuth();
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  /**
   * Manipula logout
   */
  const handleSignOut = async (): Promise<void> => {
    await signOut();
  };

  const navItems = [
    { path: '/', label: 'Início', icon: '🏠' },
    { path: '/generate', label: 'Gerar Modelo', icon: '🎨' },
    { path: '/viewer', label: 'Visualizar', icon: '👁️' },
    { path: '/gallery', label: 'Galeria', icon: '🖼️' },
    { path: '/about', label: 'Sobre', icon: 'ℹ️' },
  ];

  return (
    <nav
      className={cn('sticky top-0 z-50 border-b-4 border-border bg-background shadow-shadow', className)}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-white transition-opacity hover:opacity-80"
        >
          <span className="text-2xl">🎨</span>
          <span className="font-extrabold">AIEXX 3D</span>
        </Link>

        {/* Navigation Menu */}
        <NavigationMenu>
          <NavigationMenuList className="flex gap-2">
            {navItems.map((item) => (
              <NavigationMenuItem key={item.path}>
                <NavigationMenuLink asChild>
                  <Link
                    to={item.path}
                    className={cn(
                      'flex items-center gap-2 px-5 py-2.5 text-base font-semibold transition-all rounded-base border-2',
                      isActive(item.path)
                        ? 'bg-primary text-primary-foreground border-border shadow-shadow'
                        : 'text-white border-transparent hover:bg-muted hover:border-border'
                    )}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          {/* Auth Section */}
          {isAuthenticated() ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="noShadow" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {authState.user?.email?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">Minha Conta</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {authState.user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="default"
              size="sm"
              onClick={() => setShowAuthDialog(true)}
              className="gap-2"
            >
              <LogIn className="h-4 w-4" />
              Entrar
            </Button>
          )}

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>

      {/* Auth Dialog */}
      <AuthDialog
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        initialMode="login"
      />
    </nav>
  );
}
