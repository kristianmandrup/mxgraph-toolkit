export class DeleteActions {
  deleteSelected() {
    this.addAction('delete', (evt) => {
      this.deleteCells(evt != null && mxEvent.isShiftDown(evt));
    }, null, null, 'Delete');  
  }
  
  deleteAll() {
    this.addAction('deleteAll', () => {
      this.deleteCells(true);
    }, null, null, Editor.ctrlKey + '+Delete');  
  }
}

