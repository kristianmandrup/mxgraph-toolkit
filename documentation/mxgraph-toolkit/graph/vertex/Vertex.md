# Vertex

## create

```ts
const vertex = new Vertex(graph)
```

## set class map

set custom class map overrides

```ts
vertex.setClassMap({
  builder: MyVertexBuilder
})
```

## configureToolHandler()

Sets `createHandler` for `graph`

```ts
vertex.configureToolHandler()
```

## builder

The builder to build vertices. The default builder can build a vertex with one or more ports.

### get builder

Get builder API

```ts
vertex.builder
```

### set builder

Set builder API

```ts
vertex.setBuilder(builder)
```

## handler

Used to configure the vertex handler.

### get handler

Get handler API

```ts
vertex.handler
```

### set handler

Set handler API

```ts
vertex.setHandler(handler)
```

## anchor

Used to add anchors

### get anchor

Get anchor API

```ts
vertex.anchor
```

### set anchor

Set anchor API

```ts
vertex.setAnchor(anchor)
```

## overlay

Used to add overlays

### get overlay

Get overlay API

```ts
vertex.overlay
```

### set overlay

Set overlay API

```ts
vertex.setOverlay(overlay)
```

## handles

Used to add handles

### get handles

Get handles API

```ts
vertex.handles
```

### set handles

Set handles API

```ts
vertex.setHandles(handles)
```

## ports

Used to add ports

### get ports

Get ports API

```ts
vertex.ports
```

### set ports

Set ports API

```ts
vertex.setPorts(ports)
```

## toolHandler

Used to add toolHandler

### get toolHandler

Get toolHandler API

```ts
vertex.toolHandler
```

### set toolHandler

Set toolHandler API

```ts
vertex.setToolHandler(toolHandler)
```

