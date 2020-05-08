# Cell

API used to operate on cells (vertices and edges) the primitive graph entities.

## Create

```ts
const cellApi = new Cell(graph)
```

## isPart

Tests if cell is part of graph.

```ts
const isInGraph: boolean = cell.isPart(cell)
```

## cell visibility

Set function to determine cell visibility.

```ts
graph.setIsCellVisible((cell): true => {
  // ...
  return isVisible
})
```

## Detail level

Set at what detail level the cell should display

```ts
cellApi.setDetailLevel(2)
```

Set special cell style property to indicate cell is a constituent cell (ie. part of another cell)

## Constituent cells

```ts
cellApi.setIsConstituent(cell)
```

Select parent cell when cell is selected (making the cell fully a constituent cell)

```ts
cellApi.redirectSelectionToParent(cell)
```

## Fluent API

The API is fluent

```ts
cellApi.setIsConstituent(cell).redirectSelectionToParent(cell)
```
