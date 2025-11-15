/**
 * Página inicial - Landing page
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';

/**
 * Página HomePage - Página inicial da aplicação
 */
export function HomePage(): React.JSX.Element {
  return (
    <Layout>
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '4rem 2rem',
        }}
      >
        {/* Hero Section */}
        <section
          style={{
            textAlign: 'center',
            marginBottom: '4rem',
          }}
        >
          <h1
            style={{
              fontSize: '3.5rem',
              fontWeight: '800',
              color: '#333',
              marginBottom: '1rem',
              lineHeight: '1.2',
            }}
          >
            🎨 Gere Modelos 3D com IA
          </h1>
          <p
            style={{
              fontSize: '1.5rem',
              color: '#666',
              marginBottom: '2rem',
              maxWidth: '700px',
              margin: '0 auto 2rem',
            }}
          >
            Transforme suas ideias em modelos 3D profissionais usando Inteligência Artificial.
            Descreva o que você quer criar e deixe a tecnologia fazer o trabalho.
          </p>
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link
              to="/generate"
              style={{
                padding: '1rem 2.5rem',
                backgroundColor: '#007bff',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: '600',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 6px rgba(0, 123, 255, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#0056b3';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 123, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#007bff';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 123, 255, 0.3)';
              }}
            >
              🚀 Começar Agora
            </Link>
            <Link
              to="/gallery"
              style={{
                padding: '1rem 2.5rem',
                backgroundColor: '#fff',
                color: '#007bff',
                textDecoration: 'none',
                borderRadius: '8px',
                fontSize: '1.1rem',
                fontWeight: '600',
                border: '2px solid #007bff',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f0f8ff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#fff';
              }}
            >
              🖼️ Ver Galeria
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section
          style={{
            marginBottom: '4rem',
          }}
        >
          <h2
            style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              textAlign: 'center',
              color: '#333',
              marginBottom: '3rem',
            }}
          >
            ✨ Recursos Principais
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
            }}
          >
            {[
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
            ].map((feature, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#fff',
                  padding: '2rem',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                }}
              >
                <div
                  style={{
                    fontSize: '3rem',
                    marginBottom: '1rem',
                  }}
                >
                  {feature.icon}
                </div>
                <h3
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: '#333',
                    marginBottom: '0.75rem',
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    color: '#666',
                    lineHeight: '1.6',
                  }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section
          style={{
            backgroundColor: '#fff',
            padding: '3rem',
            borderRadius: '12px',
            marginBottom: '4rem',
          }}
        >
          <h2
            style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              textAlign: 'center',
              color: '#333',
              marginBottom: '3rem',
            }}
          >
            🔄 Como Funciona
          </h2>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            {[
              { step: '1', title: 'Descreva seu Modelo', description: 'Digite uma descrição detalhada do modelo 3D que deseja criar.' },
              { step: '2', title: 'IA Processa', description: 'Nossa IA analisa sua descrição e gera o código Python necessário.' },
              { step: '3', title: 'Geração do Modelo', description: 'O modelo 3D é gerado usando geração procedural parametrizada.' },
              { step: '4', title: 'Visualize e Baixe', description: 'Visualize o modelo no navegador e baixe nos formatos desejados.' },
            ].map((item) => (
              <div
                key={item.step}
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    flexShrink: 0,
                  }}
                >
                  {item.step}
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      color: '#333',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      color: '#666',
                      lineHeight: '1.6',
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section
          style={{
            textAlign: 'center',
            backgroundColor: '#007bff',
            color: '#fff',
            padding: '4rem 2rem',
            borderRadius: '12px',
          }}
        >
          <h2
            style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              marginBottom: '1rem',
            }}
          >
            Pronto para começar?
          </h2>
          <p
            style={{
              fontSize: '1.25rem',
              marginBottom: '2rem',
              opacity: 0.9,
            }}
          >
            Crie seu primeiro modelo 3D agora mesmo. É rápido, fácil e gratuito!
          </p>
          <Link
            to="/generate"
            style={{
              padding: '1rem 2.5rem',
              backgroundColor: '#fff',
              color: '#007bff',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: '600',
              display: 'inline-block',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            🎨 Gerar Meu Primeiro Modelo
          </Link>
        </section>
      </div>
    </Layout>
  );
}

