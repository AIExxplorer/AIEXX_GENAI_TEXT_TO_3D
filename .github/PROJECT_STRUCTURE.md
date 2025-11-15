# 📁 Estrutura de Diretórios para Projetos

## 🎯 Visão Geral

Cada modelo 3D gerado terá seu próprio diretório dentro de `projects/`, seguindo o mesmo padrão do projeto `gaiola_gabinete_completo`.

## 📂 Estrutura Padrão

```
projects/
├── {project_name}/
│   ├── {project_name}.py          # Script Python de geração
│   ├── output/                     # Arquivos gerados
│   │   ├── {model_name}.obj       # Arquivo OBJ do modelo
│   │   ├── {model_name}.mtl       # Arquivo MTL (materiais)
│   │   └── textures/              # Texturas (se houver)
│   │       └── *.jpg, *.png
│   ├── README.md                  # Documentação do projeto
│   └── config.json                # Configurações do projeto (opcional)
```

## 🔧 Convenção de Nomenclatura

### Nome do Projeto

- Formato: `{tipo}_{descricao}`
- Exemplo: `gaiola_gabinete_completo`, `mesa_industrial`, `estante_modular`

### Nome do Modelo

- Formato: `{project_name}_model`
- Exemplo: `gaiola_gabinete_completo_model.obj`

## 📝 Exemplo de Projeto

### Estrutura

```
projects/
└── mesa_industrial/
    ├── mesa_industrial.py
    ├── output/
    │   ├── mesa_industrial_model.obj
    │   ├── mesa_industrial_model.mtl
    │   └── textures/
    │       ├── metal_diffuse.jpg
    │       └── wood_diffuse.jpg
    └── README.md
```

### Script Python (`mesa_industrial.py`)

```python
"""
Geração de modelo 3D: Mesa Industrial
Descrição: Uma mesa industrial metálica com tampo de madeira
"""

import bpy
import os

def criar_mesa_industrial():
    """Cria uma mesa industrial parametrizada"""
    # Lógica de geração...
    pass

if __name__ == "__main__":
    criar_mesa_industrial()
    # Exportar para OBJ/MTL
    bpy.ops.export_scene.obj(filepath="output/mesa_industrial_model.obj")
```

## 🔄 Fluxo de Geração

1. **Usuário digita prompt** → Front-end envia para API
2. **API cria diretório do projeto** → `projects/{project_name}/`
3. **API gera script Python** → Baseado no prompt e templates
4. **API executa script** → Gera arquivos OBJ/MTL
5. **API retorna URLs** → Para o front-end carregar no viewer

## 🌐 URLs dos Arquivos

Após a geração, os arquivos estarão disponíveis em:

```
/api/v1/models/{model_id}/files/model.obj
/api/v1/models/{model_id}/files/model.mtl
```

Ou diretamente:

```
/projects/{project_name}/output/{model_name}.obj
/projects/{project_name}/output/{model_name}.mtl
```

## 📋 Metadados do Projeto

Cada projeto pode ter um `config.json`:

```json
{
  "name": "mesa_industrial",
  "description": "Mesa industrial metálica com tampo de madeira",
  "prompt": "Uma mesa industrial metálica com tampo de madeira",
  "created_at": "2025-01-14T10:30:00Z",
  "model_id": "model_123456",
  "files": {
    "obj": "output/mesa_industrial_model.obj",
    "mtl": "output/mesa_industrial_model.mtl"
  },
  "stats": {
    "vertices": 51564,
    "faces": 37128,
    "materials": 3
  }
}
```

## 🔐 Segurança

- Cada projeto é isolado em seu próprio diretório
- Validação de nomes de projeto (sem caracteres especiais)
- Limpeza automática de projetos antigos (opcional)

## 📚 Referências

- Ver `projects/gaiola_gabinete_completo/` como exemplo completo
- Ver `src/api/routers/generation.py` para lógica de geração

