"""
Health Check Router
"""
from fastapi import APIRouter
from datetime import datetime
from typing import Dict, Any
import sys
import platform

router = APIRouter()


@router.get(
    "/health",
    summary="Verificação de saúde da API",
    description="Retorna o status atual da API e informações do sistema",
    response_description="Status da API e informações do sistema",
    tags=["health"]
)
async def health_check() -> Dict[str, Any]:
    """
    Endpoint de verificação de saúde da API
    
    Retorna informações sobre o status da API e do sistema.
    """
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "version": "1.0.0",
        "python_version": sys.version,
        "platform": platform.platform(),
        "service": "AIEXX GENAI TEXT_TO_3D API"
    }


@router.get(
    "/health/live",
    summary="Liveness Probe",
    description="Endpoint simples para verificar se a API está respondendo",
    tags=["health"]
)
async def liveness() -> Dict[str, str]:
    """
    Liveness probe - usado por orquestradores (Kubernetes, Docker, etc.)
    """
    return {"status": "alive"}


@router.get(
    "/health/ready",
    summary="Readiness Probe",
    description="Verifica se a API está pronta para receber requisições",
    tags=["health"]
)
async def readiness() -> Dict[str, str]:
    """
    Readiness probe - verifica se todos os serviços necessários estão disponíveis
    """
    # Aqui você pode adicionar verificações de dependências
    # Ex: banco de dados, serviços externos, etc.
    return {"status": "ready"}

