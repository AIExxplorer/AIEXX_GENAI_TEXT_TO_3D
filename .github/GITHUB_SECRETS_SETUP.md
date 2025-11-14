# 🔐 Guia: Configurar GitHub Secrets

## 🤔 Preciso Configurar GitHub Secrets?

### ✅ SIM, configure se:
- Você quer fazer deploy automático via GitHub Actions
- Você quer automatizar releases com GitHub Actions
- Você quer usar workflows que precisam acessar o Vercel via API

### ❌ NÃO precisa se:
- Você só usa o deploy automático do Vercel (conectado ao GitHub)
- Você não usa GitHub Actions para deploy
- Você faz deploy manualmente

**Resumo**: Se o Vercel já está conectado ao seu repositório GitHub e fazendo deploy automaticamente, você **NÃO precisa** configurar GitHub Secrets agora.

---

## 🔧 Como Configurar GitHub Secrets (Se Necessário)

### Passo 1: Acessar Secrets

1. Acesse: https://github.com/AIExxplorer/AIEXX_GENAI_TEXT_TO_3D
2. Clique em **Settings** (no topo do repositório)
3. No menu lateral esquerdo, clique em **Secrets and variables** → **Actions**

### Passo 2: Adicionar Secrets

#### Secret 1: VERCEL_TOKEN (Se usar deploy automático via Actions)

**Como obter o token:**

1. Acesse: https://vercel.com/account/tokens
2. Clique em **Create Token**
3. Configure:
   - **Name**: `github-actions-deploy`
   - **Scope**: Full Account (ou apenas os projetos necessários)
4. Clique em **Create Token**
5. **Copie o token imediatamente** (você não poderá vê-lo novamente)

**Adicionar no GitHub:**

1. Na página de Secrets do GitHub, clique em **New repository secret**
2. **Name**: `VERCEL_TOKEN`
3. **Secret**: Cole o token que você copiou
4. Clique em **Add secret**

#### Secret 2: VERCEL_ORG_ID (Opcional)

**Como obter:**

1. Acesse: https://vercel.com/dashboard
2. Vá em **Settings** → **General** (do seu projeto ou team)
3. Encontre **Team ID** ou **Organization ID**
4. Copie o ID (formato: `team_xxxxxxxxxxxxx`)

**Adicionar no GitHub:**

1. Clique em **New repository secret**
2. **Name**: `VERCEL_ORG_ID`
3. **Secret**: Cole o ID
4. Clique em **Add secret**

#### Secret 3: VERCEL_PROJECT_ID (Opcional)

**Como obter:**

1. Acesse: https://vercel.com/dashboard
2. Selecione seu projeto: `aiexx-genai-text-to-3d`
3. Vá em **Settings** → **General**
4. Encontre **Project ID**
5. Copie o ID (formato: `prj_xxxxxxxxxxxxx`)

**Adicionar no GitHub:**

1. Clique em **New repository secret**
2. **Name**: `VERCEL_PROJECT_ID`
3. **Secret**: Cole o ID
4. Clique em **Add secret**

---

## 📋 Checklist de GitHub Secrets

### Para Deploy Automático via GitHub Actions:

- [ ] `VERCEL_TOKEN` - Token do Vercel
- [ ] `VERCEL_ORG_ID` - ID da organização (opcional)
- [ ] `VERCEL_PROJECT_ID` - ID do projeto (opcional)

### Para Outros Workflows:

- [ ] Outros secrets conforme necessário (Docker, NPM, etc.)

---

## 🎯 Quando Você Precisa de GitHub Secrets?

### Cenário 1: Deploy Automático do Vercel ✅ (Atual)

```
GitHub Push → Vercel Detecta → Deploy Automático
```

**Neste caso**: Você **NÃO precisa** de GitHub Secrets! O Vercel já está conectado.

### Cenário 2: Deploy via GitHub Actions

```
GitHub Push → GitHub Actions → Vercel API → Deploy
```

**Neste caso**: Você **PRECISA** de `VERCEL_TOKEN` e outros secrets.

---

## 🔍 Verificar se Precisa Configurar

### Verifique seus Workflows

Olhe em `.github/workflows/`:

- Se você tem workflows que usam `VERCEL_TOKEN` → Configure os secrets
- Se você não tem workflows ou eles não usam Vercel → Não precisa configurar

### Workflows Atuais do Projeto

Você tem:
- ✅ `.github/workflows/update-readme.yml` - Não precisa de secrets
- ✅ `.github/workflows/release.yml` - Não precisa de secrets
- ✅ `.github/workflows/ci.yml` - Verifique se precisa

**Conclusão**: Com os workflows atuais, você **NÃO precisa** configurar GitHub Secrets agora.

---

## 📚 Recursos

- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Vercel Tokens](https://vercel.com/account/tokens)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

## ✅ Resumo

### No Vercel (FAZER AGORA):
- ✅ Adicionar `VITE_API_URL`
- ✅ `NODE_ENV` já está configurada

### No GitHub (OPCIONAL):
- ⚪ Configure apenas se for usar GitHub Actions para deploy
- ⚪ Com deploy automático do Vercel, não é necessário

---

**💡 Recomendação**: Configure GitHub Secrets apenas quando realmente precisar. Por enquanto, foque em adicionar `VITE_API_URL` no Vercel.

