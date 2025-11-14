"""
Models Router - Gerenciamento de Modelos 3D
"""
from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from pydantic import BaseModel, Field
from datetime import datetime
from enum import Enum

router = APIRouter()


class ModelFormat(str, Enum):
    """Formatos de modelo suportados"""
    OBJ = "obj"
    MTL = "mtl"
    GLTF = "gltf"
    GLB = "glb"
    FBX = "fbx"


class Model3D(BaseModel):
    """Schema de um modelo 3D"""
    id: str = Field(..., description="ID único do modelo")
    name: str = Field(..., description="Nome do modelo")
    description: Optional[str] = Field(None, description="Descrição do modelo")
    format: ModelFormat = Field(..., description="Formato do modelo")
    vertices: int = Field(..., description="Número de vértices")
    faces: int = Field(..., description="Número de faces")
    materials: int = Field(..., description="Número de materiais")
    file_size: int = Field(..., description="Tamanho do arquivo em bytes")
    created_at: datetime = Field(..., description="Data de criação")
    updated_at: datetime = Field(..., description="Data de atualização")
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "model_123",
                "name": "Gaiola Industrial",
                "description": "Modelo 3D de gaiola industrial completa",
                "format": "obj",
                "vertices": 51564,
                "faces": 37642,
                "materials": 15,
                "file_size": 2400000,
                "created_at": "2025-01-15T10:30:00Z",
                "updated_at": "2025-01-15T10:30:00Z"
            }
        }


class ModelListResponse(BaseModel):
    """Resposta de listagem de modelos"""
    total: int = Field(..., description="Total de modelos")
    page: int = Field(..., description="Página atual")
    page_size: int = Field(..., description="Tamanho da página")
    models: List[Model3D] = Field(..., description="Lista de modelos")


@router.get(
    "/models",
    response_model=ModelListResponse,
    summary="Listar modelos 3D",
    description="Retorna uma lista paginada de modelos 3D disponíveis",
    tags=["models"]
)
async def list_models(
    page: int = Query(1, ge=1, description="Número da página"),
    page_size: int = Query(10, ge=1, le=100, description="Itens por página"),
    format: Optional[ModelFormat] = Query(None, description="Filtrar por formato"),
    search: Optional[str] = Query(None, description="Buscar por nome ou descrição")
) -> ModelListResponse:
    """
    Lista todos os modelos 3D disponíveis com paginação e filtros.
    
    - **page**: Número da página (inicia em 1)
    - **page_size**: Quantidade de itens por página (máximo 100)
    - **format**: Filtrar por formato específico
    - **search**: Buscar modelos por nome ou descrição
    """
    # TODO: Implementar busca real no banco de dados
    # Por enquanto retorna exemplo
    return ModelListResponse(
        total=1,
        page=page,
        page_size=page_size,
        models=[
            Model3D(
                id="model_123",
                name="Gaiola Industrial",
                description="Modelo 3D de gaiola industrial completa",
                format=ModelFormat.OBJ,
                vertices=51564,
                faces=37642,
                materials=15,
                file_size=2400000,
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow()
            )
        ]
    )


@router.get(
    "/models/{model_id}",
    response_model=Model3D,
    summary="Obter modelo por ID",
    description="Retorna detalhes de um modelo 3D específico",
    tags=["models"]
)
async def get_model(model_id: str) -> Model3D:
    """
    Retorna informações detalhadas de um modelo 3D específico.
    
    - **model_id**: ID único do modelo
    """
    # TODO: Implementar busca real
    if model_id != "model_123":
        raise HTTPException(status_code=404, detail="Modelo não encontrado")
    
    return Model3D(
        id=model_id,
        name="Gaiola Industrial",
        description="Modelo 3D de gaiola industrial completa",
        format=ModelFormat.OBJ,
        vertices=51564,
        faces=37642,
        materials=15,
        file_size=2400000,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )


@router.delete(
    "/models/{model_id}",
    summary="Deletar modelo",
    description="Remove um modelo 3D do sistema",
    tags=["models"]
)
async def delete_model(model_id: str) -> dict:
    """
    Deleta um modelo 3D do sistema.
    
    - **model_id**: ID único do modelo a ser deletado
    """
    # TODO: Implementar deleção real
    return {"message": f"Modelo {model_id} deletado com sucesso"}

