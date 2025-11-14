# Script de configuração do ambiente de desenvolvimento (PowerShell)
# AIEXX_GENAI_TEXT_TO_3D

Write-Host "🚀 Configurando ambiente de desenvolvimento..." -ForegroundColor Cyan

# Verificar Python
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✅ $pythonVersion encontrado" -ForegroundColor Green
} catch {
    Write-Host "❌ Python não encontrado. Por favor, instale Python 3.8 ou superior." -ForegroundColor Red
    exit 1
}

# Verificar Node.js
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js $nodeVersion encontrado" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js não encontrado. Por favor, instale Node.js 18 ou superior." -ForegroundColor Red
    exit 1
}

# Criar ambiente virtual Python
Write-Host "📦 Criando ambiente virtual Python..." -ForegroundColor Yellow
python -m venv venv

# Ativar ambiente virtual
Write-Host "🔧 Ativando ambiente virtual..." -ForegroundColor Yellow
& .\venv\Scripts\Activate.ps1

# Instalar dependências Python
Write-Host "📥 Instalando dependências Python..." -ForegroundColor Yellow
python -m pip install --upgrade pip
pip install -r requirements.txt
pip install -r requirements-dev.txt

# Instalar dependências Node.js
Write-Host "📥 Instalando dependências Node.js..." -ForegroundColor Yellow
npm install

# Configurar Husky
Write-Host "🐕 Configurando Husky..." -ForegroundColor Yellow
npm run prepare

# Copiar .env.example para .env se não existir
if (-not (Test-Path .env)) {
    Write-Host "📝 Criando arquivo .env a partir de .env.example..." -ForegroundColor Yellow
    Copy-Item .env.example .env
    Write-Host "⚠️  IMPORTANTE: Configure suas credenciais no arquivo .env" -ForegroundColor Yellow
}

# Criar diretórios necessários
Write-Host "📁 Criando diretórios necessários..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path logs | Out-Null
New-Item -ItemType Directory -Force -Path uploads | Out-Null
New-Item -ItemType Directory -Force -Path projects | Out-Null

Write-Host "✅ Ambiente de desenvolvimento configurado com sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "Para ativar o ambiente virtual Python:" -ForegroundColor Cyan
Write-Host "  .\venv\Scripts\Activate.ps1"
Write-Host ""
Write-Host "Para iniciar o servidor de desenvolvimento:" -ForegroundColor Cyan
Write-Host "  npm run dev"

