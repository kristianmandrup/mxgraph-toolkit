export class SizeActions {
  /**
   * Adds the default actions.
   */	
  copySize() {
    this.addAction('copySize', (evt) => {
      var cell = graph.getSelectionCell();
      
      if (graph.isEnabled() && cell != null && graph.getModel().isVertex(cell)) {
        var geo = graph.getCellGeometry(cell);
        
        if (geo != null)
        {
          ui.copiedSize = new mxRectangle(geo.x, geo.y, geo.width, geo.height);
        }
      }
    }, null, null, 'Alt+Shift+X');
  }

  pasteSize() {
    this.addAction('pasteSize', function(evt)
    {
      if (graph.isEnabled() && !graph.isSelectionEmpty() && ui.copiedSize != null)
      {
        graph.getModel().beginUpdate();
        
        try
        {
          var cells = graph.getSelectionCells();
          
          for (var i = 0; i < cells.length; i++)
          {
            if (graph.getModel().isVertex(cells[i]))
            {
              var geo = graph.getCellGeometry(cells[i]);
              
              if (geo != null)
              {
                geo = geo.clone();
                geo.width = ui.copiedSize.width;
                geo.height = ui.copiedSize.height;
                
                graph.getModel().setGeometry(cells[i], geo);
              }
            }
          }
        }
        finally
        {
          graph.getModel().endUpdate();
        }
      }
    }, null, null, 'Alt+Shift+V');
  }
}