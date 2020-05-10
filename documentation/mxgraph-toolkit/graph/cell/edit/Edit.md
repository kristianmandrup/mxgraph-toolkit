# Edit

```ts
const edit = new Edit(graph)
```

## Calculate event point

Calculate point that event was triggered

```ts
edit.calcPoint(evt)
```

## create region calc

```ts
edit.createRegionCalc(state)
```

## get event field name

Use to determine which field (in a multi-field vertex) was clicked (by click event).
By default determine lower or higher region (see `RegionCalc`).

```ts
edit.getFieldnameForEvent(cell, evt)
```

## RegionCalc

The `RegionCalc` class is used to determine the region given a point in the vertex.

```ts
const calc = new RegionCalc(state)
const name = calc.determine({x: 20, y: 40})
```

By default `determine` determine will return `first` (upper) or `second` (lower) region.
Subclass `RegionCalc` to provide your own custom determination. Then subclass
`Editing` class to provide a custom `createRegionCalc(state)` method that returns your custom `RegionCalc` instance.
