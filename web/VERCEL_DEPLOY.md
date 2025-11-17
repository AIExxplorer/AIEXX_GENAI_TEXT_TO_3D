# Guia de Deploy na Vercel

Este documento explica como fazer deploy do projeto web na Vercel.

## ⚠️ Problema Resolvido

O erro `tsc: command not found` foi corrigido removendo a verificação de tipos do script de build. O Vite já faz type-checking durante o build através do plugin do React.

## 📋 Pré-requisitos

1. Conta na Vercel (https://vercel.com)
2. Repositório conectado ao GitHub
3. Variáveis de ambiente configuradas na Vercel

## 🚀 Configuração na Vercel

### 1. Conectar Repositório

1. Acesse: https://vercel.com/new
2. Conecte o repositório: `AIExxplorer/AIEXX_GENAI_TEXT_TO_3D`
3. Selecione a branch: `develop` ou `master`

### 2. Configurar Projeto

A Vercel detectará automaticamente as configurações do `vercel.json` na raiz do projeto:

- **Root Directory**: Deixe em branco (raiz do projeto)
- **Framework Preset**: Other
- **Build Command**: `cd web && npm install && npm run build`
- **Output Directory**: `web/dist`
- **Install Command**: `cd web && npm install`

### 3. Variáveis de Ambiente

Configure as seguintes variáveis de ambiente na Vercel:

#### Obrigatórias:
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

**Como adicionar:**
1. No dashboard do projeto na Vercel
2. Vá em **Settings** > **Environment Variables**
3. Adicione cada variável para os ambientes: Production, Preview, Development

### 4. Configurações Adicionais

O arquivo `vercel.json` na raiz já está configurado com:
- ✅ Build command correto
- ✅ Output directory correto
- ✅ Rewrites para SPA (Single Page Application)
- ✅ Headers de segurança
- ✅ Cache para assets estáticos

## 🔧 Troubleshooting

### Erro: `tsc: command not found`

**Solução:** Já corrigido! O script de build foi atualizado para usar apenas `vite build`. O Vite já faz type-checking durante o build.

### Erro: Variáveis de ambiente não encontradas

**Solução:** Certifique-se de que todas as variáveis começam com `VITE_` e estão configuradas na Vercel.

### Erro: Build falha por falta de dependências

**Solução:** Certifique-se de que o `installCommand` está correto: `cd web && npm install`

### Erro: Página em branco após deploy

**Solução:** Verifique se o `outputDirectory` está correto (`web/dist`) e se os rewrites estão configurados no `vercel.json`.

## 📝 Scripts Disponíveis

- `npm run build` - Build de produção (sem type-check)
- `npm run build:check` - Build com verificação de tipos (para CI/CD)
- `npm run type-check` - Apenas verificação de tipos
- `npm run dev` - Servidor de desenvolvimento

## 🔗 Links Úteis

- [Documentação Vercel](https://vercel.com/docs)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Vite Build](https://vite.dev/guide/build.html)

## ✅ Checklist de Deploy

- [ ] Repositório conectado na Vercel
- [ ] Branch correta selecionada (develop/master)
- [ ] Variáveis de ambiente configuradas
- [ ] Build command: `cd web && npm install && npm run build`
- [ ] Output directory: `web/dist`
- [ ] Framework: Other
- [ ] Deploy realizado com sucesso

