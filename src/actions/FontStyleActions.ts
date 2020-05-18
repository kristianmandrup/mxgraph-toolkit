import mx from "mx";
const { mxUtils, mxConstants } = mx

export class FontStyleActions {
  init() {
    // Font style actions
    const toggleFontStyle = (key, style, fn, shortcut) => {
      return this.addAction(key, () => {
        if (fn != null && graph.cellEditor.isContentEditing()) {
          fn();
        }
        else {
          graph.stopEditing(false);
          
          graph.getModel().beginUpdate();
          try {
            var cells = graph.getSelectionCells();
            graph.toggleCellStyleFlags(mxConstants.STYLE_FONTSTYLE, style, cells);
            
            // Removes bold and italic tags and CSS styles inside labels
            if ((style & mxConstants.FONT_BOLD) == mxConstants.FONT_BOLD) {
              graph.updateLabelElements(graph.getSelectionCells(), (elt) => {
                elt.style.fontWeight = null;
                
                if (elt.nodeName == 'B') {
                  graph.replaceElement(elt);
                }
              });
            }
            else if ((style & mxConstants.FONT_ITALIC) == mxConstants.FONT_ITALIC) {
              graph.updateLabelElements(graph.getSelectionCells(), (elt) => {
                elt.style.fontStyle = null;                
                if (elt.nodeName == 'I') {
                  graph.replaceElement(elt);
                }
              });
            }
            else if ((style & mxConstants.FONT_UNDERLINE) == mxConstants.FONT_UNDERLINE) {
              graph.updateLabelElements(graph.getSelectionCells(), (elt) => {
                elt.style.textDecoration = null;                
                if (elt.nodeName == 'U')
                {
                  graph.replaceElement(elt);
                }
              });
            }
            
            for (var i = 0; i < cells.length; i++) {
              if (graph.model.getChildCount(cells[i]) == 0) {
                graph.autoSizeCell(cells[i], false);
              }
            }
          }
          finally {
            graph.getModel().endUpdate();
          }
        }
      }, null, null, shortcut);
    });
    
    toggleFontStyle('bold', mxConstants.FONT_BOLD, function() { document.execCommand('bold', false, null); }, Editor.ctrlKey + '+B');
    toggleFontStyle('italic', mxConstants.FONT_ITALIC, function() { document.execCommand('italic', false, null); }, Editor.ctrlKey + '+I');
    toggleFontStyle('underline', mxConstants.FONT_UNDERLINE, function() { document.execCommand('underline', false, null); }, Editor.ctrlKey + '+U');
  }
}