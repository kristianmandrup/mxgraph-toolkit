export class RotationAction {
  this.addAction('rotation', function()
  {
    var value = '0';
      var state = graph.getView().getState(graph.getSelectionCell());
      
      if (state != null)
      {
        value = state.style[mxConstants.STYLE_ROTATION] || value;
      }
  
    var dlg = new FilenameDialog(ui, value, mxResources.get('apply'), function(newValue)
    {
      if (newValue != null && newValue.length > 0)
      {
        graph.setCellStyles(mxConstants.STYLE_ROTATION, newValue);
      }
    }, mxResources.get('enterValue') + ' (' + mxResources.get('rotation') + ' 0-360)');
    
    ui.showDialog(dlg.container, 375, 80, true, true);
    dlg.init();
  });
  
}
