export class OptionActions {
  init() {
  }

  // Option actions
  grid() {
    const action = this.addAction('grid', () => {
      graph.setGridEnabled(!graph.isGridEnabled());
      ui.fireEvent(new mxEventObject('gridEnabledChanged'));
    }, null, null, Editor.ctrlKey + '+Shift+G');  
    // grid
    action.setToggleAction(true);
    action.setSelectedCallback(function() { return graph.isGridEnabled(); });
    action.setEnabled(false);
  }
  
  guides() {
    const action = this.addAction('guides', () => {
      graph.graphHandler.guidesEnabled = !graph.graphHandler.guidesEnabled;
      ui.fireEvent(new mxEventObject('guidesEnabledChanged'));
    });
    action.setToggleAction(true);
    action.setSelectedCallback(function() { return graph.graphHandler.guidesEnabled; });
    action.setEnabled(false);  
  }

	tooltips() {
    action = this.addAction('tooltips', () => {
      graph.tooltipHandler.setEnabled(!graph.tooltipHandler.isEnabled());
    });
    action.setToggleAction(true);
    action.setSelectedCallback(function() { return graph.tooltipHandler.isEnabled(); });
  }
  
  collapseExpand() {
    action = this.addAction('collapseExpand', () => {
      var change = new ChangePageSetup(ui);
      change.ignoreColor = true;
      change.ignoreImage = true;
      change.foldingEnabled = !graph.foldingEnabled;
      
      graph.model.execute(change);
    });
    action.setToggleAction(true);
    action.setSelectedCallback(function() { return graph.foldingEnabled; });
    action.isEnabled = isGraphEnabled;
  }

  scrollbars() {
    action = this.addAction('scrollbars', function()
    {
      ui.setScrollbars(!ui.hasScrollbars());
    });
    action.setToggleAction(true);
    action.setSelectedCallback(function() { return graph.scrollbars; });
  }

  pageView() {
    action = this.addAction('pageView', mxUtils.bind(this, function()
    {
      ui.setPageVisible(!graph.pageVisible);
    }));
    action.setToggleAction(true);
    action.setSelectedCallback(function() { return graph.pageVisible; });
  }

  connectionArrows() {
    action = this.addAction('connectionArrows', () => {
      graph.connectionArrowsEnabled = !graph.connectionArrowsEnabled;
      ui.fireEvent(new mxEventObject('connectionArrowsChanged'));
    }, null, null, 'Alt+Shift+A');
    action.setToggleAction(true);  
    action.setSelectedCallback(function() { return graph.connectionArrowsEnabled; });
  }


	connectionPoints() {
    action = this.addAction('connectionPoints', () => {
      graph.setConnectable(!graph.connectionHandler.isEnabled());
      ui.fireEvent(new mxEventObject('connectionPointsChanged'));
    }, null, null, 'Alt+Shift+P');  
    action.setToggleAction(true);
    action.setSelectedCallback(function() { return graph.connectionHandler.isEnabled(); });
  }

  copyConnect() {
    action = this.addAction('copyConnect', function()
    {
      graph.connectionHandler.setCreateTarget(!graph.connectionHandler.isCreateTarget());
      ui.fireEvent(new mxEventObject('copyConnectChanged'));
    });
    action.setToggleAction(true);
    action.setSelectedCallback(function() { return graph.connectionHandler.isCreateTarget(); });
    action.isEnabled = isGraphEnabled;
  }

  autosave() {
    action = this.addAction('autosave', function()
    {
      ui.editor.setAutosave(!ui.editor.autosave);
    });
    action.setToggleAction(true);
    action.setSelectedCallback(function() { return ui.editor.autosave; });
    action.isEnabled = isGraphEnabled;
    action.visible = false;  
  }
}