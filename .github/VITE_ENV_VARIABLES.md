# 🔑 Como Configurar Variáveis de Ambiente no Vite

## 📚 Entendendo o Prefixo `VITE_`

Segundo a [documentação oficial do Vite](https://vite.dev/guide/api-environment), variáveis de ambiente que começam com `VITE_` são **expostas ao código do cliente** (browser). Isso significa que elas estarão disponíveis no seu código JavaScript/TypeScript.

### ⚠️ Importante

- **NÃO existe uma "VITE API KEY"** do próprio Vite
- O prefixo `VITE_` é apenas uma convenção para expor variáveis ao cliente
- Você precisa criar suas próprias variáveis com nomes descritivos

## 🎯 Variáveis que Você Precisa Criar

### 1. Variáveis Públicas (Seguras para o Cliente)

Estas variáveis podem ser expostas ao cliente porque são públicas:

```env
# URL da API Backend
VITE_API_URL=https://api.aiexx.com

# Informações da Aplicação
VITE_APP_NAME=AIEXX_GENAI_TEXT_TO_3D
VITE_APP_VERSION=1.0.0
```

### 2. Variáveis Privadas (Tokens de APIs Externas)

⚠️ **CUIDADO**: Estas variáveis serão expostas ao cliente! Use apenas se necessário.

```env
# Hugging Face API Key (se precisar usar no frontend)
VITE_HUGGINGFACE_API_KEY=hf_xxxxxxxxxxxxx

# OpenAI API Key (se precisar usar no frontend)
VITE_OPENAI_API_KEY=sk-xxxxxxxxxxxxx
```

> **Recomendação**: Se possível, use essas APIs apenas no backend e exponha endpoints seguros para o frontend.

## 📝 Como Obter Tokens de APIs Externas

### Hugging Face API Key

1. Acesse: https://huggingface.co/settings/tokens
2. Faça login na sua conta
3. Clique em **New token**
4. Configure:
   - **Name**: `aiexx-text-to-3d` (ou outro nome descritivo)
   - **Type**: 
     - `Read` - Para apenas ler modelos
     - `Write` - Para fazer upload de modelos
5. Clique em **Generate token**
6. **Copie o token imediatamente** (você não poderá vê-lo novamente)
7. Formato: `hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### OpenAI API Key

1. Acesse: https://platform.openai.com/api-keys
2. Faça login na sua conta OpenAI
3. Clique em **Create new secret key**
4. Dê um nome descritivo
5. Clique em **Create secret key**
6. **Copie o token imediatamente**
7. Formato: `sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Outras APIs

Para outras APIs, consulte a documentação específica de cada serviço.

## 🔧 Como Usar no Código

### No TypeScript/JavaScript

```typescript
// Acessar variáveis de ambiente
const apiUrl = import.meta.env.VITE_API_URL
const huggingFaceKey = import.meta.env.VITE_HUGGINGFACE_API_KEY

// Exemplo de uso
async function generateModel(prompt: string) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/generation/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Se necessário passar a key diretamente (não recomendado)
      // 'Authorization': `Bearer ${import.meta.env.VITE_HUGGINGFACE_API_KEY}`
    },
    body: JSON.stringify({ prompt })
  })
  return response.json()
}
```

### Tipos TypeScript (Opcional)

Crie um arquivo `src/env.d.ts`:

```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: string
  readonly VITE_HUGGINGFACE_API_KEY?: string
  // outras variáveis...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

## 🚀 Como Configurar no Vercel

### Passo a Passo

1. **Acesse o Dashboard do Vercel**
   - Vá para: https://vercel.com/dashboard
   - Selecione seu projeto: `aiexx-genai-text-to-3d-web`

2. **Navegue até Environment Variables**
   - Clique em **Settings**
   - Clique em **Environment Variables** no menu lateral

3. **Adicione Cada Variável**
   - Clique em **Add New**
   - Preencha:
     - **Key**: `VITE_API_URL` (exemplo)
     - **Value**: `https://api.aiexx.com` (seu valor real)
     - **Environment**: Selecione onde aplicar:
       - ✅ Production (produção)
       - ✅ Preview (previews de PRs)
       - ✅ Development (desenvolvimento local via Vercel CLI)

4. **Repita para Todas as Variáveis**
   - `VITE_API_URL`
   - `VITE_HUGGINGFACE_API_KEY` (se necessário)
   - Outras variáveis que você precisar

5. **Salve e Faça Redeploy**
   - Clique em **Save**
   - Faça um novo deploy para aplicar as variáveis

## 🏠 Como Configurar Localmente

### 1. Criar Arquivo `.env.local`

```bash
# Na pasta web/
cd web
cp .env.example .env.local
```

### 2. Editar `.env.local`

```env
# Preencha com valores reais (apenas localmente)
VITE_API_URL=http://localhost:8000
VITE_HUGGINGFACE_API_KEY=hf_seu_token_aqui
```

### 3. Reiniciar o Servidor de Desenvolvimento

```bash
npm run dev
```

> **Importante**: O arquivo `.env.local` já está no `.gitignore` e **NUNCA** será commitado.

## 🔒 Segurança

### ⚠️ Lembre-se

Variáveis com prefixo `VITE_` são **expostas ao cliente** (browser). Isso significa:

- ✅ **Seguro**: URLs públicas, nomes de aplicação
- ⚠️ **Cuidado**: Tokens de API (serão visíveis no código fonte do browser)
- ❌ **Nunca**: Senhas, chaves secretas críticas

### Recomendação de Arquitetura

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Frontend  │ ──────> │   Backend    │ ──────> │   APIs      │
│  (Vercel)   │         │  (FastAPI)   │         │  (Hugging   │
│             │         │              │         │   Face)     │
│ VITE_API_URL│         │ HUGGINGFACE_ │         │             │
│             │         │ API_KEY      │         │             │
└─────────────┘         └──────────────┘         └─────────────┘
   (Público)              (Privado)                (Privado)
```

**Melhor prática**: Use APIs externas apenas no backend. O frontend chama o backend, e o backend chama as APIs externas.

## 📋 Checklist

- [ ] Entendi que não existe "VITE API KEY" do Vite
- [ ] Criei tokens nas APIs que preciso (Hugging Face, etc.)
- [ ] Configurei variáveis no Vercel Dashboard
- [ ] Criei `.env.local` para desenvolvimento local
- [ ] Adicionei tipos TypeScript (opcional)
- [ ] Testei que as variáveis funcionam no código

## 📚 Referências

- [Vite Environment Variables](https://vite.dev/guide/api-environment)
- [Vite Env Variables Guide](https://vite.dev/guide/env-and-mode)
- [Hugging Face Tokens](https://huggingface.co/docs/hub/security-tokens)
- [OpenAI API Keys](https://platform.openai.com/api-keys)

---

**Resumo**: O Vite não fornece uma API Key. Você precisa criar suas próprias variáveis de ambiente com o prefixo `VITE_` e configurá-las no Vercel Dashboard ou em arquivos `.env.local` para desenvolvimento.

