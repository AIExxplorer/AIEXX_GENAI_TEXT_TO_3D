# 🎨 Motor de Visualização 3D

Motor independente para visualização de arquivos 3D (OBJ, MTL) com suporte a drag & drop.

## 🚀 Funcionalidades

- ✅ Visualização de arquivos OBJ/MTL
- ✅ Wireframe de referência (X, Y, Z)
- ✅ Controles de câmera (perspectiva, top, side, front, back)
- ✅ Drag & drop de arquivos
- ✅ Leitura de malhas 3D e texturas
- ✅ Compatível com Web e Mobile

## 📦 Instalação

```bash
cd viewer3d
npm install
```

## 🛠️ Desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:5173` no navegador.

## 🏗️ Build

```bash
npm run build
```

## 📁 Estrutura

```
viewer3d/
├── src/
│   ├── components/     # Componentes React/Vue
│   ├── utils/          # Utilitários (loaders OBJ/MTL)
│   ├── types/          # Definições TypeScript
│   └── index.ts        # Entry point
├── public/             # Arquivos estáticos
└── package.json
```

