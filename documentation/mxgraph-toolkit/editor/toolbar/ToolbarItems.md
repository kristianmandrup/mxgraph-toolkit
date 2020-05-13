# ToolbarItem

## Create

```ts
const items = new ToolbarItems(graph, toolbar)
```

## toolbar items

### add item

Adds a toolbar item. Also adds an entry to the `itemMap` for the `label` key.
This can be used to retrieve the item by label and modify the item if needed.

```ts
items.add(cellPrototype, image, 'rectangle', {title: 'Rectangle'})
```

### get item

```ts
const item = items.get('rectangle')
```

### set item

This will set an item, directly in `itemMap` for the given label key.
It will also make the item draggable so it can be dragged to the graph to create a cell (vertex or edge).

```ts
items.set('rectangle', item)
```

### make item draggable

Makes a toolbar item draggable

```ts
items.makeDraggable({dragIconImg, onDropItem})
```

### add item map

Add items using a map where each entry is a toolbar item definition object

```ts
const itemMap = {
  rectangle: {
    cell: rectCell
    image: 'images/rect.png' // or icon (alias)
  },
  // ...
}
items.addMap(itemMap)
```

## protected

### get toolbar spacer

Get spacer element for toolbar. Used when adding toolbar buttons.

```ts
items.spacer
```
