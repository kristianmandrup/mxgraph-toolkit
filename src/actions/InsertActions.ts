export class InsertActions {
  this.put('insertImage', new Action(mxResources.get('image') + '...', function()
  {
    if (graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent()))
    {
      graph.clearSelection();
      ui.actions.get('image').funct();
    }
  })).isEnabled = isGraphEnabled;
  this.put('insertLink', new Action(mxResources.get('link') + '...', function()
  {
    if (graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent()))
    {
      ui.showLinkDialog('', mxResources.get('insert'), function(link, docs)
      {
        link = mxUtils.trim(link);
        
        if (link.length > 0)
        {
          var icon = null;
          var title = graph.getLinkTitle(link);
          
          if (docs != null && docs.length > 0)
          {
            icon = docs[0].iconUrl;
            title = docs[0].name || docs[0].type;
            title = title.charAt(0).toUpperCase() + title.substring(1);
            
            if (title.length > 30)
            {
              title = title.substring(0, 30) + '...';
            }
          }
          
          var pt = graph.getFreeInsertPoint();
                var linkCell = new mxCell(title, new mxGeometry(pt.x, pt.y, 100, 40),
                      'fontColor=#0000EE;fontStyle=4;rounded=1;overflow=hidden;' + ((icon != null) ?
                      'shape=label;imageWidth=16;imageHeight=16;spacingLeft=26;align=left;image=' + icon :
                      'spacing=10;'));
                  linkCell.vertex = true;

                  graph.setLinkForCell(linkCell, link);
                  graph.cellSizeUpdated(linkCell, true);

                graph.getModel().beginUpdate();
                try
                {
                  linkCell = graph.addCell(linkCell);
                  graph.fireEvent(new mxEventObject('cellsInserted', 'cells', [linkCell]));
                  }
                finally
                {
                  graph.getModel().endUpdate();
                }
                
                  graph.setSelectionCell(linkCell);
                  graph.scrollCellToVisible(graph.getSelectionCell());
        }
      });
    }
  })).isEnabled = isGraphEnabled;
}