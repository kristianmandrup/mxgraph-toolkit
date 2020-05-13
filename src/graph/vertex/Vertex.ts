import mx from "mx";
import { IPosition, ISize } from 'types';
const { mxPoint, mxGraph } = mx

import { Builder } from "./builder";
import { VertexHandler } from "./VertexHandler";
import { Context } from "./context";
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
  context: Context,
  anchor: Anchor,
  handles: Handles,
  overlay: Overlay,
  ports: Ports,
  builder: Builder
}
  
export const defaults = {
  classMap
}

export class Vertex {
  graph: any

  _handler: any
  _context: any
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
  
  get context(): any {
    this._context = this._context || this.createContext()
    return this._context
  }
  
  setContext(context?: any, state?: any) {
    this._context = context || this.createContext(state)
    return this._context
  }
  
  protected createContext(state?: any) {
    return new this.classMap.context(this.graph, state)
  }

  configureContext() {
    const { graph, model } = this
    graph.createHandler = (state) => {
      if (state && model.isVertex(state.cell)) {
        return this.createContext(state);
      }
      return mxGraph.prototype.createHandler(state);
    }
  };    
}