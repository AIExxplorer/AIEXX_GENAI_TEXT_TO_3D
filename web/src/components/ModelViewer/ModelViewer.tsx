/**
 * Componente Viewer 3D Principal - Ambiente limpo usando Neobrutalism
 */

import React, { useEffect, useState } from 'react';
import type { ModelInfo } from '@aiexx/viewer3d';
import { Viewer3D } from '@aiexx/viewer3d';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ModelViewerProps {
  /** Informações do modelo a ser exibido */
  model?: ModelInfo | null;
  /** Se está carregando */
  isLoading?: boolean;
  /** Mensagem de erro */
  error?: string | null;
  /** Classe CSS adicional */
  className?: string;
  /** Altura do viewer */
  height?: string | number;
}

/**
 * Componente ModelViewer - Viewer 3D principal em ambiente limpo
 */
export function ModelViewer({
  model,
  isLoading = false,
  error = null,
  className = '',
  height = '100%',
}: ModelViewerProps): React.JSX.Element {
  const [showEmptyState, setShowEmptyState] = useState(!model && !isLoading && !error);

  useEffect(() => {
    setShowEmptyState(!model && !isLoading && !error);
  }, [model, isLoading, error]);

  const viewerHeight = typeof height === 'number' ? `${height}px` : height;

  return (
    <Card
      className={cn('relative overflow-hidden', className)}
      style={{ height: viewerHeight }}
    >
      <CardContent className="h-full p-0">
        {showEmptyState && (
          <div className="flex h-full flex-col items-center justify-center p-12 text-center">
            <div className="mb-4 text-6xl">🎨</div>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl text-card-foreground">Ambiente de Visualização 3D</CardTitle>
            </CardHeader>
            <CardDescription className="max-w-md text-base text-muted-foreground">
              Digite um prompt acima para gerar seu modelo 3D. O artefato gerado aparecerá aqui automaticamente.
            </CardDescription>
          </div>
        )}

        {isLoading && (
          <div className="flex h-full flex-col items-center justify-center p-12 text-center">
            <Loader2 className="mb-4 h-12 w-12 animate-spin text-primary" />
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl text-card-foreground">Gerando Modelo 3D...</CardTitle>
            </CardHeader>
            <CardDescription className="text-base text-muted-foreground">
              Aguarde enquanto processamos seu prompt e geramos o modelo.
            </CardDescription>
          </div>
        )}

        {error && (
          <div className="flex h-full flex-col items-center justify-center p-12">
            <Alert variant="destructive" className="max-w-md">
              <div className="mb-2 text-4xl">⚠️</div>
              <AlertTitle className="text-xl">Erro ao Carregar Modelo</AlertTitle>
              <AlertDescription className="mt-2">{error}</AlertDescription>
            </Alert>
          </div>
        )}

        {model && !isLoading && !error && (
          <div className="h-full w-full">
            <Viewer3D model={model} width="100%" height="100%" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
