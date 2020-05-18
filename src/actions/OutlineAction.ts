import { BaseAction } from "./BaseAction";
import mx from "mx";
const { mxEventObject, mxUtils } = mx

export class OutlineAction extends BaseAction {
  outlineWindow: any
  ui: any

  add() {
    const { ui } = this
    const action = this.addAction('outline', () => {
      if (this.outlineWindow == null)
      {
        // LATER: Check layers window for initial placement
        this.outlineWindow = new OutlineWindow(ui, document.body.offsetWidth - 260, 100, 180, 180);
        this.outlineWindow.window.addListener('show', function()
        {
          ui.fireEvent(new mxEventObject('outline'));
        });
        this.outlineWindow.window.addListener('hide', function()
        {
          ui.fireEvent(new mxEventObject('outline'));
        });
        this.outlineWindow.window.setVisible(true);
        ui.fireEvent(new mxEventObject('outline'));
      }
      else
      {
        this.outlineWindow.window.setVisible(!this.outlineWindow.window.isVisible());
      }
    }, null, null, Editor.ctrlKey + '+Shift+O');
    
    action.setToggleAction(true);
    action.setSelectedCallback(() => { 
      return this.outlineWindow != null && this.outlineWindow.window.isVisible(); 
    });
  }
}
