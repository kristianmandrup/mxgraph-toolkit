# Html label

Create Html labels for cells, including vertices and edges

## create

```ts
const label = new HtmlLabel(graph).setData(data)

// with caching
const label = new HtmlLabel(graph, data, {cached: true})
```

## init

Configures `graph` API

- `convertValueToString`
- `cellLabelChanged`
- `getEditingValue`

## convertValueToString

Define method to convert the cell value to a string for display as label.
The default method creates an checkbox input inside a div, which is checked depending on the cell value `checked` property, with a click handler to toggle said cell value

```ts
convertValueToString(cell)
```

## cellLabelChanged

Define method to store a cell label in the model

```ts
cellLabelChanged(cell, newValue, autoSize)
```

## getEditingValue

Define method to create the editing value. 

The default method makes use of an Undo manager (`mxUndoManager` instance). 
It adds buttons to the document to `undo` and `redo` changes to the model or view, using this undo manager.

```ts
getEditingValue(cell)
```

TODO: Extract Undo Manager functionality into separate class. Same with Zoom etc.
