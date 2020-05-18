import { BaseAction } from "./BaseAction";
import mx from "mx";
const { mxEventObject } = mx

export class LayersAction extends BaseAction {
  layersWindow: any
  ui: any

  layers() {
    const { ui } = this
    const action = this.addAction('layers', () => {
      if (this.layersWindow == null) {
        // LATER: Check outline window for initial placement
        this.layersWindow = new LayersWindow(ui, document.body.offsetWidth - 280, 120, 220, 196);
        this.layersWindow.window.addListener('show', () => {
          ui.fireEvent(new mxEventObject('layers'));
        });
        this.layersWindow.window.addListener('hide', () => {
          ui.fireEvent(new mxEventObject('layers'));
        });
        this.layersWindow.window.setVisible(true);
        ui.fireEvent(new mxEventObject('layers'));
        
        this.layersWindow.init();
      } else {
        this.layersWindow.window.setVisible(!this.layersWindow.window.isVisible());
      }
    }, null, null, Editor.ctrlKey + '+Shift+L');

    action.setToggleAction(true);
    action.setSelectedCallback(() => { 
      return this.layersWindow != null && this.layersWindow.window.isVisible(); 
    });
  }
}