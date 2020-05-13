import mx from "mx";
import { IPosition, ISize } from 'types';
const { mxPoint, mxGraph } = mx

import { VertexHandler } from "./VertexHandler";
import { VertexToolHandler } from "./VertexToolHandler";

export * as anchor from './anchor'
export * as handles from './handles'
export * as ports from './ports'
export * as overlay from './overlay'

import { Anchor } from './anchor'
import { Handles } from './handles'
import { Ports } from './ports'
import { Overlay } from "./overlay";

export const classMap = {
  handler: VertexHandler,
  toolHandler: VertexToolHandler,
  anchor: Anchor,
  handles: Handles,
  overlay: Overlay,
  ports: Ports
}
  
export const defaults = {
  classMap
}

export class Vertex {
  graph: any
  vertex: any

  _handler: any
  _toolHandler: any
  _handles: any
  _ports: any
  _overlay: any
  _anchor: any

  classMap: {
    [key: string]: any
  } = defaults.classMap

  constructor(graph: any, { classMap }: any = {}) {
    this.graph = graph
    this.setClassMap(classMap)
  }

  get model() {
    return this.graph.model
  }

  setClassMap(classMap: any = {}) {
    this.classMap = {
      ...defaults.classMap,
      ...classMap
    }      
  }

  get handler(): any {
    this._handler = this._handler || this.createHandler()
    return this._handler
  }

  setHandler(handler?: any) {
    this._handler = handler || this.createHandler()
    return this._handler
  }

  protected createHandler() {
    return new this.classMap.handler(this.graph)
  }

  get anchor() {
    this._anchor = this._anchor || this.createAnchor()
    return this._anchor
  }
  
  setAnchor(anchor?: any) {
    this._anchor = anchor || this.createAnchor()
    return this._anchor
  }
  
  protected createAnchor(): any {
    return new this.classMap.anchor(this.graph)
  }   

  get overlay(): any {
    this._overlay = this._overlay || this.createOverlay()
    return this._overlay
  }
  
  setOverlay(overlay?: any) {
    this._overlay = overlay || this.createOverlay()
    return this._overlay
  }
  
  protected createOverlay() {
    return new this.classMap.overlay(this.graph)
  }
  
  get handles(): any {
    this._handles = this._handles || this.createHandles()
    return this._handles
  }
  
  setHandles(handles?: any) {
    this._handles = handles || this.createHandles()
    return this._handles
  }
  
  protected createHandles() {
    return new this.classMap.handles(this.graph)
  }
  
  get ports(): any {
    this._ports = this._ports || this.createPorts()
    return this._ports
  }
  
  setPorts(ports?: any) {
    this._ports = ports || this.createPorts()
    return this._ports
  }
  
  protected createPorts() {
    return new this.classMap.ports(this.graph)
  }
  
  get toolHandler(): any {
    this._toolHandler = this._toolHandler || this.createToolHandler()
    return this._toolHandler
  }
  
  setToolHandler(toolHandler?: any) {
    this._toolHandler = toolHandler || this.createToolHandler()
    return this._toolHandler
  }
  
  protected createToolHandler() {
    return new this.classMap.toolHandler(this.graph)
  }

  configureToolHandler() {
    const { graph, model } = this
    graph.createHandler = (state) => {
      if (state && model.isVertex(state.cell)) {
        return new VertexToolHandler(graph, state);
      }
      return mxGraph.prototype.createHandler(state);
    }
  };  
  
  setVertex(vertex: any) {
    this.vertex = vertex
    return this
  }

  setGeometry(geometry) {
    this.vertex.geometry = geometry
    return this
  }

  addGeometry(geometry) {
    this.vertex.geometry = {
      ...this.vertex.geometry,
      geometry
    }
    return this
  }

  setAlternateBounds(boundsVertex) {
    this.vertex.geometry.alternateBounds = boundsVertex
    return this
  }

  insertPortVertex(pos: IPosition, size: ISize, {id, label}: any = {}) {
    const midX = -(size.width / 2)
    const midY = -(size.height / 2)

    var portVertex = this.graph.insertVertex(this.vertex, id, label, pos.x, pos.y, size.width, size.height);
    portVertex.geometry.offset = new mxPoint(midX, midY);
    portVertex.geometry.relative = true;  
    return this
  }
}