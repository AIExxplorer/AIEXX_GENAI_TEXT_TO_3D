#!/bin/bash
# Script para iniciar a API em desenvolvimento

echo "🚀 Iniciando AIEXX GENAI TEXT_TO_3D API..."

# Verificar se o ambiente virtual está ativado
if [ -z "$VIRTUAL_ENV" ]; then
    echo "⚠️  Ambiente virtual não detectado. Ativando..."
    if [ -d "venv" ]; then
        source venv/bin/activate
    else
        echo "❌ Ambiente virtual não encontrado. Execute: python -m venv venv"
        exit 1
    fi
fi

# Verificar dependências
echo "📦 Verificando dependências..."
pip install -q -r requirements.txt

# Iniciar servidor
echo "🌐 Iniciando servidor em http://localhost:8000"
echo "📚 Swagger UI: http://localhost:8000/docs"
echo "📖 ReDoc: http://localhost:8000/redoc"
echo ""

uvicorn src.api.main:app --reload --host 0.0.0.0 --port 8000

