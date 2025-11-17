import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina classes CSS usando clsx e tailwind-merge
 * Útil para combinar classes do Tailwind CSS de forma segura
 * 
 * @param inputs - Classes CSS para combinar
 * @returns String com classes combinadas
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

