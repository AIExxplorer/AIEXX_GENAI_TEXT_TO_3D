# 🎯 Configuração de VITE_APP_URL - Valor Exato

## 📋 Informações do Projeto

**Repositório GitHub:** `AIExxplorer/AIEXX_GENAI_TEXT_TO_3D`

**URL Provável da Vercel:** `https://aiexx-genai-text-to-3d-web.vercel.app`

---

## 🔥 VITE_APP_URL - Valores para Configurar

### Production (Obrigatório)

```env
Name: VITE_APP_URL
Value: https://aiexx-genai-text-to-3d-web.vercel.app
Environment: Production
```

### Preview (Recomendado)

```env
Name: VITE_APP_URL
Value: https://aiexx-genai-text-to-3d-web-git-master.vercel.app
Environment: Preview
```

### Development (Opcional)

```env
Name: VITE_APP_URL
Value: http://localhost:5173
Environment: Development
```

---

## 🚀 Como Adicionar na Vercel

### Passo 1: Acessar Environment Variables

1. Acesse: https://vercel.com/dashboard
2. Selecione o projeto: **aiexx-genai-text-to-3d-web** (ou similar)
3. Clique em **Settings**
4. Clique em **Environment Variables**

### Passo 2: Adicionar VITE_APP_URL

1. Clique em **Add New**
2. Preencha os campos:

   ```
   Name: VITE_APP_URL
   Value: https://aiexx-genai-text-to-3d-web.vercel.app
   ```

3. Selecione os ambientes:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

4. Clique em **Save**

### Passo 3: Confirmar URL Correta

**⚠️ IMPORTANTE:** Verifique se a URL está correta!

1. No dashboard da Vercel, vá em **Settings** > **Domains**
2. A primeira URL listada é sua URL principal
3. Se for diferente de `aiexx-genai-text-to-3d-web.vercel.app`, use a URL correta

**Possíveis variações:**

- `https://aiexx-genai-text-to-3d-web.vercel.app`
- `https://aiexx-genai-text-to-3d.vercel.app`
- `https://aiexx-3d.vercel.app`
- Ou seu domínio customizado se tiver configurado

### Passo 4: Redeploy

Após adicionar a variável:

1. Vá em **Deployments**
2. Clique no último deployment (commit `69355ee` ou `1984498`)
3. Clique nos três pontos `...`
4. Selecione **Redeploy**
5. **NÃO** marque "Use existing Build Cache"
6. Clique em **Redeploy**

---

## 🌐 Configuração do Supabase

Após configurar na Vercel, configure no Supabase usando a **MESMA URL**.

### 1. Site URL

Acesse: https://app.supabase.com > Seu Projeto > Authentication > URL Configuration

```
Site URL: https://aiexx-genai-text-to-3d-web.vercel.app
```

### 2. Redirect URLs

Adicione estas URLs (com `/**` no final):

```
http://localhost:5173
http://localhost:5173/**
http://localhost:3000
http://localhost:3000/**
https://aiexx-genai-text-to-3d-web.vercel.app
https://aiexx-genai-text-to-3d-web.vercel.app/**
```

**⚠️ IMPORTANTE:**

- Use a **mesma URL** que configurou na Vercel
- Adicione com `/**` no final para permitir callbacks em qualquer rota
- Clique em **Save** e aguarde 1-2 minutos

### 3. Verificar Google OAuth

Acesse: Authentication > Providers > Google

Confirme:

- ✅ Enabled
- ✅ Client ID configurado
- ✅ Client Secret configurado

---

## 🔍 Como Verificar se a URL está Correta

### Método 1: Via Dashboard da Vercel

1. Acesse: https://vercel.com/dashboard
2. Selecione seu projeto
3. Vá em **Settings** > **Domains**
4. A primeira URL é sua URL principal de produção

### Método 2: Via Deployments

1. Vá em **Deployments**
2. Clique no último deployment com status ✅ Ready
3. A URL aparece no topo da página

### Método 3: Via CLI (se fizer login)

```bash
vercel login
vercel ls
```

A URL do projeto aparecerá na listagem.

---

## 🧪 Teste Rápido

Após configurar tudo:

1. **Limpe o cache do navegador:**
   - DevTools (F12) > Application > Clear site data

2. **Acesse sua aplicação:**
   - https://aiexx-genai-text-to-3d-web.vercel.app

3. **Abra o Console:**
   - DevTools (F12) > Console

4. **Clique em "Continuar com Google"**

5. **Verifique a mensagem no console:**

   ```
   [useAuth] Iniciando OAuth com Google: {
     redirectUrl: 'https://aiexx-genai-text-to-3d-web.vercel.app'
   }
   ```

6. **Resultado esperado:**
   - ✅ Redirecionado para Google
   - ✅ Após login, retorna para Vercel (NÃO localhost)
   - ✅ Usuário autenticado com sucesso

---

## 📊 Resumo da Configuração

| Local        | Campo                      | Valor                                                      |
| ------------ | -------------------------- | ---------------------------------------------------------- |
| **Vercel**   | VITE_APP_URL (Production)  | `https://aiexx-genai-text-to-3d-web.vercel.app`            |
| **Vercel**   | VITE_APP_URL (Preview)     | `https://aiexx-genai-text-to-3d-web-git-master.vercel.app` |
| **Vercel**   | VITE_APP_URL (Development) | `http://localhost:5173`                                    |
| **Supabase** | Site URL                   | `https://aiexx-genai-text-to-3d-web.vercel.app`            |
| **Supabase** | Redirect URLs              | `https://aiexx-genai-text-to-3d-web.vercel.app/**`         |

---

## ⚠️ Notas Importantes

1. **URL Exata:**
   - Use a URL **exata** do seu projeto Vercel
   - Incluindo `https://`
   - SEM barra `/` no final
   - Se você tiver um domínio customizado, use esse domínio

2. **Mesma URL em Todos os Lugares:**
   - Vercel: `VITE_APP_URL`
   - Supabase: `Site URL`
   - Supabase: `Redirect URLs` (com `/**`)

3. **Redeploy é Obrigatório:**
   - Adicionar variável não afeta deployments anteriores
   - Sempre faça redeploy após adicionar/modificar variáveis

4. **Aguardar Propagação:**
   - Após configurar no Supabase, aguarde 1-2 minutos
   - Limpe cache do navegador antes de testar

---

## 🐛 Troubleshooting

### Se ainda redirecionar para localhost

**Possíveis causas:**

1. URL incorreta (diferente da URL real do projeto)
2. Redeploy não foi feito
3. Cache do navegador

**Solução:**

1. Confirme a URL em Settings > Domains na Vercel
2. Faça um novo Redeploy
3. Limpe cache completamente
4. Teste em janela anônima

### Se der erro "redirect_uri_mismatch"

**Causa:** URL não autorizada no Supabase

**Solução:**

1. Verifique Redirect URLs no Supabase
2. Certifique-se de ter adicionado com `/**`
3. Use a mesma URL de `VITE_APP_URL`

---

## ✅ Checklist Final

- [ ] `VITE_APP_URL` adicionada na Vercel com valor correto
- [ ] Ambientes selecionados: Production, Preview, Development
- [ ] Redeploy realizado (sem cache)
- [ ] Build completado com sucesso (✅ Ready)
- [ ] Site URL configurada no Supabase
- [ ] Redirect URLs configuradas no Supabase (com `/**`)
- [ ] Cache do navegador limpo
- [ ] Teste realizado em produção
- [ ] Console mostra URL correta
- [ ] Login com Google funciona
- [ ] Callback redireciona para Vercel (não localhost)

---

## 🎯 Valor Final Recomendado

Com base na análise do projeto, o valor recomendado é:

```env
VITE_APP_URL=https://aiexx-genai-text-to-3d-web.vercel.app
```

**Mas sempre confirme a URL real no dashboard da Vercel antes de configurar!**

---

**Última atualização:** 20/11/2025
**Baseado em:** Análise do repositório e documentação existente
