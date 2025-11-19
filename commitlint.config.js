/**
 * Commitlint Configuration
 * Enforces Conventional Commits specification
 * 
 * @see https://commitlint.js.org/
 * @see https://www.conventionalcommits.org/
 */

export default {
  extends: ['@commitlint/config-conventional'],
  
  rules: {
    // Type enum - allowed commit types
    'type-enum': [
      2,
      'always',
      [
        'feat',      // New feature
        'fix',       // Bug fix
        'docs',      // Documentation only
        'style',     // Formatting (no code change)
        'refactor',  // Code refactoring
        'perf',      // Performance improvement
        'test',      // Adding tests
        'chore',     // Maintenance tasks
        'ci',        // CI/CD changes
        'build',     // Build system changes
        'revert',    // Revert previous commit
      ],
    ],
    
    // Scope enum - optional, but when used must be from this list
    'scope-enum': [
      1,
      'always',
      [
        'core',        // Core functionality
        'generator',   // Model generators
        'materials',   // Material definitions
        'utils',       // Utilities
        'web',         // Web application
        'api',         // API endpoints
        'ui',          // UI components
        'docs',        // Documentation
        'tests',       // Test files
        'config',      // Configuration
        'deps',        // Dependencies
        'security',    // Security fixes
      ],
    ],
    
    // Subject must not be empty
    'subject-empty': [2, 'never'],
    
    // Subject must not end with period
    'subject-full-stop': [2, 'never', '.'],
    
    // Subject must be lowercase (disabled for Portuguese)
    'subject-case': [0],
    
    // Type must be lowercase
    'type-case': [2, 'always', 'lower-case'],
    
    // Scope must be lowercase
    'scope-case': [2, 'always', 'lower-case'],
    
    // Max header length
    'header-max-length': [2, 'always', 100],
    
    // Body should start with blank line
    'body-leading-blank': [1, 'always'],
    
    // Footer should start with blank line
    'footer-leading-blank': [1, 'always'],
  },
  
  // Custom rules
  prompt: {
    settings: {},
    messages: {
      skip: ':skip',
      max: 'máximo %d caracteres',
      min: 'mínimo %d caracteres',
      emptyWarning: 'não pode estar vazio',
      upperLimitWarning: 'acima do limite',
      lowerLimitWarning: 'abaixo do limite',
    },
    questions: {
      type: {
        description: "Selecione o tipo de mudança que você está commitando:",
        enum: {
          feat: {
            description: 'Nova funcionalidade',
            title: 'Features',
            emoji: '✨',
          },
          fix: {
            description: 'Correção de bug',
            title: 'Bug Fixes',
            emoji: '🐛',
          },
          docs: {
            description: 'Apenas documentação',
            title: 'Documentation',
            emoji: '📚',
          },
          style: {
            description: 'Formatação, ponto e vírgula, etc',
            title: 'Styles',
            emoji: '💎',
          },
          refactor: {
            description: 'Refatoração de código',
            title: 'Code Refactoring',
            emoji: '📦',
          },
          perf: {
            description: 'Melhoria de performance',
            title: 'Performance Improvements',
            emoji: '🚀',
          },
          test: {
            description: 'Adição ou correção de testes',
            title: 'Tests',
            emoji: '🚨',
          },
          chore: {
            description: 'Manutenção e tarefas de build',
            title: 'Chores',
            emoji: '♻️',
          },
          ci: {
            description: 'Mudanças em CI/CD',
            title: 'Continuous Integration',
            emoji: '⚙️',
          },
          build: {
            description: 'Mudanças no sistema de build',
            title: 'Builds',
            emoji: '🛠',
          },
          revert: {
            description: 'Reverter commit anterior',
            title: 'Reverts',
            emoji: '🗑',
          },
        },
      },
      scope: {
        description: 'Qual é o escopo desta mudança (ex: componente ou arquivo)?',
      },
      subject: {
        description: 'Escreva uma descrição curta e imperativa da mudança:',
      },
      body: {
        description: 'Forneça uma descrição mais detalhada da mudança:',
      },
      isBreaking: {
        description: 'Existem mudanças que quebram compatibilidade (breaking changes)?',
      },
      breakingBody: {
        description: 'Um commit com BREAKING CHANGE requer um corpo. Por favor, forneça uma descrição mais longa do próprio commit:',
      },
      breaking: {
        description: 'Descreva as breaking changes:',
      },
      isIssueAffected: {
        description: 'Esta mudança afeta alguma issue aberta?',
      },
      issuesBody: {
        description: 'Se as issues são fechadas, o commit requer um corpo. Por favor, forneça uma descrição mais longa do próprio commit:',
      },
      issues: {
        description: 'Adicione referências às issues (ex: "fix #123", "re #456"):',
      },
    },
  },
};





