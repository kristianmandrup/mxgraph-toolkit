# mxgraph-toolkit quickstart

Import the toolkit

```ts
import * as toolkit from 'mxgraph-toolkit'
```

Extract parts of API you want to use

```ts
const { editor, graph, io } = toolkit
```

Create your app

```ts
const app = new App()
```

Use fluent API to build your Diagram editor

```ts
const { graph, toolbar } = app.editor

// configure default size and styling of toolbar buttons
toolbar.toolbarItem.defaults.button = {
  size: {
    width: 36,
    height: 36
  }, 
  style: {
    padding: 4
  }
}

// add toolbar buttons
editor.addToolbarButtons({
  label: 'rectangle',
  action: 'rectangle', // executed in editor
  image: 'images/rectangle.png',
  props: {
    // ...
  }
})

// switch on/off graph functionality to suit your needs
graph.switch({
  panning: true,
  folding: true,
  guides: false
})
```

## Draw cells on graph

For API details, see: 

- [Vertex API](./graph/vertex/_TOC.md)
- [Edge API](./graph/vertex/_TOC.md)

Create a draw layer

```ts
const { draw } = graph.vertex
```

Draw vertices and edges on layer

```ts
draw.insertVertex(
  // ...
).insertEdge(
  // ...
)
```

The diagram editor supports using multiple layers (see [Layers API](./graph/layers/_TOC.md))

## Toolkit API

See [Toolkit API](./_TOC.md) for an in-depth guide to the API.
