# Graph toggler

Usage

```ts
graph.toggle.dropEnabled(true)
```

## using switches

Turning on (enable)

```ts
graph.drop.on()
```

Turning off (disable)

```ts
graph.split.off()
```

Turn multiple on

```ts
graph.toggle.on([
  'drop',
  'split',
  'panning'
]
```

or directly on graph

```ts
graph.on([
  'drop',
  'split',
  'panning'
]
```

Turn multiple off

```ts
graph.off([
  'panning',
  'centerZoom',
  'folding'
]
```

Fluent API

```ts
graph.on([
  'panning',
  'centerZoom',
  'folding'
]).off([
  'guides'
])
```

Switch multiple on/off using object

```ts
graph.switch({
  panning: true,
  folding: false
}
```


## Enable/Disable drop

```ts
graph.setDropEnabled(true)
```

## Enable/Disable split

```ts
graph.setSplitEnabled(true)
```

## Enable/Disable resize container

```ts
graph.setResizeContainerEnabled(true)
```

## Enable/Disable allow loops

```ts
graph.setAllowLoops(true)
```

## Enable/Disable folding

```ts
graph.setFoldingEnabled(true)
```

## Enable/Disable recursive resizing

```ts
graph.setRecursiveResizeEnabled(true)
```

## Enable/Disable if cells are disconnectable

```ts
graph.setCellsDisconnectable(true)
```

## Enable/Disable dangling edges

Dangling edges are edges not fully connected

```ts
graph.setAllowDanglingEdges(true)
```

## Enable/Disable editable cells

Set if cells can be edited

```ts
graph.setCellsEditable(true)
```

## Enable/Disable center zoom

```ts
graph.setCenterZoom(true)
```

## Enable/Disable guides

```ts
graph.setGuidesEnabled(true)
```

## Enable/Disable snap edges to terminals

```ts
graph.setSnapToTerminals(true)
```

## Disable auto ports

```ts
graph.disableAutoPorts()
```

## Enable/Disable auto ports

```ts
graph.setPortsEnabled(true)
```

## Enable/Disable editing

```ts
graph.stopEditing(true)
```

## Enable/Disable tooltips

```ts
graph.setTooltips(true)
```

## Enable/Disable Html labels

```ts
graph.setHtmlLabels(true)
```

## Enable/Disable panning

```ts
graph.setPanning(true)
```

## Enable/Disable graph

```ts
graph.setEnabled(true)
```

## Enable/Disable connectable graph

```ts
graph.setConnectable(true)
```

## Enable/Disable multi graph

```ts
graph.setMultigraph(true)
```