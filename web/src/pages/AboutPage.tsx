/**
 * Página Sobre - Informações sobre o projeto
 */

import React from 'react';
import { Layout } from '../components/Layout';

/**
 * Página AboutPage - Informações sobre o projeto
 */
export function AboutPage(): React.JSX.Element {
  return (
    <Layout>
      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '3rem 2rem',
        }}
      >
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
              color: '#333',
              marginBottom: '0.5rem',
            }}
          >
            ℹ️ Sobre o Projeto
          </h1>
        </header>

        <div
          style={{
            backgroundColor: '#fff',
            padding: '3rem',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <section style={{ marginBottom: '2rem' }}>
            <h2
              style={{
                fontSize: '1.8rem',
                fontWeight: '600',
                color: '#333',
                marginBottom: '1rem',
              }}
            >
              🎯 Sobre
            </h2>
            <p
              style={{
                color: '#666',
                lineHeight: '1.8',
                marginBottom: '1rem',
              }}
            >
              <strong>AIEXX_GENAI_TEXT_TO_3D</strong> é uma solução completa para geração e visualização de modelos 3D usando Inteligência Artificial.
            </p>
            <p
              style={{
                color: '#666',
                lineHeight: '1.8',
              }}
            >
              O projeto utiliza geração procedural através de código Python para criar modelos 3D parametrizados e customizáveis, seguindo o mesmo padrão do projeto de referência.
            </p>
          </section>

          <section style={{ marginBottom: '2rem' }}>
            <h2
              style={{
                fontSize: '1.8rem',
                fontWeight: '600',
                color: '#333',
                marginBottom: '1rem',
              }}
            >
              🛠️ Tecnologias
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
              }}
            >
              {['Python', 'React', 'TypeScript', 'Vite', 'Three.js', 'Online-3D-Viewer', 'FastAPI', 'Vercel'].map(
                (tech) => (
                  <div
                    key={tech}
                    style={{
                      padding: '1rem',
                      backgroundColor: '#f5f5f5',
                      borderRadius: '8px',
                      textAlign: 'center',
                      fontWeight: '600',
                      color: '#333',
                    }}
                  >
                    {tech}
                  </div>
                )
              )}
            </div>
          </section>

          <section>
            <h2
              style={{
                fontSize: '1.8rem',
                fontWeight: '600',
                color: '#333',
                marginBottom: '1rem',
              }}
            >
              📚 Recursos
            </h2>
            <ul
              style={{
                color: '#666',
                lineHeight: '2',
                paddingLeft: '1.5rem',
              }}
            >
              <li>Geração de modelos 3D a partir de descrições em texto</li>
              <li>Visualização em tempo real no navegador</li>
              <li>Suporte a múltiplos formatos (OBJ, MTL, GLTF)</li>
              <li>Geração procedural parametrizada</li>
              <li>Interface responsiva e moderna</li>
              <li>API REST completa</li>
            </ul>
          </section>
        </div>
      </div>
    </Layout>
  );
}

