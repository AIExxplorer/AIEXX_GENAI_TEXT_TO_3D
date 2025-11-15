import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { GenerationPage } from './pages/GenerationPage';

/**
 * Componente principal da aplicação
 */
function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GenerationPage />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  );
}

export default App;

