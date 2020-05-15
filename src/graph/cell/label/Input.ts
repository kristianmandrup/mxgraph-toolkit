import mx from "mx";
const { mxEvent, mxClient } = mx

export class Input {
  graph: any
  cell: any
  attributeName: string = 'textVal'
  inputType: string = 'text'

  constructor(graph: any, cell: any, { attributeName, inputType }: any = {}) {
    this.graph = graph
    this.cell = cell    
    this.inputType = inputType || this.inputType
    this.attributeName = attributeName || this.attributeName
  }

  createElement(): Element {
    const inputElem = this.createInputElement()
    this.addInputListener(inputElem)  
    return inputElem
  }
  
  createInputElement(): Element {
    const { inputType } = this
    const inputElem = document.createElement('input');
    inputElem.setAttribute('type', inputType);
    this.setInputElement(inputElem)  
    return inputElem
  }

  setInputElement(inputElem) {
  }

  inputValueFor(inputElem) {
    return inputElem.value
  }

  addInputListener(inputElem) {
    // Writes back to cell if checkbox is clicked
    const modifyEvent = (mxClient.IS_QUIRKS) ? 'click' : 'change'
    mxEvent.addListener(inputElem, modifyEvent, (evt) => {
      const value = this.inputValueFor(inputElem)
      this.setCellWithValue(inputElem)
    });
  }
    
  setCellWithValue(value) {
    const { graph, cell } = this
    var cellValue = cell.value.cloneNode(true);
    this.setCellValue(cellValue, value)
    graph.model.setValue(cell, cellValue);  
  }
  
  setCellValue(cellValue, value) {
    const { attributeName } = this
    const newValue = this.valueToSetWith(value)
    cellValue.setAttribute(attributeName, newValue);
  }

  valueToSetWith(value) {
    return value
  }
}
