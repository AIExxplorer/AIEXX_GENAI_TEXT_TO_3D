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
      description: 'Descreva o modelo que deseja criar em linguagem natural e deixe a IA fazer o trabalho.',
    },
    {
      icon: '⚡',
      title: 'Processamento Rápido',
      description: 'Geração eficiente de modelos 3D com alta qualidade em minutos.',
    },
    {
      icon: '👁️',
      title: 'Visualização em Tempo Real',
      description: 'Visualize seus modelos 3D diretamente no navegador com nosso motor de visualização.',
    },
    {
      icon: '📦',
      title: 'Múltiplos Formatos',
      description: 'Exporte seus modelos em OBJ, MTL, GLTF e outros formatos populares.',
    },
    {
      icon: '🔧',
      title: 'Modelos Parametrizados',
      description: 'Geração procedural usando código Python para modelos customizáveis.',
    },
    {
      icon: '🌐',
      title: 'Responsivo',
      description: 'Funciona perfeitamente em desktop, tablet e mobile.',
    },
  ];

  const steps = [
    { step: '1', title: 'Descreva seu Modelo', description: 'Digite uma descrição detalhada do modelo 3D que deseja criar.' },
    { step: '2', title: 'IA Processa', description: 'Nossa IA analisa sua descrição e gera o código Python necessário.' },
    { step: '3', title: 'Geração do Modelo', description: 'O modelo 3D é gerado usando geração procedural parametrizada.' },
    { step: '4', title: 'Visualize e Baixe', description: 'Visualize o modelo no navegador e baixe nos formatos desejados.' },
  ];

  return (
    <Layout>
      <div className="h-[calc(100vh-140px)]">
        <ScrollArea className="h-full">
          <div className="container mx-auto px-4 py-16">
            {/* Hero Section */}
            <section className="mb-16 text-center">
              <h1 className="mb-4 text-5xl font-bold leading-tight text-foreground md:text-6xl">
                🎨 Gere Modelos 3D com IA
              </h1>
              <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
                Transforme suas ideias em modelos 3D profissionais usando Inteligência Artificial.
                Descreva o que você quer criar e deixe a tecnologia fazer o trabalho.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" variant="default">
                  <Link to="/generate">🚀 Começar Agora</Link>
                </Button>
                <Button asChild size="lg" variant="neutral">
                  <Link to="/gallery">🖼️ Ver Galeria</Link>
                </Button>
              </div>
            </section>

            {/* Features Section */}
            <section className="mb-16">
              <h2 className="mb-12 text-center text-4xl font-bold text-foreground">
                ✨ Recursos Principais
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {features.map((feature, index) => (
                  <Card key={index} className="transition-transform hover:-translate-y-1">
                    <CardHeader>
                      <div className="mb-4 text-5xl">{feature.icon}</div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* How It Works Section */}
            <section className="mb-16">
              <Card className="bg-background">
                <CardHeader>
                  <CardTitle className="text-center text-4xl">🔄 Como Funciona</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mx-auto max-w-2xl space-y-6">
                    {steps.map((item) => (
                      <div key={item.step} className="flex gap-6">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                          {item.step}
                        </div>
                        <div>
                          <h3 className="mb-2 text-xl font-semibold text-foreground">
                            {item.title}
                          </h3>
                          <p className="text-muted-foreground">
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
              <CardContent className="p-12 text-center">
                <CardTitle className="mb-4 text-4xl font-bold">
                  Pronto para começar?
                </CardTitle>
                <CardDescription className="mb-8 text-xl text-primary-foreground/90">
                  Crie seu primeiro modelo 3D agora mesmo. É rápido, fácil e gratuito!
                </CardDescription>
                <Button asChild size="lg" variant="reverse">
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
