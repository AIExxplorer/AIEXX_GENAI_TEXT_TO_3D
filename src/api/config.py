"""
API Configuration
"""
from pydantic_settings import BaseSettings
from typing import Optional


class APISettings(BaseSettings):
    """Configurações da API"""
    
    # API Info
    api_title: str = "AIEXX GENAI TEXT_TO_3D API"
    api_description: str = """
    🎨 **API REST para geração de modelos 3D a partir de texto usando IA generativa**
    
    ## Características
    
    * ✅ Geração procedural de modelos 3D
    * ✅ Exportação em formatos OBJ/MTL
    * ✅ Integração com Hugging Face
    * ✅ Visualização em tempo real
    * ✅ Materiais PBR realistas
    
    ## Documentação
    
    * **Swagger UI**: Interface interativa para testar endpoints
    * **ReDoc**: Documentação alternativa mais limpa
    * **OpenAPI Schema**: Especificação OpenAPI 3.0
    
    ## Autenticação
    
    A API utiliza autenticação via API Key ou OAuth2 (em desenvolvimento).
    """
    api_version: str = "1.0.0"
    api_contact: dict = {
        "name": "Equipe AIEXX",
        "url": "https://github.com/AIExxplorer/AIEXX_GENAI_TEXT_TO_3D",
        "email": "support@aiexx.com"
    }
    api_license_info: dict = {
        "name": "Apache 2.0",
        "url": "https://www.apache.org/licenses/LICENSE-2.0"
    }
    
    # Server Settings
    host: str = "0.0.0.0"
    port: int = 8000
    debug: bool = False
    reload: bool = False
    
    # CORS
    cors_origins: list = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:8080",
    ]
    cors_allow_credentials: bool = True
    cors_allow_methods: list = ["*"]
    cors_allow_headers: list = ["*"]
    
    # API Tags
    api_tags_metadata: list = [
        {
            "name": "health",
            "description": "Endpoints de verificação de saúde da API",
        },
        {
            "name": "models",
            "description": "Operações relacionadas à geração e gerenciamento de modelos 3D",
        },
        {
            "name": "generation",
            "description": "Geração de modelos 3D a partir de texto usando IA",
        },
        {
            "name": "materials",
            "description": "Gerenciamento de materiais PBR para modelos 3D",
        },
        {
            "name": "export",
            "description": "Exportação de modelos 3D em diferentes formatos",
        },
        {
            "name": "visualization",
            "description": "Visualização e preview de modelos 3D",
        },
    ]
    
    class Config:
        env_file = ".env"
        case_sensitive = False


# Instância global de configurações
settings = APISettings()

