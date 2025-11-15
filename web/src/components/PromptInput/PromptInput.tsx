/**
 * Componente de input para prompt de geração de modelo 3D
 */

import React, { useState } from 'react';

export interface PromptInputProps {
  /** Valor inicial do prompt */
  initialValue?: string;
  /** Callback quando o prompt é submetido */
  onSubmit: (prompt: string) => void;
  /** Se está desabilitado */
  disabled?: boolean;
  /** Placeholder do input */
  placeholder?: string;
  /** Classe CSS adicional */
  className?: string;
}

/**
 * Componente PromptInput - Input para descrição do modelo 3D
 */
export function PromptInput({
  initialValue = '',
  onSubmit,
  disabled = false,
  placeholder = 'Descreva o modelo 3D que deseja gerar...',
  className = '',
}: PromptInputProps): React.JSX.Element {
  const [prompt, setPrompt] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (prompt.trim() && !disabled) {
      onSubmit(prompt.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`prompt-input-form ${className}`}>
      <div
        className={`prompt-input-container ${isFocused ? 'focused' : ''} ${disabled ? 'disabled' : ''}`}
        style={{
          position: 'relative',
          width: '100%',
          borderRadius: '12px',
          border: `2px solid ${isFocused ? '#007bff' : '#ddd'}`,
          backgroundColor: disabled ? '#f5f5f5' : '#fff',
          transition: 'all 0.2s ease',
          boxShadow: isFocused ? '0 4px 12px rgba(0, 123, 255, 0.15)' : '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          rows={4}
          style={{
            width: '100%',
            padding: '1rem',
            border: 'none',
            outline: 'none',
            resize: 'vertical',
            fontSize: '1rem',
            fontFamily: 'inherit',
            lineHeight: '1.5',
            backgroundColor: 'transparent',
            color: disabled ? '#999' : '#333',
            minHeight: '100px',
            maxHeight: '300px',
          }}
        />
        <div
          style={{
            padding: '0.75rem 1rem',
            borderTop: '1px solid #eee',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#fafafa',
            borderRadius: '0 0 10px 10px',
          }}
        >
          <span
            style={{
              fontSize: '0.75rem',
              color: '#999',
            }}
          >
            {prompt.length} caracteres • Pressione Ctrl+Enter para enviar
          </span>
          <button
            type="submit"
            disabled={disabled || !prompt.trim()}
            style={{
              padding: '0.5rem 1.5rem',
              backgroundColor: disabled || !prompt.trim() ? '#ccc' : '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: disabled || !prompt.trim() ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (!disabled && prompt.trim()) {
                e.currentTarget.style.backgroundColor = '#0056b3';
              }
            }}
            onMouseLeave={(e) => {
              if (!disabled && prompt.trim()) {
                e.currentTarget.style.backgroundColor = '#007bff';
              }
            }}
          >
            Gerar Modelo 3D
          </button>
        </div>
      </div>
    </form>
  );
}

