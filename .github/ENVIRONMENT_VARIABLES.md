# 🔐 Guia Completo de Environment Variables

## 📋 Visão Geral

Este documento explica **onde** e **quais** variáveis de ambiente devem ser configuradas em cada plataforma (Vercel vs GitHub Secrets).

## 🎯 Diferença entre Vercel e GitHub Secrets

### Vercel Environment Variables
- **Uso**: Para a aplicação **frontend** em produção/preview
- **Acesso**: Disponível no código JavaScript/TypeScript do cliente (browser)
- **Prefixo**: `VITE_*` (expostas ao cliente)
- **Quando usar**: Variáveis que o frontend precisa acessar

### GitHub Secrets
- **Uso**: Para **CI/CD workflows** e processos de build
- **Acesso**: Disponível apenas nos workflows do GitHub Actions
- **Prefixo**: Qualquer (não expostas ao cliente)
- **Quando usar**: Tokens para deploy, testes, ou processos de build

## 📦 Variáveis para VERCEL (Frontend)

### 🔵 Variáveis Públicas (Podem estar no código)

Estas variáveis são seguras para estar no código, pois são públicas:

```env
# API Backend URL
VITE_API_URL=https://api.aiexx.com
# Para desenvolvimento local: http://localhost:8000

# Informações da Aplicação
VITE_APP_NAME=AIEXX_GENAI_TEXT_TO_3D
VITE_APP_VERSION=1.0.0

# Ambiente
NODE_ENV=production
```

### 🔴 Variáveis Privadas (NUNCA no código)

Estas variáveis devem estar **APENAS** no Vercel Dashboard:

```env
# Hugging Face API (se necessário para geração direta no frontend)
VITE_HUGGINGFACE_API_KEY=hf_xxxxxxxxxxxxx

# Outras APIs de IA (se necessário)
VITE_OPENAI_API_KEY=sk-xxxxxxxxxxxxx

# Analytics (opcional)
VITE_ANALYTICS_ID=G-XXXXXXXXXX

# Sentry ou outros serviços de monitoramento
VITE_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
```

### 📝 Como Configurar no Vercel

1. Acesse: https://vercel.com/dashboard
2. Selecione o projeto: `aiexx-genai-text-to-3d-web`
3. Vá em **Settings** → **Environment Variables**
4. Para cada variável:
   - **Key**: `VITE_API_URL` (exemplo)
   - **Value**: Valor real
   - **Environment**: 
     - ✅ Production (produção)
     - ✅ Preview (previews de PRs)
     - ✅ Development (desenvolvimento local via Vercel CLI)

## 🔧 Variáveis para GITHUB SECRETS (CI/CD)

### Variáveis para Workflows

Estas variáveis são usadas apenas nos workflows do GitHub Actions:

```env
# Vercel (para deploy automático via GitHub Actions)
VERCEL_TOKEN=xxxxxxxxxxxxxxxxxxxxx
VERCEL_ORG_ID=team_xxxxxxxxxxxxx
VERCEL_PROJECT_ID=prj_xxxxxxxxxxxxx

# Docker Hub (se usar containers)
DOCKER_USERNAME=seu_usuario
DOCKER_PASSWORD=seu_token

# NPM Registry (se publicar pacotes)
NPM_TOKEN=npm_xxxxxxxxxxxxx

# Testes e Quality Assurance
COVERAGE_TOKEN=xxxxxxxxxxxxx

# Notificações (Slack, Discord, etc.)
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxxxx
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/xxxxx
```

### 📝 Como Configurar no GitHub

1. Acesse: https://github.com/AIExxplorer/AIEXX_GENAI_TEXT_TO_3D/settings/secrets/actions
2. Clique em **New repository secret**
3. Para cada variável:
   - **Name**: `VERCEL_TOKEN` (exemplo)
   - **Secret**: Valor real
   - Clique em **Add secret**

## 🗂️ Variáveis para BACKEND (API Python)

### Variáveis do Backend (se deployar separadamente)

```env
# API Settings
API_HOST=0.0.0.0
API_PORT=8000
API_DEBUG=false
API_RELOAD=false

# CORS
CORS_ORIGINS=http://localhost:3000,http://localhost:5173,https://aiexx-genai-text-to-3d-web.vercel.app

# Database (se necessário no futuro)
DATABASE_URL=postgresql://user:password@host:5432/dbname

# Hugging Face (para backend)
HUGGINGFACE_API_KEY=hf_xxxxxxxxxxxxx

# JWT Secrets (se implementar autenticação)
JWT_SECRET_KEY=your-secret-key-here
JWT_ALGORITHM=HS256

# Redis (se necessário)
REDIS_URL=redis://localhost:6379
```

> **Nota**: Se o backend for deployado separadamente (Railway, Render, etc.), configure essas variáveis na plataforma de deploy do backend.

## 📋 Checklist de Configuração

### Vercel (Frontend)

- [ ] `VITE_API_URL` - URL da API backend
- [ ] `VITE_APP_NAME` - Nome da aplicação (opcional)
- [ ] `VITE_APP_VERSION` - Versão da aplicação (opcional)
- [ ] `NODE_ENV` - Ambiente (production/preview/development)
- [ ] `VITE_HUGGINGFACE_API_KEY` - Se necessário para geração no frontend
- [ ] Outras variáveis específicas do projeto

### GitHub Secrets (CI/CD)

- [ ] `VERCEL_TOKEN` - Token do Vercel (se usar deploy automático)
- [ ] `VERCEL_ORG_ID` - ID da organização no Vercel
- [ ] `VERCEL_PROJECT_ID` - ID do projeto no Vercel
- [ ] Outras variáveis necessárias para workflows

## 🔍 Como Obter os Valores

### Vercel Token

1. Acesse: https://vercel.com/account/tokens
2. Clique em **Create Token**
3. Nome: `github-actions-deploy`
4. Scope: Full Account
5. Copie o token gerado

### Vercel Org ID e Project ID

1. Acesse: https://vercel.com/dashboard
2. Selecione seu projeto
3. Vá em **Settings** → **General**
4. Encontre:
   - **Team ID** (Org ID)
   - **Project ID**

### Hugging Face Token

1. Acesse: https://huggingface.co/settings/tokens
2. Clique em **New token**
3. Nome: `aiexx-text-to-3d`
4. Tipo: Read (ou Write se necessário)
5. Copie o token gerado

## 🚨 Segurança

### ⚠️ NUNCA faça:

- ❌ Commitar valores reais de tokens/chaves
- ❌ Adicionar secrets em arquivos de código
- ❌ Compartilhar tokens via chat/email
- ❌ Usar o mesmo token em múltiplos ambientes

### ✅ SEMPRE faça:

- ✅ Use variáveis de ambiente
- ✅ Rotacione tokens regularmente
- ✅ Use diferentes tokens para diferentes ambientes
- ✅ Revogue tokens comprometidos imediatamente
- ✅ Use o mínimo de permissões necessárias

## 📚 Recursos

- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [GitHub Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Hugging Face Tokens](https://huggingface.co/docs/hub/security-tokens)

---

**Lembre-se**: Em um repositório público, assuma que TUDO que você commita será visível. Use sempre variáveis de ambiente para informações sensíveis.

