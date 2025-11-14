# 🌿 Estratégia de Branches

Este documento descreve a estratégia de branches utilizada no projeto AIEXX_GENAI_TEXT_TO_3D para garantir um desenvolvimento organizado e colaborativo.

## 📋 Visão Geral

Utilizamos o modelo **Git Flow** adaptado, com branches principais e branches de suporte para diferentes tipos de trabalho.

## 🌳 Branches Principais

### `master` / `main`
- **Propósito**: Código em produção, sempre estável e pronto para deploy
- **Proteção**: ✅ Protegida (não aceita commits diretos)
- **Merge**: Apenas via Pull Request de `develop` ou `hotfix/*`
- **Regras**:
  - Nunca commitar diretamente nesta branch
  - Todo código deve passar por revisão via PR
  - Cada merge deve criar uma tag de versão

### `develop`
- **Propósito**: Branch de desenvolvimento principal, integra todas as features
- **Proteção**: ✅ Protegida (não aceita commits diretos)
- **Merge**: Apenas via Pull Request de `feature/*`, `hotfix/*` ou `release/*`
- **Regras**:
  - Deve estar sempre funcional e testável
  - Recebe merges de features completas
  - É a base para criação de novas features

## 🌿 Branches de Suporte

### `feature/*`
- **Padrão**: `feature/nome-da-feature` ou `feature/ISSUE-123-descricao`
- **Propósito**: Desenvolvimento de novas funcionalidades
- **Origem**: Sempre criada a partir de `develop`
- **Destino**: Merge de volta para `develop` via PR
- **Exemplos**:
  - `feature/text-to-3d-generator`
  - `feature/ISSUE-45-add-material-editor`
  - `feature/improve-camera-controls`

**Regras**:
- Uma feature por branch
- Nome descritivo e em inglês
- Deletar após merge
- Atualizar `develop` regularmente

### `hotfix/*`
- **Padrão**: `hotfix/nome-do-hotfix` ou `hotfix/ISSUE-456-critical-bug`
- **Propósito**: Correções urgentes de bugs em produção
- **Origem**: Criada a partir de `master`
- **Destino**: Merge para `master` e `develop`
- **Exemplos**:
  - `hotfix/memory-leak-fix`
  - `hotfix/ISSUE-78-security-patch`

**Regras**:
- Apenas para bugs críticos em produção
- Merge imediato após correção e testes
- Sempre merge também em `develop`

### `release/*`
- **Padrão**: `release/v1.2.0` ou `release/1.2.0`
- **Propósito**: Preparação de uma nova versão para produção
- **Origem**: Criada a partir de `develop`
- **Destino**: Merge para `master` e `develop`
- **Exemplos**:
  - `release/v1.0.0`
  - `release/v2.1.0-beta`

**Regras**:
- Criada quando `develop` está pronto para release
- Apenas correções de bugs e ajustes finais
- Após merge em `master`, criar tag de versão

### `bugfix/*`
- **Padrão**: `bugfix/nome-do-bug` ou `bugfix/ISSUE-123-descricao`
- **Propósito**: Correções de bugs não críticos
- **Origem**: Criada a partir de `develop`
- **Destino**: Merge de volta para `develop` via PR
- **Exemplos**:
  - `bugfix/ui-layout-issue`
  - `bugfix/ISSUE-90-typo-fix`

## 🔄 Fluxo de Trabalho

### Desenvolvendo uma Nova Feature

```bash
# 1. Atualizar develop
git checkout develop
git pull origin develop

# 2. Criar branch da feature
git checkout -b feature/nome-da-feature

# 3. Desenvolver e commitar
git add .
git commit -m "feat(scope): descrição da feature"

# 4. Push e criar PR
git push origin feature/nome-da-feature
# Criar PR no GitHub: feature/* → develop
```

### Corrigindo um Bug Crítico (Hotfix)

```bash
# 1. Criar branch do hotfix a partir de master
git checkout master
git pull origin master
git checkout -b hotfix/nome-do-hotfix

# 2. Corrigir e commitar
git add .
git commit -m "fix(scope): descrição do hotfix"

# 3. Push e criar PRs
git push origin hotfix/nome-do-hotfix
# Criar PRs: hotfix/* → master E hotfix/* → develop
```

### Preparando uma Release

```bash
# 1. Criar branch de release a partir de develop
git checkout develop
git pull origin develop
git checkout -b release/v1.2.0

# 2. Ajustes finais (version bump, changelog, etc.)
# 3. Commitar e criar PR
git push origin release/v1.2.0
# Criar PR: release/* → master
```

## ✅ Checklist para Pull Requests

Antes de criar um PR, certifique-se de:

- [ ] Branch atualizada com a branch de destino
- [ ] Código segue os padrões do projeto
- [ ] Testes passando localmente
- [ ] Documentação atualizada (se necessário)
- [ ] Commits seguem Conventional Commits
- [ ] PR template preenchido completamente
- [ ] Sem conflitos com a branch de destino

## 🚫 Regras Importantes

1. **Nunca commitar diretamente em `master` ou `develop`**
2. **Sempre criar PRs para merge**
3. **Deletar branches após merge**
4. **Manter branches atualizadas**
5. **Usar nomes descritivos para branches**
6. **Uma feature/bugfix por branch**

## 📚 Referências

- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)

