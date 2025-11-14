# Script PowerShell para iniciar a API em desenvolvimento

Write-Host "🚀 Iniciando AIEXX GENAI TEXT_TO_3D API..." -ForegroundColor Cyan

# Verificar se o ambiente virtual está ativado
if (-not $env:VIRTUAL_ENV) {
    Write-Host "⚠️  Ambiente virtual não detectado. Ativando..." -ForegroundColor Yellow
    if (Test-Path "venv") {
        & "venv\Scripts\Activate.ps1"
    } else {
        Write-Host "❌ Ambiente virtual não encontrado. Execute: python -m venv venv" -ForegroundColor Red
        exit 1
    }
}

# Verificar dependências
Write-Host "📦 Verificando dependências..." -ForegroundColor Cyan
pip install -q -r requirements.txt

# Iniciar servidor
Write-Host "🌐 Iniciando servidor em http://localhost:8000" -ForegroundColor Green
Write-Host "📚 Swagger UI: http://localhost:8000/docs" -ForegroundColor Green
Write-Host "📖 ReDoc: http://localhost:8000/redoc" -ForegroundColor Green
Write-Host ""

uvicorn src.api.main:app --reload --host 0.0.0.0 --port 8000

