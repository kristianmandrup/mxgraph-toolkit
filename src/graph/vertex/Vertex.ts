import mx from "mx";
import { IPosition, ISize } from 'types';
const { mxPoint, mxGraph } = mx

import { VertexBuilder } from "./VertexBuilder";
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
  ports: Ports,
  builder: VertexBuilder
}
  
export const defaults = {
  classMap
}

export class Vertex {
  graph: any

  _handler: any
  _toolHandler: any
  _handles: any
  _ports: any
  _overlay: any
  _anchor: any
  _builder: any

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

  get builder(): any {
    this._builder = this._builder || this.createBuilder()
    return this._builder
  }
  
  setBuilder(builder?: any) {
    this._builder = builder || this.createBuilder()
    return this._builder
  }
  
  protected createBuilder() {
    return new this.classMap.builder(this.graph)
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
}