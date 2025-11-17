/**
 * Página de visualização de modelos 3D com drag-and-drop
 * Usa Online 3D Viewer para visualizar arquivos OBJ, MTL, GLTF, etc.
 * Seguindo padrão Neobrutalism das demais páginas
 */

import React, { useEffect, useRef, useState } from 'react';
import { Layout } from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Upload, X, File, Loader2, CheckCircle2, Info, LogIn } from 'lucide-react';
import * as OV from 'online-3d-viewer';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { AuthSideMenu } from '@/components/Auth/AuthSideMenu';
import { uploadFiles } from '@/lib/supabaseStorage';

/**
 * Formatos 3D suportados
 */
const SUPPORTED_FORMATS = [
  { ext: '.obj', name: 'OBJ', description: 'Wavefront OBJ' },
  { ext: '.mtl', name: 'MTL', description: 'Material Template Library' },
  { ext: '.gltf', name: 'GLTF', description: 'GL Transmission Format' },
  { ext: '.glb', name: 'GLB', description: 'GLTF Binary' },
  { ext: '.3ds', name: '3DS', description: '3D Studio' },
  { ext: '.stl', name: 'STL', description: 'Stereolithography' },
  { ext: '.ply', name: 'PLY', description: 'Polygon File Format' },
  { ext: '.dae', name: 'DAE', description: 'Collada' },
];

/**
 * Página ViewerPage - Visualização de modelos 3D com drag-and-drop
 */
export function ViewerPage(): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<OV.EmbeddedViewer | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { authState, isAuthenticated } = useAuth();
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadedFiles, setLoadedFiles] = useState<File[]>([]);
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [uploadedFilePaths, setUploadedFilePaths] = useState<string[]>([]);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Limpa os recursos do viewer
   */
  const cleanup = (): void => {
    // Limpar timeout
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }
    
    // Limpar intervalo de verificação
    if (checkIntervalRef.current) {
      clearInterval(checkIntervalRef.current);
      checkIntervalRef.current = null;
    }
    
    if (viewerRef.current) {
      try {
        viewerRef.current.Destroy();
      } catch (err) {
        console.warn('Erro ao destruir viewer:', err);
      }
      viewerRef.current = null;
    }
    // Limpar URLs de arquivos
    fileUrls.forEach((url) => {
      if (url.startsWith('blob:')) {
        URL.revokeObjectURL(url);
      }
    });
    setFileUrls([]);
    setLoadedFiles([]);
    setError(null);
    setModelLoaded(false);
  };

  /**
   * Processa arquivos e prepara para carregamento
   */
  const processFiles = async (files: FileList | File[]): Promise<void> => {
    // Verificar autenticação
    if (!isAuthenticated() || !authState.user) {
      setShowAuthDialog(true);
      setError('Você precisa estar logado para carregar arquivos');
      return;
    }

    const fileArray = Array.from(files);
    
    // Filtrar apenas arquivos 3D suportados
    const supportedExtensions = SUPPORTED_FORMATS.map((f) => f.ext);
    const validFiles = fileArray.filter((file) => {
      const extension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
      return supportedExtensions.includes(extension);
    });

    if (validFiles.length === 0) {
      setError(`Nenhum arquivo 3D válido encontrado. Formatos suportados: ${SUPPORTED_FORMATS.map((f) => f.name).join(', ')}`);
      return;
    }

    // Ordenar arquivos: OBJ primeiro, depois MTL, depois outros
    const sortedFiles = validFiles.sort((a, b) => {
      const aExt = a.name.toLowerCase().substring(a.name.lastIndexOf('.'));
      const bExt = b.name.toLowerCase().substring(b.name.lastIndexOf('.'));
      
      // OBJ primeiro
      if (aExt === '.obj' && bExt !== '.obj') return -1;
      if (bExt === '.obj' && aExt !== '.obj') return 1;
      
      // MTL depois de OBJ
      if (aExt === '.mtl' && bExt !== '.mtl' && bExt !== '.obj') return -1;
      if (bExt === '.mtl' && aExt !== '.mtl' && aExt !== '.obj') return 1;
      
      return 0;
    });

    setIsLoading(true);
    setError(null);
    setModelLoaded(false);
    
    try {
      // Fazer upload para Supabase Storage
      const userId = authState.user.id;
      const uploadResults = await uploadFiles(sortedFiles, userId);
      
      const httpUrls = uploadResults.map((result) => result.publicUrl);
      const filePaths = uploadResults.map((result) => result.filePath);
      
      // Limpar URLs anteriores (blob URLs)
      fileUrls.forEach((url) => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
      
      console.log('Arquivos ordenados:', sortedFiles.map(f => f.name));
      console.log('URLs públicas do Supabase:', httpUrls);
      
      setFileUrls(httpUrls);
      setUploadedFilePaths(filePaths);
      setLoadedFiles(sortedFiles);
    } catch (err) {
      console.error('Erro ao processar arquivos:', err);
      setError(`Erro ao processar arquivos: ${err instanceof Error ? err.message : 'Erro desconhecido'}`);
      setIsLoading(false);
    }
  };

  /**
   * useEffect para inicializar o viewer quando arquivos são carregados
   */
  useEffect(() => {
    if (!containerRef.current || loadedFiles.length === 0 || fileUrls.length === 0) {
      return;
    }

    // Limpar viewer anterior
    if (viewerRef.current) {
      try {
        viewerRef.current.Destroy();
      } catch (err) {
        console.warn('Erro ao destruir viewer anterior:', err);
      }
      viewerRef.current = null;
    }

    // Limpar timeouts anteriores
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }
    if (checkIntervalRef.current) {
      clearInterval(checkIntervalRef.current);
      checkIntervalRef.current = null;
    }

    setIsLoading(true);
    setError(null);
    setModelLoaded(false);

    // Timeout para evitar carregamento infinito
    loadingTimeoutRef.current = setTimeout(() => {
      setError('Tempo limite excedido ao carregar o modelo. Verifique se o arquivo está em um formato válido.');
      setIsLoading(false);
    }, 30000); // 30 segundos

    // Criar container limpo e aguardar um pouco
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      // Forçar reflow para garantir que o DOM está atualizado
      void containerRef.current.offsetHeight;
    }

    // Aguardar um pouco para garantir que o DOM está pronto e limpo
    const initTimeout = setTimeout(() => {
      // Verificar novamente se o container ainda existe
      if (!containerRef.current) {
        console.error('Container não está disponível');
        setIsLoading(false);
        setError('Erro: container não está disponível');
        return;
      }
      try {
        // Configurar câmera padrão
        const camera = new OV.Camera(
          new OV.Coord3D(-1.5, 2.0, 3.0),
          new OV.Coord3D(0.0, 0.0, 0.0),
          new OV.Coord3D(0.0, 1.0, 0.0),
          45.0
        );

        // Configurar cores
        const backgroundColor = new OV.RGBAColor(255, 255, 255, 255);
        const defaultColor = new OV.RGBColor(200, 200, 200);
        const edgeSettings = new OV.EdgeSettings(false, new OV.RGBColor(0, 0, 0), 1);

        // Criar viewer
        const viewer = new OV.EmbeddedViewer(containerRef.current!, {
          camera,
          backgroundColor,
          defaultColor,
          edgeSettings,
          onModelLoaded: () => {
            console.log('Callback onModelLoaded chamado');
            // Não confiar apenas no callback - vamos verificar se realmente carregou
            // Aguardar um pouco para verificar se há erro ou se realmente renderizou
            setTimeout(() => {
              if (!containerRef.current) return;
              
              const textContent = containerRef.current.textContent || '';
              const hasError = textContent.includes('No importable file found') || 
                             textContent.toLowerCase().includes('error') ||
                             textContent.includes('failed') ||
                             textContent.includes('Cannot read properties');
              
              const canvas = containerRef.current.querySelector('canvas');
              const hasValidCanvas = canvas && canvas.width > 0 && canvas.height > 0;
              
              if (hasError) {
                console.error('Erro detectado mesmo após callback onModelLoaded:', textContent);
                setError('Não foi possível carregar o arquivo. Verifique se o formato está correto e se o arquivo não está corrompido. Para arquivos OBJ, certifique-se de incluir o arquivo MTL correspondente.');
                setIsLoading(false);
                setModelLoaded(false);
                return;
              }
              
              if (hasValidCanvas) {
                console.log('Modelo realmente carregado - canvas válido encontrado');
                if (loadingTimeoutRef.current) {
                  clearTimeout(loadingTimeoutRef.current);
                  loadingTimeoutRef.current = null;
                }
                if (checkIntervalRef.current) {
                  clearInterval(checkIntervalRef.current);
                  checkIntervalRef.current = null;
                }
                setIsLoading(false);
                setModelLoaded(true);
              } else {
                console.warn('Callback chamado mas canvas não encontrado, aguardando verificação periódica...');
              }
            }, 500); // Aguardar 500ms para verificar se realmente carregou
          },
        });

        viewerRef.current = viewer;

        // Usar requestAnimationFrame para garantir que o viewer está renderizado antes de carregar
        requestAnimationFrame(() => {
          // Aguardar mais tempo antes de carregar para garantir que o viewer está completamente inicializado
          // O Online 3D Viewer precisa de tempo para inicializar seus componentes internos
          setTimeout(async () => {
            try {
              // Verificar se o viewer ainda existe e está válido
              if (!viewerRef.current || !containerRef.current) {
                console.error('Viewer ou container não está disponível');
                setError('Erro ao inicializar viewer. Tente novamente.');
                setIsLoading(false);
                return;
              }

              // Verificar se o container tem conteúdo renderizado pelo viewer
              const hasViewerContent = containerRef.current.children.length > 0;
              if (!hasViewerContent) {
                console.warn('Viewer ainda não renderizou conteúdo, aguardando mais...');
                // Tentar novamente após mais um delay
                setTimeout(() => {
                  if (!viewerRef.current) return;
                  try {
                    console.log('Carregando modelo com URLs:', fileUrls);
                    viewerRef.current.LoadModelFromUrlList(fileUrls);
                  } catch (retryError) {
                    console.error('Erro ao carregar após retry:', retryError);
                    setError(`Erro ao carregar arquivos: ${retryError instanceof Error ? retryError.message : 'Erro desconhecido'}`);
                    setIsLoading(false);
                  }
                }, 300);
                return;
              }

              console.log('Carregando modelo com URLs:', fileUrls);
              console.log('Arquivos carregados:', loadedFiles.map(f => f.name));
              console.log('Viewer criado e renderizado, tentando carregar modelo...');
              
              // Verificar se as URLs são válidas
              const validUrls = fileUrls.filter(url => url && url.length > 0);
              if (validUrls.length === 0) {
                throw new Error('Nenhuma URL válida encontrada');
              }
              
              console.log('URLs válidas para carregar:', validUrls);
              
              // Verificar se as URLs são acessíveis antes de carregar
              console.log('Verificando acessibilidade das URLs...');
              for (const url of validUrls) {
                try {
                  const testResponse = await fetch(url, { method: 'HEAD' });
                  console.log(`URL ${url} acessível:`, testResponse.ok, 'Status:', testResponse.status, 'Content-Type:', testResponse.headers.get('Content-Type'));
                  if (!testResponse.ok) {
                    console.warn(`URL pode não estar acessível: ${url} (Status: ${testResponse.status})`);
                    // Não lançar erro, apenas avisar
                  }
                } catch (fetchErr) {
                  console.warn(`Não foi possível verificar URL ${url}:`, fetchErr);
                  // Continuar mesmo assim, pode ser um problema de CORS no HEAD
                }
              }
              
              // Tentar carregar o modelo com as URLs válidas
              try {
                console.log('Chamando LoadModelFromUrlList com URLs HTTP...');
                viewerRef.current.LoadModelFromUrlList(validUrls);
              } catch (loadErr) {
                console.error('Erro ao chamar LoadModelFromUrlList:', loadErr);
                setError(`Erro ao carregar arquivos: ${loadErr instanceof Error ? loadErr.message : 'Erro desconhecido'}`);
                setIsLoading(false);
                setModelLoaded(false);
                return;
              }
              
              // Verificar periodicamente se o modelo foi carregado (fallback)
              let checkCount = 0;
              const maxChecks = 40; // Verificar por até 20 segundos (40 * 500ms)
              
              checkIntervalRef.current = setInterval(() => {
                checkCount++;
                
                if (containerRef.current) {
                  const canvas = containerRef.current.querySelector('canvas');
                  const textContent = containerRef.current.textContent || '';
                  const hasError = textContent.includes('No importable file found') || 
                                 textContent.toLowerCase().includes('error') ||
                                 textContent.includes('failed') ||
                                 textContent.includes('Cannot read properties');
                  
                  if (hasError && checkCount > 5) { // Aguardar pelo menos 2.5s antes de considerar erro
                    console.error('Erro detectado no viewer:', textContent);
                    if (checkIntervalRef.current) {
                      clearInterval(checkIntervalRef.current);
                      checkIntervalRef.current = null;
                    }
                    if (loadingTimeoutRef.current) {
                      clearTimeout(loadingTimeoutRef.current);
                      loadingTimeoutRef.current = null;
                    }
                    
                    // Mensagem de erro mais específica baseada no erro detectado
                    let errorMessage = 'Erro ao carregar modelo: ';
                    if (textContent.includes('No importable file found')) {
                      errorMessage += 'O Online 3D Viewer não conseguiu identificar arquivos importáveis. Verifique se: (1) Os arquivos estão em formato válido e não corrompidos, (2) Para arquivos OBJ, o arquivo MTL correspondente está presente e correto, (3) Os arquivos foram carregados completamente. Se o problema persistir, pode ser uma limitação do viewer com o formato específico do arquivo.';
                    } else {
                      errorMessage += 'Não foi possível carregar o arquivo. Verifique se o formato está correto e se o arquivo não está corrompido. Para arquivos OBJ, certifique-se de incluir o arquivo MTL correspondente.';
                    }
                    
                    setError(errorMessage);
                    setIsLoading(false);
                    setModelLoaded(false);
                    return;
                  }
                  
                  if (canvas && canvas.width > 0 && canvas.height > 0) {
                    console.log('Modelo carregado com sucesso - canvas renderizado (fallback)');
                    if (checkIntervalRef.current) {
                      clearInterval(checkIntervalRef.current);
                      checkIntervalRef.current = null;
                    }
                    if (loadingTimeoutRef.current) {
                      clearTimeout(loadingTimeoutRef.current);
                      loadingTimeoutRef.current = null;
                    }
                    setIsLoading(false);
                    setModelLoaded(true);
                    return;
                  }
                }
                
                if (checkCount >= maxChecks) {
                  console.warn('Timeout ao verificar carregamento do modelo');
                  if (checkIntervalRef.current) {
                    clearInterval(checkIntervalRef.current);
                    checkIntervalRef.current = null;
                  }
                }
              }, 500); // Verificar a cada 500ms
            } catch (loadError) {
              console.error('Erro ao carregar arquivos:', loadError);
              if (loadingTimeoutRef.current) {
                clearTimeout(loadingTimeoutRef.current);
                loadingTimeoutRef.current = null;
              }
              setError(`Erro ao carregar arquivos: ${loadError instanceof Error ? loadError.message : 'Erro desconhecido'}`);
              setIsLoading(false);
              setModelLoaded(false);
            }
          }, 500); // Aguardar 500ms após criar o viewer para garantir inicialização completa
        });
      } catch (err) {
        console.error('Erro ao inicializar viewer:', err);
        if (loadingTimeoutRef.current) {
          clearTimeout(loadingTimeoutRef.current);
          loadingTimeoutRef.current = null;
        }
        const errorMessage = err instanceof Error ? err.message : 'Erro ao inicializar viewer 3D';
        setError(errorMessage);
        setIsLoading(false);
        setModelLoaded(false);
      }
    }, 100); // Aguardar 100ms antes de inicializar

    return () => {
      clearTimeout(initTimeout);
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
        checkIntervalRef.current = null;
      }
      if (viewerRef.current) {
        try {
          viewerRef.current.Destroy();
        } catch (err) {
          console.warn('Erro ao destruir viewer:', err);
        }
        viewerRef.current = null;
      }
    };
  }, [fileUrls, loadedFiles.length]);


  /**
   * Handler para drag over
   */
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  /**
   * Handler para drag leave
   */
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  /**
   * Handler para drop
   */
  const handleDrop = async (e: React.DragEvent<HTMLDivElement>): Promise<void> => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      await processFiles(files);
    }
  };

  /**
   * Handler para seleção de arquivo
   */
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await processFiles(files);
    }
    // Reset input para permitir selecionar o mesmo arquivo novamente
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  /**
   * Handler para botão de seleção de arquivo
   */
  const handleSelectFiles = (): void => {
    fileInputRef.current?.click();
  };

  /**
   * Formata tamanho do arquivo
   */
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  /**
   * Cleanup ao desmontar
   */
  useEffect(() => {
    return () => {
      // Limpar timeout
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
        loadingTimeoutRef.current = null;
      }
      
      // Limpar intervalo de verificação
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
        checkIntervalRef.current = null;
      }
      
      if (viewerRef.current) {
        try {
          viewerRef.current.Destroy();
        } catch (err) {
          console.warn('Erro ao destruir viewer:', err);
        }
        viewerRef.current = null;
      }
      // Limpar URLs de arquivos
      fileUrls.forEach((url) => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [fileUrls]);

  return (
    <Layout>
      <div className="h-[calc(100vh-140px)]">
        <ScrollArea className="h-full">
          <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <Card className="mb-8">
              <CardHeader className="text-center">
                <CardTitle className="text-4xl">👁️ Visualizador 3D</CardTitle>
                <CardDescription className="text-lg">
                  Carregue ou arraste arquivos 3D para visualizar diretamente no navegador
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Aviso de autenticação */}
            {!isAuthenticated() && (
              <Alert className="mb-8">
                <LogIn className="h-4 w-4" />
                <AlertTitle>Autenticação Necessária</AlertTitle>
                <AlertDescription className="flex items-center justify-between">
                  <span>Você precisa estar logado para carregar e visualizar arquivos 3D.</span>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => setShowAuthDialog(true)}
                    className="ml-4"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Entrar
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            {/* Área de Drop - Mostrar apenas quando não há arquivos carregados */}
            {loadedFiles.length === 0 && (
              <Card
                className={cn(
                  'mb-8 border-4 border-dashed transition-all cursor-pointer',
                  isDragging
                    ? 'border-primary bg-primary/10 scale-[1.01] shadow-shadow'
                    : 'border-border hover:border-primary/50 hover:bg-muted/30'
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleSelectFiles}
              >
                <CardContent className="flex flex-col items-center justify-center p-16 text-center">
                  <div className="mb-6 text-6xl">📦</div>
                  <CardTitle className="text-2xl mb-2">Arraste arquivos 3D aqui</CardTitle>
                  <CardDescription className="text-base mb-6">
                    ou clique para selecionar arquivos do seu computador
                  </CardDescription>
                  <Button variant="default" size="lg" className="gap-2">
                    <Upload className="h-5 w-5" />
                    Selecionar Arquivos
                  </Button>
                  <label htmlFor="file-input-3d" className="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0">
                    Selecione arquivos 3D para visualizar
                  </label>
                  <input
                    id="file-input-3d"
                    name="file-input-3d"
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept={SUPPORTED_FORMATS.map((f) => f.ext).join(',')}
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </CardContent>
              </Card>
            )}

            {/* Informações sobre formatos suportados */}
            {loadedFiles.length === 0 && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    Formatos Suportados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {SUPPORTED_FORMATS.map((format) => (
                      <Badge key={format.ext} variant="default" className="text-xs">
                        {format.name}
                      </Badge>
                    ))}
                  </div>
                  <CardDescription className="mt-4 text-sm">
                    Você pode carregar múltiplos arquivos ao mesmo tempo. Para modelos OBJ, certifique-se de incluir o arquivo MTL correspondente.
                  </CardDescription>
                </CardContent>
              </Card>
            )}

            {/* Arquivos Carregados */}
            {loadedFiles.length > 0 && (
              <Card className="mb-8">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      Arquivos Carregados
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={handleSelectFiles}
                        className="gap-2"
                      >
                        <Upload className="h-4 w-4" />
                        Adicionar Mais
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={cleanup}
                        className="gap-2"
                      >
                        <X className="h-4 w-4" />
                        Limpar
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {loadedFiles.map((file, index) => {
                      const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
                      const format = SUPPORTED_FORMATS.find((f) => f.ext === extension);
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-muted rounded-base border-2 border-border"
                        >
                          <div className="flex items-center gap-3">
                            <File className="h-5 w-5 text-primary" />
                            <div>
                              <p className="font-medium text-foreground">{file.name}</p>
                              <p className="text-sm text-foreground/70">
                                {formatFileSize(file.size)} • {format?.name || 'Desconhecido'}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Erro */}
            {error && (
              <Alert variant="destructive" className="mb-8">
                <AlertTitle>Erro ao Carregar Modelo</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Viewer 3D */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">Visualização 3D</CardTitle>
                {modelLoaded && !isLoading && (
                  <CardDescription>
                    Modelo carregado com sucesso! Use o mouse para rotacionar, arrastar para mover e scroll para zoom.
                  </CardDescription>
                )}
                {!modelLoaded && !isLoading && loadedFiles.length > 0 && (
                  <CardDescription className="text-destructive">
                    Aguardando carregamento do modelo...
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="p-0">
                {isLoading && (
                  <div className="flex flex-col items-center justify-center p-16">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                    <CardTitle className="text-xl mb-2">Carregando modelo 3D...</CardTitle>
                    <CardDescription>
                      Aguarde enquanto processamos os arquivos e inicializamos o visualizador.
                    </CardDescription>
                  </div>
                )}
                <div
                  ref={containerRef}
                  className={cn(
                    'w-full bg-card border-t-2 border-border',
                    isLoading && 'hidden',
                    !isLoading && loadedFiles.length > 0 && 'min-h-[600px]'
                  )}
                  style={{ minHeight: loadedFiles.length > 0 ? '600px' : '400px' }}
                />
                {!isLoading && loadedFiles.length === 0 && (
                  <div className="flex flex-col items-center justify-center p-16 text-center">
                    <div className="mb-4 text-6xl">🎨</div>
                    <CardTitle className="text-2xl mb-2">Nenhum modelo carregado</CardTitle>
                    <CardDescription className="text-base">
                      Arraste arquivos 3D ou clique na área acima para começar a visualizar seus modelos.
                    </CardDescription>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Instruções de uso */}
            {modelLoaded && (
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-4">💡 Dicas de Navegação</CardTitle>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <p className="font-semibold mb-1">🖱️ Rotação</p>
                      <p className="text-sm opacity-90">Clique e arraste para rotacionar o modelo</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">↔️ Movimento</p>
                      <p className="text-sm opacity-90">Botão direito + arrastar para mover</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">🔍 Zoom</p>
                      <p className="text-sm opacity-90">Use a roda do mouse para aproximar/afastar</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">🔄 Reset</p>
                      <p className="text-sm opacity-90">Clique em "Limpar" para carregar outro modelo</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Side Menu de Autenticação */}
      <AuthSideMenu
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        initialMode="login"
        side="right"
      />
    </Layout>
  );
}

