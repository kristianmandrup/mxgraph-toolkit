import { PortsMap } from "./PortsMap"

export class PortsCategoryMap {
  graph: any
  vertex: any
  props: any
  portsCategoryMap: {
    [key: string]: PortsMap
  } = {} 

  constructor(graph: any, vertex: any, props: any) {
    this.graph = graph
    this.vertex = vertex
    this.props = props
  }

  removeByName(name: string) {
    const ports = this.getNamed(name)
    ports.removeAll()
    delete this.portsCategoryMap[name]
  }

  getNamed(name: string): PortsMap {
    return this.portsCategoryMap[name]    
  }

  setNamed(name: string, ports?: PortsMap) {
    this.portsCategoryMap[name] = ports || this.createPortsMap()   
    return this
  }

  addCategoryPorts(category, count, props) {
    this.setAndWith(category).addPorts(count, props)
    return this
  }
  
  setAndWith(name: string, ports?: PortsMap) {
    this.portsCategoryMap[name] = ports || this.createPortsMap()   
    return this.getNamed(name)
  }

  createPortsMap(): PortsMap {
    return new PortsMap(this.graph, this.vertex, this.props)
  }
}