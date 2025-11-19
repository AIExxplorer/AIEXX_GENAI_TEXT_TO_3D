/**
 * Página Sobre - Informações sobre o projeto usando Neobrutalism
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
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

/**
 * Página AboutPage - Informações sobre o projeto
 */
export function AboutPage(): React.JSX.Element {
  const technologies = [
    'Python',
    'React',
    'TypeScript',
    'Vite',
    'Three.js',
    'Online-3D-Viewer',
    'FastAPI',
    'Vercel',
  ];

  const features = [
    'Geração de modelos 3D a partir de descrições em texto',
    'Visualização em tempo real no navegador',
    'Suporte a múltiplos formatos (OBJ, MTL, GLTF)',
    'Geração procedural parametrizada',
    'Interface responsiva e moderna',
    'API REST completa',
  ];

  return (
    <Layout>
      <div className="min-h-[calc(100vh-140px)]">
        <ScrollArea className="h-full">
          <div className="container mx-auto px-4 py-6 md:py-8">
            <Card className="mb-6 md:mb-8">
              <CardHeader className="text-center px-4 py-4 md:py-6">
                <CardTitle className="text-2xl sm:text-3xl md:text-4xl">
                  ℹ️ Sobre o Projeto
                </CardTitle>
              </CardHeader>
            </Card>

            <Card>
              <CardContent className="space-y-6 md:space-y-8 px-4 md:px-6">
                <section>
                  <CardHeader className="px-0 pb-3 md:pb-4">
                    <CardTitle className="text-xl md:text-2xl">
                      🎯 Sobre
                    </CardTitle>
                  </CardHeader>
                  <CardDescription className="space-y-3 md:space-y-4 text-sm md:text-base leading-relaxed">
                    <p>
                      <strong>AIEXX_GENAI_TEXT_TO_3D</strong> é uma solução
                      completa para geração e visualização de modelos 3D usando
                      Inteligência Artificial.
                    </p>
                    <p>
                      O projeto utiliza geração procedural através de código
                      Python para criar modelos 3D parametrizados e
                      customizáveis, seguindo o mesmo padrão do projeto de
                      referência.
                    </p>
                  </CardDescription>
                </section>

                <section>
                  <CardHeader className="px-0 pb-3 md:pb-4">
                    <CardTitle className="text-xl md:text-2xl">
                      🛠️ Tecnologias
                    </CardTitle>
                  </CardHeader>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map(tech => (
                      <Badge
                        key={tech}
                        variant="default"
                        className="text-xs md:text-sm"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </section>

                <section>
                  <CardHeader className="px-0 pb-3 md:pb-4">
                    <CardTitle className="text-xl md:text-2xl">
                      📚 Recursos
                    </CardTitle>
                  </CardHeader>
                  <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </div>
    </Layout>
  );
}
