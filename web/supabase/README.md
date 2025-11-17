# Configuração do Banco de Dados Supabase

Este diretório contém os scripts SQL necessários para configurar o banco de dados do projeto **AIEXX_USER_ACCOUNT_MANAGER**.

## 📋 Pré-requisitos

1. Acesso ao [Supabase Dashboard](https://app.supabase.com)
2. Projeto criado: **AIEXX_USER_ACCOUNT_MANAGER**
3. Credenciais configuradas no arquivo `.env.local`

## 🚀 Passo a Passo de Configuração

### 1. Criar o Bucket de Storage

1. Acesse o [Supabase Dashboard](https://app.supabase.com)
2. Vá em **Storage** no menu lateral
3. Clique em **New bucket**
4. Configure:
   - **Name**: `temp-files`
   - **Public bucket**: ✅ Sim (marcar como público)
   - **File size limit**: Deixe em branco ou defina um limite (ex: 50MB)
   - **Allowed MIME types**: Deixe em branco para permitir todos os tipos
5. Clique em **Create bucket**

### 2. Executar Scripts SQL

#### 2.1. Criar Tabela e Políticas RLS

1. No Dashboard, vá em **SQL Editor**
2. Clique em **New query**
3. Copie e cole o conteúdo de `schema.sql`
4. Clique em **Run** ou pressione `Ctrl+Enter`
5. Verifique se não há erros

#### 2.2. Configurar Políticas de Storage

1. Ainda no **SQL Editor**
2. Crie uma nova query
3. Copie e cole o conteúdo de `storage-policies.sql`
4. Clique em **Run** ou pressione `Ctrl+Enter`
5. Verifique se não há erros

### 3. Verificar Configuração

#### Verificar Tabela Criada

```sql
SELECT * FROM public.user_files LIMIT 1;
```

#### Verificar Políticas RLS

```sql
SELECT * FROM pg_policies WHERE tablename = 'user_files';
```

#### Verificar Bucket Criado

No Dashboard, vá em **Storage** e verifique se o bucket `temp-files` existe.

#### Verificar Políticas de Storage

```sql
SELECT * FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage';
```

## 📁 Estrutura do Banco de Dados

### Tabela: `user_files`

Armazena informações sobre arquivos temporários carregados pelos usuários.

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | UUID | ID único do arquivo |
| `user_id` | UUID | ID do usuário (FK para auth.users) |
| `file_name` | TEXT | Nome original do arquivo |
| `file_path` | TEXT | Caminho no storage |
| `file_type` | TEXT | Tipo MIME do arquivo |
| `file_size` | BIGINT | Tamanho em bytes |
| `bucket_name` | TEXT | Nome do bucket (default: temp-files) |
| `created_at` | TIMESTAMPTZ | Data de criação |
| `expires_at` | TIMESTAMPTZ | Data de expiração (NULL = não expira) |
| `metadata` | JSONB | Metadados adicionais |

### Bucket: `temp-files`

Bucket público para armazenar arquivos temporários dos usuários.

- **Estrutura de pastas**: `{user_id}/{timestamp}-{random}.{ext}`
- **Acesso**: Público para leitura, autenticado para upload

## 🔒 Segurança

### Row Level Security (RLS)

- ✅ Habilitado na tabela `user_files`
- ✅ Usuários só podem ver/modificar seus próprios arquivos
- ✅ Políticas baseadas em `auth.uid()`

### Storage Policies

- ✅ Upload apenas para usuários autenticados
- ✅ Arquivos organizados por `user_id`
- ✅ Leitura pública (bucket público)
- ✅ Deletar/atualizar apenas arquivos próprios

## 🧹 Limpeza Automática

Uma função `cleanup_expired_files()` foi criada para limpar arquivos expirados. Você pode:

1. Configurar um cron job no Supabase para executar periodicamente
2. Chamar manualmente quando necessário:

```sql
SELECT public.cleanup_expired_files();
```

## 📚 Links Úteis

- [Dashboard do Projeto](https://supabase.com/dashboard/project/grpxuporwqdyckkyhlcx)
- [API Documentation](https://supabase.com/dashboard/project/grpxuporwqdyckkyhlcx/api)
- [Authentication](https://supabase.com/dashboard/project/grpxuporwqdyckkyhlcx/api?page=auth)
- [Storage](https://supabase.com/dashboard/project/grpxuporwqdyckkyhlcx/storage/buckets)

## 🔐 Autenticação Google (Desenvolvimento Local)

Para configurar autenticação Google no desenvolvimento local:

1. **Criar credenciais no Google Cloud Console**
   - Acesse: https://console.cloud.google.com
   - Crie um OAuth Client ID (tipo: Web application)
   - Configure redirect URI: `http://localhost:54321/auth/v1/callback`

2. **Configurar variável de ambiente**
   - Adicione no `.env.local`:
     ```env
     SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_SECRET=seu_client_secret
     ```

3. **Configurar config.toml**
   - Edite `web/supabase/config.toml`
   - Configure o `client_id` e `secret` conforme exemplo no arquivo

Para mais detalhes, consulte: `web/ENV_SETUP.md`

## ⚠️ Importante

- **NUNCA** commite credenciais sensíveis (service_role key, client secrets) no repositório
- Use apenas a **anon key** no frontend
- A **service_role key** deve ser usada apenas no backend e nunca exposta ao cliente
- Mantenha as políticas RLS sempre habilitadas para segurança
- O arquivo `config.toml` pode ser commitado, mas **NUNCA** inclua secrets diretamente nele

