# Monitor

Monitor and display graph state, such as a workflow

## create

```ts
const monitor = new Monitor(graph)
```

## state properties

Props to use for `createStates`

```ts
monitor.stateProps
```

## create states

Called as part of creation. Sets `states` property

```ts
monitor.createStates()
```

## create init state

```ts
monitor.createInitState()
```

## create state entry

```ts
monitor.createStateEntry({label, stateName, fillColor})
```

## tooltip postfix

```ts
monitor.tooltipPostFix
```

## create overlay

```ts
monitor.createOverlay(image, tooltip)
```

## update with xml data

```ts
monitor.update(xml)
```

## process nodes

```ts
monitor.processNodes(nodes)
```

## process node

```ts
monitor.processNode(node)
```

## reset overlay

```ts
monitor.resetOverlay(cell)
```

## process states

```ts
monitor.processStates(state, cell)
```



  



