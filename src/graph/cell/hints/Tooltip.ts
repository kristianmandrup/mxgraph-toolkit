import mx from "mx";
const { mxCellTracker } = mx

export class Tooltip {
  graph: any

  constructor(graph: any) {
    this.graph = graph
  }

  // factory  
  static create = (graph: any): Tooltip => {
    return new Tooltip(graph).init()
  }
  
  highlightCellOnHover() {
    // Adds a highlight on the cell under the mousepointer
    new mxCellTracker(this.graph, undefined, undefined);
  }

  init() {
    this.graph.getTooltipForCell = this.getTooltipForCell
    return this
  }

  get model() {
    return this.graph.getModel()
  }
  
  getTooltipForCell(cell): string {
    const { graph } = this
    const getTooltipForCell = graph.getTooltipForCell;
        
    if (!cell) return ''

    let tip = '';
    // edge source name
    const source = this.cellSource(cell)
    if (source) {
      tip += this.getTooltipForCell(source) + ' ';
    }      

    // vertex name (with parent hierarchy)
    const parent = this.cellParent(cell)
    if (this.isVertex(parent)) {
      tip += this.getTooltipForCell(parent) + '.';
    }
    tip += getTooltipForCell.apply(graph, arguments);      

    // edge target name
    const target = this.cellTarget(cell)
    if (target) {
      tip += ' ' + this.getTooltipForCell(target);
    }
    return tip;
  } 

  isVertex(cell) {
    return this.model.isVertex(parent)
  }

  cellParent(cell) {
    return this.model.getParent(cell)
  }

  cellSource(cell) {
    return this.model.getTerminal(cell, true)
  }

  cellTarget(cell) {
    return this.model.getTerminal(cell, false)
  }
}