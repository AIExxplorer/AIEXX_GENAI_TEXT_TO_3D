<div align="center">

<table>

<tr>

<td align="center">

```
   █████╗ ██╗███████╗██╗  ██╗██╗  ██╗
  ██╔══██╗██║██╔════╝╚██╗██╔╝╚██╗██╔╝
  ███████║██║█████╗   ╚███╔╝  ╚███╔╝
  ██╔══██║██║██╔══╝   ██╔██╗  ██╔██╗
  ██║  ██║██║███████╗██╔╝ ██╗██╔╝ ██╗
  ╚═╝  ╚═╝╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝
```

</td>

</tr>

</table>

</div>

# 🎨 AIEXX_GENAI_TEXT_TO_3D

<div align="center">

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Python](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![Node.js](https://img.shields.io/badge/node-%3E=18.0.0-brightgreen.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue.svg)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.160+-green.svg)](https://threejs.org/)
[![Hugging Face](https://img.shields.io/badge/Hugging%20Face-Integrations-yellow.svg)](https://huggingface.co/)

**Pipeline completo para geração de modelos 3D a partir de texto usando IA generativa - Motor de visualização 3D independente e aplicação web/mobile**

[Documentação](https://github.com/AIExxplorer/AIEXX_GENAI_TEXT_TO_3D/wiki) · [Reportar Bug](https://github.com/AIExxplorer/AIEXX_GENAI_TEXT_TO_3D/issues) · [Solicitar Feature](https://github.com/AIExxplorer/AIEXX_GENAI_TEXT_TO_3D/issues) · [Discussions](https://github.com/AIExxplorer/AIEXX_GENAI_TEXT_TO_3D/discussions)

</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Características](#-características)
- [Arquitetura](#-arquitetura)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Uso](#-uso)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Desenvolvimento](#-desenvolvimento)
- [Contribuindo](#-contribuindo)
- [Segurança](#-segurança)
- [Licença](#-licença)
- [Contato](#-contato)

---

## 🎯 Sobre o Projeto

**AIEXX_GENAI_TEXT_TO_3D** é uma solução completa dividida em duas partes principais para geração e visualização de modelos 3D usando Inteligência Artificial:

### PARTE 1: Motor de Visualização 3D 🎨

Motor independente para visualização de arquivos 3D (OBJ, MTL, GLTF) com:

- ✅ Ambiente de visualização com wireframe de referência (X, Y, Z)
- ✅ Controles de câmera (perspectiva, top, side, front, back, bottom)
- ✅ Suporte a drag & drop de arquivos
- ✅ Leitura de malhas 3D e texturas
- ✅ Compatível com Web e Mobile
- ✅ Renderização em tempo real com Three.js

### PARTE 2: Aplicação TEXT_TO_3D 🤖

Interface web/mobile minimalista para geração de modelos 3D via IA:

- 🚧 Caixa de texto para prompts de geração
- 🚧 Integração com Hugging Face para geração de modelos 3D
- 🚧 Interface UI/UX minimalista e profissional
- 🚧 Geração procedural de modelos usando código Python (como `gaiola_gabinete_completo.py`)

### 🎨 Método de Geração

Utilizamos geração procedural através de código Python para criar modelos 3D parametrizados, seguindo o mesmo padrão do projeto `gaiola_gabinete_completo.py`:

```python
# Exemplo: Gerar modelo 3D industrial parametrizado
python projects/gaiola_gabinete_completo/gaiola_gabinete_completo.py
```

**Resultado**: Modelo 3D profissional com 51K+ vértices, 37K+ faces, materiais PBR

---

## ✨ Características

### Core Features

- ✅ **Geração Procedural**: Modelos 3D parametrizados e customizáveis via código Python
- ✅ **Materiais Realistas**: 15+ materiais PBR com propriedades físicas
- ✅ **Exportação OBJ/MTL**: Formato universal compatível com todos os softwares 3D
- ✅ **Wireframe Completo**: 100% manipulável em Blender, Maya, 3ds Max, ZBrush
- ✅ **Visualização Web**: Motor independente com Three.js
- ✅ **Clean Code**: Arquitetura modular, type-safe, bem documentada

### Advanced Features

- 🚧 **AI-Powered TEXT_TO_3D**: Conversão de texto para modelo 3D (em desenvolvimento)
- 🚧 **Web Interface**: Interface gráfica moderna com React + TypeScript
- 🚧 **REST API**: FastAPI com documentação automática
- 🚧 **Real-time Preview**: Visualização 3D em tempo real no navegador
- 🚧 **Hugging Face Integration**: Integração com modelos de IA generativa

### Especificações Técnicas

#### Modelo de Exemplo (Gaiola Industrial)

| Especificação | Valor |
|---------------|-------|
| **Dimensões** | 4400x3044x3085mm |
| **Vértices** | 51,564 pontos 3D |
| **Faces** | 37,642 polígonos |
| **Materiais** | 15 materiais PBR |
| **Tamanho** | 2.29 MB (OBJ) |

---

## 🏗️ Arquitetura

```
AIEXX_GENAI_TEXT_TO_3D/
├── PARTE 1: Motor de Visualização 3D
│   └── viewer3d/          # Motor independente
│       ├── Drag & Drop
│       ├── Wireframe (X,Y,Z)
│       └── Controles de Câmera
│
└── PARTE 2: Aplicação TEXT_TO_3D
    ├── Interface Web/Mobile
    ├── Prompt Input
    └── Geração via IA (Hugging Face)
```

---

## 🛠️ Tecnologias

### Backend

- **Python 3.8+**: Core do gerador procedural
- **FastAPI**: API REST moderna e performática
- **NumPy**: Operações matemáticas otimizadas
- **Pydantic**: Validação de dados type-safe

### Frontend

- **React 18**: UI library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Build tool ultra-rápido
- **Three.js**: Renderização 3D no navegador

### IA & ML

- **Hugging Face**: Modelos de IA generativa
- **Transformers**: Processamento de linguagem natural

### DevOps & Quality

- **Husky**: Git hooks automatizados
- **Commitlint**: Conventional Commits enforced
- **Black & isort**: Formatação Python
- **ESLint & Prettier**: Linting JavaScript/TypeScript
- **Pytest**: Testes automatizados
- **GitHub Actions**: CI/CD

---

## 📦 Pré-requisitos

### Software Necessário

```bash
# Python 3.8 ou superior
python --version
# Python 3.8.10+

# Node.js 18 ou superior
node --version
# v18.17.0+

# npm 9 ou superior
npm --version
# 9.6.7+

# Git
git --version
# git version 2.40.0+
```

### Softwares 3D (Opcional)

Para visualização e edição dos modelos gerados:

- **Blender** 3.0+ (gratuito)
- **Autodesk Maya** 2020+
- **3ds Max** 2020+
- **ZBrush** 2021+

---

## 🚀 Instalação

### 1. Clone o Repositório

```bash
git clone https://github.com/AIExxplorer/AIEXX_GENAI_TEXT_TO_3D.git
cd AIEXX_GENAI_TEXT_TO_3D
```

### 2. Configure Python

```bash
# Crie ambiente virtual
python -m venv venv

# Ative o ambiente virtual
# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate

# Instale dependências
pip install -r requirements.txt

# Instale dependências de desenvolvimento (opcional)
pip install -r requirements-dev.txt
```

### 3. Configure Node.js

```bash
# Instale dependências
npm install

# Configure Husky (git hooks)
npm run prepare
```

### 4. Configure Variáveis de Ambiente

```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite conforme necessário
# Configure suas credenciais (Hugging Face, Google OAuth, etc.)
```

**⚠️ IMPORTANTE**: Configure todas as variáveis de ambiente necessárias no arquivo `.env` antes de iniciar o desenvolvimento.

### 5. Configuração Rápida (Script Automatizado)

```bash
# Windows (PowerShell)
npm run setup:win

# Linux/Mac (Bash)
npm run setup:unix

# Ou use o script universal (detecta automaticamente)
npm run setup
```

---

## 💻 Uso

### Gerar Modelo Procedural via Python

```bash
# Executar projeto de exemplo
cd projects/gaiola_gabinete_completo
python gaiola_gabinete_completo.py

# Arquivos gerados estarão em:
# projects/gaiola_gabinete_completo/generated/
```

### Executar Motor de Visualização 3D (PARTE 1)

```bash
# Iniciar servidor de visualização
npm run viewer:dev

# Acessar aplicação
# http://localhost:5173
```

### Executar Interface Web TEXT_TO_3D (PARTE 2 - Em Desenvolvimento)

```bash
# Iniciar servidor web
npm run web:dev

# Acessar aplicação
# http://localhost:5173
```

### Executar API (Em Desenvolvimento)

```bash
# Iniciar servidor de desenvolvimento
uvicorn src.api.main:app --reload

# Acessar documentação interativa
# http://localhost:8000/docs
```

### Importar em Softwares 3D

#### Blender

```
1. File > Import > Wavefront (.obj)
2. Selecione: projects/{projeto}/generated/{arquivo}.obj
3. ✅ Materiais importados automaticamente
```

#### Maya/3ds Max

```
1. File > Import > OBJ
2. Selecione o arquivo .obj
3. Configure import options (normals, materials)
```

---

## 📁 Estrutura do Projeto

```
AIEXX_GENAI_TEXT_TO_3D/
├── .github/                    # GitHub configurations
│   ├── workflows/              # CI/CD pipelines
│   ├── ISSUE_TEMPLATE/         # Templates de issues
│   └── PULL_REQUEST_TEMPLATE/  # Template de PR
├── projects/                   # Projetos 3D organizados
│   └── {nome_projeto}/        # Cada projeto em sua pasta
│       ├── {projeto}.py        # Código Python do projeto
│       ├── generated/          # Arquivos gerados (.obj, .mtl)
│       └── materials/          # Materiais específicos
├── viewer3d/                   # PARTE 1: Motor de Visualização
│   ├── src/
│   │   ├── components/         # Componentes React/Vue
│   │   ├── utils/              # Utilitários (loaders OBJ/MTL)
│   │   └── types/              # Definições TypeScript
│   └── package.json
├── web/                        # PARTE 2: Interface TEXT_TO_3D
│   ├── public/                 # Static assets
│   └── src/                    # React/TypeScript code
├── src/                        # Source code (Python)
│   ├── core/                   # Core functionality
│   ├── generators/             # Model generators
│   ├── materials/              # Material definitions
│   └── utils/                  # Utilities
├── scripts/                     # Utility scripts
│   ├── dev-setup.sh            # Setup Linux/Mac
│   ├── dev-setup.ps1           # Setup Windows
│   └── setup.js                # Setup universal
├── tests/                       # Automated tests
├── docs/                        # Documentation
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
├── .husky/                      # Git hooks (Husky)
├── CODE_OF_CONDUCT.md           # Code of Conduct
├── CONTRIBUTING.md              # Contributing guidelines
├── LICENSE                      # Apache 2.0 License
├── README.md                     # This file
├── SECURITY.md                   # Security policy
├── CHANGELOG.md                  # Changelog
├── commitlint.config.js          # Commit message rules
├── package.json                  # Node.js dependencies
├── requirements.txt              # Python dependencies
└── requirements-dev.txt         # Python dev dependencies
```

---

## 🔧 Desenvolvimento

### Configurar Ambiente de Desenvolvimento

```bash
# Instale ferramentas de desenvolvimento
pip install -r requirements-dev.txt
npm install

# Configure pre-commit hooks
pre-commit install

# Execute formatação
black src/ projects/
isort src/ projects/
npm run format
```

### Conventional Commits

Este projeto utiliza **Conventional Commits** enforçado pelo **Husky**.

```bash
# ✅ Correto
git commit -m "feat(generator): adicionar suporte para portas duplas"
git commit -m "fix(materials): corrigir brilho do aço inoxidável"
git commit -m "docs(readme): atualizar instruções de instalação"

# ❌ Errado (será rejeitado)
git commit -m "update code"
git commit -m "fixes"
```

**Tipos permitidos:**

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação
- `refactor`: Refatoração
- `perf`: Performance
- `test`: Testes
- `chore`: Manutenção
- `ci`: CI/CD
- `build`: Build system

### Fazer Commits Interativos

```bash
# Use commitizen para commits guiados
npm run commit
```

---

## 🧪 Testes

### Python

```bash
# Executar todos os testes
pytest

# Com coverage
pytest --cov=src --cov-report=html

# Testes específicos
pytest tests/test_generators.py
```

### JavaScript/TypeScript

```bash
# Executar todos os testes
npm test

# Com coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

### Linting

```bash
# Python
black src/ projects/ tests/
isort src/ projects/ tests/
flake8 src/ projects/ tests/
mypy src/

# JavaScript/TypeScript
npm run lint
npm run lint:fix
```

---

## 🚢 Deploy

### Docker

```bash
# Build image
docker build -t aiexx-genai-text-to-3d:latest .

# Run container
docker run -p 8000:8000 -p 5173:5173 aiexx-genai-text-to-3d:latest
```

### Cloud Platforms

- **Vercel**: Deploy automático da web app
- **Railway**: Deploy da API FastAPI
- **AWS Lambda**: Geração serverless de modelos
- **Google Cloud Run**: Container-based deployment

---

## 🤝 Contribuindo

Contribuições são **muito bem-vindas**! Veja [CONTRIBUTING.md](CONTRIBUTING.md) para detalhes sobre:

- Como reportar bugs
- Como sugerir features
- Guia de estilo
- Processo de Pull Request
- Desenvolvimento local

### Quick Start

```bash
# 1. Fork o projeto
# 2. Crie sua feature branch
git checkout -b feat/minha-feature

# 3. Commit com Conventional Commits
git commit -m "feat(core): adicionar nova funcionalidade"

# 4. Push para o branch
git push origin feat/minha-feature

# 5. Abra um Pull Request
```

---

## 🔒 Segurança

Para reportar vulnerabilidades, veja [SECURITY.md](SECURITY.md).

**NÃO** abra issues públicas para problemas de segurança.

---

## 📄 Licença

Este projeto está licenciado sob a **Apache License 2.0** - veja [LICENSE](LICENSE) para detalhes.

```
Apache License 2.0

Copyright (c) 2025 AIEXX

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

---

## 📞 Contato

**Equipe AIEXX**

- GitHub: [@AIExxplorer](https://github.com/AIExxplorer)
- Discussions: [GitHub Discussions](https://github.com/AIExxplorer/AIEXX_GENAI_TEXT_TO_3D/discussions)
- Issues: [GitHub Issues](https://github.com/AIExxplorer/AIEXX_GENAI_TEXT_TO_3D/issues)

---

## 🙏 Agradecimentos

Este projeto é construído sobre estes incríveis projetos open-source:

- **Three.js** - Biblioteca de renderização 3D
- **React** - Biblioteca UI
- **FastAPI** - Framework web moderno
- **Hugging Face** - Modelos de IA generativa
- **Python** - Linguagem de programação
- **Blender Foundation** - Software 3D open-source

Agradecimentos especiais a:

- Comunidade Python
- Comunidade JavaScript/TypeScript
- Comunidade open-source de IA
- Todos os contribuidores

---

<div align="center">

**⭐ Se este projeto foi útil, considere dar uma estrela! ⭐**

Feito com ❤️ pela **equipe AIEXX**

**⬆ [Voltar ao Topo](#-aiexx_genai_text_to_3d)**

---

**Built with ❤️ by AIEXX** | **Powered by AI** 🤖

</div>
