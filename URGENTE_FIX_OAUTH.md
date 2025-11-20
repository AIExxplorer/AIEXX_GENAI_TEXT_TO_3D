# 🚨 FIX URGENTE - OAuth Redirecionando para Localhost

## ❌ Problema Identificado

Você está sendo redirecionado para:

```
http://localhost:3000/#access_token=...
```

**Causa:** A variável `VITE_APP_URL` **NÃO está configurada** na Vercel ou o redeploy não foi feito após adicionar a variável.

---

## ✅ SOLUÇÃO RÁPIDA (5 minutos)

### Passo 1: Obter URL Exata da Vercel

1. Acesse: https://vercel.com/dashboard
2. Clique no seu projeto
3. Vá em **Settings** > **Domains**
4. **Copie a URL principal** (primeira da lista)

**Exemplo:** `https://aiexx-genai-text-to-3d-web.vercel.app`

---

### Passo 2: Adicionar VITE_APP_URL

1. No dashboard da Vercel, vá em **Settings** > **Environment Variables**

2. Clique em **Add New**

3. Preencha:

   ```
   Name: VITE_APP_URL
   Value: [COLE A URL QUE VOCÊ COPIOU]
   ```

4. **IMPORTANTE:** Marque TODOS os ambientes:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

5. Clique em **Save**

---

### Passo 3: Redeploy (OBRIGATÓRIO)

**⚠️ Este passo é CRÍTICO - adicionar a variável não afeta deployments anteriores!**

1. Vá em **Deployments**
2. Clique no deployment mais recente
3. Clique nos **três pontos** `...` no canto superior direito
4. Selecione **Redeploy**
5. **NÃO marque** "Use existing Build Cache"
6. Clique em **Redeploy**
7. **Aguarde** até aparecer ✅ Ready (2-5 minutos)

---

### Passo 4: Verificar Build Logs (Opcional mas Recomendado)

1. Clique no deployment que acabou de fazer
2. Clique em **Build Logs**
3. Use Ctrl+F para buscar: `VITE_APP_URL`
4. Você deve ver algo como:
   ```
   VITE_APP_URL=https://sua-url.vercel.app
   ```

Se **NÃO aparecer**, a variável não foi adicionada corretamente. Volte ao Passo 2.

---

### Passo 5: Configurar Supabase

Acesse: https://app.supabase.com > Seu Projeto > Authentication > URL Configuration

#### a) Site URL

```
https://[sua-url-da-vercel].vercel.app
```

#### b) Redirect URLs

**Adicione estas URLs (uma por linha):**

```
http://localhost:5173
http://localhost:5173/**
http://localhost:3000
http://localhost:3000/**
https://[sua-url-da-vercel].vercel.app
https://[sua-url-da-vercel].vercel.app/**
```

**⚠️ IMPORTANTE:**

- Use a **MESMA URL** que você configurou em `VITE_APP_URL`
- Adicione com `/**` no final
- Clique em **Save**
- Aguarde 1-2 minutos para propagar

---

### Passo 6: Testar

1. **Limpe o cache do navegador:**
   - Pressione F12
   - Application > Storage > Clear site data

2. **Acesse sua aplicação:**
   - `https://[sua-url-da-vercel].vercel.app`

3. **Abra o Console:**
   - F12 > Console

4. **Clique em "Continuar com Google"**

5. **Verifique o console:**
   - Procure por: `[useAuth] Iniciando OAuth com Google`
   - Deve mostrar sua URL da Vercel, **NÃO** localhost

6. **Resultado esperado:**
   - ✅ Redirecionado para Google
   - ✅ Após login, **retorna para sua URL Vercel**
   - ✅ Você está autenticado
   - ✅ Vê seu avatar e nome

---

## 🔍 Checklist de Verificação

Antes de testar, confirme:

- [ ] `VITE_APP_URL` adicionada na Vercel
- [ ] Variável configurada para Production, Preview E Development
- [ ] Valor da variável é sua URL real da Vercel (com `https://`)
- [ ] Redeploy foi feito (SEM cache)
- [ ] Build completado (✅ Ready)
- [ ] `VITE_APP_URL` aparece nos Build Logs
- [ ] Site URL configurada no Supabase
- [ ] Redirect URLs configuradas no Supabase (com `/**`)
- [ ] Cache do navegador limpo

---

## 🐛 Se AINDA Redirecionar para Localhost

### Causa 1: Variável não foi adicionada

**Verifique:**

- Settings > Environment Variables
- Procure por `VITE_APP_URL`
- Se não existir, adicione seguindo Passo 2

### Causa 2: Redeploy não foi feito

**Solução:**

- Faça um novo Redeploy (Passo 3)
- Aguarde completar
- Limpe cache do navegador
- Teste novamente

### Causa 3: Variável não aparece nos logs

**Causa:** Ambiente não foi selecionado ao adicionar

**Solução:**

1. Settings > Environment Variables
2. Clique em `VITE_APP_URL`
3. Clique em **Edit**
4. Certifique-se de marcar Production, Preview, Development
5. Save
6. Faça novo Redeploy

### Causa 4: URL do Supabase não configurada

**Solução:**

1. Verifique Redirect URLs no Supabase
2. Certifique-se de ter adicionado com `/**`
3. Use a mesma URL de `VITE_APP_URL`
4. Save e aguarde 2 minutos

---

## 📊 Exemplo Completo

### Na Vercel:

**Environment Variables:**

```
Name: VITE_APP_URL
Value: https://aiexx-genai-text-to-3d-web.vercel.app
Environments: ✅ Production ✅ Preview ✅ Development
```

### No Supabase:

**Site URL:**

```
https://aiexx-genai-text-to-3d-web.vercel.app
```

**Redirect URLs:**

```
http://localhost:5173
http://localhost:5173/**
http://localhost:3000
http://localhost:3000/**
https://aiexx-genai-text-to-3d-web.vercel.app
https://aiexx-genai-text-to-3d-web.vercel.app/**
```

---

## 🎯 URL Provável do Seu Projeto

Com base na análise anterior, sua URL provavelmente é:

```
https://aiexx-genai-text-to-3d-web.vercel.app
```

**Mas sempre confirme em Settings > Domains na Vercel!**

---

## 📞 Script Automático

Se preferir usar o script:

```powershell
# Windows
vercel login
.\scripts\configure-vercel-env.ps1
vercel --prod
```

Depois configure o Supabase manualmente (Passo 5).

---

## ⏱️ Tempo Estimado

- Adicionar variável: 1 minuto
- Redeploy: 2-5 minutos
- Configurar Supabase: 2 minutos
- Testar: 1 minuto

**Total: ~10 minutos**

---

## ✅ Resultado Final Esperado

Após seguir todos os passos:

1. Acessa: `https://sua-url.vercel.app`
2. Clica em "Continuar com Google"
3. Console mostra: `redirectUrl: 'https://sua-url.vercel.app'`
4. Faz login no Google
5. **É redirecionado de volta para `https://sua-url.vercel.app`**
6. Está autenticado com sucesso
7. Vê seu avatar e nome na aplicação

**NÃO mais redireciona para localhost!** ✅

---

**Criado em:** 20/11/2025
**Problema:** OAuth redirecionando para localhost em vez da Vercel
**Solução:** Configurar VITE_APP_URL e fazer redeploy
