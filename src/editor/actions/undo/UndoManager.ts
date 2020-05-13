import mx from "mx";
import { BaseActionManager } from "../base";
const { mxEvent, mxUtils, mxUndoManager } = mx

export class UndoManager extends BaseActionManager {
  undoManager: any
  listener: any
  
  constructor(graph, {maxStackSize, container}: {maxStackSize?: number, container?: Element} = {}) {
    super(graph, container)
    this.undoManager = new mxUndoManager(maxStackSize || 100);
  }

  // Undo/redo
  init() {
    const { graph, listener } = this
    graph.getModel().addListener(mxEvent.UNDO, listener);
    graph.getView().addListener(mxEvent.UNDO, listener);
  }

  setListener() {
    this.listener = (sender, evt) => {
      this.undoManager.undoableEditHappened(evt.getProperty('edit'));
    }  
  }

  get buttons() {
    return {
      undo: this.undoButton(),
      redo: this.redoButton()
    }
  }  

  undoButton() {
    return mxUtils.button('Undo', () => {
      this.undoManager.undo();
    })
  }
    
  redoButton() {  
    mxUtils.button('Redo', () => {
      this.undoManager.redo();
    })
  }         
}
