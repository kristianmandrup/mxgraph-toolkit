export class AutoSizeAction {
  this.addAction('autosize', function()
  {
    var cells = graph.getSelectionCells();
    
    if (cells != null)
    {
      graph.getModel().beginUpdate();
      try
      {
        for (var i = 0; i < cells.length; i++)
        {
          var cell = cells[i];
          
          if (graph.getModel().getChildCount(cell))
          {
            graph.updateGroupBounds([cell], 20);
          }
          else
          {
            var state = graph.view.getState(cell);
            var geo = graph.getCellGeometry(cell);
  
            if (graph.getModel().isVertex(cell) && state != null && state.text != null &&
              geo != null && graph.isWrapping(cell))
            {
              geo = geo.clone();
              geo.height = state.text.boundingBox.height / graph.view.scale;
              graph.getModel().setGeometry(cell, geo);
            }
            else
            {
              graph.updateCellSize(cell);
            }
          }
        }
      }
      finally
      {
        graph.getModel().endUpdate();
      }
    }
  }, null, null, Editor.ctrlKey + '+Shift+Y');
}
