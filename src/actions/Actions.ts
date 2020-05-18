/**
 * Copyright (c) 2006-2020, JGraph Ltd
 * Copyright (c) 2006-2020, draw.io AG
 *
 * Constructs the actions object for the given UI.
 */
const Editor: any = {}

class Actions {
  editorUi: any
  actions: any

  constructor(editorUi) {
    this.editorUi = editorUi
    this.actions = {}
    this.init()
  }

  init() {
    const ui = this.editorUi;
    const editor = ui.editor;
    const graph = editor.graph;
    const isGraphEnabled = () => {
      return Action.prototype.isEnabled.apply(this, arguments) && graph.isEnabled();
    };
  }

  addAction(label: string, actionFn, x?, y?) {
  }

  newGraph() {
    this.addAction('new...', () => { 
      graph.openLink(ui.getUrl()); 
    });
  }

  editDiagram() {
    this.addAction('editDiagram...', function()
    {
      var dlg = new EditDiagramDialog(ui);
      ui.showDialog(dlg.container, 620, 420, true, false);
      dlg.init();
    });  
  }
    
  turn() {
    this.put('turn', new Action(mxResources.get('turn') + ' / ' + mxResources.get('reverse'), function(evt)
    {
      graph.turnShapes(graph.getSelectionCells(), (evt != null) ? mxEvent.isShiftDown(evt) : false);
    }, null, null, Editor.ctrlKey + '+R'));
  }  
}
