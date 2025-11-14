# ⚡ Quick Start: Environment Variables

## ✅ O que você já tem

- ✅ `NODE_ENV` configurada no Vercel
- ✅ Projeto vinculado: `aiexx-genai-text-to-3d`

## 🎯 Variáveis Essenciais para Adicionar AGORA no Vercel

### 1. VITE_API_URL (OBRIGATÓRIA)

Esta é a variável mais importante! Sem ela, o frontend não conseguirá se comunicar com o backend.

**No Vercel:**
- Clique em **"Add Another"** (ou similar)
- **Key**: `VITE_API_URL`
- **Value**: 
  - Se você já tem a API em produção: `https://api.aiexx.com`
  - Se ainda está desenvolvendo: `http://localhost:8000`
  - Ou a URL do seu backend quando estiver pronto

**Por que é obrigatória?**
- O frontend precisa saber onde está a API backend
- Sem isso, as requisições falharão

### 2. VITE_APP_NAME (Opcional mas Recomendada)

- **Key**: `VITE_APP_NAME`
- **Value**: `AIEXX_GENAI_TEXT_TO_3D`

## 📋 Checklist Rápido

### No Vercel (Adicionar Agora):

- [ ] `VITE_API_URL` - URL da API backend ⚠️ **OBRIGATÓRIA**
- [x] `NODE_ENV` - Já adicionada ✅
- [ ] `VITE_APP_NAME` - Nome da aplicação (opcional)

### No Vercel (Adicionar Depois - Quando Necessário):

- [ ] `VITE_HUGGINGFACE_API_KEY` - Apenas se precisar usar Hugging Face diretamente no frontend
- [ ] `VITE_APP_VERSION` - Versão da aplicação

## 🔵 Configuração no GitHub (Opcional)

Você só precisa configurar GitHub Secrets se:
- ✅ Quiser fazer deploy automático via GitHub Actions
- ✅ Quiser usar workflows que precisam de tokens do Vercel
- ✅ Quiser automatizar releases

### Se NÃO vai usar GitHub Actions para deploy:

**Você NÃO precisa configurar nada no GitHub!** O Vercel já está conectado ao seu repositório e fará deploy automaticamente.

### Se VAI usar GitHub Actions:

Veja a seção abaixo sobre GitHub Secrets.

---

## 🔧 Como Adicionar no Vercel (Passo a Passo)

1. Na mesma tela onde você adicionou `NODE_ENV`
2. Clique em **"Add Another"** (botão com ícone +)
3. Preencha:
   - **Key**: `VITE_API_URL`
   - **Value**: `http://localhost:8000` (por enquanto, atualize depois)
4. Selecione **Environments**: Production and Preview
5. O projeto já está vinculado, então não precisa vincular novamente
6. Clique em **"Save"**

Repita para `VITE_APP_NAME` se quiser.

---

## 📚 Próximos Passos

1. ✅ Adicionar `VITE_API_URL` no Vercel
2. ✅ Fazer um novo deploy (ou aguardar o próximo automático)
3. ✅ Testar se a aplicação está funcionando
4. ⚪ Configurar GitHub Secrets (apenas se necessário)

---

**💡 Dica**: Comece apenas com `VITE_API_URL` e `NODE_ENV`. Adicione outras variáveis conforme a necessidade surgir.

