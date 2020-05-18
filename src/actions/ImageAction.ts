import { BaseAction } from "./BaseAction";
import mx from "mx";
const { mxEventObject, mxConstants, mxResources, mxUtils } = mx



export class ImageAction extends BaseAction {
  graph: any
  ui: any
  isGraphEnabled?: boolean
  selectionState: any

  add() {
    const { ui, graph, isGraphEnabled } = this
    const action = this.addAction('image...', () => {
      if (graph.isEnabled() && !graph.isCellLocked(graph.getDefaultParent())) {
        var title = mxResources.get('image') + ' (' + mxResources.get('url') + '):';
        var state = graph.getView().getState(graph.getSelectionCell());
        var value = '';
        if (state != null) {
          value = state.style[mxConstants.STYLE_IMAGE] || value;
        }        
        var selectionState = graph.cellEditor.saveSelection();
        ui.showImageDialog(title, value, this.x, graph.cellEditor.isContentEditing(), !graph.cellEditor.isContentEditing());
      }
    }, null, null, null)
    action.isEnabled = isGraphEnabled;    
  }

  x(newValue, w, h) {
    const { ui, graph, selectionState } = this
    // Inserts image into HTML text
    if (graph.cellEditor.isContentEditing()) {
      graph.cellEditor.restoreSelection(selectionState);
      graph.insertImage(newValue, w, h);
    } else {
      var cells = graph.getSelectionCells();
    
      if (newValue != null && (newValue.length > 0 || cells.length > 0)) {
        var select = null;
        
        graph.getModel().beginUpdate();
        try {
          // Inserts new cell if no cell is selected
          if (cells.length == 0) {
            var pt = graph.getFreeInsertPoint();
            cells = [graph.insertVertex(graph.getDefaultParent(), null, '', pt.x, pt.y, w, h,
                'shape=image;imageAspect=0;aspect=fixed;verticalLabelPosition=bottom;verticalAlign=top;')];
            select = cells;
            graph.fireEvent(new mxEventObject('cellsInserted', 'cells', select));
          }                
          graph.setCellStyles(mxConstants.STYLE_IMAGE, (newValue.length > 0) ? newValue : null, cells);
            
          // Sets shape only if not already shape with image (label or image)
          var style = graph.getCurrentCellStyle(cells[0]);
            
          if (style[mxConstants.STYLE_SHAPE] != 'image' && style[mxConstants.STYLE_SHAPE] != 'label') {
            graph.setCellStyles(mxConstants.STYLE_SHAPE, 'image', cells);
          }
          else if (newValue.length == 0) {
            graph.setCellStyles(mxConstants.STYLE_SHAPE, null, cells);
          }
          
          if (graph.getSelectionCount() == 1) {
            if (w != null && h != null) {
              var cell = cells[0];
              var geo = graph.getModel().getGeometry(cell);
              
              if (geo != null) {
                geo = geo.clone();
                geo.width = w;
                geo.height = h;
                graph.getModel().setGeometry(cell, geo);
              }
            }
          }
        } finally {
          graph.getModel().endUpdate();
        }
        
        if (select != null) {
          graph.setSelectionCells(select);
          graph.scrollCellToVisible(select[0]);
        }
      }  
    }
  }
}
