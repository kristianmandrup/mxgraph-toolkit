# Stylesheet

## create

```ts
const stylesheet = new Stylesheet()
```

## vertex style

### default vertex style

Get default vertex style

```ts
stylesheet.defaultVertexStyle
```

### set vertex style

```ts
stylesheet.setVertexStyle({
  color: 'red',
  // ...
})
```

### put vertex style

```ts
stylesheet.putDefaultVertexStyle(style)
```

## edge style

### default edge style

Get default edge style from `this.defaultEdgeStyle['edgeStyle']`

```ts
stylesheet.defaultEdgeStyle
```

### set edge style

```ts
stylesheet.setDefaultEdgeStyle('orthogonalEdgeStyle')
```

