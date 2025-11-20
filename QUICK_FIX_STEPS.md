# 🚀 FIX RÁPIDO - 3 Passos Simples

## 🎯 O Que Fazer AGORA

O OAuth está funcionando, mas está redirecionando para `localhost:3000` porque a variável `VITE_APP_URL` **não está configurada** na Vercel.

---

## ⚡ PASSO 1: Adicionar Variável na Vercel (2 min)

### 1.1 Obter URL

```
Dashboard Vercel > Seu Projeto > Settings > Domains
```

Copie a primeira URL (ex: `https://aiexx-genai-text-to-3d-web.vercel.app`)

### 1.2 Adicionar Variável

```
Settings > Environment Variables > Add New

Name: VITE_APP_URL
Value: [SUA URL COPIADA]
Environments: ✅ Production ✅ Preview ✅ Development

[Save]
```

---

## ⚡ PASSO 2: Redeploy (3 min)

### 2.1 Fazer Redeploy

```
Deployments > [Último] > [...] > Redeploy
```

⚠️ **NÃO marque** "Use existing Build Cache"

### 2.2 Aguardar

```
Aguarde até aparecer: ✅ Ready
```

---

## ⚡ PASSO 3: Configurar Supabase (2 min)

### 3.1 Site URL

```
Supabase > Authentication > URL Configuration > Site URL

Valor: https://sua-url.vercel.app
```

### 3.2 Redirect URLs

```
Redirect URLs (adicione linha por linha):

http://localhost:5173
http://localhost:5173/**
https://sua-url.vercel.app
https://sua-url.vercel.app/**

[Save]
```

---

## ✅ Testar

1. Limpe cache: F12 > Application > Clear site data
2. Acesse: `https://sua-url.vercel.app`
3. Clique: "Continuar com Google"
4. ✅ Deve redirecionar de volta para Vercel (NÃO localhost)

---

## 📋 Checklist Rápido

- [ ] VITE_APP_URL adicionada na Vercel
- [ ] Redeploy feito (sem cache)
- [ ] Site URL no Supabase configurada
- [ ] Redirect URLs no Supabase com `/**`
- [ ] Cache limpo
- [ ] Testado

---

## 🎯 URL Provável

Baseado na análise, sua URL deve ser:

```
https://aiexx-genai-text-to-3d-web.vercel.app
```

Confirme em: Settings > Domains na Vercel

---

## ⏱️ Tempo Total: ~7 minutos

---

**Para instruções detalhadas, consulte:** `URGENTE_FIX_OAUTH.md`
