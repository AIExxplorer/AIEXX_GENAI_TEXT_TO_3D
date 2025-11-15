/**
 * Componente de navegação principal
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../ThemeToggle';

export interface NavigationProps {
  /** Classe CSS adicional */
  className?: string;
}

/**
 * Componente Navigation - Menu de navegação principal
 */
export function Navigation({ className = '' }: NavigationProps): React.JSX.Element {
  const location = useLocation();

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/', label: 'Início', icon: '🏠' },
    { path: '/generate', label: 'Gerar Modelo', icon: '🎨' },
    { path: '/gallery', label: 'Galeria', icon: '🖼️' },
    { path: '/about', label: 'Sobre', icon: 'ℹ️' },
  ];

  return (
    <nav
      className={`navigation ${className}`}
      style={{
        backgroundColor: 'var(--color-bg-primary)',
        borderBottom: '2px solid var(--color-bg-tertiary)',
        boxShadow: 'var(--shadow-sm)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backdropFilter: 'blur(10px)',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '70px',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textDecoration: 'none',
            color: 'var(--color-text-primary)',
            fontWeight: '700',
            fontSize: '1.5rem',
            transition: 'opacity var(--transition-fast)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.8';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
          }}
        >
          <span style={{ fontSize: '2rem' }}>🎨</span>
          <span>AIEXX 3D</span>
        </Link>

        {/* Menu Items */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center',
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                padding: '0.75rem 1.25rem',
                textDecoration: 'none',
                color: isActive(item.path) ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                fontWeight: isActive(item.path) ? '600' : '400',
                borderRadius: '8px',
                transition: 'all var(--transition-fast)',
                backgroundColor: isActive(item.path) ? 'var(--color-bg-secondary)' : 'transparent',
                borderBottom: isActive(item.path) ? `3px solid var(--color-primary)` : '3px solid transparent',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
              onMouseEnter={(e) => {
                if (!isActive(item.path)) {
                  e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
                  e.currentTarget.style.color = 'var(--color-text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(item.path)) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--color-text-secondary)';
                }
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
          
          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

