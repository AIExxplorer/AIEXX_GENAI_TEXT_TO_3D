# Contributing to AIEXX_GENAI_TEXT_TO_3D

Obrigado por considerar contribuir com o AIEXX_GENAI_TEXT_TO_3D! 🎉

## 📋 Tabela de Conteúdos

- [Code of Conduct](#code-of-conduct)
- [Como Posso Contribuir?](#como-posso-contribuir)
- [Estratégia de Branches](#estratégia-de-branches)
- [Guia de Estilo](#guia-de-estilo)
- [Processo de Commit](#processo-de-commit)
- [Processo de Pull Request](#processo-de-pull-request)
- [Desenvolvimento Local](#desenvolvimento-local)

## 📜 Code of Conduct

Este projeto adere ao [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). Ao participar, espera-se que você cumpra este código.

## 🤝 Como Posso Contribuir?

### Reportando Bugs

Antes de criar um relatório de bug, verifique se já não existe uma issue similar. Se você encontrar uma issue aberta relacionada, adicione um comentário em vez de abrir uma nova.

**Ao criar um relatório de bug, inclua:**

- Um título claro e descritivo
- Passos detalhados para reproduzir o problema
- Comportamento esperado vs comportamento atual
- Capturas de tela (se aplicável)
- Versão do Python/Node.js
- Sistema operacional

### Sugerindo Melhorias

Melhorias são sempre bem-vindas! Abra uma issue com:

- Um título claro e descritivo
- Descrição detalhada da funcionalidade sugerida
- Por que essa funcionalidade seria útil
- Exemplos de uso (se possível)

### Pull Requests

1. Faça fork do repositório
2. Atualize a branch `develop`: `git checkout develop && git pull origin develop`
3. Crie uma branch para sua feature seguindo a [Estratégia de Branches](.github/BRANCH_STRATEGY.md):
   - Features: `git checkout -b feature/nome-da-feature`
   - Bugs: `git checkout -b bugfix/nome-do-bug`
   - Hotfixes críticos: `git checkout -b hotfix/nome-do-hotfix` (a partir de `master`)
4. Faça commit das suas mudanças seguindo o [Conventional Commits](#processo-de-commit)
5. Faça push para a branch (`git push origin feature/nome-da-feature`)
6. Abra um Pull Request para `develop` (ou `master` se for hotfix)

**📚 Leia mais sobre nossa estratégia de branches em [.github/BRANCH_STRATEGY.md](.github/BRANCH_STRATEGY.md)**

## 🌿 Estratégia de Branches

Este projeto utiliza uma estratégia de branches baseada no **Git Flow** para garantir desenvolvimento organizado e colaborativo.

### Branches Principais

- **`master`**: Código em produção, sempre estável
- **`develop`**: Branch de desenvolvimento principal

### Branches de Suporte

- **`feature/*`**: Novas funcionalidades (ex: `feature/text-to-3d-generator`)
- **`bugfix/*`**: Correções de bugs não críticos (ex: `bugfix/ui-layout-issue`)
- **`hotfix/*`**: Correções urgentes de produção (ex: `hotfix/security-patch`)
- **`release/*`**: Preparação de versões (ex: `release/v1.2.0`)

### Regras Importantes

1. ✅ **Nunca commitar diretamente em `master` ou `develop`**
2. ✅ **Sempre criar PRs para merge**
3. ✅ **Deletar branches após merge**
4. ✅ **Manter branches atualizadas com a branch de destino**

**📚 Documentação completa:** [.github/BRANCH_STRATEGY.md](.github/BRANCH_STRATEGY.md)

## 🎨 Guia de Estilo

### Python

```python
"""
Docstring no formato Google Style.

Args:
    param1: Descrição do parâmetro
    param2: Descrição do parâmetro

Returns:
    Descrição do retorno

Raises:
    ExceptionType: Quando ocorre
"""
```

**Convenções:**
- Use 4 espaços para indentação (não tabs)
- Limite linhas a 88 caracteres (Black formatter)
- Use type hints sempre que possível
- Nomes de funções e variáveis em `snake_case`
- Nomes de classes em `PascalCase`
- Constantes em `UPPER_CASE`

### TypeScript/JavaScript

```typescript
/**
 * Descrição da função
 * @param param1 - Descrição do parâmetro
 * @param param2 - Descrição do parâmetro
 * @returns Descrição do retorno
 */
```

**Convenções:**
- Use 2 espaços para indentação
- Use TypeScript com tipos explícitos
- Nomes de funções e variáveis em `camelCase`
- Nomes de componentes React em `PascalCase`
- Nomes de constantes em `UPPER_CASE`
- Use interfaces em vez de types para objetos

## 📝 Processo de Commit

Utilizamos [Conventional Commits](https://www.conventionalcommits.org/) com **Husky** para garantir consistência.

### Formato

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: Nova funcionalidade
- **fix**: Correção de bug
- **docs**: Alterações na documentação
- **style**: Formatação (não afeta o código)
- **refactor**: Refatoração de código
- **perf**: Melhoria de performance
- **test**: Adição ou correção de testes
- **chore**: Tarefas de manutenção
- **ci**: Mudanças em CI/CD
- **build**: Mudanças no sistema de build

### Exemplos

```bash
feat(generator): adicionar suporte para portas gradeadas

Implementa a geração de portas com grade vazada
e moldura estrutural rotacionável.

Closes #123
```

```bash
fix(materials): corrigir brilho do material de aço inoxidável

O valor Ns estava muito baixo, causando aparência fosca.
Ajustado de 85 para 180.
```

```bash
docs(readme): atualizar instruções de instalação

Adiciona seção sobre dependências do sistema e 
comandos para diferentes plataformas.
```

### Husky

O Husky está configurado para validar automaticamente seus commits. Se seu commit não seguir o padrão, ele será rejeitado.

## 🔄 Processo de Pull Request

### Checklist

Antes de submeter um PR, certifique-se de que:

- [ ] O código segue o guia de estilo do projeto
- [ ] Comentários foram adicionados onde necessário
- [ ] Documentação foi atualizada (se aplicável)
- [ ] Testes foram adicionados/atualizados (se aplicável)
- [ ] Todos os testes passam localmente
- [ ] Commits seguem o Conventional Commits
- [ ] Branch está atualizada com `develop` (ou `master` se for hotfix)
- [ ] Branch segue o padrão de nomenclatura (`feature/*`, `bugfix/*`, `hotfix/*`)

### Descrição do PR

Inclua na descrição:

- Resumo das mudanças
- Motivação e contexto
- Como foi testado
- Tipos de mudanças (bug fix, feature, breaking change)
- Checklist marcada

### Review

- Pelo menos 1 aprovação é necessária
- CI/CD deve passar
- Sem conflitos com a branch principal

## 🛠️ Desenvolvimento Local

### Pré-requisitos

```bash
# Python 3.8+
python --version

# Node.js 18+
node --version

# Git
git --version
```

### Configuração Inicial

```bash
# Clone o repositório
git clone https://github.com/AIExxplorer/AIEXX_GENAI_TEXT_TO_3D.git
cd AIEXX_GENAI_TEXT_TO_3D

# Crie um ambiente virtual Python
python -m venv venv

# Ative o ambiente virtual
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

# Instale dependências Python
pip install -r requirements.txt

# Instale dependências Node.js
npm install
```

### Executando Testes

```bash
# Testes Python
pytest

# Testes JavaScript/TypeScript
npm test

# Coverage
pytest --cov
npm run test:coverage
```

### Executando Localmente

```bash
# Gerar modelo 3D
python src/main.py

# Iniciar servidor web
cd web
npm run dev
```

## 🏗️ Estrutura do Projeto

```
AIEXX_GENAI_TEXT_TO_3D/
├── projects/         # Projetos 3D organizados
│   └── {nome_projeto}/
│       ├── {projeto}.py
│       ├── generated/
│       └── materials/
├── viewer3d/         # PARTE 1: Motor de Visualização
│   └── src/
├── web/              # PARTE 2: Interface TEXT_TO_3D
│   └── src/
├── src/              # Código fonte Python
│   ├── core/         # Funcionalidades core
│   ├── generators/   # Geradores de geometria
│   ├── materials/    # Definições de materiais
│   └── utils/        # Utilitários
├── tests/            # Testes automatizados
├── docs/             # Documentação
└── scripts/          # Scripts utilitários
```

## 📚 Recursos Adicionais

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Python PEP 8](https://pep8.org/)
- [Google Python Style Guide](https://google.github.io/styleguide/pyguide.html)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

## 🙏 Agradecimentos

Obrigado por contribuir com o AIEXX_GENAI_TEXT_TO_3D! Cada contribuição ajuda a tornar este projeto melhor para todos.

## 📧 Contato

Dúvidas? Abra uma issue ou entre em contato através do [Discussions](https://github.com/AIExxplorer/AIEXX_GENAI_TEXT_TO_3D/discussions).

---

**Feliz codificação!** 🚀

