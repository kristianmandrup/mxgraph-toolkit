import mx from "mx";
const { mxConstants } = mx

export class HoverStyle {
  graph: any

  constructor(graph: any) {
    this.graph = graph
  }

  updateStyle(state, hover) {
    if (hover) {
      state.style[mxConstants.STYLE_FILLCOLOR] = '#ff0000';
    }
    
    // Sets rounded style for both cases since the rounded style
    // is not set in the default style and is therefore inherited
    // once it is set, whereas the above overrides the default value
    state.style[mxConstants.STYLE_ROUNDED] = (hover) ? '1' : '0';
    state.style[mxConstants.STYLE_STROKEWIDTH] = (hover) ? '4' : '1';
    state.style[mxConstants.STYLE_FONTSTYLE] = (hover) ? mxConstants.FONT_BOLD : '0';
  };  
}