# ⚡ Configuração Rápida do Vercel - Deploy do Frontend

## 🎯 Configurações Essenciais no Dashboard da Vercel

### Opção 1: Configurar Root Directory (RECOMENDADO)

1. **Settings** > **General** > **Build & Development Settings**
2. **Root Directory**: Clique em **Edit** e digite: `web`
3. **Build Command**: `npm install && npm run build`
4. **Output Directory**: `dist`
5. **Install Command**: `npm install`

### Opção 2: Usar vercel.json da Raiz (ALTERNATIVA)

Se não configurar Root Directory, o `vercel.json` na raiz já está configurado:
- Build Command: `cd web && npm install && npm run build`
- Output Directory: `web/dist`
- Install Command: `cd web && npm install`

**Deixe Root Directory em branco.**

## 🔑 Variáveis de Ambiente Obrigatórias

**Settings** > **Environment Variables** > Adicione:

```
VITE_SUPABASE_URL=https://grpxuporwqdyckkyhlcx.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_anon_aqui
VITE_API_URL=https://sua-api.com
```

**Aplicar para:** Production, Preview, Development

## 🌿 Branch de Produção

**Settings** > **Git** > **Production Branch**: `master`

## 🚀 Fazer Deploy

1. Vá em **Deployments**
2. Clique em **Redeploy** no último deployment
3. Ou faça um novo commit na branch `master`

## ✅ Verificação Rápida

- [ ] Root Directory: `web` (ou vazio se usar vercel.json da raiz)
- [ ] Build Command configurado corretamente
- [ ] Output Directory: `dist` (ou `web/dist`)
- [ ] Variáveis de ambiente adicionadas
- [ ] Production Branch: `master`
- [ ] Deploy realizado

## 🐛 Problema: "No Production Deployment"

**Solução:**
1. Certifique-se de que o deploy está sendo feito da branch `master`
2. Configure Production Branch como `master` em Settings > Git
3. Faça um novo deploy

