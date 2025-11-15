/**
 * Componente de navegação principal
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

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
        backgroundColor: '#fff',
        borderBottom: '2px solid #e0e0e0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
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
            color: '#333',
            fontWeight: '700',
            fontSize: '1.5rem',
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
                color: isActive(item.path) ? '#007bff' : '#666',
                fontWeight: isActive(item.path) ? '600' : '400',
                borderRadius: '8px',
                transition: 'all 0.2s ease',
                backgroundColor: isActive(item.path) ? '#e7f3ff' : 'transparent',
                borderBottom: isActive(item.path) ? '3px solid #007bff' : '3px solid transparent',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
              onMouseEnter={(e) => {
                if (!isActive(item.path)) {
                  e.currentTarget.style.backgroundColor = '#f5f5f5';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(item.path)) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

