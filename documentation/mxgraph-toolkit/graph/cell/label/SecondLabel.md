# Second label

Class to manage a second label for a vertex

```ts
const label = new SecondLabel(graph)
```

## set getSecondLabel

Sets `graph.getSecondLabel` to a function that returns the cell id if not an edge.
Override to provide your own functionality to get the label text.

```ts
label.setGetSecondLabel()
```

## set redrawShape

Sets `graph.cellRenderer.redrawShape` to a function that draws a boundary rectangle for the labels and sets a `secondLabel` property object on the cell state.
Override to provide your own redraw functionality.

```ts
label.setRedrawShapeSecondLabel()
```
