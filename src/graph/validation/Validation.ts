import mx from "mx";
const { mxGraph } = mx

export class Validation {
  setValidateCellErrorMsg() {
    mxGraph.prototype.validateCell = this.validateCellErrorMsg
  }
  
  validateCellErrorMsg = (cell, context) => {    
  }    
  
  setValidateEdgeErrorMsg() {
    mxGraph.prototype.validateEdge = this.validateEdgeErrorMsg
  }
  
  validateEdgeErrorMsg = (edge, source, target) => {    
  }   
}
