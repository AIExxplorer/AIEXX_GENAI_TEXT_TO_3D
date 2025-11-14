# 🚀 Guia de Configuração do Repositório no GitHub

Este guia ajuda a configurar o repositório no GitHub após o push inicial.

## 📝 Configurar Descrição e Tags

### Passo 1: Acessar Configurações do Repositório

1. Vá para: https://github.com/AIExxplorer/AIEXX_GENAI_TEXT_TO_3D
2. Clique em **Settings** (Configurações)
3. Role até a seção **General**

### Passo 2: Adicionar Descrição

Na seção **Description**, adicione:

```
Pipeline completo para geração de modelos 3D a partir de texto usando IA generativa - Motor de visualização 3D independente e aplicação web/mobile
```

### Passo 3: Adicionar Tópicos/Tags

Na seção **Topics**, adicione as seguintes tags (uma por vez ou separadas por vírgula):

```
3d-generation, artificial-intelligence, generative-ai, text-to-3d, threejs, react, typescript, python, fastapi, huggingface, 3d-models, procedural-generation, webgl, 3d-visualization, machine-learning, deep-learning, computer-vision, 3d-rendering, obj-exporter, pbr-materials, open-source
```

**Tags principais (prioridade):**
- `3d-generation`
- `artificial-intelligence`
- `text-to-3d`
- `threejs`
- `python`
- `react`
- `typescript`
- `huggingface`
- `procedural-generation`
- `open-source`

### Passo 4: Configurar Branch Padrão

1. Em **Settings** > **Branches**
2. Defina `develop` como branch padrão para desenvolvimento
3. Configure proteção de branches:
   - **`master`**: Protegida (requer PR, revisão obrigatória)
   - **`develop`**: Protegida (requer PR)

### Passo 5: Configurar Proteção de Branches

Para cada branch (`master` e `develop`):

1. Vá em **Settings** > **Branches**
2. Clique em **Add rule** ou edite a regra existente
3. Configure:
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Do not allow bypassing the above settings
   - ✅ Restrict pushes that create matching branches

### Passo 6: Configurar Templates

Os templates já estão configurados no repositório:
- ✅ `.github/PULL_REQUEST_TEMPLATE.md` - Template de Pull Request
- ✅ `.github/ISSUE_TEMPLATE/` - Templates de Issues
- ✅ `.github/BRANCH_STRATEGY.md` - Estratégia de Branches

### Passo 7: Configurar GitHub Actions

Os workflows já estão configurados em `.github/workflows/`:
- ✅ `ci.yml` - CI/CD pipeline
- ✅ `release.yml` - Release automation
- ✅ `update-readme.yml` - README updates

## ✅ Checklist de Configuração

- [ ] Descrição do repositório adicionada
- [ ] Tags/Tópicos adicionados
- [ ] Branch padrão configurada (`develop`)
- [ ] Proteção de branches configurada (`master` e `develop`)
- [ ] Templates verificados e funcionando
- [ ] GitHub Actions habilitados
- [ ] README.md atualizado e visível
- [ ] LICENSE visível no repositório
- [ ] CONTRIBUTING.md linkado no README

## 📚 Documentação de Referência

- [Estratégia de Branches](.github/BRANCH_STRATEGY.md)
- [Informações do Repositório](.github/REPOSITORY_INFO.md)
- [Guia de Contribuição](../CONTRIBUTING.md)

## 🔗 Links Úteis

- [GitHub Docs - Repository Settings](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features)
- [GitHub Docs - Branch Protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches)
- [GitHub Docs - Topics](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/classifying-your-repository-with-topics)

