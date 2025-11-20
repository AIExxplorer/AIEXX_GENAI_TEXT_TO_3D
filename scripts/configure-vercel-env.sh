#!/bin/bash

# Script para configurar VITE_APP_URL na Vercel
# Uso: ./scripts/configure-vercel-env.sh

set -e

echo "🔧 Configurador de VITE_APP_URL para Vercel"
echo "============================================"
echo ""

# Verificar se está logado na Vercel
if ! vercel whoami &> /dev/null; then
    echo "❌ Você não está logado na Vercel CLI"
    echo ""
    echo "Por favor, faça login primeiro:"
    echo "  vercel login"
    echo ""
    exit 1
fi

echo "✅ Autenticado na Vercel como: $(vercel whoami)"
echo ""

# URL padrão baseada na análise do projeto
DEFAULT_URL="https://aiexx-genai-text-to-3d-web.vercel.app"

echo "📋 URL padrão detectada: $DEFAULT_URL"
echo ""
echo "Esta URL foi detectada com base na documentação do projeto."
echo "Você pode confirmar a URL correta em: https://vercel.com/dashboard"
echo ""

read -p "A URL acima está correta? (s/n): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Ss]$ ]]; then
    echo ""
    echo "Por favor, informe a URL correta da sua aplicação na Vercel:"
    echo "(Exemplo: https://seu-projeto.vercel.app)"
    read -p "URL: " CUSTOM_URL

    if [[ -z "$CUSTOM_URL" ]]; then
        echo "❌ URL não pode estar vazia"
        exit 1
    fi

    APP_URL="$CUSTOM_URL"
else
    APP_URL="$DEFAULT_URL"
fi

echo ""
echo "🔥 Configurando VITE_APP_URL com o valor: $APP_URL"
echo ""

# Adicionar variável para Production
echo "➤ Adicionando para Production..."
if echo "$APP_URL" | vercel env add VITE_APP_URL production; then
    echo "✅ Variável adicionada para Production"
else
    echo "⚠️  Variável pode já existir em Production"
fi

echo ""

# Adicionar variável para Preview
echo "➤ Adicionando para Preview..."
if echo "$APP_URL" | vercel env add VITE_APP_URL preview; then
    echo "✅ Variável adicionada para Preview"
else
    echo "⚠️  Variável pode já existir em Preview"
fi

echo ""

# Adicionar variável para Development
DEV_URL="http://localhost:5173"
echo "➤ Adicionando para Development (usando $DEV_URL)..."
if echo "$DEV_URL" | vercel env add VITE_APP_URL development; then
    echo "✅ Variável adicionada para Development"
else
    echo "⚠️  Variável pode já existir em Development"
fi

echo ""
echo "============================================"
echo "✅ Configuração concluída!"
echo ""
echo "📋 Próximos passos:"
echo ""
echo "1. Faça um redeploy do projeto:"
echo "   vercel --prod"
echo ""
echo "2. Configure o Supabase com a mesma URL:"
echo "   - Site URL: $APP_URL"
echo "   - Redirect URLs: $APP_URL/**"
echo ""
echo "3. Teste o login com Google em produção"
echo ""
echo "📖 Para mais detalhes, consulte:"
echo "   - VERCEL_APP_URL_CONFIG.md"
echo "   - SUPABASE_OAUTH_CONFIG.md"
echo ""
