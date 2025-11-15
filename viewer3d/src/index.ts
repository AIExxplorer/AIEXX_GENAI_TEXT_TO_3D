/**
 * Exportação principal do motor de visualização 3D
 */

export { Viewer3D } from './components/Viewer3D';
export { ModelCard } from './components/ModelCard';

export type {
  Viewer3DProps,
  ModelCardProps,
  ViewerConfig,
  CameraConfig,
  RGBColor,
  RGBAColor,
  EdgeSettings,
  EnvironmentSettings,
  ModelInfo,
} from './types/viewer.types';

export * from './utils/viewer.utils';

