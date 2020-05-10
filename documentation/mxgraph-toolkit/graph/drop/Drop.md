# Drop

```ts
const drop = new Drop(graph)
```

## Set type of drop target functionality

Set custom function to indicate if target cell is a valid drop target

```ts
setIsValidDropTarget((cell) => {
  // some conditions
  // return true

  return false
})
```

Make swimlanes valid drop targets, using built in map of drop target validation functions

```ts
drop.dropsetIsValidDropTargetByName('swimlane')
```

To customize the internal map of predefined drop target functions, extend `Drop` and implement your own `validDropTargetFnMap` function that returns such as map.
