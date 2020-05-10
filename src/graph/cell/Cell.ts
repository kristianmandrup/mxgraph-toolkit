import mx from "mx";
import { Group } from "./group";
import { Edit } from "./edit";
const { mxGraph } = mx

export const createCell = (graph: any): Cell => {
  return new Cell(graph)
}

export const classMap = {
  group: Group,
  edit: Edit,
}

export const defaults = {
  classMap
}

export class Cell {
  graph: any

  _group: any
  _edit: any
  _hints: any 
  _hover: any
  _label: any
  _menu: any

  classMap: {
    [key: string]: any
  } = defaults.classMap
  
  constructor(graph: any, { classMap }: any = {}) {
    this.graph = graph
    this.setClassMap(classMap)
  }

  setClassMap(classMap: any = {}) {
    this.classMap = {
      ...defaults.classMap,
      ...classMap
    }      
  }

  get group(): any {
    if (!this._group) {
      throw new Error('Missing group: use createGroup to create one')
    }
    return this._group
  }

  setGroup(group: any) {
    if (!group) {
      throw new Error('missing group argument')
    }
    this._group = group
    return this
  }

  createGroup(name: string = 'Group', label: string = 'group') {
    return new this.classMap.group(name, label)
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
