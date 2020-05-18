// Navigation actions
export class Navigation {
  home() {
    this.addAction('home', function() { graph.home(); }, null, null, 'Home');
  }
    
  exitGroup() {
    this.addAction('exitGroup', function() { graph.exitGroup(); }, null, null, Editor.ctrlKey + '+Shift+Home');
  }
    
  enterGroup() {
    this.addAction('enterGroup', function() { graph.enterGroup(); }, null, null, Editor.ctrlKey + '+Shift+End');
  }
 
  collapse() {
    this.addAction('collapse', function() { graph.foldCells(true); }, null, null, Editor.ctrlKey + '+Home');
  }
    
  expand() {
    this.addAction('expand', function() { graph.foldCells(false); }, null, null, Editor.ctrlKey + '+End');
  }    
}