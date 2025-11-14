"""
FastAPI Application - Main Entry Point
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import uvicorn

from src.api.config import settings
from src.api.routers import health, models, generation


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan events - executado na inicialização e shutdown da aplicação
    """
    # Startup
    print("🚀 Iniciando AIEXX GENAI TEXT_TO_3D API...")
    print(f"📚 Documentação disponível em: http://localhost:{settings.port}/docs")
    print(f"📖 ReDoc disponível em: http://localhost:{settings.port}/redoc")
    print(f"📋 OpenAPI Schema: http://localhost:{settings.port}/openapi.json")
    
    yield
    
    # Shutdown
    print("👋 Encerrando AIEXX GENAI TEXT_TO_3D API...")


# Criar aplicação FastAPI com configurações customizadas
app = FastAPI(
    title=settings.api_title,
    description=settings.api_description,
    version=settings.api_version,
    contact=settings.api_contact,
    license_info=settings.api_license_info,
    openapi_tags=settings.api_tags_metadata,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
    lifespan=lifespan,
    # Customização do Swagger UI
    swagger_ui_parameters={
        "deepLinking": True,
        "displayRequestDuration": True,
        "filter": True,
        "showExtensions": True,
        "showCommonExtensions": True,
        "tryItOutEnabled": True,
    }
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=settings.cors_allow_credentials,
    allow_methods=settings.cors_allow_methods,
    allow_headers=settings.cors_allow_headers,
)


# Incluir routers
app.include_router(health.router, tags=["health"])
app.include_router(models.router, prefix="/api/v1", tags=["models"])
app.include_router(generation.router, prefix="/api/v1", tags=["generation"])


@app.get("/", include_in_schema=False)
async def root():
    """
    Endpoint raiz - redireciona para documentação
    """
    return JSONResponse({
        "message": "AIEXX GENAI TEXT_TO_3D API",
        "version": settings.api_version,
        "docs": "/docs",
        "redoc": "/redoc",
        "openapi": "/openapi.json"
    })


@app.exception_handler(404)
async def not_found_handler(request, exc):
    """
    Handler customizado para erros 404
    """
    return JSONResponse(
        status_code=404,
        content={
            "error": "Not Found",
            "message": f"Endpoint '{request.url.path}' não encontrado",
            "docs": "/docs"
        }
    )


def run_server():
    """
    Função para executar o servidor
    """
    uvicorn.run(
        "src.api.main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.reload,
        log_level="debug" if settings.debug else "info"
    )


if __name__ == "__main__":
    run_server()

