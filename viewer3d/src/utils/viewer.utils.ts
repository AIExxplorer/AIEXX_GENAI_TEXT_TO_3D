/**
 * Utilitários para o motor de visualização 3D
 */

import type { CameraConfig, RGBColor, RGBAColor, EdgeSettings } from '../types/viewer.types';

/**
 * Cria configuração padrão da câmera
 */
export function createDefaultCamera(): CameraConfig {
  return {
    position: [-1.5, 2.0, 3.0],
    target: [0.0, 0.0, 0.0],
    up: [0.0, 1.0, 0.0],
    fov: 45.0,
  };
}

/**
 * Cria cor RGB padrão
 */
export function createDefaultColor(): RGBColor {
  return { r: 200, g: 200, b: 200 };
}

/**
 * Cria cor RGBA padrão (branco)
 */
export function createDefaultBackgroundColor(): RGBAColor {
  return { r: 255, g: 255, b: 255, a: 255 };
}

/**
 * Cria configuração padrão de bordas
 */
export function createDefaultEdgeSettings(): EdgeSettings {
  return {
    showEdges: false,
    edgeColor: { r: 0, g: 0, b: 0 },
    edgeThreshold: 1,
  };
}

/**
 * Valida se uma URL é válida
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Valida se um arquivo é um formato 3D suportado
 */
export function isSupported3DFormat(filename: string): boolean {
  const supportedExtensions = ['.obj', '.mtl', '.glb', '.gltf', '.3ds', '.stl', '.ply'];
  const extension = filename.toLowerCase().substring(filename.lastIndexOf('.'));
  return supportedExtensions.includes(extension);
}

/**
 * Extrai extensão de um arquivo
 */
export function getFileExtension(filename: string): string {
  return filename.substring(filename.lastIndexOf('.') + 1).toLowerCase();
}

/**
 * Cria um ID único para o viewer
 */
export function generateViewerId(): string {
  return `viewer-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Converte tamanho para string CSS
 */
export function toCssSize(size: string | number | undefined): string {
  if (!size) return '100%';
  if (typeof size === 'number') return `${size}px`;
  return size;
}

