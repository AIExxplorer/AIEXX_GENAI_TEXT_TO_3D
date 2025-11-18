# 🚨 CONFIGURAÇÃO CRÍTICA - Root Directory na Vercel

## ⚠️ ATENÇÃO: Configure o Root Directory ANTES de fazer deploy!

### 📍 Problema Comum

A Vercel pode tentar fazer o build a partir da raiz do projeto em vez do subdiretório `web`, causando erros como:

- ❌ `tsc: command not found`
- ❌ `Could not find a valid build target`
- ❌ Build failures

### ✅ Solução: Configurar Root Directory

**PASSO A PASSO:**

1. **Acesse o projeto na Vercel Dashboard**
   - https://vercel.com/dashboard

2. **Vá em Settings**
   - Clique no projeto
   - Vá na aba "Settings"

3. **Configure o Root Directory**
   - No menu lateral, clique em "General"
   - Encontre a seção "Root Directory"
   - Clique em "Edit"
   - Digite: `web`
   - Clique em "Save"

4. **Faça um novo deploy**
   - Vá em "Deployments"
   - Clique em "..." no último deployment
   - Clique em "Redeploy"

---

## 🔧 Alternativas Implementadas

Para garantir compatibilidade mesmo sem configurar o Root Directory:

### 1. ✅ Arquivo `.vercelignore` criado
Ignora tudo exceto o diretório `web`, forçando a Vercel a usar apenas os arquivos do front-end.

### 2. ✅ Build script da raiz modificado
O script `build` na raiz agora apenas mostra uma mensagem indicando que deve usar `web:build`.

### 3. ✅ `vercel.json` atualizado
Comandos simplificados assumindo que o Root Directory está configurado como `web`.

---

## 📋 Configuração Correta na Vercel

### General Settings

**Root Directory:**
```
web
```

**Framework Preset:**
```
Vite
```

**Node.js Version:**
```
20.x
```

### Build & Development Settings

Serão automaticamente detectados do `web/package.json` e `web/vercel.json`:

- **Build Command:** `npm run build` (executado em `web/`)
- **Output Directory:** `dist` (relativo a `web/`)
- **Install Command:** `npm install` (executado em `web/`)
- **Development Command:** `npm run dev`

### Environment Variables

```bash
VITE_SUPABASE_URL=https://grpxuporwqdyckkyhlcx.supabase.co
VITE_SUPABASE_ANON_KEY=<sua_chave_anon>
VITE_API_URL=<url_da_api>
VITE_APP_NAME=AIEXX 3D
VITE_APP_VERSION=1.0.0
```

---

## 🎯 Verificação

### ✅ Checklist antes do deploy:

- [ ] Root Directory configurado como `web` na Vercel
- [ ] Framework Preset configurado como `Vite`
- [ ] Node.js Version configurado como `20.x`
- [ ] Variáveis de ambiente adicionadas
- [ ] `.vercelignore` presente na raiz do projeto

### 🧪 Teste local:

```bash
cd web
npm install
npm run build
```

Se funcionar localmente, funcionará na Vercel (com Root Directory configurado).

---

## 🆘 Troubleshooting

### Erro: "tsc: command not found"
**Causa:** Root Directory não configurado ou configurado incorretamente  
**Solução:** Configure Root Directory como `web` na Vercel

### Erro: "Could not find a valid build target"
**Causa:** Vercel não encontrou os arquivos do projeto no Root Directory  
**Solução:** Verifique se o Root Directory está como `web` (sem barra final)

### Erro: "ENOENT: no such file or directory"
**Causa:** Vercel tentando acessar arquivos fora do Root Directory  
**Solução:** Confirme que o Root Directory está configurado corretamente

---

## 📊 Estrutura do Projeto

```
projeto/
├── package.json          ← Raiz (backend/scripts)
├── vercel.json          ← Configuração Vercel
├── .vercelignore        ← Ignora raiz, usa apenas /web
├── web/                 ← ROOT DIRECTORY PARA VERCEL ⭐
│   ├── package.json     ← Front-end (build: vite build)
│   ├── vite.config.ts
│   ├── src/
│   └── dist/           ← Output do build
└── viewer3d/           ← Outro subprojeto
```

---

## 🚀 Comandos Úteis

### Deploy manual via CLI:
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --cwd web
```

### Build local de teste:
```bash
cd web
npm install
npm run build
npm run preview
```

---

## 📝 Notas Importantes

1. **Sempre configure o Root Directory como `web`** antes de fazer o primeiro deploy
2. O arquivo `vercel.json` na raiz **não substitui** a configuração do Root Directory
3. Se você já fez deploys com erro, faça um **Redeploy** após configurar o Root Directory
4. O `.vercelignore` é uma camada extra de proteção, mas **não substitui** o Root Directory

---

**Última atualização:** 18/11/2025
**Status:** ✅ Configurações aplicadas e testadas

