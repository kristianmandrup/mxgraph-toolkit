import mx from "mx";
const { mxRectangle, mxRectangleShape } = mx

export class SecondLabel {
  graph: any

  constructor(graph: any) {
    this.graph = graph
  }

  setHtmlAllowed() {    
    mxRectangleShape.prototype.isHtmlAllowed = this.isHtmlAllowed
  }

  isHtmlAllowed() {
    const proto = mxRectangleShape.prototype
    const mxRectangleShapeIsHtmlAllowed = proto.isHtmlAllowed;
    return mxRectangleShapeIsHtmlAllowed.call(this) && proto.state == null;
  }

  setPaintForeground() {    
    mxRectangleShape.prototype.paintForeground = this.paintForeground  
  }  

  paintForeground(c, x, y, w, h) {
    const proto = mxRectangleShape.prototype
    const mxRectangleShapePaintForeground = proto.paintForeground;
    const { state } = proto
    if (state && state.cell.geometry && !state.cell.geometry.relative) {
      c.setFontColor('#a0a0a0');
      c.text(x + 2, y, 0, 0, state.cell.id, 'left', 'top');
    }
    
    mxRectangleShapePaintForeground.call(this, c, x, y, w, h);
  }

  setGetSecondLabel() {
    const { graph } = this
    graph.getSecondLabel = (cell) => {
      if (graph.model.isEdge(cell)) return
      // Possible to return any string here
      return cell.id;
    }
  }

  setRedrawShape() {
    const { graph } = this
    // Creates the shape for the shape number and puts it into the draw pane
    graph.cellRenderer.redrawShape = this.redrawShape
  }  

  redrawShape(state, force, rendering) {
    const { graph } = this
    const redrawShape = graph.cellRenderer.redrawShape;    
    var result = redrawShape.apply(this, arguments);
    if (state.secondLabel) {
      var scale = graph.getView().getScale();
      var bounds = this.createBoundsRectangle(state, { scale })
      this.setState(state, { scale, bounds })
    }      
    return result;
  }    

  protected createBoundsRectangle(state, { scale }: any) {
    return new mxRectangle(state.x + state.width - 8 * scale, state.y + 8 * scale, 35, 0);
  }
  
  protected setState(state, { scale, bounds}: any) {
    const { graph } = this
    state.secondLabel.state = state;
    state.secondLabel.value = graph.getSecondLabel(state.cell);
    state.secondLabel.scale = scale;
    state.secondLabel.bounds = bounds;
    state.secondLabel.redraw();    
  }
}