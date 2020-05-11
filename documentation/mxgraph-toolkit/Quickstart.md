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
const { Editor } = editor
const app = {
  editor: new Editor(
    // ...
  ),
  // ...
}
```

Use the fluent API to build your Diagram editor

```ts
const { graph } = app.editor
const { draw } = graph.vertex
draw.insertVertex(
  // ...
).insertEdge(
  // ...
)
```


## Toolkit

- [Actions](./Actions.md)
- [Anchors](./Anchors.md)
- [Animation](./Animation.md)