# Layers

Manage mxGraph layers

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

## set current layer name

```ts
layers.setCurrentLayerName(name)
```

## layer button for

Creates and returns a button which can be used to activate and set a specific layer visible

```ts
// label same as name
layers.layerButtonFor(name)

// or with specific label 
layers.layerButtonFor(name: string, label)
```
