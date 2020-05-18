export class SelectActions {
  selectVertices() {
    this.addAction('selectVertices', function() { graph.selectVertices(null, true); }, null, null, Editor.ctrlKey + '+Shift+I');
  }

  selectEdges() {
    this.addAction('selectEdges', function() { graph.selectEdges(); }, null, null, Editor.ctrlKey + '+Shift+E');
  }

  selectAll() {
    this.addAction('selectAll', function() { graph.selectAll(null, true); }, null, null, Editor.ctrlKey + '+A');
  }

  selectNone() {
    this.addAction('selectNone', function() { graph.clearSelection(); }, null, null, Editor.ctrlKey + '+Shift+A');
  }
}