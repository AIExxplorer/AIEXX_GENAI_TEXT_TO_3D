/**
 * Componente principal do motor de visualização 3D
 * Baseado no Online-3D-Viewer
 */

import React, { useEffect, useRef, useState } from 'react';
import * as OV from 'online-3d-viewer';
import type { Viewer3DProps } from '../../types/viewer.types';
import {
  createDefaultCamera,
  createDefaultBackgroundColor,
  createDefaultColor,
  createDefaultEdgeSettings,
  generateViewerId,
  toCssSize,
} from '../../utils/viewer.utils';

/**
 * Componente Viewer3D - Motor de visualização 3D reutilizável
 *
 * @param props - Props do componente
 * @returns Componente React do viewer 3D
 */
export function Viewer3D({
  model,
  config,
  className = '',
  style,
  width = '100%',
  height = '100%',
}: Viewer3DProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<OV.EmbeddedViewer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const viewerIdRef = useRef<string>(generateViewerId());

  useEffect(() => {
    if (!containerRef.current) return;

    // Configurações padrão
    const defaultConfig = {
      camera: config?.camera || createDefaultCamera(),
      backgroundColor: config?.backgroundColor || createDefaultBackgroundColor(),
      defaultColor: config?.defaultColor || createDefaultColor(),
      edgeSettings: config?.edgeSettings || createDefaultEdgeSettings(),
      environmentSettings: config?.environmentSettings,
      onModelLoaded: config?.onModelLoaded,
      onError: config?.onError || ((err: Error) => setError(err)),
    };

    try {
      // Criar instância do viewer com opções
      const viewerOptions: {
        camera?: OV.Camera;
        backgroundColor?: OV.RGBAColor;
        defaultColor?: OV.RGBColor;
        edgeSettings?: OV.EdgeSettings;
        environmentSettings?: OV.EnvironmentSettings;
        onModelLoaded?: () => void;
      } = {
        camera: new OV.Camera(
          new OV.Coord3D(
            defaultConfig.camera.position[0],
            defaultConfig.camera.position[1],
            defaultConfig.camera.position[2]
          ),
          new OV.Coord3D(
            defaultConfig.camera.target[0],
            defaultConfig.camera.target[1],
            defaultConfig.camera.target[2]
          ),
          new OV.Coord3D(defaultConfig.camera.up[0], defaultConfig.camera.up[1], defaultConfig.camera.up[2]),
          defaultConfig.camera.fov
        ),
        backgroundColor: new OV.RGBAColor(
          defaultConfig.backgroundColor.r,
          defaultConfig.backgroundColor.g,
          defaultConfig.backgroundColor.b,
          defaultConfig.backgroundColor.a
        ),
        defaultColor: new OV.RGBColor(
          defaultConfig.defaultColor.r,
          defaultConfig.defaultColor.g,
          defaultConfig.defaultColor.b
        ),
        edgeSettings: new OV.EdgeSettings(
          defaultConfig.edgeSettings.showEdges,
          new OV.RGBColor(
            defaultConfig.edgeSettings.edgeColor.r,
            defaultConfig.edgeSettings.edgeColor.g,
            defaultConfig.edgeSettings.edgeColor.b
          ),
          defaultConfig.edgeSettings.edgeThreshold
        ),
      };

      // Adicionar environment settings se fornecido
      if (defaultConfig.environmentSettings) {
        viewerOptions.environmentSettings = new OV.EnvironmentSettings(
          defaultConfig.environmentSettings.textureNames,
          defaultConfig.environmentSettings.backgroundIsEnvMap
        );
      }

      // Callback quando modelo é carregado
      viewerOptions.onModelLoaded = () => {
        setIsLoading(false);
        defaultConfig.onModelLoaded?.();
      };

      // Criar viewer
      const viewer = new OV.EmbeddedViewer(containerRef.current, viewerOptions);
      viewerRef.current = viewer;

      // Carregar modelo
      viewer.LoadModelFromUrlList(model.urls);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Erro ao inicializar viewer 3D');
      setError(error);
      setIsLoading(false);
      defaultConfig.onError?.(error);
    }

    // Cleanup
    return () => {
      if (viewerRef.current) {
        try {
          viewerRef.current.Destroy();
        } catch (err) {
          console.warn('Erro ao destruir viewer:', err);
        }
        viewerRef.current = null;
      }
    };
  }, [model.urls, config]);

  const containerStyle: React.CSSProperties = {
    width: toCssSize(width),
    height: toCssSize(height),
    position: 'relative',
    ...style,
  };

  return (
    <div className={`viewer3d-container ${className}`} style={containerStyle} data-viewer-id={viewerIdRef.current}>
      {error && (
        <div className="viewer3d-error" style={{ padding: '1rem', color: 'red', textAlign: 'center' }}>
          Erro ao carregar modelo: {error.message}
        </div>
      )}
      {isLoading && !error && (
        <div className="viewer3d-loading" style={{ padding: '1rem', textAlign: 'center' }}>
          Carregando modelo 3D...
        </div>
      )}
      <div
        ref={containerRef}
        className="viewer3d-viewer"
        style={{
          width: '100%',
          height: '100%',
          display: isLoading || error ? 'none' : 'block',
        }}
      />
    </div>
  );
}

