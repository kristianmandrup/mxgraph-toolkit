# Layers

Layout display of graph

## create

```ts
const layers = new Layers(graph)
```

## layers map

Map of named layers

```ts
layers.layersMap
```

## draw layer

Create a new draw layer

```ts
layers.drawLayer(name)
```

## draw

Draw on existing layer

```ts
layers.draw(name)
```

## draw

Get `default` layer in layer map

```ts
layers.getDefaultLayer()
```

## get named layer

Get layer by name

```ts
layers.getLayer(name)
```

## add named layer

Add new named layer

```ts
layers.addLayer(name)
```

## layer button for

Add new named layer

```ts
// label same as name
layers.layerButtonFor(name)

// or with specific label 
layers.layerButtonFor(name: string, label)
```
