#!/bin/bash

# Script de configuração do ambiente de desenvolvimento
# AIEXX_GENAI_TEXT_TO_3D

set -e

echo "🚀 Configurando ambiente de desenvolvimento..."

# Verificar Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 não encontrado. Por favor, instale Python 3.8 ou superior."
    exit 1
fi

PYTHON_VERSION=$(python3 --version | cut -d' ' -f2 | cut -d'.' -f1,2)
echo "✅ Python $PYTHON_VERSION encontrado"

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale Node.js 18 ou superior."
    exit 1
fi

NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
echo "✅ Node.js v$NODE_VERSION encontrado"

# Criar ambiente virtual Python
echo "📦 Criando ambiente virtual Python..."
python3 -m venv venv

# Ativar ambiente virtual
echo "🔧 Ativando ambiente virtual..."
source venv/bin/activate

# Instalar dependências Python
echo "📥 Instalando dependências Python..."
pip install --upgrade pip
pip install -r requirements.txt
pip install -r requirements-dev.txt

# Instalar dependências Node.js
echo "📥 Instalando dependências Node.js..."
npm install

# Configurar Husky
echo "🐕 Configurando Husky..."
npm run prepare

# Copiar .env.example para .env se não existir
if [ ! -f .env ]; then
    echo "📝 Criando arquivo .env a partir de .env.example..."
    cp .env.example .env
    echo "⚠️  IMPORTANTE: Configure suas credenciais no arquivo .env"
fi

# Criar diretórios necessários
echo "📁 Criando diretórios necessários..."
mkdir -p logs
mkdir -p uploads
mkdir -p projects

echo "✅ Ambiente de desenvolvimento configurado com sucesso!"
echo ""
echo "Para ativar o ambiente virtual Python:"
echo "  source venv/bin/activate  # Linux/Mac"
echo "  venv\\Scripts\\activate     # Windows"
echo ""
echo "Para iniciar o servidor de desenvolvimento:"
echo "  npm run dev"

