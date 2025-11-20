# ✅ Checklist de Deploy e Configuração na Vercel

## 🔍 Status da Configuração Local

### ✅ Código

- [x] Correção do OAuth implementada
- [x] Variável `VITE_APP_URL` adicionada ao código
- [x] Build local testado e funcionando
- [x] Commit criado e enviado para GitHub

---

## 📋 Verificações Necessárias na Vercel

### 1️⃣ Variáveis de Ambiente (CRÍTICO)

Acesse: https://vercel.com/[seu-usuario]/[seu-projeto]/settings/environment-variables

**Variáveis Obrigatórias:**

| Variável                 | Valor                                      | Ambiente                         | Status           |
| ------------------------ | ------------------------------------------ | -------------------------------- | ---------------- |
| `VITE_SUPABASE_URL`      | `https://grpxuporwqdyckkyhlcx.supabase.co` | Production, Preview, Development | ⚠️ Verificar     |
| `VITE_SUPABASE_ANON_KEY` | `sua_chave_anon`                           | Production, Preview, Development | ⚠️ Verificar     |
| `VITE_API_URL`           | URL da API backend                         | Production, Preview, Development | ⚠️ Verificar     |
| `VITE_APP_NAME`          | `AIEXX 3D`                                 | Production, Preview, Development | ⚠️ Verificar     |
| `VITE_APP_VERSION`       | `1.0.0`                                    | Production, Preview, Development | ⚠️ Verificar     |
| `VITE_APP_URL`           | **URL da Vercel**                          | Production, Preview, Development | 🔥 **ADICIONAR** |

**🔥 NOVO - VITE_APP_URL:**

- **Production**: `https://seu-dominio.vercel.app` (ou seu domínio customizado)
- **Preview**: `https://seu-dominio-git-[branch].vercel.app`
- **Development**: `http://localhost:5173`

**Como adicionar:**

1. Clique em **Add New**
2. Nome: `VITE_APP_URL`
3. Valor: Sua URL da Vercel (obtenha da seção Domains)
4. Selecione ambientes: Production, Preview, Development
5. Clique em **Save**

---

### 2️⃣ Configuração de Build

Acesse: https://vercel.com/[seu-usuario]/[seu-projeto]/settings

**Verificar:**

- [ ] **Root Directory**: `web`
- [ ] **Framework Preset**: Vite
- [ ] **Build Command**: Usa `vercel.json` (automático)
- [ ] **Output Directory**: `dist`
- [ ] **Node.js Version**: 20.x

---

### 3️⃣ Domains e URLs

Acesse: https://vercel.com/[seu-usuario]/[seu-projeto]/settings/domains

**Ações:**

1. Identifique sua URL principal de produção
2. Copie a URL exata (ex: `https://aiexx-3d.vercel.app`)
3. Use essa URL na variável `VITE_APP_URL`

**URLs que você terá:**

- **Production**: `https://[projeto].vercel.app`
- **Preview**: `https://[projeto]-git-[branch]-[usuario].vercel.app`
- **Development**: Seu localhost

---

### 4️⃣ Deployment Status

Acesse: https://vercel.com/[seu-usuario]/[seu-projeto]

**Verificar último deployment:**

- [ ] Status: ✅ Ready
- [ ] Build Logs: Sem erros
- [ ] Variáveis de ambiente injetadas no build

**Como verificar se VITE_APP_URL foi injetada:**

1. Clique no último deployment
2. Vá em **Build Logs**
3. Procure por: `VITE_APP_URL` nos logs
4. Se aparecer, foi injetada corretamente

---

## 🔧 Comandos Úteis (Requer Login)

Se você quiser usar a CLI localmente, primeiro faça login:

```bash
# Login na Vercel
vercel login

# Listar variáveis de ambiente
vercel env ls

# Adicionar variável de ambiente
vercel env add VITE_APP_URL

# Ver deployments
vercel ls

# Trigger novo deployment
vercel --prod
```

---

## 🌐 Configuração do Supabase

Após configurar a Vercel, você DEVE configurar o Supabase:

### 1. Site URL

Acesse: https://app.supabase.com > [Seu Projeto] > Authentication > URL Configuration

```
Site URL: https://seu-dominio.vercel.app
```

### 2. Redirect URLs

Adicione todas estas URLs:

```
Development:
- http://localhost:5173
- http://localhost:5173/**

Production:
- https://seu-dominio.vercel.app
- https://seu-dominio.vercel.app/**

Preview (opcional):
- https://seu-dominio-git-*.vercel.app/**
```

### 3. Google OAuth Provider

Acesse: Authentication > Providers > Google

Verifique:

- [ ] Enabled: ✅
- [ ] Client ID: Configurado
- [ ] Client Secret: Configurado

---

## ☁️ Configuração do Google Cloud Console

Acesse: https://console.cloud.google.com > APIs & Services > Credentials

### Authorized Redirect URIs

Certifique-se de ter APENAS a URI do Supabase:

```
https://grpxuporwqdyckkyhlcx.supabase.co/auth/v1/callback
```

**⚠️ IMPORTANTE:**

- NÃO adicione a URL da Vercel aqui
- O Google redireciona para o Supabase
- O Supabase redireciona para sua aplicação

---

## 🧪 Teste Completo do Fluxo OAuth

### 1. Antes do Deploy

- [ ] Limpar cache do navegador
- [ ] Limpar localStorage e sessionStorage

### 2. Testar Local

```bash
cd web
npm run dev
```

- [ ] Login com Google funciona em localhost
- [ ] Callback retorna para localhost
- [ ] Usuário é autenticado corretamente

### 3. Testar Produção

1. Acesse: `https://seu-dominio.vercel.app`
2. Clique em "Continuar com Google"
3. Faça login com sua conta Google
4. Verifique:
   - [ ] Redirecionado para Google
   - [ ] Após autenticar, retorna para Vercel (NÃO localhost)
   - [ ] Usuário autenticado com sucesso
   - [ ] Avatar e nome aparecem corretamente

### 4. Verificar Console do Navegador

Abra DevTools (F12) e procure por:

```
[useAuth] Iniciando OAuth com Google: { redirectUrl: 'https://seu-dominio.vercel.app' }
```

Se aparecer `localhost`, a variável `VITE_APP_URL` não foi configurada ou o redeploy não foi feito.

---

## 🔥 Troubleshooting Rápido

### ❌ Ainda redireciona para localhost

**Causa:** `VITE_APP_URL` não configurada ou não injetada no build

**Solução:**

1. Adicione `VITE_APP_URL` nas variáveis de ambiente da Vercel
2. Faça um **Redeploy** completo (não apenas rebuild)
3. Limpe cache do navegador
4. Teste novamente

### ❌ Erro "redirect_uri_mismatch"

**Causa:** URL não autorizada no Supabase

**Solução:**

1. Vá em Supabase > Authentication > URL Configuration
2. Adicione sua URL da Vercel em Redirect URLs
3. Adicione com `/**` no final
4. Salve e aguarde 1 minuto

### ❌ Erro "invalid_request"

**Causa:** Site URL não configurada no Supabase

**Solução:**

1. Configure Site URL no Supabase
2. Use a mesma URL de `VITE_APP_URL`
3. Salve e aguarde propagação

### ❌ Build falha na Vercel

**Causa:** Variáveis de ambiente faltando

**Solução:**

1. Verifique os Build Logs
2. Adicione todas as variáveis obrigatórias
3. Faça redeploy

---

## 📊 Checklist Final de Deploy

### Antes do Deploy:

- [x] Código commitado e pushed
- [x] Build local funciona
- [ ] Variáveis de ambiente preparadas
- [ ] URL da Vercel identificada

### Na Vercel:

- [ ] `VITE_APP_URL` adicionada (com URL correta)
- [ ] Todas outras variáveis configuradas
- [ ] Redeploy realizado
- [ ] Build completado com sucesso
- [ ] Variáveis injetadas (verificar logs)

### No Supabase:

- [ ] Site URL configurada
- [ ] Redirect URLs configuradas (com `/**`)
- [ ] Google OAuth habilitado

### No Google Cloud:

- [ ] Redirect URI do Supabase configurada

### Teste Final:

- [ ] Cache limpo
- [ ] Login local funciona
- [ ] Login produção funciona
- [ ] Callback para Vercel (não localhost)
- [ ] Console mostra URL correta

---

## 🎯 Resultado Esperado

Ao completar todos os itens acima, você terá:

✅ OAuth funcionando em desenvolvimento (localhost)
✅ OAuth funcionando em produção (Vercel)
✅ Callback redirecionando corretamente para a Vercel
✅ Logs mostrando a URL correta no console
✅ Usuário autenticado com sucesso em ambos ambientes

---

## 📞 Comandos de Verificação

### Verificar variáveis localmente (após login):

```bash
vercel env pull .env.vercel
cat .env.vercel
```

### Ver deployments recentes:

```bash
vercel ls
```

### Ver logs do último deployment:

```bash
vercel logs [deployment-url]
```

### Trigger novo deployment de produção:

```bash
vercel --prod
```

---

## 📝 Notas Importantes

1. **VITE_APP_URL é obrigatória** para OAuth funcionar em produção
2. **Sempre faça Redeploy** após adicionar variáveis de ambiente
3. **Limpe cache** antes de testar
4. **Use URLs exatas** sem barras extras no final
5. **Aguarde propagação** de 1-2 minutos após configurar Supabase

---

**Última atualização:** 20/11/2025
**Commit relacionado:** 1984498 - fix(auth): corrigir callback do Google OAuth em produção
