# VertexToolHandler

Manages context icons when hovering over vertex. When clicking on an icon, it can perform an action

## create

Sets `vertexHandler` property to `mxVertexHandler` instance

```ts
const vertexToolHandler = new VertexToolHandler(graph, state)
```

## init

Initializes `vertexHandler` by calling `init` on it. 
Sets `vertexHandler.redrawTools` to `redrawTools` of this class (override to customize).
Sets `actions` (mapping object) by calling `createActions` method. 

```ts
vertexToolHandler.init()
```

## actions

`actions` is a mapping object (object lookup via key)

An action is selected for an icon click event in `addContextIconClickHandler` by key lookup via the `type` argument.

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
vertexToolHandler.addContextIcon(imagePath, { title, size, type, cursor })
```

Calls `addContextIconClickHandler` and `appendIcon(img)`

## protected

- `addContextIconClickHandler(img, type)`
- `appendIcon(img)`

