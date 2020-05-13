# Sidebar

## create

```ts
const sidebar = new Sidebar()
```

## add sidebar icon

```ts
sidebar.addSidebarIcon(graph, label: string, image, props)
```

## create on drag handler

Create on drag handler that creates a vertex with ports

```ts
sidebar.createOnDrag(label, {createPorts, createVertex, vertexSize, ports})
```

## TODO

The following is general and should be extracted to vertex

## create vertex

Creates a vertex

```ts
sidebar.createVertex(graph, label, pos, size)
```

## Ports

## create port on vertex

```ts
sidebar.createPort(vertex, props)
```

## create ports on vertex

```ts
const ports = [
  { 
    label, 
    size, 
    pos, 
    style, 
    imagePath, 
    offset 
  }
]
sidebar.createPorts(vertex, ports)
```


## protected

### port props for

Used by `createPorts`

```ts
sidebar.portPropsFor(props)
```
