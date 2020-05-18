import mx from 'mx'
import resources from 'resources/resources';
import { BaseAction } from './BaseAction';
const { mxClipboard, mxClient } = mx



class EditActions extends BaseAction {
  ui: any
  graph: any

  undo() {
    const { ui } = this
    // Edit actions
    this.addAction('undo', () => { ui.undo(); }, null, 'sprite-undo', Editor.ctrlKey + '+Z');
  }

  redo() {
    const { ui } = this
    this.addAction('redo', () => { ui.redo(); }, null, 'sprite-redo', (!mxClient.IS_WIN) ? Editor.ctrlKey + '+Shift+Z' : Editor.ctrlKey + '+Y');
  }
    
  cut() {
    const { graph } = this
    this.addAction('cut', () => { mxClipboard.cut(graph, []); }, null, 'sprite-cut', Editor.ctrlKey + '+X');
  }
    
  copy() {
    const { graph, ui } = this
    this.addAction('copy', () => {
      try {
        mxClipboard.copy(graph, []);
      }
      catch (e) {
        ui.handleError(e);
      }
    }, null, 'sprite-copy', Editor.ctrlKey + '+C');
  }

  paste() {
    const { graph } = this
    this.addAction('paste', () => {
      if (graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent())) {
        mxClipboard.paste(graph);
      }
    }, false, 'sprite-paste', Editor.ctrlKey + '+V');
  }

  pasteHere() {
    const { graph } = this
    this.addAction('pasteHere', (evt) => {
      const canPaste = graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent())
      if (!canPaste) return
      graph.getModel().beginUpdate();
      try {
        var cells = mxClipboard.paste(graph);          
        if (cells)
        {
          var includeEdges = true;
          
          for (var i = 0; i < cells.length && includeEdges; i++) {
            includeEdges = includeEdges && graph.model.isEdge(cells[i]);
          }

          var t = graph.view.translate;
          var s = graph.view.scale;
          var dx = t.x;
          var dy = t.y;
          var bb: any = null;
          
          if (cells.length == 1 && includeEdges)
          {
            var geo = graph.getCellGeometry(cells[0]);
            
            if (geo)
            {
              bb = geo.getTerminalPoint(true);
            }
          }

          bb = (bb != null) ? bb : graph.getBoundingBoxFromGeometry(cells, includeEdges);
          
          if (bb) {
            var x = Math.round(graph.snap(graph.popupMenuHandler.triggerX / s - dx));
            var y = Math.round(graph.snap(graph.popupMenuHandler.triggerY / s - dy));
            
            graph.cellsMoved(cells, x - bb.x, y - bb.y);
          }
        }
      }
      finally {
        graph.getModel().endUpdate();
      }
    }, null, null, null);
  }

  duplicate() {
    const { graph, ui } = this
    this.addAction('duplicate', () => {
      try {
        graph.setSelectionCells(graph.duplicateCells());
      }
      catch (e) {
        ui.handleError(e);
      }
    }, null, null, Editor.ctrlKey + '+D');
  }  
}