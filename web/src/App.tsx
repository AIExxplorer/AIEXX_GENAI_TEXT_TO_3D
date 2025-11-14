import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';

/**
 * Componente principal da aplicação
 */
function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="app">
              <header>
                <h1>{import.meta.env.VITE_APP_NAME || 'AIEXX GENAI TEXT_TO_3D'}</h1>
                <p>Versão: {import.meta.env.VITE_APP_VERSION || '1.0.0'}</p>
              </header>
              <main>
                <p>API URL: {import.meta.env.VITE_API_URL || 'Não configurada'}</p>
                <p>Ambiente: {import.meta.env.NODE_ENV}</p>
              </main>
            </div>
          }
        />
      </Routes>
      <Analytics />
    </BrowserRouter>
  );
}

export default App;

