export class Model {
  model: any

  init(style: string) {
    this.setCellStyle(style)  
  }

  setCellStyle(style: string) {
    this.model.getStyle = Model.createGetStyleCollapsed(this.model, style)
  }

  static createGetStyleCollapsed = (model, collapsedStyle) => (cell) => {
    var modelGetStyle = model.getStyle;  
    if (cell != null)
    {
      var style = modelGetStyle.call(cell);      
      if (model.isCollapsed(cell)) {
        style = style + ';' + collapsedStyle
      }      
      return style;
    }    
    return null;
  };  
}
