export class TextActions {
  subscript() {
    this.addAction('subscript', () => {
      if (graph.cellEditor.isContentEditing()) {
        document.execCommand('subscript', false, null);
      }
    }), null, null, Editor.ctrlKey + '+,');
  }

  superscript() {
    this.addAction('superscript', () => {
      if (graph.cellEditor.isContentEditing()) {
        document.execCommand('superscript', false, null);
      }
    }), null, null, Editor.ctrlKey + '+.');
  }

  indent() {
    this.addAction('indent', () => {
      // NOTE: Alt+Tab for outdent implemented via special code in
      // keyHandler.getFunction in EditorUi.js. Ctrl+Tab is reserved.
      if (graph.cellEditor.isContentEditing()) {
        document.execCommand('indent', false, null);
      }
    }), null, null, 'Shift+Tab');
  }
}
