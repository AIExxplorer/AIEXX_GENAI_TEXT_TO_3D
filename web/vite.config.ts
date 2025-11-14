import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

/**
 * Configuração do Vite para o projeto web
 * 
 * @see https://vite.dev/config/
 */
export default defineConfig({
  plugins: [react()],
  
  // Resolução de caminhos
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@api': path.resolve(__dirname, './src/api'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
    },
  },
  
  // Configurações de build para produção
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'three-vendor': ['three'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  
  // Configurações do servidor de desenvolvimento
  server: {
    port: 5173,
    host: true,
    open: true,
    cors: true,
  },
  
  // Preview (para testar build localmente)
  preview: {
    port: 4173,
    host: true,
  },
  
  // Variáveis de ambiente
  envPrefix: 'VITE_',
});

