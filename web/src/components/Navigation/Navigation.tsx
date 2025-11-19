/**
 * Componente de navegação principal usando Neobrutalism
 */

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../ThemeToggle';
import { AuthSideMenu } from '../Auth/AuthSideMenu';
import { UserMenu } from '../User/UserMenu';
import { useAuthContext } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { LogIn } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

export interface NavigationProps {
  /** Classe CSS adicional */
  className?: string;
}

/**
 * Componente Navigation - Menu de navegação principal com estilo Neobrutalism
 */
export function Navigation({ className = '' }: NavigationProps): React.JSX.Element {
  const location = useLocation();
  const { user, userProfile, loading, isAuthenticated } = useAuthContext();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const isActive = (path: string): boolean => {
    return location.pathname === path;
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
          className="flex items-center gap-2 text-xl font-bold !text-black dark:!text-white transition-opacity hover:opacity-80"
        >
          <span className="text-2xl">🎨</span>
          <span className="font-extrabold !text-black dark:!text-white">AIEXX 3D</span>
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
                        : '!text-black dark:!text-white border-transparent hover:bg-muted hover:border-border'
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
          {isAuthenticated ? (
            <Button
              variant="noShadow"
              size="icon"
              className="rounded-full p-0"
              onClick={() => setShowUserMenu(true)}
            >
              {loading ? (
                <Skeleton className="h-10 w-10 rounded-full" />
              ) : (
                <Avatar className="h-10 w-10 border-2 border-border cursor-pointer hover:opacity-80 transition-opacity">
                  {(() => {
                    const userMetadata = user?.user_metadata || {};
                    const avatarUrl = userProfile?.avatar_url || userMetadata.avatar_url || userMetadata.picture;
                    const displayName = userProfile?.full_name || userMetadata.full_name || userMetadata.name || 'Usuário';
                    
                    return avatarUrl ? (
                      <AvatarImage src={avatarUrl} alt={displayName} />
                    ) : null;
                  })()}
                  <AvatarFallback className="text-sm font-bold">
                    {(() => {
                      const userMetadata = user?.user_metadata || {};
                      const name = userProfile?.full_name || userMetadata.full_name || userMetadata.name;
                      return name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U';
                    })()}
                  </AvatarFallback>
                </Avatar>
              )}
            </Button>
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

      {/* Auth Side Menu */}
      <AuthSideMenu
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        initialMode="login"
        side="right"
      />

      {/* User Menu */}
      <UserMenu
        open={showUserMenu}
        onOpenChange={setShowUserMenu}
        side="right"
      />
    </nav>
  );
}
