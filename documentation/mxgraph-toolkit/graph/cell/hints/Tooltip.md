# CellTooltip

Facilitates setting up tooltip fuctionality when right clicking on a cell in the graph.

```ts
const ctip = new Tooltip(graph).init()

// or use factory
const ctip = createTooltip(graph)
```

## highlight

```ts
ctip.highlightCellOnHover()
```

## Custom tooltip for cell

Extend `Tooltip` and provide your own `getTooltipForCell` method

```ts
getTooltipForCell(cell: any): string {
  /// ...
  return tip;
}
