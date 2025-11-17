/**
 * Página de Galeria - Exibe modelos gerados usando Neobrutalism
 */

import React from 'react';
import { Layout } from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

/**
 * Página GalleryPage - Galeria de modelos gerados
 */
export function GalleryPage(): React.JSX.Element {
  return (
    <Layout>
      <div className="h-[calc(100vh-140px)]">
        <ScrollArea className="h-full">
          <div className="container mx-auto px-4 py-8">
            <Card className="mb-8">
              <CardHeader className="text-center">
                <CardTitle className="text-4xl">🖼️ Galeria de Modelos</CardTitle>
                <CardDescription className="text-lg">
                  Explore os modelos 3D gerados pela comunidade
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                <div className="mb-4 text-6xl">🎨</div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl">Galeria em Desenvolvimento</CardTitle>
                </CardHeader>
                <CardDescription className="text-base">
                  Esta funcionalidade será implementada em breve. Você poderá visualizar e explorar todos os modelos gerados.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </div>
    </Layout>
  );
}
