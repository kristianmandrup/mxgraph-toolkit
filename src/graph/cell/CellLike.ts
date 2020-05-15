import { Cell } from ".";
import { WithCell } from "./WithCell";
import { WithCells } from "./WithCells";

const classMap = {
  cell: Cell,
  withCell: WithCell,
  withCells: WithCells
}

const defaults = {
  classMap  
}

// use as base class for Edge and Vertex
export class CellLike {
  graph: any
  _cell: any

  classMap: {
    [key: string]: any
  } = defaults.classMap

  constructor(graph: any, props: any = {}) {
    const { classMap } = props
    this.graph = graph
    this.setClassMap(classMap)
  }

  setClassMap(classMap: any = {}) {
    this.classMap = {
      ...defaults.classMap,
      ...classMap
    }      
  }

  get cell() {
    this._cell = this._cell || this.createCell()
    return this._cell
  }

  setCell(cell?: any) {
    this._cell = cell || this.createCell()
    return this._cell
  }

  protected createCell(): any {
    return new this.classMap.cell(this.graph)
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
}