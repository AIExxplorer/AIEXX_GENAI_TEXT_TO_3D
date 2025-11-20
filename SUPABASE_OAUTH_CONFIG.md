# 🔐 Configuração do Google OAuth no Supabase

## ⚠️ Problema Resolvido

Este guia resolve o problema de callback do Google OAuth redirecionando para `localhost:3000` em produção na Vercel.

## 📋 Pré-requisitos

- Projeto deployado na Vercel
- Acesso ao dashboard do Supabase
- URL de produção da Vercel (ex: `https://seu-app.vercel.app`)

---

## 🔧 Passo 1: Configurar Variável de Ambiente na Vercel

### 1.1 Acessar Dashboard da Vercel

1. Acesse: https://vercel.com/dashboard
2. Selecione seu projeto
3. Vá em **Settings** > **Environment Variables**

### 1.2 Adicionar VITE_APP_URL

Adicione a seguinte variável de ambiente:

```bash
Nome: VITE_APP_URL
Valor: https://seu-dominio.vercel.app
```

**⚠️ IMPORTANTE**:

- Substitua `seu-dominio.vercel.app` pela URL real do seu projeto na Vercel
- Use a URL completa com `https://`
- NÃO adicione barra `/` no final
- Esta variável é **obrigatória** para o OAuth funcionar em produção

### 1.3 Re-deploy

Após adicionar a variável:

1. Vá em **Deployments**
2. Clique no último deployment
3. Clique nos três pontos `...`
4. Selecione **Redeploy**

---

## 🔐 Passo 2: Configurar Site URL no Supabase

### 2.1 Acessar Configurações de Autenticação

1. Acesse: https://app.supabase.com
2. Selecione seu projeto
3. Vá em **Authentication** > **URL Configuration**

### 2.2 Configurar Site URL

Configure o campo **Site URL** com a URL da sua aplicação:

```
https://seu-dominio.vercel.app
```

**⚠️ IMPORTANTE**:

- Deve ser a mesma URL configurada em `VITE_APP_URL`
- Não adicione barra `/` no final

---

## 🌐 Passo 3: Configurar Redirect URLs no Supabase

### 3.1 Adicionar URLs Autorizadas

No mesmo local (**Authentication** > **URL Configuration**), na seção **Redirect URLs**, adicione as seguintes URLs:

#### Desenvolvimento Local:

```
http://localhost:5173
http://localhost:5173/**
http://localhost:3000
http://localhost:3000/**
```

#### Produção:

```
https://seu-dominio.vercel.app
https://seu-dominio.vercel.app/**
```

**⚠️ IMPORTANTE**:

- Adicione tanto a URL base quanto com `/**` (wildcard)
- O `/**` permite callbacks para qualquer rota da aplicação
- Substitua `seu-dominio.vercel.app` pela URL real

### 3.2 Exemplo de Configuração Completa

```
Redirect URLs:
- http://localhost:5173
- http://localhost:5173/**
- http://localhost:3000
- http://localhost:3000/**
- https://aiexx-3d.vercel.app
- https://aiexx-3d.vercel.app/**
```

### 3.3 Salvar Configurações

Clique em **Save** para aplicar as mudanças.

---

## 🔍 Passo 4: Verificar Google OAuth Provider

### 4.1 Acessar Providers

1. No Supabase, vá em **Authentication** > **Providers**
2. Localize **Google** na lista

### 4.2 Verificar Configuração

Certifique-se de que:

- [ ] Google OAuth está **Enabled** (ativado)
- [ ] **Client ID** está configurado corretamente
- [ ] **Client Secret** está configurado corretamente
- [ ] **Authorized Client IDs** (opcional) está vazio ou configurado

### 4.3 Redirect URI para Google Cloud Console

Anote a **Redirect URI** fornecida pelo Supabase:

```
https://grpxuporwqdyckkyhlcx.supabase.co/auth/v1/callback
```

Esta URL deve estar configurada no Google Cloud Console.

---

## ☁️ Passo 5: Configurar Google Cloud Console

### 5.1 Acessar Google Cloud Console

1. Acesse: https://console.cloud.google.com
2. Selecione seu projeto
3. Vá em **APIs & Services** > **Credentials**

### 5.2 Configurar OAuth 2.0 Client

1. Clique no seu **OAuth 2.0 Client ID**
2. Na seção **Authorized redirect URIs**, certifique-se de ter:

```
https://grpxuporwqdyckkyhlcx.supabase.co/auth/v1/callback
```

**⚠️ IMPORTANTE**:

- Esta é a URI do Supabase, NÃO da sua aplicação
- O Supabase faz o redirect intermediário
- Use exatamente a URI fornecida pelo Supabase

### 5.3 Salvar

Clique em **Save** para aplicar as mudanças.

---

## ✅ Passo 6: Testar a Configuração

### 6.1 Limpar Cache do Navegador

1. Abra o DevTools (F12)
2. Vá em **Application** > **Storage**
3. Clique em **Clear site data**

### 6.2 Testar Login

1. Acesse sua aplicação na Vercel: `https://seu-dominio.vercel.app`
2. Clique em **Continuar com Google**
3. Faça login com sua conta Google
4. Verifique se você é redirecionado de volta para sua aplicação (não para localhost)

### 6.3 Verificar Console

Abra o DevTools e verifique o console para mensagens de log:

```
[useAuth] Iniciando OAuth com Google: { redirectUrl: 'https://seu-dominio.vercel.app' }
```

---

## 🐛 Troubleshooting

### Problema: Ainda redireciona para localhost

**Solução 1**: Verificar variável de ambiente

```bash
# No dashboard da Vercel, confirme que VITE_APP_URL está configurada
# Faça um redeploy após configurar
```

**Solução 2**: Limpar cache do Supabase

```javascript
// No console do navegador, execute:
localStorage.clear();
sessionStorage.clear();
// Depois, recarregue a página (F5)
```

**Solução 3**: Verificar build

```bash
# Verifique os logs de build na Vercel
# Confirme que a variável foi injetada durante o build
```

### Problema: Erro "redirect_uri_mismatch"

**Solução**: Verificar Redirect URLs

1. No Supabase: verifique se a URL da Vercel está em **Redirect URLs**
2. No Google Cloud Console: verifique se a URI do Supabase está configurada
3. Certifique-se de que as URLs correspondem exatamente (sem barras extras)

### Problema: Erro "invalid_request"

**Solução**: Verificar Site URL

1. No Supabase, vá em **Authentication** > **URL Configuration**
2. Certifique-se de que **Site URL** está configurado com a URL da Vercel
3. Salve e aguarde alguns minutos para propagar

### Problema: Login funciona local mas não em produção

**Solução**: Verificar variável de ambiente

1. Certifique-se de que `VITE_APP_URL` está configurada na Vercel
2. Faça um redeploy completo
3. Verifique nos logs de build se a variável foi injetada

---

## 📊 Checklist Final

Antes de considerar a configuração completa, verifique:

### Vercel:

- [ ] `VITE_APP_URL` configurada com URL da Vercel
- [ ] Redeploy feito após adicionar a variável
- [ ] Build completado com sucesso

### Supabase:

- [ ] **Site URL** configurado com URL da Vercel
- [ ] **Redirect URLs** incluem URL da Vercel com `/**`
- [ ] Google OAuth Provider está **Enabled**
- [ ] **Client ID** e **Client Secret** configurados

### Google Cloud Console:

- [ ] **Authorized redirect URIs** incluem URI do Supabase
- [ ] URI corresponde exatamente à fornecida pelo Supabase

### Teste:

- [ ] Cache do navegador limpo
- [ ] Login funciona em desenvolvimento
- [ ] Login funciona em produção (Vercel)
- [ ] Callback redireciona para Vercel (não localhost)

---

## 🎯 Resumo da Solução

O problema ocorria porque:

1. ❌ **Antes**: O código usava `window.location.origin` diretamente
   - Em produção, isso funcionaria, mas o Supabase não estava configurado
   - As Redirect URLs do Supabase não incluíam a URL da Vercel
   - A variável de ambiente não estava definida

2. ✅ **Depois**: Implementamos variável de ambiente `VITE_APP_URL`
   - Código atualizado para usar `APP_CONFIG.appUrl`
   - Fallback para `window.location.origin` se variável não estiver definida
   - Documentação atualizada para configurar Supabase corretamente
   - Guia completo de configuração criado

---

## 📚 Arquivos Modificados

Os seguintes arquivos foram atualizados para suportar a nova configuração:

1. **`web/src/utils/constants.ts`**
   - Adicionado `appUrl` ao `APP_CONFIG`
   - Usa `VITE_APP_URL` com fallback

2. **`web/src/hooks/useAuth.ts`**
   - Importa `APP_CONFIG`
   - Usa `APP_CONFIG.appUrl` no `signInWithGoogle`
   - Adicionado log para debug

3. **`web/src/components/Auth/LoginForm.tsx`**
   - Removido `window.location.origin` explícito
   - Deixa o hook gerenciar o redirectTo

4. **`web/src/components/Auth/SignUpForm.tsx`**
   - Removido `window.location.origin` explícito
   - Deixa o hook gerenciar o redirectTo

5. **`web/ENV_TEMPLATE.txt`**
   - Adicionada documentação de `VITE_APP_URL`

6. **`VERCEL_CHECKLIST.md`**
   - Atualizado para incluir `VITE_APP_URL`
   - Adicionado aviso sobre importância da variável

---

## 🚀 Próximos Passos

Após seguir este guia:

1. Configure a variável `VITE_APP_URL` na Vercel
2. Configure as URLs no Supabase
3. Faça um redeploy
4. Teste o login com Google em produção

O OAuth agora deve funcionar perfeitamente tanto em desenvolvimento quanto em produção! 🎉

---

**Documentação criada em**: 20/11/2025
**Última atualização**: 20/11/2025
