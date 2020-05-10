import mx from "../../mx";
const { mxUtils, mxConstants, mxPerimeter } = mx

export class TwoWayEdgeStyle {
  graph: any
  style: any

  constructor(graph: any) {
    this.graph = graph
  }

  create() {
    const { graph } = this

    // Changes the default vertex style in-place
    let style = graph.getStylesheet().getDefaultVertexStyle();
    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
    
    // vertexStyle[mxConstants.STYLE_ROUNDED] = true;

    style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter;
    style[mxConstants.STYLE_GRADIENTCOLOR] = 'white';
    style[mxConstants.STYLE_PERIMETER_SPACING] = 4;
    style[mxConstants.STYLE_SHADOW] = true;
    
    style = graph.getStylesheet().getDefaultEdgeStyle();
    style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = 'white';
            
    style = mxUtils.clone(style);
    style[mxConstants.STYLE_STARTARROW] = mxConstants.ARROW_CLASSIC;
    this.style = style    
  }

  registerInStylesheet(style) {
    const { graph } = this
    style = style || this.style
    graph.getStylesheet().putCellStyle('2way', style);    
  }
}