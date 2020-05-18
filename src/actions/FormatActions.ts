export class FormatActions {
  // Format actions
  vertical() {
    this.addAction('vertical', function() { ui.menus.toggleStyle(mxConstants.STYLE_HORIZONTAL, true); });
  }
  
  shadow() {
    this.addAction('shadow', function() { ui.menus.toggleStyle(mxConstants.STYLE_SHADOW); });
  }
  
  solid() {
    this.addAction('solid', function()
    {
      graph.getModel().beginUpdate();
      try
      {
        graph.setCellStyles(mxConstants.STYLE_DASHED, null);
        graph.setCellStyles(mxConstants.STYLE_DASH_PATTERN, null);
        ui.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN],
          'values', [null, null], 'cells', graph.getSelectionCells()));
      }
      finally
      {
        graph.getModel().endUpdate();
      }
    });
  }

  dashed() {
    this.addAction('dashed', function()
    {
      graph.getModel().beginUpdate();
      try
      {
        graph.setCellStyles(mxConstants.STYLE_DASHED, '1');
        graph.setCellStyles(mxConstants.STYLE_DASH_PATTERN, null);
        ui.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN],
          'values', ['1', null], 'cells', graph.getSelectionCells()));
      }
      finally
      {
        graph.getModel().endUpdate();
      }
    });
  }

  dotted() {
    this.addAction('dotted', function()
    {
      graph.getModel().beginUpdate();
      try
      {
        graph.setCellStyles(mxConstants.STYLE_DASHED, '1');
        graph.setCellStyles(mxConstants.STYLE_DASH_PATTERN, '1 4');
        ui.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_DASHED, mxConstants.STYLE_DASH_PATTERN],
          'values', ['1', '1 4'], 'cells', graph.getSelectionCells()));
      }
      finally
      {
        graph.getModel().endUpdate();
      }
    });
  }

  sharp() {
    this.addAction('sharp', function()
    {
      graph.getModel().beginUpdate();
      try
      {
        graph.setCellStyles(mxConstants.STYLE_ROUNDED, '0');
        graph.setCellStyles(mxConstants.STYLE_CURVED, '0');
        ui.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_ROUNDED, mxConstants.STYLE_CURVED],
            'values', ['0', '0'], 'cells', graph.getSelectionCells()));
      }
      finally
      {
        graph.getModel().endUpdate();
      }
    });
  }

  rounded() {
    this.addAction('rounded', function()
    {
      graph.getModel().beginUpdate();
      try
      {
        graph.setCellStyles(mxConstants.STYLE_ROUNDED, '1');
        graph.setCellStyles(mxConstants.STYLE_CURVED, '0');
        ui.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_ROUNDED, mxConstants.STYLE_CURVED],
            'values', ['1', '0'], 'cells', graph.getSelectionCells()));
      }
      finally
      {
        graph.getModel().endUpdate();
      }
    });
  }

  toggleRounded() {
    this.addAction('toggleRounded', function()
    {
      if (!graph.isSelectionEmpty() && graph.isEnabled())
      {
        graph.getModel().beginUpdate();
        try
        {
          var cells = graph.getSelectionCells();
            var style = graph.getCurrentCellStyle(cells[0]);
            var value = (mxUtils.getValue(style, mxConstants.STYLE_ROUNDED, '0') == '1') ? '0' : '1';
            
          graph.setCellStyles(mxConstants.STYLE_ROUNDED, value);
          graph.setCellStyles(mxConstants.STYLE_CURVED, null);
          ui.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_ROUNDED, mxConstants.STYLE_CURVED],
              'values', [value, '0'], 'cells', graph.getSelectionCells()));
        }
        finally
        {
          graph.getModel().endUpdate();
        }
      }
    });
  }

  curved() {
    this.addAction('curved', function()
    {
      graph.getModel().beginUpdate();
      try
      {
        graph.setCellStyles(mxConstants.STYLE_ROUNDED, '0');
        graph.setCellStyles(mxConstants.STYLE_CURVED, '1');
        ui.fireEvent(new mxEventObject('styleChanged', 'keys', [mxConstants.STYLE_ROUNDED, mxConstants.STYLE_CURVED],
            'values', ['0', '1'], 'cells', graph.getSelectionCells()));
      }
      finally
      {
        graph.getModel().endUpdate();
      }
    });
  }

  collapsible() {
    this.addAction('collapsible', function()
    {
      var state = graph.view.getState(graph.getSelectionCell());
      var value = '1';
      
      if (state != null && graph.getFoldingImage(state) != null)
      {
        value = '0';	
      }
      
      graph.setCellStyles('collapsible', value);
      ui.fireEvent(new mxEventObject('styleChanged', 'keys', ['collapsible'],
          'values', [value], 'cells', graph.getSelectionCells()));
    });
  }

  editStyle() {
    this.addAction('editStyle...', mxUtils.bind(this, function()
    {
      var cells = graph.getSelectionCells();
      
      if (cells != null && cells.length > 0)
      {
        var model = graph.getModel();
        
          var dlg = new TextareaDialog(this.editorUi, mxResources.get('editStyle') + ':',
            model.getStyle(cells[0]) || '', function(newValue)
        {
            if (newValue != null)
          {
            graph.setCellStyle(mxUtils.trim(newValue), cells);
          }
        }, null, null, 400, 220);
        this.editorUi.showDialog(dlg.container, 420, 300, true, true);
        dlg.init();
      }
    }), null, null, Editor.ctrlKey + '+E');
  }

  setAsDefaultStyle() {
    this.addAction('setAsDefaultStyle', function()
    {
      if (graph.isEnabled() && !graph.isSelectionEmpty())
      {
        ui.setDefaultStyle(graph.getSelectionCell());
      }
    }, null, null, Editor.ctrlKey + '+Shift+D');
  }

  clearDefaultStyle() {
    this.addAction('clearDefaultStyle', function()
    {
      if (graph.isEnabled())
      {
        ui.clearDefaultStyle();
      }
    }, null, null, Editor.ctrlKey + '+Shift+R');
  }
}