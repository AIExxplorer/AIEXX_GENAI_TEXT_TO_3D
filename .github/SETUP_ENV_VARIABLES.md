# 🚀 Guia Rápido: Configurar Environment Variables

## 📍 Onde Configurar Cada Variável

### 🟢 VERCEL (Frontend - Produção)

**Acesse**: https://vercel.com/dashboard → Seu Projeto → Settings → Environment Variables

**Variáveis para adicionar**:

| Variável | Valor Exemplo | Obrigatória | Descrição |
|----------|---------------|-------------|-----------|
| `VITE_API_URL` | `https://api.aiexx.com` | ✅ Sim | URL da API backend |
| `NODE_ENV` | `production` | ✅ Sim | Ambiente de produção |
| `VITE_APP_NAME` | `AIEXX_GENAI_TEXT_TO_3D` | ⚪ Opcional | Nome da aplicação |
| `VITE_HUGGINGFACE_API_KEY` | `hf_xxxxx` | ⚪ Se necessário | Token Hugging Face |

**Como adicionar**:
1. Clique em **Add New**
2. Preencha **Key** e **Value**
3. Selecione **Environments** (Production, Preview, Development)
4. Clique em **Save**

### 🔵 GITHUB SECRETS (CI/CD)

**Acesse**: https://github.com/AIExxplorer/AIEXX_GENAI_TEXT_TO_3D/settings/secrets/actions

**Variáveis para adicionar** (se usar deploy automático):

| Variável | Valor Exemplo | Obrigatória | Descrição |
|----------|---------------|-------------|-----------|
| `VERCEL_TOKEN` | `xxxxx` | ⚪ Se usar deploy automático | Token do Vercel |
| `VERCEL_ORG_ID` | `team_xxxxx` | ⚪ Se usar deploy automático | ID da organização |
| `VERCEL_PROJECT_ID` | `prj_xxxxx` | ⚪ Se usar deploy automático | ID do projeto |

**Como adicionar**:
1. Clique em **New repository secret**
2. Preencha **Name** e **Secret**
3. Clique em **Add secret**

## 🎯 Checklist Rápido

### Para Deploy no Vercel

- [ ] Criar projeto no Vercel
- [ ] Configurar `VITE_API_URL` no Vercel Dashboard
- [ ] Configurar `NODE_ENV=production` no Vercel Dashboard
- [ ] Adicionar outras variáveis necessárias (Hugging Face, etc.)
- [ ] Fazer primeiro deploy

### Para CI/CD (Opcional)

- [ ] Obter Vercel Token
- [ ] Adicionar `VERCEL_TOKEN` como GitHub Secret
- [ ] Adicionar `VERCEL_ORG_ID` como GitHub Secret
- [ ] Adicionar `VERCEL_PROJECT_ID` como GitHub Secret

## 📚 Documentação Completa

Para mais detalhes, consulte:
- [.github/ENVIRONMENT_VARIABLES.md](.github/ENVIRONMENT_VARIABLES.md) - Guia completo
- [.github/VERCEL_SECURITY.md](.github/VERCEL_SECURITY.md) - Segurança

---

**💡 Dica**: Comece apenas com `VITE_API_URL` e `NODE_ENV`. Adicione outras variáveis conforme necessário.

