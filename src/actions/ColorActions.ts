export class ColorActions {
  init() {
    // Color actions
    this.addAction('fontColor...', function() { ui.menus.pickColor(mxConstants.STYLE_FONTCOLOR, 'forecolor', '000000'); });
    this.addAction('strokeColor...', function() { ui.menus.pickColor(mxConstants.STYLE_STROKECOLOR); });
    this.addAction('fillColor...', function() { ui.menus.pickColor(mxConstants.STYLE_FILLCOLOR); });
    this.addAction('gradientColor...', function() { ui.menus.pickColor(mxConstants.STYLE_GRADIENTCOLOR); });
    this.addAction('backgroundColor...', function() { ui.menus.pickColor(mxConstants.STYLE_LABEL_BACKGROUNDCOLOR, 'backcolor'); });
    this.addAction('borderColor...', function() { ui.menus.pickColor(mxConstants.STYLE_LABEL_BORDERCOLOR); });
  }
}
