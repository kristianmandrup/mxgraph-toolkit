# Editor

The `Editor` encapsulated the main graphical editor, including:

- Toolbars (palette)
- Graph
- Sidebar
- ...

The `Editor` is the main container for the Diagram application, which hosts and coordinates all the actions and interactions between the main entities.

## create

```ts
// create the graph
const container = document.getElementById('#graph')
const graph = new Graph(container)

// create editor with the graph
const editor = new Editor(graph)

// add more to the editor, such as toolbars etc...
```

## container map

```ts
editor.setContainerMap({
  graph: getElem('graph'),
})

const { graph, toolbar } = editor.containers
```

## graph

```ts
editor.graph
```

## set default group

```ts
editor.setDefaultGroup(group)
```

## configure

```ts
editor.configure(config)
```

## Fluent API

The API is fluent

```ts
editor.setDefaultGroup(group).configure(config).setContainerMap()
```
