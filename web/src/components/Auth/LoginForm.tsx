/**
 * Componente de formulário de login
 *
 * Permite que usuários façam login com email e senha
 */

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Mail, Lock } from 'lucide-react';
import { GoogleSignInButton } from './GoogleSignInButton';

/**
 * Props do componente LoginForm
 */
interface LoginFormProps {
  /**
   * Callback chamado após login bem-sucedido
   */
  onSuccess?: () => void;

  /**
   * Callback para alternar para o formulário de registro
   */
  onSwitchToSignUp?: () => void;
}

/**
 * Componente de formulário de login
 *
 * @param props - Propriedades do componente
 * @returns JSX.Element
 */
export function LoginForm({
  onSuccess,
  onSwitchToSignUp,
}: LoginFormProps): React.JSX.Element {
  const { signIn, signInWithGoogle, authState } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [googleLoading, setGoogleLoading] = useState(false);

  /**
   * Manipula o envio do formulário
   */
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    const result = await signIn({ email, password });

    if (result.success) {
      onSuccess?.();
    } else {
      setError(result.error || 'Erro ao fazer login');
    }
  };

  /**
   * Manipula o login com Google
   */
  const handleGoogleSignIn = async (): Promise<void> => {
    setError(null);
    setGoogleLoading(true);

    try {
      // O redirectTo agora é gerenciado automaticamente pelo hook useAuth
      const result = await signInWithGoogle();
      if (!result.success) {
        setError(result.error || 'Erro ao fazer login com Google');
      }
      // Se bem-sucedido, o redirecionamento será automático
    } catch (err) {
      setError('Erro ao fazer login com Google');
    } finally {
      setGoogleLoading(false);
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
          <Badge variant="neutral" className="text-xs font-semibold !text-main">
            Email
          </Badge>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="pl-10 !text-main placeholder:!text-gray-500"
              required
              disabled={authState.loading}
              style={{ color: 'hsl(173 100% 42%)' }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Badge variant="neutral" className="text-xs font-semibold !text-main">
            Senha
          </Badge>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="pl-10 !text-main placeholder:!text-gray-500"
              required
              disabled={authState.loading}
              style={{ color: 'hsl(173 100% 42%)' }}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={authState.loading || googleLoading}
        >
          {authState.loading ? (
            <>
              <Loader2 className="animate-spin" />
              Entrando...
            </>
          ) : (
            'Entrar'
          )}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">ou</span>
          </div>
        </div>

        <GoogleSignInButton
          onClick={handleGoogleSignIn}
          loading={googleLoading || authState.loading}
          label="Continuar com Google"
        />

        {onSwitchToSignUp && (
          <div className="text-center text-sm pt-2">
            <span className="text-muted-foreground">Não tem uma conta? </span>
            <button
              type="button"
              onClick={onSwitchToSignUp}
              className="text-main hover:underline font-semibold transition-colors"
            >
              Criar conta
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
