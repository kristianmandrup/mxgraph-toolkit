import mx from "./mx";
const { mxCellTracker } = mx

export const createCellTooltip = (graph: any): CellTooltip => {
  return new CellTooltip(graph).init()
}

export class CellTooltip {
  graph: any

  constructor(graph: any) {
    this.graph = graph
  }

  highlightCellOnHover() {
    // Adds a highlight on the cell under the mousepointer
    new mxCellTracker(this.graph);
  }

  init() {
    this.graph.getTooltipForCell = this.getTooltipForCell
    return this
  }
  getTooltipForCell(cell): string {
    const { graph } = this
    const getTooltipForCell = graph.getTooltipForCell;
    const model = graph.getModel()
    
    if (!cell) return ''
    let tip = '';
    var src = model.getTerminal(cell, true);      
    if (src) {
      tip += this.getTooltipForCell(src) + ' ';
    }      
    var parent = model.getParent(cell);      
    if (model.isVertex(parent)) {
      tip += this.getTooltipForCell(parent) + '.';
    }
    tip += getTooltipForCell.apply(graph, arguments);      
    const trg = model.getTerminal(cell, false);      
    if (trg) {
      tip += ' ' + this.getTooltipForCell(trg);
    }
    return tip;
  } 
}