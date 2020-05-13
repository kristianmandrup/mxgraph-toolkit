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

## execute

Execute action in `editor`. To be used by toolbar button.

```ts
execute(action)
```

## items

### get items manager

```ts
const { items } = toolbar
items.add({
  // ...
})
```

### set items manager

TODO

## buttons

### get buttons manager

```ts
const { buttons } = toolbar
buttons.add({
  // ...
})
```

### set buttons manager

TODO