# ShapePorts

## setPorts

Sets shape ports to return ports for directions:

- `w` (west)
- `e` (east)
- `n` (north)
- `s` (south)

Additionally

- `nw` (north west)
- `ne` (north east)
- `sw` (south west)
- `se` (south east)

## createPort

Creates a port definition

```ts
createPort({x: 0.5, y: 1}, 'south')
```