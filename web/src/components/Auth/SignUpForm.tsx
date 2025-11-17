/**
 * Componente de formulário de registro
 * 
 * Permite que novos usuários criem uma conta
 */

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Mail, Lock, User } from 'lucide-react';

/**
 * Props do componente SignUpForm
 */
interface SignUpFormProps {
  /**
   * Callback chamado após registro bem-sucedido
   */
  onSuccess?: () => void;

  /**
   * Callback para alternar para o formulário de login
   */
  onSwitchToLogin?: () => void;
}

/**
 * Componente de formulário de registro
 * 
 * @param props - Propriedades do componente
 * @returns JSX.Element
 */
export function SignUpForm({ onSuccess, onSwitchToLogin }: SignUpFormProps): React.JSX.Element {
  const { signUp, authState } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  /**
   * Manipula o envio do formulário
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError(null);

    if (!email || !password || !confirmPassword) {
      setError('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    const result = await signUp({
      email,
      password,
      fullName: fullName || undefined,
    });

    if (result.success) {
      onSuccess?.();
    } else {
      setError(result.error || 'Erro ao criar conta');
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="fullName">Nome Completo (opcional)</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="fullName"
                type="text"
                placeholder="Seu nome"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="pl-10"
                disabled={authState.loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
                disabled={authState.loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
                disabled={authState.loading}
                minLength={6}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Mínimo de 6 caracteres
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10"
                required
                disabled={authState.loading}
                minLength={6}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={authState.loading}
          >
            {authState.loading ? (
              <>
                <Loader2 className="animate-spin" />
                Criando conta...
              </>
            ) : (
              'Criar Conta'
            )}
          </Button>

          {onSwitchToLogin && (
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Já tem uma conta? </span>
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-main hover:underline font-medium"
              >
                Entrar
              </button>
            </div>
          )}
        </form>
    </div>
  );
}

