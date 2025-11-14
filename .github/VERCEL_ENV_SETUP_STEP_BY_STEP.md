# 🎯 Guia Passo a Passo: Configurar Environment Variables no Vercel

## 📍 Localização

Você está na página de **Shared Environment Variables** (nível do Team). Isso permite compartilhar variáveis entre múltiplos projetos.

## 🔧 Passo a Passo Completo

### Passo 1: Selecionar Environments

Na seção **"Environments"**:

1. Clique no dropdown que mostra "Production and Preview"
2. Selecione:
   - ✅ **Production** - Para produção
   - ✅ **Preview** - Para previews de PRs
   - ⚪ **Development** - Opcional (para desenvolvimento local via Vercel CLI)

**Recomendação**: Selecione **Production and Preview** para começar.

### Passo 2: Adicionar Variáveis

Na seção **"Key"** e **"Value"**:

#### Variável 1: URL da API Backend

1. **Key**: Digite exatamente:
   ```
   VITE_API_URL
   ```

2. **Value**: Digite a URL da sua API:
   ```
   https://api.aiexx.com
   ```
   Ou para desenvolvimento:
   ```
   http://localhost:8000
   ```
   > **Nota**: Se você ainda não tem a API em produção, use `http://localhost:8000` por enquanto e atualize depois.

3. Clique no ícone de **olho** 👁️ ao lado do campo Value para alternar entre mostrar/ocultar o valor.

#### Variável 2: Ambiente

1. Clique em **"Add Another"** (botão com ícone +)
2. **Key**: 
   ```
   NODE_ENV
   ```
3. **Value**:
   ```
   production
   ```

#### Variável 3: Nome da Aplicação (Opcional)

1. Clique em **"Add Another"** novamente
2. **Key**:
   ```
   VITE_APP_NAME
   ```
3. **Value**:
   ```
   AIEXX_GENAI_TEXT_TO_3D
   ```

#### Variável 4: Token Hugging Face (Se Necessário)

⚠️ **ATENÇÃO**: Esta variável será exposta ao cliente (browser). Use apenas se realmente necessário.

1. Clique em **"Add Another"**
2. **Key**:
   ```
   VITE_HUGGINGFACE_API_KEY
   ```
3. **Value**: Cole seu token do Hugging Face:
   ```
   hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
   > **Como obter**: https://huggingface.co/settings/tokens → New token

### Passo 3: Vincular ao Projeto

Na seção **"Link To Projects"**:

1. Clique no campo de busca que mostra "Search for a Project to link to..."
2. Digite o nome do seu projeto:
   ```
   aiexx-genai-text-to-3d-web
   ```
3. Selecione o projeto da lista que aparecer

> **Importante**: Se você não vincular ao projeto, as variáveis não serão aplicadas!

### Passo 4: Salvar

1. Revise todas as variáveis adicionadas
2. Verifique se o projeto está vinculado
3. Clique no botão **"Save"** (canto superior direito)

## 📋 Resumo das Variáveis para Adicionar

| Key | Value | Obrigatória | Descrição |
|-----|-------|-------------|-----------|
| `VITE_API_URL` | `https://api.aiexx.com` | ✅ Sim | URL da API backend |
| `NODE_ENV` | `production` | ✅ Sim | Ambiente de produção |
| `VITE_APP_NAME` | `AIEXX_GENAI_TEXT_TO_3D` | ⚪ Opcional | Nome da aplicação |
| `VITE_HUGGINGFACE_API_KEY` | `hf_xxxxx` | ⚪ Se necessário | Token Hugging Face |

## 🔍 Alternativa: Configurar no Nível do Projeto

Se preferir configurar variáveis apenas para um projeto específico (não compartilhadas):

1. Vá para: **Dashboard** → Selecione seu projeto → **Settings** → **Environment Variables**
2. Lá você pode adicionar variáveis específicas do projeto
3. Não precisa vincular, pois já está no contexto do projeto

## ⚠️ Importante: Segurança

### ✅ O que é seguro adicionar aqui:

- URLs públicas (`VITE_API_URL`)
- Nomes de aplicação (`VITE_APP_NAME`)
- Variáveis públicas

### ⚠️ Cuidado com:

- Tokens de API (`VITE_HUGGINGFACE_API_KEY`) - serão expostos ao cliente!
- Chaves secretas - NUNCA use prefixo `VITE_` para secrets críticos

### 🔒 Recomendação de Arquitetura:

```
Frontend (Vercel) → Backend (FastAPI) → APIs Externas
     ↓                    ↓                    ↓
VITE_API_URL      HUGGINGFACE_API_KEY    (Privado)
(Público)         (Privado no backend)
```

**Melhor prática**: Use APIs externas apenas no backend. O frontend chama o backend, e o backend chama as APIs.

## 🧪 Verificar se Funcionou

Após salvar:

1. Vá para **Deployments** no seu projeto
2. Faça um novo deploy (ou aguarde o próximo deploy automático)
3. As variáveis estarão disponíveis em:
   ```typescript
   import.meta.env.VITE_API_URL
   import.meta.env.NODE_ENV
   ```

## 📚 Documentação Relacionada

- [.github/VITE_ENV_VARIABLES.md](.github/VITE_ENV_VARIABLES.md) - Guia completo sobre variáveis VITE_
- [.github/VERCEL_SECURITY.md](.github/VERCEL_SECURITY.md) - Segurança e boas práticas
- [.github/ENVIRONMENT_VARIABLES.md](.github/ENVIRONMENT_VARIABLES.md) - Guia geral de environment variables

---

**💡 Dica**: Comece apenas com `VITE_API_URL` e `NODE_ENV`. Adicione outras variáveis conforme necessário.

