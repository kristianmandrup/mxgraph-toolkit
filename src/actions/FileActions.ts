class FileActions {
  openFile() {
    this.addAction('open...', () => {
      window.openNew = true;
      window.openKey = 'open';      
      ui.openFile();
    });  
  }

  importFile() {
    // File actions

    this.addAction('import...', () => {
      window.openNew = false;
      window.openKey = 'import';
      
      // Closes dialog after open
      window.openFile = new OpenFile(mxUtils.bind(this, function()
      {
        ui.hideDialog();
      }));
      
      window.openFile.setConsumer(mxUtils.bind(this, function(xml, filename)
      {
        try
        {
          var doc = mxUtils.parseXml(xml);
          editor.graph.setSelectionCells(editor.graph.importGraphModel(doc.documentElement));
        }
        catch (e)
        {
          mxUtils.alert(mxResources.get('invalidOrMissingFile') + ': ' + e.message);
        }
      }));

      // Removes openFile if dialog is closed
      ui.showDialog(new OpenDialog(this).container, 320, 220, true, true, function()
      {
        window.openFile = null;
      });
    }).isEnabled = isGraphEnabled;
  }

  saveFile() {
    this.addAction('save', function() { ui.saveFile(false); }, null, null, Editor.ctrlKey + '+S').isEnabled = isGraphEnabled;
  }
  
  saveAs() {
    this.addAction('saveAs...', function() { ui.saveFile(true); }, null, null, Editor.ctrlKey + '+Shift+S').isEnabled = isGraphEnabled;
  }

  exportFile() {
    this.addAction('export...', function() { ui.showDialog(new ExportDialog(ui).container, 300, 296, true, true); });
  }    
}