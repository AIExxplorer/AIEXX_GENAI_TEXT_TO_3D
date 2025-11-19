# Configuração do Supabase - Autenticação Google e Tabelas

## ✅ Configuração Concluída

### 1. Tabelas Criadas

#### `user_profiles`
Tabela que estende `auth.users` com informações adicionais do perfil:
- `id` (UUID, PK, FK para `auth.users`)
- `email` (TEXT)
- `full_name` (TEXT)
- `avatar_url` (TEXT) - URL do avatar do Google OAuth
- `provider` (TEXT) - Provedor de autenticação (google, email, etc)
- `created_at` (TIMESTAMPTZ)
- `updated_at` (TIMESTAMPTZ)

**RLS (Row Level Security):**
- ✅ Usuários podem ver apenas seu próprio perfil
- ✅ Usuários podem atualizar apenas seu próprio perfil
- ✅ Sistema pode inserir perfis automaticamente (via trigger)

#### `user_files`
Tabela para armazenar arquivos temporários dos usuários:
- `id` (UUID, PK)
- `user_id` (UUID, FK para `auth.users`)
- `file_name` (TEXT)
- `file_path` (TEXT)
- `file_type` (TEXT) - Tipos permitidos: obj, mtl, gltf, glb, fbx, dae
- `file_size` (BIGINT)
- `created_at` (TIMESTAMPTZ)
- `expires_at` (TIMESTAMPTZ, nullable)

**RLS (Row Level Security):**
- ✅ Usuários podem ver apenas seus próprios arquivos
- ✅ Usuários podem inserir apenas seus próprios arquivos
- ✅ Usuários podem atualizar apenas seus próprios arquivos
- ✅ Usuários podem deletar apenas seus próprios arquivos

### 2. Funções e Triggers

#### `handle_new_user()`
Função trigger que cria automaticamente um perfil em `user_profiles` quando um novo usuário é criado em `auth.users` (via Google OAuth ou registro por email).

#### `handle_updated_at()`
Função trigger que atualiza automaticamente o campo `updated_at` quando um perfil é modificado.

#### `cleanup_expired_files()`
Função para limpar arquivos expirados (pode ser chamada via cron job).

### 3. Políticas de Storage

Políticas RLS criadas para o bucket `user-files`:
- ✅ Usuários podem fazer upload apenas em sua própria pasta (`user-files/{user_id}/`)
- ✅ Usuários podem visualizar apenas seus próprios arquivos
- ✅ Usuários podem deletar apenas seus próprios arquivos

**⚠️ IMPORTANTE:** O bucket `user-files` precisa ser criado manualmente via Dashboard do Supabase.

## 📋 Próximos Passos

### 1. Criar Bucket de Storage

1. Acesse o Dashboard do Supabase: https://app.supabase.com/project/grpxuporwqdyckkyhlcx/storage/buckets
2. Clique em **"New bucket"**
3. Configure:
   - **Name:** `user-files`
   - **Public:** `false` (privado)
   - **File size limit:** `104857600` (100MB)
   - **Allowed MIME types:** 
     - `model/obj`
     - `model/mtl`
     - `model/gltf+json`
     - `model/gltf-binary`
     - `application/octet-stream`

### 2. Configurar Google OAuth no Google Cloud Console

1. Acesse: https://console.cloud.google.com/apis/credentials
2. Crie ou edite um OAuth 2.0 Client ID
3. Adicione as seguintes **Authorized redirect URIs**:
   - **Produção:** `https://grpxuporwqdyckkyhlcx.supabase.co/auth/v1/callback`
   - **Desenvolvimento Local:** `http://localhost:5173/auth/callback`

### 3. Verificar Configuração do Google no Supabase

O Google OAuth já está habilitado no Dashboard do Supabase. Verifique se:
- ✅ Google está marcado como "Enabled" em Authentication > Providers
- ✅ Client ID e Client Secret estão configurados corretamente

## 🔒 Segurança

### Row Level Security (RLS)
Todas as tabelas têm RLS habilitado, garantindo que:
- Usuários só acessam seus próprios dados
- Operações são validadas pelo `auth.uid()`
- Políticas são aplicadas automaticamente em todas as queries

### Funções Seguras
Todas as funções têm `search_path` fixo para prevenir SQL injection:
- ✅ `handle_updated_at()` - `SET search_path = public`
- ✅ `handle_new_user()` - `SET search_path = public`
- ✅ `cleanup_expired_files()` - `SET search_path = public`

## 📝 Uso no Código

### Exemplo: Buscar Perfil do Usuário

```typescript
import { supabase } from '@/lib/supabase';
import type { Tables } from '@/lib/supabase-types';

// Buscar perfil do usuário atual
const { data: profile, error } = await supabase
  .from('user_profiles')
  .select('*')
  .eq('id', user.id)
  .single();

if (profile) {
  console.log('Nome:', profile.full_name);
  console.log('Avatar:', profile.avatar_url);
  console.log('Provider:', profile.provider);
}
```

### Exemplo: Listar Arquivos do Usuário

```typescript
// Listar arquivos do usuário atual
const { data: files, error } = await supabase
  .from('user_files')
  .select('*')
  .eq('user_id', user.id)
  .order('created_at', { ascending: false });
```

### Exemplo: Upload de Arquivo

```typescript
// Upload de arquivo para storage
const filePath = `${user.id}/${fileName}`;
const { data, error } = await supabase.storage
  .from('user-files')
  .upload(filePath, file);

if (!error) {
  // Registrar arquivo na tabela
  await supabase.from('user_files').insert({
    user_id: user.id,
    file_name: fileName,
    file_path: filePath,
    file_type: 'obj',
    file_size: file.size,
  });
}
```

## 🎯 Funcionalidades Disponíveis

Com esta configuração, a aplicação agora suporta:

1. ✅ **Login com Google OAuth** - Usuários podem fazer login com conta Google
2. ✅ **Registro por Email/Senha** - Usuários podem criar conta tradicional
3. ✅ **Perfis de Usuário** - Dados do perfil são criados automaticamente
4. ✅ **Armazenamento de Arquivos** - Usuários podem fazer upload de modelos 3D
5. ✅ **Proteção de Dados** - RLS garante que usuários só acessam seus próprios dados
6. ✅ **Type Safety** - Tipos TypeScript gerados automaticamente do schema

## 🔍 Verificação

Para verificar se tudo está funcionando:

1. **Testar Login com Google:**
   - Clique em "Continuar com Google" no formulário de login
   - Complete o fluxo OAuth
   - Verifique se o perfil foi criado em `user_profiles`

2. **Verificar RLS:**
   - Faça login com um usuário
   - Tente acessar dados de outro usuário
   - Deve retornar vazio (RLS bloqueando)

3. **Verificar Storage:**
   - Faça upload de um arquivo
   - Verifique se o arquivo aparece em `user_files`
   - Verifique se o arquivo está no bucket `user-files`

## 📚 Referências

- [Supabase Auth - Google OAuth](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Supabase Storage - RLS](https://supabase.com/docs/guides/storage/security/access-control)
- [Supabase RLS Policies](https://supabase.com/docs/guides/auth/row-level-security)


