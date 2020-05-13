# VertexBuilder {

Vertex builder to build a vertex with ports

## create

```ts
const builder = new VertexBuilder(graph)
```

## add port to vertex

Adds a port (vertex) to a vertex. Each port is created with a connectable connection point.


```ts
const port = builder.createPort(vertex, props)
```
  
## add ports to vertex

Adds multiple ports (vertices) to a vertex. Each port is created with a connectable connection point.

```ts
// define ports
const ports = [
  {label, pos, size, imagePath, style, offset},
  // ...
]
// create
const ports = builder.addPortsTo(vertex, ports)
```

## create vertex

Creates a non-connectable vertex with alternate bounds.
The vertex will be made connectable via ports.

```ts
const vertex = builder.createVertex((graph, label, {pos, size, bounds, ports})
```

## protected

Creates a rectangle bounds

```ts
const bounds = builder.createAlternateBounds({pos, size})
```

