import { Zoom } from "./zoom";
import { UndoManager } from "./undo";

export const classMap = {
  zoom: Zoom,
  undoManager: UndoManager
}

export const defaults = {
  classMap
}

export class EditorActions {
  graph: any
  _zoom?: Zoom
  _undoManager?: UndoManager

  classMap: {
    [key: string]: any
  } = defaults.classMap

  containers: any = {}

  constructor(graph: any, { classMap, containerMap }: any = {}) {
    this.graph = graph
    this.containers = containerMap
    this.setClassMap(classMap)
  }

  setClassMap(classMap: any = {}) {
    this.classMap = {
      ...defaults.classMap,
      ...classMap
    }     
    return this 
  }  

  get zoom(): any {
    this._zoom = this._zoom || this.createZoom()
    return this._zoom
  }
  
  setZoom(zoom?: any, zoomElem?: any) {    
    this._zoom = zoom || this.createZoom(zoomElem)
    return this._zoom
  }
  
  protected createZoom(zoomElem?: any) {
    zoomElem = zoomElem || this.containers.zoom
    return new this.classMap.zoom(this.graph, zoomElem)
  }    

  get undoManager(): any {
    this._undoManager = this._undoManager || this.createUndoManager()
    return this._undoManager
  }
  
  setUndoManager(undoManager?: any, undoManagerElem?: any) {    
    this._undoManager = undoManager || this.createUndoManager(undoManagerElem)
    return this._undoManager
  }
  
  protected createUndoManager(undoManagerElem?: any) {
    undoManagerElem = undoManagerElem || this.containers.undoManager
    return new this.classMap.undoManager(this.graph, undoManagerElem)
  }    
}