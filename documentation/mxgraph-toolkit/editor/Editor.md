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

## mxGraph

## get instance

```ts
editor.$graph
```

## Graph

### get

```ts
editor.graph
```

### set

```ts
editor.setGraph(graph)
```

With properties

```ts
editor.setGraph(graph, props)
```

## Toolbar

### get

```ts
editor.toolbar
```

### set

```ts
editor.setToolbar(toolbar)
```

With DOM element

```ts
editor.setToolbar(toolbar, toolbarElem)
```

## Sidebar

### get

```ts
editor.sidebar
```

### set

```ts
editor.setSidebar(sidebar)
```

With DOM element

```ts
editor.setSidebar(sidebar, sidebarElem)
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
