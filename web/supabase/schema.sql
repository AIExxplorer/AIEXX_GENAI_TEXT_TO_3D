-- ============================================
-- Schema do Banco de Dados Supabase
-- Projeto: AIEXX_USER_ACCOUNT_MANAGER
-- ============================================
-- 
-- Este arquivo contém as definições de tabelas e políticas
-- Execute no SQL Editor do Supabase Dashboard
-- ============================================

-- ============================================
-- Tabela: user_files
-- Armazena informações sobre arquivos temporários dos usuários
-- ============================================
CREATE TABLE IF NOT EXISTS public.user_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    bucket_name TEXT NOT NULL DEFAULT 'temp-files',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_user_files_user_id ON public.user_files(user_id);
CREATE INDEX IF NOT EXISTS idx_user_files_created_at ON public.user_files(created_at);
CREATE INDEX IF NOT EXISTS idx_user_files_expires_at ON public.user_files(expires_at);

-- ============================================
-- Row Level Security (RLS) Policies
-- ============================================

-- Habilitar RLS na tabela
ALTER TABLE public.user_files ENABLE ROW LEVEL SECURITY;

-- Política: Usuários podem ver apenas seus próprios arquivos
CREATE POLICY "Users can view their own files"
    ON public.user_files
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

-- Política: Usuários podem inserir apenas seus próprios arquivos
CREATE POLICY "Users can insert their own files"
    ON public.user_files
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Política: Usuários podem atualizar apenas seus próprios arquivos
CREATE POLICY "Users can update their own files"
    ON public.user_files
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Política: Usuários podem deletar apenas seus próprios arquivos
CREATE POLICY "Users can delete their own files"
    ON public.user_files
    FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- ============================================
-- Função: Limpar arquivos expirados automaticamente
-- ============================================
CREATE OR REPLACE FUNCTION public.cleanup_expired_files()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Deletar registros de arquivos expirados
    DELETE FROM public.user_files
    WHERE expires_at IS NOT NULL
    AND expires_at < NOW();
END;
$$;

-- ============================================
-- Comentários nas colunas para documentação
-- ============================================
COMMENT ON TABLE public.user_files IS 'Armazena informações sobre arquivos temporários carregados pelos usuários';
COMMENT ON COLUMN public.user_files.id IS 'ID único do arquivo (UUID)';
COMMENT ON COLUMN public.user_files.user_id IS 'ID do usuário que fez upload do arquivo';
COMMENT ON COLUMN public.user_files.file_name IS 'Nome original do arquivo';
COMMENT ON COLUMN public.user_files.file_path IS 'Caminho do arquivo no storage (bucket/user_id/filename)';
COMMENT ON COLUMN public.user_files.file_type IS 'Tipo MIME do arquivo (ex: text/plain, model/obj)';
COMMENT ON COLUMN public.user_files.file_size IS 'Tamanho do arquivo em bytes';
COMMENT ON COLUMN public.user_files.bucket_name IS 'Nome do bucket no Supabase Storage';
COMMENT ON COLUMN public.user_files.created_at IS 'Data e hora de criação do registro';
COMMENT ON COLUMN public.user_files.expires_at IS 'Data e hora de expiração do arquivo (NULL = não expira)';
COMMENT ON COLUMN public.user_files.metadata IS 'Metadados adicionais em formato JSON';

