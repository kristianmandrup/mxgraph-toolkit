import mx from "mx";
const { mxEvent, mxClient } = mx

export class Checkbox {
  graph: any
  cell: any

  constructor(graph: any, cell: any) {
    this.graph = graph
    this.cell = cell    
  }

  createElement(): Element {
    const { cell } = this
    const checkbox = this.createCheckboxElement()
    this.addCheckboxListener(checkbox)  
    return checkbox
  }
  
  createCheckboxElement(): Element {
    const { cell } = this
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    
    if (cell.getAttribute('checked') === 'true') {
      checkbox.setAttribute('checked', 'checked');
      checkbox.defaultChecked = true;
    }  
    return checkbox
  }
  
  addCheckboxListener(checkbox) {
    // Writes back to cell if checkbox is clicked
    mxEvent.addListener(checkbox, (mxClient.IS_QUIRKS) ? 'click' : 'change', (evt) => {
      this.setCellWithValue(checkbox.checked)
    });
  }
    
  setCellWithValue(value) {
    const { graph, cell } = this
    var cellValue = cell.value.cloneNode(true);
    this.setCellValue(cellValue, value)
    graph.model.setValue(cell, cellValue);  
  }
  
  setCellValue(cellValue, value) {
    const checked = value ? 'true' : 'false'
    cellValue.setAttribute('checked', checked);
  }
}
