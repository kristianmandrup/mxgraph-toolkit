# Overrides methods to preview and create new edges

Sets source terminal point for edge-to-edge connections.

Define `createEdgeState` function

```js
mxConnectionHandler.prototype.createEdgeState = function(me) {
```

First create a new edge in the graph

```js
  var edge = this.graph.createEdge();
```

If there is a `sourceConstraint` and `previous` present on the `mxConnectionHandler` instance, set the style of the edge using `sourceConstraint` position coordinates

```js  
  if (this.sourceConstraint != null && this.previous != null)
  {
    edge.style = mxConstants.STYLE_EXIT_X+'='+this.sourceConstraint.point.x+';'+
      mxConstants.STYLE_EXIT_Y+'='+this.sourceConstraint.point.y+';';
  }
```

If the cell is an edge, create a point `pt` and set terminal point of the edge to that point.

```js
  else if (this.graph.model.isEdge(me.getCell()))
  {
    var scale = this.graph.view.scale;
    var tr = this.graph.view.translate;
    var pt = new mxPoint(this.graph.snap(me.getGraphX() / scale) - tr.x,
        this.graph.snap(me.getGraphY() / scale) - tr.y);
    edge.geometry.setTerminalPoint(pt, true);
  }
  
  return this.graph.view.createState(edge);
};
```

Uses right mouse button to create edges on background (see also: lines 67 ff)

```js
mxConnectionHandler.prototype.isStopEvent = function(me)
{
  return me.getState() != null || mxEvent.isRightMouseButton(me.getEvent());
};
```

Updates target terminal point for edge-to-edge connections.

```js
mxConnectionHandlerUpdateCurrentState = mxConnectionHandler.prototype.updateCurrentState;
mxConnectionHandler.prototype.updateCurrentState = function(me)
{
  mxConnectionHandlerUpdateCurrentState.apply(this, arguments);

  if (this.edgeState != null)
  {
    this.edgeState.cell.geometry.setTerminalPoint(null, false);
  
    if (this.shape != null && this.currentState != null &&
      this.currentState.view.graph.model.isEdge(this.currentState.cell))
    {
      var scale = this.graph.view.scale;
      var tr = this.graph.view.translate;
      var pt = new mxPoint(this.graph.snap(me.getGraphX() / scale) - tr.x,
          this.graph.snap(me.getGraphY() / scale) - tr.y);
      this.edgeState.cell.geometry.setTerminalPoint(pt, false);
    }
  }
};
```

Updates the terminal and control points in the cloned preview.

```js
mxEdgeSegmentHandler.prototype.clonePreviewState = function(point, terminal)
{
  var clone = mxEdgeHandler.prototype.clonePreviewState.apply(this, arguments);
  clone.cell = clone.cell.clone();
  
  if (this.isSource || this.isTarget)
  {
    clone.cell.geometry = clone.cell.geometry.clone();
```

Sets the terminal point of an edge if we're moving one of the endpoints

```js
    if (this.graph.getModel().isEdge(clone.cell))
    {
```

Only set this if the target or source terminal is an edge

```js
      clone.cell.geometry.setTerminalPoint(point, this.isSource);
    }
    else
    {
      clone.cell.geometry.setTerminalPoint(null, this.isSource);
    }
  }

  return clone;
};

var mxEdgeHandlerConnect = mxEdgeHandler.prototype.connect;
mxEdgeHandler.prototype.connect = function(edge, terminal, isSource, isClone, me)
{
  var result = null;
  var model = this.graph.getModel();
  var parent = model.getParent(edge);
```

Start model update

```js
  model.beginUpdate();
  try
  {
    result = mxEdgeHandlerConnect.apply(this, arguments);
    var geo = model.getGeometry(result);

    if (geo != null)
    {
      geo = geo.clone();
      var pt = null;

      if (model.isEdge(terminal))
      {
        pt = this.abspoints[(this.isSource) ? 0 : this.abspoints.length - 1];
        pt.x = pt.x / this.graph.view.scale - this.graph.view.translate.x;
        pt.y = pt.y / this.graph.view.scale - this.graph.view.translate.y;
  
        var pstate = this.graph.getView().getState(
            this.graph.getModel().getParent(edge));

        if (pstate != null)
        {
          pt.x -= pstate.origin.x;
          pt.y -= pstate.origin.y;
        }

        pt.x -= this.graph.panDx / this.graph.view.scale;
        pt.y -= this.graph.panDy / this.graph.view.scale;
      }

      geo.setTerminalPoint(pt, isSource);
      model.setGeometry(edge, geo);
    }
  }
```

End model update

```js
  finally
  {
    model.endUpdate();
  }
  
  return result;
};
```
