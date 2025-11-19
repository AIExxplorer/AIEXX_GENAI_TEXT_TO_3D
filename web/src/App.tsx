import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { AuthProvider } from './contexts/AuthContext';
import { HomePage } from './pages/HomePage';
import { GenerationPage } from './pages/GenerationPage';
import { GalleryPage } from './pages/GalleryPage';
import { AboutPage } from './pages/AboutPage';
import { ViewerPage } from './pages/ViewerPage';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';

/**
 * Componente principal da aplicação
 */
function App(): JSX.Element {
  return (
    <AuthProvider>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/generate" element={<GenerationPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route
            path="/viewer"
            element={
              <ProtectedRoute showLoginInline>
                <ViewerPage />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Analytics />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
