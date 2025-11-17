# Scripts de Configuração do Supabase

Este diretório contém scripts úteis para configurar o Supabase de forma programática.

## Scripts Disponíveis

### `configure-google-auth.sh` / `configure-google-auth.ps1`

Scripts para configurar autenticação Google via API de Gerenciamento do Supabase.

#### Pré-requisitos

1. **Access Token do Supabase**
   - Acesse: https://app.supabase.com/account/tokens
   - Crie um novo token de acesso
   - Guarde este token com segurança

2. **Credenciais do Google OAuth**
   - Client ID do Google Cloud Console
   - Client Secret do Google Cloud Console
   - Veja instruções em: `../README.md` ou `../../ENV_SETUP.md`

3. **Project Ref**
   - ID do projeto Supabase (ex: `grpxuporwqdyckkyhlcx`)
   - Encontre em: Dashboard > Settings > General > Reference ID

#### Uso - Linux/Mac (Bash)

```bash
# Dar permissão de execução
chmod +x configure-google-auth.sh

# Executar o script
./configure-google-auth.sh <project-ref> <access-token> <client-id> <client-secret>

# Exemplo:
./configure-google-auth.sh grpxuporwqdyckkyhlcx your-access-token your-client-id.apps.googleusercontent.com your-client-secret
```

#### Uso - Windows (PowerShell)

```powershell
# Executar o script
.\configure-google-auth.ps1 -ProjectRef "<project-ref>" -AccessToken "<access-token>" -ClientId "<client-id>" -ClientSecret "<client-secret>"

# Exemplo:
.\configure-google-auth.ps1 -ProjectRef "grpxuporwqdyckkyhlcx" -AccessToken "your-access-token" -ClientId "your-client-id.apps.googleusercontent.com" -ClientSecret "your-client-secret"
```

#### Exemplo com Variáveis de Ambiente

**Bash:**
```bash
export SUPABASE_PROJECT_REF="grpxuporwqdyckkyhlcx"
export SUPABASE_ACCESS_TOKEN="your-access-token"
export GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
export GOOGLE_CLIENT_SECRET="your-client-secret"

./configure-google-auth.sh "$SUPABASE_PROJECT_REF" "$SUPABASE_ACCESS_TOKEN" "$GOOGLE_CLIENT_ID" "$GOOGLE_CLIENT_SECRET"
```

**PowerShell:**
```powershell
$env:SUPABASE_PROJECT_REF = "grpxuporwqdyckkyhlcx"
$env:SUPABASE_ACCESS_TOKEN = "your-access-token"
$env:GOOGLE_CLIENT_ID = "your-client-id.apps.googleusercontent.com"
$env:GOOGLE_CLIENT_SECRET = "your-client-secret"

.\configure-google-auth.ps1 -ProjectRef $env:SUPABASE_PROJECT_REF -AccessToken $env:SUPABASE_ACCESS_TOKEN -ClientId $env:GOOGLE_CLIENT_ID -ClientSecret $env:GOOGLE_CLIENT_SECRET
```

#### Resposta de Sucesso

Se a configuração for bem-sucedida, você verá:

```
✅ Autenticação Google configurada com sucesso!

Resposta:
{
  "external_google_enabled": true,
  "external_google_client_id": "your-client-id.apps.googleusercontent.com",
  ...
}
```

#### Tratamento de Erros

O script retornará um código de erro se:
- Parâmetros estiverem faltando
- Access Token for inválido
- Project Ref não existir
- Credenciais do Google forem inválidas
- Houver erro de conexão com a API

## Segurança

⚠️ **IMPORTANTE:**
- **NUNCA** commite Access Tokens ou Client Secrets no repositório
- Use variáveis de ambiente para credenciais sensíveis
- Access Tokens têm permissões administrativas - guarde-os com segurança
- Revogue tokens antigos ou comprometidos imediatamente

## Links Úteis

- [Supabase Management API](https://supabase.com/docs/reference/api)
- [Supabase Access Tokens](https://app.supabase.com/account/tokens)
- [Google Cloud Console](https://console.cloud.google.com)
- [Documentação Completa](../README.md)

