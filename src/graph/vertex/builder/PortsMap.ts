import mx from "mx";
import { portDistribution } from "../ports/PortPosition";
import { Port } from "./Port";
const { mxPoint } = mx

export class PortsMap {
  graph: any
  vertex: any
  labelFn?: (x) => string
  portsMap: {
    [key: string]: any
  } = {
  } 

  defaults = {
    port: {
      style: 'align=right;imageAlign=right;spacingRight=18;'
    }
  }

  constructor(graph: any, vertex: any, props: any) {
    this.graph = graph
    this.vertex = vertex
    this.labelFn = props.labelFn
  }

  withPort(name: string): Port {
    const portVertex = this.getNamed(name)
    return new Port(this.graph, portVertex)
  }

  get keys() {
    return Object.keys(this.portsMap)
  }

  get count() {
    return this.keys.length
  }

  get portPositions(): any[] {
    return portDistribution[this.count]
  }

  portPositionsFor(count: number): any[] {
    return portDistribution[this.count]
  }

  positionAll(props?: any) {    
    this.keys.map((key, index)  => {
      const state = this.getNamed(key).state
      const pos = this.portPositions[index]
      this.removeByName(key)      
      this.addPortToVertex({index, pos, state, ...props})
    })
  }

  getParentVertexFor(name: string) {
    const port = this.getNamed(name)
    return this.graph.getTerminalForPort(port)
  }    
  
  getNamed(name: string) {
    return this.portsMap[name]
  }

  getAllNamed(names: string[]) {
    return names.map(this.getNamed.bind(this))
  }

  getAll() {
    return Object.values(this.portsMap)
  }
  
  remove(ports: any | any[]) {
    ports = Array.isArray(ports) ? ports : [ports]
    this.graph.removeCells(ports)
    this.positionAll()
    return this
  }

  removeAll() {
    const ports = this.getAll()
    ports.map(port => this.remove(port))
    return this
  }

  removeByName(names: string[] | string) {
    names = Array.isArray(names) ? names : [names]
    const ports = this.getAllNamed(names)
    this.remove(ports)
  }

  addPorts(count: number, props?: any) {
    this.portPositionsFor(count).map((pos, index)  => {
      this.addPortToVertex({index, pos, ...props})
    })
  }

  addPortToVertex(props: any) {
    const { graph, vertex } = this
    let {index, id, label, pos, size, imagePath, style, offset} = props
    let { idFn, labelFn } = props
    labelFn = labelFn || this.labelFn
    id = idFn(index)
    label = labelFn(index)

    // Adds the ports at various relative locations
    const { width, height } = size
    style = `port;` + style
    if (imagePath) {
      style += `;image=${imagePath};`
    }    
    const port = graph.insertVertex(vertex, id, label, pos.x, pos.y, width, height,
        style, true);
    // TODO: use WithPort            
    port.geometry.offset = new mxPoint(offset.x, offset.y);
    return port
  }
    
  addPortsToVertex = (ports: any[]): any[] => {
    return ports.map(port => {
      const props = this.portPropsFor(port)
      // Adds the ports at various relative locations
      this.addPortToVertex(props)
    })    
  }

  protected portPropsFor(props: any) {
    let { label, size, pos, style, imagePath, offset } = props
    const defaults = {
      size: { 
        height: 16, 
        width: 16 
      },      
    }
    size = {
      ...defaults.size,
      ...size || {}
    }
    style = style || this.defaults.port.style
    if (!label) {
      throw new Error('Missing label')
    }
    if (!imagePath) {
      throw new Error('Missing imagePath')
    }
    return {label, size, pos, offset, imagePath, style} 
  }    
}