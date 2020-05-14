import mx from "mx";
import { WithVertex } from "./WithVertex";
const { mxPoint } = mx

export class WithPort {
  graph: any 
  portVertex: any
  portsMap: any

  constructor(graph: any, portVertex: any, props: any = {}) {
    const { portsMap } = props
    this.graph = graph
    this.portVertex = portVertex
    this.portsMap = portsMap
  }

  parentVertex() {
    return this.portVertex.getParent()
  }

  remove() {
    this.graph.removeCells([this.portVertex])
  }

  asVertex(props: any = {noPorts: true}): WithVertex {
    return new WithVertex(this.graph, this.portVertex, props)
  }

  get context() {
    return this.asVertex().context
  }

  setGeo(geo: any) {
    Object.keys(geo).map(key => {
      this.portVertex.geometry[key] = geo[key]
    })
    return this    
  }

  setOffset(offset: any) {
    this.portVertex.geometry.offset = new mxPoint(offset.x, offset.y);
    return this
  }
}