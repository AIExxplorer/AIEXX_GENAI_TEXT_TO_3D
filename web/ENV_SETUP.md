# Configuração de Variáveis de Ambiente

Este arquivo documenta as variáveis de ambiente necessárias para a aplicação web.

## Configuração Rápida

### Opção 1: Usar o arquivo de exemplo (Recomendado)

```bash
# No diretório web/
cp .env.example .env.local
```

Depois, edite o arquivo `.env.local` e preencha os valores necessários.

### Opção 2: Criar manualmente

Crie um arquivo `.env.local` na raiz do diretório `web/` com as seguintes variáveis:

```env
# ============================================
# Variáveis de Ambiente - Web Application
# ============================================

# URL da API Backend
# Exemplo: http://localhost:8000 ou https://api.aiexx.com
VITE_API_URL=http://localhost:8000

# Nome da aplicação
VITE_APP_NAME=AIEXX 3D

# Versão da aplicação
VITE_APP_VERSION=1.0.0

# ============================================
# Supabase Configuration
# ============================================

# URL do projeto Supabase
# Obtenha em: https://app.supabase.com/project/_/settings/api
VITE_SUPABASE_URL=https://grpxuporwqdyckkyhlcx.supabase.co

# Chave pública (anon key) do Supabase
# ⚠️ ATENÇÃO: Esta chave será exposta ao cliente (browser)
# Obtenha em: https://app.supabase.com/project/_/settings/api
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# ============================================
# Opcional - Outras APIs
# ============================================

# Token do Hugging Face (se necessário)
# ⚠️ ATENÇÃO: Esta variável será exposta ao cliente!
# VITE_HUGGINGFACE_API_KEY=your_huggingface_api_key_here
```

## Como Obter as Credenciais do Supabase

### Passo a Passo Detalhado:

1. **Acesse o Supabase Dashboard**
   - Vá para: https://app.supabase.com
   - Faça login ou crie uma conta gratuita

2. **Crie ou Selecione um Projeto**
   - Se não tiver um projeto, clique em "New Project"
   - Preencha os dados (nome, senha do banco, região)
   - Aguarde a criação do projeto (pode levar alguns minutos)

3. **Obtenha as Credenciais**
   - No menu lateral, vá em **Settings** (ícone de engrenagem)
   - Clique em **API**
   - Você verá duas informações importantes:
     - **Project URL**: Copie este valor para `VITE_SUPABASE_URL`
     - **anon public** key: Copie este valor para `VITE_SUPABASE_ANON_KEY`

4. **Configurar Storage (Obrigatório)**
   - No menu lateral, vá em **Storage**
   - Clique em **New bucket**
   - Nome do bucket: `temp-files`
   - Marque como **Public bucket** (para permitir acesso público aos arquivos)
   - Clique em **Create bucket**

5. **Configurar Políticas de Acesso (Opcional mas Recomendado)**
   - No bucket `temp-files`, vá em **Policies**
   - Crie uma política para permitir upload apenas para usuários autenticados:
     - Policy name: `Allow authenticated uploads`
     - Allowed operation: `INSERT`
     - Target roles: `authenticated`
     - USING expression: `auth.role() = 'authenticated'`

## Configurar Autenticação Google (Opcional)

Para usar autenticação Google no desenvolvimento local com Supabase CLI:

### Passo a Passo:

1. **Criar Projeto no Google Cloud Console**
   - Acesse: https://console.cloud.google.com
   - Crie um novo projeto ou selecione um existente
   - Vá em **APIs & Services** > **Credentials**

2. **Criar Credenciais OAuth 2.0**
   - Clique em **Create Credentials** > **OAuth client ID**
   - Se solicitado, configure a tela de consentimento OAuth:
     - User Type: External (para desenvolvimento)
     - App name: Seu nome de aplicativo
     - User support email: Seu email
     - Developer contact: Seu email
   - Configure o OAuth Client:
     - Application type: **Web application**
     - Name: `Supabase Local Development`
     - Authorized redirect URIs: `http://localhost:54321/auth/v1/callback`
     - Clique em **Create**

3. **Copiar Credenciais**
   - Copie o **Client ID** e o **Client Secret**
   - ⚠️ **IMPORTANTE**: Guarde o Client Secret com segurança

4. **Configurar Variável de Ambiente**
   - Adicione no arquivo `.env.local`:
     ```env
     SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_SECRET=seu_client_secret_aqui
     ```

5. **Configurar arquivo config.toml**
   - Edite o arquivo `web/supabase/config.toml`
   - Substitua `<client-id>` pelo seu Client ID:
     ```toml
     [auth.external.google]
     enabled = true
     client_id = "seu-client-id-aqui.apps.googleusercontent.com"
     secret = "env(SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_SECRET)"
     skip_nonce_check = false
     ```

6. **Iniciar Supabase Local (se usando CLI)**
   ```bash
   # Instalar Supabase CLI (se ainda não tiver)
   npm install -g supabase
   
   # Iniciar Supabase localmente
   supabase start
   ```

### Para Produção:

Para usar Google OAuth em produção, configure diretamente no Dashboard do Supabase:

1. Acesse: https://app.supabase.com/project/_/auth/providers
2. Clique em **Google**
3. Habilite o provedor
4. Adicione o Client ID e Client Secret
5. Configure o redirect URI: `https://[seu-projeto].supabase.co/auth/v1/callback`
6. Salve as configurações

### Links Úteis:

- [Google Cloud Console](https://console.cloud.google.com)
- [Documentação Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase CLI](https://supabase.com/docs/guides/cli)

## Estrutura dos Arquivos

- `.env.example` - Template com todas as variáveis e instruções (pode ser commitado)
- `.env.local` - Seu arquivo de configuração pessoal (NÃO será commitado)
- `.env.local.template` - Template simplificado (pode ser commitado)

## Validação

Após configurar o `.env.local`, verifique se as variáveis estão sendo carregadas:

```bash
# No diretório web/
npm run dev
```

Se houver erros sobre variáveis não definidas, verifique:
1. Se o arquivo `.env.local` existe na raiz de `web/`
2. Se todas as variáveis começam com `VITE_`
3. Se não há espaços extras ou caracteres especiais

## Importante

- ⚠️ **NUNCA** commite o arquivo `.env.local` no repositório (já está no .gitignore)
- ⚠️ As variáveis com prefixo `VITE_` são expostas ao cliente (browser)
- ⚠️ Não coloque credenciais sensíveis em variáveis `VITE_*`
- ⚠️ Use apenas a chave **anon public** do Supabase, nunca a **service_role** key
- ⚠️ A chave anon é segura para uso no cliente, mas não deve ser compartilhada publicamente

