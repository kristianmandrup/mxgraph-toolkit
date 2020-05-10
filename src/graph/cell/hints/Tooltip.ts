import mx from "mx";
const { mxCellTracker } = mx

export const createTooltip = (graph: any): Tooltip => {
  return new Tooltip(graph).init()
}

export class Tooltip {
  graph: any

  constructor(graph: any) {
    this.graph = graph
  }

  highlightCellOnHover() {
    // Adds a highlight on the cell under the mousepointer
    new mxCellTracker(this.graph, undefined, undefined);
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