import { CellRenderer } from "./CellRenderer";
import { ConnectionHandler } from "./ConnectionHandler";

export const classMap = {
  cellRenderer: CellRenderer,
  connectionHandler: ConnectionHandler,
}
  
export const defaults = {
  classMap
}

export class Scrollable {
  graph: any
  _cellRenderer: any
  _connectionHandler: any   
  
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

  get connectionHandler() {
    this._connectionHandler = this._connectionHandler || this.createConnectionHandler()
    return this._connectionHandler
  }

  setConnectionHandler(connectionHandler?: any) {
    this._connectionHandler = connectionHandler || this.createConnectionHandler()
    return this._connectionHandler
  }

  protected createConnectionHandler(): any {
    return new this.classMap.connectionHandler()
  }  

  get cellRenderer() {
    this._cellRenderer = this._cellRenderer || this.createCellRenderer()
    return this._cellRenderer
  }
  
  setCellRenderer(cellRenderer?: any) {
    this._cellRenderer = cellRenderer || this.createCellRenderer()
    return this._cellRenderer
  }
  
  protected createCellRenderer(): any {
    return new this.classMap.cellRenderer()
  }  
}