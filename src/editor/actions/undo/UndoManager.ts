import mx from "mx";
const { mxEvent, mxUtils, mxUndoManager } = mx

export class UndoManager {
  graph: any
  undoManager: any
  
  constructor(graph, {maxStackSize}: {maxStackSize?: number} = {}) {
    this.graph = graph
    this.undoManager = new mxUndoManager(maxStackSize || 100);
  }

  // Undo/redo
  init() {
    const { graph } = this
    const listener = (sender, evt) => {
      this.undoManager.undoableEditHappened(evt.getProperty('edit'));
    };
    graph.getModel().addListener(mxEvent.UNDO, listener);
    graph.getView().addListener(mxEvent.UNDO, listener);
  }

  undo() {
    document.body.appendChild(mxUtils.button('Undo', () => {
      this.undoManager.undo();
    }));
  }
    
  redo() {  
    document.body.appendChild(mxUtils.button('Redo', () => {
      this.undoManager.redo();
    })); 
  }         
}
