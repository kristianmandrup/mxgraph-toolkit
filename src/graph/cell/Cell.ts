import mx from "mx";
import { Group } from "./group";
import { Edit } from "./edit";
import { WithCells } from "./WithCells";
import { Hints } from "./hints";
import { Hover } from "./hover/Hover";
import { Label } from "./label/Label";
import { PopupMenu } from "./menu";
import { WithCell } from "./WithCell";
const { mxGraph } = mx

export const createCell = (graph: any): Cell => {
  return new Cell(graph)
}

const classMap = {
  edit: Edit,
  group: Group,
  hints: Hints,
  hover: Hover,
  label: Label,
  menu: PopupMenu,  
  withCell: WithCell,
  withCells: WithCells
}

const defaults = {
  classMap
}

export class Cell {
  graph: any

  _group: any
  _edit: any
  _hints: any 
  _hover: any
  _htmlLabel: any
  _popupMenu: any
  _toolTip: any

  classMap: {
    [key: string]: any
  } = defaults.classMap
  
  constructor(graph: any, { classMap }: any = {}) {
    this.graph = graph
    this.setClassMap(classMap)
  }

  allCells() {
    return this.graph.getChildCells(null, true, true)
  }

  setClassMap(classMap: any = {}) {
    this.classMap = {
      ...defaults.classMap,
      ...classMap
    }      
  }

  get edit() {
    this._edit = this._edit || this.createEdit()
    return this._edit
  }

  setEdit(edit?: any, props?: any) {
    this._edit = edit || this.createEdit(props)
    return this
  }

  protected createEdit(props: any = {}) {
    new this.classMap.edit(this.graph, props)
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

  get hints() {
    this._hints = this._hints || this.createHints()
    return this._hints
  }
  
  setHints(hints?: any, hintsElem?: Element) {
    this._hints = hintsElem || this.createHints(hintsElem)
    return this
  }
  
  protected createHints(hintsElem?: Element) {
    new this.classMap.hints(hintsElem)
  }  

  get popupMenu() {
    this._popupMenu = this._popupMenu || this.createPopupMenu()
    return this._popupMenu
  }
  
  setPopupMenu(popupMenu?: any, items?: any) {
    this._popupMenu = popupMenu || this.createPopupMenu(items)
    return this
  }
  
  protected createPopupMenu(items?: any) {
    new this.classMap.popupMenu(this.graph, items)
  }    

  get toolTip() {
    this._toolTip = this._toolTip || this.createToolTip()
    return this._toolTip
  }
  
  setToolTip(toolTip?: any) {
    this._toolTip = toolTip || this.createToolTip()
    return this._toolTip
  }
  
  protected createToolTip() {
    return new this.classMap.toolTip(this.graph)
  }

  get htmlLabel() {
    this._htmlLabel = this._htmlLabel || this.createHtmlLabel()
    return this._htmlLabel
  }
  
  setHtmlLabel(htmlLabel?: any) {
    this._htmlLabel = htmlLabel || this.createHtmlLabel()
    return this._htmlLabel
  }
  
  protected createHtmlLabel() {
    return new this.classMap.htmlLabel(this.graph)
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
    graph.selectCellForEvent(cell);
    return this
  }

  setCellsRemoved() {
    mxGraph.prototype.cellsRemoved = this.cellsRemoved
    return this
  }

  autoSize(cell, recurse: boolean = true) {
    this.graph.autoSize(cell, recurse)
  }
    
  withCells(cells: any[], props) {
    return this.createWithCells(cells, props)
  }

  createWithCells(cells, props) {
    return this.classMap.withCells(this.graph, cells, props)
  }

  withCell(cell: any, props) {
    return this.createWithCell(cell, props)
  }

  createWithCell(cell, props) {
    return this.classMap.withCell(this.graph, cell, props)
  }

  scaleCell(cell, factor = 2, recurse: boolean = true) {
    this.graph.scaleCell(cell, factor, factor, recurse)
    return this
  }

  cellsRemoved(cells) {    
    // handle when cells are removed
  }
}
