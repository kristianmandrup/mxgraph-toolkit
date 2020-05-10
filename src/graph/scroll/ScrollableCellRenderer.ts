import mx from "mx";
const { mxEvent } = mx

export class ScrollableCellRenderer {
  graph: any
  cellRenderer: any
  oldRedrawLabel: any

  constructor(graph: any) {
    this.graph = graph
    this.cellRenderer = graph
    .this.oldRedrawLabel = graph.cellRenderer.redrawLabel;
  }

  // Scroll events should not start moving the vertex
  isLabelEvent(state, evt) {
    var source = mxEvent.getSource(evt);

    return state.text != null && source !== state.text.node &&
      source !== state.text.node.getElementsByTagName('div')[0];
  };  


  // Adds scrollbars to the outermost div and keeps the
  // DIV position and size the same as the vertex
  redrawLabel(state) {
    this.oldRedrawLabel.apply(this, arguments); // "supercall"
    var graph = state.view.graph;
    var model = graph.model;

    if (!(model.isVertex(state.cell) && state.text != null)) return

    // Scrollbars are on the div
    var s = graph.view.scale;
    state.text.node.style.overflow = 'hidden';
    var div = state.text.node.getElementsByTagName('div')[0];
    
    if (div === null) return

    // Adds height of the title table cell
    var oh = 26;

    div.style.display = 'block';
    div.style.top = oh + 'px';
    div.style.width = Math.max(1, Math.round(state.width / s)) + 'px';
    div.style.height = Math.max(1, Math.round((state.height / s) - oh)) + 'px';
    
    // Installs the handler for updating connected edges
    if (div.scrollHandler !== null) return
    div.scrollHandler = true;
    
    const updateEdges = () => {
      const edgeCount = model.getEdgeCount(state.cell);
      
      // Only updates edges to avoid update in DOM order
      // for text label which would reset the scrollbar
      for (var i = 0; i < edgeCount; i++) {
        var edge = model.getEdgeAt(state.cell, i);
        graph.view.invalidate(edge, true, false);
        graph.view.validate(edge);
      }
    };
    
    mxEvent.addListener(div, 'scroll', updateEdges);
    mxEvent.addListener(div, 'mouseup', updateEdges);      
  }
}