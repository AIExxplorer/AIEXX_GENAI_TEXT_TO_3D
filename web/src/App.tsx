import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { HomePage } from './pages/HomePage';
import { GenerationPage } from './pages/GenerationPage';
import { GalleryPage } from './pages/GalleryPage';
import { AboutPage } from './pages/AboutPage';

/**
 * Componente principal da aplicação
 */
function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/generate" element={<GenerationPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  );
}

export default App;

