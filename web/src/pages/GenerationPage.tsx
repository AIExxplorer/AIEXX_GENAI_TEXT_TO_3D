/**
 * Página principal de geração de modelos 3D
 */

import React from 'react';
import { Layout } from '../components/Layout';
import { PromptInput } from '../components/PromptInput';
import { ModelViewer } from '../components/ModelViewer';
import { GenerationStatus } from '../components/GenerationStatus';
import { useGeneration } from '../hooks/useGeneration';

/**
 * Página GenerationPage - Interface principal para geração de modelos 3D
 */
export function GenerationPage(): React.JSX.Element {
  const { generate, status, generation, model, isLoading, error, reset } = useGeneration();

  const handlePromptSubmit = async (prompt: string): Promise<void> => {
    await generate(prompt);
  };

  return (
    <Layout>
      <div
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          padding: '2rem',
          minHeight: 'calc(100vh - 140px)',
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
          }}
        >
          {/* Header */}
          <header
            style={{
              textAlign: 'center',
              marginBottom: '3rem',
            }}
          >
            <h1
            style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: 'var(--color-text-primary)',
              marginBottom: '0.5rem',
            }}
          >
            🎨 Gerador de Modelos 3D
          </h1>
          <p
            style={{
              fontSize: '1.1rem',
              color: 'var(--color-text-secondary)',
            }}
          >
              Descreva o modelo 3D que deseja criar e deixe a IA fazer o trabalho
            </p>
          </header>

          {/* Prompt Input */}
          <section
            style={{
              marginBottom: '2rem',
            }}
          >
            <PromptInput
              onSubmit={handlePromptSubmit}
              disabled={isLoading}
              placeholder="Ex: Uma gaiola industrial metálica com portas gradeadas e estrutura robusta"
            />
          </section>

          {/* Status */}
          {status && generation && (
            <section
              style={{
                marginBottom: '2rem',
              }}
            >
              <GenerationStatus
                status={status}
                message={generation.prompt}
                estimatedTime={generation.estimated_time}
              />
            </section>
          )}

          {/* Model Viewer */}
          <section>
            <ModelViewer
              model={model}
              isLoading={isLoading}
              error={error}
              height={600}
            />
          </section>

          {/* Reset Button */}
          {(model || error) && (
            <section
              style={{
                marginTop: '2rem',
                textAlign: 'center',
              }}
            >
              <button
                onClick={reset}
              style={{
                padding: '0.75rem 2rem',
                backgroundColor: 'var(--color-bg-tertiary)',
                color: 'var(--color-text-primary)',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
              >
                Gerar Novo Modelo
              </button>
            </section>
          )}
        </div>
      </div>
    </Layout>
  );
}

