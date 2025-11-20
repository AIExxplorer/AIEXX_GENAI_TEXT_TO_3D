# Script PowerShell para configurar VITE_APP_URL na Vercel
# Uso: .\scripts\configure-vercel-env.ps1

Write-Host "🔧 Configurador de VITE_APP_URL para Vercel" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se está logado na Vercel
try {
    $whoami = vercel whoami 2>&1
    if ($LASTEXITCODE -ne 0) {
        throw "Não autenticado"
    }
    Write-Host "✅ Autenticado na Vercel" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "❌ Você não está logado na Vercel CLI" -ForegroundColor Red
    Write-Host ""
    Write-Host "Por favor, faça login primeiro:" -ForegroundColor Yellow
    Write-Host "  vercel login" -ForegroundColor White
    Write-Host ""
    exit 1
}

# URL padrão baseada na análise do projeto
$DEFAULT_URL = "https://aiexx-genai-text-to-3d-web.vercel.app"

Write-Host "📋 URL padrão detectada: $DEFAULT_URL" -ForegroundColor Yellow
Write-Host ""
Write-Host "Esta URL foi detectada com base na documentação do projeto."
Write-Host "Você pode confirmar a URL correta em: https://vercel.com/dashboard"
Write-Host ""

$confirmation = Read-Host "A URL acima está correta? (s/n)"

if ($confirmation -notmatch "^[Ss]$") {
    Write-Host ""
    Write-Host "Por favor, informe a URL correta da sua aplicação na Vercel:"
    Write-Host "(Exemplo: https://seu-projeto.vercel.app)"
    $customUrl = Read-Host "URL"

    if ([string]::IsNullOrWhiteSpace($customUrl)) {
        Write-Host "❌ URL não pode estar vazia" -ForegroundColor Red
        exit 1
    }

    $APP_URL = $customUrl
} else {
    $APP_URL = $DEFAULT_URL
}

Write-Host ""
Write-Host "🔥 Configurando VITE_APP_URL com o valor: $APP_URL" -ForegroundColor Cyan
Write-Host ""

# Função para adicionar variável
function Add-VercelEnv {
    param (
        [string]$Value,
        [string]$Environment
    )

    Write-Host "➤ Adicionando para $Environment..." -ForegroundColor Cyan

    try {
        $Value | vercel env add VITE_APP_URL $Environment 2>&1 | Out-Null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Variável adicionada para $Environment" -ForegroundColor Green
        } else {
            Write-Host "⚠️  Variável pode já existir em $Environment" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "⚠️  Erro ao adicionar variável para $Environment" -ForegroundColor Yellow
    }

    Write-Host ""
}

# Adicionar para cada ambiente
Add-VercelEnv -Value $APP_URL -Environment "production"
Add-VercelEnv -Value $APP_URL -Environment "preview"
Add-VercelEnv -Value "http://localhost:5173" -Environment "development"

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "✅ Configuração concluída!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos passos:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Faça um redeploy do projeto:"
Write-Host "   vercel --prod" -ForegroundColor White
Write-Host ""
Write-Host "2. Configure o Supabase com a mesma URL:"
Write-Host "   - Site URL: $APP_URL" -ForegroundColor White
Write-Host "   - Redirect URLs: $APP_URL/**" -ForegroundColor White
Write-Host ""
Write-Host "3. Teste o login com Google em produção"
Write-Host ""
Write-Host "📖 Para mais detalhes, consulte:" -ForegroundColor Cyan
Write-Host "   - VERCEL_APP_URL_CONFIG.md"
Write-Host "   - SUPABASE_OAUTH_CONFIG.md"
Write-Host ""
