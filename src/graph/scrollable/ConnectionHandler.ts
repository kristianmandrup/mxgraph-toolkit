import mx from "mx";
const { mxConnectionHandler, mxPoint } = mx

export class ConnectionHandler {
  handler: any // mxConnectionHandler.prototype

  constructor() {
    this.handler = mxConnectionHandler.prototype
  }

  getRowY(state, tr) {
    var s = state.view.scale;
    var div = tr.parentNode.parentNode.parentNode;
    var offsetTop = parseInt(div.style.top);
    var y = state.y + (tr.offsetTop + tr.offsetHeight / 2 - div.scrollTop + offsetTop) * s;
    y = Math.min(state.y + state.height, Math.max(state.y + offsetTop * s, y));    
    return y;
  };  

  setTargetPerimeterPoint() {
    this.handler.getTargetPerimeterPoint = this.targetPerimeterPoint
  }

  // Overrides target perimeter point for connection previews
  targetPerimeterPoint(state, me) {
    const handler = this.handler
    // Determines the y-coordinate of the target perimeter point
    // by using the currentRowNode assigned in updateRow
    var y = me.getY();

    if (handler.currentRowNode != null)
    {
      y = this.getRowY(state, handler.currentRowNode);
    }

    // Checks on which side of the terminal to leave
    var x = state.x;
    
    if (handler.previous.getCenterX() > state.getCenterX())
    {
      x += state.width;
    }
    
    return new mxPoint(x, y); 
  }

  setSourcePerimeterPoint() {
    this.handler.getSourcePerimeterPoint = this.getSourcePerimeterPoint.bind(this.handler)
  }

    // Overrides source perimeter point for connection previews
  getSourcePerimeterPoint(state, next, me) {
    const handler = this.handler
    var y = me.getY();

    if (handler.sourceRowNode != null) {
      y = this.getRowY(state, handler.sourceRowNode);
    }

    // Checks on which side of the terminal to leave
    var x = state.x;
      
    if (next.x > state.getCenterX()) {
      x += state.width;
    }

    return new mxPoint(x, y);
  }

  // Disables connections to invalid rows
  isValidTarget(cell) {
    const handler = this.handler
    return handler.currentRowNode != null;
  }
}