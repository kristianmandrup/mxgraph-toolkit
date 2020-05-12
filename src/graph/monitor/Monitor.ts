import mx from "mx";
const { mxEvent, mxCellOverlay, mxUtils, mxConstants } = mx

// use for monitoring Workflow State
export class Monitor {
  graph: any
  states: any

  constructor(graph: any, createStates: any) {
    this.graph = graph
    this.states = this.createStates()
  }

  createStateEntry(props: any = {}) {
    const { graph } = this
    const { stateName, fillColor } = props
    return  (state, cell) => {
      if (state !== stateName) return
      graph.setCellStyles(mxConstants.STYLE_FILLCOLOR, fillColor, [cell]);
    }
  }

  get stateProps() {
    return [{
      label: 'running',
      stateName: 'Running',
      fillColor: '#f8cecc'
    }]
  }

  createInitState() {
    const { graph } = this
    return (state, cell) => {
      if (state !== 'Init') return
      graph.addCellOverlay(cell, this.createOverlay(graph.warningImage, 'State: ' + state));
    }
  }

  createStates() {
    let stateMap = this.stateProps.reduce((acc, props) => {
      const { label } = props
      acc[label] = this.createStateEntry(props)
      return acc
    }, {})
    stateMap = {
      ...stateMap,
      init: this.createInitState()
    }
    return stateMap
  }

  get tooltipPostFix() {
    return '\nLast update: ' + new Date()
  }

  createOverlay(image, tooltip) {
    const overlay = new mxCellOverlay(image, tooltip);

    // Installs a handler for clicks on the overlay
    overlay.addListener(mxEvent.CLICK, (sender, evt) => {
      mxUtils.alert(tooltip + this.tooltipPostFix);
    });
    
    return overlay;
  };  

  /**
   * Updates the display of the given graph using the XML data
   */
  update(xml) {
    const { graph } = this
    if (xml === null || xml.length > 0) return
    var doc = mxUtils.parseXml(xml);
    
    if (doc != null && doc.documentElement != null) {
      var model = graph.getModel();
      var nodes = doc.documentElement.getElementsByTagName('update');
      
      if (nodes != null && nodes.length > 0) {
        model.beginUpdate();
        try {
          this.processNodes(nodes)
        }
        finally {
          model.endUpdate();
        }
      }
    }
  }

  processNodes(nodes) {
    nodes.map(this.processNode)
  }

  processNode = (node) => {  
    const { graph } = this
    const model = graph.getModel();

    const id = node.getAttribute('id');
    const state = node.getAttribute('state');    
    // Gets the cell for the given activity name from the model
    var cell = model.getCell(id);  
    // Updates the cell color and adds some tooltip information
    if (cell === null) return

    // Resets the fillcolor and the overlay
    this.resetOverlay(cell)
    this.processStates(state, cell)
  }

  resetOverlay(cell) {
    const { graph } = this
    // Resets the fillcolor and the overlay
    graph.setCellStyles(mxConstants.STYLE_FILLCOLOR, 'white', [cell]);
    graph.removeCellOverlays(cell);
  }

  processStates(state, cell) {
    const { states } = this
    Object.keys(states).map(key => {
      const stateFn = states[key]
      return stateFn(state, cell)
    })
  }
}