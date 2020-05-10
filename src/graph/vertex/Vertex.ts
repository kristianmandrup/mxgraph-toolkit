import mx from "mx";
import { IPosition, ISize } from 'types';
const { mxPoint } = mx

export class Vertex {
  graph: any
  vertex: any

  constructor(graph: any) {
    this.graph = graph
  } 

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