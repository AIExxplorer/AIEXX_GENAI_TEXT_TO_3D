# 🚀 Guia de Configuração do Vercel

Este guia contém todas as informações necessárias para configurar o deploy do frontend na Vercel.

## 📋 Informações do Projeto para Configuração no Vercel

### 1. **Project Name** (Nome do Projeto)
```
aiexx-genai-text-to-3d-web
```
ou
```
aiexx-text-to-3d
```

### 2. **Framework Preset**
```
Other
```
ou deixe em branco (Vercel detectará automaticamente)

### 3. **Root Directory**
```
web
```
⚠️ **IMPORTANTE**: Configure o Root Directory como `web` pois o projeto frontend está dentro desta pasta.

### 4. **Build Command**
```
npm install && npm run build
```
ou
```
cd web && npm install && npm run build
```

### 5. **Output Directory**
```
dist
```
ou
```
web/dist
```
(dependendo se você configurou o Root Directory)

### 6. **Install Command**
```
npm install
```
ou
```
cd web && npm install
```

### 7. **Development Command**
```
npm run dev
```
ou
```
cd web && npm run dev
```

## 🔧 Configurações Adicionais Recomendadas

### Environment Variables (Variáveis de Ambiente)

Configure as seguintes variáveis de ambiente no Vercel:

```env
# API Backend
VITE_API_URL=https://api.aiexx.com
# ou para desenvolvimento:
VITE_API_URL=http://localhost:8000

# Ambiente
NODE_ENV=production

# Outras variáveis específicas do seu projeto
```

### Build Settings

1. **Node.js Version**: `18.x` ou superior
2. **Package Manager**: `npm` (ou `yarn`/`pnpm` se preferir)
3. **Build Timeout**: 60 segundos (padrão)

### Git Configuration

- **Production Branch**: `master` ou `main`
- **Preview Branches**: Todas as branches (para previews automáticos)
- **Ignored Build Step**: Deixe vazio (ou configure se necessário)

## 📁 Estrutura de Arquivos

O projeto está organizado da seguinte forma:

```
Gaiola3D_Coded/
├── web/                    # ← Frontend (Root Directory no Vercel)
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   └── vercel.json        # Configuração específica do Vercel
├── viewer3d/             # Motor de visualização 3D (separado)
├── src/                   # Backend Python
└── vercel.json           # Configuração raiz (opcional)
```

## 🎯 Passo a Passo para Criar o Projeto no Vercel

### Opção 1: Via Dashboard Web

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em **"Add New..."** → **"Project"**
3. Conecte seu repositório GitHub: `AIExxplorer/AIEXX_GENAI_TEXT_TO_3D`
4. Configure o projeto:

   **Project Name:**
   ```
   aiexx-genai-text-to-3d-web
   ```

   **Framework Preset:**
   ```
   Other
   ```

   **Root Directory:**
   ```
   web
   ```
   ⚠️ Clique em "Edit" e configure como `web`

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

5. Adicione Environment Variables (se necessário)
6. Clique em **"Deploy"**

### Opção 2: Via Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (na raiz do projeto)
vercel

# Ou especificando o diretório
vercel --cwd web
```

## 📝 Arquivo vercel.json

Já criamos o arquivo `web/vercel.json` com as configurações necessárias. Ele contém:

- ✅ Build e output directories
- ✅ Regiões de deploy (iad1 - US East)
- ✅ Headers de segurança
- ✅ Cache para assets estáticos
- ✅ Rewrites para SPA (Single Page Application)

## 🔍 Verificações Pós-Deploy

Após o deploy, verifique:

1. ✅ Build completou com sucesso
2. ✅ Site está acessível
3. ✅ Assets estáticos estão sendo servidos corretamente
4. ✅ Rotas da SPA funcionam (teste navegação)
5. ✅ Variáveis de ambiente estão configuradas

## 🐛 Troubleshooting

### Erro: "Build Command Failed"

- Verifique se o `package.json` no diretório `web` tem o script `build`
- Verifique se todas as dependências estão no `package.json`
- Verifique logs de build no Vercel Dashboard

### Erro: "Output Directory Not Found"

- Verifique se o `outputDirectory` está correto (`dist`)
- Verifique se o build está gerando arquivos no diretório correto
- Verifique o `vite.config.ts` para garantir que o output está configurado

### Erro: "Root Directory Not Found"

- Certifique-se de que o Root Directory está configurado como `web`
- Verifique se a pasta `web` existe no repositório

## 📚 Recursos Adicionais

- [Documentação do Vercel](https://vercel.com/docs)
- [Vercel CLI](https://vercel.com/docs/cli)
- [Configuração de Projetos](https://vercel.com/docs/project-configuration)

## ✅ Checklist de Configuração

- [ ] Repositório conectado ao Vercel
- [ ] Root Directory configurado como `web`
- [ ] Build Command configurado
- [ ] Output Directory configurado como `dist`
- [ ] Environment Variables adicionadas (se necessário)
- [ ] Framework Preset configurado (ou deixado em branco)
- [ ] Deploy inicial realizado com sucesso
- [ ] Domínio customizado configurado (opcional)

---

**Nota**: O arquivo `web/vercel.json` já contém todas as configurações necessárias. O Vercel detectará automaticamente este arquivo e usará suas configurações.

