import { PortsCategoryMap } from "./PortsCategoryMap";
import { PortsMap } from "./PortsMap";
import { DrawLayer } from "graph/layers/DrawLayer";
import { Context } from "../context";

export class WithVertex {
  graph: any 
  vertex: any
  _ports?: PortsCategoryMap
  _context: any

  constructor(graph: any, vertex: any, props: any = {}) {
    this.graph = graph
    this.vertex = vertex
    if (!props.noPorts) {
      this._ports = new PortsCategoryMap(graph, vertex, props)
    }    
  }

  get ports() {
    if (!this._ports) {
      throw new Error('No ports enabled')
    }
    return this._ports
  }

  get draw(): DrawLayer {
    return this.createDrawLayer()
  }

  createDrawLayer() {
    return new DrawLayer(this.graph, this.vertex)
  }

  get context(): any {
    this._context = this._context || this.createContext()
    return this._context
  }
    
  protected createContext(state?: any) {
    return new Context(this.graph, state)
  }
}