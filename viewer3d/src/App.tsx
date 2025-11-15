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
  // Exemplo de modelo
  const exampleModel: ModelInfo = {
    name: 'Modelo de Exemplo',
    description: 'Este é um modelo de exemplo para demonstração',
    urls: ['model.obj', 'model.mtl'],
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Motor de Visualização 3D</h1>

      <section style={{ marginTop: '2rem' }}>
        <h2>Viewer 3D</h2>
        <div style={{ width: '100%', height: '500px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <Viewer3D model={exampleModel} width="100%" height="100%" />
        </div>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Cards de Modelos</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1rem',
          }}
        >
          <ModelCard model={exampleModel} showViewer />
          <ModelCard model={exampleModel} showViewer />
          <ModelCard model={exampleModel} showViewer />
        </div>
      </section>
    </div>
  );
}

export default App;

