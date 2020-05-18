export class LinkActions {
  openLink() {
    this.addAction('openLink', function()
    {
      var link = graph.getLinkForCell(graph.getSelectionCell());
      
      if (link != null)
      {
        graph.openLink(link);
      }
    });
  }

  editLink() {
    this.addAction('editLink...', function()
    {
      var graph = ui.editor.graph;
      
      if (graph.isEnabled() && !graph.isSelectionEmpty())
      {
        var cell = graph.getSelectionCell();
        var value = graph.getLinkForCell(cell) || '';
        
        ui.showLinkDialog(value, mxResources.get('apply'), function(link)
        {
          link = mxUtils.trim(link);
            graph.setLinkForCell(cell, (link.length > 0) ? link : null);
        });
      }
    }, null, null, 'Alt+Shift+L');  
  }
}
