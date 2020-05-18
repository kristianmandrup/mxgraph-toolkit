import { BaseAction } from "./BaseAction";
import mx from "mx";
const { mxUtils } = mx


export class FormatPanelAction extends BaseAction {
  ui: any
  graph: any

  add() {
    const { ui, graph } = this
    const action = this.addAction('formatPanel', () => {
      ui.toggleFormatPanel();
    }, null, null, Editor.ctrlKey + '+Shift+P');
    action.setToggleAction(true);
    action.setSelectedCallback(mxUtils.bind(this, function() { return ui.formatWidth > 0; }));    
  }
}
