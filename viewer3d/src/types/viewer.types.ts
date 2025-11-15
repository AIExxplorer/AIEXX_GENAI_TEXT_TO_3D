/**
 * Tipos TypeScript para o motor de visualização 3D
 */

/**
 * Configuração da câmera do viewer
 */
export interface CameraConfig {
  /** Posição da câmera (x, y, z) */
  position: [number, number, number];
  /** Ponto de foco da câmera (x, y, z) */
  target: [number, number, number];
  /** Vetor up da câmera (x, y, z) */
  up: [number, number, number];
  /** Campo de visão em graus */
  fov: number;
}

/**
 * Configuração de cor RGB
 */
export interface RGBColor {
  /** Componente vermelho (0-255) */
  r: number;
  /** Componente verde (0-255) */
  g: number;
  /** Componente azul (0-255) */
  b: number;
}

/**
 * Configuração de cor RGBA
 */
export interface RGBAColor extends RGBColor {
  /** Componente alpha (0-255) */
  a: number;
}

/**
 * Configurações de bordas
 */
export interface EdgeSettings {
  /** Se deve mostrar bordas */
  showEdges: boolean;
  /** Cor das bordas */
  edgeColor: RGBColor;
  /** Limiar de ângulo para mostrar bordas (em graus) */
  edgeThreshold: number;
}

/**
 * Configurações de ambiente
 */
export interface EnvironmentSettings {
  /** URLs das texturas do environment map (posx, negx, posy, negy, posz, negz) */
  textureNames: string[];
  /** Se deve usar o environment map como background */
  backgroundIsEnvMap: boolean;
}

/**
 * Configuração completa do viewer
 */
export interface ViewerConfig {
  /** Configuração da câmera */
  camera?: CameraConfig;
  /** Cor de fundo */
  backgroundColor?: RGBAColor;
  /** Cor padrão do modelo */
  defaultColor?: RGBColor;
  /** Configurações de bordas */
  edgeSettings?: EdgeSettings;
  /** Configurações de ambiente */
  environmentSettings?: EnvironmentSettings;
  /** Callback quando o modelo é carregado */
  onModelLoaded?: () => void;
  /** Callback quando ocorre erro */
  onError?: (error: Error) => void;
}

/**
 * Informações do modelo 3D
 */
export interface ModelInfo {
  /** Nome do modelo */
  name: string;
  /** URLs dos arquivos do modelo (OBJ, MTL, texturas, etc.) */
  urls: string[];
  /** Descrição do modelo */
  description?: string;
  /** Thumbnail do modelo */
  thumbnail?: string;
}

/**
 * Props do componente Viewer3D
 */
export interface Viewer3DProps {
  /** Informações do modelo a ser exibido */
  model: ModelInfo;
  /** Configuração do viewer */
  config?: ViewerConfig;
  /** Classe CSS adicional */
  className?: string;
  /** Estilo inline adicional */
  style?: React.CSSProperties;
  /** Largura do viewer */
  width?: string | number;
  /** Altura do viewer */
  height?: string | number;
}

/**
 * Props do componente ModelCard
 */
export interface ModelCardProps {
  /** Informações do modelo */
  model: ModelInfo;
  /** Callback quando o card é clicado */
  onClick?: (model: ModelInfo) => void;
  /** Se deve mostrar o viewer inline */
  showViewer?: boolean;
  /** Configuração do viewer */
  viewerConfig?: ViewerConfig;
  /** Classe CSS adicional */
  className?: string;
}

