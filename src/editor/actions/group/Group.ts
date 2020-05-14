export class GroupAction {
  groupOrUngroup(editor, cell) {
    cell = cell || editor.graph.getSelectionCell();
    if (this.isCellToUngroup(editor, cell)) {
      return editor.execute('ungroup', cell);      
    }
    if (this.isCellToGroup(editor, cell)) {
      return editor.execute('group');
    }
  }
  
  isCellToUngroup(editor, cell): boolean {
    return cell && editor.graph.isSwimlane(cell)      
  }  

  isCellToGroup(editor, cell): boolean {
    return true
  }  
}
