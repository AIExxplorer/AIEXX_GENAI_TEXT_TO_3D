# 🛠️ Scripts de Configuração

Scripts utilitários para facilitar a configuração do projeto.

## 📋 Scripts Disponíveis

### configure-vercel-env (PowerShell/Bash)

Configura automaticamente a variável `VITE_APP_URL` na Vercel.

**Uso:**

```powershell
# Windows (PowerShell)
.\scripts\configure-vercel-env.ps1
```

```bash
# Linux/Mac (Bash)
chmod +x scripts/configure-vercel-env.sh
./scripts/configure-vercel-env.sh
```

**Pré-requisitos:**

- Vercel CLI instalada
- Autenticado na Vercel (`vercel login`)

**O que o script faz:**

1. Verifica autenticação na Vercel
2. Detecta a URL do projeto automaticamente
3. Permite confirmar ou alterar a URL
4. Adiciona `VITE_APP_URL` para todos os ambientes (Production, Preview, Development)
5. Fornece instruções para os próximos passos

**Valores configurados:**

- Production: URL do projeto Vercel (ex: `https://aiexx-genai-text-to-3d-web.vercel.app`)
- Preview: Mesma URL da Production
- Development: `http://localhost:5173`

---

## 🚀 Fluxo Recomendado

### 1. Autenticar na Vercel

```bash
vercel login
```

### 2. Executar script de configuração

```powershell
# Windows
.\scripts\configure-vercel-env.ps1

# Linux/Mac
./scripts/configure-vercel-env.sh
```

### 3. Fazer redeploy

```bash
vercel --prod
```

### 4. Configurar Supabase

Acesse: https://app.supabase.com > Seu Projeto > Authentication > URL Configuration

**Site URL:**

```
https://aiexx-genai-text-to-3d-web.vercel.app
```

**Redirect URLs:**

```
http://localhost:5173
http://localhost:5173/**
https://aiexx-genai-text-to-3d-web.vercel.app
https://aiexx-genai-text-to-3d-web.vercel.app/**
```

### 5. Testar OAuth

1. Limpe cache do navegador
2. Acesse: https://aiexx-genai-text-to-3d-web.vercel.app
3. Clique em "Continuar com Google"
4. Verifique se redireciona corretamente

---

## 📖 Documentação Relacionada

- `VERCEL_APP_URL_CONFIG.md` - Guia completo de configuração manual
- `SUPABASE_OAUTH_CONFIG.md` - Configuração do OAuth no Supabase
- `VERCEL_REQUIRED_ACTIONS.md` - Ações obrigatórias passo a passo

---

## 🐛 Troubleshooting

### "Error: No existing credentials found"

**Causa:** Não está autenticado na Vercel CLI

**Solução:**

```bash
vercel login
```

### "Variável pode já existir"

**Causa:** A variável já foi adicionada anteriormente

**Solução:** Isso é esperado. Você pode:

1. Ignorar a mensagem (a variável já existe)
2. Remover a variável existente e adicionar novamente:
   ```bash
   vercel env rm VITE_APP_URL production
   vercel env add VITE_APP_URL production
   ```

### Script não executa no Windows

**Causa:** Política de execução do PowerShell

**Solução:**

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 💡 Alternativa Manual

Se preferir configurar manualmente sem usar o script:

1. Acesse: https://vercel.com/dashboard
2. Selecione seu projeto
3. Vá em Settings > Environment Variables
4. Adicione:
   ```
   Name: VITE_APP_URL
   Value: https://seu-projeto.vercel.app
   Environment: Production, Preview, Development
   ```
5. Faça redeploy

Consulte `VERCEL_APP_URL_CONFIG.md` para instruções detalhadas.

---

**Última atualização:** 20/11/2025
