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

## default parent

Get the default parent (cell) of graph (all cells drawn in graph have a parent, this is the root parent)

```ts
const parent =  graph.defaultParent
```

## stylesheet

Get the graph stylesheet

```ts
const parent =  graph.stylesheet
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

## hide popup menu

```ts
graph.hidePopupMenu()
```

## set getToolTip function

```ts
graph.setGetToolTipFn((state) => string)
```

## withStylesheet

Return stylesheet wrapper

```ts
graph.withStylesheet()

// to clear existing and create new stylesheet wrapper
graph.withStylesheet(true)
```

## enable connect preview

```ts
graph.enableConnectPreview((state) => string)
```

## createVertexHandler

Create a vertex handler using `VertexToolHandler`

```ts
graph.createVertexHandler()
```


## Morph graph

Morph graph and call `onDone` callback when done with morph.

```ts
graph.morph(onDone: () => void)
```

## begin model update

Starts new graph model transaction

```ts
graph.beginUpdate
```

## end model update

Ends current graph model transaction

```ts
graph.endUpdate
```

## model transaction

Start model transaction, call `updateFn` call back and end transaction when callback returns

```ts
graph.modelTransaction(updateFn: () => void)
```

## Draw layer

Create and return a new drawlayer to draw on

```ts
const layer = graph.drawLayer

// operate on draw layer
layer.insertVertex(...)
```

## TODO

Extract all the enable/disable method into:

- separate `enable` property
- `GraphToggler` class instance backer
