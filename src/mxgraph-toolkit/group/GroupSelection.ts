import mx from "@toolkit/mx";
const { mxGraphHandler, mxPopupMenuHandler } = mx

export class GroupSelection {
  graph: any
  graphHandler: any
  popupHandler: any

  constructor(graph: any) {
    this.graph = graph
    this.graphHandler = mxGraphHandler.prototype
    this.popupHandler = mxPopupMenuHandler.prototype
  }

  init() {
    const { popupHandler, graphHandler, mouseDown, getInitialCellForEvent, 
      isDelayedSelection, selectDelayed, getCellForPopupEvent } = this
    popupHandler.getCellForPopupEvent = getCellForPopupEvent

    graphHandler.mouseDown = mouseDown
    graphHandler.getInitialCellForEvent = getInitialCellForEvent    
    graphHandler.isDelayedSelection = isDelayedSelection
    graphHandler.selectDelayed = selectDelayed
  }
  
  // Don't clear selection if multiple cells selected
  mouseDown(sender, me) {
    const { graph, graphHandler } = this
    const graphHandlerMouseDown = graphHandler.mouseDown;
    graphHandlerMouseDown.apply(graphHandler, arguments);

    if (graph.isCellSelected(me.getCell()) && graph.getSelectionCount() > 1)
    {
      graphHandler.delayedSelection = false;
    }
  }
  
  getInitialCellForEvent(me) {
    const { graph, graphHandler } = this
    // Selects descendants before children selection mode
    var graphHandlerGetInitialCellForEvent = mxGraphHandler.prototype.getInitialCellForEvent;
    var model = graph.getModel();
    var psel = model.getParent(graph.getSelectionCell());
    var cell = graphHandlerGetInitialCellForEvent.apply(graphHandler, me);
    var parent = model.getParent(cell);
    
    if (psel == null || (psel !== cell && psel !== parent)) {
      while (!graph.isCellSelected(cell) && !graph.isCellSelected(parent) &&
          model.isVertex(parent) && !graph.isValidRoot(parent)) {
        cell = parent;
        parent = graph.getModel().getParent(cell);
      }
    }
    
    return cell;
  }	

  isDelayedSelection(cell) {
    const { graphHandler, graph } = this
    // Selection is delayed to mouseup if child selected
    var graphHandlerIsDelayedSelection = mxGraphHandler.prototype.isDelayedSelection;
    var result = graphHandlerIsDelayedSelection.apply(graphHandler, cell);
    var model = this.graph.getModel();
    var psel = model.getParent(this.graph.getSelectionCell());
    var parent = model.getParent(cell);
    
    if (psel == null || (psel !== cell && psel !== parent)) {
      if (!graph.isCellSelected(cell) && model.isVertex(parent) && !graph.isValidRoot(parent)) {
        result = true;
      }
    }			
    return result;
  }
  
  // Delayed selection of parent group
  selectDelayed(me) {
    const { graphHandler } = this
    var cell = me.getCell();
    
    if (!cell) {
      cell = graphHandler.cell;
    }
    
    var model = this.graph.getModel();
    var parent = model.getParent(cell);
    
    const isValidSelected = (cell, parent) =>
      this.graph.isCellSelected(cell) && 
      model.isVertex(parent) && 
      !this.graph.isValidRoot(parent)

    while (isValidSelected(cell, parent)) {
      cell = parent;
      parent = model.getParent(cell);
    }
    
    this.graph.selectCellForEvent(cell, me.getEvent());
  }

  // Returns last selected ancestor
  getCellForPopupEvent(me)
  {
    var cell = me.getCell();
    var model = this.graph.getModel();
    var parent = model.getParent(cell);
    
    while (model.isVertex(parent) && !this.graph.isValidRoot(parent)) {
      if (this.graph.isCellSelected(parent)) {
        cell = parent;
      }
      
      parent = model.getParent(parent);
    }
    
    return cell;
  };  
}
