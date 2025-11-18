/**
 * Aplicação de exemplo do motor de visualização 3D
 */

import React from 'react';
import { Viewer3D } from './components/Viewer3D';
import { ModelCard } from './components/ModelCard';
import type { ModelInfo } from './types/viewer.types';

/**
 * Componente principal da aplicação
 */
function App(): React.JSX.Element {
  // Modelos de exemplo usando arquivos públicos do Online-3D-Viewer
  const models: ModelInfo[] = [
    {
      name: 'Damaged Helmet (GLTF)',
      description: 'Modelo GLTF de exemplo - Capacete danificado',
      urls: [
        'https://raw.githubusercontent.com/kovacsv/Online3DViewer/master/test/testfiles/gltf/DamagedHelmet/glTF-Binary/DamagedHelmet.glb',
      ],
    },
    {
      name: 'Hundred Cubes (OBJ)',
      description: 'Modelo OBJ com múltiplos cubos',
      urls: [
        'https://raw.githubusercontent.com/kovacsv/Online3DViewer/master/test/testfiles/obj/hundred_cubes.obj',
        'https://raw.githubusercontent.com/kovacsv/Online3DViewer/master/test/testfiles/obj/hundred_cubes.mtl',
      ],
    },
    {
      name: 'Cube Four Instances (3DS)',
      description: 'Modelo 3DS com quatro instâncias de cubo',
      urls: [
        'https://raw.githubusercontent.com/kovacsv/Online3DViewer/master/test/testfiles/3ds/cube_four_instances.3ds',
      ],
    },
  ];

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '0.5rem' }}>
          🎨 Motor de Visualização 3D
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#666' }}>
          Visualize modelos 3D diretamente no navegador usando Online-3D-Viewer
        </p>
      </header>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.8rem', color: '#333', marginBottom: '1rem' }}>📦 Viewer 3D Principal</h2>
        <div
          style={{
            width: '100%',
            height: '600px',
            border: '2px solid #ddd',
            borderRadius: '12px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            overflow: 'hidden',
          }}
        >
          <Viewer3D model={models[0]} width="100%" height="100%" />
        </div>
        <p style={{ marginTop: '1rem', color: '#666', fontSize: '0.9rem' }}>
          <strong>Modelo:</strong> {models[0].name} - {models[0].description}
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: '1.8rem', color: '#333', marginBottom: '1rem' }}>🃏 Cards de Modelos</h2>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>
          Clique nos cards para visualizar os modelos 3D. Os cards são componentes reutilizáveis que podem ser
          incorporados em qualquer página.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {models.map((model, index) => (
            <ModelCard key={index} model={model} showViewer />
          ))}
        </div>
      </section>

      <footer style={{ marginTop: '4rem', padding: '2rem', textAlign: 'center', color: '#999', borderTop: '1px solid #ddd' }}>
        <p>
          Desenvolvido com{' '}
          <a href="https://github.com/kovacsv/Online3DViewer" target="_blank" rel="noopener noreferrer" style={{ color: '#007bff' }}>
            Online-3D-Viewer
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;

