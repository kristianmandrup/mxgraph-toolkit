import mx from "./mx";
const { mxGraph } = mx

export const createCell = (graph: any): Cell => {
  return new Cell(graph)
}

export class Cell {
  graph: any

  constructor(graph: any) {
    this.graph = graph
  }

  // See lod (level-of-detail) example
  setDetailLevel(cell, level) {
    cell.lod = level
    return this
  }

  setIsConstituent(cell) {
    this.graph.getCurrentCellStyle(cell)['constituent'] === '1';
    return this
  };
  
  redirectSelectionToParent(cell) {
    const { graph } = this
    if (graph.isPart(cell))
    {
      cell = graph.model.getParent(cell);
    }  
    mxGraph.prototype.selectCellForEvent(cell);
    return this
  };
}
