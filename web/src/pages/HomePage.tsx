/**
 * Página inicial - Landing page com componentes Neobrutalism
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

/**
 * Página HomePage - Página inicial da aplicação
 */
export function HomePage(): React.JSX.Element {
  const features = [
    {
      icon: '🎨',
      title: 'Geração por Prompt',
      description:
        'Descreva o modelo que deseja criar em linguagem natural e deixe a IA fazer o trabalho.',
    },
    {
      icon: '⚡',
      title: 'Processamento Rápido',
      description:
        'Geração eficiente de modelos 3D com alta qualidade em minutos.',
    },
    {
      icon: '👁️',
      title: 'Visualização em Tempo Real',
      description:
        'Visualize seus modelos 3D diretamente no navegador com nosso motor de visualização.',
    },
    {
      icon: '📦',
      title: 'Múltiplos Formatos',
      description:
        'Exporte seus modelos em OBJ, MTL, GLTF e outros formatos populares.',
    },
    {
      icon: '🔧',
      title: 'Modelos Parametrizados',
      description:
        'Geração procedural usando código Python para modelos customizáveis.',
    },
    {
      icon: '🌐',
      title: 'Responsivo',
      description: 'Funciona perfeitamente em desktop, tablet e mobile.',
    },
  ];

  const steps = [
    {
      step: '1',
      title: 'Descreva seu Modelo',
      description:
        'Digite uma descrição detalhada do modelo 3D que deseja criar.',
    },
    {
      step: '2',
      title: 'IA Processa',
      description:
        'Nossa IA analisa sua descrição e gera o código Python necessário.',
    },
    {
      step: '3',
      title: 'Geração do Modelo',
      description:
        'O modelo 3D é gerado usando geração procedural parametrizada.',
    },
    {
      step: '4',
      title: 'Visualize e Baixe',
      description:
        'Visualize o modelo no navegador e baixe nos formatos desejados.',
    },
  ];

  return (
    <Layout>
      <div className="min-h-[calc(100vh-140px)]">
        <ScrollArea className="h-full">
          <div className="container mx-auto px-4 py-8 md:py-16">
            {/* Hero Section */}
            <section className="mb-12 md:mb-16 text-center">
              <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight !text-black dark:!text-white">
                🎨 Gere Modelos 3D com IA
              </h1>
              <p className="mx-auto mb-6 md:mb-8 max-w-2xl text-base sm:text-lg md:text-xl text-muted-foreground px-4">
                Transforme suas ideias em modelos 3D profissionais usando
                Inteligência Artificial. Descreva o que você quer criar e deixe
                a tecnologia fazer o trabalho.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4 px-4">
                <Button
                  asChild
                  size="lg"
                  variant="default"
                  className="w-full sm:w-auto"
                >
                  <Link to="/generate">🚀 Começar Agora</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="neutral"
                  className="!text-black dark:!text-white w-full sm:w-auto"
                >
                  <Link to="/gallery" className="!text-black dark:!text-white">
                    🖼️ Ver Galeria
                  </Link>
                </Button>
              </div>
            </section>

            {/* Features Section */}
            <section className="mb-12 md:mb-16">
              <h2 className="mb-8 md:mb-12 text-center text-2xl sm:text-3xl md:text-4xl font-bold !text-black dark:!text-white px-4">
                ✨ Recursos Principais
              </h2>
              <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature, index) => (
                  <Card
                    key={index}
                    className="transition-transform hover:-translate-y-1"
                  >
                    <CardHeader>
                      <div className="mb-3 md:mb-4 text-4xl md:text-5xl">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-lg md:text-xl !text-black dark:!text-white">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm md:text-base">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* How It Works Section */}
            <section className="mb-12 md:mb-16">
              <Card className="bg-background">
                <CardHeader>
                  <CardTitle className="text-center text-2xl sm:text-3xl md:text-4xl !text-black dark:!text-white px-4">
                    🔄 Como Funciona
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 md:px-6">
                  <div className="mx-auto max-w-2xl space-y-4 md:space-y-6">
                    {steps.map(item => (
                      <div key={item.step} className="flex gap-4 md:gap-6">
                        <div className="flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full bg-primary text-base md:text-lg font-bold text-primary-foreground">
                          {item.step}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="mb-1 md:mb-2 text-base md:text-xl font-semibold !text-black dark:!text-white">
                            {item.title}
                          </h3>
                          <p className="text-sm md:text-base text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* CTA Section */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6 md:p-12 text-center">
                <CardTitle className="mb-3 md:mb-4 text-2xl sm:text-3xl md:text-4xl font-bold">
                  Pronto para começar?
                </CardTitle>
                <CardDescription className="mb-6 md:mb-8 text-base sm:text-lg md:text-xl text-primary-foreground/90 px-4">
                  Crie seu primeiro modelo 3D agora mesmo. É rápido e fácil!
                </CardDescription>
                <Button
                  asChild
                  size="lg"
                  variant="reverse"
                  className="w-full sm:w-auto"
                >
                  <Link to="/generate">🎨 Gerar Meu Primeiro Modelo</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </div>
    </Layout>
  );
}
