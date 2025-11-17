/**
 * Declarações de tipos para online-3d-viewer
 */

declare module 'online-3d-viewer' {
  export class Coord3D {
    constructor(x: number, y: number, z: number);
    x: number;
    y: number;
    z: number;
  }

  export class RGBColor {
    constructor(r: number, g: number, b: number);
    r: number;
    g: number;
    b: number;
  }

  export class RGBAColor {
    constructor(r: number, g: number, b: number, a: number);
    r: number;
    g: number;
    b: number;
    a: number;
  }

  export class Camera {
    constructor(
      eye: Coord3D,
      center: Coord3D,
      up: Coord3D,
      fov: number
    );
  }

  export class EdgeSettings {
    constructor(
      showEdges: boolean,
      edgeColor: RGBColor,
      edgeThreshold: number
    );
  }

  export class EnvironmentSettings {
    constructor(
      textureNames: string[],
      backgroundIsEnvMap: boolean
    );
  }

  export interface EmbeddedViewerOptions {
    camera?: Camera;
    backgroundColor?: RGBAColor;
    defaultColor?: RGBColor;
    edgeSettings?: EdgeSettings;
    environmentSettings?: EnvironmentSettings;
    onModelLoaded?: () => void;
  }

  export class EmbeddedViewer {
    constructor(container: HTMLElement, options?: EmbeddedViewerOptions);
    LoadModelFromUrlList(urls: string[]): void;
    Destroy(): void;
  }

  export function Init3DViewerElements(): void;
  export function Init3DViewerFromFileList(files: FileList): void;
  export function Init3DViewerFromUrlList(urls: string[]): void;
}

