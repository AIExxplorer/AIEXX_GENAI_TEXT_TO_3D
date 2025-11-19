/**
 * Página de Galeria - Exibe modelos gerados usando Neobrutalism
 */

import React from 'react';
import { Layout } from '../components/Layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

/**
 * Página GalleryPage - Galeria de modelos gerados
 */
export function GalleryPage(): React.JSX.Element {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-140px)]">
        <ScrollArea className="h-full">
          <div className="container mx-auto px-4 py-6 md:py-8">
            <Card className="mb-6 md:mb-8">
              <CardHeader className="text-center px-4 py-4 md:py-6">
                <CardTitle className="text-2xl sm:text-3xl md:text-4xl">
                  🖼️ Galeria de Modelos
                </CardTitle>
                <CardDescription className="text-base md:text-lg mt-2">
                  Explore os modelos 3D gerados pela comunidade
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center p-8 md:p-12 text-center">
                <div className="mb-4 text-5xl md:text-6xl">🎨</div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl md:text-2xl">
                    Galeria em Desenvolvimento
                  </CardTitle>
                </CardHeader>
                <CardDescription className="text-sm md:text-base px-4">
                  Esta funcionalidade será implementada em breve. Você poderá
                  visualizar e explorar todos os modelos gerados.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </div>
    </Layout>
  );
}
