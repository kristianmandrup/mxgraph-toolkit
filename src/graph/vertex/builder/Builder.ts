import { PortsCategoryMap } from "./PortsCategoryMap";
import { DrawLayer } from "graph/layers/DrawLayer";
import { Context } from "./context";
import { Bounds } from "./Bounds";

export const classMap = {
  portsCategoryMap: PortsCategoryMap,
  drawLayer: DrawLayer,
  context: Context,
  bounds: Bounds
}
  
export const defaults = {
  classMap
}
export class Builder {
  graph: any 
  vertex: any
  _ports?: PortsCategoryMap
  _bounds: any
  _draw: any
  _context: any
  props: any

  classMap: {
    [key: string]: any
  } = defaults.classMap

  constructor(graph: any, vertex: any, props: any = {}) {
    this.graph = graph
    this.vertex = vertex 
    this.props = props   
    const { classMap } = props
    this.setClassMap(classMap)
  }

  setClassMap(classMap: any = {}) {
    this.classMap = {
      ...defaults.classMap,
      ...classMap
    }      
  }

  get ports() {
    const { noPorts } = this.props
    if (noPorts) {
      throw new Error('No ports enabled')
    }
    this._ports = this._ports || this.createPorts()
    return this._ports
  }

  createPorts(props?: any) {
    props = props || this.props
    return new this.classMap.portsCategoryMap(this.graph, this.vertex, props)
  }
  

  get bounds(): Bounds {
    this._bounds = this._bounds || this.createBounds()
    return this._bounds
  }

  createBounds() {
    return this.classMap.bounds(this.graph, this.vertex)
  }

  get draw(): DrawLayer {
    this._draw = this._draw || this.createDrawLayer()
    return this._draw
  }

  createDrawLayer() {
    return this.classMap.drawLayer(this.graph, this.vertex)
  }

  get context(): any {
    this._context = this._context || this.createContext()
    return this._context
  }
    
  protected createContext(props?: any) {
    return this.classMap.context(this.graph, {cell: this.vertex, ...props})
  }
}