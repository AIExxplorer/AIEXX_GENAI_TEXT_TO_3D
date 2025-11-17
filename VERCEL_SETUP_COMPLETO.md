# 🚀 Guia Completo de Deploy na Vercel

## ⚠️ Configuração Importante

O projeto frontend está na pasta `web/`, então é necessário configurar o **Root Directory** na Vercel.

## 📋 Passo a Passo para Configurar na Vercel

### 1. Acessar Configurações do Projeto

1. No dashboard da Vercel, vá em **Settings** do projeto `aiexx-genai-text-to-3d`
2. Clique em **General**
3. Role até a seção **Build & Development Settings**

### 2. Configurar Root Directory

**⚠️ CRÍTICO:** Configure o Root Directory como `web`

1. Na seção **Root Directory**, clique em **Edit**
2. Digite: `web`
3. Clique em **Save**

### 3. Configurar Build Settings

Com o Root Directory configurado como `web`, as configurações serão:

**Framework Preset:**
```
Other
```

**Build Command:**
```
npm install && npm run build
```

**Output Directory:**
```
dist
```

**Install Command:**
```
npm install
```

**Development Command:**
```
npm run dev
```

### 4. Configurar Variáveis de Ambiente

Vá em **Settings** > **Environment Variables** e adicione:

#### Obrigatórias (Production, Preview, Development):
```
VITE_SUPABASE_URL=https://grpxuporwqdyckkyhlcx.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_anon_aqui
VITE_API_URL=https://sua-api.com
```

#### Opcionais:
```
VITE_APP_NAME=AIEXX 3D
VITE_APP_VERSION=1.0.0
```

### 5. Configurar Production Branch

1. Vá em **Settings** > **Git**
2. **Production Branch**: Selecione `master`
3. Salve as alterações

### 6. Fazer Deploy

Após configurar tudo:

1. Vá em **Deployments**
2. Clique em **Redeploy** no último deployment (se houver)
3. Ou faça um novo commit na branch `master` para trigger automático

## 🔧 Configuração Alternativa: Usar vercel.json na Raiz

Se preferir usar o `vercel.json` da raiz (sem configurar Root Directory):

O arquivo `vercel.json` na raiz já está configurado com:
- Build command: `cd web && npm install && npm run build`
- Output directory: `web/dist`
- Install command: `cd web && npm install`

**Neste caso, deixe o Root Directory em branco.**

## ✅ Checklist de Configuração

- [ ] Root Directory configurado como `web` (ou deixar em branco se usar vercel.json da raiz)
- [ ] Build Command: `npm install && npm run build` (ou `cd web && npm install && npm run build` se root em branco)
- [ ] Output Directory: `dist` (ou `web/dist` se root em branco)
- [ ] Variáveis de ambiente configuradas
- [ ] Production Branch: `master`
- [ ] Deploy realizado com sucesso

## 🐛 Troubleshooting

### Erro: "No Production Deployment"

**Causa:** O deploy não foi feito na branch de produção (`master`)

**Solução:**
1. Certifique-se de que está fazendo deploy da branch `master`
2. Vá em **Settings** > **Git** e configure Production Branch como `master`
3. Faça um novo deploy

### Erro: Build falha

**Verifique:**
1. Root Directory está correto (`web` ou vazio)
2. Build Command está correto
3. Output Directory está correto
4. Variáveis de ambiente estão configuradas

### Erro: Página em branco

**Causa:** Output Directory incorreto ou rewrites não configurados

**Solução:**
1. Verifique se o Output Directory é `dist` (com root `web`) ou `web/dist` (sem root)
2. Certifique-se de que o `vercel.json` tem os rewrites configurados

## 📝 Notas Importantes

- O projeto está na branch `master` e está sincronizado com `develop`
- O script de build foi corrigido (sem `tsc` no comando)
- Todas as dependências estão no `package.json`
- O `vercel.json` na raiz já está configurado corretamente

## 🔗 Links Úteis

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Vercel Documentation](https://vercel.com/docs)
- [Project Settings](https://vercel.com/docs/concepts/projects/overview#project-settings)

