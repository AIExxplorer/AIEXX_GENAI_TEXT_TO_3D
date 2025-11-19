/**
 * Página principal de geração de modelos 3D usando componentes Neobrutalism
 */

import React from 'react';
import { Layout } from '../components/Layout';
import { PromptInput } from '../components/PromptInput';
import { ModelViewer } from '../components/ModelViewer';
import { GenerationStatus } from '../components/GenerationStatus';
import { useGeneration } from '../hooks/useGeneration';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

/**
 * Página GenerationPage - Interface principal para geração de modelos 3D
 */
export function GenerationPage(): React.JSX.Element {
  const { generate, status, generation, model, isLoading, error, reset } =
    useGeneration();

  const handlePromptSubmit = async (prompt: string): Promise<void> => {
    await generate(prompt);
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-140px)]">
        <ScrollArea className="h-full">
          <div className="container mx-auto px-4 py-6 md:py-8">
            {/* Header */}
            <Card className="mb-6 md:mb-8">
              <CardHeader className="text-center px-4 py-4 md:py-6">
                <CardTitle className="text-2xl sm:text-3xl md:text-4xl">
                  🎨 Gerador de Modelos 3D
                </CardTitle>
                <CardDescription className="text-base md:text-lg mt-2">
                  Descreva o modelo 3D que deseja criar e deixe a IA fazer o
                  trabalho
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Prompt Input */}
            <section className="mb-6">
              <PromptInput
                onSubmit={handlePromptSubmit}
                disabled={isLoading}
                placeholder="Ex: Uma gaiola industrial metálica com portas gradeadas e estrutura robusta"
              />
            </section>

            {/* Status */}
            {status && generation && (
              <section className="mb-6">
                <GenerationStatus
                  status={status}
                  message={generation.prompt}
                  estimatedTime={generation.estimated_time}
                />
              </section>
            )}

            {/* Model Viewer */}
            <section className="mb-6">
              <ModelViewer
                model={model}
                isLoading={isLoading}
                error={error}
                height="400px"
                className="min-h-[300px] md:min-h-[400px] lg:min-h-[600px]"
              />
            </section>

            {/* Reset Button */}
            {(model || error) && (
              <section className="mt-6 text-center">
                <Button
                  onClick={reset}
                  variant="neutral"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Gerar Novo Modelo
                </Button>
              </section>
            )}
          </div>
        </ScrollArea>
      </div>
    </Layout>
  );
}
