import mx from "mx";
const { mxVertexHandler, mxShape, mxConstants, mxStencilRegistry } = mx

export class VertexHandler {
  vertexHandlerProto: any
  graph: any
  state: any

  constructor(graph: any) {
    this.vertexHandlerProto = mxVertexHandler.prototype
    this.graph = graph    
  }

  setState(state: any = {}) {
    this.state = state
    return this
  }

  enableVertexResizePreviews() {
    this.vertexHandlerProto.createSelectionShape = this.createSelectionShape
  }

  // Uses the shape for resize previews
  createSelectionShape(bounds) {
    var key = this.state.style[mxConstants.STYLE_SHAPE];
    var stencil = mxStencilRegistry.getStencil(key);
    let shape: any = null;
    
    if (stencil) {
      shape = new mxShape(stencil);
      shape.apply(this.state);
    }
    else {
      shape = new this.state.shape.constructor();
    }   
    shape = this.configureShape(shape, bounds)   
    return shape;
  };     

  configureShape(shape, bounds) {
    const handler = this.vertexHandlerProto
    shape.outline = true;
    shape.bounds = bounds;
    shape.stroke = mxConstants.HANDLE_STROKECOLOR;
    shape.strokewidth = handler.getSelectionStrokeWidth();
    shape.isDashed = handler.isSelectionDashed();
    shape.isShadow = false;  
    return shape
  }
}