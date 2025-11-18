import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import type { Plugin } from 'vite';

/**
 * Plugin para servir arquivos temporários via HTTP
 * Necessário porque o Online 3D Viewer não suporta blob URLs
 */
function fileServerPlugin(): Plugin {
  const fileMap = new Map<string, { data: Buffer; mimeType: string; fileName: string }>();
  
  // Limpar arquivos antigos a cada 5 minutos
  setInterval(() => {
    const now = Date.now();
    for (const [fileId, file] of fileMap.entries()) {
      const timestamp = parseInt(fileId.split('-')[0]);
      if (now - timestamp > 5 * 60 * 1000) { // 5 minutos
        fileMap.delete(fileId);
      }
    }
  }, 5 * 60 * 1000);
  
  return {
    name: 'file-server',
    enforce: 'pre', // Executar antes de outros plugins para garantir que nosso middleware seja processado primeiro
    configureServer(server) {
      // Adicionar nosso middleware ANTES dos middlewares padrão do Vite
      // Usar uma função wrapper para garantir que seja executado primeiro
      const handleFileServer = (req: any, res: any, next: any) => {
        // Habilitar CORS
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        
        if (req.method === 'OPTIONS') {
          res.statusCode = 200;
          res.end();
          return;
        }
        
        const url = req.url || '';
        
        if (req.method === 'POST' && url === '/upload') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk.toString();
          });
          req.on('end', () => {
            try {
              const { fileName, fileData, mimeType } = JSON.parse(body);
              const buffer = Buffer.from(fileData, 'base64');
              const fileId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
              fileMap.set(fileId, { data: buffer, mimeType, fileName });
              
              console.log(`[FileServer] Arquivo recebido: ${fileName} (${buffer.length} bytes, ${mimeType})`);
              
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ fileId, url: `/api/temp-files/${fileId}` }));
            } catch (err) {
              console.error('[FileServer] Erro ao processar upload:', err);
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Invalid request', details: err instanceof Error ? err.message : String(err) }));
            }
          });
        } else if (req.method === 'GET' && url.startsWith('/')) {
          const fileId = url.substring(1);
          const file = fileMap.get(fileId);
          if (file) {
            // Usar writeHead() para definir status e headers de uma vez
            // Isso evita que sejam sobrescritos por outros middlewares
            const headers: Record<string, string> = {
              'Content-Type': file.mimeType,
              'Content-Disposition': `inline; filename="${file.fileName}"`,
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache',
              'Expires': '0',
              'Content-Length': file.data.length.toString(),
            };
            
            // Log para debug
            console.log(`[FileServer] Servindo arquivo: ${file.fileName} (${file.data.length} bytes, Content-Type: ${file.mimeType})`);
            
            // Definir status e headers de uma vez usando writeHead
            res.writeHead(200, headers);
            
            // Enviar dados e finalizar resposta
            res.end(file.data);
            return; // Importante: não continuar para outros middlewares
          } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
            return; // Importante: não continuar para outros middlewares
          }
        } else {
          next();
        }
      };
      
      // Adicionar middleware - o Vite processa middlewares na ordem que são adicionados
      // Como este plugin é carregado primeiro, nosso middleware será executado antes
      server.middlewares.use('/api/temp-files', handleFileServer);
    },
  };
}

/**
 * Configuração do Vite para o projeto web
 * 
 * @see https://vite.dev/config/
 */
export default defineConfig({
  plugins: [react(), tailwindcss(), fileServerPlugin()],
  
  // Resolução de caminhos
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@api': path.resolve(__dirname, './src/api'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
      '@/lib': path.resolve(__dirname, './src/lib'),
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      '@aiexx/viewer3d': path.resolve(__dirname, '../viewer3d/src/index.ts'),
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

