# GroupSelection

## create

```ts
const groupSelection = new GroupSelection(graph)
```

## init

Configure handlers with prototype methods

- `graphHandler`
- `popupHandler`

```ts
groupSelection.init()
```

## popupHandler

prototype methods:

- `getCellForPopupEvent`

### getCellForPopupEvent

Returns last selected ancestor  

## graphHandler

prototype methods:

- `mouseDown`
- `getInitialCellForEvent`
- `isDelayedSelection`
- `selectDelayed`

### mouseDown

Don't clear selection if multiple cells selected

### getInitialCellForEvent

Selects descendants before children selection mode

### isDelayedSelection  

Selection is delayed to mouseup if child selected

### selectDelayed

Delayed selection of parent group
