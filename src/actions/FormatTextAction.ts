export class FormatTextAction {
  this.addAction('formattedText', function()
  {
      var refState = graph.getView().getState(graph.getSelectionCell());
      
      if (refState != null)
      {
        graph.stopEditing();
        var value = (refState.style['html'] == '1') ? null : '1';
      
      graph.getModel().beginUpdate();
      try
      {
        var cells = graph.getSelectionCells();
        
        for (var i = 0; i < cells.length; i++)
        {
          state = graph.getView().getState(cells[i]);
          
          if (state != null)
          {
            var html = mxUtils.getValue(state.style, 'html', '0');
            
            if (html == '1' && value == null)
              {
                var label = graph.convertValueToString(state.cell);
                
                if (mxUtils.getValue(state.style, 'nl2Br', '1') != '0')
              {
                // Removes newlines from HTML and converts breaks to newlines
                // to match the HTML output in plain text
                label = label.replace(/\n/g, '').replace(/<br\s*.?>/g, '\n');
              }
                
                // Removes HTML tags
                var temp = document.createElement('div');
                temp.innerHTML = label;
                label = mxUtils.extractTextWithWhitespace(temp.childNodes);
                
              graph.cellLabelChanged(state.cell, label);
              graph.setCellStyles('html', value, [cells[i]]);
              }
            else if (html == '0' && value == '1')
              {
                // Converts HTML tags to text
                var label = mxUtils.htmlEntities(graph.convertValueToString(state.cell), false);
                
                if (mxUtils.getValue(state.style, 'nl2Br', '1') != '0')
              {
                // Converts newlines in plain text to breaks in HTML
                // to match the plain text output
                  label = label.replace(/\n/g, '<br/>');
              }
                
                graph.cellLabelChanged(state.cell, graph.sanitizeHtml(label));
                graph.setCellStyles('html', value, [cells[i]]);
              }
          }
        }

        ui.fireEvent(new mxEventObject('styleChanged', 'keys', ['html'],
          'values', [(value != null) ? value : '0'], 'cells', cells));
      }
      finally
      {
        graph.getModel().endUpdate();
      }
      }
  });

  wordWrap() {
    this.addAction('wordWrap', function()
    {
        var state = graph.getView().getState(graph.getSelectionCell());
        var value = 'wrap';
        
      graph.stopEditing();
        
        if (state != null && state.style[mxConstants.STYLE_WHITE_SPACE] == 'wrap')
        {
          value = null;
        }

          graph.setCellStyles(mxConstants.STYLE_WHITE_SPACE, value);
    });
  }  
}