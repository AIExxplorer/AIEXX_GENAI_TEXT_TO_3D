# 🎨 Motor de Visualização 3D - Viewer3D

Motor de visualização 3D independente baseado no [Online-3D-Viewer](https://github.com/kovacsv/Online3DViewer) para visualizar arquivos OBJ/MTL e outros formatos 3D.

## 📦 Instalação

```bash
npm install
```

## 🚀 Uso

### Componente Viewer3D

```tsx
import { Viewer3D } from '@aiexx/viewer3d';
import type { ModelInfo } from '@aiexx/viewer3d';

const model: ModelInfo = {
  name: 'Meu Modelo',
  urls: ['model.obj', 'model.mtl'],
  description: 'Descrição do modelo',
};

function App() {
  return (
    <Viewer3D 
      model={model} 
      width="100%" 
      height="500px"
    />
  );
}
```

### Componente ModelCard

```tsx
import { ModelCard } from '@aiexx/viewer3d';

function App() {
  return (
    <ModelCard 
      model={model}
      showViewer={true}
      onClick={(model) => console.log('Modelo clicado:', model)}
    />
  );
}
```

## 🛠️ Desenvolvimento

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Preview
npm run preview

# Lint
npm run lint
```

## 📚 Documentação

- [Online-3D-Viewer Documentation](https://kovacsv.github.io/Online3DViewer/)
- [GitHub Repository](https://github.com/kovacsv/Online3DViewer)

## 🎯 Formatos Suportados

- **Import**: OBJ, MTL, GLTF, GLB, 3DS, STL, PLY, e mais
- **Export**: OBJ, GLTF, STL, PLY

## 📝 Licença

Apache-2.0
