# Configuração de Variáveis de Ambiente

Este arquivo documenta as variáveis de ambiente necessárias para a aplicação web.

## Arquivo .env.local

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

1. Acesse [Supabase Dashboard](https://app.supabase.com)
2. Selecione seu projeto
3. Vá em **Settings** > **API**
4. Copie a **URL** do projeto e cole em `VITE_SUPABASE_URL`
5. Copie a **anon public** key e cole em `VITE_SUPABASE_ANON_KEY`

## Importante

- ⚠️ **NUNCA** commite o arquivo `.env.local` no repositório
- ⚠️ As variáveis com prefixo `VITE_` são expostas ao cliente (browser)
- ⚠️ Não coloque credenciais sensíveis em variáveis `VITE_*`

