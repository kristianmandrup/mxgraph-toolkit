# VertexToolHandler

## create

Sets `vertexHandler` property to `mxVertexHandler` instance

```ts
const vertexToolHandler = new VertexToolHandler(graph, state)
```

## init

Initializes `vertexHandler` by calling `init` on it. 
Also sets `vertexHandler.redrawTools` to `redrawTools` of this class (override to customize)

```ts
vertexToolHandler.init()
```

## create actions

Create map of actions that can be performed on vertex (via tool)

- `delete(evt)`
- `move(evt)`
- `size(evt)`
- `connect(evt)`

```ts
vertexToolHandler.createActions()
```

## redraw

Redraw vertex tools by valling `vertexHandler.redraw()`

```ts
vertexToolHandler.redraw()
```

## redrawTools

Override to provide custom drawing of tools

## destroy context icons

Destroys context icons from `domNode` thus removing them from the DOM (display)

```ts
vertexToolHandler.destroyContextIcons()
```

## create context element

Sets `domNode` property to a new element (used to display context icons)

```ts
vertexToolHandler.createContextElement()
```

## create image for context icon

```ts
vertexToolHandler.createImage(src)
```

## add context icon

Creates and adds context icon to `domNode` (used to display context icons).
Calls `createImage` to create the icon image to be used.

```ts
vertexToolHandler.addContextIcon(imagePath, { title, size, type })
```

