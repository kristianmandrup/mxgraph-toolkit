import mx from "mx";
import { check } from "prettier";
import { Checkbox } from "./Checkbox";
const { mxEvent, mxClient, mxUtils, mxUndoManager } = mx

export class HtmlLabel {
  graph: any
  cached?: boolean
  data?: any
  hasCheckbox?: boolean

  constructor(graph: any, data?: any, {cached, hasCheckbox}: {cached?: boolean, hasCheckbox?: boolean} = {}) {
    this.graph = graph
    this.cached = cached
    this.data = data
    this.hasCheckbox = hasCheckbox
  }

  setData(data) {
    this.data = data
    return this
  }

  init() {
    const { graph } = this
    graph.convertValueToString = this.convertValueToString
    graph.cellLabelChanged = this.cellLabelChanged
    graph.getEditingValue = this.getEditingValue
    return this
  }

  isUserObject(cell, name: string = 'userobject' ): boolean {
    return mxUtils.isNode(cell.value, cell.value.nodeName) && cell.value.nodeName.toLowerCase() === name    
  }

  // Overrides method to provide a cell label in the display
  convertValueToString(cell) {
    const { cached } = this
    if (cached && cell.div) {
      // Uses cached label
      return cell.div;
    }
    
    if (this.isUserObject(cell)) {
      // Returns a DOM for the label
      var div = document.createElement('div');
      div.innerHTML = cell.getAttribute('label');
      mxUtils.br(div);
      
      if (this.hasCheckbox) {
        const checkbox = this.createCheckBox(cell)
        div.appendChild(checkbox);
      }
                      
      if (cached) {
        // Caches label
        cell.div = div;
      }      
      return div;
    }
    return '';
  };

  createCheckBox(cell): Element {
    return new Checkbox(this.graph, cell).createElement()
  }

  // Overrides method to store a cell label in the model  
  cellLabelChanged(cell, newValue, autoSize) {
    const { graph } = this
    const cellLabelChanged = graph.cellLabelChanged;
    if (this.isUserObject(cell)) {
      // Clones the value for correct undo/redo
      var elt = cell.value.cloneNode(true);
      elt.setAttribute('label', newValue);
      newValue = elt;
    }
    
    cellLabelChanged.apply(this, arguments);
  };
  
  // Overrides method to create the editing value
  
  getEditingValue(cell) {
    const { graph, data } = this
    if (this.isUserObject(cell)) {
      return cell.getAttribute('label');
    }

    var parent = graph.getDefaultParent();
    graph.insertVertex(parent, null, data, 20, 20, 80, 60);

    // set up undoManager?
  };
}
