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

  createIsPort(cell) {
    const { graph } = this
    var geo = graph.getCellGeometry(cell);
    return (geo != null) ? geo.relative : false;
  };

  isPart(cell: any) {
    const { graph } = this
    graph.isPart(cell)
  }

  disableFolding() {
    this.graph.isCellFoldable = (cell) => false
  }

  setGetLabelFn(getLabelFn: (cell) => any) {
    const { graph } = this
    this.graph.getLabel = getLabelFn.bind(graph)
  }
  
  addCellOverlay(cell, overlay) {
    const { graph } = this
    graph.addCellOverlay(cell, overlay)
  };

  // See lod (level-of-detail) example
  setDetailLevel(cell, level) {
    cell.lod = level
    return this
  }

  setVisibilityDetailLevel(detailLv: number = 2) {
    const { graph } = this
    graph.isCellVisible = (cell) => {
      const inView = () => cell.lod / detailLv < graph.view.scale;
      return !cell.lod || inView();
    };  
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
