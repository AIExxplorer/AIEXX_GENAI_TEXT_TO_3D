# 🚀 Como Ver o Motor de Visualização Funcionando

## 📋 Opção 1: Servidor de Desenvolvimento (Recomendado)

### Passo 1: Navegar até a pasta do viewer3d

```bash
cd viewer3d
```

### Passo 2: Instalar dependências (se ainda não instalou)

```bash
npm install
```

### Passo 3: Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

### Passo 4: Acessar no navegador

O servidor iniciará automaticamente e abrirá o navegador em:

**http://localhost:5173**

Se não abrir automaticamente, acesse manualmente essa URL.

## 📋 Opção 2: Build de Produção

### Passo 1: Fazer build

```bash
cd viewer3d
npm run build
```

### Passo 2: Preview do build

```bash
npm run preview
```

Acesse: **http://localhost:4173**

## 🎨 O que você verá

1. **Viewer 3D Principal**: Um viewer grande exibindo o modelo "Damaged Helmet" (GLTF)
2. **Cards de Modelos**: Três cards clicáveis com diferentes modelos:
   - Damaged Helmet (GLTF)
   - Hundred Cubes (OBJ)
   - Cube Four Instances (3DS)

## 🖱️ Interações Disponíveis

- **Rotação**: Clique e arraste para rotacionar o modelo
- **Zoom**: Use a roda do mouse para dar zoom
- **Pan**: Clique com o botão direito e arraste para mover a câmera
- **Cards**: Clique nos cards para expandir/colapsar o viewer

## 🔧 Solução de Problemas

### Porta já em uso

Se a porta 5173 estiver em uso, o Vite tentará usar outra porta. Verifique o terminal para ver qual porta foi atribuída.

### Erro ao carregar modelos

Os modelos estão sendo carregados do GitHub. Se houver problemas de CORS, você pode:
1. Usar modelos locais na pasta `public/`
2. Configurar um proxy no `vite.config.ts`

### Dependências não instaladas

```bash
cd viewer3d
npm install
```

## 📝 Notas

- O servidor de desenvolvimento tem hot-reload: mudanças no código são refletidas automaticamente
- Os modelos de exemplo são carregados do repositório do Online-3D-Viewer no GitHub
- Todos os componentes são totalmente responsivos

