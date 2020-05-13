# Actions

## create

```ts
const actions = new Actions(graph)

// with custom class map and container map
const actions = new Actions(graph, { classMap, containerMap })
```

## setClassMap

```ts
actions.setClassMap(classMap)
```

## zoom API

### get zoom

get zoom API instance

```ts
actions.zoom
```

### set zoom

Set zoom API instance

```ts
actions.setZoom(zoom)

// with container
actions.setZoom(zoom, containerElem)
```

## undo manager API

### get undo manager

get undo manager API instance

```ts
actions.undoManager
```

### set undo manager

Set undo manager API instance

```ts
actions.setUndoManager(undoManager)

// with container
actions.setUndoManager(undoManager, containerElem)
```