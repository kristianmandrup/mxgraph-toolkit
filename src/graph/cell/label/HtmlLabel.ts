import mx from "mx";
import { Input } from "./Input";
import { CheckboxInput } from "./CheckboxInput";
import { SelectInput } from "./SelectInput";
const { mxEvent, mxClient, mxUtils, mxUndoManager } = mx

type ConstructOpts = {
  cached?: boolean 
  hasInputs?: boolean
  inputType?: string
  classMap?: any
} 

export const classMap = {
  text: Input,
  checkbox: CheckboxInput,
  select: SelectInput
}

export const defaults = {
  classMap
}

export class HtmlLabel {
  graph: any
  cached?: boolean
  data?: any
  hasInputs?: boolean
  classMap: any = {}
  inputType: string = 'text'

  constructor(graph: any, data?: any, {classMap, cached, hasInputs, inputType}: ConstructOpts = {}) {
    this.graph = graph
    this.cached = cached
    this.data = data
    this.hasInputs = hasInputs
    this.inputType = inputType || this.inputType
    this.setClassMap(classMap)
  }

  setClassMap(classMap: any = {}) {
    this.classMap = {
      ...defaults.classMap,
      ...classMap
    }      
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
    const { value } = cell
    const { nodeName } = value || {}
    return mxUtils.isNode(value, nodeName) && nodeName.toLowerCase() === name    
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
      this.enrichCellElement(cell, div)                      
      if (cached) {
        // Caches label
        cell.div = div;
      }      
      return div;
    }
    return '';
  };

  enrichCellElement(cell, div) {
    this.addLineBreak(div)
    if (this.hasInputs) {
      const inputElem = this.createInputElem(cell)
      div.appendChild(inputElem);
    }  
  }

  addLineBreak(element) {
    mxUtils.br(element);
  }

  createInputElem(cell): Element {
    const clazz = this.classMap[this.inputType]
    return new clazz(this.graph, cell).createElement()
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
