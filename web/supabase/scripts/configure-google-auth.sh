#!/bin/bash
# Script para configurar autenticação Google via API de Gerenciamento do Supabase
#
# Uso:
#   ./configure-google-auth.sh <project-ref> <access-token> <client-id> <client-secret>
#
# Exemplo:
#   ./configure-google-auth.sh grpxuporwqdyckkyhlcx your-access-token your-client-id your-client-secret

set -e

PROJECT_REF="${1}"
ACCESS_TOKEN="${2}"
CLIENT_ID="${3}"
CLIENT_SECRET="${4}"

if [ -z "$PROJECT_REF" ] || [ -z "$ACCESS_TOKEN" ] || [ -z "$CLIENT_ID" ] || [ -z "$CLIENT_SECRET" ]; then
    echo "Erro: Todos os parâmetros são obrigatórios"
    echo ""
    echo "Uso: $0 <project-ref> <access-token> <client-id> <client-secret>"
    echo ""
    echo "Onde:"
    echo "  project-ref    - ID do projeto Supabase (ex: grpxuporwqdyckkyhlcx)"
    echo "  access-token   - Token de acesso da API (obtenha em: https://app.supabase.com/account/tokens)"
    echo "  client-id      - Client ID do Google OAuth"
    echo "  client-secret  - Client Secret do Google OAuth"
    exit 1
fi

API_URL="https://api.supabase.com/v1/projects/${PROJECT_REF}/config/auth"

echo "Configurando autenticação Google para o projeto: ${PROJECT_REF}"
echo ""

RESPONSE=$(curl -s -w "\n%{http_code}" -X PATCH "${API_URL}" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "{
    \"external_google_enabled\": true,
    \"external_google_client_id\": \"${CLIENT_ID}\",
    \"external_google_secret\": \"${CLIENT_SECRET}\"
  }")

HTTP_CODE=$(echo "${RESPONSE}" | tail -n1)
BODY=$(echo "${RESPONSE}" | sed '$d')

if [ "${HTTP_CODE}" -eq 200 ] || [ "${HTTP_CODE}" -eq 201 ]; then
    echo "✅ Autenticação Google configurada com sucesso!"
    echo ""
    echo "Resposta:"
    echo "${BODY}" | jq '.' 2>/dev/null || echo "${BODY}"
else
    echo "❌ Erro ao configurar autenticação Google"
    echo "Código HTTP: ${HTTP_CODE}"
    echo ""
    echo "Resposta:"
    echo "${BODY}" | jq '.' 2>/dev/null || echo "${BODY}"
    exit 1
fi

