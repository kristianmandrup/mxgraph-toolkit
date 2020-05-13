# Toolbar

## create

```ts
const toolbar = new Toolbar(graph, toolbarElem)
```

```ts
Toolbar.create(graph, toolbarElem)
```

## createToolbarElement

```ts
pos = {
  left: 10, 
  top: 36
}

style = {
  padding: 6
}
toolbar.createToolbarElement(pos, style)
```  

## createToolbarForElement

```ts
toolbar.createToolbarForElement()

// with element
toolbar.createToolbarForElement(containerElem)
```

## setToolbar

Set `mxToolbar` instance

```ts
toolbar.setToolbar($mxtoolbar)
```

## setToolbarForElement

```ts
toolbar.setToolbarForElement(container)
```

## addVertex

Adds a toolbar item with a vertex attached. This allows the vertex to be drawn on the graph when the toolbar item is dragged onto the graph.

```ts
toolbar.addVertex(name, icon, { size, pos, style})
```

## toolbar item

### get toolbar item

```ts
toolbar.getToolbarItem(name)
```

### addToolbarItem

```ts
toolbar.addToolbarItem(cellPrototype: any, image: any)
```

### addToolbarItems

```ts
toolbar.addToolbarItems(itemMap)
```

## addToolbarButtons

```ts
toolbar.addToolbarButtons(itemMap)
```
