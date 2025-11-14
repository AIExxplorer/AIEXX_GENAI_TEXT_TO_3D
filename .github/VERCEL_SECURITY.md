# 🔒 Guia de Segurança - Vercel Deployment

## ⚠️ IMPORTANTE: Repositório Público

Como o repositório GitHub é **público**, é **CRÍTICO** proteger todas as informações sensíveis.

## 🚫 O QUE NUNCA FAZER

### ❌ NUNCA commite:
- Tokens de API
- Chaves secretas
- Senhas
- Credenciais de banco de dados
- URLs com tokens
- Qualquer informação sensível

### ❌ NUNCA adicione no código:
```typescript
// ERRADO ❌
const API_KEY = "sk-1234567890abcdef"
const SECRET = "my-secret-key"
```

### ❌ NUNCA adicione em arquivos de configuração commitados:
```json
// ERRADO ❌
{
  "apiKey": "sk-1234567890abcdef"
}
```

## ✅ O QUE FAZER

### 1. Use Variáveis de Ambiente no Vercel

Todas as informações sensíveis devem ser configuradas como **Environment Variables** no Vercel Dashboard:

1. Acesse seu projeto no Vercel
2. Vá em **Settings** → **Environment Variables**
3. Adicione cada variável:
   - **Key**: Nome da variável (ex: `VITE_HUGGINGFACE_API_KEY`)
   - **Value**: Valor real (não será visível no código)
   - **Environment**: Selecione (Production, Preview, Development)

### 2. Use Arquivo .env.example

O arquivo `web/.env.example` contém apenas exemplos sem valores reais:

```env
# Exemplo - NUNCA use valores reais aqui
VITE_API_URL=http://localhost:8000
VITE_HUGGINGFACE_API_KEY=your_token_here
```

### 3. Use .env.local para Desenvolvimento Local

Para desenvolvimento local, crie um arquivo `.env.local` (já está no .gitignore):

```bash
# Copiar exemplo
cp web/.env.example web/.env.local

# Editar com valores reais (apenas localmente)
# Este arquivo NUNCA será commitado
```

## 🔐 Variáveis de Ambiente Recomendadas

### Variáveis Públicas (podem estar no código)

Estas variáveis são seguras para estar no código, pois são públicas:

```env
VITE_API_URL=https://api.aiexx.com
VITE_APP_NAME=AIEXX_GENAI_TEXT_TO_3D
NODE_ENV=production
```

### Variáveis Privadas (NUNCA no código)

Estas variáveis devem estar APENAS no Vercel Dashboard:

```env
# Tokens de API
VITE_HUGGINGFACE_API_KEY=sk-...
VITE_OPENAI_API_KEY=sk-...

# Secrets
VITE_SECRET_KEY=...
VITE_ENCRYPTION_KEY=...

# URLs com tokens
VITE_DATABASE_URL=postgresql://user:password@host:5432/db
```

## 📋 Checklist de Segurança

### Antes de Fazer Commit

- [ ] Verifique se não há tokens/chaves no código
- [ ] Verifique se não há senhas em arquivos de configuração
- [ ] Verifique se `.env.local` não está sendo commitado
- [ ] Verifique se `.env` não está sendo commitado
- [ ] Verifique se apenas `.env.example` está no repositório

### Antes de Fazer Deploy

- [ ] Todas as variáveis sensíveis estão configuradas no Vercel Dashboard
- [ ] Nenhuma variável sensível está no código
- [ ] `.env.example` contém apenas exemplos sem valores reais
- [ ] Documentação está atualizada

### Após Fazer Deploy

- [ ] Teste se a aplicação funciona sem expor variáveis
- [ ] Verifique os logs do Vercel para garantir que não há vazamentos
- [ ] Teste em diferentes ambientes (Production, Preview)

## 🛡️ Como Configurar no Vercel

### Passo a Passo

1. **Acesse o Dashboard do Vercel**
   - Vá para: https://vercel.com/dashboard
   - Selecione seu projeto: `aiexx-genai-text-to-3d-web`

2. **Navegue até Environment Variables**
   - Clique em **Settings**
   - Clique em **Environment Variables** no menu lateral

3. **Adicione Variáveis**
   - Clique em **Add New**
   - Preencha:
     - **Key**: `VITE_HUGGINGFACE_API_KEY` (exemplo)
     - **Value**: Seu token real (ex: `sk-1234567890abcdef`)
     - **Environment**: Selecione onde aplicar:
       - ✅ Production (produção)
       - ✅ Preview (previews de PRs)
       - ✅ Development (desenvolvimento local via Vercel CLI)

4. **Salve e Faça Redeploy**
   - Clique em **Save**
   - Faça um novo deploy para aplicar as variáveis

## 🔍 Verificação de Segurança

### Comando para Verificar

```bash
# Verificar se há tokens/chaves no código
grep -r "sk-" web/src/ --exclude-dir=node_modules
grep -r "api[_-]key" web/src/ --exclude-dir=node_modules -i
grep -r "secret" web/src/ --exclude-dir=node_modules -i
grep -r "password" web/src/ --exclude-dir=node_modules -i
```

### Ferramentas Recomendadas

- **git-secrets**: Detecta secrets antes do commit
- **truffleHog**: Scanner de secrets em repositórios
- **GitGuardian**: Monitoramento contínuo de secrets

## 📚 Boas Práticas

### 1. Prefixo VITE_

Variáveis que começam com `VITE_` são expostas ao cliente (browser). Use apenas para variáveis públicas:

```env
# ✅ OK - Público
VITE_API_URL=https://api.aiexx.com
VITE_APP_NAME=AIEXX

# ❌ EVITE - Sensível no cliente
VITE_SECRET_KEY=...
```

### 2. Variáveis de Servidor

Para variáveis que não devem ser expostas ao cliente, use API routes ou serverless functions:

```typescript
// No código do cliente (browser)
const apiUrl = import.meta.env.VITE_API_URL // ✅ OK

// Para secrets, use API routes
// Não exponha diretamente no cliente
```

### 3. Rotação de Credenciais

- Rotacione tokens regularmente
- Use diferentes tokens para diferentes ambientes
- Revogue tokens comprometidos imediatamente

## 🚨 Se Você Expôs Informações Sensíveis

### Ações Imediatas

1. **Revogue o token/chave imediatamente**
2. **Remova do histórico do Git** (se possível)
3. **Gere novos tokens/chaves**
4. **Atualize no Vercel Dashboard**
5. **Faça um novo deploy**

### Limpar Histórico do Git

```bash
# ATENÇÃO: Isso reescreve o histórico
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch arquivo-com-secret" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (cuidado!)
git push origin --force --all
```

## 📖 Recursos Adicionais

- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [GitHub Security Best Practices](https://docs.github.com/en/code-security)

---

**Lembre-se**: Em um repositório público, assuma que TUDO que você commita será visível para todos. Quando em dúvida, use variáveis de ambiente no Vercel Dashboard.

