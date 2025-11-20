# 🚨 AÇÕES OBRIGATÓRIAS NA VERCEL

## ⚠️ Status Atual

Como não temos acesso direto à Vercel CLI (requer login), aqui está o que você DEVE fazer manualmente no dashboard da Vercel:

---

## 🔥 AÇÃO 1: Adicionar VITE_APP_URL (CRÍTICO)

### Por que é necessário?

O commit `1984498` corrigiu o código para usar a variável `VITE_APP_URL`, mas esta variável ainda não existe na Vercel.

### Como fazer:

1. **Acessar Vercel Dashboard**
   - URL: https://vercel.com/dashboard
   - Selecione seu projeto

2. **Ir para Environment Variables**
   - Clique em **Settings**
   - Clique em **Environment Variables**

3. **Adicionar VITE_APP_URL**

   **Para Production:**

   ```
   Name: VITE_APP_URL
   Value: https://seu-dominio-real.vercel.app
   Environment: Production
   ```

   **Para Preview:**

   ```
   Name: VITE_APP_URL
   Value: https://seu-dominio-git-master-seu-usuario.vercel.app
   Environment: Preview
   ```

   **Para Development:**

   ```
   Name: VITE_APP_URL
   Value: http://localhost:5173
   Environment: Development
   ```

4. **Como obter sua URL real da Vercel:**
   - Vá em **Settings** > **Domains**
   - Copie a URL principal (geralmente `[projeto].vercel.app`)
   - **IMPORTANTE:** Use a URL EXATA, incluindo `https://`
   - **NÃO** adicione `/` no final

5. **Salvar**
   - Clique em **Save**

---

## 🔄 AÇÃO 2: Redeploy (OBRIGATÓRIO)

### Por que é necessário?

As variáveis de ambiente são injetadas durante o build. Adicionar uma variável não afeta deployments anteriores.

### Como fazer:

1. **Ir para Deployments**
   - No dashboard, clique em **Deployments**

2. **Selecionar último deployment**
   - Clique no deployment mais recente (commit `1984498`)

3. **Redeploy**
   - Clique nos três pontos `...` no canto superior direito
   - Selecione **Redeploy**
   - **NÃO** marque "Use existing Build Cache"
   - Clique em **Redeploy**

4. **Aguardar Build**
   - O build levará 2-5 minutos
   - Aguarde até aparecer ✅ Ready

---

## 🔍 AÇÃO 3: Verificar Build Logs

### Por que é necessário?

Para confirmar que `VITE_APP_URL` foi injetada corretamente.

### Como fazer:

1. **Abrir Build Logs**
   - Clique no deployment que acabou de fazer
   - Clique em **Build Logs**

2. **Procurar por VITE_APP_URL**
   - Use Ctrl+F para buscar: `VITE_APP_URL`
   - Você deve ver algo como:

   ```
   VITE_APP_URL=https://seu-dominio.vercel.app
   ```

3. **Se NÃO aparecer:**
   - A variável não foi adicionada corretamente
   - Volte para a AÇÃO 1
   - Certifique-se de selecionar o ambiente correto

---

## 📋 AÇÃO 4: Verificar Outras Variáveis

### Variáveis que DEVEM estar configuradas:

Acesse: **Settings** > **Environment Variables**

| Variável                 | Status           | Ação Necessária          |
| ------------------------ | ---------------- | ------------------------ |
| `VITE_SUPABASE_URL`      | ⚠️ Verificar     | Se não existe, adicionar |
| `VITE_SUPABASE_ANON_KEY` | ⚠️ Verificar     | Se não existe, adicionar |
| `VITE_API_URL`           | ⚠️ Verificar     | Se não existe, adicionar |
| `VITE_APP_NAME`          | ⚠️ Verificar     | Se não existe, adicionar |
| `VITE_APP_VERSION`       | ⚠️ Verificar     | Se não existe, adicionar |
| `VITE_APP_URL`           | 🔥 **ADICIONAR** | **OBRIGATÓRIA**          |

### Se alguma variável estiver faltando:

```bash
# VITE_SUPABASE_URL
https://grpxuporwqdyckkyhlcx.supabase.co

# VITE_SUPABASE_ANON_KEY
[Obtenha em: Supabase > Settings > API > Project API keys > anon public]

# VITE_API_URL
[URL do seu backend - se ainda não tiver, use um placeholder]

# VITE_APP_NAME
AIEXX 3D

# VITE_APP_VERSION
1.0.0

# VITE_APP_URL
https://seu-dominio.vercel.app
```

---

## 🌐 AÇÃO 5: Configurar Supabase (CRÍTICO)

Após configurar a Vercel, você DEVE configurar o Supabase.

### 1. Site URL

Acesse: https://app.supabase.com > [Seu Projeto] > Authentication > URL Configuration

```
Site URL: https://seu-dominio-real.vercel.app
```

Use a MESMA URL que você configurou em `VITE_APP_URL`.

### 2. Redirect URLs

Na mesma página, adicione:

```
http://localhost:5173
http://localhost:5173/**
https://seu-dominio-real.vercel.app
https://seu-dominio-real.vercel.app/**
```

**IMPORTANTE:** Adicione com `/**` no final para permitir callbacks em qualquer rota.

### 3. Salvar

Clique em **Save** e aguarde 1-2 minutos para propagar.

---

## 🧪 AÇÃO 6: Testar OAuth

### 1. Limpar Cache

Antes de testar, abra DevTools (F12):

- Application > Storage > Clear site data
- Ou use Ctrl+Shift+Del > Clear browsing data

### 2. Testar em Produção

1. Acesse: `https://seu-dominio.vercel.app`
2. Abra DevTools (F12) > Console
3. Clique em "Continuar com Google"
4. Faça login com sua conta Google

### 3. Verificar Console

Procure por esta mensagem:

```
[useAuth] Iniciando OAuth com Google: { redirectUrl: 'https://seu-dominio.vercel.app' }
```

**✅ Se aparecer a URL da Vercel:** Configuração correta!
**❌ Se aparecer localhost:** Volte para AÇÃO 1 e 2.

### 4. Verificar Redirecionamento

Após autenticar no Google, você deve:

1. Ver a tela de consentimento do Google
2. Ser redirecionado de volta para `https://seu-dominio.vercel.app` (NÃO localhost)
3. Estar autenticado com sucesso
4. Ver seu avatar e nome na aplicação

---

## 🔧 Verificações Adicionais

### Build Command (Verificar se está correto)

Acesse: **Settings** > **General**

**Deve estar:**

- Framework Preset: **Vite** (ou Other)
- Build Command: `vite build` (ou deixe vazio para usar vercel.json)
- Output Directory: `dist`
- Install Command: `npm install`

### Root Directory (CRÍTICO)

**DEVE estar configurado como: `web`**

Se não estiver:

1. Vá em **Settings** > **General**
2. Procure por "Root Directory"
3. Clique em **Edit**
4. Digite: `web`
5. Clique em **Save**
6. Faça um novo deploy

### Node.js Version

Já está configurado no `vercel.json` como Node 20. ✅

---

## 📊 Checklist de Execução

Execute nesta ordem:

- [ ] 1. Adicionar `VITE_APP_URL` na Vercel (com URL real)
- [ ] 2. Verificar outras variáveis de ambiente
- [ ] 3. Fazer Redeploy (sem cache)
- [ ] 4. Aguardar build completar
- [ ] 5. Verificar logs de build
- [ ] 6. Confirmar variáveis injetadas
- [ ] 7. Configurar Site URL no Supabase
- [ ] 8. Configurar Redirect URLs no Supabase
- [ ] 9. Limpar cache do navegador
- [ ] 10. Testar login em produção
- [ ] 11. Verificar console do navegador
- [ ] 12. Confirmar redirecionamento correto

---

## 🎯 Resultado Esperado

Ao completar todas as ações acima:

✅ `VITE_APP_URL` configurada na Vercel
✅ Redeploy realizado com sucesso
✅ Variável injetada no build (visível nos logs)
✅ Supabase configurado corretamente
✅ OAuth redireciona para Vercel (não localhost)
✅ Login funciona em produção

---

## 🐛 Se algo der errado

### OAuth ainda redireciona para localhost

**Possíveis causas:**

1. `VITE_APP_URL` não foi adicionada
2. Redeploy não foi feito após adicionar a variável
3. Cache do navegador não foi limpo

**Solução:**

- Verifique se a variável existe em Settings > Environment Variables
- Faça um novo Redeploy
- Limpe o cache completamente
- Teste em janela anônima

### Build falha

**Verifique:**

- Logs de build para identificar o erro
- Se todas as variáveis obrigatórias estão configuradas
- Se Root Directory está como `web`

### Variável não aparece nos logs

**Causa:** Ambiente não selecionado ao adicionar a variável

**Solução:**

- Edite a variável `VITE_APP_URL`
- Certifique-se de selecionar Production, Preview, e Development
- Salve e faça novo Redeploy

---

## 📞 Comandos Úteis (Se fizer login na CLI)

```bash
# Login na Vercel
vercel login

# Ver variáveis de ambiente
vercel env ls

# Pull variáveis para arquivo local
vercel env pull

# Ver projeto atual
vercel project ls

# Trigger novo deploy
vercel --prod
```

---

## 🎉 Conclusão

Todas as mudanças de código já foram feitas e commitadas.

**Agora depende APENAS de você:**

1. Adicionar `VITE_APP_URL` na Vercel
2. Fazer Redeploy
3. Configurar Supabase

O código está 100% pronto! 🚀

---

**Commit relacionado:** `1984498` - fix(auth): corrigir callback do Google OAuth em produção
**Data:** 20/11/2025
