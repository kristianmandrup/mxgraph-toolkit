# Editor

The `Editor` encapsulated the main graphical editor, including:

- Toolbars (palette)
- Graph
- Sidebar
- ...

The `Editor` is the main container for the Diagram application, which hosts and coordinates all the actions and interactions between the main entities.

## Conventions

The following DOM structure is a good example of using the conventions

```html
	<!-- Creates a container for the sidebar -->
	<div id="toolbarContainer"
		style="position:absolute;white-space:nowrap;overflow:hidden;top:0px;left:0px;max-height:24px;height:36px;right:0px;padding:6px;background-image:url('images/toolbar_bg.gif');">
	</div>

	<!-- Creates a container for the toolboox -->
	<div id="sidebarContainer"
		style="position:absolute;overflow:hidden;top:36px;left:0px;bottom:36px;max-width:52px;width:56px;padding-top:10px;padding-left:4px;background-image:url('images/sidebar_bg.gif');">
	</div>

	<!-- Creates a container for the graph -->
	<div id="graphContainer"
		style="position:absolute;overflow:hidden;top:36px;left:60px;bottom:36px;right:0px;">
	</div>

	<!-- Creates a container for the outline -->
	<div id="outlineContainer"
		style="position:absolute;overflow:hidden;top:36px;right:0px;width:200px;height:140px;background:transparent;border-style:solid;border-color:black;">
	</div>
		
	<!-- Creates a container for the sidebar -->
	<div id="statusContainer"
		style="text-align:right;position:absolute;overflow:hidden;bottom:0px;left:0px;max-height:24px;height:36px;right:0px;color:white;padding:6px;background-image:url('images/toolbar_bg.gif');">
		<div style="font-size:10pt;float:left;">
			Created with <a href="http://www.jgraph.com" target="_blank">mxGraph</a>
		</div>
	</div>
```

```css
#toolbarContainer {
  position:absolute;
  white-space:nowrap;
  overflow:hidden;
  top:0px;
  left:0px;
  max-height:24px;
  height:36px;
  right:0px;
  padding:6px;
  background-image:url('images/toolbar_bg.gif')
}

#sidebarContainer {
  position:absolute;
  overflow:hidden;
  top:36px;
  left:0px;
  bottom:36px;
  max-width:52px;
  width:56px;
  padding-top:10px;
  padding-left:4px;
  background-image:url('images/sidebar_bg.gif');
}

#graphContainer {
  position:absolute;
  overflow:hidden;
  top:36px;
  left:60px;
  bottom:36px;
  right:0px;
}

#outlineContainer {
  position:absolute;
  overflow:hidden;
  top:36px;
  right:0px;
  width:200px;
  height:140px;
  background:transparent;
  border-style:solid;
  border-color:black;  
}

#statusContainer {
  text-align:right;
  position:absolute;
  overflow:hidden;
  bottom:0px;
  left:0px;
  max-height:24px;
  height:36px;
  right:0px;
  color:white;
  padding:6px;
  background-image:url('images/toolbar_bg.gif');  
}
```

## create

```ts
// create the graph
const container = document.getElementById('#graph')
const graph = new Graph(container)

// create editor with the graph
const editor = new Editor(graph)

// add more to the editor, such as toolbars etc...
```

## container map

```ts
editor.setContainerMap({
  graph: getElem('graph'),
})

const { graph, toolbar } = editor.containers
```

### defaults

```ts
{
  graph: getElem('graphContainer'),
  outline: getElem('outlineContainer'),
  toolbar: getElem('toolbarContainer'),
  sidebar: getElem('sidebarContainer'),
  status: getElem('statusContainer')
}
```

## mxGraph

## get instance

```ts
editor.$graph
```

## Status container

```ts
mxEditor.prototype.setStatusContainer = (container) => {
  // ...
}
```

## Graph

### get

```ts
editor.graph
```

### set

```ts
editor.setGraph(graph)
```

With properties

```ts
editor.setGraph(graph, props)
```

## Toolbar

### get

```ts
editor.toolbar
```

### set

```ts
editor.setToolbar(toolbar)
```

With DOM element

```ts
editor.setToolbar(toolbar, toolbarElem)
```

## Sidebar

### get

```ts
editor.sidebar
```

### set

```ts
editor.setSidebar(sidebar)
```

With DOM element

```ts
editor.setSidebar(sidebar, sidebarElem)
```

## Outline map

Graph overview window

### get

```ts
editor.outlineMap
```

### set

```ts
editor.setOutlineMap(outlineMap)
```

With DOM element

```ts
editor.setOutlineMap(outlineMap, outlineElem)
```

## set default group

```ts
editor.setDefaultGroup(group)
```

## configure

```ts
editor.configure(config)
```

## Fluent API

The API is fluent

```ts
editor.setDefaultGroup(group).configure(config).setContainerMap()
```
