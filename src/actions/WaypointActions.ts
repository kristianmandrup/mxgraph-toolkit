import mx from "mx";
const { mxEdgeHandler } = mx

export class WaypointActions {
  graph: any
  editor: any
  ui: any

  addAction(label: string, fn, x?, y?, z?) {

  }

  addWaypoint() {
    const { editor, graph } = this
    this.addAction('addWaypoint', function()
    {
      var cell = graph.getSelectionCell();
      
      if (cell != null && graph.getModel().isEdge(cell))
      {
        var handler = editor.graph.selectionCellsHandler.getHandler(cell);
        
        if (handler instanceof mxEdgeHandler)
        {
          var t = graph.view.translate;
          var s = graph.view.scale;
          var dx = t.x;
          var dy = t.y;
          
          var parent = graph.getModel().getParent(cell);
          var pgeo = graph.getCellGeometry(parent);
          
          while (graph.getModel().isVertex(parent) && pgeo != null)
          {
            dx += pgeo.x;
            dy += pgeo.y;
            
            parent = graph.getModel().getParent(parent);
            pgeo = graph.getCellGeometry(parent);
          }
          
          var x = Math.round(graph.snap(graph.popupMenuHandler.triggerX / s - dx));
          var y = Math.round(graph.snap(graph.popupMenuHandler.triggerY / s - dy));
          
          handler.addPointAt(handler.state, x, y);
        }
      }
    });
  }

  removeWaypoint() {
    const { ui } = this
    this.addAction('removeWaypoint', function()
    {
      // TODO: Action should run with "this" set to action
      var rmWaypointAction = ui.actions.get('removeWaypoint');
      
      if (rmWaypointAction.handler != null)
      {
        // NOTE: Popupevent handled and action updated in Menus.createPopupMenu
        rmWaypointAction.handler.removePoint(rmWaypointAction.handler.state, rmWaypointAction.index);
      }
    });
  }

  clearWaypoints() {
    const { editor, graph } = this
    this.addAction('clearWaypoints', function()
    {
      var cells = graph.getSelectionCells();
      
      if (cells != null)
      {
        cells = graph.addAllEdges(cells);
        
        graph.getModel().beginUpdate();
        try
        {
          for (var i = 0; i < cells.length; i++)
          {
            var cell = cells[i];
            
            if (graph.getModel().isEdge(cell))
            {
              var geo = graph.getCellGeometry(cell);
        
              if (geo != null)
              {
                geo = geo.clone();
                geo.points = null;
                graph.getModel().setGeometry(cell, geo);
              }
            }
          }
        }
        finally
        {
          graph.getModel().endUpdate();
        }
      }
    }, null, null, 'Alt+Shift+C');
  }
}
