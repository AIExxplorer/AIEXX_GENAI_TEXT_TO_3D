# 🚀 API REST - AIEXX GENAI TEXT_TO_3D

API REST construída com FastAPI para geração de modelos 3D a partir de texto usando IA generativa.

## 📚 Documentação Automática

A API possui documentação automática gerada pelo Swagger/OpenAPI:

- **Swagger UI**: Interface interativa para testar endpoints
  - URL: `http://localhost:8000/docs`
  - Permite testar todos os endpoints diretamente no navegador

- **ReDoc**: Documentação alternativa mais limpa
  - URL: `http://localhost:8000/redoc`
  - Interface mais focada em leitura

- **OpenAPI Schema**: Especificação OpenAPI 3.0
  - URL: `http://localhost:8000/openapi.json`
  - Schema JSON para integração com outras ferramentas

## 🏃 Executando a API

### Desenvolvimento

```bash
# Com reload automático
uvicorn src.api.main:app --reload --host 0.0.0.0 --port 8000

# Ou usando o módulo Python diretamente
python -m src.api.main
```

### Produção

```bash
# Com múltiplos workers
uvicorn src.api.main:app --host 0.0.0.0 --port 8000 --workers 4
```

## 📋 Endpoints Disponíveis

### Health Check

- `GET /health` - Verificação de saúde da API
- `GET /health/live` - Liveness probe
- `GET /health/ready` - Readiness probe

### Modelos 3D

- `GET /api/v1/models` - Listar modelos 3D
- `GET /api/v1/models/{model_id}` - Obter modelo específico
- `DELETE /api/v1/models/{model_id}` - Deletar modelo

### Geração

- `POST /api/v1/generation/generate` - Gerar modelo 3D a partir de texto
- `GET /api/v1/generation/{job_id}` - Verificar status da geração
- `GET /api/v1/generation` - Listar gerações

## 🔧 Configuração

As configurações podem ser definidas via variáveis de ambiente ou arquivo `.env`:

```env
# API Settings
API_HOST=0.0.0.0
API_PORT=8000
API_DEBUG=false
API_RELOAD=false

# CORS
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

## 🎨 Características do Swagger

- ✅ Documentação automática de todos os endpoints
- ✅ Schemas Pydantic automaticamente documentados
- ✅ Exemplos de requisições e respostas
- ✅ Interface interativa para testar endpoints
- ✅ Validação automática de parâmetros
- ✅ Tags organizadas por funcionalidade
- ✅ Descrições detalhadas em português

## 📝 Exemplo de Uso

### Gerar Modelo 3D

```bash
curl -X POST "http://localhost:8000/api/v1/generation/generate" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Uma gaiola industrial metálica com portas gradeadas",
    "style": "realistic",
    "resolution": "medium"
  }'
```

### Listar Modelos

```bash
curl "http://localhost:8000/api/v1/models?page=1&page_size=10"
```

## 🛠️ Desenvolvimento

### Adicionar Novo Endpoint

1. Crie um novo router em `src/api/routers/`
2. Defina os schemas Pydantic para request/response
3. Adicione documentação detalhada nos docstrings
4. Registre o router em `src/api/main.py`

### Exemplo de Router

```python
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class MyResponse(BaseModel):
    """Schema de resposta"""
    message: str

@router.get("/my-endpoint", response_model=MyResponse)
async def my_endpoint():
    """Descrição do endpoint"""
    return MyResponse(message="Hello World")
```

## 📚 Recursos

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Pydantic Documentation](https://docs.pydantic.dev/)

