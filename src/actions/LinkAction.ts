export class LinkAction {
  this.addAction('link...', mxUtils.bind(this, function()
  {
    var graph = ui.editor.graph;
    
    if (graph.isEnabled())
    {
      if (graph.cellEditor.isContentEditing())
      {
        var elt = graph.getSelectedElement();
        var link = graph.getParentByName(elt, 'A', graph.cellEditor.textarea);
        var oldValue = '';
        
        // Workaround for FF returning the outermost selected element after double
        // click on a DOM hierarchy with a link inside (but not as topmost element)
        if (link == null && elt != null && elt.getElementsByTagName != null)
        {
          // Finds all links in the selected DOM and uses the link
          // where the selection text matches its text content
          var links = elt.getElementsByTagName('a');
          
          for (var i = 0; i < links.length && link == null; i++)
          {
            if (links[i].textContent == elt.textContent)
            {
              link = links[i];
            }
          }
        }

        if (link != null && link.nodeName == 'A')
        {
          oldValue = link.getAttribute('href') || '';
          graph.selectNode(link);
        }
        
        var selState = graph.cellEditor.saveSelection();
        
        ui.showLinkDialog(oldValue, mxResources.get('apply'), mxUtils.bind(this, function(value)
        {
            graph.cellEditor.restoreSelection(selState);

            if (value != null)
            {
              graph.insertLink(value);
          }
        }));
      }
      else if (graph.isSelectionEmpty())
      {
        this.get('insertLink').funct();
      }
      else
      {
        this.get('editLink').funct();
      }
    }
  })).isEnabled = isGraphEnabled;
}