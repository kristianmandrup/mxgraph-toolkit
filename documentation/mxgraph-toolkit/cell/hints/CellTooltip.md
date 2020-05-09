# CellTooltip

Facilitates setting up tooltip fuctionality when right clicking on a cell in the graph.

```ts
const ctip = new CellTooltip(graph).init()

// or use factory
const ctip = createCellTooltip(graph)
```

## highlight

```ts
ctip.highlightCellOnHover()
```

## Custom tooltip for cell

Extend `CellTooltip` and provide your own `getTooltipForCell` method

```ts
getTooltipForCell(cell: any): string {
  /// ...
  return tip;
}
