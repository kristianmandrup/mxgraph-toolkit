import { BaseAction } from "./BaseAction";

export class PageActions extends BaseAction {
  pageSetup() {
    this.addAction('pageSetup...', function() { ui.showDialog(new PageSetupDialog(ui).container, 320, 220, true, true); }).isEnabled = isGraphEnabled;
  }
  
  print() {
    this.addAction('print...', function() { ui.showDialog(new PrintDialog(ui).container, 300, 180, true, true); }, null, 'sprite-print', Editor.ctrlKey + '+P');
  }
  
  preview() {
    this.addAction('preview', function() { mxUtils.show(graph, null, 10, 10); });
  }
}