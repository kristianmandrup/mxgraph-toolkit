export class LockAction {
  lockUnlock() {
    this.addAction('lockUnlock', function()
    {
      if (!graph.isSelectionEmpty())
      {
        graph.getModel().beginUpdate();
        try
        {
          var defaultValue = graph.isCellMovable(graph.getSelectionCell()) ? 1 : 0;
          graph.toggleCellStyles(mxConstants.STYLE_MOVABLE, defaultValue);
          graph.toggleCellStyles(mxConstants.STYLE_RESIZABLE, defaultValue);
          graph.toggleCellStyles(mxConstants.STYLE_ROTATABLE, defaultValue);
          graph.toggleCellStyles(mxConstants.STYLE_DELETABLE, defaultValue);
          graph.toggleCellStyles(mxConstants.STYLE_EDITABLE, defaultValue);
          graph.toggleCellStyles('connectable', defaultValue);
        }
        finally
        {
          graph.getModel().endUpdate();
        }
      }
    }, null, null, Editor.ctrlKey + '+L');
  }
}