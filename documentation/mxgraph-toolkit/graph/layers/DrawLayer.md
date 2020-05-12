# DrawLayer

Draw API for an mxGraph layer

## create

```ts
const draw = new DrawLayer(graph, layer)
```

## get/create from layer

```ts
const draw = layers.draw(name)
```

## insert vertex

Map of named layers

```ts
layers.insertVertex('x', {x: 10, y: 20}, {width: 30, height: 30}, 'shape=rectangle')
```

Using detailed vertex specification

```ts
// vertex geometry object
const geometry = {
  offset: new mxPoint(midX, midY),
  x: 80,
  y: 60
}
draw.insertVertex(labelOrValue, pos, size, style, {constituent: true, id: 'x1', relative: false, geometry})
```

## insert edge

```ts
draw.insertEdge(labelOrValue, fromVertex, toVertex, style, {id, relative, points})
```

Concrete example

```ts
draw.insertEdge('e1', v1, v2, 'color=blue', {id: 'e_1', relative: true, points})
```