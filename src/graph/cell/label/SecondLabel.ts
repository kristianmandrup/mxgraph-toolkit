import mx from "mx";
import { setObjectProp } from "utils";
const { mxConstants, mxEvent, mxText, mxRectangle, mxRectangleShape } = mx

type TextProps = {
  align?: any
  valign?: any
  color?: any
  family?: any
  size?: any
  fontStyle?: any
  spacing?: any
  spacingTop?: any
  spacingRight?: any
  spacingBottom?: any
  spacingLeft?: any
  horizontal?: any
  background?: any
  border?: any
  wrap?: any
  clipped?: any
  overflow?: any
  labelPadding?: any
  textDirection?: any  
}

export class SecondLabel {
  graph: any
  secondLabelVisible: boolean = true

  defaults = {
    text: {
      align: mxConstants.ALIGN_LEFT, 
      valign: mxConstants.ALIGN_BOTTOM      
    },
    secondLabel: {
      color: 'black',
      family: 'Verdana',
      size: 8,
      fontStyle: mxConstants.FONT_ITALIC,
      background: 'yellow',
      border: 'black',
      valign: 'bottom',
      dialect: mxConstants.DIALECT_STRICTHTML,
      wrap: true
    }
  }

  constructor(graph: any, { secondLabelVisible } = {secondLabelVisible: true}) {
    this.graph = graph    
    this.secondLabelVisible = secondLabelVisible
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
    const { graph, secondLabelVisible } = this
    const redrawShape = graph.cellRenderer.redrawShape;    
    var result = redrawShape.apply(this, arguments);

    var result = redrawShape.apply(this, arguments);

    const isNotRelative = state.cell.geometry && !state.cell.geometry.relative
    const shouldDrawLabel = result && secondLabelVisible && isNotRelative

    if (shouldDrawLabel) {
      const secondLabel = graph.getSecondLabel(state.cell);
      const hasSecondLabel = secondLabel && state.shape && state.secondLabel
      if (hasSecondLabel) {
        this.setSecondLabel(state, secondLabel)
        graph.cellRenderer.initializeLabel(state, state.secondLabel);
      }
    }    

    if (state.secondLabel) {
      const { scale } = this
      const bounds = this.createBoundsRectangle(state, { scale })
      this.setState(state, { scale, bounds })
    }      
    return result;
  }    

  get scale() {
    return this.graph.getView().getScale();
  }

  setSecondLabel(state, secondLabel) {
    state.secondLabel = this.createText(secondLabel)

    // Styles the label
    this.styleSecondLabel(state)
    return state  
  }


  protected styleSecondLabel(state) {
    const style = this.defaults.secondLabel
    setObjectProp(state, style, 'secondLabel')
    state.secondLabel.dialect = state.shape.dialect;    
    return state
  }  

  protected createText(label: string, props: TextProps = {}) {
    props = {
      ...this.defaults.text,
      ...props
    }
    let {
      align,
      valign,
      color,
      family,
      size,
      fontStyle,
      spacing,
      spacingTop,
      spacingRight,
      spacingBottom,
      spacingLeft,
      horizontal,
      background,
      border,
      wrap,
      clipped,
      overflow,
      labelPadding,
      textDirection,
     } = props     
    return new mxText(label, new mxRectangle(), align, valign, color, family, size, fontStyle,
          spacing, spacingTop, spacingRight, spacingBottom, spacingLeft, horizontal, background, 
          border, wrap, clipped, overflow, labelPadding, textDirection);
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