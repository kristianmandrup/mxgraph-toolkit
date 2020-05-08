# Graph

Encapsulates a mxgraph Graph and operations and configurations related to the Graph.

## static methods

### create graph

Creates mxgraph graph instance based on container element

```ts
const $graph = Graph.createGraphWithModel(container)
```

```ts
const model = new mxGraphModel({
  // ...
});
const $graph = Graph.createGraphWithModel(container)
```

### create graph container element

```ts
const pos = {x: 24, y: 60}
const graphContainerElem = Graph.createGraphDOMElement({pos})
```

With custom background

```ts
const graphContainerElem = Graph.createGraphDOMElement({pos, background: 'silver'})
```

The background can also be a reference to an image (f.ex a grid), such as: `url("images/grid.gif")`

## instance methods

## create

```ts
const graph = new Graph(graph)
```

## editing

Returns or creates `Editing` instance for graph.
See [Editing API](./Editing.md)

```ts
graph.editing.getFieldnameForEvent(cell, evt)
```

## groups

See [Group API](./Group.md)

```ts
graph.createGroup('My group', 'model')
```

## model

Retrieve graph model

```ts
graph.model
```

## Enable/Disable drop

```ts
graph,setDropEnabled(true)
```

## Enable/Disable split

```ts
graph.setSplitEnabled(true)
```

## Enable/Disable resize container

```ts
graph.setResizeContainerEnabled(true)
```

## Enable/Disable allow loops

```ts
graph.setAllowLoops(true)
```

## Enable/Disable folding

```ts
graph.setFoldingEnabled(true)
```

## Enable/Disable recursive resizing

```ts
graph.setRecursiveResizeEnabled(true)
```

## Enable/Disable if cells are disconnectable

```ts
graph.setCellsDisconnectable(true)
```

## Enable/Disable dangling edges

Dangling edges are edges not fully connected

```ts
graph.setAllowDanglingEdges(true)
```

## Enable/Disable editable cells

Set if cells can be edited

```ts
graph.setCellsEditable(true)
```

## Enable/Disable center zoom

```ts
graph.setCenterZoom(true)
```

## Enable/Disable guides

```ts
graph.setGuidesEnabled(true)
```

## Enable/Disable snap edges to terminals

```ts
graph.setSnapToTerminals(true)
```

## Draw layer

Create and return a new drawlayer to draw on

```ts
const layer = graph.drawLayer

// operate on draw layer
layer.insertVertex(...)
```
