-- ============================================
-- Políticas de Storage para Supabase Storage
-- Bucket: temp-files
-- ============================================
-- 
-- Execute este script no SQL Editor do Supabase Dashboard
-- Após criar o bucket 'temp-files' no Storage
-- ============================================

-- ============================================
-- Criar bucket se não existir (via API ou Dashboard)
-- ============================================
-- Nota: Buckets devem ser criados via API ou Dashboard
-- Use o código abaixo via SDK ou crie manualmente no Dashboard:
-- 
-- JavaScript/TypeScript:
-- await supabase.storage.createBucket('temp-files', { public: true })
-- 
-- Ou crie manualmente em: Storage > New bucket
-- Nome: temp-files
-- Public: Sim (para permitir acesso público aos arquivos)

-- ============================================
-- Políticas de Storage para o bucket 'temp-files'
-- ============================================

-- Política: Usuários autenticados podem fazer upload de arquivos
CREATE POLICY "Allow authenticated uploads to temp-files"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'temp-files' AND
    (storage.foldername(name))[1] = (SELECT auth.uid()::text)
);

-- Política: Usuários autenticados podem ver seus próprios arquivos
CREATE POLICY "Allow authenticated users to view their files"
ON storage.objects
FOR SELECT
TO authenticated
USING (
    bucket_id = 'temp-files' AND
    (storage.foldername(name))[1] = (SELECT auth.uid()::text)
);

-- Política: Arquivos públicos podem ser visualizados por qualquer pessoa
-- (Necessário porque o bucket é público)
CREATE POLICY "Allow public read access to temp-files"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'temp-files');

-- Política: Usuários autenticados podem deletar seus próprios arquivos
CREATE POLICY "Allow authenticated users to delete their files"
ON storage.objects
FOR DELETE
TO authenticated
USING (
    bucket_id = 'temp-files' AND
    (storage.foldername(name))[1] = (SELECT auth.uid()::text)
);

-- Política: Usuários autenticados podem atualizar seus próprios arquivos
CREATE POLICY "Allow authenticated users to update their files"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
    bucket_id = 'temp-files' AND
    (storage.foldername(name))[1] = (SELECT auth.uid()::text)
)
WITH CHECK (
    bucket_id = 'temp-files' AND
    (storage.foldername(name))[1] = (SELECT auth.uid()::text)
);

-- ============================================
-- Política adicional: Restringir tipos de arquivo (opcional)
-- ============================================
-- Descomente para permitir apenas arquivos 3D específicos
-- 
-- CREATE POLICY "Allow only 3D file types"
-- ON storage.objects
-- FOR INSERT
-- TO authenticated
-- WITH CHECK (
--     bucket_id = 'temp-files' AND
--     (
--         storage.extension(name) = 'obj' OR
--         storage.extension(name) = 'mtl' OR
--         storage.extension(name) = 'gltf' OR
--         storage.extension(name) = 'glb' OR
--         storage.extension(name) = 'stl' OR
--         storage.extension(name) = 'ply' OR
--         storage.extension(name) = 'dae' OR
--         storage.extension(name) = '3ds'
--     )
-- );

