/**
 * Componente de input para prompt de geração de modelo 3D usando Neobrutalism
 */

import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

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
    <form onSubmit={handleSubmit} className={className}>
      <Card className={cn('transition-all', isFocused && 'ring-2 ring-primary')}>
        <CardContent className="p-0">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={placeholder}
            rows={6}
            className="min-h-[150px] resize-y border-0 border-b-2 rounded-none rounded-t-base"
          />
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t-2 bg-muted/30">
          <Label className="text-xs text-muted-foreground font-normal">
            {prompt.length} caracteres • Pressione Ctrl+Enter para enviar
          </Label>
          <Button
            type="submit"
            disabled={disabled || !prompt.trim()}
            variant="default"
            size="sm"
          >
            Gerar Modelo 3D
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
