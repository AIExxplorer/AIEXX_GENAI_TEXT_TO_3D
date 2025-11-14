# 🌐 Web Application - AIEXX GENAI TEXT_TO_3D

Interface web moderna para geração de modelos 3D a partir de texto usando IA generativa.

## 🚀 Tecnologias

- **React 18** - Biblioteca UI
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool ultra-rápido
- **React Router** - Roteamento
- **Axios** - Cliente HTTP
- **Three.js** - Visualização 3D
- **Zustand** - Gerenciamento de estado

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Ou usando yarn
yarn install

# Ou usando pnpm
pnpm install
```

## 🛠️ Scripts Disponíveis

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# A aplicação estará disponível em: http://localhost:5173
```

### Build

```bash
# Criar build de produção
npm run build

# Os arquivos serão gerados em: dist/
```

### Preview

```bash
# Preview do build de produção localmente
npm run preview

# A aplicação estará disponível em: http://localhost:4173
```

### Qualidade de Código

```bash
# Verificar tipos TypeScript
npm run type-check

# Linting
npm run lint

# Corrigir problemas de lint automaticamente
npm run lint:fix

# Formatação de código
npm run format

# Verificar formatação
npm run format:check
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` (não será commitado):

```env
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=AIEXX_GENAI_TEXT_TO_3D
VITE_APP_VERSION=1.0.0
NODE_ENV=development
```

### Path Aliases

O projeto usa aliases de caminho para facilitar imports:

```typescript
// Em vez de:
import Component from '../../../components/Component'

// Use:
import Component from '@components/Component'
```

Aliases disponíveis:
- `@/` → `src/`
- `@components/` → `src/components/`
- `@api/` → `src/api/`
- `@utils/` → `src/utils/`
- `@types/` → `src/types/`

## 📁 Estrutura do Projeto

```
web/
├── public/          # Arquivos estáticos
├── src/
│   ├── api/         # Cliente API e serviços
│   ├── components/   # Componentes React
│   ├── utils/        # Funções utilitárias
│   ├── types/        # Definições TypeScript
│   ├── App.tsx       # Componente principal
│   ├── main.tsx      # Ponto de entrada
│   └── index.css     # Estilos globais
├── index.html        # HTML principal
├── package.json      # Dependências e scripts
├── vite.config.ts    # Configuração do Vite
└── tsconfig.json     # Configuração TypeScript
```

## 🚢 Deploy no Vercel

O projeto está configurado para deploy automático no Vercel.

### Configuração no Vercel

1. Conecte o repositório GitHub ao Vercel
2. Configure as variáveis de ambiente no Vercel Dashboard
3. O deploy será automático a cada push

### Variáveis de Ambiente no Vercel

Configure no Vercel Dashboard:
- `VITE_API_URL` - URL da API backend
- `NODE_ENV` - Ambiente (production)
- `VITE_APP_NAME` - Nome da aplicação (opcional)
- `VITE_APP_VERSION` - Versão (opcional)

## 📚 Documentação

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vite.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Three.js Documentation](https://threejs.org/docs/)

## 🤝 Contribuindo

Veja [CONTRIBUTING.md](../../CONTRIBUTING.md) para mais informações.

## 📄 Licença

Apache 2.0 - Veja [LICENSE](../../LICENSE) para detalhes.

