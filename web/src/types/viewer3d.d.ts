/**
 * Declarações de tipos para @aiexx/viewer3d
 */

declare module '@aiexx/viewer3d' {
  export interface ModelInfo {
    name: string;
    urls: string[];
    description?: string;
    thumbnail?: string;
  }

  export interface Viewer3DProps {
    model: ModelInfo;
    config?: any;
    className?: string;
    style?: React.CSSProperties;
    width?: string | number;
    height?: string | number;
  }

  export function Viewer3D(props: Viewer3DProps): React.JSX.Element;
  export function ModelCard(props: any): React.JSX.Element;
}

