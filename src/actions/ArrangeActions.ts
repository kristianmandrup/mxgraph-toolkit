// Arrange actions
export class Arrange {
  toFront() {
    this.addAction('toFront', function() { graph.orderCells(false); }, null, null, Editor.ctrlKey + '+Shift+F');
  }

  toBack() {
    this.addAction('toBack', function() { graph.orderCells(true); }, null, null, Editor.ctrlKey + '+Shift+B');
  }
	
	group() {
    this.addAction('group', function()
    {
      if (graph.getSelectionCount() == 1)
      {
        graph.setCellStyles('container', '1');
      }
      else
      {
        graph.setSelectionCell(graph.groupCells(null, 0));
      }
    }, null, null, Editor.ctrlKey + '+G');
  }

  ungroup() {
    this.addAction('ungroup', function()
    {
      if (graph.getSelectionCount() == 1 && graph.getModel().getChildCount(graph.getSelectionCell()) == 0)
      {
        graph.setCellStyles('container', '0');
      }
      else
      {
        graph.setSelectionCells(graph.ungroupCells());
      }
    }, null, null, Editor.ctrlKey + '+Shift+U');
    this.addAction('removeFromGroup', function() { graph.removeCellsFromParent(); });
  }
}