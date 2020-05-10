import mx from "@toolkit/mx";
const { mxEdgeHandler, mxGraphHandler } = mx

export class GraphToggler {
  graph: any

  constructor(graph: any) {
    this.graph = graph
  }

  setDropEnabled(value: boolean) {
    this.graph.setDropEnabled(value)
  }

  setSplitEnabled(value: boolean) {
    this.graph.setSplitEnabled(value)
  }

  setResizeContainerEnabled(value: boolean) {
    this.graph.setResizeContainer(value)
  }

  setAllowLoops(value: boolean) {
    this.graph.setAllowLoops(value);
  }
    
  setFoldingEnabled(value: boolean) {
    this.graph.foldingEnabled = value;
  }

  setRecursiveResizeEnabled(value: boolean) {
    this.graph.recursiveResize = value;
  }

  setCellsDisconnectable(value: boolean) {
    this.graph.setCellsDisconnectable(value);
  }

  setAllowDanglingEdges(value: boolean) {
    this.graph.setAllowDanglingEdges(value);
  }

  setCellsEditable(value: boolean) {
    this.graph.setCellsEditable(value);
  }
  
  setCenterZoom(value: boolean) {
    this.graph.centerZoom = value;
  }
  
  setGuidesEnabled(value: boolean) {
    mxGraphHandler.prototype.guidesEnabled = true;
  }
  
  setSnapToTerminals(value: boolean) {
    mxEdgeHandler.prototype.snapToTerminals = value;
  }
  
  // Disables automatic handling of ports. This disables the reset of the
  // respective style in mxGraph.cellConnected. Note that this feature may
  // be useful if floating and fixed connections are combined.
  disableAutoPorts() {
    this.setPortsEnabled(false);
  }

  setPortsEnabled(value: boolean) {
    this.graph.setPortsEnabled(value);
  }

  stopEditing(value: boolean) {
    this.graph.stopEditing(value);
  }

  setHtmlLabels(value: boolean) {
    this.graph.setHtmlLabels(value);  
  }
  
  setPanning(value: boolean) {
    this.graph.setPanning(value)
  }

  setEnabled(value: boolean) {
    this.graph.setEnabled(value);
  }

  setConnectable(value: boolean) {
    this.graph.setConnectable(value);
  }
  
  setMultigraph(value: boolean) {
    this.graph.setMultigraph(value);
  }   
  
  setTooltips(value: boolean) {
    this.graph.setTooltips(value);
  }
}

