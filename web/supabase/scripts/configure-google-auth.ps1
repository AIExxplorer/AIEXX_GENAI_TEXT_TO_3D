# Script PowerShell para configurar autenticação Google via API de Gerenciamento do Supabase
#
# Uso:
#   .\configure-google-auth.ps1 -ProjectRef <project-ref> -AccessToken <access-token> -ClientId <client-id> -ClientSecret <client-secret>
#
# Exemplo:
#   .\configure-google-auth.ps1 -ProjectRef "grpxuporwqdyckkyhlcx" -AccessToken "your-access-token" -ClientId "your-client-id" -ClientSecret "your-client-secret"

param(
    [Parameter(Mandatory=$true)]
    [string]$ProjectRef,
    
    [Parameter(Mandatory=$true)]
    [string]$AccessToken,
    
    [Parameter(Mandatory=$true)]
    [string]$ClientId,
    
    [Parameter(Mandatory=$true)]
    [string]$ClientSecret
)

$apiUrl = "https://api.supabase.com/v1/projects/$ProjectRef/config/auth"

$headers = @{
    "Authorization" = "Bearer $AccessToken"
    "Content-Type" = "application/json"
}

$body = @{
    external_google_enabled = $true
    external_google_client_id = $ClientId
    external_google_secret = $ClientSecret
} | ConvertTo-Json

Write-Host "Configurando autenticação Google para o projeto: $ProjectRef" -ForegroundColor Cyan
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri $apiUrl -Method PATCH -Headers $headers -Body $body
    
    Write-Host "✅ Autenticação Google configurada com sucesso!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Resposta:" -ForegroundColor Yellow
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "❌ Erro ao configurar autenticação Google" -ForegroundColor Red
    Write-Host "Status Code: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Erro:" -ForegroundColor Yellow
    $_.Exception.Message
    
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Resposta do servidor:" -ForegroundColor Yellow
        Write-Host $responseBody
    }
    
    exit 1
}

