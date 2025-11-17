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
- **Tailwind CSS** - Framework CSS utility-first
- **shadcn/ui** - Componentes UI reutilizáveis baseados em Radix UI

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

**⚠️ Importante:** Antes de iniciar o frontend, certifique-se de que o backend da API está rodando na porta 8000. Veja a seção [Iniciando o Backend](#-iniciando-o-backend) abaixo.

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

Crie um arquivo `.env.local` na raiz do diretório `web/` (não será commitado):

```env
# URL base da API Backend (padrão: http://localhost:8000)
VITE_API_URL=http://localhost:8000

# Token de autenticação da API (opcional)
# VITE_API_TOKEN=your_api_token_here

# Configurações da aplicação (opcionais)
VITE_APP_NAME=AIEXX GENAI TEXT_TO_3D
VITE_APP_VERSION=1.0.0
NODE_ENV=development
```

### Iniciando o Backend

Para que o frontend funcione corretamente, você precisa iniciar o backend da API primeiro:

```bash
# Na raiz do projeto, ative o ambiente virtual (se necessário)
# Windows PowerShell:
.\venv\Scripts\Activate.ps1

# Linux/Mac:
source venv/bin/activate

# Inicie a API
uvicorn src.api.main:app --reload --host 0.0.0.0 --port 8000

# Ou use o script fornecido:
# Windows:
.\scripts\start-api.ps1

# Linux/Mac:
./scripts/start-api.sh
```

A API estará disponível em `http://localhost:8000` e a documentação Swagger em `http://localhost:8000/docs`.

**Nota:** Se a API não estiver rodando, você verá uma mensagem de erro clara informando que não foi possível conectar ao servidor.

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
- `@/lib` → `src/lib/`
- `@/hooks` → `src/hooks/`

### Tailwind CSS e shadcn/ui

O projeto utiliza **Tailwind CSS** para estilização e **shadcn/ui** para componentes UI reutilizáveis.

#### Adicionar componentes do shadcn/ui

Para adicionar novos componentes do shadcn/ui, use o CLI:

```bash
# Instalar o CLI do shadcn/ui globalmente (se ainda não tiver)
npm install -g shadcn-ui

# Adicionar um componente específico
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
```

Ou adicione manualmente copiando os componentes de [shadcn/ui](https://ui.shadcn.com/docs/components).

#### Usar componentes

```typescript
import { Button } from '@/components/ui/button';

function MyComponent() {
  return (
    <Button variant="default" size="lg">
      Clique aqui
    </Button>
  );
}
```

#### Utilitários

Use a função `cn()` para combinar classes CSS de forma segura:

```typescript
import { cn } from '@/lib/utils';

<div className={cn('base-class', condition && 'conditional-class')} />
```

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

