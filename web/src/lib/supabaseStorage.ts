/**
 * Utilitários para gerenciamento de arquivos no Supabase Storage
 * 
 * Fornece funções para:
 * - Upload de arquivos temporários
 * - Obtenção de URLs públicas
 * - Limpeza de arquivos expirados
 */

import { supabase } from './supabase';

/**
 * Nome do bucket de storage para arquivos temporários
 */
const TEMP_FILES_BUCKET = 'temp-files';

/**
 * Interface para resultado de upload
 */
export interface UploadResult {
  /**
   * URL pública do arquivo
   */
  publicUrl: string;

  /**
   * Caminho do arquivo no storage
   */
  filePath: string;

  /**
   * Nome do arquivo
   */
  fileName: string;
}

/**
 * Faz upload de um arquivo para o Supabase Storage
 * 
 * @param file - Arquivo a ser enviado
 * @param userId - ID do usuário (para organização)
 * @returns Promise com URL pública do arquivo
 */
export async function uploadFile(file: File, userId: string): Promise<UploadResult> {
  try {
    // Criar caminho único para o arquivo
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(7);
    const fileExtension = file.name.substring(file.name.lastIndexOf('.'));
    const fileName = `${timestamp}-${randomId}${fileExtension}`;
    const filePath = `${userId}/${fileName}`;

    // Fazer upload do arquivo
    const { data, error } = await supabase.storage
      .from(TEMP_FILES_BUCKET)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      throw new Error(`Erro ao fazer upload: ${error.message}`);
    }

    // Obter URL pública
    const { data: urlData } = supabase.storage
      .from(TEMP_FILES_BUCKET)
      .getPublicUrl(filePath);

    if (!urlData?.publicUrl) {
      throw new Error('Erro ao obter URL pública do arquivo');
    }

    return {
      publicUrl: urlData.publicUrl,
      filePath: data.path,
      fileName: file.name,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao fazer upload';
    throw new Error(errorMessage);
  }
}

/**
 * Faz upload de múltiplos arquivos
 * 
 * @param files - Array de arquivos a serem enviados
 * @param userId - ID do usuário
 * @returns Promise com array de URLs públicas
 */
export async function uploadFiles(files: File[], userId: string): Promise<UploadResult[]> {
  const uploadPromises = files.map((file) => uploadFile(file, userId));
  return Promise.all(uploadPromises);
}

/**
 * Remove um arquivo do storage
 * 
 * @param filePath - Caminho do arquivo no storage
 * @returns Promise com resultado da operação
 */
export async function deleteFile(filePath: string): Promise<void> {
  try {
    const { error } = await supabase.storage
      .from(TEMP_FILES_BUCKET)
      .remove([filePath]);

    if (error) {
      throw error;
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro ao deletar arquivo';
    throw new Error(errorMessage);
  }
}

/**
 * Remove múltiplos arquivos do storage
 * 
 * @param filePaths - Array de caminhos dos arquivos
 * @returns Promise com resultado da operação
 */
export async function deleteFiles(filePaths: string[]): Promise<void> {
  try {
    const { error } = await supabase.storage
      .from(TEMP_FILES_BUCKET)
      .remove(filePaths);

    if (error) {
      throw error;
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro ao deletar arquivos';
    throw new Error(errorMessage);
  }
}

